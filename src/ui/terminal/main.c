/* PSPP - a program for statistical analysis.
   Copyright (C) 1997-2000, 2006-2007, 2009-2014 Free Software Foundation, Inc.

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

#include <signal.h>
#include <stdio.h>
#include <stdlib.h>
#if HAVE_FPU_CONTROL_H
#include <fpu_control.h>
#endif
#if HAVE_FENV_H
#include <fenv.h>
#endif
#if HAVE_IEEEFP_H
#include <ieeefp.h>
#endif
#include <unistd.h>

#include <emscripten.h>

#include "data/dataset.h"
#include "data/dictionary.h"
#include "data/file-handle-def.h"
#include "data/session.h"
#include "data/settings.h"
#include "data/variable.h"
#include "gsl/gsl_errno.h"
#include "language/command.h"
#include "language/lexer/lexer.h"
#include "language/lexer/include-path.h"
#include "libpspp/argv-parser.h"
#include "libpspp/compiler.h"
#include "libpspp/i18n.h"
#include "libpspp/message.h"
#include "libpspp/version.h"
#include "math/random.h"
#include "output/driver.h"
#include "output/message-item.h"
#include "ui/source-init-opts.h"
#include "ui/terminal/terminal-opts.h"
#include "ui/terminal/terminal-reader.h"
#include "data/datasheet.h"

#include "gl/fatal-signal.h"
// #include "gl/progname.h"
#include "gl/relocatable.h"

#include "gettext.h"
#define _(msgid) gettext (msgid)

static struct session *the_session;

static void add_syntax_reader (struct lexer *, const char *file_name,
                               const char *encoding, enum lex_syntax_mode);
static void bug_handler(int sig);
static void fpu_init (void);
static void output_msg (const struct msg *, void *);

/* Pass on callbacks from src/data/dictionary, as
   signals in the Gtk library */
static void
addcb (struct dictionary *d, int idx, void *pd)
{
  EM_ASM(console.log("addcb"));
}

static void
delcb (struct dictionary *d, const struct variable *var,
       int dict_idx, int case_idx, void *pd)
{
  EM_ASM(console.log("delcb"));
}

static void
mutcb (struct dictionary *d, int idx, unsigned int what, const struct variable *oldvar, void *pd)
{
  EM_ASM(console.log("mutcb"));
}

static void
weight_changed_callback (struct dictionary *d, int idx, void *pd)
{
  EM_ASM(console.log("weight_changed_callback"));
}

static void
filter_changed_callback (struct dictionary *d, int idx, void *pd)
{
  EM_ASM(console.log("filter_changed_callback"));
}


static void
split_changed_callback (struct dictionary *d, void *pd)
{
  EM_ASM(console.log("split_changed_callback"));
}


/* Program entry point. */
int
main (int argc, char **argv)
{
  
  // set_program_name (argv[0]);
  struct terminal_opts *terminal_opts;
  struct argv_parser *parser;
  enum lex_syntax_mode syntax_mode;
  char *syntax_encoding;
  bool process_statrc;
  struct lexer *lexer;

  

  signal (SIGABRT, bug_handler);
  signal (SIGSEGV, bug_handler);
  signal (SIGFPE, bug_handler);

  i18n_init ();
  fpu_init ();
  gsl_set_error_handler_off ();

  output_engine_push ();
  fh_init ();
  settings_init ();
  random_init ();

  lexer = lex_create ();
  the_session = session_create (NULL);
  dataset_create (the_session, "");

  parser = argv_parser_create ();
  terminal_opts = terminal_opts_init (parser, &syntax_mode, &process_statrc,
                                      &syntax_encoding);
  source_init_register_argv_parser (parser);
  if (!argv_parser_run (parser, argc, argv))
    exit (EXIT_FAILURE);
  terminal_opts_done (terminal_opts, argc, argv);
  argv_parser_destroy (parser);

  // Dataset callbacks
  static const struct dict_callbacks gui_callbacks =
    {
      addcb,
      delcb,
      mutcb,
      weight_changed_callback,
      filter_changed_callback,
      split_changed_callback
    };

    dict_set_callbacks (dataset_dict (session_active_dataset (the_session) ), &gui_callbacks, dataset_dict (session_active_dataset (the_session)) );

  // msg_set_handler (output_msg, lexer);
  session_set_default_syntax_encoding (the_session, syntax_encoding);

  /* Add syntax files to source stream. */
  // if (process_statrc)
  //   {
  //     char *rc = include_path_search ("rc");
  //     if (rc != NULL)
  //       {
  //         add_syntax_reader (lexer, rc, "Auto", LEX_SYNTAX_AUTO);
  //         free (rc);
  //       }
  //   }

  // if (optind < argc)
  //   {
  //     int i;

  //     for (i = optind; i < argc; i++)
  //       add_syntax_reader (lexer, argv[i], syntax_encoding, syntax_mode);
  //   }
  // else
  //   add_syntax_reader (lexer, "-", syntax_encoding, syntax_mode);

  /* Parse and execute syntax. */
    // const char syntax[] =  "data list list /forename (A12) height.\n" \
    //   "begin data.\n" \
    //   "Bertram 14 \n" \
    //   "end data \n" \
    //   "list /format=numbered.\n" \
    //   "frequencies height.";
    const char syntax[] = ".";

    lex_append (lexer, lex_reader_for_string (syntax, "ASCII"));

    lex_get (lexer);

  for (;;)
    {
      int result = cmd_parse (lexer, session_active_dataset (the_session));
      if (result == CMD_EOF || result == CMD_FINISH)
	break;
      else if (cmd_result_is_failure (result) && lex_token (lexer) != T_STOP)
        {
          if (lex_get_error_mode (lexer) == LEX_ERROR_STOP)
            {
              msg (MW, _("Error encountered while ERROR=STOP is effective."));
              lex_discard_noninteractive (lexer);
            }
          else if (result == CMD_CASCADING_FAILURE
                   && lex_get_error_mode (lexer) != LEX_ERROR_TERMINAL)
            {
              msg (SE, _("Stopping syntax file processing here to avoid "
                         "a cascade of dependent command failures."));
              lex_discard_noninteractive (lexer);
            }
        }

      if (msg_ui_too_many_errors ())
        lex_discard_noninteractive (lexer);
    }

  printf("EXITED MAIN LOOP\n");

  output_engine_pop ();
  session_destroy (the_session);

  random_done ();
  settings_done ();
  fh_done ();
  lex_destroy (lexer);
  i18n_done ();

  return msg_ui_any_errors ();
}

static void
fpu_init (void)
{
#if HAVE_FEHOLDEXCEPT
  fenv_t foo;
  feholdexcept (&foo);
#elif HAVE___SETFPUCW && defined(_FPU_IEEE)
  __setfpucw (_FPU_IEEE);
#elif HAVE_FPSETMASK
  fpsetmask (0);
#endif
}

/* If a segfault happens, issue a message to that effect and halt */
static void
bug_handler(int sig)
{
  /* Reset SIG to its default handling so that if it happens again we won't
     recurse. */
  signal (sig, SIG_DFL);

  switch (sig)
    {
    case SIGABRT:
      request_bug_report("Assertion Failure/Abort");
      break;
    case SIGFPE:
      request_bug_report("Floating Point Exception");
      break;
    case SIGSEGV:
      request_bug_report("Segmentation Violation");
      break;
    default:
      request_bug_report("Unknown");
      break;
    }

  /* Re-raise the signal so that we terminate with the correct status. */
  raise (sig);
}

static void
output_msg (const struct msg *m_, void *lexer_)
{
  struct lexer *lexer = lexer_;
  struct msg m = *m_;

  if (m.file_name == NULL)
    {
      m.file_name = CONST_CAST (char *, lex_get_file_name (lexer));
      m.first_line = lex_get_first_line_number (lexer, 0);
      m.last_line = lex_get_last_line_number (lexer, 0);
    }

  m.command_name = output_get_command_name ();

  message_item_submit (message_item_create (&m));

  free (m.command_name);
}

static void
add_syntax_reader (struct lexer *lexer, const char *file_name,
                   const char *encoding, enum lex_syntax_mode syntax_mode)
{
  struct lex_reader *reader;

  reader = (!strcmp (file_name, "-") && isatty (STDIN_FILENO)
            ? terminal_reader_create ()
            : lex_reader_for_file (file_name, encoding, syntax_mode,
                                   LEX_ERROR_CONTINUE));

  if (reader)
    lex_append (lexer, reader);
}


static struct terminal_opts *terminal_opts;
static struct argv_parser *parser;
static enum lex_syntax_mode syntax_mode;
static char *syntax_encoding;
static bool process_statrc;
static struct lexer *lexer;

int EMSCRIPTEN_KEEPALIVE read_data_text_file(char* file_path) {

  // signal (SIGABRT, bug_handler);
  // signal (SIGSEGV, bug_handler);
  // signal (SIGFPE, bug_handler);

  i18n_init ();
  fpu_init ();
  gsl_set_error_handler_off ();

  output_engine_push ();
  fh_init ();
  settings_init ();
  random_init ();

  lexer = lex_create ();
  the_session = session_create (NULL);
  dataset_create (the_session, "");

  parser = argv_parser_create ();
  terminal_opts = terminal_opts_init (parser, &syntax_mode, &process_statrc,
                                      &syntax_encoding);
  source_init_register_argv_parser (parser);
  if (!argv_parser_run (parser, 0, 0))
    exit (EXIT_FAILURE);
  terminal_opts_done (terminal_opts, 0, 0);
  argv_parser_destroy (parser);



  msg_set_handler (output_msg, lexer);
  session_set_default_syntax_encoding (the_session, syntax_encoding);

//////////////////////////////////////////////////////////
    FILE *file = fopen(file_path, "r");
    if (!file) {
        printf("cannot open file\n");
        return 1;
    }
    // while (!feof(file)) {
    //     char c = fgetc(file);
    //     if (c != EOF) {
    //         putchar(c);
    //     }
    // }


    ////////////////////////////////////////////////////////
       const char syntax[] = 
     /* "data list file='uploaded_data.txt' list /forename (A12) height.\n" \ */
      "get file='uploaded_data.txt'.\n";// \
      // "list /format=numbered.\n" ;
      // "FREQUENCIES /VARIABLES= AGE TOTALCIN /FORMAT=AVALUE TABLE /PIECHART= MISSING.\n";
      // "graph /bar = count by age.\n" ;
      // "graph /scatterplot(bivariate) = age with totalcw2.\n" ;

      // "graph /histogram = weighin.\n" ;
      // "descriptives variables=WEIGHIN TOTALCIN age /statistics=mean stddev min max range.\n"
      // "ONEWAY WEIGHIN BY AGE\n" \
      // "/MISSING ANALYSIS.\n" \
      // "GRAPH / HISTOGRAM = AGE.\n"
      // ;

    lex_append (lexer, lex_reader_for_string (syntax, "UTF-8"));

    lex_get (lexer);


    //
      // const struct caseproto *proto;
      // struct casereader *reader;
      // casenumber case_cnt;
      // proto = psppire_data_store_get_proto (pdw->data_store);
      // case_cnt = psppire_data_store_get_case_count (pdw->data_store);
      // reader = lazy_casereader_create (proto, case_cnt,
      //                                  create_casereader_from_data_store,
      //                                  pdw->data_store, &pdw->lazy_serial);
      // dataset_set_source (pdw->dataset, reader);

    //


  for (;;)
    {
      int result = cmd_parse (lexer, session_active_dataset (the_session));
      if (result == CMD_EOF || result == CMD_FINISH)
	break;
      else if (cmd_result_is_failure (result) && lex_token (lexer) != T_STOP)
        {
          if (lex_get_error_mode (lexer) == LEX_ERROR_STOP)
            {
              msg (MW, _("Error encountered while ERROR=STOP is effective."));
              lex_discard_noninteractive (lexer);
            }
          else if (result == CMD_CASCADING_FAILURE
                   && lex_get_error_mode (lexer) != LEX_ERROR_TERMINAL)
            {
              msg (SE, _("Stopping syntax file processing here to avoid "
                         "a cascade of dependent command failures."));
              lex_discard_noninteractive (lexer);
            }
        }

      if (msg_ui_too_many_errors ())
        lex_discard_noninteractive (lexer);
    }

  printf("EXITED MAIN LOOP\n");

  // output_engine_pop ();
  // session_destroy (the_session);

  // random_done ();
  // settings_done ();
  // fh_done ();
  lex_destroy (lexer);
  // i18n_done ();

  return msg_ui_any_errors ();
}





EMSCRIPTEN_KEEPALIVE int execute_ui_generated_syntax(char* syntax) {
    lexer = lex_create ();
    lex_append (lexer, lex_reader_for_string (syntax, "UTF-8"));
    lex_get (lexer);
    msg_set_handler (output_msg, lexer);

  int prev_result = 0;
  int result = 0;

    static const struct dict_callbacks gui_callbacks =
    {
      addcb,
      delcb,
      mutcb,
      weight_changed_callback,
      filter_changed_callback,
      split_changed_callback
    };

    dict_set_callbacks (dataset_dict (session_active_dataset (the_session) ), &gui_callbacks, dataset_dict (session_active_dataset (the_session)) );


  for (;;)
    {
      prev_result = result;
      result = cmd_parse (lexer, session_active_dataset (the_session));
      if (result == CMD_EOF || result == CMD_FINISH)
	break;
      else if (cmd_result_is_failure (result) && lex_token (lexer) != T_STOP)
        {
          if (lex_get_error_mode (lexer) == LEX_ERROR_STOP)
            {
              msg (MW, _("Error encountered while ERROR=STOP is effective."));
              lex_discard_noninteractive (lexer);
            }
          else if (result == CMD_CASCADING_FAILURE
                   && lex_get_error_mode (lexer) != LEX_ERROR_TERMINAL)
            {
              msg (SE, _("Stopping syntax file processing here to avoid "
                         "a cascade of dependent command failures."));
              lex_discard_noninteractive (lexer);
            }
        }

      if (msg_ui_too_many_errors ())
        lex_discard_noninteractive (lexer);
    }

    lex_destroy (lexer);
    return prev_result;

}

// void create_case() {

//   const struct caseproto * cp = caseproto_create();
//   struct ccase * case = case_create (cp);
// }

EMSCRIPTEN_KEEPALIVE void refresh_grid() {
  const struct dictionary * dict = dataset_dict(session_active_dataset(the_session));
  const struct casereader * src = dataset_source (session_active_dataset(the_session));
  struct datasheet * dsh = datasheet_create(src);
  
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
  

}