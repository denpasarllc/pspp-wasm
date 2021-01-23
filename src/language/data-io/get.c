/* PSPP - a program for statistical analysis.
   Copyright (C) 1997-9, 2000, 2006-2007, 2010-15 Free Software Foundation, Inc.

   This program is free software: you can redistribute it and/or modify
   it under the terms of the GNU General Public License as published by
   the Free Software Foundation, either version 3 of the License, or
   (at your option) any later version.

   This program is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU General Public License for more details.

   You should have received a copy of the GNU General Public License
   along with this program.  If not, see <http://www.gnu.org/licenses/>. */

#include <config.h>
#include <emscripten.h>

#include <stdlib.h>
#include <stdio.h>

#include "data/any-reader.h"
#include "data/case-map.h"
#include "data/case.h"
#include "data/subcase.h"
#include "data/casereader.h"
#include "data/dataset.h"
#include "data/datasheet.h"
#include "data/dictionary.h"
#include "data/variable.h"
#include "data/por-file-writer.h"
#include "language/command.h"
#include "language/data-io/file-handle.h"
#include "language/data-io/trim.h"
#include "language/lexer/lexer.h"
#include "libpspp/compiler.h"
#include "libpspp/misc.h"
#include "libpspp/message.h"
#include "libpspp/str.h"
#include "output/pivot-table.h"

#include "gl/xalloc.h"

#include "gettext.h"
#define _(msgid) gettext (msgid)

/* Reading system and portable files. */

/* Type of command. */
enum reader_command
  {
    GET_CMD,
    IMPORT_CMD
  };

static int parse_read_command (struct lexer *, struct dataset *,
                               enum reader_command);

/* GET. */
int
cmd_get (struct lexer *lexer, struct dataset *ds)
{
  return parse_read_command (lexer, ds, GET_CMD);
}

/* IMPORT. */
int
cmd_import (struct lexer *lexer, struct dataset *ds)
{
  return parse_read_command (lexer, ds, IMPORT_CMD);
}

/* Parses a GET or IMPORT command. */
static int
parse_read_command (struct lexer *lexer, struct dataset *ds,
                    enum reader_command command)
{
  struct casereader *reader = NULL;
  struct file_handle *fh = NULL;
  struct dictionary *dict = NULL;
  struct case_map *map = NULL;
  struct case_map_stage *stage = NULL;
  char *encoding = NULL;

  for (;;)
    {
      lex_match (lexer, T_SLASH);

      if (lex_match_id (lexer, "FILE") || lex_is_string (lexer))
	{
	  lex_match (lexer, T_EQUALS);

          fh_unref (fh);
	  fh = fh_parse (lexer, FH_REF_FILE, NULL);
	  if (fh == NULL)
            goto error;
	}
      else if (command == GET_CMD && lex_match_id (lexer, "ENCODING"))
        {
	  lex_match (lexer, T_EQUALS);

          if (!lex_force_string (lexer))
            goto error;

          free (encoding);
          encoding = ss_xstrdup (lex_tokss (lexer));

          lex_get (lexer);
        }
      else if (command == IMPORT_CMD && lex_match_id (lexer, "TYPE"))
	{
	  lex_match (lexer, T_EQUALS);

	  if (!lex_match_id (lexer, "COMM")
              && !lex_match_id (lexer, "TAPE"))
	    {
	      lex_error_expecting (lexer, "COMM", "TAPE");
              goto error;
	    }
	}
      else
        break;
    }

  if (fh == NULL)
    {
      lex_sbc_missing ("FILE");
      goto error;
    }

  ////
  reader = any_reader_open_and_decode (fh, encoding, &dict, NULL);
  if (reader == NULL)
    goto error;

  if (dict_get_var_cnt (dict) == 0)
    {
      msg (SE, _("%s: Data file dictionary has no variables."),
           fh_get_name (fh));
      goto error;
    }

  stage = case_map_stage_create (dict);

  while (lex_token (lexer) != T_ENDCMD)
    {
      lex_match (lexer, T_SLASH);
      if (!parse_dict_trim (lexer, dict, false))
        goto error;
    }
  dict_compact_values (dict);

  map = case_map_stage_get_case_map (stage);
  case_map_stage_destroy (stage);
  if (map != NULL)
    reader = case_map_create_input_translator (map, reader);

  dataset_set_dict (ds, dict);
  dataset_set_source (ds, reader);

/////////////
  const struct casereader * cr_clone = casereader_clone(reader);
  struct datasheet * dsh = datasheet_create(cr_clone);

  size_t rows = datasheet_get_n_rows(dsh);
  size_t cols = datasheet_get_n_columns(dsh); 


  if (dict != NULL) {
    int i;
    for (i = 0 ; i < dict_get_var_cnt(dict) ; ++i)
      {
        const struct variable *v = dict_get_var(dict, i);
        EM_ASM(window.setVarName($0, $1), i, var_get_name (v));
      }
  }


  double * buffer = xmalloc(sizeof(double) * rows * cols);

  for (int i = 0; i < rows; i++) {
    for (int j = 0; j < cols; j++) {
      union value value;
      int width;
        if (datasheet_get_value (dsh, i, j, &value) /* && value.f != SYSMIS */ ) {
            buffer[i * cols + j] = value.f;
        } else { printf("couldnt get value\n"); }
      }
    }

    EM_ASM(window.setGridBuffer($0, $1, $2), rows, cols, buffer);

  // free
  printf("UPDATED DATASET\n");
  ///////////////
  

  fh_unref (fh);
  free (encoding);
  return CMD_SUCCESS;

 error:
  case_map_stage_destroy (stage);
  fh_unref (fh);
  casereader_destroy (reader);
  if (dict != NULL)
    dict_unref (dict);
  free (encoding);
  return CMD_CASCADING_FAILURE;
}
