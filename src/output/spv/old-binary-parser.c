/* Generated automatically -- do not modify!    -*- buffer-read-only: t -*- */
#include <config.h>
#include "output/spv/old-binary-parser.h"
#include <stdio.h>
#include <stdlib.h>
#include "libpspp/str.h"
#include "gl/xalloc.h"

bool
spvob_parse_legacy_binary (struct spvbin_input *input, struct spvob_legacy_binary **p_)
{
    *p_ = NULL;
    struct spvob_legacy_binary *p = xzalloc (sizeof *p);
    p->start = input->ofs;

    if (!spvbin_match_bytes (input, "\x00", 1))
        goto error;
    if (!spvbin_parse_byte (input, &p->version))
        goto error;
    input->version = p->version;
    if (!spvbin_parse_int16 (input, &p->n_sources))
        goto error;
    if (!spvbin_parse_int32 (input, &p->member_size))
        goto error;
    p->metadata = xcalloc (p->n_sources, sizeof *p->metadata);
    for (int i = 0; i < p->n_sources; i++)
        if (!spvob_parse_metadata (input, &p->metadata[i]))
            goto error;

    p->len = input->ofs - p->start;
    *p_ = p;
    return true;

error:
    spvbin_error (input, "LegacyBinary", p->start);
    spvob_free_legacy_binary (p);
    return false;
}

void
spvob_free_legacy_binary (struct spvob_legacy_binary *p)
{
    if (p == NULL)
        return;

    for (int i = 0; i < p->n_sources; i++)
        spvob_free_metadata (p->metadata[i]);
    free (p->metadata);
    free (p);
}

void
spvob_print_legacy_binary (const char *title, int indent, const struct spvob_legacy_binary *p)
{
    spvbin_print_header (title, p ? p->start : -1, p ? p->len : -1, indent);
    if (p == NULL) {
        printf ("none\n");
        return;
    }
    putchar ('\n');


    spvbin_print_byte ("version", indent + 1, p->version);

    spvbin_print_int16 ("n-sources", indent + 1, p->n_sources);

    spvbin_print_int32 ("member-size", indent + 1, p->member_size);

    for (int i = 0; i < p->n_sources; i++) {
        char *elem_name = xasprintf ("metadata[%d]", i);
        spvob_print_metadata (elem_name, indent + 1, p->metadata[i]);
        free (elem_name);
    }
}

bool
spvob_parse_metadata (struct spvbin_input *input, struct spvob_metadata **p_)
{
    *p_ = NULL;
    struct spvob_metadata *p = xzalloc (sizeof *p);
    p->start = input->ofs;

    if (!spvbin_parse_int32 (input, &p->n_values))
        goto error;
    if (!spvbin_parse_int32 (input, &p->n_variables))
        goto error;
    if (!spvbin_parse_int32 (input, &p->data_offset))
        goto error;
    for (int i = 0; i < 28; i++)
        if (!spvbin_parse_byte (input, &p->source_name[i]))
            goto error;
    if (input->version == 0xB0) {
        for (int i2 = 0; i2 < 36; i2++)
            if (!spvbin_parse_byte (input, &p->ext_source_name[i2]))
                goto error;
        if (!spvbin_parse_int32 (input, &p->x))
            goto error;
    }

    p->len = input->ofs - p->start;
    *p_ = p;
    return true;

error:
    spvbin_error (input, "Metadata", p->start);
    spvob_free_metadata (p);
    return false;
}

void
spvob_free_metadata (struct spvob_metadata *p)
{
    if (p == NULL)
        return;

    free (p);
}

void
spvob_print_metadata (const char *title, int indent, const struct spvob_metadata *p)
{
    spvbin_print_header (title, p ? p->start : -1, p ? p->len : -1, indent);
    if (p == NULL) {
        printf ("none\n");
        return;
    }
    putchar ('\n');

    spvbin_print_int32 ("n-values", indent + 1, p->n_values);

    spvbin_print_int32 ("n-variables", indent + 1, p->n_variables);

    spvbin_print_int32 ("data-offset", indent + 1, p->data_offset);

    for (int i = 0; i < 28; i++) {
        char *elem_name = xasprintf ("source-name[%d]", i);
        spvbin_print_byte (elem_name, indent + 1, p->source_name[i]);
        free (elem_name);
    }

    for (int i2 = 0; i2 < 36; i2++) {
        char *elem_name2 = xasprintf ("ext-source-name[%d]", i2);
        spvbin_print_byte (elem_name2, indent + 1, p->ext_source_name[i2]);
        free (elem_name2);
    }

    spvbin_print_int32 ("x", indent + 1, p->x);
}

bool
spvob_parse_strings (struct spvbin_input *input, struct spvob_strings **p_)
{
    *p_ = NULL;
    struct spvob_strings *p = xzalloc (sizeof *p);
    p->start = input->ofs;

    if (!spvob_parse_source_maps (input, &p->maps))
        goto error;
    if (!spvob_parse_labels (input, &p->labels))
        goto error;

    p->len = input->ofs - p->start;
    *p_ = p;
    return true;

error:
    spvbin_error (input, "Strings", p->start);
    spvob_free_strings (p);
    return false;
}

void
spvob_free_strings (struct spvob_strings *p)
{
    if (p == NULL)
        return;

    spvob_free_source_maps (p->maps);
    spvob_free_labels (p->labels);
    free (p);
}

void
spvob_print_strings (const char *title, int indent, const struct spvob_strings *p)
{
    spvbin_print_header (title, p ? p->start : -1, p ? p->len : -1, indent);
    if (p == NULL) {
        printf ("none\n");
        return;
    }
    putchar ('\n');

    spvob_print_source_maps ("maps", indent + 1, p->maps);

    spvob_print_labels ("labels", indent + 1, p->labels);
}

bool
spvob_parse_source_maps (struct spvbin_input *input, struct spvob_source_maps **p_)
{
    *p_ = NULL;
    struct spvob_source_maps *p = xzalloc (sizeof *p);
    p->start = input->ofs;

    if (!spvbin_parse_int32 (input, &p->n_maps))
        goto error;
    p->maps = xcalloc (p->n_maps, sizeof *p->maps);
    for (int i = 0; i < p->n_maps; i++)
        if (!spvob_parse_source_map (input, &p->maps[i]))
            goto error;

    p->len = input->ofs - p->start;
    *p_ = p;
    return true;

error:
    spvbin_error (input, "SourceMaps", p->start);
    spvob_free_source_maps (p);
    return false;
}

void
spvob_free_source_maps (struct spvob_source_maps *p)
{
    if (p == NULL)
        return;

    for (int i = 0; i < p->n_maps; i++)
        spvob_free_source_map (p->maps[i]);
    free (p->maps);
    free (p);
}

void
spvob_print_source_maps (const char *title, int indent, const struct spvob_source_maps *p)
{
    spvbin_print_header (title, p ? p->start : -1, p ? p->len : -1, indent);
    if (p == NULL) {
        printf ("none\n");
        return;
    }
    putchar ('\n');

    spvbin_print_int32 ("n-maps", indent + 1, p->n_maps);

    for (int i = 0; i < p->n_maps; i++) {
        char *elem_name = xasprintf ("maps[%d]", i);
        spvob_print_source_map (elem_name, indent + 1, p->maps[i]);
        free (elem_name);
    }
}

bool
spvob_parse_source_map (struct spvbin_input *input, struct spvob_source_map **p_)
{
    *p_ = NULL;
    struct spvob_source_map *p = xzalloc (sizeof *p);
    p->start = input->ofs;

    if (!spvbin_parse_string (input, &p->source_name))
        goto error;
    if (!spvbin_parse_int32 (input, &p->n_variables))
        goto error;
    p->variables = xcalloc (p->n_variables, sizeof *p->variables);
    for (int i = 0; i < p->n_variables; i++)
        if (!spvob_parse_variable_map (input, &p->variables[i]))
            goto error;

    p->len = input->ofs - p->start;
    *p_ = p;
    return true;

error:
    spvbin_error (input, "SourceMap", p->start);
    spvob_free_source_map (p);
    return false;
}

void
spvob_free_source_map (struct spvob_source_map *p)
{
    if (p == NULL)
        return;

    free (p->source_name);
    for (int i = 0; i < p->n_variables; i++)
        spvob_free_variable_map (p->variables[i]);
    free (p->variables);
    free (p);
}

void
spvob_print_source_map (const char *title, int indent, const struct spvob_source_map *p)
{
    spvbin_print_header (title, p ? p->start : -1, p ? p->len : -1, indent);
    if (p == NULL) {
        printf ("none\n");
        return;
    }
    putchar ('\n');

    spvbin_print_string ("source-name", indent + 1, p->source_name);

    spvbin_print_int32 ("n-variables", indent + 1, p->n_variables);

    for (int i = 0; i < p->n_variables; i++) {
        char *elem_name = xasprintf ("variables[%d]", i);
        spvob_print_variable_map (elem_name, indent + 1, p->variables[i]);
        free (elem_name);
    }
}

bool
spvob_parse_variable_map (struct spvbin_input *input, struct spvob_variable_map **p_)
{
    *p_ = NULL;
    struct spvob_variable_map *p = xzalloc (sizeof *p);
    p->start = input->ofs;

    if (!spvbin_parse_string (input, &p->variable_name))
        goto error;
    if (!spvbin_parse_int32 (input, &p->n_data))
        goto error;
    p->data = xcalloc (p->n_data, sizeof *p->data);
    for (int i = 0; i < p->n_data; i++)
        if (!spvob_parse_datum_map (input, &p->data[i]))
            goto error;

    p->len = input->ofs - p->start;
    *p_ = p;
    return true;

error:
    spvbin_error (input, "VariableMap", p->start);
    spvob_free_variable_map (p);
    return false;
}

void
spvob_free_variable_map (struct spvob_variable_map *p)
{
    if (p == NULL)
        return;

    free (p->variable_name);
    for (int i = 0; i < p->n_data; i++)
        spvob_free_datum_map (p->data[i]);
    free (p->data);
    free (p);
}

void
spvob_print_variable_map (const char *title, int indent, const struct spvob_variable_map *p)
{
    spvbin_print_header (title, p ? p->start : -1, p ? p->len : -1, indent);
    if (p == NULL) {
        printf ("none\n");
        return;
    }
    putchar ('\n');

    spvbin_print_string ("variable-name", indent + 1, p->variable_name);

    spvbin_print_int32 ("n-data", indent + 1, p->n_data);

    for (int i = 0; i < p->n_data; i++) {
        char *elem_name = xasprintf ("data[%d]", i);
        spvob_print_datum_map (elem_name, indent + 1, p->data[i]);
        free (elem_name);
    }
}

bool
spvob_parse_datum_map (struct spvbin_input *input, struct spvob_datum_map **p_)
{
    *p_ = NULL;
    struct spvob_datum_map *p = xzalloc (sizeof *p);
    p->start = input->ofs;

    if (!spvbin_parse_int32 (input, &p->value_idx))
        goto error;
    if (!spvbin_parse_int32 (input, &p->label_idx))
        goto error;

    p->len = input->ofs - p->start;
    *p_ = p;
    return true;

error:
    spvbin_error (input, "DatumMap", p->start);
    spvob_free_datum_map (p);
    return false;
}

void
spvob_free_datum_map (struct spvob_datum_map *p)
{
    if (p == NULL)
        return;

    free (p);
}

void
spvob_print_datum_map (const char *title, int indent, const struct spvob_datum_map *p)
{
    spvbin_print_header (title, p ? p->start : -1, p ? p->len : -1, indent);
    if (p == NULL) {
        printf ("none\n");
        return;
    }
    putchar ('\n');

    spvbin_print_int32 ("value-idx", indent + 1, p->value_idx);

    spvbin_print_int32 ("label-idx", indent + 1, p->label_idx);
}

bool
spvob_parse_labels (struct spvbin_input *input, struct spvob_labels **p_)
{
    *p_ = NULL;
    struct spvob_labels *p = xzalloc (sizeof *p);
    p->start = input->ofs;

    if (!spvbin_parse_int32 (input, &p->n_labels))
        goto error;
    p->labels = xcalloc (p->n_labels, sizeof *p->labels);
    for (int i = 0; i < p->n_labels; i++)
        if (!spvob_parse_label (input, &p->labels[i]))
            goto error;

    p->len = input->ofs - p->start;
    *p_ = p;
    return true;

error:
    spvbin_error (input, "Labels", p->start);
    spvob_free_labels (p);
    return false;
}

void
spvob_free_labels (struct spvob_labels *p)
{
    if (p == NULL)
        return;

    for (int i = 0; i < p->n_labels; i++)
        spvob_free_label (p->labels[i]);
    free (p->labels);
    free (p);
}

void
spvob_print_labels (const char *title, int indent, const struct spvob_labels *p)
{
    spvbin_print_header (title, p ? p->start : -1, p ? p->len : -1, indent);
    if (p == NULL) {
        printf ("none\n");
        return;
    }
    putchar ('\n');

    spvbin_print_int32 ("n-labels", indent + 1, p->n_labels);

    for (int i = 0; i < p->n_labels; i++) {
        char *elem_name = xasprintf ("labels[%d]", i);
        spvob_print_label (elem_name, indent + 1, p->labels[i]);
        free (elem_name);
    }
}

bool
spvob_parse_label (struct spvbin_input *input, struct spvob_label **p_)
{
    *p_ = NULL;
    struct spvob_label *p = xzalloc (sizeof *p);
    p->start = input->ofs;

    if (!spvbin_parse_int32 (input, &p->frequency))
        goto error;
    if (!spvbin_parse_string (input, &p->label))
        goto error;

    p->len = input->ofs - p->start;
    *p_ = p;
    return true;

error:
    spvbin_error (input, "Label", p->start);
    spvob_free_label (p);
    return false;
}

void
spvob_free_label (struct spvob_label *p)
{
    if (p == NULL)
        return;

    free (p->label);
    free (p);
}

void
spvob_print_label (const char *title, int indent, const struct spvob_label *p)
{
    spvbin_print_header (title, p ? p->start : -1, p ? p->len : -1, indent);
    if (p == NULL) {
        printf ("none\n");
        return;
    }
    putchar ('\n');

    spvbin_print_int32 ("frequency", indent + 1, p->frequency);

    spvbin_print_string ("label", indent + 1, p->label);
}
