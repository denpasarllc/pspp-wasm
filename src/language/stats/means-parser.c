/* PSPP - a program for statistical analysis.
   Copyright (C) 2011, 2012, 2013, 2019 Free Software Foundation, Inc.

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

#include "data/case.h"
#include "data/casegrouper.h"
#include "data/casereader.h"
#include "data/dataset.h"
#include "data/dictionary.h"
#include "data/format.h"
#include "data/variable.h"

#include "language/lexer/lexer.h"
#include "language/lexer/variable-parser.h"

#include "libpspp/pool.h"

#include "means.h"

/* Parse the /TABLES stanza of the command.  */
static bool
parse_means_table_syntax (struct lexer *lexer, const struct means *cmd,
			  struct mtable *table)
{
  memset (table, 0, sizeof *table);

  /* Dependent variable (s) */
  if (!parse_variables_const_pool (lexer, cmd->pool, cmd->dict,
				   &table->dep_vars, &table->n_dep_vars,
				   PV_NO_DUPLICATE | PV_NUMERIC))
    return false;

  /* Factor variable (s) */
  while (lex_match (lexer, T_BY))
    {
      struct layer *layer = pool_zalloc (cmd->pool, sizeof *layer);

      table->layers =
	pool_nrealloc (cmd->pool, table->layers, table->n_layers + 1,
		       sizeof *table->layers);
      table->layers[table->n_layers] = layer;
      table->n_layers++;

      if (!parse_variables_const_pool
	  (lexer, cmd->pool, cmd->dict,
	   &layer->factor_vars,
	   &layer->n_factor_vars,
	   PV_NO_DUPLICATE))
	return false;
    }

  return true;
}

/* Match a variable.
   If the match succeeds, the variable will be placed in VAR.
   Returns true if successful */
static bool
lex_is_variable (struct lexer *lexer, const struct dictionary *dict,
		 int n)
{
  const char *tstr;
  if (lex_next_token (lexer, n) !=  T_ID)
    return false;

  tstr = lex_next_tokcstr (lexer, n);

  if (NULL == dict_lookup_var (dict, tstr))
    return false;

  return true;
}

bool
means_parse (struct lexer *lexer, struct means *means)
{
  /*   Optional TABLES =   */
  if (lex_match_id (lexer, "TABLES"))
    {
      if (! lex_force_match (lexer, T_EQUALS))
	return false;
    }

  bool more_tables = true;
  /* Parse the "tables" */
  while (more_tables)
    {
      means->table = pool_realloc (means->pool, means->table,
				   (means->n_tables + 1) * sizeof (*means->table));

      if (! parse_means_table_syntax (lexer, means,
				      &means->table[means->n_tables]))
	{
	  return false;
	}
      means->n_tables ++;

      /* Look ahead to see if there are more tables to be parsed */
      more_tables = false;
      if (T_SLASH == lex_next_token (lexer, 0))
	{
	  if (lex_is_variable (lexer, means->dict, 1))
	    {
	      more_tables = true;
	      lex_match (lexer, T_SLASH);
	    }
	}
    }

  /* /MISSING subcommand */
  while (lex_token (lexer) != T_ENDCMD)
    {
      lex_match (lexer, T_SLASH);

      if (lex_match_id (lexer, "MISSING"))
	{
	  /*
	    If no MISSING subcommand is specified, each combination of
	    a dependent variable and categorical variables is handled
	    separately.
	  */
	  lex_match (lexer, T_EQUALS);
	  if (lex_match_id (lexer, "INCLUDE"))
	    {
	      /*
		Use the subcommand  "/MISSING=INCLUDE" to include user-missing
		values in the analysis.
	      */

	      means->ctrl_exclude = MV_SYSTEM;
	      means->dep_exclude = MV_SYSTEM;
	    }
	  else if (lex_match_id (lexer, "DEPENDENT"))
	    /*
	      Use the command "/MISSING=DEPENDENT" to
	      include user-missing values for the categorical variables,
	      while excluding them for the dependent variables.

	      Cases are dropped only when user-missing values
	      appear in dependent  variables.  User-missing
	      values for categorical variables are treated according to
	      their face value.

	      Cases are ALWAYS dropped when System Missing values appear
	      in the categorical variables.
	    */
	    {
	      means->dep_exclude = MV_ANY;
	      means->ctrl_exclude = MV_SYSTEM;
	    }
	  else
	    {
	      lex_error (lexer, NULL);
	      return false;
	    }
	}
      else if (lex_match_id (lexer, "CELLS"))
	{
	  lex_match (lexer, T_EQUALS);

	  /* The default values become overwritten */
	  means->n_statistics = 0;
	  pool_free (means->pool, means->statistics);
	  means->statistics = 0;
	  while (lex_token (lexer) != T_ENDCMD
		 && lex_token (lexer) != T_SLASH)
	    {
	      if (lex_match (lexer, T_ALL))
	      	{
		  pool_free (means->pool, means->statistics);
		  means->statistics = pool_calloc (means->pool,
						   n_MEANS_STATISTICS,
						   sizeof (*means->statistics));
		  means->n_statistics = n_MEANS_STATISTICS;
		  int i;
		  for (i = 0; i < n_MEANS_STATISTICS; ++i)
		    {
		      means->statistics[i] = i;
		    }
	      	}
	      else if (lex_match_id (lexer, "NONE"))
		{
		  means->n_statistics = 0;
		  pool_free (means->pool, means->statistics);
		  means->statistics = 0;
		}
	      else if (lex_match_id (lexer, "DEFAULT"))
		{
		  pool_free (means->pool, means->statistics);
		  means->statistics = pool_calloc (means->pool,
						   3,
						   sizeof *means->statistics);
		  means->statistics[0] = MEANS_MEAN;
		  means->statistics[1] = MEANS_N;
		  means->statistics[2] = MEANS_STDDEV;
		}
	      else
		{
		  int i;
		  for (i = 0; i < n_MEANS_STATISTICS; ++i)
		    {
		      const struct cell_spec *cs = cell_spec + i;
		      if (lex_match_id (lexer, cs->keyword))
			{
			  means->statistics
			    = pool_realloc (means->pool,
					   means->statistics,
					   (means->n_statistics + 1)
					   * sizeof (*means->statistics));

			  means->statistics[means->n_statistics] = i;
			  means->n_statistics++;
			  break;
			}
		    }

		  if (i >= n_MEANS_STATISTICS)
		    {
		      lex_error (lexer, NULL);
		      return false;
		    }
		}
	    }
	}
      else
	{
	  lex_error (lexer, NULL);
	  return false;
	}
    }
  return true;
}
