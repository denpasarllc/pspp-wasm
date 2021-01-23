/* Generated automatically -- do not modify!    -*- buffer-read-only: t -*- */
#include <config.h>
#include "output/spv/structure-xml-parser.h"
#include <limits.h>
#include <stdio.h>
#include <stdlib.h>
#include "libpspp/cast.h"
#include "libpspp/str.h"
#include "gl/xalloc.h"



static const struct spvxml_enum spvsx_border_style_type_map[] = {
    { "dashed", SPVSX_BORDER_STYLE_TYPE_DASHED },
    { "double", SPVSX_BORDER_STYLE_TYPE_DOUBLE },
    { "none", SPVSX_BORDER_STYLE_TYPE_NONE },
    { "solid", SPVSX_BORDER_STYLE_TYPE_SOLID },
    { "thick", SPVSX_BORDER_STYLE_TYPE_THICK },
    { "thin", SPVSX_BORDER_STYLE_TYPE_THIN },
    { NULL, 0 },
};

const char *
spvsx_border_style_type_to_string (enum spvsx_border_style_type border_style_type)
{
    switch (border_style_type) {
    case SPVSX_BORDER_STYLE_TYPE_DASHED: return "dashed";
    case SPVSX_BORDER_STYLE_TYPE_DOUBLE: return "double";
    case SPVSX_BORDER_STYLE_TYPE_NONE: return "none";
    case SPVSX_BORDER_STYLE_TYPE_SOLID: return "solid";
    case SPVSX_BORDER_STYLE_TYPE_THICK: return "thick";
    case SPVSX_BORDER_STYLE_TYPE_THIN: return "thin";
    default: return NULL;
    }
}

static const struct spvxml_enum spvsx_chart_size_map[] = {
    { "OTHER", SPVSX_CHART_SIZE_O_T_H_E_R },
    { "as-is", SPVSX_CHART_SIZE_AS_IS },
    { "full-height", SPVSX_CHART_SIZE_FULL_HEIGHT },
    { "half-height", SPVSX_CHART_SIZE_HALF_HEIGHT },
    { "quarter-height", SPVSX_CHART_SIZE_QUARTER_HEIGHT },
    { NULL, 0 },
};

const char *
spvsx_chart_size_to_string (enum spvsx_chart_size chart_size)
{
    switch (chart_size) {
    case SPVSX_CHART_SIZE_O_T_H_E_R: return "OTHER";
    case SPVSX_CHART_SIZE_AS_IS: return "as-is";
    case SPVSX_CHART_SIZE_FULL_HEIGHT: return "full-height";
    case SPVSX_CHART_SIZE_HALF_HEIGHT: return "half-height";
    case SPVSX_CHART_SIZE_QUARTER_HEIGHT: return "quarter-height";
    default: return NULL;
    }
}

static const struct spvxml_enum spvsx_font_style_map[] = {
    { "italic", SPVSX_FONT_STYLE_ITALIC },
    { "regular", SPVSX_FONT_STYLE_REGULAR },
    { NULL, 0 },
};

const char *
spvsx_font_style_to_string (enum spvsx_font_style font_style)
{
    switch (font_style) {
    case SPVSX_FONT_STYLE_ITALIC: return "italic";
    case SPVSX_FONT_STYLE_REGULAR: return "regular";
    default: return NULL;
    }
}

static const struct spvxml_enum spvsx_font_weight_map[] = {
    { "bold", SPVSX_FONT_WEIGHT_BOLD },
    { "regular", SPVSX_FONT_WEIGHT_REGULAR },
    { NULL, 0 },
};

const char *
spvsx_font_weight_to_string (enum spvsx_font_weight font_weight)
{
    switch (font_weight) {
    case SPVSX_FONT_WEIGHT_BOLD: return "bold";
    case SPVSX_FONT_WEIGHT_REGULAR: return "regular";
    default: return NULL;
    }
}

static const struct spvxml_enum spvsx_label_location_vertical_map[] = {
    { "center", SPVSX_LABEL_LOCATION_VERTICAL_CENTER },
    { "negative", SPVSX_LABEL_LOCATION_VERTICAL_NEGATIVE },
    { "positive", SPVSX_LABEL_LOCATION_VERTICAL_POSITIVE },
    { NULL, 0 },
};

const char *
spvsx_label_location_vertical_to_string (enum spvsx_label_location_vertical label_location_vertical)
{
    switch (label_location_vertical) {
    case SPVSX_LABEL_LOCATION_VERTICAL_CENTER: return "center";
    case SPVSX_LABEL_LOCATION_VERTICAL_NEGATIVE: return "negative";
    case SPVSX_LABEL_LOCATION_VERTICAL_POSITIVE: return "positive";
    default: return NULL;
    }
}

static const struct spvxml_enum spvsx_marker_position_map[] = {
    { "subscript", SPVSX_MARKER_POSITION_SUBSCRIPT },
    { "superscript", SPVSX_MARKER_POSITION_SUPERSCRIPT },
    { NULL, 0 },
};

const char *
spvsx_marker_position_to_string (enum spvsx_marker_position marker_position)
{
    switch (marker_position) {
    case SPVSX_MARKER_POSITION_SUBSCRIPT: return "subscript";
    case SPVSX_MARKER_POSITION_SUPERSCRIPT: return "superscript";
    default: return NULL;
    }
}

static const struct spvxml_enum spvsx_number_format_map[] = {
    { "alphabetic", SPVSX_NUMBER_FORMAT_ALPHABETIC },
    { "numeric", SPVSX_NUMBER_FORMAT_NUMERIC },
    { NULL, 0 },
};

const char *
spvsx_number_format_to_string (enum spvsx_number_format number_format)
{
    switch (number_format) {
    case SPVSX_NUMBER_FORMAT_ALPHABETIC: return "alphabetic";
    case SPVSX_NUMBER_FORMAT_NUMERIC: return "numeric";
    default: return NULL;
    }
}

static const struct spvxml_enum spvsx_row_dimension_labels_map[] = {
    { "inCorner", SPVSX_ROW_DIMENSION_LABELS_IN_CORNER },
    { "nested", SPVSX_ROW_DIMENSION_LABELS_NESTED },
    { NULL, 0 },
};

const char *
spvsx_row_dimension_labels_to_string (enum spvsx_row_dimension_labels row_dimension_labels)
{
    switch (row_dimension_labels) {
    case SPVSX_ROW_DIMENSION_LABELS_IN_CORNER: return "inCorner";
    case SPVSX_ROW_DIMENSION_LABELS_NESTED: return "nested";
    default: return NULL;
    }
}

static const struct spvxml_enum spvsx_table_type_map[] = {
    { "note", SPVSX_TABLE_TYPE_NOTE },
    { "table", SPVSX_TABLE_TYPE_TABLE },
    { "warning", SPVSX_TABLE_TYPE_WARNING },
    { NULL, 0 },
};

const char *
spvsx_table_type_to_string (enum spvsx_table_type table_type)
{
    switch (table_type) {
    case SPVSX_TABLE_TYPE_NOTE: return "note";
    case SPVSX_TABLE_TYPE_TABLE: return "table";
    case SPVSX_TABLE_TYPE_WARNING: return "warning";
    default: return NULL;
    }
}

static const struct spvxml_enum spvsx_text_align_map[] = {
    { "center", SPVSX_TEXT_ALIGN_CENTER },
    { "left", SPVSX_TEXT_ALIGN_LEFT },
    { NULL, 0 },
};

const char *
spvsx_text_align_to_string (enum spvsx_text_align text_align)
{
    switch (text_align) {
    case SPVSX_TEXT_ALIGN_CENTER: return "center";
    case SPVSX_TEXT_ALIGN_LEFT: return "left";
    default: return NULL;
    }
}

static const struct spvxml_enum spvsx_text_alignment_map[] = {
    { "center", SPVSX_TEXT_ALIGNMENT_CENTER },
    { "decimal", SPVSX_TEXT_ALIGNMENT_DECIMAL },
    { "left", SPVSX_TEXT_ALIGNMENT_LEFT },
    { "mixed", SPVSX_TEXT_ALIGNMENT_MIXED },
    { "right", SPVSX_TEXT_ALIGNMENT_RIGHT },
    { NULL, 0 },
};

const char *
spvsx_text_alignment_to_string (enum spvsx_text_alignment text_alignment)
{
    switch (text_alignment) {
    case SPVSX_TEXT_ALIGNMENT_CENTER: return "center";
    case SPVSX_TEXT_ALIGNMENT_DECIMAL: return "decimal";
    case SPVSX_TEXT_ALIGNMENT_LEFT: return "left";
    case SPVSX_TEXT_ALIGNMENT_MIXED: return "mixed";
    case SPVSX_TEXT_ALIGNMENT_RIGHT: return "right";
    default: return NULL;
    }
}

static const struct spvxml_enum spvsx_text_type_map[] = {
    { "log", SPVSX_TEXT_TYPE_LOG },
    { "page-title", SPVSX_TEXT_TYPE_PAGE_TITLE },
    { "text", SPVSX_TEXT_TYPE_TEXT },
    { "title", SPVSX_TEXT_TYPE_TITLE },
    { NULL, 0 },
};

const char *
spvsx_text_type_to_string (enum spvsx_text_type text_type)
{
    switch (text_type) {
    case SPVSX_TEXT_TYPE_LOG: return "log";
    case SPVSX_TEXT_TYPE_PAGE_TITLE: return "page-title";
    case SPVSX_TEXT_TYPE_TEXT: return "text";
    case SPVSX_TEXT_TYPE_TITLE: return "title";
    default: return NULL;
    }
}

static const struct spvxml_enum spvsx_type_map[] = {
    { "text", SPVSX_TYPE_TEXT },
    { "title", SPVSX_TYPE_TITLE },
    { NULL, 0 },
};

const char *
spvsx_type_to_string (enum spvsx_type type)
{
    switch (type) {
    case SPVSX_TYPE_TEXT: return "text";
    case SPVSX_TYPE_TITLE: return "title";
    default: return NULL;
    }
}

static const struct spvxml_enum spvsx_visibility_map[] = {
    { "hidden", SPVSX_VISIBILITY_HIDDEN },
    { "visible", SPVSX_VISIBILITY_VISIBLE },
    { NULL, 0 },
};

const char *
spvsx_visibility_to_string (enum spvsx_visibility visibility)
{
    switch (visibility) {
    case SPVSX_VISIBILITY_HIDDEN: return "hidden";
    case SPVSX_VISIBILITY_VISIBLE: return "visible";
    default: return NULL;
    }
}
static void spvsx_collect_ids_vi_zml (struct spvxml_context *, struct spvsx_vi_zml *);
static void spvsx_resolve_refs_vi_zml (struct spvxml_context *ctx UNUSED, struct spvsx_vi_zml *p UNUSED);

static void spvsx_collect_ids_border_properties (struct spvxml_context *, struct spvsx_border_properties *);
static void spvsx_resolve_refs_border_properties (struct spvxml_context *ctx UNUSED, struct spvsx_border_properties *p UNUSED);

static void spvsx_collect_ids_border_style (struct spvxml_context *, struct spvsx_border_style *);
static void spvsx_resolve_refs_border_style (struct spvxml_context *ctx UNUSED, struct spvsx_border_style *p UNUSED);

static void spvsx_collect_ids_cell_format_properties (struct spvxml_context *, struct spvsx_cell_format_properties *);
static void spvsx_resolve_refs_cell_format_properties (struct spvxml_context *ctx UNUSED, struct spvsx_cell_format_properties *p UNUSED);

static void spvsx_collect_ids_cell_style (struct spvxml_context *, struct spvsx_cell_style *);
static void spvsx_resolve_refs_cell_style (struct spvxml_context *ctx UNUSED, struct spvsx_cell_style *p UNUSED);

static void spvsx_collect_ids_container (struct spvxml_context *, struct spvsx_container *);
static void spvsx_resolve_refs_container (struct spvxml_context *ctx UNUSED, struct spvsx_container *p UNUSED);

static void spvsx_collect_ids_container_text (struct spvxml_context *, struct spvsx_container_text *);
static void spvsx_resolve_refs_container_text (struct spvxml_context *ctx UNUSED, struct spvsx_container_text *p UNUSED);

static void spvsx_collect_ids_csv_path (struct spvxml_context *, struct spvsx_csv_path *);
static void spvsx_resolve_refs_csv_path (struct spvxml_context *ctx UNUSED, struct spvsx_csv_path *p UNUSED);

static void spvsx_collect_ids_data_path (struct spvxml_context *, struct spvsx_data_path *);
static void spvsx_resolve_refs_data_path (struct spvxml_context *ctx UNUSED, struct spvsx_data_path *p UNUSED);

static void spvsx_collect_ids_footnote_properties (struct spvxml_context *, struct spvsx_footnote_properties *);
static void spvsx_resolve_refs_footnote_properties (struct spvxml_context *ctx UNUSED, struct spvsx_footnote_properties *p UNUSED);

static void spvsx_collect_ids_general_properties (struct spvxml_context *, struct spvsx_general_properties *);
static void spvsx_resolve_refs_general_properties (struct spvxml_context *ctx UNUSED, struct spvsx_general_properties *p UNUSED);

static void spvsx_collect_ids_graph (struct spvxml_context *, struct spvsx_graph *);
static void spvsx_resolve_refs_graph (struct spvxml_context *ctx UNUSED, struct spvsx_graph *p UNUSED);

static void spvsx_collect_ids_heading (struct spvxml_context *, struct spvsx_heading *);
static void spvsx_resolve_refs_heading (struct spvxml_context *ctx UNUSED, struct spvsx_heading *p UNUSED);

static void spvsx_collect_ids_html (struct spvxml_context *, struct spvsx_html *);
static void spvsx_resolve_refs_html (struct spvxml_context *ctx UNUSED, struct spvsx_html *p UNUSED);

static void spvsx_collect_ids_image (struct spvxml_context *, struct spvsx_image *);
static void spvsx_resolve_refs_image (struct spvxml_context *ctx UNUSED, struct spvsx_image *p UNUSED);

static void spvsx_collect_ids_label (struct spvxml_context *, struct spvsx_label *);
static void spvsx_resolve_refs_label (struct spvxml_context *ctx UNUSED, struct spvsx_label *p UNUSED);

static void spvsx_collect_ids_model (struct spvxml_context *, struct spvsx_model *);
static void spvsx_resolve_refs_model (struct spvxml_context *ctx UNUSED, struct spvsx_model *p UNUSED);

static void spvsx_collect_ids_object (struct spvxml_context *, struct spvsx_object *);
static void spvsx_resolve_refs_object (struct spvxml_context *ctx UNUSED, struct spvsx_object *p UNUSED);

static void spvsx_collect_ids_page_footer (struct spvxml_context *, struct spvsx_page_footer *);
static void spvsx_resolve_refs_page_footer (struct spvxml_context *ctx UNUSED, struct spvsx_page_footer *p UNUSED);

static void spvsx_collect_ids_page_header (struct spvxml_context *, struct spvsx_page_header *);
static void spvsx_resolve_refs_page_header (struct spvxml_context *ctx UNUSED, struct spvsx_page_header *p UNUSED);

static void spvsx_collect_ids_page_paragraph (struct spvxml_context *, struct spvsx_page_paragraph *);
static void spvsx_resolve_refs_page_paragraph (struct spvxml_context *ctx UNUSED, struct spvsx_page_paragraph *p UNUSED);

static void spvsx_collect_ids_page_paragraph_text (struct spvxml_context *, struct spvsx_page_paragraph_text *);
static void spvsx_resolve_refs_page_paragraph_text (struct spvxml_context *ctx UNUSED, struct spvsx_page_paragraph_text *p UNUSED);

static void spvsx_collect_ids_page_setup (struct spvxml_context *, struct spvsx_page_setup *);
static void spvsx_resolve_refs_page_setup (struct spvxml_context *ctx UNUSED, struct spvsx_page_setup *p UNUSED);

static void spvsx_collect_ids_path (struct spvxml_context *, struct spvsx_path *);
static void spvsx_resolve_refs_path (struct spvxml_context *ctx UNUSED, struct spvsx_path *p UNUSED);

static void spvsx_collect_ids_pmml_container_path (struct spvxml_context *, struct spvsx_pmml_container_path *);
static void spvsx_resolve_refs_pmml_container_path (struct spvxml_context *ctx UNUSED, struct spvsx_pmml_container_path *p UNUSED);

static void spvsx_collect_ids_printing_properties (struct spvxml_context *, struct spvsx_printing_properties *);
static void spvsx_resolve_refs_printing_properties (struct spvxml_context *ctx UNUSED, struct spvsx_printing_properties *p UNUSED);

static void spvsx_collect_ids_root_heading (struct spvxml_context *, struct spvsx_root_heading *);
static void spvsx_resolve_refs_root_heading (struct spvxml_context *ctx UNUSED, struct spvsx_root_heading *p UNUSED);

static void spvsx_collect_ids_stats_container_path (struct spvxml_context *, struct spvsx_stats_container_path *);
static void spvsx_resolve_refs_stats_container_path (struct spvxml_context *ctx UNUSED, struct spvsx_stats_container_path *p UNUSED);

static void spvsx_collect_ids_style (struct spvxml_context *, struct spvsx_style *);
static void spvsx_resolve_refs_style (struct spvxml_context *ctx UNUSED, struct spvsx_style *p UNUSED);

static void spvsx_collect_ids_table (struct spvxml_context *, struct spvsx_table *);
static void spvsx_resolve_refs_table (struct spvxml_context *ctx UNUSED, struct spvsx_table *p UNUSED);

static void spvsx_collect_ids_table_properties (struct spvxml_context *, struct spvsx_table_properties *);
static void spvsx_resolve_refs_table_properties (struct spvxml_context *ctx UNUSED, struct spvsx_table_properties *p UNUSED);

static void spvsx_collect_ids_table_structure (struct spvxml_context *, struct spvsx_table_structure *);
static void spvsx_resolve_refs_table_structure (struct spvxml_context *ctx UNUSED, struct spvsx_table_structure *p UNUSED);

static void spvsx_collect_ids_tree (struct spvxml_context *, struct spvsx_tree *);
static void spvsx_resolve_refs_tree (struct spvxml_context *ctx UNUSED, struct spvsx_tree *p UNUSED);


static bool UNUSED
spvsx_try_parse_vi_zml (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvsx_vi_zml *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvsx_vi_zml *))
{
    xmlNode *next = *input;
    bool ok = sub (nctx, &next, p);
    if (ok)
        *input = next;
    else if (!nctx->up->hard_error) {
        free (nctx->up->error);
        nctx->up->error = NULL;
    }
    return ok;
}

static bool
spvsx_parse_vi_zml_1 (struct spvxml_node_context *nctx, xmlNode **input, struct spvsx_vi_zml *p)
{
    if (!spvxml_content_parse_text (nctx, input, &p->text))
        return false;
    return true;
}

bool
spvsx_parse_vi_zml (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvsx_vi_zml **p_)
{
    enum {
        ATTR_ID,
        ATTR_VIEW_NAME,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_ID] = { "id", false, NULL },
        [ATTR_VIEW_NAME] = { "viewName", false, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvsx_vi_zml *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvsx_vi_zml_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    p->view_name = attrs[ATTR_VIEW_NAME].value;
    attrs[ATTR_VIEW_NAME].value = NULL;
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvsx_free_vi_zml (p);
        return false;
    }

    /* Parse content. */
    input = input->children;
    if (!spvsx_parse_vi_zml_1 (&nctx, &input, p)
        || !spvxml_content_parse_end (&nctx, input)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvsx_free_vi_zml (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvsx_free_vi_zml (struct spvsx_vi_zml *p)
{
    if (!p)
        return;

    free (p->view_name);
    free (p->text);
    free (p->node_.id);
    free (p);
}

void
spvsx_collect_ids_vi_zml (struct spvxml_context *ctx, struct spvsx_vi_zml *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

}

bool
spvsx_is_vi_zml (const struct spvxml_node *node)
{
    return node->class_ == &spvsx_vi_zml_class;
}

struct spvsx_vi_zml *
spvsx_cast_vi_zml (const struct spvxml_node *node)
{
    return (node && spvsx_is_vi_zml (node)
            ? UP_CAST (node, struct spvsx_vi_zml, node_)
            : NULL);
}

void
spvsx_resolve_refs_vi_zml (struct spvxml_context *ctx UNUSED, struct spvsx_vi_zml *p UNUSED)
{
    if (!p)
        return;

}

static void
spvsx_do_free_vi_zml (struct spvxml_node *node)
{
    spvsx_free_vi_zml (UP_CAST (node, struct spvsx_vi_zml, node_));
}

static void
spvsx_do_collect_ids_vi_zml (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvsx_collect_ids_vi_zml (ctx, UP_CAST (node, struct spvsx_vi_zml, node_));
}

static void
spvsx_do_resolve_refs_vi_zml (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvsx_resolve_refs_vi_zml (ctx, UP_CAST (node, struct spvsx_vi_zml, node_));
}

struct spvxml_node_class spvsx_vi_zml_class = {
    "ViZml",
    spvsx_do_free_vi_zml,
    spvsx_do_collect_ids_vi_zml,
    spvsx_do_resolve_refs_vi_zml,
};


static bool UNUSED
spvsx_try_parse_border_properties (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvsx_border_properties *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvsx_border_properties *))
{
    xmlNode *next = *input;
    bool ok = sub (nctx, &next, p);
    if (ok)
        *input = next;
    else if (!nctx->up->hard_error) {
        free (nctx->up->error);
        nctx->up->error = NULL;
    }
    return ok;
}

static bool
spvsx_parse_border_properties_2 (struct spvxml_node_context *nctx, xmlNode **input, struct spvsx_border_properties *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "any", &node))
        return false;
    struct spvsx_border_style *border_style;
    if (!spvsx_parse_border_style (nctx->up, node, &border_style))
        return false;
    p->border_style = xrealloc (p->border_style, sizeof *p->border_style * (p->n_border_style + 1));
    p->border_style[p->n_border_style++] = border_style;
    return true;
}

static bool
spvsx_parse_border_properties_1 (struct spvxml_node_context *nctx, xmlNode **input, struct spvsx_border_properties *p)
{
    if (!spvsx_parse_border_properties_2 (nctx, input, p))
        return false;
    while (spvsx_try_parse_border_properties (nctx, input, p, spvsx_parse_border_properties_2))
        continue;
    return true;
}

bool
spvsx_parse_border_properties (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvsx_border_properties **p_)
{
    enum {
        ATTR_ID,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_ID] = { "id", false, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvsx_border_properties *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvsx_border_properties_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvsx_free_border_properties (p);
        return false;
    }

    /* Parse content. */
    input = input->children;
    if (!spvsx_parse_border_properties_1 (&nctx, &input, p)
        || !spvxml_content_parse_end (&nctx, input)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvsx_free_border_properties (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvsx_free_border_properties (struct spvsx_border_properties *p)
{
    if (!p)
        return;

    for (size_t i = 0; i < p->n_border_style; i++)
        spvsx_free_border_style (p->border_style[i]);
    free (p->border_style);
    free (p->node_.id);
    free (p);
}

void
spvsx_collect_ids_border_properties (struct spvxml_context *ctx, struct spvsx_border_properties *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

    for (size_t i = 0; i < p->n_border_style; i++)
        spvsx_collect_ids_border_style (ctx, p->border_style[i]);
}

bool
spvsx_is_border_properties (const struct spvxml_node *node)
{
    return node->class_ == &spvsx_border_properties_class;
}

struct spvsx_border_properties *
spvsx_cast_border_properties (const struct spvxml_node *node)
{
    return (node && spvsx_is_border_properties (node)
            ? UP_CAST (node, struct spvsx_border_properties, node_)
            : NULL);
}

void
spvsx_resolve_refs_border_properties (struct spvxml_context *ctx UNUSED, struct spvsx_border_properties *p UNUSED)
{
    if (!p)
        return;

    for (size_t i = 0; i < p->n_border_style; i++)
        spvsx_resolve_refs_border_style (ctx, p->border_style[i]);
}

static void
spvsx_do_free_border_properties (struct spvxml_node *node)
{
    spvsx_free_border_properties (UP_CAST (node, struct spvsx_border_properties, node_));
}

static void
spvsx_do_collect_ids_border_properties (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvsx_collect_ids_border_properties (ctx, UP_CAST (node, struct spvsx_border_properties, node_));
}

static void
spvsx_do_resolve_refs_border_properties (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvsx_resolve_refs_border_properties (ctx, UP_CAST (node, struct spvsx_border_properties, node_));
}

struct spvxml_node_class spvsx_border_properties_class = {
    "borderProperties",
    spvsx_do_free_border_properties,
    spvsx_do_collect_ids_border_properties,
    spvsx_do_resolve_refs_border_properties,
};


static bool UNUSED
spvsx_try_parse_border_style (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvsx_border_style *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvsx_border_style *))
{
    xmlNode *next = *input;
    bool ok = sub (nctx, &next, p);
    if (ok)
        *input = next;
    else if (!nctx->up->hard_error) {
        free (nctx->up->error);
        nctx->up->error = NULL;
    }
    return ok;
}

bool
spvsx_parse_border_style (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvsx_border_style **p_)
{
    enum {
        ATTR_BORDER_STYLE_TYPE,
        ATTR_COLOR,
        ATTR_ID,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_BORDER_STYLE_TYPE] = { "borderStyleType", false, NULL },
        [ATTR_COLOR] = { "color", false, NULL },
        [ATTR_ID] = { "id", false, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvsx_border_style *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvsx_border_style_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->border_style_type = spvxml_attr_parse_enum (
        &nctx, &attrs[ATTR_BORDER_STYLE_TYPE], spvsx_border_style_type_map);
    p->color = spvxml_attr_parse_color (&nctx, &attrs[ATTR_COLOR]);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvsx_free_border_style (p);
        return false;
    }

    /* Parse content. */
    if (!spvxml_content_parse_end (&nctx, input->children)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvsx_free_border_style (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvsx_free_border_style (struct spvsx_border_style *p)
{
    if (!p)
        return;

    free (p->node_.id);
    free (p);
}

void
spvsx_collect_ids_border_style (struct spvxml_context *ctx, struct spvsx_border_style *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

}

bool
spvsx_is_border_style (const struct spvxml_node *node)
{
    return node->class_ == &spvsx_border_style_class;
}

struct spvsx_border_style *
spvsx_cast_border_style (const struct spvxml_node *node)
{
    return (node && spvsx_is_border_style (node)
            ? UP_CAST (node, struct spvsx_border_style, node_)
            : NULL);
}

void
spvsx_resolve_refs_border_style (struct spvxml_context *ctx UNUSED, struct spvsx_border_style *p UNUSED)
{
    if (!p)
        return;

}

static void
spvsx_do_free_border_style (struct spvxml_node *node)
{
    spvsx_free_border_style (UP_CAST (node, struct spvsx_border_style, node_));
}

static void
spvsx_do_collect_ids_border_style (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvsx_collect_ids_border_style (ctx, UP_CAST (node, struct spvsx_border_style, node_));
}

static void
spvsx_do_resolve_refs_border_style (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvsx_resolve_refs_border_style (ctx, UP_CAST (node, struct spvsx_border_style, node_));
}

struct spvxml_node_class spvsx_border_style_class = {
    "border_style (any)",
    spvsx_do_free_border_style,
    spvsx_do_collect_ids_border_style,
    spvsx_do_resolve_refs_border_style,
};


static bool UNUSED
spvsx_try_parse_cell_format_properties (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvsx_cell_format_properties *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvsx_cell_format_properties *))
{
    xmlNode *next = *input;
    bool ok = sub (nctx, &next, p);
    if (ok)
        *input = next;
    else if (!nctx->up->hard_error) {
        free (nctx->up->error);
        nctx->up->error = NULL;
    }
    return ok;
}

static bool
spvsx_parse_cell_format_properties_2 (struct spvxml_node_context *nctx, xmlNode **input, struct spvsx_cell_format_properties *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "any", &node))
        return false;
    struct spvsx_cell_style *cell_style;
    if (!spvsx_parse_cell_style (nctx->up, node, &cell_style))
        return false;
    p->cell_style = xrealloc (p->cell_style, sizeof *p->cell_style * (p->n_cell_style + 1));
    p->cell_style[p->n_cell_style++] = cell_style;
    return true;
}

static bool
spvsx_parse_cell_format_properties_1 (struct spvxml_node_context *nctx, xmlNode **input, struct spvsx_cell_format_properties *p)
{
    if (!spvsx_parse_cell_format_properties_2 (nctx, input, p))
        return false;
    while (spvsx_try_parse_cell_format_properties (nctx, input, p, spvsx_parse_cell_format_properties_2))
        continue;
    return true;
}

bool
spvsx_parse_cell_format_properties (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvsx_cell_format_properties **p_)
{
    enum {
        ATTR_ID,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_ID] = { "id", false, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvsx_cell_format_properties *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvsx_cell_format_properties_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvsx_free_cell_format_properties (p);
        return false;
    }

    /* Parse content. */
    input = input->children;
    if (!spvsx_parse_cell_format_properties_1 (&nctx, &input, p)
        || !spvxml_content_parse_end (&nctx, input)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvsx_free_cell_format_properties (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvsx_free_cell_format_properties (struct spvsx_cell_format_properties *p)
{
    if (!p)
        return;

    for (size_t i = 0; i < p->n_cell_style; i++)
        spvsx_free_cell_style (p->cell_style[i]);
    free (p->cell_style);
    free (p->node_.id);
    free (p);
}

void
spvsx_collect_ids_cell_format_properties (struct spvxml_context *ctx, struct spvsx_cell_format_properties *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

    for (size_t i = 0; i < p->n_cell_style; i++)
        spvsx_collect_ids_cell_style (ctx, p->cell_style[i]);
}

bool
spvsx_is_cell_format_properties (const struct spvxml_node *node)
{
    return node->class_ == &spvsx_cell_format_properties_class;
}

struct spvsx_cell_format_properties *
spvsx_cast_cell_format_properties (const struct spvxml_node *node)
{
    return (node && spvsx_is_cell_format_properties (node)
            ? UP_CAST (node, struct spvsx_cell_format_properties, node_)
            : NULL);
}

void
spvsx_resolve_refs_cell_format_properties (struct spvxml_context *ctx UNUSED, struct spvsx_cell_format_properties *p UNUSED)
{
    if (!p)
        return;

    for (size_t i = 0; i < p->n_cell_style; i++)
        spvsx_resolve_refs_cell_style (ctx, p->cell_style[i]);
}

static void
spvsx_do_free_cell_format_properties (struct spvxml_node *node)
{
    spvsx_free_cell_format_properties (UP_CAST (node, struct spvsx_cell_format_properties, node_));
}

static void
spvsx_do_collect_ids_cell_format_properties (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvsx_collect_ids_cell_format_properties (ctx, UP_CAST (node, struct spvsx_cell_format_properties, node_));
}

static void
spvsx_do_resolve_refs_cell_format_properties (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvsx_resolve_refs_cell_format_properties (ctx, UP_CAST (node, struct spvsx_cell_format_properties, node_));
}

struct spvxml_node_class spvsx_cell_format_properties_class = {
    "cellFormatProperties",
    spvsx_do_free_cell_format_properties,
    spvsx_do_collect_ids_cell_format_properties,
    spvsx_do_resolve_refs_cell_format_properties,
};


static bool UNUSED
spvsx_try_parse_cell_style (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvsx_cell_style *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvsx_cell_style *))
{
    xmlNode *next = *input;
    bool ok = sub (nctx, &next, p);
    if (ok)
        *input = next;
    else if (!nctx->up->hard_error) {
        free (nctx->up->error);
        nctx->up->error = NULL;
    }
    return ok;
}

static bool
spvsx_parse_cell_style_1 (struct spvxml_node_context *nctx, xmlNode **input, struct spvsx_cell_style *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "style", &node))
        return false;
    if (!spvsx_parse_style (nctx->up, node, &p->style))
        return false;
    return true;
}

bool
spvsx_parse_cell_style (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvsx_cell_style **p_)
{
    enum {
        ATTR_ALTERNATING_COLOR,
        ATTR_ALTERNATING_TEXT_COLOR,
        ATTR_ID,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_ALTERNATING_COLOR] = { "alternatingColor", false, NULL },
        [ATTR_ALTERNATING_TEXT_COLOR] = { "alternatingTextColor", false, NULL },
        [ATTR_ID] = { "id", false, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvsx_cell_style *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvsx_cell_style_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->alternating_color = spvxml_attr_parse_color (&nctx, &attrs[ATTR_ALTERNATING_COLOR]);
    p->alternating_text_color = spvxml_attr_parse_color (&nctx, &attrs[ATTR_ALTERNATING_TEXT_COLOR]);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvsx_free_cell_style (p);
        return false;
    }

    /* Parse content. */
    input = input->children;
    if (!spvsx_parse_cell_style_1 (&nctx, &input, p)
        || !spvxml_content_parse_end (&nctx, input)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvsx_free_cell_style (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvsx_free_cell_style (struct spvsx_cell_style *p)
{
    if (!p)
        return;

    spvsx_free_style (p->style);
    free (p->node_.id);
    free (p);
}

void
spvsx_collect_ids_cell_style (struct spvxml_context *ctx, struct spvsx_cell_style *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

    spvsx_collect_ids_style (ctx, p->style);
}

bool
spvsx_is_cell_style (const struct spvxml_node *node)
{
    return node->class_ == &spvsx_cell_style_class;
}

struct spvsx_cell_style *
spvsx_cast_cell_style (const struct spvxml_node *node)
{
    return (node && spvsx_is_cell_style (node)
            ? UP_CAST (node, struct spvsx_cell_style, node_)
            : NULL);
}

void
spvsx_resolve_refs_cell_style (struct spvxml_context *ctx UNUSED, struct spvsx_cell_style *p UNUSED)
{
    if (!p)
        return;

    spvsx_resolve_refs_style (ctx, p->style);
}

static void
spvsx_do_free_cell_style (struct spvxml_node *node)
{
    spvsx_free_cell_style (UP_CAST (node, struct spvsx_cell_style, node_));
}

static void
spvsx_do_collect_ids_cell_style (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvsx_collect_ids_cell_style (ctx, UP_CAST (node, struct spvsx_cell_style, node_));
}

static void
spvsx_do_resolve_refs_cell_style (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvsx_resolve_refs_cell_style (ctx, UP_CAST (node, struct spvsx_cell_style, node_));
}

struct spvxml_node_class spvsx_cell_style_class = {
    "cell_style (any)",
    spvsx_do_free_cell_style,
    spvsx_do_collect_ids_cell_style,
    spvsx_do_resolve_refs_cell_style,
};


static bool UNUSED
spvsx_try_parse_container (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvsx_container *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvsx_container *))
{
    xmlNode *next = *input;
    bool ok = sub (nctx, &next, p);
    if (ok)
        *input = next;
    else if (!nctx->up->hard_error) {
        free (nctx->up->error);
        nctx->up->error = NULL;
    }
    return ok;
}

static bool
spvsx_parse_container_8 (struct spvxml_node_context *nctx, xmlNode **input, struct spvsx_container *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "tree", &node))
        return false;
    struct spvsx_tree *seq;
    if (!spvsx_parse_tree (nctx->up, node, &seq))
        return false;
    p->seq = xrealloc (p->seq, sizeof *p->seq * (p->n_seq + 1));
    p->seq[p->n_seq++] = &seq->node_;
    return true;
}

static bool
spvsx_parse_container_7 (struct spvxml_node_context *nctx, xmlNode **input, struct spvsx_container *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "image", &node))
        return false;
    struct spvsx_image *seq;
    if (!spvsx_parse_image (nctx->up, node, &seq))
        return false;
    p->seq = xrealloc (p->seq, sizeof *p->seq * (p->n_seq + 1));
    p->seq[p->n_seq++] = &seq->node_;
    return true;
}

static bool
spvsx_parse_container_6 (struct spvxml_node_context *nctx, xmlNode **input, struct spvsx_container *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "object", &node))
        return false;
    struct spvsx_object *seq;
    if (!spvsx_parse_object (nctx->up, node, &seq))
        return false;
    p->seq = xrealloc (p->seq, sizeof *p->seq * (p->n_seq + 1));
    p->seq[p->n_seq++] = &seq->node_;
    return true;
}

static bool
spvsx_parse_container_5 (struct spvxml_node_context *nctx, xmlNode **input, struct spvsx_container *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "model", &node))
        return false;
    struct spvsx_model *seq;
    if (!spvsx_parse_model (nctx->up, node, &seq))
        return false;
    p->seq = xrealloc (p->seq, sizeof *p->seq * (p->n_seq + 1));
    p->seq[p->n_seq++] = &seq->node_;
    return true;
}

static bool
spvsx_parse_container_4 (struct spvxml_node_context *nctx, xmlNode **input, struct spvsx_container *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "graph", &node))
        return false;
    struct spvsx_graph *seq;
    if (!spvsx_parse_graph (nctx->up, node, &seq))
        return false;
    p->seq = xrealloc (p->seq, sizeof *p->seq * (p->n_seq + 1));
    p->seq[p->n_seq++] = &seq->node_;
    return true;
}

static bool
spvsx_parse_container_3 (struct spvxml_node_context *nctx, xmlNode **input, struct spvsx_container *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "text", &node))
        return false;
    struct spvsx_container_text *seq;
    if (!spvsx_parse_container_text (nctx->up, node, &seq))
        return false;
    p->seq = xrealloc (p->seq, sizeof *p->seq * (p->n_seq + 1));
    p->seq[p->n_seq++] = &seq->node_;
    return true;
}

static bool
spvsx_parse_container_2 (struct spvxml_node_context *nctx, xmlNode **input, struct spvsx_container *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "table", &node))
        return false;
    struct spvsx_table *seq;
    if (!spvsx_parse_table (nctx->up, node, &seq))
        return false;
    p->seq = xrealloc (p->seq, sizeof *p->seq * (p->n_seq + 1));
    p->seq[p->n_seq++] = &seq->node_;
    return true;
}

static bool
spvsx_parse_container_1 (struct spvxml_node_context *nctx, xmlNode **input, struct spvsx_container *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "label", &node))
        return false;
    if (!spvsx_parse_label (nctx->up, node, &p->label))
        return false;
    if (!spvsx_try_parse_container (nctx, input, p, spvsx_parse_container_2)
        && !spvsx_try_parse_container (nctx, input, p, spvsx_parse_container_3)
        && !spvsx_try_parse_container (nctx, input, p, spvsx_parse_container_4)
        && !spvsx_try_parse_container (nctx, input, p, spvsx_parse_container_5)
        && !spvsx_try_parse_container (nctx, input, p, spvsx_parse_container_6)
        && !spvsx_try_parse_container (nctx, input, p, spvsx_parse_container_7)
        && !spvsx_try_parse_container (nctx, input, p, spvsx_parse_container_8))
      {
        spvxml_content_error (nctx, *input, "Syntax error.");
        return false;
      }
    return true;
}

bool
spvsx_parse_container (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvsx_container **p_)
{
    enum {
        ATTR_ID,
        ATTR_PAGE_BREAK_BEFORE,
        ATTR_TEXT_ALIGN,
        ATTR_VISIBILITY,
        ATTR_WIDTH,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_ID] = { "id", false, NULL },
        [ATTR_PAGE_BREAK_BEFORE] = { "page-break-before", false, NULL },
        [ATTR_TEXT_ALIGN] = { "text-align", false, NULL },
        [ATTR_VISIBILITY] = { "visibility", true, NULL },
        [ATTR_WIDTH] = { "width", true, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvsx_container *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvsx_container_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    p->page_break_before_present = spvxml_attr_parse_fixed (
        &nctx, &attrs[ATTR_PAGE_BREAK_BEFORE], "always");
    p->text_align = spvxml_attr_parse_enum (
        &nctx, &attrs[ATTR_TEXT_ALIGN], spvsx_text_align_map);
    p->visibility = spvxml_attr_parse_enum (
        &nctx, &attrs[ATTR_VISIBILITY], spvsx_visibility_map);
    p->width = spvxml_attr_parse_dimension (&nctx, &attrs[ATTR_WIDTH]);
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvsx_free_container (p);
        return false;
    }

    /* Parse content. */
    input = input->children;
    if (!spvsx_parse_container_1 (&nctx, &input, p)
        || !spvxml_content_parse_end (&nctx, input)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvsx_free_container (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvsx_free_container (struct spvsx_container *p)
{
    if (!p)
        return;

    spvsx_free_label (p->label);
    for (size_t i = 0; i < p->n_seq; i++)
        p->seq[i]->class_->spvxml_node_free (p->seq[i]);
    free (p->seq);
    free (p->node_.id);
    free (p);
}

void
spvsx_collect_ids_container (struct spvxml_context *ctx, struct spvsx_container *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

    spvsx_collect_ids_label (ctx, p->label);
    for (size_t i = 0; i < p->n_seq; i++)
        p->seq[i]->class_->spvxml_node_collect_ids (ctx, p->seq[i]);
}

bool
spvsx_is_container (const struct spvxml_node *node)
{
    return node->class_ == &spvsx_container_class;
}

struct spvsx_container *
spvsx_cast_container (const struct spvxml_node *node)
{
    return (node && spvsx_is_container (node)
            ? UP_CAST (node, struct spvsx_container, node_)
            : NULL);
}

void
spvsx_resolve_refs_container (struct spvxml_context *ctx UNUSED, struct spvsx_container *p UNUSED)
{
    if (!p)
        return;

    spvsx_resolve_refs_label (ctx, p->label);
    for (size_t i = 0; i < p->n_seq; i++)
        p->seq[i]->class_->spvxml_node_resolve_refs (ctx, p->seq[i]);
}

static void
spvsx_do_free_container (struct spvxml_node *node)
{
    spvsx_free_container (UP_CAST (node, struct spvsx_container, node_));
}

static void
spvsx_do_collect_ids_container (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvsx_collect_ids_container (ctx, UP_CAST (node, struct spvsx_container, node_));
}

static void
spvsx_do_resolve_refs_container (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvsx_resolve_refs_container (ctx, UP_CAST (node, struct spvsx_container, node_));
}

struct spvxml_node_class spvsx_container_class = {
    "container",
    spvsx_do_free_container,
    spvsx_do_collect_ids_container,
    spvsx_do_resolve_refs_container,
};


static bool UNUSED
spvsx_try_parse_container_text (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvsx_container_text *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvsx_container_text *))
{
    xmlNode *next = *input;
    bool ok = sub (nctx, &next, p);
    if (ok)
        *input = next;
    else if (!nctx->up->hard_error) {
        free (nctx->up->error);
        nctx->up->error = NULL;
    }
    return ok;
}

static bool
spvsx_parse_container_text_1 (struct spvxml_node_context *nctx, xmlNode **input, struct spvsx_container_text *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "html", &node))
        return false;
    if (!spvsx_parse_html (nctx->up, node, &p->html))
        return false;
    return true;
}

bool
spvsx_parse_container_text (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvsx_container_text **p_)
{
    enum {
        ATTR_COMMAND_NAME,
        ATTR_CREATOR_VERSION,
        ATTR_ID,
        ATTR_TEXT_TYPE,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_COMMAND_NAME] = { "commandName", false, NULL },
        [ATTR_CREATOR_VERSION] = { "creator-version", false, NULL },
        [ATTR_ID] = { "id", false, NULL },
        [ATTR_TEXT_TYPE] = { "type", true, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvsx_container_text *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvsx_container_text_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->command_name = attrs[ATTR_COMMAND_NAME].value;
    attrs[ATTR_COMMAND_NAME].value = NULL;
    p->creator_version = attrs[ATTR_CREATOR_VERSION].value;
    attrs[ATTR_CREATOR_VERSION].value = NULL;
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    p->text_type = spvxml_attr_parse_enum (
        &nctx, &attrs[ATTR_TEXT_TYPE], spvsx_text_type_map);
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvsx_free_container_text (p);
        return false;
    }

    /* Parse content. */
    input = input->children;
    if (!spvsx_parse_container_text_1 (&nctx, &input, p)
        || !spvxml_content_parse_end (&nctx, input)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvsx_free_container_text (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvsx_free_container_text (struct spvsx_container_text *p)
{
    if (!p)
        return;

    free (p->command_name);
    free (p->creator_version);
    spvsx_free_html (p->html);
    free (p->node_.id);
    free (p);
}

void
spvsx_collect_ids_container_text (struct spvxml_context *ctx, struct spvsx_container_text *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

    spvsx_collect_ids_html (ctx, p->html);
}

bool
spvsx_is_container_text (const struct spvxml_node *node)
{
    return node->class_ == &spvsx_container_text_class;
}

struct spvsx_container_text *
spvsx_cast_container_text (const struct spvxml_node *node)
{
    return (node && spvsx_is_container_text (node)
            ? UP_CAST (node, struct spvsx_container_text, node_)
            : NULL);
}

void
spvsx_resolve_refs_container_text (struct spvxml_context *ctx UNUSED, struct spvsx_container_text *p UNUSED)
{
    if (!p)
        return;

    spvsx_resolve_refs_html (ctx, p->html);
}

static void
spvsx_do_free_container_text (struct spvxml_node *node)
{
    spvsx_free_container_text (UP_CAST (node, struct spvsx_container_text, node_));
}

static void
spvsx_do_collect_ids_container_text (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvsx_collect_ids_container_text (ctx, UP_CAST (node, struct spvsx_container_text, node_));
}

static void
spvsx_do_resolve_refs_container_text (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvsx_resolve_refs_container_text (ctx, UP_CAST (node, struct spvsx_container_text, node_));
}

struct spvxml_node_class spvsx_container_text_class = {
    "container_text (text)",
    spvsx_do_free_container_text,
    spvsx_do_collect_ids_container_text,
    spvsx_do_resolve_refs_container_text,
};


static bool UNUSED
spvsx_try_parse_csv_path (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvsx_csv_path *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvsx_csv_path *))
{
    xmlNode *next = *input;
    bool ok = sub (nctx, &next, p);
    if (ok)
        *input = next;
    else if (!nctx->up->hard_error) {
        free (nctx->up->error);
        nctx->up->error = NULL;
    }
    return ok;
}

static bool
spvsx_parse_csv_path_1 (struct spvxml_node_context *nctx, xmlNode **input, struct spvsx_csv_path *p)
{
    if (!spvxml_content_parse_text (nctx, input, &p->text))
        return false;
    return true;
}

bool
spvsx_parse_csv_path (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvsx_csv_path **p_)
{
    enum {
        ATTR_ID,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_ID] = { "id", false, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvsx_csv_path *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvsx_csv_path_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvsx_free_csv_path (p);
        return false;
    }

    /* Parse content. */
    input = input->children;
    if (!spvsx_parse_csv_path_1 (&nctx, &input, p)
        || !spvxml_content_parse_end (&nctx, input)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvsx_free_csv_path (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvsx_free_csv_path (struct spvsx_csv_path *p)
{
    if (!p)
        return;

    free (p->text);
    free (p->node_.id);
    free (p);
}

void
spvsx_collect_ids_csv_path (struct spvxml_context *ctx, struct spvsx_csv_path *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

}

bool
spvsx_is_csv_path (const struct spvxml_node *node)
{
    return node->class_ == &spvsx_csv_path_class;
}

struct spvsx_csv_path *
spvsx_cast_csv_path (const struct spvxml_node *node)
{
    return (node && spvsx_is_csv_path (node)
            ? UP_CAST (node, struct spvsx_csv_path, node_)
            : NULL);
}

void
spvsx_resolve_refs_csv_path (struct spvxml_context *ctx UNUSED, struct spvsx_csv_path *p UNUSED)
{
    if (!p)
        return;

}

static void
spvsx_do_free_csv_path (struct spvxml_node *node)
{
    spvsx_free_csv_path (UP_CAST (node, struct spvsx_csv_path, node_));
}

static void
spvsx_do_collect_ids_csv_path (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvsx_collect_ids_csv_path (ctx, UP_CAST (node, struct spvsx_csv_path, node_));
}

static void
spvsx_do_resolve_refs_csv_path (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvsx_resolve_refs_csv_path (ctx, UP_CAST (node, struct spvsx_csv_path, node_));
}

struct spvxml_node_class spvsx_csv_path_class = {
    "csvPath",
    spvsx_do_free_csv_path,
    spvsx_do_collect_ids_csv_path,
    spvsx_do_resolve_refs_csv_path,
};


static bool UNUSED
spvsx_try_parse_data_path (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvsx_data_path *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvsx_data_path *))
{
    xmlNode *next = *input;
    bool ok = sub (nctx, &next, p);
    if (ok)
        *input = next;
    else if (!nctx->up->hard_error) {
        free (nctx->up->error);
        nctx->up->error = NULL;
    }
    return ok;
}

static bool
spvsx_parse_data_path_1 (struct spvxml_node_context *nctx, xmlNode **input, struct spvsx_data_path *p)
{
    if (!spvxml_content_parse_text (nctx, input, &p->text))
        return false;
    return true;
}

bool
spvsx_parse_data_path (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvsx_data_path **p_)
{
    enum {
        ATTR_ID,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_ID] = { "id", false, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvsx_data_path *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvsx_data_path_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvsx_free_data_path (p);
        return false;
    }

    /* Parse content. */
    input = input->children;
    if (!spvsx_parse_data_path_1 (&nctx, &input, p)
        || !spvxml_content_parse_end (&nctx, input)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvsx_free_data_path (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvsx_free_data_path (struct spvsx_data_path *p)
{
    if (!p)
        return;

    free (p->text);
    free (p->node_.id);
    free (p);
}

void
spvsx_collect_ids_data_path (struct spvxml_context *ctx, struct spvsx_data_path *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

}

bool
spvsx_is_data_path (const struct spvxml_node *node)
{
    return node->class_ == &spvsx_data_path_class;
}

struct spvsx_data_path *
spvsx_cast_data_path (const struct spvxml_node *node)
{
    return (node && spvsx_is_data_path (node)
            ? UP_CAST (node, struct spvsx_data_path, node_)
            : NULL);
}

void
spvsx_resolve_refs_data_path (struct spvxml_context *ctx UNUSED, struct spvsx_data_path *p UNUSED)
{
    if (!p)
        return;

}

static void
spvsx_do_free_data_path (struct spvxml_node *node)
{
    spvsx_free_data_path (UP_CAST (node, struct spvsx_data_path, node_));
}

static void
spvsx_do_collect_ids_data_path (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvsx_collect_ids_data_path (ctx, UP_CAST (node, struct spvsx_data_path, node_));
}

static void
spvsx_do_resolve_refs_data_path (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvsx_resolve_refs_data_path (ctx, UP_CAST (node, struct spvsx_data_path, node_));
}

struct spvxml_node_class spvsx_data_path_class = {
    "dataPath",
    spvsx_do_free_data_path,
    spvsx_do_collect_ids_data_path,
    spvsx_do_resolve_refs_data_path,
};


static bool UNUSED
spvsx_try_parse_footnote_properties (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvsx_footnote_properties *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvsx_footnote_properties *))
{
    xmlNode *next = *input;
    bool ok = sub (nctx, &next, p);
    if (ok)
        *input = next;
    else if (!nctx->up->hard_error) {
        free (nctx->up->error);
        nctx->up->error = NULL;
    }
    return ok;
}

bool
spvsx_parse_footnote_properties (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvsx_footnote_properties **p_)
{
    enum {
        ATTR_ID,
        ATTR_MARKER_POSITION,
        ATTR_NUMBER_FORMAT,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_ID] = { "id", false, NULL },
        [ATTR_MARKER_POSITION] = { "markerPosition", false, NULL },
        [ATTR_NUMBER_FORMAT] = { "numberFormat", false, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvsx_footnote_properties *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvsx_footnote_properties_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    p->marker_position = spvxml_attr_parse_enum (
        &nctx, &attrs[ATTR_MARKER_POSITION], spvsx_marker_position_map);
    p->number_format = spvxml_attr_parse_enum (
        &nctx, &attrs[ATTR_NUMBER_FORMAT], spvsx_number_format_map);
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvsx_free_footnote_properties (p);
        return false;
    }

    /* Parse content. */
    if (!spvxml_content_parse_end (&nctx, input->children)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvsx_free_footnote_properties (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvsx_free_footnote_properties (struct spvsx_footnote_properties *p)
{
    if (!p)
        return;

    free (p->node_.id);
    free (p);
}

void
spvsx_collect_ids_footnote_properties (struct spvxml_context *ctx, struct spvsx_footnote_properties *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

}

bool
spvsx_is_footnote_properties (const struct spvxml_node *node)
{
    return node->class_ == &spvsx_footnote_properties_class;
}

struct spvsx_footnote_properties *
spvsx_cast_footnote_properties (const struct spvxml_node *node)
{
    return (node && spvsx_is_footnote_properties (node)
            ? UP_CAST (node, struct spvsx_footnote_properties, node_)
            : NULL);
}

void
spvsx_resolve_refs_footnote_properties (struct spvxml_context *ctx UNUSED, struct spvsx_footnote_properties *p UNUSED)
{
    if (!p)
        return;

}

static void
spvsx_do_free_footnote_properties (struct spvxml_node *node)
{
    spvsx_free_footnote_properties (UP_CAST (node, struct spvsx_footnote_properties, node_));
}

static void
spvsx_do_collect_ids_footnote_properties (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvsx_collect_ids_footnote_properties (ctx, UP_CAST (node, struct spvsx_footnote_properties, node_));
}

static void
spvsx_do_resolve_refs_footnote_properties (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvsx_resolve_refs_footnote_properties (ctx, UP_CAST (node, struct spvsx_footnote_properties, node_));
}

struct spvxml_node_class spvsx_footnote_properties_class = {
    "footnoteProperties",
    spvsx_do_free_footnote_properties,
    spvsx_do_collect_ids_footnote_properties,
    spvsx_do_resolve_refs_footnote_properties,
};


static bool UNUSED
spvsx_try_parse_general_properties (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvsx_general_properties *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvsx_general_properties *))
{
    xmlNode *next = *input;
    bool ok = sub (nctx, &next, p);
    if (ok)
        *input = next;
    else if (!nctx->up->hard_error) {
        free (nctx->up->error);
        nctx->up->error = NULL;
    }
    return ok;
}

bool
spvsx_parse_general_properties (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvsx_general_properties **p_)
{
    enum {
        ATTR_HIDE_EMPTY_ROWS,
        ATTR_ID,
        ATTR_MAXIMUM_COLUMN_WIDTH,
        ATTR_MAXIMUM_ROW_WIDTH,
        ATTR_MINIMUM_COLUMN_WIDTH,
        ATTR_MINIMUM_ROW_WIDTH,
        ATTR_ROW_DIMENSION_LABELS,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_HIDE_EMPTY_ROWS] = { "hideEmptyRows", false, NULL },
        [ATTR_ID] = { "id", false, NULL },
        [ATTR_MAXIMUM_COLUMN_WIDTH] = { "maximumColumnWidth", false, NULL },
        [ATTR_MAXIMUM_ROW_WIDTH] = { "maximumRowWidth", false, NULL },
        [ATTR_MINIMUM_COLUMN_WIDTH] = { "minimumColumnWidth", false, NULL },
        [ATTR_MINIMUM_ROW_WIDTH] = { "minimumRowWidth", false, NULL },
        [ATTR_ROW_DIMENSION_LABELS] = { "rowDimensionLabels", false, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvsx_general_properties *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvsx_general_properties_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->hide_empty_rows = spvxml_attr_parse_bool (&nctx, &attrs[ATTR_HIDE_EMPTY_ROWS]);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    p->maximum_column_width = spvxml_attr_parse_dimension (&nctx, &attrs[ATTR_MAXIMUM_COLUMN_WIDTH]);
    p->maximum_row_width = spvxml_attr_parse_dimension (&nctx, &attrs[ATTR_MAXIMUM_ROW_WIDTH]);
    p->minimum_column_width = spvxml_attr_parse_dimension (&nctx, &attrs[ATTR_MINIMUM_COLUMN_WIDTH]);
    p->minimum_row_width = spvxml_attr_parse_dimension (&nctx, &attrs[ATTR_MINIMUM_ROW_WIDTH]);
    p->row_dimension_labels = spvxml_attr_parse_enum (
        &nctx, &attrs[ATTR_ROW_DIMENSION_LABELS], spvsx_row_dimension_labels_map);
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvsx_free_general_properties (p);
        return false;
    }

    /* Parse content. */
    if (!spvxml_content_parse_end (&nctx, input->children)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvsx_free_general_properties (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvsx_free_general_properties (struct spvsx_general_properties *p)
{
    if (!p)
        return;

    free (p->node_.id);
    free (p);
}

void
spvsx_collect_ids_general_properties (struct spvxml_context *ctx, struct spvsx_general_properties *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

}

bool
spvsx_is_general_properties (const struct spvxml_node *node)
{
    return node->class_ == &spvsx_general_properties_class;
}

struct spvsx_general_properties *
spvsx_cast_general_properties (const struct spvxml_node *node)
{
    return (node && spvsx_is_general_properties (node)
            ? UP_CAST (node, struct spvsx_general_properties, node_)
            : NULL);
}

void
spvsx_resolve_refs_general_properties (struct spvxml_context *ctx UNUSED, struct spvsx_general_properties *p UNUSED)
{
    if (!p)
        return;

}

static void
spvsx_do_free_general_properties (struct spvxml_node *node)
{
    spvsx_free_general_properties (UP_CAST (node, struct spvsx_general_properties, node_));
}

static void
spvsx_do_collect_ids_general_properties (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvsx_collect_ids_general_properties (ctx, UP_CAST (node, struct spvsx_general_properties, node_));
}

static void
spvsx_do_resolve_refs_general_properties (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvsx_resolve_refs_general_properties (ctx, UP_CAST (node, struct spvsx_general_properties, node_));
}

struct spvxml_node_class spvsx_general_properties_class = {
    "generalProperties",
    spvsx_do_free_general_properties,
    spvsx_do_collect_ids_general_properties,
    spvsx_do_resolve_refs_general_properties,
};


static bool UNUSED
spvsx_try_parse_graph (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvsx_graph *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvsx_graph *))
{
    xmlNode *next = *input;
    bool ok = sub (nctx, &next, p);
    if (ok)
        *input = next;
    else if (!nctx->up->hard_error) {
        free (nctx->up->error);
        nctx->up->error = NULL;
    }
    return ok;
}

static bool
spvsx_parse_graph_3 (struct spvxml_node_context *nctx, xmlNode **input, struct spvsx_graph *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "csvPath", &node))
        return false;
    if (!spvsx_parse_csv_path (nctx->up, node, &p->csv_path))
        return false;
    return true;
}

static bool
spvsx_parse_graph_2 (struct spvxml_node_context *nctx, xmlNode **input, struct spvsx_graph *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "dataPath", &node))
        return false;
    if (!spvsx_parse_data_path (nctx->up, node, &p->data_path))
        return false;
    return true;
}

static bool
spvsx_parse_graph_1 (struct spvxml_node_context *nctx, xmlNode **input, struct spvsx_graph *p)
{
    spvsx_try_parse_graph (nctx, input, p, spvsx_parse_graph_2);

    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "path", &node))
        return false;
    if (!spvsx_parse_path (nctx->up, node, &p->path))
        return false;
    spvsx_try_parse_graph (nctx, input, p, spvsx_parse_graph_3);
    return true;
}

bool
spvsx_parse_graph (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvsx_graph **p_)
{
    enum {
        ATTR_V_D_P_ID,
        ATTR_VI_ZML_SOURCE,
        ATTR_COMMAND_NAME,
        ATTR_CREATOR_VERSION,
        ATTR_CSV_FILE_IDS,
        ATTR_CSV_FILE_NAMES,
        ATTR_DATA_MAP_ID,
        ATTR_DATA_MAP_U_R_I,
        ATTR_EDITOR,
        ATTR_ID,
        ATTR_REF_MAP_ID,
        ATTR_REF_MAP_U_R_I,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_V_D_P_ID] = { "VDPId", false, NULL },
        [ATTR_VI_ZML_SOURCE] = { "ViZmlSource", false, NULL },
        [ATTR_COMMAND_NAME] = { "commandName", false, NULL },
        [ATTR_CREATOR_VERSION] = { "creator-version", false, NULL },
        [ATTR_CSV_FILE_IDS] = { "csvFileIds", false, NULL },
        [ATTR_CSV_FILE_NAMES] = { "csvFileNames", false, NULL },
        [ATTR_DATA_MAP_ID] = { "dataMapId", false, NULL },
        [ATTR_DATA_MAP_U_R_I] = { "dataMapURI", false, NULL },
        [ATTR_EDITOR] = { "editor", false, NULL },
        [ATTR_ID] = { "id", false, NULL },
        [ATTR_REF_MAP_ID] = { "refMapId", false, NULL },
        [ATTR_REF_MAP_U_R_I] = { "refMapURI", false, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvsx_graph *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvsx_graph_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->v_d_p_id = attrs[ATTR_V_D_P_ID].value;
    attrs[ATTR_V_D_P_ID].value = NULL;
    p->vi_zml_source = attrs[ATTR_VI_ZML_SOURCE].value;
    attrs[ATTR_VI_ZML_SOURCE].value = NULL;
    p->command_name = attrs[ATTR_COMMAND_NAME].value;
    attrs[ATTR_COMMAND_NAME].value = NULL;
    p->creator_version = attrs[ATTR_CREATOR_VERSION].value;
    attrs[ATTR_CREATOR_VERSION].value = NULL;
    p->csv_file_ids = attrs[ATTR_CSV_FILE_IDS].value;
    attrs[ATTR_CSV_FILE_IDS].value = NULL;
    p->csv_file_names = attrs[ATTR_CSV_FILE_NAMES].value;
    attrs[ATTR_CSV_FILE_NAMES].value = NULL;
    p->data_map_id = attrs[ATTR_DATA_MAP_ID].value;
    attrs[ATTR_DATA_MAP_ID].value = NULL;
    p->data_map_u_r_i = attrs[ATTR_DATA_MAP_U_R_I].value;
    attrs[ATTR_DATA_MAP_U_R_I].value = NULL;
    p->editor = attrs[ATTR_EDITOR].value;
    attrs[ATTR_EDITOR].value = NULL;
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    p->ref_map_id = attrs[ATTR_REF_MAP_ID].value;
    attrs[ATTR_REF_MAP_ID].value = NULL;
    p->ref_map_u_r_i = attrs[ATTR_REF_MAP_U_R_I].value;
    attrs[ATTR_REF_MAP_U_R_I].value = NULL;
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvsx_free_graph (p);
        return false;
    }

    /* Parse content. */
    input = input->children;
    if (!spvsx_parse_graph_1 (&nctx, &input, p)
        || !spvxml_content_parse_end (&nctx, input)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvsx_free_graph (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvsx_free_graph (struct spvsx_graph *p)
{
    if (!p)
        return;

    free (p->v_d_p_id);
    free (p->vi_zml_source);
    free (p->command_name);
    free (p->creator_version);
    free (p->data_map_id);
    free (p->data_map_u_r_i);
    free (p->editor);
    free (p->ref_map_id);
    free (p->ref_map_u_r_i);
    free (p->csv_file_ids);
    free (p->csv_file_names);
    spvsx_free_data_path (p->data_path);
    spvsx_free_path (p->path);
    spvsx_free_csv_path (p->csv_path);
    free (p->node_.id);
    free (p);
}

void
spvsx_collect_ids_graph (struct spvxml_context *ctx, struct spvsx_graph *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

    spvsx_collect_ids_data_path (ctx, p->data_path);
    spvsx_collect_ids_path (ctx, p->path);
    spvsx_collect_ids_csv_path (ctx, p->csv_path);
}

bool
spvsx_is_graph (const struct spvxml_node *node)
{
    return node->class_ == &spvsx_graph_class;
}

struct spvsx_graph *
spvsx_cast_graph (const struct spvxml_node *node)
{
    return (node && spvsx_is_graph (node)
            ? UP_CAST (node, struct spvsx_graph, node_)
            : NULL);
}

void
spvsx_resolve_refs_graph (struct spvxml_context *ctx UNUSED, struct spvsx_graph *p UNUSED)
{
    if (!p)
        return;

    spvsx_resolve_refs_data_path (ctx, p->data_path);
    spvsx_resolve_refs_path (ctx, p->path);
    spvsx_resolve_refs_csv_path (ctx, p->csv_path);
}

static void
spvsx_do_free_graph (struct spvxml_node *node)
{
    spvsx_free_graph (UP_CAST (node, struct spvsx_graph, node_));
}

static void
spvsx_do_collect_ids_graph (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvsx_collect_ids_graph (ctx, UP_CAST (node, struct spvsx_graph, node_));
}

static void
spvsx_do_resolve_refs_graph (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvsx_resolve_refs_graph (ctx, UP_CAST (node, struct spvsx_graph, node_));
}

struct spvxml_node_class spvsx_graph_class = {
    "graph",
    spvsx_do_free_graph,
    spvsx_do_collect_ids_graph,
    spvsx_do_resolve_refs_graph,
};


static bool UNUSED
spvsx_try_parse_heading (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvsx_heading *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvsx_heading *))
{
    xmlNode *next = *input;
    bool ok = sub (nctx, &next, p);
    if (ok)
        *input = next;
    else if (!nctx->up->hard_error) {
        free (nctx->up->error);
        nctx->up->error = NULL;
    }
    return ok;
}

static bool
spvsx_parse_heading_4 (struct spvxml_node_context *nctx, xmlNode **input, struct spvsx_heading *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "heading", &node))
        return false;
    struct spvsx_heading *seq;
    if (!spvsx_parse_heading (nctx->up, node, &seq))
        return false;
    p->seq = xrealloc (p->seq, sizeof *p->seq * (p->n_seq + 1));
    p->seq[p->n_seq++] = &seq->node_;
    return true;
}

static bool
spvsx_parse_heading_3 (struct spvxml_node_context *nctx, xmlNode **input, struct spvsx_heading *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "container", &node))
        return false;
    struct spvsx_container *seq;
    if (!spvsx_parse_container (nctx->up, node, &seq))
        return false;
    p->seq = xrealloc (p->seq, sizeof *p->seq * (p->n_seq + 1));
    p->seq[p->n_seq++] = &seq->node_;
    return true;
}

static bool
spvsx_parse_heading_2 (struct spvxml_node_context *nctx, xmlNode **input, struct spvsx_heading *p)
{
    if (!spvsx_try_parse_heading (nctx, input, p, spvsx_parse_heading_3)
        && !spvsx_try_parse_heading (nctx, input, p, spvsx_parse_heading_4))
      {
        spvxml_content_error (nctx, *input, "Syntax error.");
        return false;
      }
    return true;
}

static bool
spvsx_parse_heading_1 (struct spvxml_node_context *nctx, xmlNode **input, struct spvsx_heading *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "label", &node))
        return false;
    if (!spvsx_parse_label (nctx->up, node, &p->label))
        return false;
    while (spvsx_try_parse_heading (nctx, input, p, spvsx_parse_heading_2))
        continue;
    return true;
}

bool
spvsx_parse_heading (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvsx_heading **p_)
{
    enum {
        ATTR_COMMAND_NAME,
        ATTR_CREATOR_VERSION,
        ATTR_HEADING_VISIBILITY,
        ATTR_ID,
        ATTR_LOCALE,
        ATTR_OLANG,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_COMMAND_NAME] = { "commandName", false, NULL },
        [ATTR_CREATOR_VERSION] = { "creator-version", false, NULL },
        [ATTR_HEADING_VISIBILITY] = { "visibility", false, NULL },
        [ATTR_ID] = { "id", false, NULL },
        [ATTR_LOCALE] = { "locale", false, NULL },
        [ATTR_OLANG] = { "olang", false, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvsx_heading *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvsx_heading_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->command_name = attrs[ATTR_COMMAND_NAME].value;
    attrs[ATTR_COMMAND_NAME].value = NULL;
    p->creator_version = attrs[ATTR_CREATOR_VERSION].value;
    attrs[ATTR_CREATOR_VERSION].value = NULL;
    p->heading_visibility_present = spvxml_attr_parse_fixed (
        &nctx, &attrs[ATTR_HEADING_VISIBILITY], "collapsed");
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    p->locale = attrs[ATTR_LOCALE].value;
    attrs[ATTR_LOCALE].value = NULL;
    p->olang = attrs[ATTR_OLANG].value;
    attrs[ATTR_OLANG].value = NULL;
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvsx_free_heading (p);
        return false;
    }

    /* Parse content. */
    input = input->children;
    if (!spvsx_parse_heading_1 (&nctx, &input, p)
        || !spvxml_content_parse_end (&nctx, input)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvsx_free_heading (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvsx_free_heading (struct spvsx_heading *p)
{
    if (!p)
        return;

    free (p->creator_version);
    free (p->command_name);
    free (p->locale);
    free (p->olang);
    spvsx_free_label (p->label);
    for (size_t i = 0; i < p->n_seq; i++)
        p->seq[i]->class_->spvxml_node_free (p->seq[i]);
    free (p->seq);
    free (p->node_.id);
    free (p);
}

void
spvsx_collect_ids_heading (struct spvxml_context *ctx, struct spvsx_heading *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

    spvsx_collect_ids_label (ctx, p->label);
    for (size_t i = 0; i < p->n_seq; i++)
        p->seq[i]->class_->spvxml_node_collect_ids (ctx, p->seq[i]);
}

bool
spvsx_is_heading (const struct spvxml_node *node)
{
    return node->class_ == &spvsx_heading_class;
}

struct spvsx_heading *
spvsx_cast_heading (const struct spvxml_node *node)
{
    return (node && spvsx_is_heading (node)
            ? UP_CAST (node, struct spvsx_heading, node_)
            : NULL);
}

void
spvsx_resolve_refs_heading (struct spvxml_context *ctx UNUSED, struct spvsx_heading *p UNUSED)
{
    if (!p)
        return;

    spvsx_resolve_refs_label (ctx, p->label);
    for (size_t i = 0; i < p->n_seq; i++)
        p->seq[i]->class_->spvxml_node_resolve_refs (ctx, p->seq[i]);
}

static void
spvsx_do_free_heading (struct spvxml_node *node)
{
    spvsx_free_heading (UP_CAST (node, struct spvsx_heading, node_));
}

static void
spvsx_do_collect_ids_heading (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvsx_collect_ids_heading (ctx, UP_CAST (node, struct spvsx_heading, node_));
}

static void
spvsx_do_resolve_refs_heading (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvsx_resolve_refs_heading (ctx, UP_CAST (node, struct spvsx_heading, node_));
}

struct spvxml_node_class spvsx_heading_class = {
    "heading",
    spvsx_do_free_heading,
    spvsx_do_collect_ids_heading,
    spvsx_do_resolve_refs_heading,
};


static bool UNUSED
spvsx_try_parse_html (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvsx_html *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvsx_html *))
{
    xmlNode *next = *input;
    bool ok = sub (nctx, &next, p);
    if (ok)
        *input = next;
    else if (!nctx->up->hard_error) {
        free (nctx->up->error);
        nctx->up->error = NULL;
    }
    return ok;
}

static bool
spvsx_parse_html_1 (struct spvxml_node_context *nctx, xmlNode **input, struct spvsx_html *p)
{
    if (!spvxml_content_parse_text (nctx, input, &p->text))
        return false;
    return true;
}

bool
spvsx_parse_html (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvsx_html **p_)
{
    enum {
        ATTR_ID,
        ATTR_LANG,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_ID] = { "id", false, NULL },
        [ATTR_LANG] = { "lang", true, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvsx_html *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvsx_html_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    spvxml_attr_parse_fixed (&nctx, &attrs[ATTR_LANG], "en");
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvsx_free_html (p);
        return false;
    }

    /* Parse content. */
    input = input->children;
    if (!spvsx_parse_html_1 (&nctx, &input, p)
        || !spvxml_content_parse_end (&nctx, input)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvsx_free_html (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvsx_free_html (struct spvsx_html *p)
{
    if (!p)
        return;

    free (p->text);
    free (p->node_.id);
    free (p);
}

void
spvsx_collect_ids_html (struct spvxml_context *ctx, struct spvsx_html *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

}

bool
spvsx_is_html (const struct spvxml_node *node)
{
    return node->class_ == &spvsx_html_class;
}

struct spvsx_html *
spvsx_cast_html (const struct spvxml_node *node)
{
    return (node && spvsx_is_html (node)
            ? UP_CAST (node, struct spvsx_html, node_)
            : NULL);
}

void
spvsx_resolve_refs_html (struct spvxml_context *ctx UNUSED, struct spvsx_html *p UNUSED)
{
    if (!p)
        return;

}

static void
spvsx_do_free_html (struct spvxml_node *node)
{
    spvsx_free_html (UP_CAST (node, struct spvsx_html, node_));
}

static void
spvsx_do_collect_ids_html (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvsx_collect_ids_html (ctx, UP_CAST (node, struct spvsx_html, node_));
}

static void
spvsx_do_resolve_refs_html (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvsx_resolve_refs_html (ctx, UP_CAST (node, struct spvsx_html, node_));
}

struct spvxml_node_class spvsx_html_class = {
    "html",
    spvsx_do_free_html,
    spvsx_do_collect_ids_html,
    spvsx_do_resolve_refs_html,
};


static bool UNUSED
spvsx_try_parse_image (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvsx_image *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvsx_image *))
{
    xmlNode *next = *input;
    bool ok = sub (nctx, &next, p);
    if (ok)
        *input = next;
    else if (!nctx->up->hard_error) {
        free (nctx->up->error);
        nctx->up->error = NULL;
    }
    return ok;
}

static bool
spvsx_parse_image_1 (struct spvxml_node_context *nctx, xmlNode **input, struct spvsx_image *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "dataPath", &node))
        return false;
    if (!spvsx_parse_data_path (nctx->up, node, &p->data_path))
        return false;
    return true;
}

bool
spvsx_parse_image (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvsx_image **p_)
{
    enum {
        ATTR_V_D_P_ID,
        ATTR_COMMAND_NAME,
        ATTR_ID,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_V_D_P_ID] = { "VDPId", true, NULL },
        [ATTR_COMMAND_NAME] = { "commandName", true, NULL },
        [ATTR_ID] = { "id", false, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvsx_image *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvsx_image_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->v_d_p_id = attrs[ATTR_V_D_P_ID].value;
    attrs[ATTR_V_D_P_ID].value = NULL;
    p->command_name = attrs[ATTR_COMMAND_NAME].value;
    attrs[ATTR_COMMAND_NAME].value = NULL;
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvsx_free_image (p);
        return false;
    }

    /* Parse content. */
    input = input->children;
    if (!spvsx_parse_image_1 (&nctx, &input, p)
        || !spvxml_content_parse_end (&nctx, input)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvsx_free_image (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvsx_free_image (struct spvsx_image *p)
{
    if (!p)
        return;

    free (p->v_d_p_id);
    free (p->command_name);
    spvsx_free_data_path (p->data_path);
    free (p->node_.id);
    free (p);
}

void
spvsx_collect_ids_image (struct spvxml_context *ctx, struct spvsx_image *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

    spvsx_collect_ids_data_path (ctx, p->data_path);
}

bool
spvsx_is_image (const struct spvxml_node *node)
{
    return node->class_ == &spvsx_image_class;
}

struct spvsx_image *
spvsx_cast_image (const struct spvxml_node *node)
{
    return (node && spvsx_is_image (node)
            ? UP_CAST (node, struct spvsx_image, node_)
            : NULL);
}

void
spvsx_resolve_refs_image (struct spvxml_context *ctx UNUSED, struct spvsx_image *p UNUSED)
{
    if (!p)
        return;

    spvsx_resolve_refs_data_path (ctx, p->data_path);
}

static void
spvsx_do_free_image (struct spvxml_node *node)
{
    spvsx_free_image (UP_CAST (node, struct spvsx_image, node_));
}

static void
spvsx_do_collect_ids_image (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvsx_collect_ids_image (ctx, UP_CAST (node, struct spvsx_image, node_));
}

static void
spvsx_do_resolve_refs_image (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvsx_resolve_refs_image (ctx, UP_CAST (node, struct spvsx_image, node_));
}

struct spvxml_node_class spvsx_image_class = {
    "image",
    spvsx_do_free_image,
    spvsx_do_collect_ids_image,
    spvsx_do_resolve_refs_image,
};


static bool UNUSED
spvsx_try_parse_label (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvsx_label *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvsx_label *))
{
    xmlNode *next = *input;
    bool ok = sub (nctx, &next, p);
    if (ok)
        *input = next;
    else if (!nctx->up->hard_error) {
        free (nctx->up->error);
        nctx->up->error = NULL;
    }
    return ok;
}

static bool
spvsx_parse_label_1 (struct spvxml_node_context *nctx, xmlNode **input, struct spvsx_label *p)
{
    if (!spvxml_content_parse_text (nctx, input, &p->text))
        return false;
    return true;
}

bool
spvsx_parse_label (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvsx_label **p_)
{
    enum {
        ATTR_ID,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_ID] = { "id", false, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvsx_label *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvsx_label_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvsx_free_label (p);
        return false;
    }

    /* Parse content. */
    input = input->children;
    if (!spvsx_parse_label_1 (&nctx, &input, p)
        || !spvxml_content_parse_end (&nctx, input)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvsx_free_label (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvsx_free_label (struct spvsx_label *p)
{
    if (!p)
        return;

    free (p->text);
    free (p->node_.id);
    free (p);
}

void
spvsx_collect_ids_label (struct spvxml_context *ctx, struct spvsx_label *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

}

bool
spvsx_is_label (const struct spvxml_node *node)
{
    return node->class_ == &spvsx_label_class;
}

struct spvsx_label *
spvsx_cast_label (const struct spvxml_node *node)
{
    return (node && spvsx_is_label (node)
            ? UP_CAST (node, struct spvsx_label, node_)
            : NULL);
}

void
spvsx_resolve_refs_label (struct spvxml_context *ctx UNUSED, struct spvsx_label *p UNUSED)
{
    if (!p)
        return;

}

static void
spvsx_do_free_label (struct spvxml_node *node)
{
    spvsx_free_label (UP_CAST (node, struct spvsx_label, node_));
}

static void
spvsx_do_collect_ids_label (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvsx_collect_ids_label (ctx, UP_CAST (node, struct spvsx_label, node_));
}

static void
spvsx_do_resolve_refs_label (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvsx_resolve_refs_label (ctx, UP_CAST (node, struct spvsx_label, node_));
}

struct spvxml_node_class spvsx_label_class = {
    "label",
    spvsx_do_free_label,
    spvsx_do_collect_ids_label,
    spvsx_do_resolve_refs_label,
};


static bool UNUSED
spvsx_try_parse_model (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvsx_model *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvsx_model *))
{
    xmlNode *next = *input;
    bool ok = sub (nctx, &next, p);
    if (ok)
        *input = next;
    else if (!nctx->up->hard_error) {
        free (nctx->up->error);
        nctx->up->error = NULL;
    }
    return ok;
}

static bool
spvsx_parse_model_5 (struct spvxml_node_context *nctx, xmlNode **input, struct spvsx_model *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "pmmlContainerPath", &node))
        return false;
    if (!spvsx_parse_pmml_container_path (nctx->up, node, &p->pmml_container_path))
        return false;

    xmlNode *node2;
    if (!spvxml_content_parse_element (nctx, input, "statsContainerPath", &node2))
        return false;
    if (!spvsx_parse_stats_container_path (nctx->up, node2, &p->stats_container_path))
        return false;
    return true;
}

static bool
spvsx_parse_model_4 (struct spvxml_node_context *nctx, xmlNode **input, struct spvsx_model *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "dataPath", &node))
        return false;
    if (!spvsx_parse_data_path (nctx->up, node, &p->data_path))
        return false;
    return true;
}

static bool
spvsx_parse_model_3 (struct spvxml_node_context *nctx, xmlNode **input, struct spvsx_model *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "ViZml", &node))
        return false;
    if (!spvsx_parse_vi_zml (nctx->up, node, &p->vi_zml))
        return false;
    return true;
}

static bool
spvsx_parse_model_2 (struct spvxml_node_context *nctx, xmlNode **input, struct spvsx_model *p)
{
    spvsx_try_parse_model (nctx, input, p, spvsx_parse_model_3);
    spvsx_try_parse_model (nctx, input, p, spvsx_parse_model_4);

    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "path", &node))
        return false;
    if (!spvsx_parse_path (nctx->up, node, &p->path))
        return false;
    return true;
}

static bool
spvsx_parse_model_1 (struct spvxml_node_context *nctx, xmlNode **input, struct spvsx_model *p)
{
    if (!spvsx_try_parse_model (nctx, input, p, spvsx_parse_model_2)
        && !spvsx_try_parse_model (nctx, input, p, spvsx_parse_model_5))
      {
        spvxml_content_error (nctx, *input, "Syntax error.");
        return false;
      }
    return true;
}

bool
spvsx_parse_model (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvsx_model **p_)
{
    enum {
        ATTR_P_M_M_L_CONTAINER_ID,
        ATTR_P_M_M_L_ID,
        ATTR_STAT_X_M_L_CONTAINER_ID,
        ATTR_V_D_P_ID,
        ATTR_AUXILIARY_VIEW_NAME,
        ATTR_COMMAND_NAME,
        ATTR_CREATOR_VERSION,
        ATTR_ID,
        ATTR_MAIN_VIEW_NAME,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_P_M_M_L_CONTAINER_ID] = { "PMMLContainerId", false, NULL },
        [ATTR_P_M_M_L_ID] = { "PMMLId", true, NULL },
        [ATTR_STAT_X_M_L_CONTAINER_ID] = { "StatXMLContainerId", true, NULL },
        [ATTR_V_D_P_ID] = { "VDPId", true, NULL },
        [ATTR_AUXILIARY_VIEW_NAME] = { "auxiliaryViewName", true, NULL },
        [ATTR_COMMAND_NAME] = { "commandName", true, NULL },
        [ATTR_CREATOR_VERSION] = { "creator-version", true, NULL },
        [ATTR_ID] = { "id", false, NULL },
        [ATTR_MAIN_VIEW_NAME] = { "mainViewName", true, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvsx_model *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvsx_model_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->p_m_m_l_container_id = attrs[ATTR_P_M_M_L_CONTAINER_ID].value;
    attrs[ATTR_P_M_M_L_CONTAINER_ID].value = NULL;
    p->p_m_m_l_id = attrs[ATTR_P_M_M_L_ID].value;
    attrs[ATTR_P_M_M_L_ID].value = NULL;
    p->stat_x_m_l_container_id = attrs[ATTR_STAT_X_M_L_CONTAINER_ID].value;
    attrs[ATTR_STAT_X_M_L_CONTAINER_ID].value = NULL;
    p->v_d_p_id = attrs[ATTR_V_D_P_ID].value;
    attrs[ATTR_V_D_P_ID].value = NULL;
    p->auxiliary_view_name = attrs[ATTR_AUXILIARY_VIEW_NAME].value;
    attrs[ATTR_AUXILIARY_VIEW_NAME].value = NULL;
    p->command_name = attrs[ATTR_COMMAND_NAME].value;
    attrs[ATTR_COMMAND_NAME].value = NULL;
    p->creator_version = attrs[ATTR_CREATOR_VERSION].value;
    attrs[ATTR_CREATOR_VERSION].value = NULL;
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    p->main_view_name = attrs[ATTR_MAIN_VIEW_NAME].value;
    attrs[ATTR_MAIN_VIEW_NAME].value = NULL;
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvsx_free_model (p);
        return false;
    }

    /* Parse content. */
    input = input->children;
    if (!spvsx_parse_model_1 (&nctx, &input, p)
        || !spvxml_content_parse_end (&nctx, input)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvsx_free_model (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvsx_free_model (struct spvsx_model *p)
{
    if (!p)
        return;

    free (p->p_m_m_l_container_id);
    free (p->p_m_m_l_id);
    free (p->stat_x_m_l_container_id);
    free (p->v_d_p_id);
    free (p->auxiliary_view_name);
    free (p->command_name);
    free (p->creator_version);
    free (p->main_view_name);
    spvsx_free_vi_zml (p->vi_zml);
    spvsx_free_data_path (p->data_path);
    spvsx_free_path (p->path);
    spvsx_free_pmml_container_path (p->pmml_container_path);
    spvsx_free_stats_container_path (p->stats_container_path);
    free (p->node_.id);
    free (p);
}

void
spvsx_collect_ids_model (struct spvxml_context *ctx, struct spvsx_model *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

    spvsx_collect_ids_vi_zml (ctx, p->vi_zml);
    spvsx_collect_ids_data_path (ctx, p->data_path);
    spvsx_collect_ids_path (ctx, p->path);
    spvsx_collect_ids_pmml_container_path (ctx, p->pmml_container_path);
    spvsx_collect_ids_stats_container_path (ctx, p->stats_container_path);
}

bool
spvsx_is_model (const struct spvxml_node *node)
{
    return node->class_ == &spvsx_model_class;
}

struct spvsx_model *
spvsx_cast_model (const struct spvxml_node *node)
{
    return (node && spvsx_is_model (node)
            ? UP_CAST (node, struct spvsx_model, node_)
            : NULL);
}

void
spvsx_resolve_refs_model (struct spvxml_context *ctx UNUSED, struct spvsx_model *p UNUSED)
{
    if (!p)
        return;

    spvsx_resolve_refs_vi_zml (ctx, p->vi_zml);
    spvsx_resolve_refs_data_path (ctx, p->data_path);
    spvsx_resolve_refs_path (ctx, p->path);
    spvsx_resolve_refs_pmml_container_path (ctx, p->pmml_container_path);
    spvsx_resolve_refs_stats_container_path (ctx, p->stats_container_path);
}

static void
spvsx_do_free_model (struct spvxml_node *node)
{
    spvsx_free_model (UP_CAST (node, struct spvsx_model, node_));
}

static void
spvsx_do_collect_ids_model (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvsx_collect_ids_model (ctx, UP_CAST (node, struct spvsx_model, node_));
}

static void
spvsx_do_resolve_refs_model (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvsx_resolve_refs_model (ctx, UP_CAST (node, struct spvsx_model, node_));
}

struct spvxml_node_class spvsx_model_class = {
    "model",
    spvsx_do_free_model,
    spvsx_do_collect_ids_model,
    spvsx_do_resolve_refs_model,
};


static bool UNUSED
spvsx_try_parse_object (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvsx_object *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvsx_object *))
{
    xmlNode *next = *input;
    bool ok = sub (nctx, &next, p);
    if (ok)
        *input = next;
    else if (!nctx->up->hard_error) {
        free (nctx->up->error);
        nctx->up->error = NULL;
    }
    return ok;
}

bool
spvsx_parse_object (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvsx_object **p_)
{
    enum {
        ATTR_ID,
        ATTR_TYPE,
        ATTR_URI,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_ID] = { "id", false, NULL },
        [ATTR_TYPE] = { "type", true, NULL },
        [ATTR_URI] = { "uri", true, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvsx_object *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvsx_object_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    p->type = attrs[ATTR_TYPE].value;
    attrs[ATTR_TYPE].value = NULL;
    p->uri = attrs[ATTR_URI].value;
    attrs[ATTR_URI].value = NULL;
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvsx_free_object (p);
        return false;
    }

    /* Parse content. */
    if (!spvxml_content_parse_end (&nctx, input->children)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvsx_free_object (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvsx_free_object (struct spvsx_object *p)
{
    if (!p)
        return;

    free (p->type);
    free (p->uri);
    free (p->node_.id);
    free (p);
}

void
spvsx_collect_ids_object (struct spvxml_context *ctx, struct spvsx_object *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

}

bool
spvsx_is_object (const struct spvxml_node *node)
{
    return node->class_ == &spvsx_object_class;
}

struct spvsx_object *
spvsx_cast_object (const struct spvxml_node *node)
{
    return (node && spvsx_is_object (node)
            ? UP_CAST (node, struct spvsx_object, node_)
            : NULL);
}

void
spvsx_resolve_refs_object (struct spvxml_context *ctx UNUSED, struct spvsx_object *p UNUSED)
{
    if (!p)
        return;

}

static void
spvsx_do_free_object (struct spvxml_node *node)
{
    spvsx_free_object (UP_CAST (node, struct spvsx_object, node_));
}

static void
spvsx_do_collect_ids_object (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvsx_collect_ids_object (ctx, UP_CAST (node, struct spvsx_object, node_));
}

static void
spvsx_do_resolve_refs_object (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvsx_resolve_refs_object (ctx, UP_CAST (node, struct spvsx_object, node_));
}

struct spvxml_node_class spvsx_object_class = {
    "object",
    spvsx_do_free_object,
    spvsx_do_collect_ids_object,
    spvsx_do_resolve_refs_object,
};


static bool UNUSED
spvsx_try_parse_page_footer (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvsx_page_footer *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvsx_page_footer *))
{
    xmlNode *next = *input;
    bool ok = sub (nctx, &next, p);
    if (ok)
        *input = next;
    else if (!nctx->up->hard_error) {
        free (nctx->up->error);
        nctx->up->error = NULL;
    }
    return ok;
}

static bool
spvsx_parse_page_footer_2 (struct spvxml_node_context *nctx, xmlNode **input, struct spvsx_page_footer *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "pageParagraph", &node))
        return false;
    if (!spvsx_parse_page_paragraph (nctx->up, node, &p->page_paragraph))
        return false;
    return true;
}

static bool
spvsx_parse_page_footer_1 (struct spvxml_node_context *nctx, xmlNode **input, struct spvsx_page_footer *p)
{
    spvsx_try_parse_page_footer (nctx, input, p, spvsx_parse_page_footer_2);
    return true;
}

bool
spvsx_parse_page_footer (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvsx_page_footer **p_)
{
    enum {
        ATTR_ID,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_ID] = { "id", false, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvsx_page_footer *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvsx_page_footer_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvsx_free_page_footer (p);
        return false;
    }

    /* Parse content. */
    input = input->children;
    if (!spvsx_parse_page_footer_1 (&nctx, &input, p)
        || !spvxml_content_parse_end (&nctx, input)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvsx_free_page_footer (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvsx_free_page_footer (struct spvsx_page_footer *p)
{
    if (!p)
        return;

    spvsx_free_page_paragraph (p->page_paragraph);
    free (p->node_.id);
    free (p);
}

void
spvsx_collect_ids_page_footer (struct spvxml_context *ctx, struct spvsx_page_footer *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

    spvsx_collect_ids_page_paragraph (ctx, p->page_paragraph);
}

bool
spvsx_is_page_footer (const struct spvxml_node *node)
{
    return node->class_ == &spvsx_page_footer_class;
}

struct spvsx_page_footer *
spvsx_cast_page_footer (const struct spvxml_node *node)
{
    return (node && spvsx_is_page_footer (node)
            ? UP_CAST (node, struct spvsx_page_footer, node_)
            : NULL);
}

void
spvsx_resolve_refs_page_footer (struct spvxml_context *ctx UNUSED, struct spvsx_page_footer *p UNUSED)
{
    if (!p)
        return;

    spvsx_resolve_refs_page_paragraph (ctx, p->page_paragraph);
}

static void
spvsx_do_free_page_footer (struct spvxml_node *node)
{
    spvsx_free_page_footer (UP_CAST (node, struct spvsx_page_footer, node_));
}

static void
spvsx_do_collect_ids_page_footer (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvsx_collect_ids_page_footer (ctx, UP_CAST (node, struct spvsx_page_footer, node_));
}

static void
spvsx_do_resolve_refs_page_footer (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvsx_resolve_refs_page_footer (ctx, UP_CAST (node, struct spvsx_page_footer, node_));
}

struct spvxml_node_class spvsx_page_footer_class = {
    "pageFooter",
    spvsx_do_free_page_footer,
    spvsx_do_collect_ids_page_footer,
    spvsx_do_resolve_refs_page_footer,
};


static bool UNUSED
spvsx_try_parse_page_header (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvsx_page_header *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvsx_page_header *))
{
    xmlNode *next = *input;
    bool ok = sub (nctx, &next, p);
    if (ok)
        *input = next;
    else if (!nctx->up->hard_error) {
        free (nctx->up->error);
        nctx->up->error = NULL;
    }
    return ok;
}

static bool
spvsx_parse_page_header_2 (struct spvxml_node_context *nctx, xmlNode **input, struct spvsx_page_header *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "pageParagraph", &node))
        return false;
    if (!spvsx_parse_page_paragraph (nctx->up, node, &p->page_paragraph))
        return false;
    return true;
}

static bool
spvsx_parse_page_header_1 (struct spvxml_node_context *nctx, xmlNode **input, struct spvsx_page_header *p)
{
    spvsx_try_parse_page_header (nctx, input, p, spvsx_parse_page_header_2);
    return true;
}

bool
spvsx_parse_page_header (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvsx_page_header **p_)
{
    enum {
        ATTR_ID,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_ID] = { "id", false, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvsx_page_header *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvsx_page_header_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvsx_free_page_header (p);
        return false;
    }

    /* Parse content. */
    input = input->children;
    if (!spvsx_parse_page_header_1 (&nctx, &input, p)
        || !spvxml_content_parse_end (&nctx, input)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvsx_free_page_header (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvsx_free_page_header (struct spvsx_page_header *p)
{
    if (!p)
        return;

    spvsx_free_page_paragraph (p->page_paragraph);
    free (p->node_.id);
    free (p);
}

void
spvsx_collect_ids_page_header (struct spvxml_context *ctx, struct spvsx_page_header *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

    spvsx_collect_ids_page_paragraph (ctx, p->page_paragraph);
}

bool
spvsx_is_page_header (const struct spvxml_node *node)
{
    return node->class_ == &spvsx_page_header_class;
}

struct spvsx_page_header *
spvsx_cast_page_header (const struct spvxml_node *node)
{
    return (node && spvsx_is_page_header (node)
            ? UP_CAST (node, struct spvsx_page_header, node_)
            : NULL);
}

void
spvsx_resolve_refs_page_header (struct spvxml_context *ctx UNUSED, struct spvsx_page_header *p UNUSED)
{
    if (!p)
        return;

    spvsx_resolve_refs_page_paragraph (ctx, p->page_paragraph);
}

static void
spvsx_do_free_page_header (struct spvxml_node *node)
{
    spvsx_free_page_header (UP_CAST (node, struct spvsx_page_header, node_));
}

static void
spvsx_do_collect_ids_page_header (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvsx_collect_ids_page_header (ctx, UP_CAST (node, struct spvsx_page_header, node_));
}

static void
spvsx_do_resolve_refs_page_header (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvsx_resolve_refs_page_header (ctx, UP_CAST (node, struct spvsx_page_header, node_));
}

struct spvxml_node_class spvsx_page_header_class = {
    "pageHeader",
    spvsx_do_free_page_header,
    spvsx_do_collect_ids_page_header,
    spvsx_do_resolve_refs_page_header,
};


static bool UNUSED
spvsx_try_parse_page_paragraph (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvsx_page_paragraph *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvsx_page_paragraph *))
{
    xmlNode *next = *input;
    bool ok = sub (nctx, &next, p);
    if (ok)
        *input = next;
    else if (!nctx->up->hard_error) {
        free (nctx->up->error);
        nctx->up->error = NULL;
    }
    return ok;
}

static bool
spvsx_parse_page_paragraph_1 (struct spvxml_node_context *nctx, xmlNode **input, struct spvsx_page_paragraph *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "text", &node))
        return false;
    if (!spvsx_parse_page_paragraph_text (nctx->up, node, &p->page_paragraph_text))
        return false;
    return true;
}

bool
spvsx_parse_page_paragraph (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvsx_page_paragraph **p_)
{
    enum {
        ATTR_ID,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_ID] = { "id", false, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvsx_page_paragraph *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvsx_page_paragraph_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvsx_free_page_paragraph (p);
        return false;
    }

    /* Parse content. */
    input = input->children;
    if (!spvsx_parse_page_paragraph_1 (&nctx, &input, p)
        || !spvxml_content_parse_end (&nctx, input)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvsx_free_page_paragraph (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvsx_free_page_paragraph (struct spvsx_page_paragraph *p)
{
    if (!p)
        return;

    spvsx_free_page_paragraph_text (p->page_paragraph_text);
    free (p->node_.id);
    free (p);
}

void
spvsx_collect_ids_page_paragraph (struct spvxml_context *ctx, struct spvsx_page_paragraph *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

    spvsx_collect_ids_page_paragraph_text (ctx, p->page_paragraph_text);
}

bool
spvsx_is_page_paragraph (const struct spvxml_node *node)
{
    return node->class_ == &spvsx_page_paragraph_class;
}

struct spvsx_page_paragraph *
spvsx_cast_page_paragraph (const struct spvxml_node *node)
{
    return (node && spvsx_is_page_paragraph (node)
            ? UP_CAST (node, struct spvsx_page_paragraph, node_)
            : NULL);
}

void
spvsx_resolve_refs_page_paragraph (struct spvxml_context *ctx UNUSED, struct spvsx_page_paragraph *p UNUSED)
{
    if (!p)
        return;

    spvsx_resolve_refs_page_paragraph_text (ctx, p->page_paragraph_text);
}

static void
spvsx_do_free_page_paragraph (struct spvxml_node *node)
{
    spvsx_free_page_paragraph (UP_CAST (node, struct spvsx_page_paragraph, node_));
}

static void
spvsx_do_collect_ids_page_paragraph (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvsx_collect_ids_page_paragraph (ctx, UP_CAST (node, struct spvsx_page_paragraph, node_));
}

static void
spvsx_do_resolve_refs_page_paragraph (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvsx_resolve_refs_page_paragraph (ctx, UP_CAST (node, struct spvsx_page_paragraph, node_));
}

struct spvxml_node_class spvsx_page_paragraph_class = {
    "pageParagraph",
    spvsx_do_free_page_paragraph,
    spvsx_do_collect_ids_page_paragraph,
    spvsx_do_resolve_refs_page_paragraph,
};


static bool UNUSED
spvsx_try_parse_page_paragraph_text (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvsx_page_paragraph_text *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvsx_page_paragraph_text *))
{
    xmlNode *next = *input;
    bool ok = sub (nctx, &next, p);
    if (ok)
        *input = next;
    else if (!nctx->up->hard_error) {
        free (nctx->up->error);
        nctx->up->error = NULL;
    }
    return ok;
}

static bool
spvsx_parse_page_paragraph_text_1 (struct spvxml_node_context *nctx, xmlNode **input, struct spvsx_page_paragraph_text *p)
{
    if (!spvxml_content_parse_text (nctx, input, &p->text))
        return false;
    return true;
}

bool
spvsx_parse_page_paragraph_text (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvsx_page_paragraph_text **p_)
{
    enum {
        ATTR_ID,
        ATTR_TYPE,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_ID] = { "id", false, NULL },
        [ATTR_TYPE] = { "type", true, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvsx_page_paragraph_text *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvsx_page_paragraph_text_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    p->type = spvxml_attr_parse_enum (
        &nctx, &attrs[ATTR_TYPE], spvsx_type_map);
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvsx_free_page_paragraph_text (p);
        return false;
    }

    /* Parse content. */
    input = input->children;
    if (!spvsx_parse_page_paragraph_text_1 (&nctx, &input, p)
        || !spvxml_content_parse_end (&nctx, input)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvsx_free_page_paragraph_text (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvsx_free_page_paragraph_text (struct spvsx_page_paragraph_text *p)
{
    if (!p)
        return;

    free (p->text);
    free (p->node_.id);
    free (p);
}

void
spvsx_collect_ids_page_paragraph_text (struct spvxml_context *ctx, struct spvsx_page_paragraph_text *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

}

bool
spvsx_is_page_paragraph_text (const struct spvxml_node *node)
{
    return node->class_ == &spvsx_page_paragraph_text_class;
}

struct spvsx_page_paragraph_text *
spvsx_cast_page_paragraph_text (const struct spvxml_node *node)
{
    return (node && spvsx_is_page_paragraph_text (node)
            ? UP_CAST (node, struct spvsx_page_paragraph_text, node_)
            : NULL);
}

void
spvsx_resolve_refs_page_paragraph_text (struct spvxml_context *ctx UNUSED, struct spvsx_page_paragraph_text *p UNUSED)
{
    if (!p)
        return;

}

static void
spvsx_do_free_page_paragraph_text (struct spvxml_node *node)
{
    spvsx_free_page_paragraph_text (UP_CAST (node, struct spvsx_page_paragraph_text, node_));
}

static void
spvsx_do_collect_ids_page_paragraph_text (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvsx_collect_ids_page_paragraph_text (ctx, UP_CAST (node, struct spvsx_page_paragraph_text, node_));
}

static void
spvsx_do_resolve_refs_page_paragraph_text (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvsx_resolve_refs_page_paragraph_text (ctx, UP_CAST (node, struct spvsx_page_paragraph_text, node_));
}

struct spvxml_node_class spvsx_page_paragraph_text_class = {
    "pageParagraph_text (text)",
    spvsx_do_free_page_paragraph_text,
    spvsx_do_collect_ids_page_paragraph_text,
    spvsx_do_resolve_refs_page_paragraph_text,
};


static bool UNUSED
spvsx_try_parse_page_setup (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvsx_page_setup *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvsx_page_setup *))
{
    xmlNode *next = *input;
    bool ok = sub (nctx, &next, p);
    if (ok)
        *input = next;
    else if (!nctx->up->hard_error) {
        free (nctx->up->error);
        nctx->up->error = NULL;
    }
    return ok;
}

static bool
spvsx_parse_page_setup_1 (struct spvxml_node_context *nctx, xmlNode **input, struct spvsx_page_setup *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "pageHeader", &node))
        return false;
    if (!spvsx_parse_page_header (nctx->up, node, &p->page_header))
        return false;

    xmlNode *node2;
    if (!spvxml_content_parse_element (nctx, input, "pageFooter", &node2))
        return false;
    if (!spvsx_parse_page_footer (nctx->up, node2, &p->page_footer))
        return false;
    return true;
}

bool
spvsx_parse_page_setup (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvsx_page_setup **p_)
{
    enum {
        ATTR_CHART_SIZE,
        ATTR_ID,
        ATTR_INITIAL_PAGE_NUMBER,
        ATTR_MARGIN_BOTTOM,
        ATTR_MARGIN_LEFT,
        ATTR_MARGIN_RIGHT,
        ATTR_MARGIN_TOP,
        ATTR_PAPER_HEIGHT,
        ATTR_PAPER_WIDTH,
        ATTR_REFERENCE_ORIENTATION,
        ATTR_SPACE_AFTER,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_CHART_SIZE] = { "chart-size", false, NULL },
        [ATTR_ID] = { "id", false, NULL },
        [ATTR_INITIAL_PAGE_NUMBER] = { "initial-page-number", false, NULL },
        [ATTR_MARGIN_BOTTOM] = { "margin-bottom", false, NULL },
        [ATTR_MARGIN_LEFT] = { "margin-left", false, NULL },
        [ATTR_MARGIN_RIGHT] = { "margin-right", false, NULL },
        [ATTR_MARGIN_TOP] = { "margin-top", false, NULL },
        [ATTR_PAPER_HEIGHT] = { "paper-height", false, NULL },
        [ATTR_PAPER_WIDTH] = { "paper-width", false, NULL },
        [ATTR_REFERENCE_ORIENTATION] = { "reference-orientation", false, NULL },
        [ATTR_SPACE_AFTER] = { "space-after", false, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvsx_page_setup *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvsx_page_setup_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->chart_size = spvxml_attr_parse_enum (
        &nctx, &attrs[ATTR_CHART_SIZE], spvsx_chart_size_map);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    p->initial_page_number = spvxml_attr_parse_int (&nctx, &attrs[ATTR_INITIAL_PAGE_NUMBER]);
    p->margin_bottom = spvxml_attr_parse_dimension (&nctx, &attrs[ATTR_MARGIN_BOTTOM]);
    p->margin_left = spvxml_attr_parse_dimension (&nctx, &attrs[ATTR_MARGIN_LEFT]);
    p->margin_right = spvxml_attr_parse_dimension (&nctx, &attrs[ATTR_MARGIN_RIGHT]);
    p->margin_top = spvxml_attr_parse_dimension (&nctx, &attrs[ATTR_MARGIN_TOP]);
    p->paper_height = spvxml_attr_parse_dimension (&nctx, &attrs[ATTR_PAPER_HEIGHT]);
    p->paper_width = spvxml_attr_parse_dimension (&nctx, &attrs[ATTR_PAPER_WIDTH]);
    p->reference_orientation = attrs[ATTR_REFERENCE_ORIENTATION].value;
    attrs[ATTR_REFERENCE_ORIENTATION].value = NULL;
    p->space_after = spvxml_attr_parse_dimension (&nctx, &attrs[ATTR_SPACE_AFTER]);
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvsx_free_page_setup (p);
        return false;
    }

    /* Parse content. */
    input = input->children;
    if (!spvsx_parse_page_setup_1 (&nctx, &input, p)
        || !spvxml_content_parse_end (&nctx, input)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvsx_free_page_setup (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvsx_free_page_setup (struct spvsx_page_setup *p)
{
    if (!p)
        return;

    free (p->reference_orientation);
    spvsx_free_page_header (p->page_header);
    spvsx_free_page_footer (p->page_footer);
    free (p->node_.id);
    free (p);
}

void
spvsx_collect_ids_page_setup (struct spvxml_context *ctx, struct spvsx_page_setup *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

    spvsx_collect_ids_page_header (ctx, p->page_header);
    spvsx_collect_ids_page_footer (ctx, p->page_footer);
}

bool
spvsx_is_page_setup (const struct spvxml_node *node)
{
    return node->class_ == &spvsx_page_setup_class;
}

struct spvsx_page_setup *
spvsx_cast_page_setup (const struct spvxml_node *node)
{
    return (node && spvsx_is_page_setup (node)
            ? UP_CAST (node, struct spvsx_page_setup, node_)
            : NULL);
}

void
spvsx_resolve_refs_page_setup (struct spvxml_context *ctx UNUSED, struct spvsx_page_setup *p UNUSED)
{
    if (!p)
        return;

    spvsx_resolve_refs_page_header (ctx, p->page_header);
    spvsx_resolve_refs_page_footer (ctx, p->page_footer);
}

static void
spvsx_do_free_page_setup (struct spvxml_node *node)
{
    spvsx_free_page_setup (UP_CAST (node, struct spvsx_page_setup, node_));
}

static void
spvsx_do_collect_ids_page_setup (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvsx_collect_ids_page_setup (ctx, UP_CAST (node, struct spvsx_page_setup, node_));
}

static void
spvsx_do_resolve_refs_page_setup (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvsx_resolve_refs_page_setup (ctx, UP_CAST (node, struct spvsx_page_setup, node_));
}

struct spvxml_node_class spvsx_page_setup_class = {
    "pageSetup",
    spvsx_do_free_page_setup,
    spvsx_do_collect_ids_page_setup,
    spvsx_do_resolve_refs_page_setup,
};


static bool UNUSED
spvsx_try_parse_path (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvsx_path *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvsx_path *))
{
    xmlNode *next = *input;
    bool ok = sub (nctx, &next, p);
    if (ok)
        *input = next;
    else if (!nctx->up->hard_error) {
        free (nctx->up->error);
        nctx->up->error = NULL;
    }
    return ok;
}

static bool
spvsx_parse_path_1 (struct spvxml_node_context *nctx, xmlNode **input, struct spvsx_path *p)
{
    if (!spvxml_content_parse_text (nctx, input, &p->text))
        return false;
    return true;
}

bool
spvsx_parse_path (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvsx_path **p_)
{
    enum {
        ATTR_ID,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_ID] = { "id", false, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvsx_path *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvsx_path_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvsx_free_path (p);
        return false;
    }

    /* Parse content. */
    input = input->children;
    if (!spvsx_parse_path_1 (&nctx, &input, p)
        || !spvxml_content_parse_end (&nctx, input)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvsx_free_path (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvsx_free_path (struct spvsx_path *p)
{
    if (!p)
        return;

    free (p->text);
    free (p->node_.id);
    free (p);
}

void
spvsx_collect_ids_path (struct spvxml_context *ctx, struct spvsx_path *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

}

bool
spvsx_is_path (const struct spvxml_node *node)
{
    return node->class_ == &spvsx_path_class;
}

struct spvsx_path *
spvsx_cast_path (const struct spvxml_node *node)
{
    return (node && spvsx_is_path (node)
            ? UP_CAST (node, struct spvsx_path, node_)
            : NULL);
}

void
spvsx_resolve_refs_path (struct spvxml_context *ctx UNUSED, struct spvsx_path *p UNUSED)
{
    if (!p)
        return;

}

static void
spvsx_do_free_path (struct spvxml_node *node)
{
    spvsx_free_path (UP_CAST (node, struct spvsx_path, node_));
}

static void
spvsx_do_collect_ids_path (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvsx_collect_ids_path (ctx, UP_CAST (node, struct spvsx_path, node_));
}

static void
spvsx_do_resolve_refs_path (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvsx_resolve_refs_path (ctx, UP_CAST (node, struct spvsx_path, node_));
}

struct spvxml_node_class spvsx_path_class = {
    "path",
    spvsx_do_free_path,
    spvsx_do_collect_ids_path,
    spvsx_do_resolve_refs_path,
};


static bool UNUSED
spvsx_try_parse_pmml_container_path (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvsx_pmml_container_path *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvsx_pmml_container_path *))
{
    xmlNode *next = *input;
    bool ok = sub (nctx, &next, p);
    if (ok)
        *input = next;
    else if (!nctx->up->hard_error) {
        free (nctx->up->error);
        nctx->up->error = NULL;
    }
    return ok;
}

static bool
spvsx_parse_pmml_container_path_1 (struct spvxml_node_context *nctx, xmlNode **input, struct spvsx_pmml_container_path *p)
{
    if (!spvxml_content_parse_text (nctx, input, &p->text))
        return false;
    return true;
}

bool
spvsx_parse_pmml_container_path (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvsx_pmml_container_path **p_)
{
    enum {
        ATTR_ID,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_ID] = { "id", false, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvsx_pmml_container_path *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvsx_pmml_container_path_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvsx_free_pmml_container_path (p);
        return false;
    }

    /* Parse content. */
    input = input->children;
    if (!spvsx_parse_pmml_container_path_1 (&nctx, &input, p)
        || !spvxml_content_parse_end (&nctx, input)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvsx_free_pmml_container_path (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvsx_free_pmml_container_path (struct spvsx_pmml_container_path *p)
{
    if (!p)
        return;

    free (p->text);
    free (p->node_.id);
    free (p);
}

void
spvsx_collect_ids_pmml_container_path (struct spvxml_context *ctx, struct spvsx_pmml_container_path *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

}

bool
spvsx_is_pmml_container_path (const struct spvxml_node *node)
{
    return node->class_ == &spvsx_pmml_container_path_class;
}

struct spvsx_pmml_container_path *
spvsx_cast_pmml_container_path (const struct spvxml_node *node)
{
    return (node && spvsx_is_pmml_container_path (node)
            ? UP_CAST (node, struct spvsx_pmml_container_path, node_)
            : NULL);
}

void
spvsx_resolve_refs_pmml_container_path (struct spvxml_context *ctx UNUSED, struct spvsx_pmml_container_path *p UNUSED)
{
    if (!p)
        return;

}

static void
spvsx_do_free_pmml_container_path (struct spvxml_node *node)
{
    spvsx_free_pmml_container_path (UP_CAST (node, struct spvsx_pmml_container_path, node_));
}

static void
spvsx_do_collect_ids_pmml_container_path (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvsx_collect_ids_pmml_container_path (ctx, UP_CAST (node, struct spvsx_pmml_container_path, node_));
}

static void
spvsx_do_resolve_refs_pmml_container_path (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvsx_resolve_refs_pmml_container_path (ctx, UP_CAST (node, struct spvsx_pmml_container_path, node_));
}

struct spvxml_node_class spvsx_pmml_container_path_class = {
    "pmmlContainerPath",
    spvsx_do_free_pmml_container_path,
    spvsx_do_collect_ids_pmml_container_path,
    spvsx_do_resolve_refs_pmml_container_path,
};


static bool UNUSED
spvsx_try_parse_printing_properties (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvsx_printing_properties *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvsx_printing_properties *))
{
    xmlNode *next = *input;
    bool ok = sub (nctx, &next, p);
    if (ok)
        *input = next;
    else if (!nctx->up->hard_error) {
        free (nctx->up->error);
        nctx->up->error = NULL;
    }
    return ok;
}

bool
spvsx_parse_printing_properties (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvsx_printing_properties **p_)
{
    enum {
        ATTR_CONTINUATION_TEXT,
        ATTR_CONTINUATION_TEXT_AT_BOTTOM,
        ATTR_CONTINUATION_TEXT_AT_TOP,
        ATTR_ID,
        ATTR_PRINT_ALL_LAYERS,
        ATTR_PRINT_EACH_LAYER_ON_SEPARATE_PAGE,
        ATTR_RESCALE_LONG_TABLE_TO_FIT_PAGE,
        ATTR_RESCALE_WIDE_TABLE_TO_FIT_PAGE,
        ATTR_WINDOW_ORPHAN_LINES,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_CONTINUATION_TEXT] = { "continuationText", false, NULL },
        [ATTR_CONTINUATION_TEXT_AT_BOTTOM] = { "continuationTextAtBottom", false, NULL },
        [ATTR_CONTINUATION_TEXT_AT_TOP] = { "continuationTextAtTop", false, NULL },
        [ATTR_ID] = { "id", false, NULL },
        [ATTR_PRINT_ALL_LAYERS] = { "printAllLayers", false, NULL },
        [ATTR_PRINT_EACH_LAYER_ON_SEPARATE_PAGE] = { "printEachLayerOnSeparatePage", false, NULL },
        [ATTR_RESCALE_LONG_TABLE_TO_FIT_PAGE] = { "rescaleLongTableToFitPage", false, NULL },
        [ATTR_RESCALE_WIDE_TABLE_TO_FIT_PAGE] = { "rescaleWideTableToFitPage", false, NULL },
        [ATTR_WINDOW_ORPHAN_LINES] = { "windowOrphanLines", false, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvsx_printing_properties *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvsx_printing_properties_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->continuation_text = attrs[ATTR_CONTINUATION_TEXT].value;
    attrs[ATTR_CONTINUATION_TEXT].value = NULL;
    p->continuation_text_at_bottom = spvxml_attr_parse_bool (&nctx, &attrs[ATTR_CONTINUATION_TEXT_AT_BOTTOM]);
    p->continuation_text_at_top = spvxml_attr_parse_bool (&nctx, &attrs[ATTR_CONTINUATION_TEXT_AT_TOP]);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    p->print_all_layers = spvxml_attr_parse_bool (&nctx, &attrs[ATTR_PRINT_ALL_LAYERS]);
    p->print_each_layer_on_separate_page = spvxml_attr_parse_bool (&nctx, &attrs[ATTR_PRINT_EACH_LAYER_ON_SEPARATE_PAGE]);
    p->rescale_long_table_to_fit_page = spvxml_attr_parse_bool (&nctx, &attrs[ATTR_RESCALE_LONG_TABLE_TO_FIT_PAGE]);
    p->rescale_wide_table_to_fit_page = spvxml_attr_parse_bool (&nctx, &attrs[ATTR_RESCALE_WIDE_TABLE_TO_FIT_PAGE]);
    p->window_orphan_lines = spvxml_attr_parse_int (&nctx, &attrs[ATTR_WINDOW_ORPHAN_LINES]);
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvsx_free_printing_properties (p);
        return false;
    }

    /* Parse content. */
    if (!spvxml_content_parse_end (&nctx, input->children)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvsx_free_printing_properties (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvsx_free_printing_properties (struct spvsx_printing_properties *p)
{
    if (!p)
        return;

    free (p->continuation_text);
    free (p->node_.id);
    free (p);
}

void
spvsx_collect_ids_printing_properties (struct spvxml_context *ctx, struct spvsx_printing_properties *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

}

bool
spvsx_is_printing_properties (const struct spvxml_node *node)
{
    return node->class_ == &spvsx_printing_properties_class;
}

struct spvsx_printing_properties *
spvsx_cast_printing_properties (const struct spvxml_node *node)
{
    return (node && spvsx_is_printing_properties (node)
            ? UP_CAST (node, struct spvsx_printing_properties, node_)
            : NULL);
}

void
spvsx_resolve_refs_printing_properties (struct spvxml_context *ctx UNUSED, struct spvsx_printing_properties *p UNUSED)
{
    if (!p)
        return;

}

static void
spvsx_do_free_printing_properties (struct spvxml_node *node)
{
    spvsx_free_printing_properties (UP_CAST (node, struct spvsx_printing_properties, node_));
}

static void
spvsx_do_collect_ids_printing_properties (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvsx_collect_ids_printing_properties (ctx, UP_CAST (node, struct spvsx_printing_properties, node_));
}

static void
spvsx_do_resolve_refs_printing_properties (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvsx_resolve_refs_printing_properties (ctx, UP_CAST (node, struct spvsx_printing_properties, node_));
}

struct spvxml_node_class spvsx_printing_properties_class = {
    "printingProperties",
    spvsx_do_free_printing_properties,
    spvsx_do_collect_ids_printing_properties,
    spvsx_do_resolve_refs_printing_properties,
};


static bool UNUSED
spvsx_try_parse_root_heading (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvsx_root_heading *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvsx_root_heading *))
{
    xmlNode *next = *input;
    bool ok = sub (nctx, &next, p);
    if (ok)
        *input = next;
    else if (!nctx->up->hard_error) {
        free (nctx->up->error);
        nctx->up->error = NULL;
    }
    return ok;
}

static bool
spvsx_parse_root_heading_5 (struct spvxml_node_context *nctx, xmlNode **input, struct spvsx_root_heading *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "heading", &node))
        return false;
    struct spvsx_heading *seq;
    if (!spvsx_parse_heading (nctx->up, node, &seq))
        return false;
    p->seq = xrealloc (p->seq, sizeof *p->seq * (p->n_seq + 1));
    p->seq[p->n_seq++] = &seq->node_;
    return true;
}

static bool
spvsx_parse_root_heading_4 (struct spvxml_node_context *nctx, xmlNode **input, struct spvsx_root_heading *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "container", &node))
        return false;
    struct spvsx_container *seq;
    if (!spvsx_parse_container (nctx->up, node, &seq))
        return false;
    p->seq = xrealloc (p->seq, sizeof *p->seq * (p->n_seq + 1));
    p->seq[p->n_seq++] = &seq->node_;
    return true;
}

static bool
spvsx_parse_root_heading_3 (struct spvxml_node_context *nctx, xmlNode **input, struct spvsx_root_heading *p)
{
    if (!spvsx_try_parse_root_heading (nctx, input, p, spvsx_parse_root_heading_4)
        && !spvsx_try_parse_root_heading (nctx, input, p, spvsx_parse_root_heading_5))
      {
        spvxml_content_error (nctx, *input, "Syntax error.");
        return false;
      }
    return true;
}

static bool
spvsx_parse_root_heading_2 (struct spvxml_node_context *nctx, xmlNode **input, struct spvsx_root_heading *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "pageSetup", &node))
        return false;
    if (!spvsx_parse_page_setup (nctx->up, node, &p->page_setup))
        return false;
    return true;
}

static bool
spvsx_parse_root_heading_1 (struct spvxml_node_context *nctx, xmlNode **input, struct spvsx_root_heading *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "label", &node))
        return false;
    if (!spvsx_parse_label (nctx->up, node, &p->label))
        return false;
    spvsx_try_parse_root_heading (nctx, input, p, spvsx_parse_root_heading_2);
    while (spvsx_try_parse_root_heading (nctx, input, p, spvsx_parse_root_heading_3))
        continue;
    return true;
}

bool
spvsx_parse_root_heading (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvsx_root_heading **p_)
{
    enum {
        ATTR_CREATION_DATE_TIME,
        ATTR_CREATOR,
        ATTR_CREATOR_VERSION,
        ATTR_ID,
        ATTR_LOCK_READER,
        ATTR_SCHEMA_LOCATION,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_CREATION_DATE_TIME] = { "creation-date-time", false, NULL },
        [ATTR_CREATOR] = { "creator", false, NULL },
        [ATTR_CREATOR_VERSION] = { "creator-version", false, NULL },
        [ATTR_ID] = { "id", false, NULL },
        [ATTR_LOCK_READER] = { "lockReader", false, NULL },
        [ATTR_SCHEMA_LOCATION] = { "schemaLocation", false, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvsx_root_heading *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvsx_root_heading_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->creation_date_time = attrs[ATTR_CREATION_DATE_TIME].value;
    attrs[ATTR_CREATION_DATE_TIME].value = NULL;
    p->creator = attrs[ATTR_CREATOR].value;
    attrs[ATTR_CREATOR].value = NULL;
    p->creator_version = attrs[ATTR_CREATOR_VERSION].value;
    attrs[ATTR_CREATOR_VERSION].value = NULL;
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    p->lock_reader = spvxml_attr_parse_bool (&nctx, &attrs[ATTR_LOCK_READER]);
    p->schema_location = attrs[ATTR_SCHEMA_LOCATION].value;
    attrs[ATTR_SCHEMA_LOCATION].value = NULL;
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvsx_free_root_heading (p);
        return false;
    }

    /* Parse content. */
    input = input->children;
    if (!spvsx_parse_root_heading_1 (&nctx, &input, p)
        || !spvxml_content_parse_end (&nctx, input)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvsx_free_root_heading (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvsx_free_root_heading (struct spvsx_root_heading *p)
{
    if (!p)
        return;

    free (p->creator_version);
    free (p->creator);
    free (p->creation_date_time);
    free (p->schema_location);
    spvsx_free_label (p->label);
    spvsx_free_page_setup (p->page_setup);
    for (size_t i = 0; i < p->n_seq; i++)
        p->seq[i]->class_->spvxml_node_free (p->seq[i]);
    free (p->seq);
    free (p->node_.id);
    free (p);
}

void
spvsx_collect_ids_root_heading (struct spvxml_context *ctx, struct spvsx_root_heading *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

    spvsx_collect_ids_label (ctx, p->label);
    spvsx_collect_ids_page_setup (ctx, p->page_setup);
    for (size_t i = 0; i < p->n_seq; i++)
        p->seq[i]->class_->spvxml_node_collect_ids (ctx, p->seq[i]);
}

bool
spvsx_is_root_heading (const struct spvxml_node *node)
{
    return node->class_ == &spvsx_root_heading_class;
}

struct spvsx_root_heading *
spvsx_cast_root_heading (const struct spvxml_node *node)
{
    return (node && spvsx_is_root_heading (node)
            ? UP_CAST (node, struct spvsx_root_heading, node_)
            : NULL);
}

void
spvsx_resolve_refs_root_heading (struct spvxml_context *ctx UNUSED, struct spvsx_root_heading *p UNUSED)
{
    if (!p)
        return;

    spvsx_resolve_refs_label (ctx, p->label);
    spvsx_resolve_refs_page_setup (ctx, p->page_setup);
    for (size_t i = 0; i < p->n_seq; i++)
        p->seq[i]->class_->spvxml_node_resolve_refs (ctx, p->seq[i]);
}

static void
spvsx_do_free_root_heading (struct spvxml_node *node)
{
    spvsx_free_root_heading (UP_CAST (node, struct spvsx_root_heading, node_));
}

static void
spvsx_do_collect_ids_root_heading (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvsx_collect_ids_root_heading (ctx, UP_CAST (node, struct spvsx_root_heading, node_));
}

static void
spvsx_do_resolve_refs_root_heading (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvsx_resolve_refs_root_heading (ctx, UP_CAST (node, struct spvsx_root_heading, node_));
}

struct spvxml_node_class spvsx_root_heading_class = {
    "root_heading (heading)",
    spvsx_do_free_root_heading,
    spvsx_do_collect_ids_root_heading,
    spvsx_do_resolve_refs_root_heading,
};


static bool UNUSED
spvsx_try_parse_stats_container_path (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvsx_stats_container_path *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvsx_stats_container_path *))
{
    xmlNode *next = *input;
    bool ok = sub (nctx, &next, p);
    if (ok)
        *input = next;
    else if (!nctx->up->hard_error) {
        free (nctx->up->error);
        nctx->up->error = NULL;
    }
    return ok;
}

static bool
spvsx_parse_stats_container_path_1 (struct spvxml_node_context *nctx, xmlNode **input, struct spvsx_stats_container_path *p)
{
    if (!spvxml_content_parse_text (nctx, input, &p->text))
        return false;
    return true;
}

bool
spvsx_parse_stats_container_path (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvsx_stats_container_path **p_)
{
    enum {
        ATTR_ID,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_ID] = { "id", false, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvsx_stats_container_path *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvsx_stats_container_path_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvsx_free_stats_container_path (p);
        return false;
    }

    /* Parse content. */
    input = input->children;
    if (!spvsx_parse_stats_container_path_1 (&nctx, &input, p)
        || !spvxml_content_parse_end (&nctx, input)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvsx_free_stats_container_path (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvsx_free_stats_container_path (struct spvsx_stats_container_path *p)
{
    if (!p)
        return;

    free (p->text);
    free (p->node_.id);
    free (p);
}

void
spvsx_collect_ids_stats_container_path (struct spvxml_context *ctx, struct spvsx_stats_container_path *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

}

bool
spvsx_is_stats_container_path (const struct spvxml_node *node)
{
    return node->class_ == &spvsx_stats_container_path_class;
}

struct spvsx_stats_container_path *
spvsx_cast_stats_container_path (const struct spvxml_node *node)
{
    return (node && spvsx_is_stats_container_path (node)
            ? UP_CAST (node, struct spvsx_stats_container_path, node_)
            : NULL);
}

void
spvsx_resolve_refs_stats_container_path (struct spvxml_context *ctx UNUSED, struct spvsx_stats_container_path *p UNUSED)
{
    if (!p)
        return;

}

static void
spvsx_do_free_stats_container_path (struct spvxml_node *node)
{
    spvsx_free_stats_container_path (UP_CAST (node, struct spvsx_stats_container_path, node_));
}

static void
spvsx_do_collect_ids_stats_container_path (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvsx_collect_ids_stats_container_path (ctx, UP_CAST (node, struct spvsx_stats_container_path, node_));
}

static void
spvsx_do_resolve_refs_stats_container_path (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvsx_resolve_refs_stats_container_path (ctx, UP_CAST (node, struct spvsx_stats_container_path, node_));
}

struct spvxml_node_class spvsx_stats_container_path_class = {
    "statsContainerPath",
    spvsx_do_free_stats_container_path,
    spvsx_do_collect_ids_stats_container_path,
    spvsx_do_resolve_refs_stats_container_path,
};


static bool UNUSED
spvsx_try_parse_style (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvsx_style *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvsx_style *))
{
    xmlNode *next = *input;
    bool ok = sub (nctx, &next, p);
    if (ok)
        *input = next;
    else if (!nctx->up->hard_error) {
        free (nctx->up->error);
        nctx->up->error = NULL;
    }
    return ok;
}

bool
spvsx_parse_style (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvsx_style **p_)
{
    enum {
        ATTR_COLOR,
        ATTR_COLOR2,
        ATTR_DECIMAL_OFFSET,
        ATTR_FONT_FAMILY,
        ATTR_FONT_SIZE,
        ATTR_FONT_STYLE,
        ATTR_FONT_WEIGHT,
        ATTR_ID,
        ATTR_LABEL_LOCATION_VERTICAL,
        ATTR_MARGIN_BOTTOM,
        ATTR_MARGIN_LEFT,
        ATTR_MARGIN_RIGHT,
        ATTR_MARGIN_TOP,
        ATTR_TEXT_ALIGNMENT,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_COLOR] = { "color", false, NULL },
        [ATTR_COLOR2] = { "color2", false, NULL },
        [ATTR_DECIMAL_OFFSET] = { "decimal-offset", false, NULL },
        [ATTR_FONT_FAMILY] = { "font-family", false, NULL },
        [ATTR_FONT_SIZE] = { "font-size", false, NULL },
        [ATTR_FONT_STYLE] = { "font-style", false, NULL },
        [ATTR_FONT_WEIGHT] = { "font-weight", false, NULL },
        [ATTR_ID] = { "id", false, NULL },
        [ATTR_LABEL_LOCATION_VERTICAL] = { "labelLocationVertical", false, NULL },
        [ATTR_MARGIN_BOTTOM] = { "margin-bottom", false, NULL },
        [ATTR_MARGIN_LEFT] = { "margin-left", false, NULL },
        [ATTR_MARGIN_RIGHT] = { "margin-right", false, NULL },
        [ATTR_MARGIN_TOP] = { "margin-top", false, NULL },
        [ATTR_TEXT_ALIGNMENT] = { "textAlignment", false, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvsx_style *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvsx_style_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->color = spvxml_attr_parse_color (&nctx, &attrs[ATTR_COLOR]);
    p->color2 = spvxml_attr_parse_color (&nctx, &attrs[ATTR_COLOR2]);
    p->decimal_offset = spvxml_attr_parse_dimension (&nctx, &attrs[ATTR_DECIMAL_OFFSET]);
    p->font_family = attrs[ATTR_FONT_FAMILY].value;
    attrs[ATTR_FONT_FAMILY].value = NULL;
    p->font_size = attrs[ATTR_FONT_SIZE].value;
    attrs[ATTR_FONT_SIZE].value = NULL;
    p->font_style = spvxml_attr_parse_enum (
        &nctx, &attrs[ATTR_FONT_STYLE], spvsx_font_style_map);
    p->font_weight = spvxml_attr_parse_enum (
        &nctx, &attrs[ATTR_FONT_WEIGHT], spvsx_font_weight_map);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    p->label_location_vertical = spvxml_attr_parse_enum (
        &nctx, &attrs[ATTR_LABEL_LOCATION_VERTICAL], spvsx_label_location_vertical_map);
    p->margin_bottom = spvxml_attr_parse_dimension (&nctx, &attrs[ATTR_MARGIN_BOTTOM]);
    p->margin_left = spvxml_attr_parse_dimension (&nctx, &attrs[ATTR_MARGIN_LEFT]);
    p->margin_right = spvxml_attr_parse_dimension (&nctx, &attrs[ATTR_MARGIN_RIGHT]);
    p->margin_top = spvxml_attr_parse_dimension (&nctx, &attrs[ATTR_MARGIN_TOP]);
    p->text_alignment = spvxml_attr_parse_enum (
        &nctx, &attrs[ATTR_TEXT_ALIGNMENT], spvsx_text_alignment_map);
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvsx_free_style (p);
        return false;
    }

    /* Parse content. */
    if (!spvxml_content_parse_end (&nctx, input->children)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvsx_free_style (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvsx_free_style (struct spvsx_style *p)
{
    if (!p)
        return;

    free (p->font_family);
    free (p->font_size);
    free (p->node_.id);
    free (p);
}

void
spvsx_collect_ids_style (struct spvxml_context *ctx, struct spvsx_style *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

}

bool
spvsx_is_style (const struct spvxml_node *node)
{
    return node->class_ == &spvsx_style_class;
}

struct spvsx_style *
spvsx_cast_style (const struct spvxml_node *node)
{
    return (node && spvsx_is_style (node)
            ? UP_CAST (node, struct spvsx_style, node_)
            : NULL);
}

void
spvsx_resolve_refs_style (struct spvxml_context *ctx UNUSED, struct spvsx_style *p UNUSED)
{
    if (!p)
        return;

}

static void
spvsx_do_free_style (struct spvxml_node *node)
{
    spvsx_free_style (UP_CAST (node, struct spvsx_style, node_));
}

static void
spvsx_do_collect_ids_style (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvsx_collect_ids_style (ctx, UP_CAST (node, struct spvsx_style, node_));
}

static void
spvsx_do_resolve_refs_style (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvsx_resolve_refs_style (ctx, UP_CAST (node, struct spvsx_style, node_));
}

struct spvxml_node_class spvsx_style_class = {
    "style",
    spvsx_do_free_style,
    spvsx_do_collect_ids_style,
    spvsx_do_resolve_refs_style,
};


static bool UNUSED
spvsx_try_parse_table (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvsx_table *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvsx_table *))
{
    xmlNode *next = *input;
    bool ok = sub (nctx, &next, p);
    if (ok)
        *input = next;
    else if (!nctx->up->hard_error) {
        free (nctx->up->error);
        nctx->up->error = NULL;
    }
    return ok;
}

static bool
spvsx_parse_table_2 (struct spvxml_node_context *nctx, xmlNode **input, struct spvsx_table *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "tableProperties", &node))
        return false;
    if (!spvsx_parse_table_properties (nctx->up, node, &p->table_properties))
        return false;
    return true;
}

static bool
spvsx_parse_table_1 (struct spvxml_node_context *nctx, xmlNode **input, struct spvsx_table *p)
{
    spvsx_try_parse_table (nctx, input, p, spvsx_parse_table_2);

    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "tableStructure", &node))
        return false;
    if (!spvsx_parse_table_structure (nctx->up, node, &p->table_structure))
        return false;
    return true;
}

bool
spvsx_parse_table (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvsx_table **p_)
{
    enum {
        ATTR_V_D_P_ID,
        ATTR_VI_ZML_SOURCE,
        ATTR_ACTIVE_PAGE_ID,
        ATTR_COMMAND_NAME,
        ATTR_CREATOR_VERSION,
        ATTR_DISPLAY_FILTERING,
        ATTR_ID,
        ATTR_MAX_NUM_CELLS,
        ATTR_ORPHAN_TOLERANCE,
        ATTR_ROW_BREAK_NUMBER,
        ATTR_SUB_TYPE,
        ATTR_TABLE_ID,
        ATTR_TABLE_LOOK_ID,
        ATTR_TABLE_TYPE,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_V_D_P_ID] = { "VDPId", false, NULL },
        [ATTR_VI_ZML_SOURCE] = { "ViZmlSource", false, NULL },
        [ATTR_ACTIVE_PAGE_ID] = { "activePageId", false, NULL },
        [ATTR_COMMAND_NAME] = { "commandName", true, NULL },
        [ATTR_CREATOR_VERSION] = { "creator-version", false, NULL },
        [ATTR_DISPLAY_FILTERING] = { "displayFiltering", false, NULL },
        [ATTR_ID] = { "id", false, NULL },
        [ATTR_MAX_NUM_CELLS] = { "maxNumCells", false, NULL },
        [ATTR_ORPHAN_TOLERANCE] = { "orphanTolerance", false, NULL },
        [ATTR_ROW_BREAK_NUMBER] = { "rowBreakNumber", false, NULL },
        [ATTR_SUB_TYPE] = { "subType", true, NULL },
        [ATTR_TABLE_ID] = { "tableId", true, NULL },
        [ATTR_TABLE_LOOK_ID] = { "tableLookId", false, NULL },
        [ATTR_TABLE_TYPE] = { "type", true, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvsx_table *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvsx_table_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->v_d_p_id = attrs[ATTR_V_D_P_ID].value;
    attrs[ATTR_V_D_P_ID].value = NULL;
    p->vi_zml_source = attrs[ATTR_VI_ZML_SOURCE].value;
    attrs[ATTR_VI_ZML_SOURCE].value = NULL;
    p->active_page_id = spvxml_attr_parse_int (&nctx, &attrs[ATTR_ACTIVE_PAGE_ID]);
    p->command_name = attrs[ATTR_COMMAND_NAME].value;
    attrs[ATTR_COMMAND_NAME].value = NULL;
    p->creator_version = attrs[ATTR_CREATOR_VERSION].value;
    attrs[ATTR_CREATOR_VERSION].value = NULL;
    p->display_filtering = spvxml_attr_parse_bool (&nctx, &attrs[ATTR_DISPLAY_FILTERING]);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    p->max_num_cells = spvxml_attr_parse_int (&nctx, &attrs[ATTR_MAX_NUM_CELLS]);
    p->orphan_tolerance = spvxml_attr_parse_int (&nctx, &attrs[ATTR_ORPHAN_TOLERANCE]);
    p->row_break_number = spvxml_attr_parse_int (&nctx, &attrs[ATTR_ROW_BREAK_NUMBER]);
    p->sub_type = attrs[ATTR_SUB_TYPE].value;
    attrs[ATTR_SUB_TYPE].value = NULL;
    p->table_id = attrs[ATTR_TABLE_ID].value;
    attrs[ATTR_TABLE_ID].value = NULL;
    p->table_look_id = attrs[ATTR_TABLE_LOOK_ID].value;
    attrs[ATTR_TABLE_LOOK_ID].value = NULL;
    p->table_type = spvxml_attr_parse_enum (
        &nctx, &attrs[ATTR_TABLE_TYPE], spvsx_table_type_map);
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvsx_free_table (p);
        return false;
    }

    /* Parse content. */
    input = input->children;
    if (!spvsx_parse_table_1 (&nctx, &input, p)
        || !spvxml_content_parse_end (&nctx, input)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvsx_free_table (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvsx_free_table (struct spvsx_table *p)
{
    if (!p)
        return;

    free (p->v_d_p_id);
    free (p->vi_zml_source);
    free (p->command_name);
    free (p->creator_version);
    free (p->sub_type);
    free (p->table_id);
    free (p->table_look_id);
    spvsx_free_table_properties (p->table_properties);
    spvsx_free_table_structure (p->table_structure);
    free (p->node_.id);
    free (p);
}

void
spvsx_collect_ids_table (struct spvxml_context *ctx, struct spvsx_table *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

    spvsx_collect_ids_table_properties (ctx, p->table_properties);
    spvsx_collect_ids_table_structure (ctx, p->table_structure);
}

bool
spvsx_is_table (const struct spvxml_node *node)
{
    return node->class_ == &spvsx_table_class;
}

struct spvsx_table *
spvsx_cast_table (const struct spvxml_node *node)
{
    return (node && spvsx_is_table (node)
            ? UP_CAST (node, struct spvsx_table, node_)
            : NULL);
}

void
spvsx_resolve_refs_table (struct spvxml_context *ctx UNUSED, struct spvsx_table *p UNUSED)
{
    if (!p)
        return;

    spvsx_resolve_refs_table_properties (ctx, p->table_properties);
    spvsx_resolve_refs_table_structure (ctx, p->table_structure);
}

static void
spvsx_do_free_table (struct spvxml_node *node)
{
    spvsx_free_table (UP_CAST (node, struct spvsx_table, node_));
}

static void
spvsx_do_collect_ids_table (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvsx_collect_ids_table (ctx, UP_CAST (node, struct spvsx_table, node_));
}

static void
spvsx_do_resolve_refs_table (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvsx_resolve_refs_table (ctx, UP_CAST (node, struct spvsx_table, node_));
}

struct spvxml_node_class spvsx_table_class = {
    "table",
    spvsx_do_free_table,
    spvsx_do_collect_ids_table,
    spvsx_do_resolve_refs_table,
};


static bool UNUSED
spvsx_try_parse_table_properties (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvsx_table_properties *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvsx_table_properties *))
{
    xmlNode *next = *input;
    bool ok = sub (nctx, &next, p);
    if (ok)
        *input = next;
    else if (!nctx->up->hard_error) {
        free (nctx->up->error);
        nctx->up->error = NULL;
    }
    return ok;
}

static bool
spvsx_parse_table_properties_1 (struct spvxml_node_context *nctx, xmlNode **input, struct spvsx_table_properties *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "generalProperties", &node))
        return false;
    if (!spvsx_parse_general_properties (nctx->up, node, &p->general_properties))
        return false;

    xmlNode *node2;
    if (!spvxml_content_parse_element (nctx, input, "footnoteProperties", &node2))
        return false;
    if (!spvsx_parse_footnote_properties (nctx->up, node2, &p->footnote_properties))
        return false;

    xmlNode *node3;
    if (!spvxml_content_parse_element (nctx, input, "cellFormatProperties", &node3))
        return false;
    if (!spvsx_parse_cell_format_properties (nctx->up, node3, &p->cell_format_properties))
        return false;

    xmlNode *node4;
    if (!spvxml_content_parse_element (nctx, input, "borderProperties", &node4))
        return false;
    if (!spvsx_parse_border_properties (nctx->up, node4, &p->border_properties))
        return false;

    xmlNode *node5;
    if (!spvxml_content_parse_element (nctx, input, "printingProperties", &node5))
        return false;
    if (!spvsx_parse_printing_properties (nctx->up, node5, &p->printing_properties))
        return false;
    return true;
}

bool
spvsx_parse_table_properties (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvsx_table_properties **p_)
{
    enum {
        ATTR_ID,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_ID] = { "id", false, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvsx_table_properties *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvsx_table_properties_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvsx_free_table_properties (p);
        return false;
    }

    /* Parse content. */
    input = input->children;
    if (!spvsx_parse_table_properties_1 (&nctx, &input, p)
        || !spvxml_content_parse_end (&nctx, input)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvsx_free_table_properties (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvsx_free_table_properties (struct spvsx_table_properties *p)
{
    if (!p)
        return;

    spvsx_free_general_properties (p->general_properties);
    spvsx_free_footnote_properties (p->footnote_properties);
    spvsx_free_cell_format_properties (p->cell_format_properties);
    spvsx_free_border_properties (p->border_properties);
    spvsx_free_printing_properties (p->printing_properties);
    free (p->node_.id);
    free (p);
}

void
spvsx_collect_ids_table_properties (struct spvxml_context *ctx, struct spvsx_table_properties *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

    spvsx_collect_ids_general_properties (ctx, p->general_properties);
    spvsx_collect_ids_footnote_properties (ctx, p->footnote_properties);
    spvsx_collect_ids_cell_format_properties (ctx, p->cell_format_properties);
    spvsx_collect_ids_border_properties (ctx, p->border_properties);
    spvsx_collect_ids_printing_properties (ctx, p->printing_properties);
}

bool
spvsx_is_table_properties (const struct spvxml_node *node)
{
    return node->class_ == &spvsx_table_properties_class;
}

struct spvsx_table_properties *
spvsx_cast_table_properties (const struct spvxml_node *node)
{
    return (node && spvsx_is_table_properties (node)
            ? UP_CAST (node, struct spvsx_table_properties, node_)
            : NULL);
}

void
spvsx_resolve_refs_table_properties (struct spvxml_context *ctx UNUSED, struct spvsx_table_properties *p UNUSED)
{
    if (!p)
        return;

    spvsx_resolve_refs_general_properties (ctx, p->general_properties);
    spvsx_resolve_refs_footnote_properties (ctx, p->footnote_properties);
    spvsx_resolve_refs_cell_format_properties (ctx, p->cell_format_properties);
    spvsx_resolve_refs_border_properties (ctx, p->border_properties);
    spvsx_resolve_refs_printing_properties (ctx, p->printing_properties);
}

static void
spvsx_do_free_table_properties (struct spvxml_node *node)
{
    spvsx_free_table_properties (UP_CAST (node, struct spvsx_table_properties, node_));
}

static void
spvsx_do_collect_ids_table_properties (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvsx_collect_ids_table_properties (ctx, UP_CAST (node, struct spvsx_table_properties, node_));
}

static void
spvsx_do_resolve_refs_table_properties (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvsx_resolve_refs_table_properties (ctx, UP_CAST (node, struct spvsx_table_properties, node_));
}

struct spvxml_node_class spvsx_table_properties_class = {
    "tableProperties",
    spvsx_do_free_table_properties,
    spvsx_do_collect_ids_table_properties,
    spvsx_do_resolve_refs_table_properties,
};


static bool UNUSED
spvsx_try_parse_table_structure (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvsx_table_structure *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvsx_table_structure *))
{
    xmlNode *next = *input;
    bool ok = sub (nctx, &next, p);
    if (ok)
        *input = next;
    else if (!nctx->up->hard_error) {
        free (nctx->up->error);
        nctx->up->error = NULL;
    }
    return ok;
}

static bool
spvsx_parse_table_structure_2 (struct spvxml_node_context *nctx, xmlNode **input, struct spvsx_table_structure *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "path", &node))
        return false;
    if (!spvsx_parse_path (nctx->up, node, &p->path))
        return false;
    return true;
}

static bool
spvsx_parse_table_structure_1 (struct spvxml_node_context *nctx, xmlNode **input, struct spvsx_table_structure *p)
{
    spvsx_try_parse_table_structure (nctx, input, p, spvsx_parse_table_structure_2);

    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "dataPath", &node))
        return false;
    if (!spvsx_parse_data_path (nctx->up, node, &p->data_path))
        return false;
    return true;
}

bool
spvsx_parse_table_structure (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvsx_table_structure **p_)
{
    enum {
        ATTR_ID,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_ID] = { "id", false, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvsx_table_structure *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvsx_table_structure_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvsx_free_table_structure (p);
        return false;
    }

    /* Parse content. */
    input = input->children;
    if (!spvsx_parse_table_structure_1 (&nctx, &input, p)
        || !spvxml_content_parse_end (&nctx, input)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvsx_free_table_structure (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvsx_free_table_structure (struct spvsx_table_structure *p)
{
    if (!p)
        return;

    spvsx_free_path (p->path);
    spvsx_free_data_path (p->data_path);
    free (p->node_.id);
    free (p);
}

void
spvsx_collect_ids_table_structure (struct spvxml_context *ctx, struct spvsx_table_structure *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

    spvsx_collect_ids_path (ctx, p->path);
    spvsx_collect_ids_data_path (ctx, p->data_path);
}

bool
spvsx_is_table_structure (const struct spvxml_node *node)
{
    return node->class_ == &spvsx_table_structure_class;
}

struct spvsx_table_structure *
spvsx_cast_table_structure (const struct spvxml_node *node)
{
    return (node && spvsx_is_table_structure (node)
            ? UP_CAST (node, struct spvsx_table_structure, node_)
            : NULL);
}

void
spvsx_resolve_refs_table_structure (struct spvxml_context *ctx UNUSED, struct spvsx_table_structure *p UNUSED)
{
    if (!p)
        return;

    spvsx_resolve_refs_path (ctx, p->path);
    spvsx_resolve_refs_data_path (ctx, p->data_path);
}

static void
spvsx_do_free_table_structure (struct spvxml_node *node)
{
    spvsx_free_table_structure (UP_CAST (node, struct spvsx_table_structure, node_));
}

static void
spvsx_do_collect_ids_table_structure (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvsx_collect_ids_table_structure (ctx, UP_CAST (node, struct spvsx_table_structure, node_));
}

static void
spvsx_do_resolve_refs_table_structure (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvsx_resolve_refs_table_structure (ctx, UP_CAST (node, struct spvsx_table_structure, node_));
}

struct spvxml_node_class spvsx_table_structure_class = {
    "tableStructure",
    spvsx_do_free_table_structure,
    spvsx_do_collect_ids_table_structure,
    spvsx_do_resolve_refs_table_structure,
};


static bool UNUSED
spvsx_try_parse_tree (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvsx_tree *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvsx_tree *))
{
    xmlNode *next = *input;
    bool ok = sub (nctx, &next, p);
    if (ok)
        *input = next;
    else if (!nctx->up->hard_error) {
        free (nctx->up->error);
        nctx->up->error = NULL;
    }
    return ok;
}

static bool
spvsx_parse_tree_1 (struct spvxml_node_context *nctx, xmlNode **input, struct spvsx_tree *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "dataPath", &node))
        return false;
    if (!spvsx_parse_data_path (nctx->up, node, &p->data_path))
        return false;

    xmlNode *node2;
    if (!spvxml_content_parse_element (nctx, input, "path", &node2))
        return false;
    if (!spvsx_parse_path (nctx->up, node2, &p->path))
        return false;
    return true;
}

bool
spvsx_parse_tree (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvsx_tree **p_)
{
    enum {
        ATTR_COMMAND_NAME,
        ATTR_CREATOR_VERSION,
        ATTR_ID,
        ATTR_NAME,
        ATTR_TYPE,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_COMMAND_NAME] = { "commandName", true, NULL },
        [ATTR_CREATOR_VERSION] = { "creator-version", true, NULL },
        [ATTR_ID] = { "id", false, NULL },
        [ATTR_NAME] = { "name", true, NULL },
        [ATTR_TYPE] = { "type", true, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvsx_tree *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvsx_tree_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->command_name = attrs[ATTR_COMMAND_NAME].value;
    attrs[ATTR_COMMAND_NAME].value = NULL;
    p->creator_version = attrs[ATTR_CREATOR_VERSION].value;
    attrs[ATTR_CREATOR_VERSION].value = NULL;
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    p->name = attrs[ATTR_NAME].value;
    attrs[ATTR_NAME].value = NULL;
    p->type = attrs[ATTR_TYPE].value;
    attrs[ATTR_TYPE].value = NULL;
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvsx_free_tree (p);
        return false;
    }

    /* Parse content. */
    input = input->children;
    if (!spvsx_parse_tree_1 (&nctx, &input, p)
        || !spvxml_content_parse_end (&nctx, input)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvsx_free_tree (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvsx_free_tree (struct spvsx_tree *p)
{
    if (!p)
        return;

    free (p->command_name);
    free (p->creator_version);
    free (p->name);
    free (p->type);
    spvsx_free_data_path (p->data_path);
    spvsx_free_path (p->path);
    free (p->node_.id);
    free (p);
}

void
spvsx_collect_ids_tree (struct spvxml_context *ctx, struct spvsx_tree *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

    spvsx_collect_ids_data_path (ctx, p->data_path);
    spvsx_collect_ids_path (ctx, p->path);
}

bool
spvsx_is_tree (const struct spvxml_node *node)
{
    return node->class_ == &spvsx_tree_class;
}

struct spvsx_tree *
spvsx_cast_tree (const struct spvxml_node *node)
{
    return (node && spvsx_is_tree (node)
            ? UP_CAST (node, struct spvsx_tree, node_)
            : NULL);
}

void
spvsx_resolve_refs_tree (struct spvxml_context *ctx UNUSED, struct spvsx_tree *p UNUSED)
{
    if (!p)
        return;

    spvsx_resolve_refs_data_path (ctx, p->data_path);
    spvsx_resolve_refs_path (ctx, p->path);
}

static void
spvsx_do_free_tree (struct spvxml_node *node)
{
    spvsx_free_tree (UP_CAST (node, struct spvsx_tree, node_));
}

static void
spvsx_do_collect_ids_tree (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvsx_collect_ids_tree (ctx, UP_CAST (node, struct spvsx_tree, node_));
}

static void
spvsx_do_resolve_refs_tree (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvsx_resolve_refs_tree (ctx, UP_CAST (node, struct spvsx_tree, node_));
}

struct spvxml_node_class spvsx_tree_class = {
    "tree",
    spvsx_do_free_tree,
    spvsx_do_collect_ids_tree,
    spvsx_do_resolve_refs_tree,
};

