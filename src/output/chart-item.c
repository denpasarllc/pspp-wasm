/* PSPP - a program for statistical analysis.
   Copyright (C) 2004, 2009, 2011 Free Software Foundation, Inc.

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

#include "output/chart-item.h"
#include "output/chart-item-provider.h"


#include <assert.h>
#include <stdlib.h>
#include <stdio.h>

#include "libpspp/cast.h"
#include "libpspp/compiler.h"
#include "output/driver.h"
#include "output/output-item-provider.h"

#include "output/charts/plot-hist.h"
#include "output/charts/scatterplot.h"
#include "output/charts/barchart.h"
#include "output/charts/piechart.h"

#include "data/case.h"
#include "data/casereader.h"

#include "language/stats/freq.h"


#include "gl/xalloc.h"

/* Initializes ITEM as a chart item of the specified CLASS.  The new chart item
   initially has the specified TITLE, which may be NULL if no title is yet
   available.  The caller retains ownership of TITLE.

   A chart item is an abstract class, that is, a plain chart_item is not useful
   on its own.  Thus, this function is normally called from the initialization
   function of some subclass of chart_item. */
void
chart_item_init (struct chart_item *item, const struct chart_item_class *class,
                 const char *title)
{
  output_item_init (&item->output_item, &chart_item_class);
  item->class = class;
  item->title = title != NULL ? xstrdup (title) : NULL;
}

/* Returns ITEM's title, which is a null pointer if no title has been set. */
const char *
chart_item_get_title (const struct chart_item *item)
{
  return item->title;
}

/* Sets ITEM's title to TITLE, replacing any previous title.  Specify NULL for
   TITLE to clear any title from ITEM.  The caller retains ownership of
   TITLE.

   This function may only be used on a chart_item that is unshared. */
void
chart_item_set_title (struct chart_item *item, const char *title)
{
  assert (!chart_item_is_shared (item));
  free (item->title);
  item->title = title != NULL ? xstrdup (title) : NULL;
}

/* Submits ITEM to the configured output drivers, and transfers ownership to
   the output subsystem. */
void
chart_item_submit (struct chart_item *item)
{
  printf("CHART ITEM SUBMIT********\n");

  if (is_histogram_chart(item)) {
    struct histogram_chart * hist = to_histogram_chart(item);
        for (int i = 0; i < hist->gsl_hist->n; i++) {
    EM_ASM(window.collect_gsl_histogram($0, $1, $2); , hist->gsl_hist->range[i], hist->gsl_hist->bin[i]); 
    }
    EM_ASM(window.draw_gsl_histogram());
  } else if (is_scatterplot_chart(item)) {
    struct scatterplot_chart * spc = to_scatterplot_chart(item);
    struct ccase *c;
    struct casereader *data = casereader_clone (spc->data);
    for (; (c = casereader_read (data)) != NULL; case_unref (c)) {
      EM_ASM(window.collect_scatterplot($0, $1);,
        case_data_idx (c, SP_IDX_X)->f,
        case_data_idx (c, SP_IDX_Y)->f);
    }
    EM_ASM(window.draw_scatterplot());
  } else if (is_barchart (item)) {
    printf("barchart********\n");
    struct barchart *bc = to_barchart (item);
    int i;
    for (i = 0; i < bc->n_nzcats; i++) {
      EM_ASM(window.collect_barchart($0, $1), bc->cats[i]->values[0].f, bc->cats[i]->count );
    }
    EM_ASM(window.draw_barchart());
  } else if (is_piechart(item)) {
    const struct piechart * pie = to_piechart(item);
    int i;
    for (i = 0; i < pie->n_slices ; ++i) {
      EM_ASM(window.collect_piechart($0, $1, $2),
        pie->slices[i].label.ss.length,
        pie->slices[i].label.ss.string,
        pie->slices[i].magnitude);
    }
    EM_ASM(window.draw_piechart());
  }


/*
    histogram_chart

    typedef struct {
  size_t n ;
  double * range ;
  double * bin ;
} gsl_histogram ;


    gsl_histogram *gsl_hist;
    double n;
    double mean;
    double stddev;
    bool show_normal;
*/

  output_submit (&item->output_item);
}

static void
chart_item_destroy (struct output_item *output_item)
{
  struct chart_item *item = to_chart_item (output_item);
  char *title = item->title;
  item->class->destroy (item);
  free (title);
}

const struct output_item_class chart_item_class =
  {
    "chart",
    chart_item_destroy,
  };
