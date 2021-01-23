/* Generated automatically -- do not modify!    -*- buffer-read-only: t -*- */
#include <config.h>
#include "output/spv/light-binary-parser.h"
#include <stdio.h>
#include <stdlib.h>
#include "libpspp/str.h"
#include "gl/xalloc.h"

bool
spvlb_parse_table (struct spvbin_input *input, struct spvlb_table **p_)
{
    *p_ = NULL;
    struct spvlb_table *p = xzalloc (sizeof *p);
    p->start = input->ofs;

    if (!spvlb_parse_header (input, &p->header))
        goto error;
    if (!spvlb_parse_titles (input, &p->titles))
        goto error;
    if (!spvlb_parse_footnotes (input, &p->footnotes))
        goto error;
    if (!spvlb_parse_areas (input, &p->areas))
        goto error;
    if (!spvlb_parse_borders (input, &p->borders))
        goto error;
    if (!spvlb_parse_print_settings (input, &p->ps))
        goto error;
    if (!spvlb_parse_table_settings (input, &p->ts))
        goto error;
    if (!spvlb_parse_formats (input, &p->formats))
        goto error;
    if (!spvlb_parse_dimensions (input, &p->dimensions))
        goto error;
    if (!spvlb_parse_axes (input, &p->axes))
        goto error;
    if (!spvlb_parse_cells (input, &p->cells))
        goto error;
    do {
        struct spvbin_position pos = spvbin_position_save (input);
        size_t save_n_errors = input->n_errors;
        if (!spvbin_match_bytes (input, "\x01", 1))
            goto backtrack;
        break;

    backtrack:
        spvbin_position_restore (&pos, input);
        input->n_errors = save_n_errors;
        break;
    } while (0);

    p->len = input->ofs - p->start;
    *p_ = p;
    return true;

error:
    spvbin_error (input, "Table", p->start);
    spvlb_free_table (p);
    return false;
}

void
spvlb_free_table (struct spvlb_table *p)
{
    if (p == NULL)
        return;

    spvlb_free_header (p->header);
    spvlb_free_titles (p->titles);
    spvlb_free_footnotes (p->footnotes);
    spvlb_free_areas (p->areas);
    spvlb_free_borders (p->borders);
    spvlb_free_print_settings (p->ps);
    spvlb_free_table_settings (p->ts);
    spvlb_free_formats (p->formats);
    spvlb_free_dimensions (p->dimensions);
    spvlb_free_axes (p->axes);
    spvlb_free_cells (p->cells);
    free (p);
}

void
spvlb_print_table (const char *title, int indent, const struct spvlb_table *p)
{
    spvbin_print_header (title, p ? p->start : -1, p ? p->len : -1, indent);
    if (p == NULL) {
        printf ("none\n");
        return;
    }
    putchar ('\n');

    spvlb_print_header ("header", indent + 1, p->header);

    spvlb_print_titles ("titles", indent + 1, p->titles);

    spvlb_print_footnotes ("footnotes", indent + 1, p->footnotes);

    spvlb_print_areas ("areas", indent + 1, p->areas);

    spvlb_print_borders ("borders", indent + 1, p->borders);

    spvlb_print_print_settings ("ps", indent + 1, p->ps);

    spvlb_print_table_settings ("ts", indent + 1, p->ts);

    spvlb_print_formats ("formats", indent + 1, p->formats);

    spvlb_print_dimensions ("dimensions", indent + 1, p->dimensions);

    spvlb_print_axes ("axes", indent + 1, p->axes);

    spvlb_print_cells ("cells", indent + 1, p->cells);

}

bool
spvlb_parse_header (struct spvbin_input *input, struct spvlb_header **p_)
{
    *p_ = NULL;
    struct spvlb_header *p = xzalloc (sizeof *p);
    p->start = input->ofs;

    if (!spvbin_match_bytes (input, "\x01\x00", 2))
        goto error;
    if (!spvbin_parse_int32 (input, &p->version))
        goto error;
    input->version = p->version;
    if (!spvbin_parse_bool (input, &p->x0))
        goto error;
    if (!spvbin_parse_bool (input, &p->x1))
        goto error;
    if (!spvbin_parse_bool (input, &p->rotate_inner_column_labels))
        goto error;
    if (!spvbin_parse_bool (input, &p->rotate_outer_row_labels))
        goto error;
    if (!spvbin_parse_bool (input, &p->x2))
        goto error;
    if (!spvbin_parse_int32 (input, &p->x3))
        goto error;
    if (!spvbin_parse_int32 (input, &p->min_col_width))
        goto error;
    if (!spvbin_parse_int32 (input, &p->max_col_width))
        goto error;
    if (!spvbin_parse_int32 (input, &p->min_row_height))
        goto error;
    if (!spvbin_parse_int32 (input, &p->max_row_height))
        goto error;
    if (!spvbin_parse_int64 (input, &p->table_id))
        goto error;

    p->len = input->ofs - p->start;
    *p_ = p;
    return true;

error:
    spvbin_error (input, "Header", p->start);
    spvlb_free_header (p);
    return false;
}

void
spvlb_free_header (struct spvlb_header *p)
{
    if (p == NULL)
        return;

    free (p);
}

void
spvlb_print_header (const char *title, int indent, const struct spvlb_header *p)
{
    spvbin_print_header (title, p ? p->start : -1, p ? p->len : -1, indent);
    if (p == NULL) {
        printf ("none\n");
        return;
    }
    putchar ('\n');


    spvbin_print_int32 ("version", indent + 1, p->version);

    spvbin_print_bool ("x0", indent + 1, p->x0);

    spvbin_print_bool ("x1", indent + 1, p->x1);

    spvbin_print_bool ("rotate-inner-column-labels", indent + 1, p->rotate_inner_column_labels);

    spvbin_print_bool ("rotate-outer-row-labels", indent + 1, p->rotate_outer_row_labels);

    spvbin_print_bool ("x2", indent + 1, p->x2);

    spvbin_print_int32 ("x3", indent + 1, p->x3);

    spvbin_print_int32 ("min-col-width", indent + 1, p->min_col_width);

    spvbin_print_int32 ("max-col-width", indent + 1, p->max_col_width);

    spvbin_print_int32 ("min-row-height", indent + 1, p->min_row_height);

    spvbin_print_int32 ("max-row-height", indent + 1, p->max_row_height);

    spvbin_print_int64 ("table-id", indent + 1, p->table_id);
}

bool
spvlb_parse_titles (struct spvbin_input *input, struct spvlb_titles **p_)
{
    *p_ = NULL;
    struct spvlb_titles *p = xzalloc (sizeof *p);
    p->start = input->ofs;

    if (!spvlb_parse_value (input, &p->title))
        goto error;
    do {
        struct spvbin_position pos = spvbin_position_save (input);
        size_t save_n_errors = input->n_errors;
        if (!spvbin_match_bytes (input, "\x01", 1))
            goto backtrack;
        break;

    backtrack:
        spvbin_position_restore (&pos, input);
        input->n_errors = save_n_errors;
        break;
    } while (0);
    if (!spvlb_parse_value (input, &p->subtype))
        goto error;
    do {
        struct spvbin_position pos2 = spvbin_position_save (input);
        size_t save_n_errors2 = input->n_errors;
        if (!spvbin_match_bytes (input, "\x01", 1))
            goto backtrack2;
        break;

    backtrack2:
        spvbin_position_restore (&pos2, input);
        input->n_errors = save_n_errors2;
        break;
    } while (0);
    if (!spvbin_match_bytes (input, "\x31", 1))
        goto error;
    if (!spvlb_parse_value (input, &p->user_title))
        goto error;
    do {
        struct spvbin_position pos3 = spvbin_position_save (input);
        size_t save_n_errors3 = input->n_errors;
        if (!spvbin_match_bytes (input, "\x01", 1))
            goto backtrack3;
        break;

    backtrack3:
        spvbin_position_restore (&pos3, input);
        input->n_errors = save_n_errors3;
        break;
    } while (0);
    do {
        struct spvbin_position pos4 = spvbin_position_save (input);
        size_t save_n_errors4 = input->n_errors;
        if (!spvbin_match_bytes (input, "\x31", 1))
            goto backtrack4;
        if (!spvlb_parse_value (input, &p->corner_text))
            goto backtrack4;
        break;

    backtrack4:
        spvbin_position_restore (&pos4, input);
        input->n_errors = save_n_errors4;
        if (!spvbin_match_bytes (input, "\x58", 1))
            goto error;
        break;
    } while (0);
    do {
        struct spvbin_position pos5 = spvbin_position_save (input);
        size_t save_n_errors5 = input->n_errors;
        if (!spvbin_match_bytes (input, "\x31", 1))
            goto backtrack5;
        if (!spvlb_parse_value (input, &p->caption))
            goto backtrack5;
        break;

    backtrack5:
        spvbin_position_restore (&pos5, input);
        input->n_errors = save_n_errors5;
        if (!spvbin_match_bytes (input, "\x58", 1))
            goto error;
        break;
    } while (0);

    p->len = input->ofs - p->start;
    *p_ = p;
    return true;

error:
    spvbin_error (input, "Titles", p->start);
    spvlb_free_titles (p);
    return false;
}

void
spvlb_free_titles (struct spvlb_titles *p)
{
    if (p == NULL)
        return;

    spvlb_free_value (p->title);
    spvlb_free_value (p->subtype);
    spvlb_free_value (p->user_title);
    spvlb_free_value (p->corner_text);
    spvlb_free_value (p->caption);
    free (p);
}

void
spvlb_print_titles (const char *title, int indent, const struct spvlb_titles *p)
{
    spvbin_print_header (title, p ? p->start : -1, p ? p->len : -1, indent);
    if (p == NULL) {
        printf ("none\n");
        return;
    }
    putchar ('\n');

    spvlb_print_value ("title", indent + 1, p->title);


    spvlb_print_value ("subtype", indent + 1, p->subtype);



    spvlb_print_value ("user-title", indent + 1, p->user_title);



    spvlb_print_value ("corner-text", indent + 1, p->corner_text);


    spvlb_print_value ("caption", indent + 1, p->caption);
}

bool
spvlb_parse_footnotes (struct spvbin_input *input, struct spvlb_footnotes **p_)
{
    *p_ = NULL;
    struct spvlb_footnotes *p = xzalloc (sizeof *p);
    p->start = input->ofs;

    if (!spvbin_parse_int32 (input, &p->n_footnotes))
        goto error;
    p->footnotes = xcalloc (p->n_footnotes, sizeof *p->footnotes);
    for (int i = 0; i < p->n_footnotes; i++)
        if (!spvlb_parse_footnote (input, &p->footnotes[i]))
            goto error;

    p->len = input->ofs - p->start;
    *p_ = p;
    return true;

error:
    spvbin_error (input, "Footnotes", p->start);
    spvlb_free_footnotes (p);
    return false;
}

void
spvlb_free_footnotes (struct spvlb_footnotes *p)
{
    if (p == NULL)
        return;

    for (int i = 0; i < p->n_footnotes; i++)
        spvlb_free_footnote (p->footnotes[i]);
    free (p->footnotes);
    free (p);
}

void
spvlb_print_footnotes (const char *title, int indent, const struct spvlb_footnotes *p)
{
    spvbin_print_header (title, p ? p->start : -1, p ? p->len : -1, indent);
    if (p == NULL) {
        printf ("none\n");
        return;
    }
    putchar ('\n');

    spvbin_print_int32 ("n-footnotes", indent + 1, p->n_footnotes);

    for (int i = 0; i < p->n_footnotes; i++) {
        char *elem_name = xasprintf ("footnotes[%d]", i);
        spvlb_print_footnote (elem_name, indent + 1, p->footnotes[i]);
        free (elem_name);
    }
}

bool
spvlb_parse_footnote (struct spvbin_input *input, struct spvlb_footnote **p_)
{
    *p_ = NULL;
    struct spvlb_footnote *p = xzalloc (sizeof *p);
    p->start = input->ofs;

    if (!spvlb_parse_value (input, &p->text))
        goto error;
    do {
        struct spvbin_position pos = spvbin_position_save (input);
        size_t save_n_errors = input->n_errors;
        if (!spvbin_match_bytes (input, "\x58", 1))
            goto backtrack;
        break;

    backtrack:
        spvbin_position_restore (&pos, input);
        input->n_errors = save_n_errors;
        if (!spvbin_match_bytes (input, "\x31", 1))
            goto error;
        if (!spvlb_parse_value (input, &p->marker))
            goto error;
        break;
    } while (0);
    if (!spvbin_parse_int32 (input, &p->show))
        goto error;

    p->len = input->ofs - p->start;
    *p_ = p;
    return true;

error:
    spvbin_error (input, "Footnote", p->start);
    spvlb_free_footnote (p);
    return false;
}

void
spvlb_free_footnote (struct spvlb_footnote *p)
{
    if (p == NULL)
        return;

    spvlb_free_value (p->text);
    spvlb_free_value (p->marker);
    free (p);
}

void
spvlb_print_footnote (const char *title, int indent, const struct spvlb_footnote *p)
{
    spvbin_print_header (title, p ? p->start : -1, p ? p->len : -1, indent);
    if (p == NULL) {
        printf ("none\n");
        return;
    }
    putchar ('\n');

    spvlb_print_value ("text", indent + 1, p->text);


    spvlb_print_value ("marker", indent + 1, p->marker);

    spvbin_print_int32 ("show", indent + 1, p->show);
}

bool
spvlb_parse_areas (struct spvbin_input *input, struct spvlb_areas **p_)
{
    *p_ = NULL;
    struct spvlb_areas *p = xzalloc (sizeof *p);
    p->start = input->ofs;

    do {
        struct spvbin_position pos = spvbin_position_save (input);
        size_t save_n_errors = input->n_errors;
        if (!spvbin_match_bytes (input, "\x00", 1))
            goto backtrack;
        break;

    backtrack:
        spvbin_position_restore (&pos, input);
        input->n_errors = save_n_errors;
        break;
    } while (0);
    for (int i = 0; i < 8; i++)
        if (!spvlb_parse_area (input, &p->areas[i]))
            goto error;

    p->len = input->ofs - p->start;
    *p_ = p;
    return true;

error:
    spvbin_error (input, "Areas", p->start);
    spvlb_free_areas (p);
    return false;
}

void
spvlb_free_areas (struct spvlb_areas *p)
{
    if (p == NULL)
        return;

    for (int i = 0; i < 8; i++)
        spvlb_free_area (p->areas[i]);
    free (p);
}

void
spvlb_print_areas (const char *title, int indent, const struct spvlb_areas *p)
{
    spvbin_print_header (title, p ? p->start : -1, p ? p->len : -1, indent);
    if (p == NULL) {
        printf ("none\n");
        return;
    }
    putchar ('\n');


    for (int i = 0; i < 8; i++) {
        char *elem_name = xasprintf ("areas[%d]", i);
        spvlb_print_area (elem_name, indent + 1, p->areas[i]);
        free (elem_name);
    }
}

bool
spvlb_parse_area (struct spvbin_input *input, struct spvlb_area **p_)
{
    *p_ = NULL;
    struct spvlb_area *p = xzalloc (sizeof *p);
    p->start = input->ofs;

    if (!spvbin_parse_byte (input, &p->index))
        goto error;
    if (!spvbin_match_bytes (input, "\x31", 1))
        goto error;
    if (!spvbin_parse_string (input, &p->typeface))
        goto error;
    if (!spvbin_parse_float (input, &p->size))
        goto error;
    if (!spvbin_parse_int32 (input, &p->style))
        goto error;
    if (!spvbin_parse_bool (input, &p->underline))
        goto error;
    if (!spvbin_parse_int32 (input, &p->halign))
        goto error;
    if (!spvbin_parse_int32 (input, &p->valign))
        goto error;
    if (!spvbin_parse_string (input, &p->fg_color))
        goto error;
    if (!spvbin_parse_string (input, &p->bg_color))
        goto error;
    if (!spvbin_parse_bool (input, &p->alternate))
        goto error;
    if (!spvbin_parse_string (input, &p->alt_fg_color))
        goto error;
    if (!spvbin_parse_string (input, &p->alt_bg_color))
        goto error;
    if (input->version == 0x3) {
        if (!spvbin_parse_int32 (input, &p->left_margin))
            goto error;
        if (!spvbin_parse_int32 (input, &p->right_margin))
            goto error;
        if (!spvbin_parse_int32 (input, &p->top_margin))
            goto error;
        if (!spvbin_parse_int32 (input, &p->bottom_margin))
            goto error;
    }

    p->len = input->ofs - p->start;
    *p_ = p;
    return true;

error:
    spvbin_error (input, "Area", p->start);
    spvlb_free_area (p);
    return false;
}

void
spvlb_free_area (struct spvlb_area *p)
{
    if (p == NULL)
        return;

    free (p->typeface);
    free (p->fg_color);
    free (p->bg_color);
    free (p->alt_fg_color);
    free (p->alt_bg_color);
    free (p);
}

void
spvlb_print_area (const char *title, int indent, const struct spvlb_area *p)
{
    spvbin_print_header (title, p ? p->start : -1, p ? p->len : -1, indent);
    if (p == NULL) {
        printf ("none\n");
        return;
    }
    putchar ('\n');

    spvbin_print_byte ("index", indent + 1, p->index);


    spvbin_print_string ("typeface", indent + 1, p->typeface);

    spvbin_print_double ("size", indent + 1, p->size);

    spvbin_print_int32 ("style", indent + 1, p->style);

    spvbin_print_bool ("underline", indent + 1, p->underline);

    spvbin_print_int32 ("halign", indent + 1, p->halign);

    spvbin_print_int32 ("valign", indent + 1, p->valign);

    spvbin_print_string ("fg-color", indent + 1, p->fg_color);

    spvbin_print_string ("bg-color", indent + 1, p->bg_color);

    spvbin_print_bool ("alternate", indent + 1, p->alternate);

    spvbin_print_string ("alt-fg-color", indent + 1, p->alt_fg_color);

    spvbin_print_string ("alt-bg-color", indent + 1, p->alt_bg_color);

    spvbin_print_int32 ("left-margin", indent + 1, p->left_margin);

    spvbin_print_int32 ("right-margin", indent + 1, p->right_margin);

    spvbin_print_int32 ("top-margin", indent + 1, p->top_margin);

    spvbin_print_int32 ("bottom-margin", indent + 1, p->bottom_margin);
}

bool
spvlb_parse_borders (struct spvbin_input *input, struct spvlb_borders **p_)
{
    *p_ = NULL;
    struct spvlb_borders *p = xzalloc (sizeof *p);
    p->start = input->ofs;

    struct spvbin_position pos = spvbin_position_save (input);
    struct spvbin_limit saved_limit;
    if (!spvbin_limit_parse (&saved_limit, input))
        goto error;
    do {
        if (!spvbin_match_bytes (input, "\x00\x00\x00\x01", 4))
            goto backtrack;
        if (!spvbin_parse_be32 (input, &p->n_borders))
            goto backtrack;
        p->borders = xcalloc (p->n_borders, sizeof *p->borders);
        for (int i = 0; i < p->n_borders; i++)
            if (!spvlb_parse_border (input, &p->borders[i]))
                goto backtrack;
        if (!spvbin_parse_bool (input, &p->show_grid_lines))
            goto backtrack;
        if (!spvbin_match_bytes (input, "\x00\x00\x00", 3))
            goto backtrack;
        if (!spvbin_input_at_end (input))
            goto backtrack;
        spvbin_limit_pop (&saved_limit, input);
        break;

    backtrack:
        spvbin_position_restore (&pos, input);
        spvbin_limit_pop (&saved_limit, input);
        goto error;
    } while (0);

    p->len = input->ofs - p->start;
    *p_ = p;
    return true;

error:
    spvbin_error (input, "Borders", p->start);
    spvlb_free_borders (p);
    return false;
}

void
spvlb_free_borders (struct spvlb_borders *p)
{
    if (p == NULL)
        return;

    for (int i = 0; i < p->n_borders; i++)
        spvlb_free_border (p->borders[i]);
    free (p->borders);
    free (p);
}

void
spvlb_print_borders (const char *title, int indent, const struct spvlb_borders *p)
{
    spvbin_print_header (title, p ? p->start : -1, p ? p->len : -1, indent);
    if (p == NULL) {
        printf ("none\n");
        return;
    }
    putchar ('\n');


        spvbin_print_int32 ("n-borders", indent + 1, p->n_borders);

        for (int i = 0; i < p->n_borders; i++) {
            char *elem_name = xasprintf ("borders[%d]", i);
            spvlb_print_border (elem_name, indent + 1, p->borders[i]);
            free (elem_name);
        }

        spvbin_print_bool ("show-grid-lines", indent + 1, p->show_grid_lines);

}

bool
spvlb_parse_border (struct spvbin_input *input, struct spvlb_border **p_)
{
    *p_ = NULL;
    struct spvlb_border *p = xzalloc (sizeof *p);
    p->start = input->ofs;

    if (!spvbin_parse_be32 (input, &p->border_type))
        goto error;
    if (!spvbin_parse_be32 (input, &p->stroke_type))
        goto error;
    if (!spvbin_parse_be32 (input, &p->color))
        goto error;

    p->len = input->ofs - p->start;
    *p_ = p;
    return true;

error:
    spvbin_error (input, "Border", p->start);
    spvlb_free_border (p);
    return false;
}

void
spvlb_free_border (struct spvlb_border *p)
{
    if (p == NULL)
        return;

    free (p);
}

void
spvlb_print_border (const char *title, int indent, const struct spvlb_border *p)
{
    spvbin_print_header (title, p ? p->start : -1, p ? p->len : -1, indent);
    if (p == NULL) {
        printf ("none\n");
        return;
    }
    putchar ('\n');

    spvbin_print_int32 ("border-type", indent + 1, p->border_type);

    spvbin_print_int32 ("stroke-type", indent + 1, p->stroke_type);

    spvbin_print_int32 ("color", indent + 1, p->color);
}

bool
spvlb_parse_print_settings (struct spvbin_input *input, struct spvlb_print_settings **p_)
{
    *p_ = NULL;
    struct spvlb_print_settings *p = xzalloc (sizeof *p);
    p->start = input->ofs;

    struct spvbin_position pos = spvbin_position_save (input);
    struct spvbin_limit saved_limit;
    if (!spvbin_limit_parse (&saved_limit, input))
        goto error;
    do {
        if (!spvbin_match_bytes (input, "\x00\x00\x00\x01", 4))
            goto backtrack;
        if (!spvbin_parse_bool (input, &p->all_layers))
            goto backtrack;
        if (!spvbin_parse_bool (input, &p->paginate_layers))
            goto backtrack;
        if (!spvbin_parse_bool (input, &p->fit_width))
            goto backtrack;
        if (!spvbin_parse_bool (input, &p->fit_length))
            goto backtrack;
        if (!spvbin_parse_bool (input, &p->top_continuation))
            goto backtrack;
        if (!spvbin_parse_bool (input, &p->bottom_continuation))
            goto backtrack;
        if (!spvbin_parse_be32 (input, &p->n_orphan_lines))
            goto backtrack;
        if (!spvbin_parse_bestring (input, &p->continuation_string))
            goto backtrack;
        if (!spvbin_input_at_end (input))
            goto backtrack;
        spvbin_limit_pop (&saved_limit, input);
        break;

    backtrack:
        spvbin_position_restore (&pos, input);
        spvbin_limit_pop (&saved_limit, input);
        goto error;
    } while (0);

    p->len = input->ofs - p->start;
    *p_ = p;
    return true;

error:
    spvbin_error (input, "PrintSettings", p->start);
    spvlb_free_print_settings (p);
    return false;
}

void
spvlb_free_print_settings (struct spvlb_print_settings *p)
{
    if (p == NULL)
        return;

    free (p->continuation_string);
    free (p);
}

void
spvlb_print_print_settings (const char *title, int indent, const struct spvlb_print_settings *p)
{
    spvbin_print_header (title, p ? p->start : -1, p ? p->len : -1, indent);
    if (p == NULL) {
        printf ("none\n");
        return;
    }
    putchar ('\n');


        spvbin_print_bool ("all-layers", indent + 1, p->all_layers);

        spvbin_print_bool ("paginate-layers", indent + 1, p->paginate_layers);

        spvbin_print_bool ("fit-width", indent + 1, p->fit_width);

        spvbin_print_bool ("fit-length", indent + 1, p->fit_length);

        spvbin_print_bool ("top-continuation", indent + 1, p->top_continuation);

        spvbin_print_bool ("bottom-continuation", indent + 1, p->bottom_continuation);

        spvbin_print_int32 ("n-orphan-lines", indent + 1, p->n_orphan_lines);

        spvbin_print_string ("continuation-string", indent + 1, p->continuation_string);
}

bool
spvlb_parse_table_settings (struct spvbin_input *input, struct spvlb_table_settings **p_)
{
    *p_ = NULL;
    struct spvlb_table_settings *p = xzalloc (sizeof *p);
    p->start = input->ofs;

    struct spvbin_position pos = spvbin_position_save (input);
    struct spvbin_limit saved_limit;
    if (!spvbin_limit_parse (&saved_limit, input))
        goto error;
    do {
        if (input->version == 0x3) {
            if (!spvbin_match_bytes (input, "\x00\x00\x00\x01", 4))
                goto backtrack;
            if (!spvbin_parse_be32 (input, &p->x5))
                goto backtrack;
            if (!spvbin_parse_be32 (input, &p->current_layer))
                goto backtrack;
            if (!spvbin_parse_bool (input, &p->omit_empty))
                goto backtrack;
            if (!spvbin_parse_bool (input, &p->show_row_labels_in_corner))
                goto backtrack;
            if (!spvbin_parse_bool (input, &p->show_alphabetic_markers))
                goto backtrack;
            if (!spvbin_parse_bool (input, &p->footnote_marker_superscripts))
                goto backtrack;
            if (!spvbin_parse_byte (input, &p->x6))
                goto backtrack;
            struct spvbin_position pos2 = spvbin_position_save (input);
            struct spvbin_limit saved_limit2;
            if (!spvbin_limit_parse_be (&saved_limit2, input))
                goto backtrack;
            do {
                if (!spvlb_parse_breakpoints (input, &p->row_breaks))
                    goto backtrack2;
                if (!spvlb_parse_breakpoints (input, &p->col_breaks))
                    goto backtrack2;
                if (!spvlb_parse_keeps (input, &p->row_keeps))
                    goto backtrack2;
                if (!spvlb_parse_keeps (input, &p->col_keeps))
                    goto backtrack2;
                if (!spvlb_parse_point_keeps (input, &p->row_point_keeps))
                    goto backtrack2;
                if (!spvlb_parse_point_keeps (input, &p->col_point_keeps))
                    goto backtrack2;
                if (!spvbin_input_at_end (input))
                    goto backtrack2;
                spvbin_limit_pop (&saved_limit2, input);
                break;

            backtrack2:
                spvbin_position_restore (&pos2, input);
                spvbin_limit_pop (&saved_limit2, input);
                goto backtrack;
            } while (0);
            if (!spvbin_parse_bestring (input, &p->notes))
                goto backtrack;
            if (!spvbin_parse_bestring (input, &p->table_look))
                goto backtrack;
        }
        input->ofs = input->size;
        spvbin_limit_pop (&saved_limit, input);
        break;

    backtrack:
        spvbin_position_restore (&pos, input);
        spvbin_limit_pop (&saved_limit, input);
        goto error;
    } while (0);

    p->len = input->ofs - p->start;
    *p_ = p;
    return true;

error:
    spvbin_error (input, "TableSettings", p->start);
    spvlb_free_table_settings (p);
    return false;
}

void
spvlb_free_table_settings (struct spvlb_table_settings *p)
{
    if (p == NULL)
        return;

    spvlb_free_breakpoints (p->row_breaks);
    spvlb_free_breakpoints (p->col_breaks);
    spvlb_free_keeps (p->row_keeps);
    spvlb_free_keeps (p->col_keeps);
    spvlb_free_point_keeps (p->row_point_keeps);
    spvlb_free_point_keeps (p->col_point_keeps);
    free (p->notes);
    free (p->table_look);
    free (p);
}

void
spvlb_print_table_settings (const char *title, int indent, const struct spvlb_table_settings *p)
{
    spvbin_print_header (title, p ? p->start : -1, p ? p->len : -1, indent);
    if (p == NULL) {
        printf ("none\n");
        return;
    }
    putchar ('\n');


        spvbin_print_int32 ("x5", indent + 1, p->x5);

        spvbin_print_int32 ("current-layer", indent + 1, p->current_layer);

        spvbin_print_bool ("omit-empty", indent + 1, p->omit_empty);

        spvbin_print_bool ("show-row-labels-in-corner", indent + 1, p->show_row_labels_in_corner);

        spvbin_print_bool ("show-alphabetic-markers", indent + 1, p->show_alphabetic_markers);

        spvbin_print_bool ("footnote-marker-superscripts", indent + 1, p->footnote_marker_superscripts);

        spvbin_print_byte ("x6", indent + 1, p->x6);

            spvlb_print_breakpoints ("row-breaks", indent + 1, p->row_breaks);

            spvlb_print_breakpoints ("col-breaks", indent + 1, p->col_breaks);

            spvlb_print_keeps ("row-keeps", indent + 1, p->row_keeps);

            spvlb_print_keeps ("col-keeps", indent + 1, p->col_keeps);

            spvlb_print_point_keeps ("row-point-keeps", indent + 1, p->row_point_keeps);

            spvlb_print_point_keeps ("col-point-keeps", indent + 1, p->col_point_keeps);

            spvbin_print_string ("notes", indent + 1, p->notes);

            spvbin_print_string ("table-look", indent + 1, p->table_look);
}

bool
spvlb_parse_breakpoints (struct spvbin_input *input, struct spvlb_breakpoints **p_)
{
    *p_ = NULL;
    struct spvlb_breakpoints *p = xzalloc (sizeof *p);
    p->start = input->ofs;

    if (!spvbin_parse_be32 (input, &p->n_breaks))
        goto error;
    p->breaks = xcalloc (p->n_breaks, sizeof *p->breaks);
    for (int i = 0; i < p->n_breaks; i++)
        if (!spvbin_parse_be32 (input, &p->breaks[i]))
            goto error;

    p->len = input->ofs - p->start;
    *p_ = p;
    return true;

error:
    spvbin_error (input, "Breakpoints", p->start);
    spvlb_free_breakpoints (p);
    return false;
}

void
spvlb_free_breakpoints (struct spvlb_breakpoints *p)
{
    if (p == NULL)
        return;

    free (p->breaks);
    free (p);
}

void
spvlb_print_breakpoints (const char *title, int indent, const struct spvlb_breakpoints *p)
{
    spvbin_print_header (title, p ? p->start : -1, p ? p->len : -1, indent);
    if (p == NULL) {
        printf ("none\n");
        return;
    }
    putchar ('\n');

    spvbin_print_int32 ("n-breaks", indent + 1, p->n_breaks);

    for (int i = 0; i < p->n_breaks; i++) {
        char *elem_name = xasprintf ("breaks[%d]", i);
        spvbin_print_int32 (elem_name, indent + 1, p->breaks[i]);
        free (elem_name);
    }
}

bool
spvlb_parse_keeps (struct spvbin_input *input, struct spvlb_keeps **p_)
{
    *p_ = NULL;
    struct spvlb_keeps *p = xzalloc (sizeof *p);
    p->start = input->ofs;

    if (!spvbin_parse_be32 (input, &p->n_keeps))
        goto error;
    p->keeps = xcalloc (p->n_keeps, sizeof *p->keeps);
    for (int i = 0; i < p->n_keeps; i++)
        if (!spvlb_parse_keep (input, &p->keeps[i]))
            goto error;

    p->len = input->ofs - p->start;
    *p_ = p;
    return true;

error:
    spvbin_error (input, "Keeps", p->start);
    spvlb_free_keeps (p);
    return false;
}

void
spvlb_free_keeps (struct spvlb_keeps *p)
{
    if (p == NULL)
        return;

    for (int i = 0; i < p->n_keeps; i++)
        spvlb_free_keep (p->keeps[i]);
    free (p->keeps);
    free (p);
}

void
spvlb_print_keeps (const char *title, int indent, const struct spvlb_keeps *p)
{
    spvbin_print_header (title, p ? p->start : -1, p ? p->len : -1, indent);
    if (p == NULL) {
        printf ("none\n");
        return;
    }
    putchar ('\n');

    spvbin_print_int32 ("n-keeps", indent + 1, p->n_keeps);

    for (int i = 0; i < p->n_keeps; i++) {
        char *elem_name = xasprintf ("keeps[%d]", i);
        spvlb_print_keep (elem_name, indent + 1, p->keeps[i]);
        free (elem_name);
    }
}

bool
spvlb_parse_keep (struct spvbin_input *input, struct spvlb_keep **p_)
{
    *p_ = NULL;
    struct spvlb_keep *p = xzalloc (sizeof *p);
    p->start = input->ofs;

    if (!spvbin_parse_be32 (input, &p->offset))
        goto error;
    if (!spvbin_parse_be32 (input, &p->n))
        goto error;

    p->len = input->ofs - p->start;
    *p_ = p;
    return true;

error:
    spvbin_error (input, "Keep", p->start);
    spvlb_free_keep (p);
    return false;
}

void
spvlb_free_keep (struct spvlb_keep *p)
{
    if (p == NULL)
        return;

    free (p);
}

void
spvlb_print_keep (const char *title, int indent, const struct spvlb_keep *p)
{
    spvbin_print_header (title, p ? p->start : -1, p ? p->len : -1, indent);
    if (p == NULL) {
        printf ("none\n");
        return;
    }
    putchar ('\n');

    spvbin_print_int32 ("offset", indent + 1, p->offset);

    spvbin_print_int32 ("n", indent + 1, p->n);
}

bool
spvlb_parse_point_keeps (struct spvbin_input *input, struct spvlb_point_keeps **p_)
{
    *p_ = NULL;
    struct spvlb_point_keeps *p = xzalloc (sizeof *p);
    p->start = input->ofs;

    if (!spvbin_parse_be32 (input, &p->n_point_keeps))
        goto error;
    p->point_keeps = xcalloc (p->n_point_keeps, sizeof *p->point_keeps);
    for (int i = 0; i < p->n_point_keeps; i++)
        if (!spvlb_parse_point_keep (input, &p->point_keeps[i]))
            goto error;

    p->len = input->ofs - p->start;
    *p_ = p;
    return true;

error:
    spvbin_error (input, "PointKeeps", p->start);
    spvlb_free_point_keeps (p);
    return false;
}

void
spvlb_free_point_keeps (struct spvlb_point_keeps *p)
{
    if (p == NULL)
        return;

    for (int i = 0; i < p->n_point_keeps; i++)
        spvlb_free_point_keep (p->point_keeps[i]);
    free (p->point_keeps);
    free (p);
}

void
spvlb_print_point_keeps (const char *title, int indent, const struct spvlb_point_keeps *p)
{
    spvbin_print_header (title, p ? p->start : -1, p ? p->len : -1, indent);
    if (p == NULL) {
        printf ("none\n");
        return;
    }
    putchar ('\n');

    spvbin_print_int32 ("n-point-keeps", indent + 1, p->n_point_keeps);

    for (int i = 0; i < p->n_point_keeps; i++) {
        char *elem_name = xasprintf ("point-keeps[%d]", i);
        spvlb_print_point_keep (elem_name, indent + 1, p->point_keeps[i]);
        free (elem_name);
    }
}

bool
spvlb_parse_point_keep (struct spvbin_input *input, struct spvlb_point_keep **p_)
{
    *p_ = NULL;
    struct spvlb_point_keep *p = xzalloc (sizeof *p);
    p->start = input->ofs;

    if (!spvbin_parse_be32 (input, &p->offset))
        goto error;
    if (!spvbin_parse_be32 (input, NULL))
        goto error;
    if (!spvbin_parse_be32 (input, NULL))
        goto error;

    p->len = input->ofs - p->start;
    *p_ = p;
    return true;

error:
    spvbin_error (input, "PointKeep", p->start);
    spvlb_free_point_keep (p);
    return false;
}

void
spvlb_free_point_keep (struct spvlb_point_keep *p)
{
    if (p == NULL)
        return;

    free (p);
}

void
spvlb_print_point_keep (const char *title, int indent, const struct spvlb_point_keep *p)
{
    spvbin_print_header (title, p ? p->start : -1, p ? p->len : -1, indent);
    if (p == NULL) {
        printf ("none\n");
        return;
    }
    putchar ('\n');

    spvbin_print_int32 ("offset", indent + 1, p->offset);


}

bool
spvlb_parse_formats (struct spvbin_input *input, struct spvlb_formats **p_)
{
    *p_ = NULL;
    struct spvlb_formats *p = xzalloc (sizeof *p);
    p->start = input->ofs;

    if (!spvbin_parse_int32 (input, &p->n_widths))
        goto error;
    p->widths = xcalloc (p->n_widths, sizeof *p->widths);
    for (int i = 0; i < p->n_widths; i++)
        if (!spvbin_parse_int32 (input, &p->widths[i]))
            goto error;
    if (!spvbin_parse_string (input, &p->locale))
        goto error;
    if (!spvbin_parse_int32 (input, &p->current_layer))
        goto error;
    if (!spvbin_parse_bool (input, &p->x7))
        goto error;
    if (!spvbin_parse_bool (input, &p->x8))
        goto error;
    if (!spvbin_parse_bool (input, &p->x9))
        goto error;
    if (!spvlb_parse_y0 (input, &p->y0))
        goto error;
    if (!spvlb_parse_custom_currency (input, &p->custom_currency))
        goto error;
    struct spvbin_position pos = spvbin_position_save (input);
    struct spvbin_limit saved_limit;
    if (!spvbin_limit_parse (&saved_limit, input))
        goto error;
    do {
        if (input->version == 0x1) {
            do {
                struct spvbin_position pos2 = spvbin_position_save (input);
                size_t save_n_errors = input->n_errors;
                if (!spvlb_parse_x0 (input, &p->x0))
                    goto backtrack2;
                break;

            backtrack2:
                spvbin_position_restore (&pos2, input);
                input->n_errors = save_n_errors;
                break;
            } while (0);
        }
        if (input->version == 0x3) {
            struct spvbin_position pos3 = spvbin_position_save (input);
            struct spvbin_limit saved_limit2;
            if (!spvbin_limit_parse (&saved_limit2, input))
                goto backtrack;
            do {
                if (!spvlb_parse_x1 (input, &p->x1))
                    goto backtrack3;
                struct spvbin_position pos4 = spvbin_position_save (input);
                struct spvbin_limit saved_limit3;
                if (!spvbin_limit_parse (&saved_limit3, input))
                    goto backtrack3;
                do {
                    if (!spvlb_parse_x2 (input, &p->x2))
                        goto backtrack4;
                    if (!spvbin_input_at_end (input))
                        goto backtrack4;
                    spvbin_limit_pop (&saved_limit3, input);
                    break;

                backtrack4:
                    spvbin_position_restore (&pos4, input);
                    spvbin_limit_pop (&saved_limit3, input);
                    goto backtrack3;
                } while (0);
                if (!spvbin_input_at_end (input))
                    goto backtrack3;
                spvbin_limit_pop (&saved_limit2, input);
                break;

            backtrack3:
                spvbin_position_restore (&pos3, input);
                spvbin_limit_pop (&saved_limit2, input);
                goto backtrack;
            } while (0);
            struct spvbin_position pos5 = spvbin_position_save (input);
            struct spvbin_limit saved_limit4;
            if (!spvbin_limit_parse (&saved_limit4, input))
                goto backtrack;
            do {
                if (!spvlb_parse_x3 (input, &p->x3))
                    goto backtrack5;
                if (!spvbin_input_at_end (input))
                    goto backtrack5;
                spvbin_limit_pop (&saved_limit4, input);
                break;

            backtrack5:
                spvbin_position_restore (&pos5, input);
                spvbin_limit_pop (&saved_limit4, input);
                goto backtrack;
            } while (0);
        }
        if (!spvbin_input_at_end (input))
            goto backtrack;
        spvbin_limit_pop (&saved_limit, input);
        break;

    backtrack:
        spvbin_position_restore (&pos, input);
        spvbin_limit_pop (&saved_limit, input);
        goto error;
    } while (0);

    p->len = input->ofs - p->start;
    *p_ = p;
    return true;

error:
    spvbin_error (input, "Formats", p->start);
    spvlb_free_formats (p);
    return false;
}

void
spvlb_free_formats (struct spvlb_formats *p)
{
    if (p == NULL)
        return;

    free (p->widths);
    free (p->locale);
    spvlb_free_y0 (p->y0);
    spvlb_free_custom_currency (p->custom_currency);
    spvlb_free_x0 (p->x0);
    spvlb_free_x1 (p->x1);
    spvlb_free_x2 (p->x2);
    spvlb_free_x3 (p->x3);
    free (p);
}

void
spvlb_print_formats (const char *title, int indent, const struct spvlb_formats *p)
{
    spvbin_print_header (title, p ? p->start : -1, p ? p->len : -1, indent);
    if (p == NULL) {
        printf ("none\n");
        return;
    }
    putchar ('\n');

    spvbin_print_int32 ("n-widths", indent + 1, p->n_widths);

    for (int i = 0; i < p->n_widths; i++) {
        char *elem_name = xasprintf ("widths[%d]", i);
        spvbin_print_int32 (elem_name, indent + 1, p->widths[i]);
        free (elem_name);
    }

    spvbin_print_string ("locale", indent + 1, p->locale);

    spvbin_print_int32 ("current-layer", indent + 1, p->current_layer);

    spvbin_print_bool ("x7", indent + 1, p->x7);

    spvbin_print_bool ("x8", indent + 1, p->x8);

    spvbin_print_bool ("x9", indent + 1, p->x9);

    spvlb_print_y0 ("y0", indent + 1, p->y0);

    spvlb_print_custom_currency ("custom_currency", indent + 1, p->custom_currency);

        spvlb_print_x0 ("x0", indent + 1, p->x0);

            spvlb_print_x1 ("x1", indent + 1, p->x1);

                spvlb_print_x2 ("x2", indent + 1, p->x2);

                spvlb_print_x3 ("x3", indent + 1, p->x3);
}

bool
spvlb_parse_y0 (struct spvbin_input *input, struct spvlb_y0 **p_)
{
    *p_ = NULL;
    struct spvlb_y0 *p = xzalloc (sizeof *p);
    p->start = input->ofs;

    if (!spvbin_parse_int32 (input, &p->epoch))
        goto error;
    if (!spvbin_parse_byte (input, &p->decimal))
        goto error;
    if (!spvbin_parse_byte (input, &p->grouping))
        goto error;

    p->len = input->ofs - p->start;
    *p_ = p;
    return true;

error:
    spvbin_error (input, "Y0", p->start);
    spvlb_free_y0 (p);
    return false;
}

void
spvlb_free_y0 (struct spvlb_y0 *p)
{
    if (p == NULL)
        return;

    free (p);
}

void
spvlb_print_y0 (const char *title, int indent, const struct spvlb_y0 *p)
{
    spvbin_print_header (title, p ? p->start : -1, p ? p->len : -1, indent);
    if (p == NULL) {
        printf ("none\n");
        return;
    }
    putchar ('\n');

    spvbin_print_int32 ("epoch", indent + 1, p->epoch);

    spvbin_print_byte ("decimal", indent + 1, p->decimal);

    spvbin_print_byte ("grouping", indent + 1, p->grouping);
}

bool
spvlb_parse_custom_currency (struct spvbin_input *input, struct spvlb_custom_currency **p_)
{
    *p_ = NULL;
    struct spvlb_custom_currency *p = xzalloc (sizeof *p);
    p->start = input->ofs;

    if (!spvbin_parse_int32 (input, &p->n_ccs))
        goto error;
    p->ccs = xcalloc (p->n_ccs, sizeof *p->ccs);
    for (int i = 0; i < p->n_ccs; i++)
        if (!spvbin_parse_string (input, &p->ccs[i]))
            goto error;

    p->len = input->ofs - p->start;
    *p_ = p;
    return true;

error:
    spvbin_error (input, "CustomCurrency", p->start);
    spvlb_free_custom_currency (p);
    return false;
}

void
spvlb_free_custom_currency (struct spvlb_custom_currency *p)
{
    if (p == NULL)
        return;

    for (int i = 0; i < p->n_ccs; i++)
        free (p->ccs[i]);
    free (p->ccs);
    free (p);
}

void
spvlb_print_custom_currency (const char *title, int indent, const struct spvlb_custom_currency *p)
{
    spvbin_print_header (title, p ? p->start : -1, p ? p->len : -1, indent);
    if (p == NULL) {
        printf ("none\n");
        return;
    }
    putchar ('\n');

    spvbin_print_int32 ("n-ccs", indent + 1, p->n_ccs);

    for (int i = 0; i < p->n_ccs; i++) {
        char *elem_name = xasprintf ("ccs[%d]", i);
        spvbin_print_string (elem_name, indent + 1, p->ccs[i]);
        free (elem_name);
    }
}

bool
spvlb_parse_x0 (struct spvbin_input *input, struct spvlb_x0 **p_)
{
    *p_ = NULL;
    struct spvlb_x0 *p = xzalloc (sizeof *p);
    p->start = input->ofs;

    for (int i = 0; i < 14; i++)
        if (!spvbin_parse_byte (input, NULL))
            goto error;
    if (!spvlb_parse_y1 (input, &p->y1))
        goto error;
    if (!spvlb_parse_y2 (input, &p->y2))
        goto error;

    p->len = input->ofs - p->start;
    *p_ = p;
    return true;

error:
    spvbin_error (input, "X0", p->start);
    spvlb_free_x0 (p);
    return false;
}

void
spvlb_free_x0 (struct spvlb_x0 *p)
{
    if (p == NULL)
        return;

    spvlb_free_y1 (p->y1);
    spvlb_free_y2 (p->y2);
    free (p);
}

void
spvlb_print_x0 (const char *title, int indent, const struct spvlb_x0 *p)
{
    spvbin_print_header (title, p ? p->start : -1, p ? p->len : -1, indent);
    if (p == NULL) {
        printf ("none\n");
        return;
    }
    putchar ('\n');


    spvlb_print_y1 ("y1", indent + 1, p->y1);

    spvlb_print_y2 ("y2", indent + 1, p->y2);
}

bool
spvlb_parse_y1 (struct spvbin_input *input, struct spvlb_y1 **p_)
{
    *p_ = NULL;
    struct spvlb_y1 *p = xzalloc (sizeof *p);
    p->start = input->ofs;

    if (!spvbin_parse_string (input, &p->command))
        goto error;
    if (!spvbin_parse_string (input, &p->command_local))
        goto error;
    if (!spvbin_parse_string (input, &p->language))
        goto error;
    if (!spvbin_parse_string (input, &p->charset))
        goto error;
    if (!spvbin_parse_string (input, &p->locale))
        goto error;
    if (!spvbin_parse_bool (input, &p->x10))
        goto error;
    if (!spvbin_parse_bool (input, &p->x11))
        goto error;
    if (!spvbin_parse_bool (input, &p->x12))
        goto error;
    if (!spvbin_parse_bool (input, &p->x13))
        goto error;
    if (!spvlb_parse_y0 (input, &p->y0))
        goto error;

    p->len = input->ofs - p->start;
    *p_ = p;
    return true;

error:
    spvbin_error (input, "Y1", p->start);
    spvlb_free_y1 (p);
    return false;
}

void
spvlb_free_y1 (struct spvlb_y1 *p)
{
    if (p == NULL)
        return;

    free (p->command);
    free (p->command_local);
    free (p->language);
    free (p->charset);
    free (p->locale);
    spvlb_free_y0 (p->y0);
    free (p);
}

void
spvlb_print_y1 (const char *title, int indent, const struct spvlb_y1 *p)
{
    spvbin_print_header (title, p ? p->start : -1, p ? p->len : -1, indent);
    if (p == NULL) {
        printf ("none\n");
        return;
    }
    putchar ('\n');

    spvbin_print_string ("command", indent + 1, p->command);

    spvbin_print_string ("command-local", indent + 1, p->command_local);

    spvbin_print_string ("language", indent + 1, p->language);

    spvbin_print_string ("charset", indent + 1, p->charset);

    spvbin_print_string ("locale", indent + 1, p->locale);

    spvbin_print_bool ("x10", indent + 1, p->x10);

    spvbin_print_bool ("x11", indent + 1, p->x11);

    spvbin_print_bool ("x12", indent + 1, p->x12);

    spvbin_print_bool ("x13", indent + 1, p->x13);

    spvlb_print_y0 ("y0", indent + 1, p->y0);
}

bool
spvlb_parse_y2 (struct spvbin_input *input, struct spvlb_y2 **p_)
{
    *p_ = NULL;
    struct spvlb_y2 *p = xzalloc (sizeof *p);
    p->start = input->ofs;

    if (!spvlb_parse_custom_currency (input, &p->custom_currency))
        goto error;
    if (!spvbin_parse_byte (input, &p->missing))
        goto error;
    if (!spvbin_parse_bool (input, &p->x17))
        goto error;

    p->len = input->ofs - p->start;
    *p_ = p;
    return true;

error:
    spvbin_error (input, "Y2", p->start);
    spvlb_free_y2 (p);
    return false;
}

void
spvlb_free_y2 (struct spvlb_y2 *p)
{
    if (p == NULL)
        return;

    spvlb_free_custom_currency (p->custom_currency);
    free (p);
}

void
spvlb_print_y2 (const char *title, int indent, const struct spvlb_y2 *p)
{
    spvbin_print_header (title, p ? p->start : -1, p ? p->len : -1, indent);
    if (p == NULL) {
        printf ("none\n");
        return;
    }
    putchar ('\n');

    spvlb_print_custom_currency ("custom_currency", indent + 1, p->custom_currency);

    spvbin_print_byte ("missing", indent + 1, p->missing);

    spvbin_print_bool ("x17", indent + 1, p->x17);
}

bool
spvlb_parse_x1 (struct spvbin_input *input, struct spvlb_x1 **p_)
{
    *p_ = NULL;
    struct spvlb_x1 *p = xzalloc (sizeof *p);
    p->start = input->ofs;

    if (!spvbin_parse_bool (input, &p->x14))
        goto error;
    if (!spvbin_parse_byte (input, &p->x15))
        goto error;
    if (!spvbin_parse_bool (input, &p->x16))
        goto error;
    if (!spvbin_parse_byte (input, &p->lang))
        goto error;
    if (!spvbin_parse_byte (input, &p->show_variables))
        goto error;
    if (!spvbin_parse_byte (input, &p->show_values))
        goto error;
    if (!spvbin_parse_int32 (input, &p->x18))
        goto error;
    if (!spvbin_parse_int32 (input, &p->x19))
        goto error;
    if (!spvbin_match_bytes (input, "\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00", 17))
        goto error;
    if (!spvbin_parse_bool (input, &p->x20))
        goto error;
    if (!spvbin_parse_bool (input, &p->show_caption))
        goto error;

    p->len = input->ofs - p->start;
    *p_ = p;
    return true;

error:
    spvbin_error (input, "X1", p->start);
    spvlb_free_x1 (p);
    return false;
}

void
spvlb_free_x1 (struct spvlb_x1 *p)
{
    if (p == NULL)
        return;

    free (p);
}

void
spvlb_print_x1 (const char *title, int indent, const struct spvlb_x1 *p)
{
    spvbin_print_header (title, p ? p->start : -1, p ? p->len : -1, indent);
    if (p == NULL) {
        printf ("none\n");
        return;
    }
    putchar ('\n');

    spvbin_print_bool ("x14", indent + 1, p->x14);

    spvbin_print_byte ("x15", indent + 1, p->x15);

    spvbin_print_bool ("x16", indent + 1, p->x16);

    spvbin_print_byte ("lang", indent + 1, p->lang);

    spvbin_print_byte ("show-variables", indent + 1, p->show_variables);

    spvbin_print_byte ("show-values", indent + 1, p->show_values);

    spvbin_print_int32 ("x18", indent + 1, p->x18);

    spvbin_print_int32 ("x19", indent + 1, p->x19);


    spvbin_print_bool ("x20", indent + 1, p->x20);

    spvbin_print_bool ("show-caption", indent + 1, p->show_caption);
}

bool
spvlb_parse_x2 (struct spvbin_input *input, struct spvlb_x2 **p_)
{
    *p_ = NULL;
    struct spvlb_x2 *p = xzalloc (sizeof *p);
    p->start = input->ofs;

    if (!spvbin_parse_int32 (input, &p->n_row_heights))
        goto error;
    p->row_heights = xcalloc (p->n_row_heights, sizeof *p->row_heights);
    for (int i = 0; i < p->n_row_heights; i++)
        if (!spvbin_parse_int32 (input, &p->row_heights[i]))
            goto error;
    if (!spvbin_parse_int32 (input, &p->n_style_map))
        goto error;
    p->style_map = xcalloc (p->n_style_map, sizeof *p->style_map);
    for (int i2 = 0; i2 < p->n_style_map; i2++)
        if (!spvlb_parse_style_map (input, &p->style_map[i2]))
            goto error;
    if (!spvbin_parse_int32 (input, &p->n_styles))
        goto error;
    p->styles = xcalloc (p->n_styles, sizeof *p->styles);
    for (int i3 = 0; i3 < p->n_styles; i3++)
        if (!spvlb_parse_style_pair (input, &p->styles[i3]))
            goto error;
    struct spvbin_position pos = spvbin_position_save (input);
    struct spvbin_limit saved_limit;
    if (!spvbin_limit_parse (&saved_limit, input))
        goto error;
    do {
        do {
            struct spvbin_position pos2 = spvbin_position_save (input);
            size_t save_n_errors = input->n_errors;
            if (!spvbin_match_bytes (input, "\x00\x00\x00\x00\x00\x00\x00\x00", 8))
                goto backtrack2;
            break;

        backtrack2:
            spvbin_position_restore (&pos2, input);
            input->n_errors = save_n_errors;
            break;
        } while (0);
        if (!spvbin_input_at_end (input))
            goto backtrack;
        spvbin_limit_pop (&saved_limit, input);
        break;

    backtrack:
        spvbin_position_restore (&pos, input);
        spvbin_limit_pop (&saved_limit, input);
        goto error;
    } while (0);

    p->len = input->ofs - p->start;
    *p_ = p;
    return true;

error:
    spvbin_error (input, "X2", p->start);
    spvlb_free_x2 (p);
    return false;
}

void
spvlb_free_x2 (struct spvlb_x2 *p)
{
    if (p == NULL)
        return;

    free (p->row_heights);
    for (int i2 = 0; i2 < p->n_style_map; i2++)
        spvlb_free_style_map (p->style_map[i2]);
    free (p->style_map);
    for (int i3 = 0; i3 < p->n_styles; i3++)
        spvlb_free_style_pair (p->styles[i3]);
    free (p->styles);
    free (p);
}

void
spvlb_print_x2 (const char *title, int indent, const struct spvlb_x2 *p)
{
    spvbin_print_header (title, p ? p->start : -1, p ? p->len : -1, indent);
    if (p == NULL) {
        printf ("none\n");
        return;
    }
    putchar ('\n');

    spvbin_print_int32 ("n-row-heights", indent + 1, p->n_row_heights);

    for (int i = 0; i < p->n_row_heights; i++) {
        char *elem_name = xasprintf ("row-heights[%d]", i);
        spvbin_print_int32 (elem_name, indent + 1, p->row_heights[i]);
        free (elem_name);
    }

    spvbin_print_int32 ("n-style-map", indent + 1, p->n_style_map);

    for (int i2 = 0; i2 < p->n_style_map; i2++) {
        char *elem_name2 = xasprintf ("style-map[%d]", i2);
        spvlb_print_style_map (elem_name2, indent + 1, p->style_map[i2]);
        free (elem_name2);
    }

    spvbin_print_int32 ("n-styles", indent + 1, p->n_styles);

    for (int i3 = 0; i3 < p->n_styles; i3++) {
        char *elem_name3 = xasprintf ("styles[%d]", i3);
        spvlb_print_style_pair (elem_name3, indent + 1, p->styles[i3]);
        free (elem_name3);
    }

}

bool
spvlb_parse_style_map (struct spvbin_input *input, struct spvlb_style_map **p_)
{
    *p_ = NULL;
    struct spvlb_style_map *p = xzalloc (sizeof *p);
    p->start = input->ofs;

    if (!spvbin_parse_int64 (input, &p->cell_index))
        goto error;
    if (!spvbin_parse_int16 (input, &p->style_index))
        goto error;

    p->len = input->ofs - p->start;
    *p_ = p;
    return true;

error:
    spvbin_error (input, "StyleMap", p->start);
    spvlb_free_style_map (p);
    return false;
}

void
spvlb_free_style_map (struct spvlb_style_map *p)
{
    if (p == NULL)
        return;

    free (p);
}

void
spvlb_print_style_map (const char *title, int indent, const struct spvlb_style_map *p)
{
    spvbin_print_header (title, p ? p->start : -1, p ? p->len : -1, indent);
    if (p == NULL) {
        printf ("none\n");
        return;
    }
    putchar ('\n');

    spvbin_print_int64 ("cell-index", indent + 1, p->cell_index);

    spvbin_print_int16 ("style-index", indent + 1, p->style_index);
}

bool
spvlb_parse_x3 (struct spvbin_input *input, struct spvlb_x3 **p_)
{
    *p_ = NULL;
    struct spvlb_x3 *p = xzalloc (sizeof *p);
    p->start = input->ofs;

    if (!spvbin_match_bytes (input, "\x01\x00", 2))
        goto error;
    if (!spvbin_parse_byte (input, &p->x21))
        goto error;
    if (!spvbin_match_bytes (input, "\x00\x00\x00", 3))
        goto error;
    if (!spvlb_parse_y1 (input, &p->y1))
        goto error;
    if (!spvbin_parse_double (input, &p->small))
        goto error;
    if (!spvbin_match_bytes (input, "\x01", 1))
        goto error;
    do {
        struct spvbin_position pos = spvbin_position_save (input);
        size_t save_n_errors = input->n_errors;
        if (!spvbin_parse_string (input, &p->dataset))
            goto backtrack;
        if (!spvbin_parse_string (input, &p->datafile))
            goto backtrack;
        if (!spvbin_match_bytes (input, "\x00\x00\x00\x00", 4))
            goto backtrack;
        if (!spvbin_parse_int32 (input, &p->date))
            goto backtrack;
        if (!spvbin_match_bytes (input, "\x00\x00\x00\x00", 4))
            goto backtrack;
        break;

    backtrack:
        spvbin_position_restore (&pos, input);
        input->n_errors = save_n_errors;
        break;
    } while (0);
    if (!spvlb_parse_y2 (input, &p->y2))
        goto error;
    do {
        struct spvbin_position pos2 = spvbin_position_save (input);
        size_t save_n_errors2 = input->n_errors;
        if (!spvbin_parse_int32 (input, &p->x22))
            goto backtrack2;
        if (!spvbin_match_bytes (input, "\x00\x00\x00\x00", 4))
            goto backtrack2;
        break;

    backtrack2:
        spvbin_position_restore (&pos2, input);
        input->n_errors = save_n_errors2;
        break;
    } while (0);

    p->len = input->ofs - p->start;
    *p_ = p;
    return true;

error:
    spvbin_error (input, "X3", p->start);
    spvlb_free_x3 (p);
    return false;
}

void
spvlb_free_x3 (struct spvlb_x3 *p)
{
    if (p == NULL)
        return;

    spvlb_free_y1 (p->y1);
    free (p->dataset);
    free (p->datafile);
    spvlb_free_y2 (p->y2);
    free (p);
}

void
spvlb_print_x3 (const char *title, int indent, const struct spvlb_x3 *p)
{
    spvbin_print_header (title, p ? p->start : -1, p ? p->len : -1, indent);
    if (p == NULL) {
        printf ("none\n");
        return;
    }
    putchar ('\n');


    spvbin_print_byte ("x21", indent + 1, p->x21);


    spvlb_print_y1 ("y1", indent + 1, p->y1);

    spvbin_print_double ("small", indent + 1, p->small);


    spvbin_print_string ("dataset", indent + 1, p->dataset);

    spvbin_print_string ("datafile", indent + 1, p->datafile);


    spvbin_print_int32 ("date", indent + 1, p->date);


    spvlb_print_y2 ("y2", indent + 1, p->y2);

    spvbin_print_int32 ("x22", indent + 1, p->x22);

}

bool
spvlb_parse_dimensions (struct spvbin_input *input, struct spvlb_dimensions **p_)
{
    *p_ = NULL;
    struct spvlb_dimensions *p = xzalloc (sizeof *p);
    p->start = input->ofs;

    if (!spvbin_parse_int32 (input, &p->n_dims))
        goto error;
    p->dims = xcalloc (p->n_dims, sizeof *p->dims);
    for (int i = 0; i < p->n_dims; i++)
        if (!spvlb_parse_dimension (input, &p->dims[i]))
            goto error;

    p->len = input->ofs - p->start;
    *p_ = p;
    return true;

error:
    spvbin_error (input, "Dimensions", p->start);
    spvlb_free_dimensions (p);
    return false;
}

void
spvlb_free_dimensions (struct spvlb_dimensions *p)
{
    if (p == NULL)
        return;

    for (int i = 0; i < p->n_dims; i++)
        spvlb_free_dimension (p->dims[i]);
    free (p->dims);
    free (p);
}

void
spvlb_print_dimensions (const char *title, int indent, const struct spvlb_dimensions *p)
{
    spvbin_print_header (title, p ? p->start : -1, p ? p->len : -1, indent);
    if (p == NULL) {
        printf ("none\n");
        return;
    }
    putchar ('\n');

    spvbin_print_int32 ("n-dims", indent + 1, p->n_dims);

    for (int i = 0; i < p->n_dims; i++) {
        char *elem_name = xasprintf ("dims[%d]", i);
        spvlb_print_dimension (elem_name, indent + 1, p->dims[i]);
        free (elem_name);
    }
}

bool
spvlb_parse_dimension (struct spvbin_input *input, struct spvlb_dimension **p_)
{
    *p_ = NULL;
    struct spvlb_dimension *p = xzalloc (sizeof *p);
    p->start = input->ofs;

    if (!spvlb_parse_value (input, &p->name))
        goto error;
    if (!spvlb_parse_dim_properties (input, &p->props))
        goto error;
    if (!spvbin_parse_int32 (input, &p->n_categories))
        goto error;
    p->categories = xcalloc (p->n_categories, sizeof *p->categories);
    for (int i = 0; i < p->n_categories; i++)
        if (!spvlb_parse_category (input, &p->categories[i]))
            goto error;

    p->len = input->ofs - p->start;
    *p_ = p;
    return true;

error:
    spvbin_error (input, "Dimension", p->start);
    spvlb_free_dimension (p);
    return false;
}

void
spvlb_free_dimension (struct spvlb_dimension *p)
{
    if (p == NULL)
        return;

    spvlb_free_value (p->name);
    spvlb_free_dim_properties (p->props);
    for (int i = 0; i < p->n_categories; i++)
        spvlb_free_category (p->categories[i]);
    free (p->categories);
    free (p);
}

void
spvlb_print_dimension (const char *title, int indent, const struct spvlb_dimension *p)
{
    spvbin_print_header (title, p ? p->start : -1, p ? p->len : -1, indent);
    if (p == NULL) {
        printf ("none\n");
        return;
    }
    putchar ('\n');

    spvlb_print_value ("name", indent + 1, p->name);

    spvlb_print_dim_properties ("props", indent + 1, p->props);

    spvbin_print_int32 ("n-categories", indent + 1, p->n_categories);

    for (int i = 0; i < p->n_categories; i++) {
        char *elem_name = xasprintf ("categories[%d]", i);
        spvlb_print_category (elem_name, indent + 1, p->categories[i]);
        free (elem_name);
    }
}

bool
spvlb_parse_dim_properties (struct spvbin_input *input, struct spvlb_dim_properties **p_)
{
    *p_ = NULL;
    struct spvlb_dim_properties *p = xzalloc (sizeof *p);
    p->start = input->ofs;

    if (!spvbin_parse_byte (input, &p->x1))
        goto error;
    if (!spvbin_parse_byte (input, &p->x2))
        goto error;
    if (!spvbin_parse_int32 (input, &p->x3))
        goto error;
    if (!spvbin_parse_bool (input, &p->hide_dim_label))
        goto error;
    if (!spvbin_parse_bool (input, &p->hide_all_labels))
        goto error;
    if (!spvbin_match_bytes (input, "\x01", 1))
        goto error;
    if (!spvbin_parse_int32 (input, &p->dim_index))
        goto error;

    p->len = input->ofs - p->start;
    *p_ = p;
    return true;

error:
    spvbin_error (input, "DimProperties", p->start);
    spvlb_free_dim_properties (p);
    return false;
}

void
spvlb_free_dim_properties (struct spvlb_dim_properties *p)
{
    if (p == NULL)
        return;

    free (p);
}

void
spvlb_print_dim_properties (const char *title, int indent, const struct spvlb_dim_properties *p)
{
    spvbin_print_header (title, p ? p->start : -1, p ? p->len : -1, indent);
    if (p == NULL) {
        printf ("none\n");
        return;
    }
    putchar ('\n');

    spvbin_print_byte ("x1", indent + 1, p->x1);

    spvbin_print_byte ("x2", indent + 1, p->x2);

    spvbin_print_int32 ("x3", indent + 1, p->x3);

    spvbin_print_bool ("hide-dim-label", indent + 1, p->hide_dim_label);

    spvbin_print_bool ("hide-all-labels", indent + 1, p->hide_all_labels);


    spvbin_print_int32 ("dim-index", indent + 1, p->dim_index);
}

bool
spvlb_parse_category (struct spvbin_input *input, struct spvlb_category **p_)
{
    *p_ = NULL;
    struct spvlb_category *p = xzalloc (sizeof *p);
    p->start = input->ofs;

    if (!spvlb_parse_value (input, &p->name))
        goto error;
    do {
        struct spvbin_position pos = spvbin_position_save (input);
        size_t save_n_errors = input->n_errors;
        if (!spvlb_parse_leaf (input, &p->leaf))
            goto backtrack;
        break;

    backtrack:
        spvbin_position_restore (&pos, input);
        input->n_errors = save_n_errors;
        if (!spvlb_parse_group (input, &p->group))
            goto error;
        break;
    } while (0);

    p->len = input->ofs - p->start;
    *p_ = p;
    return true;

error:
    spvbin_error (input, "Category", p->start);
    spvlb_free_category (p);
    return false;
}

void
spvlb_free_category (struct spvlb_category *p)
{
    if (p == NULL)
        return;

    spvlb_free_value (p->name);
    spvlb_free_leaf (p->leaf);
    spvlb_free_group (p->group);
    free (p);
}

void
spvlb_print_category (const char *title, int indent, const struct spvlb_category *p)
{
    spvbin_print_header (title, p ? p->start : -1, p ? p->len : -1, indent);
    if (p == NULL) {
        printf ("none\n");
        return;
    }
    putchar ('\n');

    spvlb_print_value ("name", indent + 1, p->name);

    spvlb_print_leaf ("leaf", indent + 1, p->leaf);
    spvlb_print_group ("group", indent + 1, p->group);
}

bool
spvlb_parse_leaf (struct spvbin_input *input, struct spvlb_leaf **p_)
{
    *p_ = NULL;
    struct spvlb_leaf *p = xzalloc (sizeof *p);
    p->start = input->ofs;

    if (!spvbin_match_bytes (input, "\x00\x00\x00\x02\x00\x00\x00", 7))
        goto error;
    if (!spvbin_parse_int32 (input, &p->leaf_index))
        goto error;
    if (!spvbin_match_bytes (input, "\x00\x00\x00\x00", 4))
        goto error;

    p->len = input->ofs - p->start;
    *p_ = p;
    return true;

error:
    spvbin_error (input, "Leaf", p->start);
    spvlb_free_leaf (p);
    return false;
}

void
spvlb_free_leaf (struct spvlb_leaf *p)
{
    if (p == NULL)
        return;

    free (p);
}

void
spvlb_print_leaf (const char *title, int indent, const struct spvlb_leaf *p)
{
    spvbin_print_header (title, p ? p->start : -1, p ? p->len : -1, indent);
    if (p == NULL) {
        printf ("none\n");
        return;
    }
    putchar ('\n');


    spvbin_print_int32 ("leaf-index", indent + 1, p->leaf_index);

}

bool
spvlb_parse_group (struct spvbin_input *input, struct spvlb_group **p_)
{
    *p_ = NULL;
    struct spvlb_group *p = xzalloc (sizeof *p);
    p->start = input->ofs;

    if (!spvbin_parse_bool (input, &p->merge))
        goto error;
    if (!spvbin_match_bytes (input, "\x00\x01", 2))
        goto error;
    if (!spvbin_parse_int32 (input, &p->x23))
        goto error;
    if (!spvbin_match_bytes (input, "\xff\xff\xff\xff", 4))
        goto error;
    if (!spvbin_parse_int32 (input, &p->n_subcategories))
        goto error;
    p->subcategories = xcalloc (p->n_subcategories, sizeof *p->subcategories);
    for (int i = 0; i < p->n_subcategories; i++)
        if (!spvlb_parse_category (input, &p->subcategories[i]))
            goto error;

    p->len = input->ofs - p->start;
    *p_ = p;
    return true;

error:
    spvbin_error (input, "Group", p->start);
    spvlb_free_group (p);
    return false;
}

void
spvlb_free_group (struct spvlb_group *p)
{
    if (p == NULL)
        return;

    for (int i = 0; i < p->n_subcategories; i++)
        spvlb_free_category (p->subcategories[i]);
    free (p->subcategories);
    free (p);
}

void
spvlb_print_group (const char *title, int indent, const struct spvlb_group *p)
{
    spvbin_print_header (title, p ? p->start : -1, p ? p->len : -1, indent);
    if (p == NULL) {
        printf ("none\n");
        return;
    }
    putchar ('\n');

    spvbin_print_bool ("merge", indent + 1, p->merge);


    spvbin_print_int32 ("x23", indent + 1, p->x23);


    spvbin_print_int32 ("n-subcategories", indent + 1, p->n_subcategories);

    for (int i = 0; i < p->n_subcategories; i++) {
        char *elem_name = xasprintf ("subcategories[%d]", i);
        spvlb_print_category (elem_name, indent + 1, p->subcategories[i]);
        free (elem_name);
    }
}

bool
spvlb_parse_axes (struct spvbin_input *input, struct spvlb_axes **p_)
{
    *p_ = NULL;
    struct spvlb_axes *p = xzalloc (sizeof *p);
    p->start = input->ofs;

    if (!spvbin_parse_int32 (input, &p->n_layers))
        goto error;
    if (!spvbin_parse_int32 (input, &p->n_rows))
        goto error;
    if (!spvbin_parse_int32 (input, &p->n_columns))
        goto error;
    p->layers = xcalloc (p->n_layers, sizeof *p->layers);
    for (int i = 0; i < p->n_layers; i++)
        if (!spvbin_parse_int32 (input, &p->layers[i]))
            goto error;
    p->rows = xcalloc (p->n_rows, sizeof *p->rows);
    for (int i2 = 0; i2 < p->n_rows; i2++)
        if (!spvbin_parse_int32 (input, &p->rows[i2]))
            goto error;
    p->columns = xcalloc (p->n_columns, sizeof *p->columns);
    for (int i3 = 0; i3 < p->n_columns; i3++)
        if (!spvbin_parse_int32 (input, &p->columns[i3]))
            goto error;

    p->len = input->ofs - p->start;
    *p_ = p;
    return true;

error:
    spvbin_error (input, "Axes", p->start);
    spvlb_free_axes (p);
    return false;
}

void
spvlb_free_axes (struct spvlb_axes *p)
{
    if (p == NULL)
        return;

    free (p->layers);
    free (p->rows);
    free (p->columns);
    free (p);
}

void
spvlb_print_axes (const char *title, int indent, const struct spvlb_axes *p)
{
    spvbin_print_header (title, p ? p->start : -1, p ? p->len : -1, indent);
    if (p == NULL) {
        printf ("none\n");
        return;
    }
    putchar ('\n');

    spvbin_print_int32 ("n-layers", indent + 1, p->n_layers);

    spvbin_print_int32 ("n-rows", indent + 1, p->n_rows);

    spvbin_print_int32 ("n-columns", indent + 1, p->n_columns);

    for (int i = 0; i < p->n_layers; i++) {
        char *elem_name = xasprintf ("layers[%d]", i);
        spvbin_print_int32 (elem_name, indent + 1, p->layers[i]);
        free (elem_name);
    }

    for (int i2 = 0; i2 < p->n_rows; i2++) {
        char *elem_name2 = xasprintf ("rows[%d]", i2);
        spvbin_print_int32 (elem_name2, indent + 1, p->rows[i2]);
        free (elem_name2);
    }

    for (int i3 = 0; i3 < p->n_columns; i3++) {
        char *elem_name3 = xasprintf ("columns[%d]", i3);
        spvbin_print_int32 (elem_name3, indent + 1, p->columns[i3]);
        free (elem_name3);
    }
}

bool
spvlb_parse_cells (struct spvbin_input *input, struct spvlb_cells **p_)
{
    *p_ = NULL;
    struct spvlb_cells *p = xzalloc (sizeof *p);
    p->start = input->ofs;

    if (!spvbin_parse_int32 (input, &p->n_cells))
        goto error;
    p->cells = xcalloc (p->n_cells, sizeof *p->cells);
    for (int i = 0; i < p->n_cells; i++)
        if (!spvlb_parse_cell (input, &p->cells[i]))
            goto error;

    p->len = input->ofs - p->start;
    *p_ = p;
    return true;

error:
    spvbin_error (input, "Cells", p->start);
    spvlb_free_cells (p);
    return false;
}

void
spvlb_free_cells (struct spvlb_cells *p)
{
    if (p == NULL)
        return;

    for (int i = 0; i < p->n_cells; i++)
        spvlb_free_cell (p->cells[i]);
    free (p->cells);
    free (p);
}

void
spvlb_print_cells (const char *title, int indent, const struct spvlb_cells *p)
{
    spvbin_print_header (title, p ? p->start : -1, p ? p->len : -1, indent);
    if (p == NULL) {
        printf ("none\n");
        return;
    }
    putchar ('\n');

    spvbin_print_int32 ("n-cells", indent + 1, p->n_cells);

    for (int i = 0; i < p->n_cells; i++) {
        char *elem_name = xasprintf ("cells[%d]", i);
        spvlb_print_cell (elem_name, indent + 1, p->cells[i]);
        free (elem_name);
    }
}

bool
spvlb_parse_cell (struct spvbin_input *input, struct spvlb_cell **p_)
{
    *p_ = NULL;
    struct spvlb_cell *p = xzalloc (sizeof *p);
    p->start = input->ofs;

    if (!spvbin_parse_int64 (input, &p->index))
        goto error;
    if (input->version == 0x1) {
        do {
            struct spvbin_position pos = spvbin_position_save (input);
            size_t save_n_errors = input->n_errors;
            if (!spvbin_match_bytes (input, "\x00", 1))
                goto backtrack;
            break;

        backtrack:
            spvbin_position_restore (&pos, input);
            input->n_errors = save_n_errors;
            break;
        } while (0);
    }
    if (!spvlb_parse_value (input, &p->value))
        goto error;

    p->len = input->ofs - p->start;
    *p_ = p;
    return true;

error:
    spvbin_error (input, "Cell", p->start);
    spvlb_free_cell (p);
    return false;
}

void
spvlb_free_cell (struct spvlb_cell *p)
{
    if (p == NULL)
        return;

    spvlb_free_value (p->value);
    free (p);
}

void
spvlb_print_cell (const char *title, int indent, const struct spvlb_cell *p)
{
    spvbin_print_header (title, p ? p->start : -1, p ? p->len : -1, indent);
    if (p == NULL) {
        printf ("none\n");
        return;
    }
    putchar ('\n');

    spvbin_print_int64 ("index", indent + 1, p->index);


    spvlb_print_value ("value", indent + 1, p->value);
}

bool
spvlb_parse_value (struct spvbin_input *input, struct spvlb_value **p_)
{
    *p_ = NULL;
    struct spvlb_value *p = xzalloc (sizeof *p);
    p->start = input->ofs;

    do {
        struct spvbin_position pos = spvbin_position_save (input);
        size_t save_n_errors = input->n_errors;
        if (!spvbin_match_bytes (input, "\x00", 1))
            goto backtrack;
        break;

    backtrack:
        spvbin_position_restore (&pos, input);
        input->n_errors = save_n_errors;
        break;
    } while (0);
    do {
        struct spvbin_position pos2 = spvbin_position_save (input);
        size_t save_n_errors2 = input->n_errors;
        if (!spvbin_match_bytes (input, "\x00", 1))
            goto backtrack2;
        break;

    backtrack2:
        spvbin_position_restore (&pos2, input);
        input->n_errors = save_n_errors2;
        break;
    } while (0);
    do {
        struct spvbin_position pos3 = spvbin_position_save (input);
        size_t save_n_errors3 = input->n_errors;
        if (!spvbin_match_bytes (input, "\x00", 1))
            goto backtrack3;
        break;

    backtrack3:
        spvbin_position_restore (&pos3, input);
        input->n_errors = save_n_errors3;
        break;
    } while (0);
    do {
        struct spvbin_position pos4 = spvbin_position_save (input);
        size_t save_n_errors4 = input->n_errors;
        if (!spvbin_match_bytes (input, "\x00", 1))
            goto backtrack4;
        break;

    backtrack4:
        spvbin_position_restore (&pos4, input);
        input->n_errors = save_n_errors4;
        break;
    } while (0);
    if (spvbin_match_byte (input, 0x01)) {
        p->type = 0x01;

        if (!spvlb_parse_value_mod (input, &p->type_01.value_mod))
            goto error;
        if (!spvbin_parse_int32 (input, &p->type_01.format))
            goto error;
        if (!spvbin_parse_double (input, &p->type_01.x))
            goto error;
    } else if (spvbin_match_byte (input, 0x02)) {
        p->type = 0x02;

        if (!spvlb_parse_value_mod (input, &p->type_02.value_mod))
            goto error;
        if (!spvbin_parse_int32 (input, &p->type_02.format))
            goto error;
        if (!spvbin_parse_double (input, &p->type_02.x))
            goto error;
        if (!spvbin_parse_string (input, &p->type_02.var_name))
            goto error;
        if (!spvbin_parse_string (input, &p->type_02.value_label))
            goto error;
        if (!spvbin_parse_byte (input, &p->type_02.show))
            goto error;
    } else if (spvbin_match_byte (input, 0x03)) {
        p->type = 0x03;

        if (!spvbin_parse_string (input, &p->type_03.local))
            goto error;
        if (!spvlb_parse_value_mod (input, &p->type_03.value_mod))
            goto error;
        if (!spvbin_parse_string (input, &p->type_03.id))
            goto error;
        if (!spvbin_parse_string (input, &p->type_03.c))
            goto error;
        if (!spvbin_parse_bool (input, &p->type_03.fixed))
            goto error;
    } else if (spvbin_match_byte (input, 0x04)) {
        p->type = 0x04;

        if (!spvlb_parse_value_mod (input, &p->type_04.value_mod))
            goto error;
        if (!spvbin_parse_int32 (input, &p->type_04.format))
            goto error;
        if (!spvbin_parse_string (input, &p->type_04.value_label))
            goto error;
        if (!spvbin_parse_string (input, &p->type_04.var_name))
            goto error;
        if (!spvbin_parse_byte (input, &p->type_04.show))
            goto error;
        if (!spvbin_parse_string (input, &p->type_04.s))
            goto error;
    } else if (spvbin_match_byte (input, 0x05)) {
        p->type = 0x05;

        if (!spvlb_parse_value_mod (input, &p->type_05.value_mod))
            goto error;
        if (!spvbin_parse_string (input, &p->type_05.var_name))
            goto error;
        if (!spvbin_parse_string (input, &p->type_05.var_label))
            goto error;
        if (!spvbin_parse_byte (input, &p->type_05.show))
            goto error;
    } else if (spvbin_match_byte (input, 0x06)) {
        p->type = 0x06;

        if (!spvbin_parse_string (input, &p->type_06.local))
            goto error;
        if (!spvlb_parse_value_mod (input, &p->type_06.value_mod))
            goto error;
        if (!spvbin_parse_string (input, &p->type_06.id))
            goto error;
        if (!spvbin_parse_string (input, &p->type_06.c))
            goto error;
    } else {
        p->type = -1;

        if (!spvlb_parse_value_mod (input, &p->type_else.value_mod))
            goto error;
        if (!spvbin_parse_string (input, &p->type_else.template))
            goto error;
        if (!spvbin_parse_int32 (input, &p->type_else.n_args))
            goto error;
        p->type_else.args = xcalloc (p->type_else.n_args, sizeof *p->type_else.args);
        for (int i = 0; i < p->type_else.n_args; i++)
            if (!spvlb_parse_argument (input, &p->type_else.args[i]))
                goto error;
    }

    p->len = input->ofs - p->start;
    *p_ = p;
    return true;

error:
    spvbin_error (input, "Value", p->start);
    spvlb_free_value (p);
    return false;
}

void
spvlb_free_value (struct spvlb_value *p)
{
    if (p == NULL)
        return;

    if (p->type == 0x01) {
        spvlb_free_value_mod (p->type_01.value_mod);
    } else if (p->type == 0x02) {
        spvlb_free_value_mod (p->type_02.value_mod);
        free (p->type_02.var_name);
        free (p->type_02.value_label);
    } else if (p->type == 0x03) {
        free (p->type_03.local);
        spvlb_free_value_mod (p->type_03.value_mod);
        free (p->type_03.id);
        free (p->type_03.c);
    } else if (p->type == 0x04) {
        spvlb_free_value_mod (p->type_04.value_mod);
        free (p->type_04.value_label);
        free (p->type_04.var_name);
        free (p->type_04.s);
    } else if (p->type == 0x05) {
        spvlb_free_value_mod (p->type_05.value_mod);
        free (p->type_05.var_name);
        free (p->type_05.var_label);
    } else if (p->type == 0x06) {
        free (p->type_06.local);
        spvlb_free_value_mod (p->type_06.value_mod);
        free (p->type_06.id);
        free (p->type_06.c);
    } else if (p->type == -1) {
        spvlb_free_value_mod (p->type_else.value_mod);
        free (p->type_else.template);
        for (int i = 0; i < p->type_else.n_args; i++)
            spvlb_free_argument (p->type_else.args[i]);
        free (p->type_else.args);
    }
    free (p);
}

void
spvlb_print_value (const char *title, int indent, const struct spvlb_value *p)
{
    spvbin_print_header (title, p ? p->start : -1, p ? p->len : -1, indent);
    if (p == NULL) {
        printf ("none\n");
        return;
    }
    putchar ('\n');





    spvbin_print_case ("type", indent + 1, p->type);
    if (p->type == 0x01) {

        spvlb_print_value_mod ("value_mod", indent + 1, p->type_01.value_mod);

        spvbin_print_int32 ("format", indent + 1, p->type_01.format);

        spvbin_print_double ("x", indent + 1, p->type_01.x);
    } else if (p->type == 0x02) {

        spvlb_print_value_mod ("value_mod", indent + 1, p->type_02.value_mod);

        spvbin_print_int32 ("format", indent + 1, p->type_02.format);

        spvbin_print_double ("x", indent + 1, p->type_02.x);

        spvbin_print_string ("var-name", indent + 1, p->type_02.var_name);

        spvbin_print_string ("value-label", indent + 1, p->type_02.value_label);

        spvbin_print_byte ("show", indent + 1, p->type_02.show);
    } else if (p->type == 0x03) {

        spvbin_print_string ("local", indent + 1, p->type_03.local);

        spvlb_print_value_mod ("value_mod", indent + 1, p->type_03.value_mod);

        spvbin_print_string ("id", indent + 1, p->type_03.id);

        spvbin_print_string ("c", indent + 1, p->type_03.c);

        spvbin_print_bool ("fixed", indent + 1, p->type_03.fixed);
    } else if (p->type == 0x04) {

        spvlb_print_value_mod ("value_mod", indent + 1, p->type_04.value_mod);

        spvbin_print_int32 ("format", indent + 1, p->type_04.format);

        spvbin_print_string ("value-label", indent + 1, p->type_04.value_label);

        spvbin_print_string ("var-name", indent + 1, p->type_04.var_name);

        spvbin_print_byte ("show", indent + 1, p->type_04.show);

        spvbin_print_string ("s", indent + 1, p->type_04.s);
    } else if (p->type == 0x05) {

        spvlb_print_value_mod ("value_mod", indent + 1, p->type_05.value_mod);

        spvbin_print_string ("var-name", indent + 1, p->type_05.var_name);

        spvbin_print_string ("var-label", indent + 1, p->type_05.var_label);

        spvbin_print_byte ("show", indent + 1, p->type_05.show);
    } else if (p->type == 0x06) {

        spvbin_print_string ("local", indent + 1, p->type_06.local);

        spvlb_print_value_mod ("value_mod", indent + 1, p->type_06.value_mod);

        spvbin_print_string ("id", indent + 1, p->type_06.id);

        spvbin_print_string ("c", indent + 1, p->type_06.c);
    } else if (p->type == -1) {
        spvlb_print_value_mod ("value_mod", indent + 1, p->type_else.value_mod);

        spvbin_print_string ("template", indent + 1, p->type_else.template);

        spvbin_print_int32 ("n-args", indent + 1, p->type_else.n_args);

        for (int i = 0; i < p->type_else.n_args; i++) {
            char *elem_name = xasprintf ("args[%d]", i);
            spvlb_print_argument (elem_name, indent + 1, p->type_else.args[i]);
            free (elem_name);
        }
    }
}

bool
spvlb_parse_argument (struct spvbin_input *input, struct spvlb_argument **p_)
{
    *p_ = NULL;
    struct spvlb_argument *p = xzalloc (sizeof *p);
    p->start = input->ofs;

    do {
        struct spvbin_position pos = spvbin_position_save (input);
        size_t save_n_errors = input->n_errors;
        if (!spvbin_match_bytes (input, "\x00\x00\x00\x00", 4))
            goto backtrack;
        if (!spvlb_parse_value (input, &p->value))
            goto backtrack;
        break;

    backtrack:
        spvbin_position_restore (&pos, input);
        input->n_errors = save_n_errors;
        if (!spvbin_parse_int32 (input, &p->n_values))
            goto error;
        if (!spvbin_match_bytes (input, "\x00\x00\x00\x00", 4))
            goto error;
        p->values = xcalloc (p->n_values, sizeof *p->values);
        for (int i = 0; i < p->n_values; i++)
            if (!spvlb_parse_value (input, &p->values[i]))
                goto error;
        break;
    } while (0);

    p->len = input->ofs - p->start;
    *p_ = p;
    return true;

error:
    spvbin_error (input, "Argument", p->start);
    spvlb_free_argument (p);
    return false;
}

void
spvlb_free_argument (struct spvlb_argument *p)
{
    if (p == NULL)
        return;

    spvlb_free_value (p->value);
    for (int i = 0; i < p->n_values; i++)
        spvlb_free_value (p->values[i]);
    free (p->values);
    free (p);
}

void
spvlb_print_argument (const char *title, int indent, const struct spvlb_argument *p)
{
    spvbin_print_header (title, p ? p->start : -1, p ? p->len : -1, indent);
    if (p == NULL) {
        printf ("none\n");
        return;
    }
    putchar ('\n');


    spvlb_print_value ("value", indent + 1, p->value);
    spvbin_print_int32 ("n-values", indent + 1, p->n_values);


    for (int i = 0; i < p->n_values; i++) {
        char *elem_name = xasprintf ("values[%d]", i);
        spvlb_print_value (elem_name, indent + 1, p->values[i]);
        free (elem_name);
    }
}

bool
spvlb_parse_value_mod (struct spvbin_input *input, struct spvlb_value_mod **p_)
{
    *p_ = NULL;
    struct spvlb_value_mod *p = xzalloc (sizeof *p);
    p->start = input->ofs;

    do {
        struct spvbin_position pos = spvbin_position_save (input);
        size_t save_n_errors = input->n_errors;
        if (!spvbin_match_bytes (input, "\x58", 1))
            goto backtrack;
        break;

    backtrack:
        spvbin_position_restore (&pos, input);
        input->n_errors = save_n_errors;
        if (!spvbin_match_bytes (input, "\x31", 1))
            goto error;
        if (!spvbin_parse_int32 (input, &p->n_refs))
            goto error;
        p->refs = xcalloc (p->n_refs, sizeof *p->refs);
        for (int i = 0; i < p->n_refs; i++)
            if (!spvbin_parse_int16 (input, &p->refs[i]))
                goto error;
        if (!spvbin_parse_int32 (input, &p->n_subscripts))
            goto error;
        p->subscripts = xcalloc (p->n_subscripts, sizeof *p->subscripts);
        for (int i2 = 0; i2 < p->n_subscripts; i2++)
            if (!spvbin_parse_string (input, &p->subscripts[i2]))
                goto error;
        if (input->version == 0x1) {
            if (!spvbin_match_bytes (input, "\x00", 1))
                goto error;
            do {
                struct spvbin_position pos2 = spvbin_position_save (input);
                size_t save_n_errors2 = input->n_errors;
                if (!spvbin_match_bytes (input, "\x01\x00\x00\x00", 4))
                    goto backtrack2;
                break;

            backtrack2:
                spvbin_position_restore (&pos2, input);
                input->n_errors = save_n_errors2;
                if (!spvbin_match_bytes (input, "\x02\x00\x00\x00", 4))
                    goto error;
                break;
            } while (0);
            do {
                struct spvbin_position pos3 = spvbin_position_save (input);
                size_t save_n_errors3 = input->n_errors;
                if (!spvbin_match_bytes (input, "\x00", 1))
                    goto backtrack3;
                break;

            backtrack3:
                spvbin_position_restore (&pos3, input);
                input->n_errors = save_n_errors3;
                break;
            } while (0);
            do {
                struct spvbin_position pos4 = spvbin_position_save (input);
                size_t save_n_errors4 = input->n_errors;
                if (!spvbin_match_bytes (input, "\x00", 1))
                    goto backtrack4;
                break;

            backtrack4:
                spvbin_position_restore (&pos4, input);
                input->n_errors = save_n_errors4;
                break;
            } while (0);
            if (!spvbin_parse_int32 (input, NULL))
                goto error;
            do {
                struct spvbin_position pos5 = spvbin_position_save (input);
                size_t save_n_errors5 = input->n_errors;
                if (!spvbin_match_bytes (input, "\x00", 1))
                    goto backtrack5;
                break;

            backtrack5:
                spvbin_position_restore (&pos5, input);
                input->n_errors = save_n_errors5;
                break;
            } while (0);
            do {
                struct spvbin_position pos6 = spvbin_position_save (input);
                size_t save_n_errors6 = input->n_errors;
                if (!spvbin_match_bytes (input, "\x00", 1))
                    goto backtrack6;
                break;

            backtrack6:
                spvbin_position_restore (&pos6, input);
                input->n_errors = save_n_errors6;
                break;
            } while (0);
        }
        if (input->version == 0x3) {
            struct spvbin_position pos7 = spvbin_position_save (input);
            struct spvbin_limit saved_limit;
            if (!spvbin_limit_parse (&saved_limit, input))
                goto error;
            do {
                if (!spvlb_parse_template_string (input, &p->template_string))
                    goto backtrack7;
                if (!spvlb_parse_style_pair (input, &p->style_pair))
                    goto backtrack7;
                if (!spvbin_input_at_end (input))
                    goto backtrack7;
                spvbin_limit_pop (&saved_limit, input);
                break;

            backtrack7:
                spvbin_position_restore (&pos7, input);
                spvbin_limit_pop (&saved_limit, input);
                goto error;
            } while (0);
        }
        break;
    } while (0);

    p->len = input->ofs - p->start;
    *p_ = p;
    return true;

error:
    spvbin_error (input, "ValueMod", p->start);
    spvlb_free_value_mod (p);
    return false;
}

void
spvlb_free_value_mod (struct spvlb_value_mod *p)
{
    if (p == NULL)
        return;

    free (p->refs);
    for (int i2 = 0; i2 < p->n_subscripts; i2++)
        free (p->subscripts[i2]);
    free (p->subscripts);
    spvlb_free_template_string (p->template_string);
    spvlb_free_style_pair (p->style_pair);
    free (p);
}

void
spvlb_print_value_mod (const char *title, int indent, const struct spvlb_value_mod *p)
{
    spvbin_print_header (title, p ? p->start : -1, p ? p->len : -1, indent);
    if (p == NULL) {
        printf ("none\n");
        return;
    }
    putchar ('\n');


    spvbin_print_int32 ("n-refs", indent + 1, p->n_refs);

    for (int i = 0; i < p->n_refs; i++) {
        char *elem_name = xasprintf ("refs[%d]", i);
        spvbin_print_int16 (elem_name, indent + 1, p->refs[i]);
        free (elem_name);
    }

    spvbin_print_int32 ("n-subscripts", indent + 1, p->n_subscripts);

    for (int i2 = 0; i2 < p->n_subscripts; i2++) {
        char *elem_name2 = xasprintf ("subscripts[%d]", i2);
        spvbin_print_string (elem_name2, indent + 1, p->subscripts[i2]);
        free (elem_name2);
    }








        spvlb_print_template_string ("template_string", indent + 1, p->template_string);

        spvlb_print_style_pair ("style_pair", indent + 1, p->style_pair);
}

bool
spvlb_parse_template_string (struct spvbin_input *input, struct spvlb_template_string **p_)
{
    *p_ = NULL;
    struct spvlb_template_string *p = xzalloc (sizeof *p);
    p->start = input->ofs;

    struct spvbin_position pos = spvbin_position_save (input);
    struct spvbin_limit saved_limit;
    if (!spvbin_limit_parse (&saved_limit, input))
        goto error;
    do {
        do {
            struct spvbin_position pos2 = spvbin_position_save (input);
            size_t save_n_errors = input->n_errors;
            struct spvbin_position pos3 = spvbin_position_save (input);
            struct spvbin_limit saved_limit2;
            if (!spvbin_limit_parse (&saved_limit2, input))
                goto backtrack2;
            do {
                do {
                    struct spvbin_position pos4 = spvbin_position_save (input);
                    size_t save_n_errors2 = input->n_errors;
                    if (!spvbin_match_bytes (input, "\x00\x00\x00\x00", 4))
                        goto backtrack4;
                    do {
                        struct spvbin_position pos5 = spvbin_position_save (input);
                        size_t save_n_errors3 = input->n_errors;
                        if (!spvbin_match_bytes (input, "\x58", 1))
                            goto backtrack5;
                        break;

                    backtrack5:
                        spvbin_position_restore (&pos5, input);
                        input->n_errors = save_n_errors3;
                        if (!spvbin_match_bytes (input, "\x31\x55", 2))
                            goto backtrack4;
                        break;
                    } while (0);
                    break;

                backtrack4:
                    spvbin_position_restore (&pos4, input);
                    input->n_errors = save_n_errors2;
                    break;
                } while (0);
                if (!spvbin_input_at_end (input))
                    goto backtrack3;
                spvbin_limit_pop (&saved_limit2, input);
                break;

            backtrack3:
                spvbin_position_restore (&pos3, input);
                spvbin_limit_pop (&saved_limit2, input);
                goto backtrack2;
            } while (0);
            do {
                struct spvbin_position pos6 = spvbin_position_save (input);
                size_t save_n_errors4 = input->n_errors;
                if (!spvbin_match_bytes (input, "\x58", 1))
                    goto backtrack6;
                break;

            backtrack6:
                spvbin_position_restore (&pos6, input);
                input->n_errors = save_n_errors4;
                if (!spvbin_match_bytes (input, "\x31", 1))
                    goto backtrack2;
                if (!spvbin_parse_string (input, &p->id))
                    goto backtrack2;
                break;
            } while (0);
            break;

        backtrack2:
            spvbin_position_restore (&pos2, input);
            input->n_errors = save_n_errors;
            break;
        } while (0);
        if (!spvbin_input_at_end (input))
            goto backtrack;
        spvbin_limit_pop (&saved_limit, input);
        break;

    backtrack:
        spvbin_position_restore (&pos, input);
        spvbin_limit_pop (&saved_limit, input);
        goto error;
    } while (0);

    p->len = input->ofs - p->start;
    *p_ = p;
    return true;

error:
    spvbin_error (input, "TemplateString", p->start);
    spvlb_free_template_string (p);
    return false;
}

void
spvlb_free_template_string (struct spvlb_template_string *p)
{
    if (p == NULL)
        return;

    free (p->id);
    free (p);
}

void
spvlb_print_template_string (const char *title, int indent, const struct spvlb_template_string *p)
{
    spvbin_print_header (title, p ? p->start : -1, p ? p->len : -1, indent);
    if (p == NULL) {
        printf ("none\n");
        return;
    }
    putchar ('\n');




            spvbin_print_string ("id", indent + 1, p->id);
}

bool
spvlb_parse_style_pair (struct spvbin_input *input, struct spvlb_style_pair **p_)
{
    *p_ = NULL;
    struct spvlb_style_pair *p = xzalloc (sizeof *p);
    p->start = input->ofs;

    do {
        struct spvbin_position pos = spvbin_position_save (input);
        size_t save_n_errors = input->n_errors;
        if (!spvbin_match_bytes (input, "\x31", 1))
            goto backtrack;
        if (!spvlb_parse_font_style (input, &p->font_style))
            goto backtrack;
        break;

    backtrack:
        spvbin_position_restore (&pos, input);
        input->n_errors = save_n_errors;
        if (!spvbin_match_bytes (input, "\x58", 1))
            goto error;
        break;
    } while (0);
    do {
        struct spvbin_position pos2 = spvbin_position_save (input);
        size_t save_n_errors2 = input->n_errors;
        if (!spvbin_match_bytes (input, "\x31", 1))
            goto backtrack2;
        if (!spvlb_parse_cell_style (input, &p->cell_style))
            goto backtrack2;
        break;

    backtrack2:
        spvbin_position_restore (&pos2, input);
        input->n_errors = save_n_errors2;
        if (!spvbin_match_bytes (input, "\x58", 1))
            goto error;
        break;
    } while (0);

    p->len = input->ofs - p->start;
    *p_ = p;
    return true;

error:
    spvbin_error (input, "StylePair", p->start);
    spvlb_free_style_pair (p);
    return false;
}

void
spvlb_free_style_pair (struct spvlb_style_pair *p)
{
    if (p == NULL)
        return;

    spvlb_free_font_style (p->font_style);
    spvlb_free_cell_style (p->cell_style);
    free (p);
}

void
spvlb_print_style_pair (const char *title, int indent, const struct spvlb_style_pair *p)
{
    spvbin_print_header (title, p ? p->start : -1, p ? p->len : -1, indent);
    if (p == NULL) {
        printf ("none\n");
        return;
    }
    putchar ('\n');


    spvlb_print_font_style ("font_style", indent + 1, p->font_style);


    spvlb_print_cell_style ("cell_style", indent + 1, p->cell_style);
}

bool
spvlb_parse_font_style (struct spvbin_input *input, struct spvlb_font_style **p_)
{
    *p_ = NULL;
    struct spvlb_font_style *p = xzalloc (sizeof *p);
    p->start = input->ofs;

    if (!spvbin_parse_bool (input, &p->bold))
        goto error;
    if (!spvbin_parse_bool (input, &p->italic))
        goto error;
    if (!spvbin_parse_bool (input, &p->underline))
        goto error;
    if (!spvbin_parse_bool (input, &p->show))
        goto error;
    if (!spvbin_parse_string (input, &p->fg_color))
        goto error;
    if (!spvbin_parse_string (input, &p->bg_color))
        goto error;
    if (!spvbin_parse_string (input, &p->typeface))
        goto error;
    if (!spvbin_parse_byte (input, &p->size))
        goto error;

    p->len = input->ofs - p->start;
    *p_ = p;
    return true;

error:
    spvbin_error (input, "FontStyle", p->start);
    spvlb_free_font_style (p);
    return false;
}

void
spvlb_free_font_style (struct spvlb_font_style *p)
{
    if (p == NULL)
        return;

    free (p->fg_color);
    free (p->bg_color);
    free (p->typeface);
    free (p);
}

void
spvlb_print_font_style (const char *title, int indent, const struct spvlb_font_style *p)
{
    spvbin_print_header (title, p ? p->start : -1, p ? p->len : -1, indent);
    if (p == NULL) {
        printf ("none\n");
        return;
    }
    putchar ('\n');

    spvbin_print_bool ("bold", indent + 1, p->bold);

    spvbin_print_bool ("italic", indent + 1, p->italic);

    spvbin_print_bool ("underline", indent + 1, p->underline);

    spvbin_print_bool ("show", indent + 1, p->show);

    spvbin_print_string ("fg-color", indent + 1, p->fg_color);

    spvbin_print_string ("bg-color", indent + 1, p->bg_color);

    spvbin_print_string ("typeface", indent + 1, p->typeface);

    spvbin_print_byte ("size", indent + 1, p->size);
}

bool
spvlb_parse_cell_style (struct spvbin_input *input, struct spvlb_cell_style **p_)
{
    *p_ = NULL;
    struct spvlb_cell_style *p = xzalloc (sizeof *p);
    p->start = input->ofs;

    if (!spvbin_parse_int32 (input, &p->halign))
        goto error;
    if (!spvbin_parse_int32 (input, &p->valign))
        goto error;
    if (!spvbin_parse_double (input, &p->decimal_offset))
        goto error;
    if (!spvbin_parse_int16 (input, &p->left_margin))
        goto error;
    if (!spvbin_parse_int16 (input, &p->right_margin))
        goto error;
    if (!spvbin_parse_int16 (input, &p->top_margin))
        goto error;
    if (!spvbin_parse_int16 (input, &p->bottom_margin))
        goto error;

    p->len = input->ofs - p->start;
    *p_ = p;
    return true;

error:
    spvbin_error (input, "CellStyle", p->start);
    spvlb_free_cell_style (p);
    return false;
}

void
spvlb_free_cell_style (struct spvlb_cell_style *p)
{
    if (p == NULL)
        return;

    free (p);
}

void
spvlb_print_cell_style (const char *title, int indent, const struct spvlb_cell_style *p)
{
    spvbin_print_header (title, p ? p->start : -1, p ? p->len : -1, indent);
    if (p == NULL) {
        printf ("none\n");
        return;
    }
    putchar ('\n');

    spvbin_print_int32 ("halign", indent + 1, p->halign);

    spvbin_print_int32 ("valign", indent + 1, p->valign);

    spvbin_print_double ("decimal-offset", indent + 1, p->decimal_offset);

    spvbin_print_int16 ("left-margin", indent + 1, p->left_margin);

    spvbin_print_int16 ("right-margin", indent + 1, p->right_margin);

    spvbin_print_int16 ("top-margin", indent + 1, p->top_margin);

    spvbin_print_int16 ("bottom-margin", indent + 1, p->bottom_margin);
}
