/* Generated automatically -- do not modify!    -*- buffer-read-only: t -*- */
#include <config.h>
#include "output/spv/detail-xml-parser.h"
#include <limits.h>
#include <stdio.h>
#include <stdlib.h>
#include "libpspp/cast.h"
#include "libpspp/str.h"
#include "gl/xalloc.h"



static const struct spvxml_enum spvdx_border_bottom_map[] = {
    { "double", SPVDX_BORDER_BOTTOM_DOUBLE },
    { "none", SPVDX_BORDER_BOTTOM_NONE },
    { "solid", SPVDX_BORDER_BOTTOM_SOLID },
    { "thick", SPVDX_BORDER_BOTTOM_THICK },
    { "thin", SPVDX_BORDER_BOTTOM_THIN },
    { NULL, 0 },
};

const char *
spvdx_border_bottom_to_string (enum spvdx_border_bottom border_bottom)
{
    switch (border_bottom) {
    case SPVDX_BORDER_BOTTOM_DOUBLE: return "double";
    case SPVDX_BORDER_BOTTOM_NONE: return "none";
    case SPVDX_BORDER_BOTTOM_SOLID: return "solid";
    case SPVDX_BORDER_BOTTOM_THICK: return "thick";
    case SPVDX_BORDER_BOTTOM_THIN: return "thin";
    default: return NULL;
    }
}

static const struct spvxml_enum spvdx_border_left_map[] = {
    { "double", SPVDX_BORDER_LEFT_DOUBLE },
    { "none", SPVDX_BORDER_LEFT_NONE },
    { "solid", SPVDX_BORDER_LEFT_SOLID },
    { "thick", SPVDX_BORDER_LEFT_THICK },
    { "thin", SPVDX_BORDER_LEFT_THIN },
    { NULL, 0 },
};

const char *
spvdx_border_left_to_string (enum spvdx_border_left border_left)
{
    switch (border_left) {
    case SPVDX_BORDER_LEFT_DOUBLE: return "double";
    case SPVDX_BORDER_LEFT_NONE: return "none";
    case SPVDX_BORDER_LEFT_SOLID: return "solid";
    case SPVDX_BORDER_LEFT_THICK: return "thick";
    case SPVDX_BORDER_LEFT_THIN: return "thin";
    default: return NULL;
    }
}

static const struct spvxml_enum spvdx_border_right_map[] = {
    { "double", SPVDX_BORDER_RIGHT_DOUBLE },
    { "none", SPVDX_BORDER_RIGHT_NONE },
    { "solid", SPVDX_BORDER_RIGHT_SOLID },
    { "thick", SPVDX_BORDER_RIGHT_THICK },
    { "thin", SPVDX_BORDER_RIGHT_THIN },
    { NULL, 0 },
};

const char *
spvdx_border_right_to_string (enum spvdx_border_right border_right)
{
    switch (border_right) {
    case SPVDX_BORDER_RIGHT_DOUBLE: return "double";
    case SPVDX_BORDER_RIGHT_NONE: return "none";
    case SPVDX_BORDER_RIGHT_SOLID: return "solid";
    case SPVDX_BORDER_RIGHT_THICK: return "thick";
    case SPVDX_BORDER_RIGHT_THIN: return "thin";
    default: return NULL;
    }
}

static const struct spvxml_enum spvdx_border_top_map[] = {
    { "double", SPVDX_BORDER_TOP_DOUBLE },
    { "none", SPVDX_BORDER_TOP_NONE },
    { "solid", SPVDX_BORDER_TOP_SOLID },
    { "thick", SPVDX_BORDER_TOP_THICK },
    { "thin", SPVDX_BORDER_TOP_THIN },
    { NULL, 0 },
};

const char *
spvdx_border_top_to_string (enum spvdx_border_top border_top)
{
    switch (border_top) {
    case SPVDX_BORDER_TOP_DOUBLE: return "double";
    case SPVDX_BORDER_TOP_NONE: return "none";
    case SPVDX_BORDER_TOP_SOLID: return "solid";
    case SPVDX_BORDER_TOP_THICK: return "thick";
    case SPVDX_BORDER_TOP_THIN: return "thin";
    default: return NULL;
    }
}

static const struct spvxml_enum spvdx_day_type_map[] = {
    { "month", SPVDX_DAY_TYPE_MONTH },
    { "year", SPVDX_DAY_TYPE_YEAR },
    { NULL, 0 },
};

const char *
spvdx_day_type_to_string (enum spvdx_day_type day_type)
{
    switch (day_type) {
    case SPVDX_DAY_TYPE_MONTH: return "month";
    case SPVDX_DAY_TYPE_YEAR: return "year";
    default: return NULL;
    }
}

static const struct spvxml_enum spvdx_dt_base_format_map[] = {
    { "date", SPVDX_DT_BASE_FORMAT_DATE },
    { "dateTime", SPVDX_DT_BASE_FORMAT_DATE_TIME },
    { "time", SPVDX_DT_BASE_FORMAT_TIME },
    { NULL, 0 },
};

const char *
spvdx_dt_base_format_to_string (enum spvdx_dt_base_format dt_base_format)
{
    switch (dt_base_format) {
    case SPVDX_DT_BASE_FORMAT_DATE: return "date";
    case SPVDX_DT_BASE_FORMAT_DATE_TIME: return "dateTime";
    case SPVDX_DT_BASE_FORMAT_TIME: return "time";
    default: return NULL;
    }
}

static const struct spvxml_enum spvdx_f_base_format_map[] = {
    { "date", SPVDX_F_BASE_FORMAT_DATE },
    { "dateTime", SPVDX_F_BASE_FORMAT_DATE_TIME },
    { "elapsedTime", SPVDX_F_BASE_FORMAT_ELAPSED_TIME },
    { "time", SPVDX_F_BASE_FORMAT_TIME },
    { NULL, 0 },
};

const char *
spvdx_f_base_format_to_string (enum spvdx_f_base_format f_base_format)
{
    switch (f_base_format) {
    case SPVDX_F_BASE_FORMAT_DATE: return "date";
    case SPVDX_F_BASE_FORMAT_DATE_TIME: return "dateTime";
    case SPVDX_F_BASE_FORMAT_ELAPSED_TIME: return "elapsedTime";
    case SPVDX_F_BASE_FORMAT_TIME: return "time";
    default: return NULL;
    }
}

static const struct spvxml_enum spvdx_fit_cells_map[] = {
    { "both", SPVDX_FIT_CELLS_BOTH },
    { "ticks", SPVDX_FIT_CELLS_TICKS },
    { NULL, 0 },
};

const char *
spvdx_fit_cells_to_string (enum spvdx_fit_cells fit_cells)
{
    switch (fit_cells) {
    case SPVDX_FIT_CELLS_BOTH: return "both";
    case SPVDX_FIT_CELLS_TICKS: return "ticks";
    default: return NULL;
    }
}

static const struct spvxml_enum spvdx_font_style_map[] = {
    { "italic", SPVDX_FONT_STYLE_ITALIC },
    { "regular", SPVDX_FONT_STYLE_REGULAR },
    { NULL, 0 },
};

const char *
spvdx_font_style_to_string (enum spvdx_font_style font_style)
{
    switch (font_style) {
    case SPVDX_FONT_STYLE_ITALIC: return "italic";
    case SPVDX_FONT_STYLE_REGULAR: return "regular";
    default: return NULL;
    }
}

static const struct spvxml_enum spvdx_font_underline_map[] = {
    { "none", SPVDX_FONT_UNDERLINE_NONE },
    { "underline", SPVDX_FONT_UNDERLINE_UNDERLINE },
    { NULL, 0 },
};

const char *
spvdx_font_underline_to_string (enum spvdx_font_underline font_underline)
{
    switch (font_underline) {
    case SPVDX_FONT_UNDERLINE_NONE: return "none";
    case SPVDX_FONT_UNDERLINE_UNDERLINE: return "underline";
    default: return NULL;
    }
}

static const struct spvxml_enum spvdx_font_weight_map[] = {
    { "bold", SPVDX_FONT_WEIGHT_BOLD },
    { "regular", SPVDX_FONT_WEIGHT_REGULAR },
    { NULL, 0 },
};

const char *
spvdx_font_weight_to_string (enum spvdx_font_weight font_weight)
{
    switch (font_weight) {
    case SPVDX_FONT_WEIGHT_BOLD: return "bold";
    case SPVDX_FONT_WEIGHT_REGULAR: return "regular";
    default: return NULL;
    }
}

static const struct spvxml_enum spvdx_hour_format_map[] = {
    { "AMPM", SPVDX_HOUR_FORMAT_A_M_P_M },
    { "AS_12", SPVDX_HOUR_FORMAT_A_S_12 },
    { "AS_24", SPVDX_HOUR_FORMAT_A_S_24 },
    { NULL, 0 },
};

const char *
spvdx_hour_format_to_string (enum spvdx_hour_format hour_format)
{
    switch (hour_format) {
    case SPVDX_HOUR_FORMAT_A_M_P_M: return "AMPM";
    case SPVDX_HOUR_FORMAT_A_S_12: return "AS_12";
    case SPVDX_HOUR_FORMAT_A_S_24: return "AS_24";
    default: return NULL;
    }
}

static const struct spvxml_enum spvdx_label_location_horizontal_map[] = {
    { "center", SPVDX_LABEL_LOCATION_HORIZONTAL_CENTER },
    { "negative", SPVDX_LABEL_LOCATION_HORIZONTAL_NEGATIVE },
    { "positive", SPVDX_LABEL_LOCATION_HORIZONTAL_POSITIVE },
    { NULL, 0 },
};

const char *
spvdx_label_location_horizontal_to_string (enum spvdx_label_location_horizontal label_location_horizontal)
{
    switch (label_location_horizontal) {
    case SPVDX_LABEL_LOCATION_HORIZONTAL_CENTER: return "center";
    case SPVDX_LABEL_LOCATION_HORIZONTAL_NEGATIVE: return "negative";
    case SPVDX_LABEL_LOCATION_HORIZONTAL_POSITIVE: return "positive";
    default: return NULL;
    }
}

static const struct spvxml_enum spvdx_label_location_vertical_map[] = {
    { "center", SPVDX_LABEL_LOCATION_VERTICAL_CENTER },
    { "negative", SPVDX_LABEL_LOCATION_VERTICAL_NEGATIVE },
    { "positive", SPVDX_LABEL_LOCATION_VERTICAL_POSITIVE },
    { NULL, 0 },
};

const char *
spvdx_label_location_vertical_to_string (enum spvdx_label_location_vertical label_location_vertical)
{
    switch (label_location_vertical) {
    case SPVDX_LABEL_LOCATION_VERTICAL_CENTER: return "center";
    case SPVDX_LABEL_LOCATION_VERTICAL_NEGATIVE: return "negative";
    case SPVDX_LABEL_LOCATION_VERTICAL_POSITIVE: return "positive";
    default: return NULL;
    }
}

static const struct spvxml_enum spvdx_mdy_order_map[] = {
    { "dayMonthYear", SPVDX_MDY_ORDER_DAY_MONTH_YEAR },
    { "monthDayYear", SPVDX_MDY_ORDER_MONTH_DAY_YEAR },
    { "yearMonthDay", SPVDX_MDY_ORDER_YEAR_MONTH_DAY },
    { NULL, 0 },
};

const char *
spvdx_mdy_order_to_string (enum spvdx_mdy_order mdy_order)
{
    switch (mdy_order) {
    case SPVDX_MDY_ORDER_DAY_MONTH_YEAR: return "dayMonthYear";
    case SPVDX_MDY_ORDER_MONTH_DAY_YEAR: return "monthDayYear";
    case SPVDX_MDY_ORDER_YEAR_MONTH_DAY: return "yearMonthDay";
    default: return NULL;
    }
}

static const struct spvxml_enum spvdx_method_map[] = {
    { "attach", SPVDX_METHOD_ATTACH },
    { "fixed", SPVDX_METHOD_FIXED },
    { "same", SPVDX_METHOD_SAME },
    { "sizeToContent", SPVDX_METHOD_SIZE_TO_CONTENT },
    { NULL, 0 },
};

const char *
spvdx_method_to_string (enum spvdx_method method)
{
    switch (method) {
    case SPVDX_METHOD_ATTACH: return "attach";
    case SPVDX_METHOD_FIXED: return "fixed";
    case SPVDX_METHOD_SAME: return "same";
    case SPVDX_METHOD_SIZE_TO_CONTENT: return "sizeToContent";
    default: return NULL;
    }
}

static const struct spvxml_enum spvdx_missing_map[] = {
    { "listwise", SPVDX_MISSING_LISTWISE },
    { "pairwise", SPVDX_MISSING_PAIRWISE },
    { NULL, 0 },
};

const char *
spvdx_missing_to_string (enum spvdx_missing missing)
{
    switch (missing) {
    case SPVDX_MISSING_LISTWISE: return "listwise";
    case SPVDX_MISSING_PAIRWISE: return "pairwise";
    default: return NULL;
    }
}

static const struct spvxml_enum spvdx_month_format_map[] = {
    { "long", SPVDX_MONTH_FORMAT_LONG },
    { "number", SPVDX_MONTH_FORMAT_NUMBER },
    { "paddedNumber", SPVDX_MONTH_FORMAT_PADDED_NUMBER },
    { "short", SPVDX_MONTH_FORMAT_SHORT },
    { NULL, 0 },
};

const char *
spvdx_month_format_to_string (enum spvdx_month_format month_format)
{
    switch (month_format) {
    case SPVDX_MONTH_FORMAT_LONG: return "long";
    case SPVDX_MONTH_FORMAT_NUMBER: return "number";
    case SPVDX_MONTH_FORMAT_PADDED_NUMBER: return "paddedNumber";
    case SPVDX_MONTH_FORMAT_SHORT: return "short";
    default: return NULL;
    }
}

static const struct spvxml_enum spvdx_name_map[] = {
    { "value", SPVDX_NAME_VALUE },
    { "variable", SPVDX_NAME_VARIABLE },
    { NULL, 0 },
};

const char *
spvdx_name_to_string (enum spvdx_name name)
{
    switch (name) {
    case SPVDX_NAME_VALUE: return "value";
    case SPVDX_NAME_VARIABLE: return "variable";
    default: return NULL;
    }
}

static const struct spvxml_enum spvdx_part_map[] = {
    { "bottom", SPVDX_PART_BOTTOM },
    { "height", SPVDX_PART_HEIGHT },
    { "left", SPVDX_PART_LEFT },
    { "right", SPVDX_PART_RIGHT },
    { "top", SPVDX_PART_TOP },
    { "width", SPVDX_PART_WIDTH },
    { NULL, 0 },
};

const char *
spvdx_part_to_string (enum spvdx_part part)
{
    switch (part) {
    case SPVDX_PART_BOTTOM: return "bottom";
    case SPVDX_PART_HEIGHT: return "height";
    case SPVDX_PART_LEFT: return "left";
    case SPVDX_PART_RIGHT: return "right";
    case SPVDX_PART_TOP: return "top";
    case SPVDX_PART_WIDTH: return "width";
    default: return NULL;
    }
}

static const struct spvxml_enum spvdx_position_map[] = {
    { "subscript", SPVDX_POSITION_SUBSCRIPT },
    { "superscript", SPVDX_POSITION_SUPERSCRIPT },
    { NULL, 0 },
};

const char *
spvdx_position_to_string (enum spvdx_position position)
{
    switch (position) {
    case SPVDX_POSITION_SUBSCRIPT: return "subscript";
    case SPVDX_POSITION_SUPERSCRIPT: return "superscript";
    default: return NULL;
    }
}

static const struct spvxml_enum spvdx_purpose_map[] = {
    { "footnote", SPVDX_PURPOSE_FOOTNOTE },
    { "layer", SPVDX_PURPOSE_LAYER },
    { "subSubTitle", SPVDX_PURPOSE_SUB_SUB_TITLE },
    { "subTitle", SPVDX_PURPOSE_SUB_TITLE },
    { "title", SPVDX_PURPOSE_TITLE },
    { NULL, 0 },
};

const char *
spvdx_purpose_to_string (enum spvdx_purpose purpose)
{
    switch (purpose) {
    case SPVDX_PURPOSE_FOOTNOTE: return "footnote";
    case SPVDX_PURPOSE_LAYER: return "layer";
    case SPVDX_PURPOSE_SUB_SUB_TITLE: return "subSubTitle";
    case SPVDX_PURPOSE_SUB_TITLE: return "subTitle";
    case SPVDX_PURPOSE_TITLE: return "title";
    default: return NULL;
    }
}

static const struct spvxml_enum spvdx_scientific_map[] = {
    { "false", SPVDX_SCIENTIFIC_FALSE },
    { "onlyForSmall", SPVDX_SCIENTIFIC_ONLY_FOR_SMALL },
    { "true", SPVDX_SCIENTIFIC_TRUE },
    { "whenNeeded", SPVDX_SCIENTIFIC_WHEN_NEEDED },
    { NULL, 0 },
};

const char *
spvdx_scientific_to_string (enum spvdx_scientific scientific)
{
    switch (scientific) {
    case SPVDX_SCIENTIFIC_FALSE: return "false";
    case SPVDX_SCIENTIFIC_ONLY_FOR_SMALL: return "onlyForSmall";
    case SPVDX_SCIENTIFIC_TRUE: return "true";
    case SPVDX_SCIENTIFIC_WHEN_NEEDED: return "whenNeeded";
    default: return NULL;
    }
}

static const struct spvxml_enum spvdx_text_alignment_map[] = {
    { "center", SPVDX_TEXT_ALIGNMENT_CENTER },
    { "decimal", SPVDX_TEXT_ALIGNMENT_DECIMAL },
    { "left", SPVDX_TEXT_ALIGNMENT_LEFT },
    { "mixed", SPVDX_TEXT_ALIGNMENT_MIXED },
    { "right", SPVDX_TEXT_ALIGNMENT_RIGHT },
    { NULL, 0 },
};

const char *
spvdx_text_alignment_to_string (enum spvdx_text_alignment text_alignment)
{
    switch (text_alignment) {
    case SPVDX_TEXT_ALIGNMENT_CENTER: return "center";
    case SPVDX_TEXT_ALIGNMENT_DECIMAL: return "decimal";
    case SPVDX_TEXT_ALIGNMENT_LEFT: return "left";
    case SPVDX_TEXT_ALIGNMENT_MIXED: return "mixed";
    case SPVDX_TEXT_ALIGNMENT_RIGHT: return "right";
    default: return NULL;
    }
}
static void spvdx_collect_ids_affix (struct spvxml_context *, struct spvdx_affix *);
static void spvdx_resolve_refs_affix (struct spvxml_context *ctx UNUSED, struct spvdx_affix *p UNUSED);

static void spvdx_collect_ids_alternating (struct spvxml_context *, struct spvdx_alternating *);
static void spvdx_resolve_refs_alternating (struct spvxml_context *ctx UNUSED, struct spvdx_alternating *p UNUSED);

static void spvdx_collect_ids_axis (struct spvxml_context *, struct spvdx_axis *);
static void spvdx_resolve_refs_axis (struct spvxml_context *ctx UNUSED, struct spvdx_axis *p UNUSED);

static void spvdx_collect_ids_categorical_domain (struct spvxml_context *, struct spvdx_categorical_domain *);
static void spvdx_resolve_refs_categorical_domain (struct spvxml_context *ctx UNUSED, struct spvdx_categorical_domain *p UNUSED);

static void spvdx_collect_ids_category_order (struct spvxml_context *, struct spvdx_category_order *);
static void spvdx_resolve_refs_category_order (struct spvxml_context *ctx UNUSED, struct spvdx_category_order *p UNUSED);

static void spvdx_collect_ids_container (struct spvxml_context *, struct spvdx_container *);
static void spvdx_resolve_refs_container (struct spvxml_context *ctx UNUSED, struct spvdx_container *p UNUSED);

static void spvdx_collect_ids_container_extension (struct spvxml_context *, struct spvdx_container_extension *);
static void spvdx_resolve_refs_container_extension (struct spvxml_context *ctx UNUSED, struct spvdx_container_extension *p UNUSED);

static void spvdx_collect_ids_coordinates (struct spvxml_context *, struct spvdx_coordinates *);
static void spvdx_resolve_refs_coordinates (struct spvxml_context *ctx UNUSED, struct spvdx_coordinates *p UNUSED);

static void spvdx_collect_ids_cross (struct spvxml_context *, struct spvdx_cross *);
static void spvdx_resolve_refs_cross (struct spvxml_context *ctx UNUSED, struct spvdx_cross *p UNUSED);

static void spvdx_collect_ids_date_time_format (struct spvxml_context *, struct spvdx_date_time_format *);
static void spvdx_resolve_refs_date_time_format (struct spvxml_context *ctx UNUSED, struct spvdx_date_time_format *p UNUSED);

static void spvdx_collect_ids_derived_variable (struct spvxml_context *, struct spvdx_derived_variable *);
static void spvdx_resolve_refs_derived_variable (struct spvxml_context *ctx UNUSED, struct spvdx_derived_variable *p UNUSED);

static void spvdx_collect_ids_description (struct spvxml_context *, struct spvdx_description *);
static void spvdx_resolve_refs_description (struct spvxml_context *ctx UNUSED, struct spvdx_description *p UNUSED);

static void spvdx_collect_ids_description_group (struct spvxml_context *, struct spvdx_description_group *);
static void spvdx_resolve_refs_description_group (struct spvxml_context *ctx UNUSED, struct spvdx_description_group *p UNUSED);

static void spvdx_collect_ids_elapsed_time_format (struct spvxml_context *, struct spvdx_elapsed_time_format *);
static void spvdx_resolve_refs_elapsed_time_format (struct spvxml_context *ctx UNUSED, struct spvdx_elapsed_time_format *p UNUSED);

static void spvdx_collect_ids_facet_layout (struct spvxml_context *, struct spvdx_facet_layout *);
static void spvdx_resolve_refs_facet_layout (struct spvxml_context *ctx UNUSED, struct spvdx_facet_layout *p UNUSED);

static void spvdx_collect_ids_facet_level (struct spvxml_context *, struct spvdx_facet_level *);
static void spvdx_resolve_refs_facet_level (struct spvxml_context *ctx UNUSED, struct spvdx_facet_level *p UNUSED);

static void spvdx_collect_ids_faceting (struct spvxml_context *, struct spvdx_faceting *);
static void spvdx_resolve_refs_faceting (struct spvxml_context *ctx UNUSED, struct spvdx_faceting *p UNUSED);

static void spvdx_collect_ids_footnote_mapping (struct spvxml_context *, struct spvdx_footnote_mapping *);
static void spvdx_resolve_refs_footnote_mapping (struct spvxml_context *ctx UNUSED, struct spvdx_footnote_mapping *p UNUSED);

static void spvdx_collect_ids_footnotes (struct spvxml_context *, struct spvdx_footnotes *);
static void spvdx_resolve_refs_footnotes (struct spvxml_context *ctx UNUSED, struct spvdx_footnotes *p UNUSED);

static void spvdx_collect_ids_format (struct spvxml_context *, struct spvdx_format *);
static void spvdx_resolve_refs_format (struct spvxml_context *ctx UNUSED, struct spvdx_format *p UNUSED);

static void spvdx_collect_ids_format_mapping (struct spvxml_context *, struct spvdx_format_mapping *);
static void spvdx_resolve_refs_format_mapping (struct spvxml_context *ctx UNUSED, struct spvdx_format_mapping *p UNUSED);

static void spvdx_collect_ids_formatting (struct spvxml_context *, struct spvdx_formatting *);
static void spvdx_resolve_refs_formatting (struct spvxml_context *ctx UNUSED, struct spvdx_formatting *p UNUSED);

static void spvdx_collect_ids_graph (struct spvxml_context *, struct spvdx_graph *);
static void spvdx_resolve_refs_graph (struct spvxml_context *ctx UNUSED, struct spvdx_graph *p UNUSED);

static void spvdx_collect_ids_gridline (struct spvxml_context *, struct spvdx_gridline *);
static void spvdx_resolve_refs_gridline (struct spvxml_context *ctx UNUSED, struct spvdx_gridline *p UNUSED);

static void spvdx_collect_ids_intersect (struct spvxml_context *, struct spvdx_intersect *);
static void spvdx_resolve_refs_intersect (struct spvxml_context *ctx UNUSED, struct spvdx_intersect *p UNUSED);

static void spvdx_collect_ids_intersect_where (struct spvxml_context *, struct spvdx_intersect_where *);
static void spvdx_resolve_refs_intersect_where (struct spvxml_context *ctx UNUSED, struct spvdx_intersect_where *p UNUSED);

static void spvdx_collect_ids_interval (struct spvxml_context *, struct spvdx_interval *);
static void spvdx_resolve_refs_interval (struct spvxml_context *ctx UNUSED, struct spvdx_interval *p UNUSED);

static void spvdx_collect_ids_label (struct spvxml_context *, struct spvdx_label *);
static void spvdx_resolve_refs_label (struct spvxml_context *ctx UNUSED, struct spvdx_label *p UNUSED);

static void spvdx_collect_ids_label_frame (struct spvxml_context *, struct spvdx_label_frame *);
static void spvdx_resolve_refs_label_frame (struct spvxml_context *ctx UNUSED, struct spvdx_label_frame *p UNUSED);

static void spvdx_collect_ids_labeling (struct spvxml_context *, struct spvdx_labeling *);
static void spvdx_resolve_refs_labeling (struct spvxml_context *ctx UNUSED, struct spvdx_labeling *p UNUSED);

static void spvdx_collect_ids_layer (struct spvxml_context *, struct spvdx_layer *);
static void spvdx_resolve_refs_layer (struct spvxml_context *ctx UNUSED, struct spvdx_layer *p UNUSED);

static void spvdx_collect_ids_layer_controller (struct spvxml_context *, struct spvdx_layer_controller *);
static void spvdx_resolve_refs_layer_controller (struct spvxml_context *ctx UNUSED, struct spvdx_layer_controller *p UNUSED);

static void spvdx_collect_ids_location (struct spvxml_context *, struct spvdx_location *);
static void spvdx_resolve_refs_location (struct spvxml_context *ctx UNUSED, struct spvdx_location *p UNUSED);

static void spvdx_collect_ids_major_ticks (struct spvxml_context *, struct spvdx_major_ticks *);
static void spvdx_resolve_refs_major_ticks (struct spvxml_context *ctx UNUSED, struct spvdx_major_ticks *p UNUSED);

static void spvdx_collect_ids_nest (struct spvxml_context *, struct spvdx_nest *);
static void spvdx_resolve_refs_nest (struct spvxml_context *ctx UNUSED, struct spvdx_nest *p UNUSED);

static void spvdx_collect_ids_number_format (struct spvxml_context *, struct spvdx_number_format *);
static void spvdx_resolve_refs_number_format (struct spvxml_context *ctx UNUSED, struct spvdx_number_format *p UNUSED);

static void spvdx_collect_ids_paragraph (struct spvxml_context *, struct spvdx_paragraph *);
static void spvdx_resolve_refs_paragraph (struct spvxml_context *ctx UNUSED, struct spvdx_paragraph *p UNUSED);

static void spvdx_collect_ids_relabel (struct spvxml_context *, struct spvdx_relabel *);
static void spvdx_resolve_refs_relabel (struct spvxml_context *ctx UNUSED, struct spvdx_relabel *p UNUSED);

static void spvdx_collect_ids_set_cell_properties (struct spvxml_context *, struct spvdx_set_cell_properties *);
static void spvdx_resolve_refs_set_cell_properties (struct spvxml_context *ctx UNUSED, struct spvdx_set_cell_properties *p UNUSED);

static void spvdx_collect_ids_set_format (struct spvxml_context *, struct spvdx_set_format *);
static void spvdx_resolve_refs_set_format (struct spvxml_context *ctx UNUSED, struct spvdx_set_format *p UNUSED);

static void spvdx_collect_ids_set_frame_style (struct spvxml_context *, struct spvdx_set_frame_style *);
static void spvdx_resolve_refs_set_frame_style (struct spvxml_context *ctx UNUSED, struct spvdx_set_frame_style *p UNUSED);

static void spvdx_collect_ids_set_meta_data (struct spvxml_context *, struct spvdx_set_meta_data *);
static void spvdx_resolve_refs_set_meta_data (struct spvxml_context *ctx UNUSED, struct spvdx_set_meta_data *p UNUSED);

static void spvdx_collect_ids_set_style (struct spvxml_context *, struct spvdx_set_style *);
static void spvdx_resolve_refs_set_style (struct spvxml_context *ctx UNUSED, struct spvdx_set_style *p UNUSED);

static void spvdx_collect_ids_simple_sort (struct spvxml_context *, struct spvdx_simple_sort *);
static void spvdx_resolve_refs_simple_sort (struct spvxml_context *ctx UNUSED, struct spvdx_simple_sort *p UNUSED);

static void spvdx_collect_ids_source_variable (struct spvxml_context *, struct spvdx_source_variable *);
static void spvdx_resolve_refs_source_variable (struct spvxml_context *ctx UNUSED, struct spvdx_source_variable *p UNUSED);

static void spvdx_collect_ids_string_format (struct spvxml_context *, struct spvdx_string_format *);
static void spvdx_resolve_refs_string_format (struct spvxml_context *ctx UNUSED, struct spvdx_string_format *p UNUSED);

static void spvdx_collect_ids_style (struct spvxml_context *, struct spvdx_style *);
static void spvdx_resolve_refs_style (struct spvxml_context *ctx UNUSED, struct spvdx_style *p UNUSED);

static void spvdx_collect_ids_table_layout (struct spvxml_context *, struct spvdx_table_layout *);
static void spvdx_resolve_refs_table_layout (struct spvxml_context *ctx UNUSED, struct spvdx_table_layout *p UNUSED);

static void spvdx_collect_ids_text (struct spvxml_context *, struct spvdx_text *);
static void spvdx_resolve_refs_text (struct spvxml_context *ctx UNUSED, struct spvdx_text *p UNUSED);

static void spvdx_collect_ids_union (struct spvxml_context *, struct spvdx_union *);
static void spvdx_resolve_refs_union (struct spvxml_context *ctx UNUSED, struct spvdx_union *p UNUSED);

static void spvdx_collect_ids_unity (struct spvxml_context *, struct spvdx_unity *);
static void spvdx_resolve_refs_unity (struct spvxml_context *ctx UNUSED, struct spvdx_unity *p UNUSED);

static void spvdx_collect_ids_user_source (struct spvxml_context *, struct spvdx_user_source *);
static void spvdx_resolve_refs_user_source (struct spvxml_context *ctx UNUSED, struct spvdx_user_source *p UNUSED);

static void spvdx_collect_ids_value_map_entry (struct spvxml_context *, struct spvdx_value_map_entry *);
static void spvdx_resolve_refs_value_map_entry (struct spvxml_context *ctx UNUSED, struct spvdx_value_map_entry *p UNUSED);

static void spvdx_collect_ids_variable_reference (struct spvxml_context *, struct spvdx_variable_reference *);
static void spvdx_resolve_refs_variable_reference (struct spvxml_context *ctx UNUSED, struct spvdx_variable_reference *p UNUSED);

static void spvdx_collect_ids_variable_extension (struct spvxml_context *, struct spvdx_variable_extension *);
static void spvdx_resolve_refs_variable_extension (struct spvxml_context *ctx UNUSED, struct spvdx_variable_extension *p UNUSED);

static void spvdx_collect_ids_visualization (struct spvxml_context *, struct spvdx_visualization *);
static void spvdx_resolve_refs_visualization (struct spvxml_context *ctx UNUSED, struct spvdx_visualization *p UNUSED);

static void spvdx_collect_ids_visualization_extension (struct spvxml_context *, struct spvdx_visualization_extension *);
static void spvdx_resolve_refs_visualization_extension (struct spvxml_context *ctx UNUSED, struct spvdx_visualization_extension *p UNUSED);

static void spvdx_collect_ids_where (struct spvxml_context *, struct spvdx_where *);
static void spvdx_resolve_refs_where (struct spvxml_context *ctx UNUSED, struct spvdx_where *p UNUSED);


static bool UNUSED
spvdx_try_parse_affix (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvdx_affix *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvdx_affix *))
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
spvdx_parse_affix (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvdx_affix **p_)
{
    enum {
        ATTR_DEFINES_REFERENCE,
        ATTR_ID,
        ATTR_POSITION,
        ATTR_SUFFIX,
        ATTR_VALUE,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_DEFINES_REFERENCE] = { "definesReference", true, NULL },
        [ATTR_ID] = { "id", false, NULL },
        [ATTR_POSITION] = { "position", true, NULL },
        [ATTR_SUFFIX] = { "suffix", true, NULL },
        [ATTR_VALUE] = { "value", true, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvdx_affix *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvdx_affix_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->defines_reference = spvxml_attr_parse_int (&nctx, &attrs[ATTR_DEFINES_REFERENCE]);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    p->position = spvxml_attr_parse_enum (
        &nctx, &attrs[ATTR_POSITION], spvdx_position_map);
    p->suffix = spvxml_attr_parse_bool (&nctx, &attrs[ATTR_SUFFIX]);
    p->value = attrs[ATTR_VALUE].value;
    attrs[ATTR_VALUE].value = NULL;
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvdx_free_affix (p);
        return false;
    }

    /* Parse content. */
    if (!spvxml_content_parse_end (&nctx, input->children)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvdx_free_affix (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvdx_free_affix (struct spvdx_affix *p)
{
    if (!p)
        return;

    free (p->value);
    free (p->node_.id);
    free (p);
}

void
spvdx_collect_ids_affix (struct spvxml_context *ctx, struct spvdx_affix *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

}

bool
spvdx_is_affix (const struct spvxml_node *node)
{
    return node->class_ == &spvdx_affix_class;
}

struct spvdx_affix *
spvdx_cast_affix (const struct spvxml_node *node)
{
    return (node && spvdx_is_affix (node)
            ? UP_CAST (node, struct spvdx_affix, node_)
            : NULL);
}

void
spvdx_resolve_refs_affix (struct spvxml_context *ctx UNUSED, struct spvdx_affix *p UNUSED)
{
    if (!p)
        return;

}

static void
spvdx_do_free_affix (struct spvxml_node *node)
{
    spvdx_free_affix (UP_CAST (node, struct spvdx_affix, node_));
}

static void
spvdx_do_collect_ids_affix (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_collect_ids_affix (ctx, UP_CAST (node, struct spvdx_affix, node_));
}

static void
spvdx_do_resolve_refs_affix (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_resolve_refs_affix (ctx, UP_CAST (node, struct spvdx_affix, node_));
}

struct spvxml_node_class spvdx_affix_class = {
    "affix",
    spvdx_do_free_affix,
    spvdx_do_collect_ids_affix,
    spvdx_do_resolve_refs_affix,
};


static bool UNUSED
spvdx_try_parse_alternating (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvdx_alternating *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvdx_alternating *))
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
spvdx_parse_alternating (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvdx_alternating **p_)
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
    struct spvdx_alternating *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvdx_alternating_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvdx_free_alternating (p);
        return false;
    }

    /* Parse content. */
    if (!spvxml_content_parse_end (&nctx, input->children)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvdx_free_alternating (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvdx_free_alternating (struct spvdx_alternating *p)
{
    if (!p)
        return;

    free (p->node_.id);
    free (p);
}

void
spvdx_collect_ids_alternating (struct spvxml_context *ctx, struct spvdx_alternating *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

}

bool
spvdx_is_alternating (const struct spvxml_node *node)
{
    return node->class_ == &spvdx_alternating_class;
}

struct spvdx_alternating *
spvdx_cast_alternating (const struct spvxml_node *node)
{
    return (node && spvdx_is_alternating (node)
            ? UP_CAST (node, struct spvdx_alternating, node_)
            : NULL);
}

void
spvdx_resolve_refs_alternating (struct spvxml_context *ctx UNUSED, struct spvdx_alternating *p UNUSED)
{
    if (!p)
        return;

}

static void
spvdx_do_free_alternating (struct spvxml_node *node)
{
    spvdx_free_alternating (UP_CAST (node, struct spvdx_alternating, node_));
}

static void
spvdx_do_collect_ids_alternating (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_collect_ids_alternating (ctx, UP_CAST (node, struct spvdx_alternating, node_));
}

static void
spvdx_do_resolve_refs_alternating (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_resolve_refs_alternating (ctx, UP_CAST (node, struct spvdx_alternating, node_));
}

struct spvxml_node_class spvdx_alternating_class = {
    "alternating",
    spvdx_do_free_alternating,
    spvdx_do_collect_ids_alternating,
    spvdx_do_resolve_refs_alternating,
};


static bool UNUSED
spvdx_try_parse_axis (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvdx_axis *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvdx_axis *))
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
spvdx_parse_axis_2 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_axis *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "label", &node))
        return false;
    if (!spvdx_parse_label (nctx->up, node, &p->label))
        return false;
    return true;
}

static bool
spvdx_parse_axis_1 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_axis *p)
{
    spvdx_try_parse_axis (nctx, input, p, spvdx_parse_axis_2);

    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "majorTicks", &node))
        return false;
    if (!spvdx_parse_major_ticks (nctx->up, node, &p->major_ticks))
        return false;
    return true;
}

bool
spvdx_parse_axis (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvdx_axis **p_)
{
    enum {
        ATTR_ID,
        ATTR_STYLE,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_ID] = { "id", false, NULL },
        [ATTR_STYLE] = { "style", true, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvdx_axis *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvdx_axis_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvdx_free_axis (p);
        return false;
    }

    /* Parse content. */
    input = input->children;
    if (!spvdx_parse_axis_1 (&nctx, &input, p)
        || !spvxml_content_parse_end (&nctx, input)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvdx_free_axis (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvdx_free_axis (struct spvdx_axis *p)
{
    if (!p)
        return;

    spvdx_free_label (p->label);
    spvdx_free_major_ticks (p->major_ticks);
    free (p->node_.id);
    free (p);
}

void
spvdx_collect_ids_axis (struct spvxml_context *ctx, struct spvdx_axis *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

    spvdx_collect_ids_label (ctx, p->label);
    spvdx_collect_ids_major_ticks (ctx, p->major_ticks);
}

bool
spvdx_is_axis (const struct spvxml_node *node)
{
    return node->class_ == &spvdx_axis_class;
}

struct spvdx_axis *
spvdx_cast_axis (const struct spvxml_node *node)
{
    return (node && spvdx_is_axis (node)
            ? UP_CAST (node, struct spvdx_axis, node_)
            : NULL);
}

void
spvdx_resolve_refs_axis (struct spvxml_context *ctx UNUSED, struct spvdx_axis *p UNUSED)
{
    if (!p)
        return;

    static const struct spvxml_node_class *const classes
        = &spvdx_style_class;
    p->style = spvdx_cast_style (spvxml_node_resolve_ref (ctx, p->node_.raw, "style", &classes, 1));
    spvdx_resolve_refs_label (ctx, p->label);
    spvdx_resolve_refs_major_ticks (ctx, p->major_ticks);
}

static void
spvdx_do_free_axis (struct spvxml_node *node)
{
    spvdx_free_axis (UP_CAST (node, struct spvdx_axis, node_));
}

static void
spvdx_do_collect_ids_axis (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_collect_ids_axis (ctx, UP_CAST (node, struct spvdx_axis, node_));
}

static void
spvdx_do_resolve_refs_axis (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_resolve_refs_axis (ctx, UP_CAST (node, struct spvdx_axis, node_));
}

struct spvxml_node_class spvdx_axis_class = {
    "axis",
    spvdx_do_free_axis,
    spvdx_do_collect_ids_axis,
    spvdx_do_resolve_refs_axis,
};


static bool UNUSED
spvdx_try_parse_categorical_domain (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvdx_categorical_domain *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvdx_categorical_domain *))
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
spvdx_parse_categorical_domain_1 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_categorical_domain *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "variableReference", &node))
        return false;
    if (!spvdx_parse_variable_reference (nctx->up, node, &p->variable_reference))
        return false;

    xmlNode *node2;
    if (!spvxml_content_parse_element (nctx, input, "simpleSort", &node2))
        return false;
    if (!spvdx_parse_simple_sort (nctx->up, node2, &p->simple_sort))
        return false;
    return true;
}

bool
spvdx_parse_categorical_domain (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvdx_categorical_domain **p_)
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
    struct spvdx_categorical_domain *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvdx_categorical_domain_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvdx_free_categorical_domain (p);
        return false;
    }

    /* Parse content. */
    input = input->children;
    if (!spvdx_parse_categorical_domain_1 (&nctx, &input, p)
        || !spvxml_content_parse_end (&nctx, input)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvdx_free_categorical_domain (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvdx_free_categorical_domain (struct spvdx_categorical_domain *p)
{
    if (!p)
        return;

    spvdx_free_variable_reference (p->variable_reference);
    spvdx_free_simple_sort (p->simple_sort);
    free (p->node_.id);
    free (p);
}

void
spvdx_collect_ids_categorical_domain (struct spvxml_context *ctx, struct spvdx_categorical_domain *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

    spvdx_collect_ids_variable_reference (ctx, p->variable_reference);
    spvdx_collect_ids_simple_sort (ctx, p->simple_sort);
}

bool
spvdx_is_categorical_domain (const struct spvxml_node *node)
{
    return node->class_ == &spvdx_categorical_domain_class;
}

struct spvdx_categorical_domain *
spvdx_cast_categorical_domain (const struct spvxml_node *node)
{
    return (node && spvdx_is_categorical_domain (node)
            ? UP_CAST (node, struct spvdx_categorical_domain, node_)
            : NULL);
}

void
spvdx_resolve_refs_categorical_domain (struct spvxml_context *ctx UNUSED, struct spvdx_categorical_domain *p UNUSED)
{
    if (!p)
        return;

    spvdx_resolve_refs_variable_reference (ctx, p->variable_reference);
    spvdx_resolve_refs_simple_sort (ctx, p->simple_sort);
}

static void
spvdx_do_free_categorical_domain (struct spvxml_node *node)
{
    spvdx_free_categorical_domain (UP_CAST (node, struct spvdx_categorical_domain, node_));
}

static void
spvdx_do_collect_ids_categorical_domain (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_collect_ids_categorical_domain (ctx, UP_CAST (node, struct spvdx_categorical_domain, node_));
}

static void
spvdx_do_resolve_refs_categorical_domain (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_resolve_refs_categorical_domain (ctx, UP_CAST (node, struct spvdx_categorical_domain, node_));
}

struct spvxml_node_class spvdx_categorical_domain_class = {
    "categoricalDomain",
    spvdx_do_free_categorical_domain,
    spvdx_do_collect_ids_categorical_domain,
    spvdx_do_resolve_refs_categorical_domain,
};


static bool UNUSED
spvdx_try_parse_category_order (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvdx_category_order *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvdx_category_order *))
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
spvdx_parse_category_order_1 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_category_order *p)
{
    if (!spvxml_content_parse_text (nctx, input, &p->text))
        return false;
    return true;
}

bool
spvdx_parse_category_order (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvdx_category_order **p_)
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
    struct spvdx_category_order *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvdx_category_order_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvdx_free_category_order (p);
        return false;
    }

    /* Parse content. */
    input = input->children;
    if (!spvdx_parse_category_order_1 (&nctx, &input, p)
        || !spvxml_content_parse_end (&nctx, input)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvdx_free_category_order (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvdx_free_category_order (struct spvdx_category_order *p)
{
    if (!p)
        return;

    free (p->text);
    free (p->node_.id);
    free (p);
}

void
spvdx_collect_ids_category_order (struct spvxml_context *ctx, struct spvdx_category_order *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

}

bool
spvdx_is_category_order (const struct spvxml_node *node)
{
    return node->class_ == &spvdx_category_order_class;
}

struct spvdx_category_order *
spvdx_cast_category_order (const struct spvxml_node *node)
{
    return (node && spvdx_is_category_order (node)
            ? UP_CAST (node, struct spvdx_category_order, node_)
            : NULL);
}

void
spvdx_resolve_refs_category_order (struct spvxml_context *ctx UNUSED, struct spvdx_category_order *p UNUSED)
{
    if (!p)
        return;

}

static void
spvdx_do_free_category_order (struct spvxml_node *node)
{
    spvdx_free_category_order (UP_CAST (node, struct spvdx_category_order, node_));
}

static void
spvdx_do_collect_ids_category_order (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_collect_ids_category_order (ctx, UP_CAST (node, struct spvdx_category_order, node_));
}

static void
spvdx_do_resolve_refs_category_order (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_resolve_refs_category_order (ctx, UP_CAST (node, struct spvdx_category_order, node_));
}

struct spvxml_node_class spvdx_category_order_class = {
    "categoryOrder",
    spvdx_do_free_category_order,
    spvdx_do_collect_ids_category_order,
    spvdx_do_resolve_refs_category_order,
};


static bool UNUSED
spvdx_try_parse_container (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvdx_container *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvdx_container *))
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
spvdx_parse_container_4 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_container *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "labelFrame", &node))
        return false;
    struct spvdx_label_frame *label_frame;
    if (!spvdx_parse_label_frame (nctx->up, node, &label_frame))
        return false;
    p->label_frame = xrealloc (p->label_frame, sizeof *p->label_frame * (p->n_label_frame + 1));
    p->label_frame[p->n_label_frame++] = label_frame;
    return true;
}

static bool
spvdx_parse_container_3 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_container *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "location", &node))
        return false;
    struct spvdx_location *location;
    if (!spvdx_parse_location (nctx->up, node, &location))
        return false;
    p->location = xrealloc (p->location, sizeof *p->location * (p->n_location + 1));
    p->location[p->n_location++] = location;
    return true;
}

static bool
spvdx_parse_container_2 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_container *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "extension", &node))
        return false;
    if (!spvdx_parse_container_extension (nctx->up, node, &p->container_extension))
        return false;
    return true;
}

static bool
spvdx_parse_container_1 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_container *p)
{
    spvdx_try_parse_container (nctx, input, p, spvdx_parse_container_2);
    if (!spvdx_parse_container_3 (nctx, input, p))
        return false;
    while (spvdx_try_parse_container (nctx, input, p, spvdx_parse_container_3))
        continue;
    while (spvdx_try_parse_container (nctx, input, p, spvdx_parse_container_4))
        continue;
    return true;
}

bool
spvdx_parse_container (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvdx_container **p_)
{
    enum {
        ATTR_ID,
        ATTR_STYLE,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_ID] = { "id", false, NULL },
        [ATTR_STYLE] = { "style", true, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvdx_container *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvdx_container_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvdx_free_container (p);
        return false;
    }

    /* Parse content. */
    input = input->children;
    if (!spvdx_parse_container_1 (&nctx, &input, p)
        || !spvxml_content_parse_end (&nctx, input)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvdx_free_container (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvdx_free_container (struct spvdx_container *p)
{
    if (!p)
        return;

    spvdx_free_container_extension (p->container_extension);
    for (size_t i = 0; i < p->n_location; i++)
        spvdx_free_location (p->location[i]);
    free (p->location);
    for (size_t i = 0; i < p->n_label_frame; i++)
        spvdx_free_label_frame (p->label_frame[i]);
    free (p->label_frame);
    free (p->node_.id);
    free (p);
}

void
spvdx_collect_ids_container (struct spvxml_context *ctx, struct spvdx_container *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

    spvdx_collect_ids_container_extension (ctx, p->container_extension);
    for (size_t i = 0; i < p->n_location; i++)
        spvdx_collect_ids_location (ctx, p->location[i]);
    for (size_t i = 0; i < p->n_label_frame; i++)
        spvdx_collect_ids_label_frame (ctx, p->label_frame[i]);
}

bool
spvdx_is_container (const struct spvxml_node *node)
{
    return node->class_ == &spvdx_container_class;
}

struct spvdx_container *
spvdx_cast_container (const struct spvxml_node *node)
{
    return (node && spvdx_is_container (node)
            ? UP_CAST (node, struct spvdx_container, node_)
            : NULL);
}

void
spvdx_resolve_refs_container (struct spvxml_context *ctx UNUSED, struct spvdx_container *p UNUSED)
{
    if (!p)
        return;

    static const struct spvxml_node_class *const classes
        = &spvdx_style_class;
    p->style = spvdx_cast_style (spvxml_node_resolve_ref (ctx, p->node_.raw, "style", &classes, 1));
    spvdx_resolve_refs_container_extension (ctx, p->container_extension);
    for (size_t i = 0; i < p->n_location; i++)
        spvdx_resolve_refs_location (ctx, p->location[i]);
    for (size_t i = 0; i < p->n_label_frame; i++)
        spvdx_resolve_refs_label_frame (ctx, p->label_frame[i]);
}

static void
spvdx_do_free_container (struct spvxml_node *node)
{
    spvdx_free_container (UP_CAST (node, struct spvdx_container, node_));
}

static void
spvdx_do_collect_ids_container (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_collect_ids_container (ctx, UP_CAST (node, struct spvdx_container, node_));
}

static void
spvdx_do_resolve_refs_container (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_resolve_refs_container (ctx, UP_CAST (node, struct spvdx_container, node_));
}

struct spvxml_node_class spvdx_container_class = {
    "container",
    spvdx_do_free_container,
    spvdx_do_collect_ids_container,
    spvdx_do_resolve_refs_container,
};


static bool UNUSED
spvdx_try_parse_container_extension (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvdx_container_extension *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvdx_container_extension *))
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
spvdx_parse_container_extension (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvdx_container_extension **p_)
{
    enum {
        ATTR_COMBINED_FOOTNOTES,
        ATTR_ID,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_COMBINED_FOOTNOTES] = { "combinedFootnotes", true, NULL },
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
    struct spvdx_container_extension *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvdx_container_extension_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    spvxml_attr_parse_fixed (&nctx, &attrs[ATTR_COMBINED_FOOTNOTES], "true");
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvdx_free_container_extension (p);
        return false;
    }

    /* Parse content. */
    if (!spvxml_content_parse_end (&nctx, input->children)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvdx_free_container_extension (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvdx_free_container_extension (struct spvdx_container_extension *p)
{
    if (!p)
        return;

    free (p->node_.id);
    free (p);
}

void
spvdx_collect_ids_container_extension (struct spvxml_context *ctx, struct spvdx_container_extension *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

}

bool
spvdx_is_container_extension (const struct spvxml_node *node)
{
    return node->class_ == &spvdx_container_extension_class;
}

struct spvdx_container_extension *
spvdx_cast_container_extension (const struct spvxml_node *node)
{
    return (node && spvdx_is_container_extension (node)
            ? UP_CAST (node, struct spvdx_container_extension, node_)
            : NULL);
}

void
spvdx_resolve_refs_container_extension (struct spvxml_context *ctx UNUSED, struct spvdx_container_extension *p UNUSED)
{
    if (!p)
        return;

}

static void
spvdx_do_free_container_extension (struct spvxml_node *node)
{
    spvdx_free_container_extension (UP_CAST (node, struct spvdx_container_extension, node_));
}

static void
spvdx_do_collect_ids_container_extension (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_collect_ids_container_extension (ctx, UP_CAST (node, struct spvdx_container_extension, node_));
}

static void
spvdx_do_resolve_refs_container_extension (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_resolve_refs_container_extension (ctx, UP_CAST (node, struct spvdx_container_extension, node_));
}

struct spvxml_node_class spvdx_container_extension_class = {
    "container_extension (extension)",
    spvdx_do_free_container_extension,
    spvdx_do_collect_ids_container_extension,
    spvdx_do_resolve_refs_container_extension,
};


static bool UNUSED
spvdx_try_parse_coordinates (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvdx_coordinates *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvdx_coordinates *))
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
spvdx_parse_coordinates (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvdx_coordinates **p_)
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
    struct spvdx_coordinates *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvdx_coordinates_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvdx_free_coordinates (p);
        return false;
    }

    /* Parse content. */
    if (!spvxml_content_parse_end (&nctx, input->children)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvdx_free_coordinates (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvdx_free_coordinates (struct spvdx_coordinates *p)
{
    if (!p)
        return;

    free (p->node_.id);
    free (p);
}

void
spvdx_collect_ids_coordinates (struct spvxml_context *ctx, struct spvdx_coordinates *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

}

bool
spvdx_is_coordinates (const struct spvxml_node *node)
{
    return node->class_ == &spvdx_coordinates_class;
}

struct spvdx_coordinates *
spvdx_cast_coordinates (const struct spvxml_node *node)
{
    return (node && spvdx_is_coordinates (node)
            ? UP_CAST (node, struct spvdx_coordinates, node_)
            : NULL);
}

void
spvdx_resolve_refs_coordinates (struct spvxml_context *ctx UNUSED, struct spvdx_coordinates *p UNUSED)
{
    if (!p)
        return;

}

static void
spvdx_do_free_coordinates (struct spvxml_node *node)
{
    spvdx_free_coordinates (UP_CAST (node, struct spvdx_coordinates, node_));
}

static void
spvdx_do_collect_ids_coordinates (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_collect_ids_coordinates (ctx, UP_CAST (node, struct spvdx_coordinates, node_));
}

static void
spvdx_do_resolve_refs_coordinates (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_resolve_refs_coordinates (ctx, UP_CAST (node, struct spvdx_coordinates, node_));
}

struct spvxml_node_class spvdx_coordinates_class = {
    "coordinates",
    spvdx_do_free_coordinates,
    spvdx_do_collect_ids_coordinates,
    spvdx_do_resolve_refs_coordinates,
};


static bool UNUSED
spvdx_try_parse_cross (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvdx_cross *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvdx_cross *))
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
spvdx_parse_cross_5 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_cross *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "nest", &node))
        return false;
    struct spvdx_nest *seq2;
    if (!spvdx_parse_nest (nctx->up, node, &seq2))
        return false;
    p->seq2 = xrealloc (p->seq2, sizeof *p->seq2 * (p->n_seq2 + 1));
    p->seq2[p->n_seq2++] = &seq2->node_;
    return true;
}

static bool
spvdx_parse_cross_4 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_cross *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "unity", &node))
        return false;
    struct spvdx_unity *seq2;
    if (!spvdx_parse_unity (nctx->up, node, &seq2))
        return false;
    p->seq2 = xrealloc (p->seq2, sizeof *p->seq2 * (p->n_seq2 + 1));
    p->seq2[p->n_seq2++] = &seq2->node_;
    return true;
}

static bool
spvdx_parse_cross_3 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_cross *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "nest", &node))
        return false;
    struct spvdx_nest *seq;
    if (!spvdx_parse_nest (nctx->up, node, &seq))
        return false;
    p->seq = xrealloc (p->seq, sizeof *p->seq * (p->n_seq + 1));
    p->seq[p->n_seq++] = &seq->node_;
    return true;
}

static bool
spvdx_parse_cross_2 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_cross *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "unity", &node))
        return false;
    struct spvdx_unity *seq;
    if (!spvdx_parse_unity (nctx->up, node, &seq))
        return false;
    p->seq = xrealloc (p->seq, sizeof *p->seq * (p->n_seq + 1));
    p->seq[p->n_seq++] = &seq->node_;
    return true;
}

static bool
spvdx_parse_cross_1 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_cross *p)
{
    if (!spvdx_try_parse_cross (nctx, input, p, spvdx_parse_cross_2)
        && !spvdx_try_parse_cross (nctx, input, p, spvdx_parse_cross_3))
      {
        spvxml_content_error (nctx, *input, "Syntax error.");
        return false;
      }
    if (!spvdx_try_parse_cross (nctx, input, p, spvdx_parse_cross_4)
        && !spvdx_try_parse_cross (nctx, input, p, spvdx_parse_cross_5))
      {
        spvxml_content_error (nctx, *input, "Syntax error.");
        return false;
      }
    return true;
}

bool
spvdx_parse_cross (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvdx_cross **p_)
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
    struct spvdx_cross *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvdx_cross_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvdx_free_cross (p);
        return false;
    }

    /* Parse content. */
    input = input->children;
    if (!spvdx_parse_cross_1 (&nctx, &input, p)
        || !spvxml_content_parse_end (&nctx, input)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvdx_free_cross (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvdx_free_cross (struct spvdx_cross *p)
{
    if (!p)
        return;

    for (size_t i = 0; i < p->n_seq; i++)
        p->seq[i]->class_->spvxml_node_free (p->seq[i]);
    free (p->seq);
    for (size_t i = 0; i < p->n_seq2; i++)
        p->seq2[i]->class_->spvxml_node_free (p->seq2[i]);
    free (p->seq2);
    free (p->node_.id);
    free (p);
}

void
spvdx_collect_ids_cross (struct spvxml_context *ctx, struct spvdx_cross *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

    for (size_t i = 0; i < p->n_seq; i++)
        p->seq[i]->class_->spvxml_node_collect_ids (ctx, p->seq[i]);
    for (size_t i = 0; i < p->n_seq2; i++)
        p->seq2[i]->class_->spvxml_node_collect_ids (ctx, p->seq2[i]);
}

bool
spvdx_is_cross (const struct spvxml_node *node)
{
    return node->class_ == &spvdx_cross_class;
}

struct spvdx_cross *
spvdx_cast_cross (const struct spvxml_node *node)
{
    return (node && spvdx_is_cross (node)
            ? UP_CAST (node, struct spvdx_cross, node_)
            : NULL);
}

void
spvdx_resolve_refs_cross (struct spvxml_context *ctx UNUSED, struct spvdx_cross *p UNUSED)
{
    if (!p)
        return;

    for (size_t i = 0; i < p->n_seq; i++)
        p->seq[i]->class_->spvxml_node_resolve_refs (ctx, p->seq[i]);
    for (size_t i = 0; i < p->n_seq2; i++)
        p->seq2[i]->class_->spvxml_node_resolve_refs (ctx, p->seq2[i]);
}

static void
spvdx_do_free_cross (struct spvxml_node *node)
{
    spvdx_free_cross (UP_CAST (node, struct spvdx_cross, node_));
}

static void
spvdx_do_collect_ids_cross (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_collect_ids_cross (ctx, UP_CAST (node, struct spvdx_cross, node_));
}

static void
spvdx_do_resolve_refs_cross (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_resolve_refs_cross (ctx, UP_CAST (node, struct spvdx_cross, node_));
}

struct spvxml_node_class spvdx_cross_class = {
    "cross",
    spvdx_do_free_cross,
    spvdx_do_collect_ids_cross,
    spvdx_do_resolve_refs_cross,
};


static bool UNUSED
spvdx_try_parse_date_time_format (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvdx_date_time_format *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvdx_date_time_format *))
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
spvdx_parse_date_time_format_2 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_date_time_format *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "affix", &node))
        return false;
    struct spvdx_affix *affix;
    if (!spvdx_parse_affix (nctx->up, node, &affix))
        return false;
    p->affix = xrealloc (p->affix, sizeof *p->affix * (p->n_affix + 1));
    p->affix[p->n_affix++] = affix;
    return true;
}

static bool
spvdx_parse_date_time_format_1 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_date_time_format *p)
{
    while (spvdx_try_parse_date_time_format (nctx, input, p, spvdx_parse_date_time_format_2))
        continue;
    return true;
}

bool
spvdx_parse_date_time_format (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvdx_date_time_format **p_)
{
    enum {
        ATTR_DAY_OF_MONTH_PADDING,
        ATTR_DAY_OF_WEEK_ABBREVIATION,
        ATTR_DAY_PADDING,
        ATTR_DAY_TYPE,
        ATTR_DT_BASE_FORMAT,
        ATTR_HOUR_FORMAT,
        ATTR_HOUR_PADDING,
        ATTR_ID,
        ATTR_MDY_ORDER,
        ATTR_MINUTE_PADDING,
        ATTR_MONTH_FORMAT,
        ATTR_QUARTER_PREFIX,
        ATTR_QUARTER_SUFFIX,
        ATTR_SECOND_PADDING,
        ATTR_SEPARATOR_CHARS,
        ATTR_SHOW_DAY,
        ATTR_SHOW_DAY_OF_WEEK,
        ATTR_SHOW_HOUR,
        ATTR_SHOW_MILLIS,
        ATTR_SHOW_MINUTE,
        ATTR_SHOW_MONTH,
        ATTR_SHOW_QUARTER,
        ATTR_SHOW_SECOND,
        ATTR_SHOW_WEEK,
        ATTR_SHOW_YEAR,
        ATTR_WEEK_PADDING,
        ATTR_WEEK_SUFFIX,
        ATTR_YEAR_ABBREVIATION,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_DAY_OF_MONTH_PADDING] = { "dayOfMonthPadding", false, NULL },
        [ATTR_DAY_OF_WEEK_ABBREVIATION] = { "dayOfWeekAbbreviation", false, NULL },
        [ATTR_DAY_PADDING] = { "dayPadding", false, NULL },
        [ATTR_DAY_TYPE] = { "dayType", false, NULL },
        [ATTR_DT_BASE_FORMAT] = { "baseFormat", true, NULL },
        [ATTR_HOUR_FORMAT] = { "hourFormat", false, NULL },
        [ATTR_HOUR_PADDING] = { "hourPadding", false, NULL },
        [ATTR_ID] = { "id", false, NULL },
        [ATTR_MDY_ORDER] = { "mdyOrder", false, NULL },
        [ATTR_MINUTE_PADDING] = { "minutePadding", false, NULL },
        [ATTR_MONTH_FORMAT] = { "monthFormat", false, NULL },
        [ATTR_QUARTER_PREFIX] = { "quarterPrefix", false, NULL },
        [ATTR_QUARTER_SUFFIX] = { "quarterSuffix", false, NULL },
        [ATTR_SECOND_PADDING] = { "secondPadding", false, NULL },
        [ATTR_SEPARATOR_CHARS] = { "separatorChars", false, NULL },
        [ATTR_SHOW_DAY] = { "showDay", false, NULL },
        [ATTR_SHOW_DAY_OF_WEEK] = { "showDayOfWeek", false, NULL },
        [ATTR_SHOW_HOUR] = { "showHour", false, NULL },
        [ATTR_SHOW_MILLIS] = { "showMillis", false, NULL },
        [ATTR_SHOW_MINUTE] = { "showMinute", false, NULL },
        [ATTR_SHOW_MONTH] = { "showMonth", false, NULL },
        [ATTR_SHOW_QUARTER] = { "showQuarter", false, NULL },
        [ATTR_SHOW_SECOND] = { "showSecond", false, NULL },
        [ATTR_SHOW_WEEK] = { "showWeek", false, NULL },
        [ATTR_SHOW_YEAR] = { "showYear", false, NULL },
        [ATTR_WEEK_PADDING] = { "weekPadding", false, NULL },
        [ATTR_WEEK_SUFFIX] = { "weekSuffix", false, NULL },
        [ATTR_YEAR_ABBREVIATION] = { "yearAbbreviation", false, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvdx_date_time_format *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvdx_date_time_format_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->day_of_month_padding = spvxml_attr_parse_bool (&nctx, &attrs[ATTR_DAY_OF_MONTH_PADDING]);
    p->day_of_week_abbreviation = spvxml_attr_parse_bool (&nctx, &attrs[ATTR_DAY_OF_WEEK_ABBREVIATION]);
    p->day_padding = spvxml_attr_parse_bool (&nctx, &attrs[ATTR_DAY_PADDING]);
    p->day_type = spvxml_attr_parse_enum (
        &nctx, &attrs[ATTR_DAY_TYPE], spvdx_day_type_map);
    p->dt_base_format = spvxml_attr_parse_enum (
        &nctx, &attrs[ATTR_DT_BASE_FORMAT], spvdx_dt_base_format_map);
    p->hour_format = spvxml_attr_parse_enum (
        &nctx, &attrs[ATTR_HOUR_FORMAT], spvdx_hour_format_map);
    p->hour_padding = spvxml_attr_parse_bool (&nctx, &attrs[ATTR_HOUR_PADDING]);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    p->mdy_order = spvxml_attr_parse_enum (
        &nctx, &attrs[ATTR_MDY_ORDER], spvdx_mdy_order_map);
    p->minute_padding = spvxml_attr_parse_bool (&nctx, &attrs[ATTR_MINUTE_PADDING]);
    p->month_format = spvxml_attr_parse_enum (
        &nctx, &attrs[ATTR_MONTH_FORMAT], spvdx_month_format_map);
    p->quarter_prefix = attrs[ATTR_QUARTER_PREFIX].value;
    attrs[ATTR_QUARTER_PREFIX].value = NULL;
    p->quarter_suffix = attrs[ATTR_QUARTER_SUFFIX].value;
    attrs[ATTR_QUARTER_SUFFIX].value = NULL;
    p->second_padding = spvxml_attr_parse_bool (&nctx, &attrs[ATTR_SECOND_PADDING]);
    p->separator_chars = attrs[ATTR_SEPARATOR_CHARS].value;
    attrs[ATTR_SEPARATOR_CHARS].value = NULL;
    p->show_day = spvxml_attr_parse_bool (&nctx, &attrs[ATTR_SHOW_DAY]);
    p->show_day_of_week = spvxml_attr_parse_bool (&nctx, &attrs[ATTR_SHOW_DAY_OF_WEEK]);
    p->show_hour = spvxml_attr_parse_bool (&nctx, &attrs[ATTR_SHOW_HOUR]);
    p->show_millis = spvxml_attr_parse_bool (&nctx, &attrs[ATTR_SHOW_MILLIS]);
    p->show_minute = spvxml_attr_parse_bool (&nctx, &attrs[ATTR_SHOW_MINUTE]);
    p->show_month = spvxml_attr_parse_bool (&nctx, &attrs[ATTR_SHOW_MONTH]);
    p->show_quarter = spvxml_attr_parse_bool (&nctx, &attrs[ATTR_SHOW_QUARTER]);
    p->show_second = spvxml_attr_parse_bool (&nctx, &attrs[ATTR_SHOW_SECOND]);
    p->show_week = spvxml_attr_parse_bool (&nctx, &attrs[ATTR_SHOW_WEEK]);
    p->show_year = spvxml_attr_parse_bool (&nctx, &attrs[ATTR_SHOW_YEAR]);
    p->week_padding = spvxml_attr_parse_bool (&nctx, &attrs[ATTR_WEEK_PADDING]);
    p->week_suffix = attrs[ATTR_WEEK_SUFFIX].value;
    attrs[ATTR_WEEK_SUFFIX].value = NULL;
    p->year_abbreviation = spvxml_attr_parse_bool (&nctx, &attrs[ATTR_YEAR_ABBREVIATION]);
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvdx_free_date_time_format (p);
        return false;
    }

    /* Parse content. */
    input = input->children;
    if (!spvdx_parse_date_time_format_1 (&nctx, &input, p)
        || !spvxml_content_parse_end (&nctx, input)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvdx_free_date_time_format (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvdx_free_date_time_format (struct spvdx_date_time_format *p)
{
    if (!p)
        return;

    free (p->separator_chars);
    free (p->quarter_prefix);
    free (p->quarter_suffix);
    free (p->week_suffix);
    for (size_t i = 0; i < p->n_affix; i++)
        spvdx_free_affix (p->affix[i]);
    free (p->affix);
    free (p->node_.id);
    free (p);
}

void
spvdx_collect_ids_date_time_format (struct spvxml_context *ctx, struct spvdx_date_time_format *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

    for (size_t i = 0; i < p->n_affix; i++)
        spvdx_collect_ids_affix (ctx, p->affix[i]);
}

bool
spvdx_is_date_time_format (const struct spvxml_node *node)
{
    return node->class_ == &spvdx_date_time_format_class;
}

struct spvdx_date_time_format *
spvdx_cast_date_time_format (const struct spvxml_node *node)
{
    return (node && spvdx_is_date_time_format (node)
            ? UP_CAST (node, struct spvdx_date_time_format, node_)
            : NULL);
}

void
spvdx_resolve_refs_date_time_format (struct spvxml_context *ctx UNUSED, struct spvdx_date_time_format *p UNUSED)
{
    if (!p)
        return;

    for (size_t i = 0; i < p->n_affix; i++)
        spvdx_resolve_refs_affix (ctx, p->affix[i]);
}

static void
spvdx_do_free_date_time_format (struct spvxml_node *node)
{
    spvdx_free_date_time_format (UP_CAST (node, struct spvdx_date_time_format, node_));
}

static void
spvdx_do_collect_ids_date_time_format (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_collect_ids_date_time_format (ctx, UP_CAST (node, struct spvdx_date_time_format, node_));
}

static void
spvdx_do_resolve_refs_date_time_format (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_resolve_refs_date_time_format (ctx, UP_CAST (node, struct spvdx_date_time_format, node_));
}

struct spvxml_node_class spvdx_date_time_format_class = {
    "dateTimeFormat",
    spvdx_do_free_date_time_format,
    spvdx_do_collect_ids_date_time_format,
    spvdx_do_resolve_refs_date_time_format,
};


static bool UNUSED
spvdx_try_parse_derived_variable (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvdx_derived_variable *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvdx_derived_variable *))
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
spvdx_parse_derived_variable_6 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_derived_variable *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "valueMapEntry", &node))
        return false;
    struct spvdx_value_map_entry *value_map_entry;
    if (!spvdx_parse_value_map_entry (nctx->up, node, &value_map_entry))
        return false;
    p->value_map_entry = xrealloc (p->value_map_entry, sizeof *p->value_map_entry * (p->n_value_map_entry + 1));
    p->value_map_entry[p->n_value_map_entry++] = value_map_entry;
    return true;
}

static bool
spvdx_parse_derived_variable_5 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_derived_variable *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "stringFormat", &node))
        return false;
    struct spvdx_string_format *seq;
    if (!spvdx_parse_string_format (nctx->up, node, &seq))
        return false;
    p->seq = xrealloc (p->seq, sizeof *p->seq * (p->n_seq + 1));
    p->seq[p->n_seq++] = &seq->node_;
    return true;
}

static bool
spvdx_parse_derived_variable_4 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_derived_variable *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "format", &node))
        return false;
    struct spvdx_format *seq;
    if (!spvdx_parse_format (nctx->up, node, &seq))
        return false;
    p->seq = xrealloc (p->seq, sizeof *p->seq * (p->n_seq + 1));
    p->seq[p->n_seq++] = &seq->node_;
    return true;
}

static bool
spvdx_parse_derived_variable_3 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_derived_variable *p)
{
    if (!spvdx_try_parse_derived_variable (nctx, input, p, spvdx_parse_derived_variable_4)
        && !spvdx_try_parse_derived_variable (nctx, input, p, spvdx_parse_derived_variable_5))
      {
        spvxml_content_error (nctx, *input, "Syntax error.");
        return false;
      }
    return true;
}

static bool
spvdx_parse_derived_variable_2 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_derived_variable *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "extension", &node))
        return false;
    struct spvdx_variable_extension *variable_extension;
    if (!spvdx_parse_variable_extension (nctx->up, node, &variable_extension))
        return false;
    p->variable_extension = xrealloc (p->variable_extension, sizeof *p->variable_extension * (p->n_variable_extension + 1));
    p->variable_extension[p->n_variable_extension++] = variable_extension;
    return true;
}

static bool
spvdx_parse_derived_variable_1 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_derived_variable *p)
{
    while (spvdx_try_parse_derived_variable (nctx, input, p, spvdx_parse_derived_variable_2))
        continue;
    spvdx_try_parse_derived_variable (nctx, input, p, spvdx_parse_derived_variable_3);
    while (spvdx_try_parse_derived_variable (nctx, input, p, spvdx_parse_derived_variable_6))
        continue;
    return true;
}

bool
spvdx_parse_derived_variable (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvdx_derived_variable **p_)
{
    enum {
        ATTR_CATEGORICAL,
        ATTR_DEPENDS_ON,
        ATTR_ID,
        ATTR_VALUE,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_CATEGORICAL] = { "categorical", true, NULL },
        [ATTR_DEPENDS_ON] = { "dependsOn", false, NULL },
        [ATTR_ID] = { "id", true, NULL },
        [ATTR_VALUE] = { "value", true, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvdx_derived_variable *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvdx_derived_variable_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    spvxml_attr_parse_fixed (&nctx, &attrs[ATTR_CATEGORICAL], "true");
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    p->value = attrs[ATTR_VALUE].value;
    attrs[ATTR_VALUE].value = NULL;
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvdx_free_derived_variable (p);
        return false;
    }

    /* Parse content. */
    input = input->children;
    if (!spvdx_parse_derived_variable_1 (&nctx, &input, p)
        || !spvxml_content_parse_end (&nctx, input)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvdx_free_derived_variable (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvdx_free_derived_variable (struct spvdx_derived_variable *p)
{
    if (!p)
        return;

    free (p->value);
    for (size_t i = 0; i < p->n_variable_extension; i++)
        spvdx_free_variable_extension (p->variable_extension[i]);
    free (p->variable_extension);
    for (size_t i = 0; i < p->n_seq; i++)
        p->seq[i]->class_->spvxml_node_free (p->seq[i]);
    free (p->seq);
    for (size_t i = 0; i < p->n_value_map_entry; i++)
        spvdx_free_value_map_entry (p->value_map_entry[i]);
    free (p->value_map_entry);
    free (p->node_.id);
    free (p);
}

void
spvdx_collect_ids_derived_variable (struct spvxml_context *ctx, struct spvdx_derived_variable *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

    for (size_t i = 0; i < p->n_variable_extension; i++)
        spvdx_collect_ids_variable_extension (ctx, p->variable_extension[i]);
    for (size_t i = 0; i < p->n_seq; i++)
        p->seq[i]->class_->spvxml_node_collect_ids (ctx, p->seq[i]);
    for (size_t i = 0; i < p->n_value_map_entry; i++)
        spvdx_collect_ids_value_map_entry (ctx, p->value_map_entry[i]);
}

bool
spvdx_is_derived_variable (const struct spvxml_node *node)
{
    return node->class_ == &spvdx_derived_variable_class;
}

struct spvdx_derived_variable *
spvdx_cast_derived_variable (const struct spvxml_node *node)
{
    return (node && spvdx_is_derived_variable (node)
            ? UP_CAST (node, struct spvdx_derived_variable, node_)
            : NULL);
}

void
spvdx_resolve_refs_derived_variable (struct spvxml_context *ctx UNUSED, struct spvdx_derived_variable *p UNUSED)
{
    if (!p)
        return;

    static const struct spvxml_node_class *const classes
        = &spvdx_source_variable_class;
    p->depends_on = spvdx_cast_source_variable (spvxml_node_resolve_ref (ctx, p->node_.raw, "dependsOn", &classes, 1));
    for (size_t i = 0; i < p->n_variable_extension; i++)
        spvdx_resolve_refs_variable_extension (ctx, p->variable_extension[i]);
    for (size_t i = 0; i < p->n_seq; i++)
        p->seq[i]->class_->spvxml_node_resolve_refs (ctx, p->seq[i]);
    for (size_t i = 0; i < p->n_value_map_entry; i++)
        spvdx_resolve_refs_value_map_entry (ctx, p->value_map_entry[i]);
}

static void
spvdx_do_free_derived_variable (struct spvxml_node *node)
{
    spvdx_free_derived_variable (UP_CAST (node, struct spvdx_derived_variable, node_));
}

static void
spvdx_do_collect_ids_derived_variable (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_collect_ids_derived_variable (ctx, UP_CAST (node, struct spvdx_derived_variable, node_));
}

static void
spvdx_do_resolve_refs_derived_variable (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_resolve_refs_derived_variable (ctx, UP_CAST (node, struct spvdx_derived_variable, node_));
}

struct spvxml_node_class spvdx_derived_variable_class = {
    "derivedVariable",
    spvdx_do_free_derived_variable,
    spvdx_do_collect_ids_derived_variable,
    spvdx_do_resolve_refs_derived_variable,
};


static bool UNUSED
spvdx_try_parse_description (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvdx_description *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvdx_description *))
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
spvdx_parse_description (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvdx_description **p_)
{
    enum {
        ATTR_ID,
        ATTR_NAME,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_ID] = { "id", false, NULL },
        [ATTR_NAME] = { "name", true, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvdx_description *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvdx_description_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    p->name = spvxml_attr_parse_enum (
        &nctx, &attrs[ATTR_NAME], spvdx_name_map);
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvdx_free_description (p);
        return false;
    }

    /* Parse content. */
    if (!spvxml_content_parse_end (&nctx, input->children)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvdx_free_description (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvdx_free_description (struct spvdx_description *p)
{
    if (!p)
        return;

    free (p->node_.id);
    free (p);
}

void
spvdx_collect_ids_description (struct spvxml_context *ctx, struct spvdx_description *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

}

bool
spvdx_is_description (const struct spvxml_node *node)
{
    return node->class_ == &spvdx_description_class;
}

struct spvdx_description *
spvdx_cast_description (const struct spvxml_node *node)
{
    return (node && spvdx_is_description (node)
            ? UP_CAST (node, struct spvdx_description, node_)
            : NULL);
}

void
spvdx_resolve_refs_description (struct spvxml_context *ctx UNUSED, struct spvdx_description *p UNUSED)
{
    if (!p)
        return;

}

static void
spvdx_do_free_description (struct spvxml_node *node)
{
    spvdx_free_description (UP_CAST (node, struct spvdx_description, node_));
}

static void
spvdx_do_collect_ids_description (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_collect_ids_description (ctx, UP_CAST (node, struct spvdx_description, node_));
}

static void
spvdx_do_resolve_refs_description (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_resolve_refs_description (ctx, UP_CAST (node, struct spvdx_description, node_));
}

struct spvxml_node_class spvdx_description_class = {
    "description",
    spvdx_do_free_description,
    spvdx_do_collect_ids_description,
    spvdx_do_resolve_refs_description,
};


static bool UNUSED
spvdx_try_parse_description_group (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvdx_description_group *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvdx_description_group *))
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
spvdx_parse_description_group_4 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_description_group *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "text", &node))
        return false;
    struct spvdx_text *seq;
    if (!spvdx_parse_text (nctx->up, node, &seq))
        return false;
    p->seq = xrealloc (p->seq, sizeof *p->seq * (p->n_seq + 1));
    p->seq[p->n_seq++] = &seq->node_;
    return true;
}

static bool
spvdx_parse_description_group_3 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_description_group *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "description", &node))
        return false;
    struct spvdx_description *seq;
    if (!spvdx_parse_description (nctx->up, node, &seq))
        return false;
    p->seq = xrealloc (p->seq, sizeof *p->seq * (p->n_seq + 1));
    p->seq[p->n_seq++] = &seq->node_;
    return true;
}

static bool
spvdx_parse_description_group_2 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_description_group *p)
{
    if (!spvdx_try_parse_description_group (nctx, input, p, spvdx_parse_description_group_3)
        && !spvdx_try_parse_description_group (nctx, input, p, spvdx_parse_description_group_4))
      {
        spvxml_content_error (nctx, *input, "Syntax error.");
        return false;
      }
    return true;
}

static bool
spvdx_parse_description_group_1 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_description_group *p)
{
    if (!spvdx_parse_description_group_2 (nctx, input, p))
        return false;
    while (spvdx_try_parse_description_group (nctx, input, p, spvdx_parse_description_group_2))
        continue;
    return true;
}

bool
spvdx_parse_description_group (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvdx_description_group **p_)
{
    enum {
        ATTR_ID,
        ATTR_SEPARATOR,
        ATTR_TARGET,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_ID] = { "id", false, NULL },
        [ATTR_SEPARATOR] = { "separator", false, NULL },
        [ATTR_TARGET] = { "target", true, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvdx_description_group *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvdx_description_group_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    p->separator = attrs[ATTR_SEPARATOR].value;
    attrs[ATTR_SEPARATOR].value = NULL;
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvdx_free_description_group (p);
        return false;
    }

    /* Parse content. */
    input = input->children;
    if (!spvdx_parse_description_group_1 (&nctx, &input, p)
        || !spvxml_content_parse_end (&nctx, input)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvdx_free_description_group (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvdx_free_description_group (struct spvdx_description_group *p)
{
    if (!p)
        return;

    free (p->separator);
    for (size_t i = 0; i < p->n_seq; i++)
        p->seq[i]->class_->spvxml_node_free (p->seq[i]);
    free (p->seq);
    free (p->node_.id);
    free (p);
}

void
spvdx_collect_ids_description_group (struct spvxml_context *ctx, struct spvdx_description_group *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

    for (size_t i = 0; i < p->n_seq; i++)
        p->seq[i]->class_->spvxml_node_collect_ids (ctx, p->seq[i]);
}

bool
spvdx_is_description_group (const struct spvxml_node *node)
{
    return node->class_ == &spvdx_description_group_class;
}

struct spvdx_description_group *
spvdx_cast_description_group (const struct spvxml_node *node)
{
    return (node && spvdx_is_description_group (node)
            ? UP_CAST (node, struct spvdx_description_group, node_)
            : NULL);
}

void
spvdx_resolve_refs_description_group (struct spvxml_context *ctx UNUSED, struct spvdx_description_group *p UNUSED)
{
    if (!p)
        return;

    static const struct spvxml_node_class *const classes
        = &spvdx_faceting_class;
    p->target = spvdx_cast_faceting (spvxml_node_resolve_ref (ctx, p->node_.raw, "target", &classes, 1));
    for (size_t i = 0; i < p->n_seq; i++)
        p->seq[i]->class_->spvxml_node_resolve_refs (ctx, p->seq[i]);
}

static void
spvdx_do_free_description_group (struct spvxml_node *node)
{
    spvdx_free_description_group (UP_CAST (node, struct spvdx_description_group, node_));
}

static void
spvdx_do_collect_ids_description_group (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_collect_ids_description_group (ctx, UP_CAST (node, struct spvdx_description_group, node_));
}

static void
spvdx_do_resolve_refs_description_group (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_resolve_refs_description_group (ctx, UP_CAST (node, struct spvdx_description_group, node_));
}

struct spvxml_node_class spvdx_description_group_class = {
    "descriptionGroup",
    spvdx_do_free_description_group,
    spvdx_do_collect_ids_description_group,
    spvdx_do_resolve_refs_description_group,
};


static bool UNUSED
spvdx_try_parse_elapsed_time_format (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvdx_elapsed_time_format *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvdx_elapsed_time_format *))
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
spvdx_parse_elapsed_time_format_2 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_elapsed_time_format *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "affix", &node))
        return false;
    struct spvdx_affix *affix;
    if (!spvdx_parse_affix (nctx->up, node, &affix))
        return false;
    p->affix = xrealloc (p->affix, sizeof *p->affix * (p->n_affix + 1));
    p->affix[p->n_affix++] = affix;
    return true;
}

static bool
spvdx_parse_elapsed_time_format_1 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_elapsed_time_format *p)
{
    while (spvdx_try_parse_elapsed_time_format (nctx, input, p, spvdx_parse_elapsed_time_format_2))
        continue;
    return true;
}

bool
spvdx_parse_elapsed_time_format (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvdx_elapsed_time_format **p_)
{
    enum {
        ATTR_DAY_PADDING,
        ATTR_DT_BASE_FORMAT,
        ATTR_HOUR_PADDING,
        ATTR_ID,
        ATTR_MINUTE_PADDING,
        ATTR_SECOND_PADDING,
        ATTR_SHOW_DAY,
        ATTR_SHOW_HOUR,
        ATTR_SHOW_MILLIS,
        ATTR_SHOW_MINUTE,
        ATTR_SHOW_SECOND,
        ATTR_SHOW_YEAR,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_DAY_PADDING] = { "dayPadding", false, NULL },
        [ATTR_DT_BASE_FORMAT] = { "baseFormat", true, NULL },
        [ATTR_HOUR_PADDING] = { "hourPadding", false, NULL },
        [ATTR_ID] = { "id", false, NULL },
        [ATTR_MINUTE_PADDING] = { "minutePadding", false, NULL },
        [ATTR_SECOND_PADDING] = { "secondPadding", false, NULL },
        [ATTR_SHOW_DAY] = { "showDay", false, NULL },
        [ATTR_SHOW_HOUR] = { "showHour", false, NULL },
        [ATTR_SHOW_MILLIS] = { "showMillis", false, NULL },
        [ATTR_SHOW_MINUTE] = { "showMinute", false, NULL },
        [ATTR_SHOW_SECOND] = { "showSecond", false, NULL },
        [ATTR_SHOW_YEAR] = { "showYear", false, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvdx_elapsed_time_format *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvdx_elapsed_time_format_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->day_padding = spvxml_attr_parse_bool (&nctx, &attrs[ATTR_DAY_PADDING]);
    p->dt_base_format = spvxml_attr_parse_enum (
        &nctx, &attrs[ATTR_DT_BASE_FORMAT], spvdx_dt_base_format_map);
    p->hour_padding = spvxml_attr_parse_bool (&nctx, &attrs[ATTR_HOUR_PADDING]);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    p->minute_padding = spvxml_attr_parse_bool (&nctx, &attrs[ATTR_MINUTE_PADDING]);
    p->second_padding = spvxml_attr_parse_bool (&nctx, &attrs[ATTR_SECOND_PADDING]);
    p->show_day = spvxml_attr_parse_bool (&nctx, &attrs[ATTR_SHOW_DAY]);
    p->show_hour = spvxml_attr_parse_bool (&nctx, &attrs[ATTR_SHOW_HOUR]);
    p->show_millis = spvxml_attr_parse_bool (&nctx, &attrs[ATTR_SHOW_MILLIS]);
    p->show_minute = spvxml_attr_parse_bool (&nctx, &attrs[ATTR_SHOW_MINUTE]);
    p->show_second = spvxml_attr_parse_bool (&nctx, &attrs[ATTR_SHOW_SECOND]);
    p->show_year = spvxml_attr_parse_bool (&nctx, &attrs[ATTR_SHOW_YEAR]);
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvdx_free_elapsed_time_format (p);
        return false;
    }

    /* Parse content. */
    input = input->children;
    if (!spvdx_parse_elapsed_time_format_1 (&nctx, &input, p)
        || !spvxml_content_parse_end (&nctx, input)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvdx_free_elapsed_time_format (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvdx_free_elapsed_time_format (struct spvdx_elapsed_time_format *p)
{
    if (!p)
        return;

    for (size_t i = 0; i < p->n_affix; i++)
        spvdx_free_affix (p->affix[i]);
    free (p->affix);
    free (p->node_.id);
    free (p);
}

void
spvdx_collect_ids_elapsed_time_format (struct spvxml_context *ctx, struct spvdx_elapsed_time_format *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

    for (size_t i = 0; i < p->n_affix; i++)
        spvdx_collect_ids_affix (ctx, p->affix[i]);
}

bool
spvdx_is_elapsed_time_format (const struct spvxml_node *node)
{
    return node->class_ == &spvdx_elapsed_time_format_class;
}

struct spvdx_elapsed_time_format *
spvdx_cast_elapsed_time_format (const struct spvxml_node *node)
{
    return (node && spvdx_is_elapsed_time_format (node)
            ? UP_CAST (node, struct spvdx_elapsed_time_format, node_)
            : NULL);
}

void
spvdx_resolve_refs_elapsed_time_format (struct spvxml_context *ctx UNUSED, struct spvdx_elapsed_time_format *p UNUSED)
{
    if (!p)
        return;

    for (size_t i = 0; i < p->n_affix; i++)
        spvdx_resolve_refs_affix (ctx, p->affix[i]);
}

static void
spvdx_do_free_elapsed_time_format (struct spvxml_node *node)
{
    spvdx_free_elapsed_time_format (UP_CAST (node, struct spvdx_elapsed_time_format, node_));
}

static void
spvdx_do_collect_ids_elapsed_time_format (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_collect_ids_elapsed_time_format (ctx, UP_CAST (node, struct spvdx_elapsed_time_format, node_));
}

static void
spvdx_do_resolve_refs_elapsed_time_format (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_resolve_refs_elapsed_time_format (ctx, UP_CAST (node, struct spvdx_elapsed_time_format, node_));
}

struct spvxml_node_class spvdx_elapsed_time_format_class = {
    "elapsedTimeFormat",
    spvdx_do_free_elapsed_time_format,
    spvdx_do_collect_ids_elapsed_time_format,
    spvdx_do_resolve_refs_elapsed_time_format,
};


static bool UNUSED
spvdx_try_parse_facet_layout (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvdx_facet_layout *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvdx_facet_layout *))
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
spvdx_parse_facet_layout_4 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_facet_layout *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "setCellProperties", &node))
        return false;
    struct spvdx_set_cell_properties *scp2;
    if (!spvdx_parse_set_cell_properties (nctx->up, node, &scp2))
        return false;
    p->scp2 = xrealloc (p->scp2, sizeof *p->scp2 * (p->n_scp2 + 1));
    p->scp2[p->n_scp2++] = scp2;
    return true;
}

static bool
spvdx_parse_facet_layout_3 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_facet_layout *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "facetLevel", &node))
        return false;
    struct spvdx_facet_level *facet_level;
    if (!spvdx_parse_facet_level (nctx->up, node, &facet_level))
        return false;
    p->facet_level = xrealloc (p->facet_level, sizeof *p->facet_level * (p->n_facet_level + 1));
    p->facet_level[p->n_facet_level++] = facet_level;
    return true;
}

static bool
spvdx_parse_facet_layout_2 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_facet_layout *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "setCellProperties", &node))
        return false;
    struct spvdx_set_cell_properties *scp1;
    if (!spvdx_parse_set_cell_properties (nctx->up, node, &scp1))
        return false;
    p->scp1 = xrealloc (p->scp1, sizeof *p->scp1 * (p->n_scp1 + 1));
    p->scp1[p->n_scp1++] = scp1;
    return true;
}

static bool
spvdx_parse_facet_layout_1 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_facet_layout *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "tableLayout", &node))
        return false;
    if (!spvdx_parse_table_layout (nctx->up, node, &p->table_layout))
        return false;
    while (spvdx_try_parse_facet_layout (nctx, input, p, spvdx_parse_facet_layout_2))
        continue;
    if (!spvdx_parse_facet_layout_3 (nctx, input, p))
        return false;
    while (spvdx_try_parse_facet_layout (nctx, input, p, spvdx_parse_facet_layout_3))
        continue;
    while (spvdx_try_parse_facet_layout (nctx, input, p, spvdx_parse_facet_layout_4))
        continue;
    return true;
}

bool
spvdx_parse_facet_layout (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvdx_facet_layout **p_)
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
    struct spvdx_facet_layout *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvdx_facet_layout_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvdx_free_facet_layout (p);
        return false;
    }

    /* Parse content. */
    input = input->children;
    if (!spvdx_parse_facet_layout_1 (&nctx, &input, p)
        || !spvxml_content_parse_end (&nctx, input)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvdx_free_facet_layout (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvdx_free_facet_layout (struct spvdx_facet_layout *p)
{
    if (!p)
        return;

    spvdx_free_table_layout (p->table_layout);
    for (size_t i = 0; i < p->n_scp1; i++)
        spvdx_free_set_cell_properties (p->scp1[i]);
    free (p->scp1);
    for (size_t i = 0; i < p->n_facet_level; i++)
        spvdx_free_facet_level (p->facet_level[i]);
    free (p->facet_level);
    for (size_t i = 0; i < p->n_scp2; i++)
        spvdx_free_set_cell_properties (p->scp2[i]);
    free (p->scp2);
    free (p->node_.id);
    free (p);
}

void
spvdx_collect_ids_facet_layout (struct spvxml_context *ctx, struct spvdx_facet_layout *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

    spvdx_collect_ids_table_layout (ctx, p->table_layout);
    for (size_t i = 0; i < p->n_scp1; i++)
        spvdx_collect_ids_set_cell_properties (ctx, p->scp1[i]);
    for (size_t i = 0; i < p->n_facet_level; i++)
        spvdx_collect_ids_facet_level (ctx, p->facet_level[i]);
    for (size_t i = 0; i < p->n_scp2; i++)
        spvdx_collect_ids_set_cell_properties (ctx, p->scp2[i]);
}

bool
spvdx_is_facet_layout (const struct spvxml_node *node)
{
    return node->class_ == &spvdx_facet_layout_class;
}

struct spvdx_facet_layout *
spvdx_cast_facet_layout (const struct spvxml_node *node)
{
    return (node && spvdx_is_facet_layout (node)
            ? UP_CAST (node, struct spvdx_facet_layout, node_)
            : NULL);
}

void
spvdx_resolve_refs_facet_layout (struct spvxml_context *ctx UNUSED, struct spvdx_facet_layout *p UNUSED)
{
    if (!p)
        return;

    spvdx_resolve_refs_table_layout (ctx, p->table_layout);
    for (size_t i = 0; i < p->n_scp1; i++)
        spvdx_resolve_refs_set_cell_properties (ctx, p->scp1[i]);
    for (size_t i = 0; i < p->n_facet_level; i++)
        spvdx_resolve_refs_facet_level (ctx, p->facet_level[i]);
    for (size_t i = 0; i < p->n_scp2; i++)
        spvdx_resolve_refs_set_cell_properties (ctx, p->scp2[i]);
}

static void
spvdx_do_free_facet_layout (struct spvxml_node *node)
{
    spvdx_free_facet_layout (UP_CAST (node, struct spvdx_facet_layout, node_));
}

static void
spvdx_do_collect_ids_facet_layout (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_collect_ids_facet_layout (ctx, UP_CAST (node, struct spvdx_facet_layout, node_));
}

static void
spvdx_do_resolve_refs_facet_layout (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_resolve_refs_facet_layout (ctx, UP_CAST (node, struct spvdx_facet_layout, node_));
}

struct spvxml_node_class spvdx_facet_layout_class = {
    "facetLayout",
    spvdx_do_free_facet_layout,
    spvdx_do_collect_ids_facet_layout,
    spvdx_do_resolve_refs_facet_layout,
};


static bool UNUSED
spvdx_try_parse_facet_level (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvdx_facet_level *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvdx_facet_level *))
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
spvdx_parse_facet_level_1 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_facet_level *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "axis", &node))
        return false;
    if (!spvdx_parse_axis (nctx->up, node, &p->axis))
        return false;
    return true;
}

bool
spvdx_parse_facet_level (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvdx_facet_level **p_)
{
    enum {
        ATTR_GAP,
        ATTR_ID,
        ATTR_LEVEL,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_GAP] = { "gap", false, NULL },
        [ATTR_ID] = { "id", false, NULL },
        [ATTR_LEVEL] = { "level", true, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvdx_facet_level *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvdx_facet_level_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->gap = spvxml_attr_parse_dimension (&nctx, &attrs[ATTR_GAP]);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    p->level = spvxml_attr_parse_int (&nctx, &attrs[ATTR_LEVEL]);
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvdx_free_facet_level (p);
        return false;
    }

    /* Parse content. */
    input = input->children;
    if (!spvdx_parse_facet_level_1 (&nctx, &input, p)
        || !spvxml_content_parse_end (&nctx, input)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvdx_free_facet_level (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvdx_free_facet_level (struct spvdx_facet_level *p)
{
    if (!p)
        return;

    spvdx_free_axis (p->axis);
    free (p->node_.id);
    free (p);
}

void
spvdx_collect_ids_facet_level (struct spvxml_context *ctx, struct spvdx_facet_level *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

    spvdx_collect_ids_axis (ctx, p->axis);
}

bool
spvdx_is_facet_level (const struct spvxml_node *node)
{
    return node->class_ == &spvdx_facet_level_class;
}

struct spvdx_facet_level *
spvdx_cast_facet_level (const struct spvxml_node *node)
{
    return (node && spvdx_is_facet_level (node)
            ? UP_CAST (node, struct spvdx_facet_level, node_)
            : NULL);
}

void
spvdx_resolve_refs_facet_level (struct spvxml_context *ctx UNUSED, struct spvdx_facet_level *p UNUSED)
{
    if (!p)
        return;

    spvdx_resolve_refs_axis (ctx, p->axis);
}

static void
spvdx_do_free_facet_level (struct spvxml_node *node)
{
    spvdx_free_facet_level (UP_CAST (node, struct spvdx_facet_level, node_));
}

static void
spvdx_do_collect_ids_facet_level (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_collect_ids_facet_level (ctx, UP_CAST (node, struct spvdx_facet_level, node_));
}

static void
spvdx_do_resolve_refs_facet_level (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_resolve_refs_facet_level (ctx, UP_CAST (node, struct spvdx_facet_level, node_));
}

struct spvxml_node_class spvdx_facet_level_class = {
    "facetLevel",
    spvdx_do_free_facet_level,
    spvdx_do_collect_ids_facet_level,
    spvdx_do_resolve_refs_facet_level,
};


static bool UNUSED
spvdx_try_parse_faceting (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvdx_faceting *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvdx_faceting *))
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
spvdx_parse_faceting_3 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_faceting *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "layer", &node))
        return false;
    struct spvdx_layer *layers2;
    if (!spvdx_parse_layer (nctx->up, node, &layers2))
        return false;
    p->layers2 = xrealloc (p->layers2, sizeof *p->layers2 * (p->n_layers2 + 1));
    p->layers2[p->n_layers2++] = layers2;
    return true;
}

static bool
spvdx_parse_faceting_2 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_faceting *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "layer", &node))
        return false;
    struct spvdx_layer *layers1;
    if (!spvdx_parse_layer (nctx->up, node, &layers1))
        return false;
    p->layers1 = xrealloc (p->layers1, sizeof *p->layers1 * (p->n_layers1 + 1));
    p->layers1[p->n_layers1++] = layers1;
    return true;
}

static bool
spvdx_parse_faceting_1 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_faceting *p)
{
    while (spvdx_try_parse_faceting (nctx, input, p, spvdx_parse_faceting_2))
        continue;

    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "cross", &node))
        return false;
    if (!spvdx_parse_cross (nctx->up, node, &p->cross))
        return false;
    while (spvdx_try_parse_faceting (nctx, input, p, spvdx_parse_faceting_3))
        continue;
    return true;
}

bool
spvdx_parse_faceting (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvdx_faceting **p_)
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
    struct spvdx_faceting *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvdx_faceting_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvdx_free_faceting (p);
        return false;
    }

    /* Parse content. */
    input = input->children;
    if (!spvdx_parse_faceting_1 (&nctx, &input, p)
        || !spvxml_content_parse_end (&nctx, input)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvdx_free_faceting (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvdx_free_faceting (struct spvdx_faceting *p)
{
    if (!p)
        return;

    for (size_t i = 0; i < p->n_layers1; i++)
        spvdx_free_layer (p->layers1[i]);
    free (p->layers1);
    spvdx_free_cross (p->cross);
    for (size_t i = 0; i < p->n_layers2; i++)
        spvdx_free_layer (p->layers2[i]);
    free (p->layers2);
    free (p->node_.id);
    free (p);
}

void
spvdx_collect_ids_faceting (struct spvxml_context *ctx, struct spvdx_faceting *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

    for (size_t i = 0; i < p->n_layers1; i++)
        spvdx_collect_ids_layer (ctx, p->layers1[i]);
    spvdx_collect_ids_cross (ctx, p->cross);
    for (size_t i = 0; i < p->n_layers2; i++)
        spvdx_collect_ids_layer (ctx, p->layers2[i]);
}

bool
spvdx_is_faceting (const struct spvxml_node *node)
{
    return node->class_ == &spvdx_faceting_class;
}

struct spvdx_faceting *
spvdx_cast_faceting (const struct spvxml_node *node)
{
    return (node && spvdx_is_faceting (node)
            ? UP_CAST (node, struct spvdx_faceting, node_)
            : NULL);
}

void
spvdx_resolve_refs_faceting (struct spvxml_context *ctx UNUSED, struct spvdx_faceting *p UNUSED)
{
    if (!p)
        return;

    for (size_t i = 0; i < p->n_layers1; i++)
        spvdx_resolve_refs_layer (ctx, p->layers1[i]);
    spvdx_resolve_refs_cross (ctx, p->cross);
    for (size_t i = 0; i < p->n_layers2; i++)
        spvdx_resolve_refs_layer (ctx, p->layers2[i]);
}

static void
spvdx_do_free_faceting (struct spvxml_node *node)
{
    spvdx_free_faceting (UP_CAST (node, struct spvdx_faceting, node_));
}

static void
spvdx_do_collect_ids_faceting (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_collect_ids_faceting (ctx, UP_CAST (node, struct spvdx_faceting, node_));
}

static void
spvdx_do_resolve_refs_faceting (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_resolve_refs_faceting (ctx, UP_CAST (node, struct spvdx_faceting, node_));
}

struct spvxml_node_class spvdx_faceting_class = {
    "faceting",
    spvdx_do_free_faceting,
    spvdx_do_collect_ids_faceting,
    spvdx_do_resolve_refs_faceting,
};


static bool UNUSED
spvdx_try_parse_footnote_mapping (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvdx_footnote_mapping *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvdx_footnote_mapping *))
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
spvdx_parse_footnote_mapping (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvdx_footnote_mapping **p_)
{
    enum {
        ATTR_DEFINES_REFERENCE,
        ATTR_FROM,
        ATTR_ID,
        ATTR_TO,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_DEFINES_REFERENCE] = { "definesReference", true, NULL },
        [ATTR_FROM] = { "from", true, NULL },
        [ATTR_ID] = { "id", false, NULL },
        [ATTR_TO] = { "to", true, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvdx_footnote_mapping *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvdx_footnote_mapping_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->defines_reference = spvxml_attr_parse_int (&nctx, &attrs[ATTR_DEFINES_REFERENCE]);
    p->from = spvxml_attr_parse_int (&nctx, &attrs[ATTR_FROM]);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    p->to = attrs[ATTR_TO].value;
    attrs[ATTR_TO].value = NULL;
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvdx_free_footnote_mapping (p);
        return false;
    }

    /* Parse content. */
    if (!spvxml_content_parse_end (&nctx, input->children)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvdx_free_footnote_mapping (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvdx_free_footnote_mapping (struct spvdx_footnote_mapping *p)
{
    if (!p)
        return;

    free (p->to);
    free (p->node_.id);
    free (p);
}

void
spvdx_collect_ids_footnote_mapping (struct spvxml_context *ctx, struct spvdx_footnote_mapping *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

}

bool
spvdx_is_footnote_mapping (const struct spvxml_node *node)
{
    return node->class_ == &spvdx_footnote_mapping_class;
}

struct spvdx_footnote_mapping *
spvdx_cast_footnote_mapping (const struct spvxml_node *node)
{
    return (node && spvdx_is_footnote_mapping (node)
            ? UP_CAST (node, struct spvdx_footnote_mapping, node_)
            : NULL);
}

void
spvdx_resolve_refs_footnote_mapping (struct spvxml_context *ctx UNUSED, struct spvdx_footnote_mapping *p UNUSED)
{
    if (!p)
        return;

}

static void
spvdx_do_free_footnote_mapping (struct spvxml_node *node)
{
    spvdx_free_footnote_mapping (UP_CAST (node, struct spvdx_footnote_mapping, node_));
}

static void
spvdx_do_collect_ids_footnote_mapping (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_collect_ids_footnote_mapping (ctx, UP_CAST (node, struct spvdx_footnote_mapping, node_));
}

static void
spvdx_do_resolve_refs_footnote_mapping (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_resolve_refs_footnote_mapping (ctx, UP_CAST (node, struct spvdx_footnote_mapping, node_));
}

struct spvxml_node_class spvdx_footnote_mapping_class = {
    "footnoteMapping",
    spvdx_do_free_footnote_mapping,
    spvdx_do_collect_ids_footnote_mapping,
    spvdx_do_resolve_refs_footnote_mapping,
};


static bool UNUSED
spvdx_try_parse_footnotes (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvdx_footnotes *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvdx_footnotes *))
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
spvdx_parse_footnotes_2 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_footnotes *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "footnoteMapping", &node))
        return false;
    struct spvdx_footnote_mapping *footnote_mapping;
    if (!spvdx_parse_footnote_mapping (nctx->up, node, &footnote_mapping))
        return false;
    p->footnote_mapping = xrealloc (p->footnote_mapping, sizeof *p->footnote_mapping * (p->n_footnote_mapping + 1));
    p->footnote_mapping[p->n_footnote_mapping++] = footnote_mapping;
    return true;
}

static bool
spvdx_parse_footnotes_1 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_footnotes *p)
{
    while (spvdx_try_parse_footnotes (nctx, input, p, spvdx_parse_footnotes_2))
        continue;
    return true;
}

bool
spvdx_parse_footnotes (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvdx_footnotes **p_)
{
    enum {
        ATTR_ID,
        ATTR_SUPERSCRIPT,
        ATTR_VARIABLE,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_ID] = { "id", false, NULL },
        [ATTR_SUPERSCRIPT] = { "superscript", false, NULL },
        [ATTR_VARIABLE] = { "variable", true, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvdx_footnotes *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvdx_footnotes_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    p->superscript = spvxml_attr_parse_bool (&nctx, &attrs[ATTR_SUPERSCRIPT]);
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvdx_free_footnotes (p);
        return false;
    }

    /* Parse content. */
    input = input->children;
    if (!spvdx_parse_footnotes_1 (&nctx, &input, p)
        || !spvxml_content_parse_end (&nctx, input)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvdx_free_footnotes (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvdx_free_footnotes (struct spvdx_footnotes *p)
{
    if (!p)
        return;

    for (size_t i = 0; i < p->n_footnote_mapping; i++)
        spvdx_free_footnote_mapping (p->footnote_mapping[i]);
    free (p->footnote_mapping);
    free (p->node_.id);
    free (p);
}

void
spvdx_collect_ids_footnotes (struct spvxml_context *ctx, struct spvdx_footnotes *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

    for (size_t i = 0; i < p->n_footnote_mapping; i++)
        spvdx_collect_ids_footnote_mapping (ctx, p->footnote_mapping[i]);
}

bool
spvdx_is_footnotes (const struct spvxml_node *node)
{
    return node->class_ == &spvdx_footnotes_class;
}

struct spvdx_footnotes *
spvdx_cast_footnotes (const struct spvxml_node *node)
{
    return (node && spvdx_is_footnotes (node)
            ? UP_CAST (node, struct spvdx_footnotes, node_)
            : NULL);
}

void
spvdx_resolve_refs_footnotes (struct spvxml_context *ctx UNUSED, struct spvdx_footnotes *p UNUSED)
{
    if (!p)
        return;

    static const struct spvxml_node_class *const classes[] = {
        &spvdx_derived_variable_class,
        &spvdx_source_variable_class,
    };
    const size_t n_classes = sizeof classes / sizeof *classes;
    p->variable = spvxml_node_resolve_ref (ctx, p->node_.raw, "variable", classes, n_classes);
    for (size_t i = 0; i < p->n_footnote_mapping; i++)
        spvdx_resolve_refs_footnote_mapping (ctx, p->footnote_mapping[i]);
}

static void
spvdx_do_free_footnotes (struct spvxml_node *node)
{
    spvdx_free_footnotes (UP_CAST (node, struct spvdx_footnotes, node_));
}

static void
spvdx_do_collect_ids_footnotes (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_collect_ids_footnotes (ctx, UP_CAST (node, struct spvdx_footnotes, node_));
}

static void
spvdx_do_resolve_refs_footnotes (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_resolve_refs_footnotes (ctx, UP_CAST (node, struct spvdx_footnotes, node_));
}

struct spvxml_node_class spvdx_footnotes_class = {
    "footnotes",
    spvdx_do_free_footnotes,
    spvdx_do_collect_ids_footnotes,
    spvdx_do_resolve_refs_footnotes,
};


static bool UNUSED
spvdx_try_parse_format (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvdx_format *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvdx_format *))
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
spvdx_parse_format_3 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_format *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "affix", &node))
        return false;
    struct spvdx_affix *affix;
    if (!spvdx_parse_affix (nctx->up, node, &affix))
        return false;
    p->affix = xrealloc (p->affix, sizeof *p->affix * (p->n_affix + 1));
    p->affix[p->n_affix++] = affix;
    return true;
}

static bool
spvdx_parse_format_2 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_format *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "relabel", &node))
        return false;
    struct spvdx_relabel *relabel;
    if (!spvdx_parse_relabel (nctx->up, node, &relabel))
        return false;
    p->relabel = xrealloc (p->relabel, sizeof *p->relabel * (p->n_relabel + 1));
    p->relabel[p->n_relabel++] = relabel;
    return true;
}

static bool
spvdx_parse_format_1 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_format *p)
{
    while (spvdx_try_parse_format (nctx, input, p, spvdx_parse_format_2))
        continue;
    while (spvdx_try_parse_format (nctx, input, p, spvdx_parse_format_3))
        continue;
    return true;
}

bool
spvdx_parse_format (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvdx_format **p_)
{
    enum {
        ATTR_DAY_OF_MONTH_PADDING,
        ATTR_DAY_OF_WEEK_ABBREVIATION,
        ATTR_DAY_PADDING,
        ATTR_DAY_TYPE,
        ATTR_ERROR_CHARACTER,
        ATTR_F_BASE_FORMAT,
        ATTR_HOUR_FORMAT,
        ATTR_HOUR_PADDING,
        ATTR_ID,
        ATTR_MAXIMUM_FRACTION_DIGITS,
        ATTR_MDY_ORDER,
        ATTR_MINIMUM_FRACTION_DIGITS,
        ATTR_MINIMUM_INTEGER_DIGITS,
        ATTR_MINUTE_PADDING,
        ATTR_MONTH_FORMAT,
        ATTR_NEGATIVES_OUTSIDE,
        ATTR_PREFIX,
        ATTR_QUARTER_PREFIX,
        ATTR_QUARTER_SUFFIX,
        ATTR_SCIENTIFIC,
        ATTR_SECOND_PADDING,
        ATTR_SEPARATOR_CHARS,
        ATTR_SHOW_DAY,
        ATTR_SHOW_DAY_OF_WEEK,
        ATTR_SHOW_HOUR,
        ATTR_SHOW_MILLIS,
        ATTR_SHOW_MINUTE,
        ATTR_SHOW_MONTH,
        ATTR_SHOW_QUARTER,
        ATTR_SHOW_SECOND,
        ATTR_SHOW_WEEK,
        ATTR_SHOW_YEAR,
        ATTR_SMALL,
        ATTR_SUFFIX,
        ATTR_TRY_STRINGS_AS_NUMBERS,
        ATTR_USE_GROUPING,
        ATTR_WEEK_PADDING,
        ATTR_WEEK_SUFFIX,
        ATTR_YEAR_ABBREVIATION,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_DAY_OF_MONTH_PADDING] = { "dayOfMonthPadding", false, NULL },
        [ATTR_DAY_OF_WEEK_ABBREVIATION] = { "dayOfWeekAbbreviation", false, NULL },
        [ATTR_DAY_PADDING] = { "dayPadding", false, NULL },
        [ATTR_DAY_TYPE] = { "dayType", false, NULL },
        [ATTR_ERROR_CHARACTER] = { "errorCharacter", false, NULL },
        [ATTR_F_BASE_FORMAT] = { "baseFormat", false, NULL },
        [ATTR_HOUR_FORMAT] = { "hourFormat", false, NULL },
        [ATTR_HOUR_PADDING] = { "hourPadding", false, NULL },
        [ATTR_ID] = { "id", false, NULL },
        [ATTR_MAXIMUM_FRACTION_DIGITS] = { "maximumFractionDigits", false, NULL },
        [ATTR_MDY_ORDER] = { "mdyOrder", false, NULL },
        [ATTR_MINIMUM_FRACTION_DIGITS] = { "minimumFractionDigits", false, NULL },
        [ATTR_MINIMUM_INTEGER_DIGITS] = { "minimumIntegerDigits", false, NULL },
        [ATTR_MINUTE_PADDING] = { "minutePadding", false, NULL },
        [ATTR_MONTH_FORMAT] = { "monthFormat", false, NULL },
        [ATTR_NEGATIVES_OUTSIDE] = { "negativesOutside", false, NULL },
        [ATTR_PREFIX] = { "prefix", false, NULL },
        [ATTR_QUARTER_PREFIX] = { "quarterPrefix", false, NULL },
        [ATTR_QUARTER_SUFFIX] = { "quarterSuffix", false, NULL },
        [ATTR_SCIENTIFIC] = { "scientific", false, NULL },
        [ATTR_SECOND_PADDING] = { "secondPadding", false, NULL },
        [ATTR_SEPARATOR_CHARS] = { "separatorChars", false, NULL },
        [ATTR_SHOW_DAY] = { "showDay", false, NULL },
        [ATTR_SHOW_DAY_OF_WEEK] = { "showDayOfWeek", false, NULL },
        [ATTR_SHOW_HOUR] = { "showHour", false, NULL },
        [ATTR_SHOW_MILLIS] = { "showMillis", false, NULL },
        [ATTR_SHOW_MINUTE] = { "showMinute", false, NULL },
        [ATTR_SHOW_MONTH] = { "showMonth", false, NULL },
        [ATTR_SHOW_QUARTER] = { "showQuarter", false, NULL },
        [ATTR_SHOW_SECOND] = { "showSecond", false, NULL },
        [ATTR_SHOW_WEEK] = { "showWeek", false, NULL },
        [ATTR_SHOW_YEAR] = { "showYear", false, NULL },
        [ATTR_SMALL] = { "small", false, NULL },
        [ATTR_SUFFIX] = { "suffix", false, NULL },
        [ATTR_TRY_STRINGS_AS_NUMBERS] = { "tryStringsAsNumbers", false, NULL },
        [ATTR_USE_GROUPING] = { "useGrouping", false, NULL },
        [ATTR_WEEK_PADDING] = { "weekPadding", false, NULL },
        [ATTR_WEEK_SUFFIX] = { "weekSuffix", false, NULL },
        [ATTR_YEAR_ABBREVIATION] = { "yearAbbreviation", false, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvdx_format *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvdx_format_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->day_of_month_padding = spvxml_attr_parse_bool (&nctx, &attrs[ATTR_DAY_OF_MONTH_PADDING]);
    p->day_of_week_abbreviation = spvxml_attr_parse_bool (&nctx, &attrs[ATTR_DAY_OF_WEEK_ABBREVIATION]);
    p->day_padding = spvxml_attr_parse_bool (&nctx, &attrs[ATTR_DAY_PADDING]);
    p->day_type = spvxml_attr_parse_enum (
        &nctx, &attrs[ATTR_DAY_TYPE], spvdx_day_type_map);
    p->error_character = attrs[ATTR_ERROR_CHARACTER].value;
    attrs[ATTR_ERROR_CHARACTER].value = NULL;
    p->f_base_format = spvxml_attr_parse_enum (
        &nctx, &attrs[ATTR_F_BASE_FORMAT], spvdx_f_base_format_map);
    p->hour_format = spvxml_attr_parse_enum (
        &nctx, &attrs[ATTR_HOUR_FORMAT], spvdx_hour_format_map);
    p->hour_padding = spvxml_attr_parse_bool (&nctx, &attrs[ATTR_HOUR_PADDING]);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    p->maximum_fraction_digits = spvxml_attr_parse_int (&nctx, &attrs[ATTR_MAXIMUM_FRACTION_DIGITS]);
    p->mdy_order = spvxml_attr_parse_enum (
        &nctx, &attrs[ATTR_MDY_ORDER], spvdx_mdy_order_map);
    p->minimum_fraction_digits = spvxml_attr_parse_int (&nctx, &attrs[ATTR_MINIMUM_FRACTION_DIGITS]);
    p->minimum_integer_digits = spvxml_attr_parse_int (&nctx, &attrs[ATTR_MINIMUM_INTEGER_DIGITS]);
    p->minute_padding = spvxml_attr_parse_bool (&nctx, &attrs[ATTR_MINUTE_PADDING]);
    p->month_format = spvxml_attr_parse_enum (
        &nctx, &attrs[ATTR_MONTH_FORMAT], spvdx_month_format_map);
    p->negatives_outside = spvxml_attr_parse_bool (&nctx, &attrs[ATTR_NEGATIVES_OUTSIDE]);
    p->prefix = attrs[ATTR_PREFIX].value;
    attrs[ATTR_PREFIX].value = NULL;
    p->quarter_prefix = attrs[ATTR_QUARTER_PREFIX].value;
    attrs[ATTR_QUARTER_PREFIX].value = NULL;
    p->quarter_suffix = attrs[ATTR_QUARTER_SUFFIX].value;
    attrs[ATTR_QUARTER_SUFFIX].value = NULL;
    p->scientific = spvxml_attr_parse_enum (
        &nctx, &attrs[ATTR_SCIENTIFIC], spvdx_scientific_map);
    p->second_padding = spvxml_attr_parse_bool (&nctx, &attrs[ATTR_SECOND_PADDING]);
    p->separator_chars = attrs[ATTR_SEPARATOR_CHARS].value;
    attrs[ATTR_SEPARATOR_CHARS].value = NULL;
    p->show_day = spvxml_attr_parse_bool (&nctx, &attrs[ATTR_SHOW_DAY]);
    p->show_day_of_week = spvxml_attr_parse_bool (&nctx, &attrs[ATTR_SHOW_DAY_OF_WEEK]);
    p->show_hour = spvxml_attr_parse_bool (&nctx, &attrs[ATTR_SHOW_HOUR]);
    p->show_millis = spvxml_attr_parse_bool (&nctx, &attrs[ATTR_SHOW_MILLIS]);
    p->show_minute = spvxml_attr_parse_bool (&nctx, &attrs[ATTR_SHOW_MINUTE]);
    p->show_month = spvxml_attr_parse_bool (&nctx, &attrs[ATTR_SHOW_MONTH]);
    p->show_quarter = spvxml_attr_parse_bool (&nctx, &attrs[ATTR_SHOW_QUARTER]);
    p->show_second = spvxml_attr_parse_bool (&nctx, &attrs[ATTR_SHOW_SECOND]);
    p->show_week = spvxml_attr_parse_bool (&nctx, &attrs[ATTR_SHOW_WEEK]);
    p->show_year = spvxml_attr_parse_bool (&nctx, &attrs[ATTR_SHOW_YEAR]);
    p->small = spvxml_attr_parse_real (&nctx, &attrs[ATTR_SMALL]);
    p->suffix = attrs[ATTR_SUFFIX].value;
    attrs[ATTR_SUFFIX].value = NULL;
    p->try_strings_as_numbers = spvxml_attr_parse_bool (&nctx, &attrs[ATTR_TRY_STRINGS_AS_NUMBERS]);
    p->use_grouping = spvxml_attr_parse_bool (&nctx, &attrs[ATTR_USE_GROUPING]);
    p->week_padding = spvxml_attr_parse_bool (&nctx, &attrs[ATTR_WEEK_PADDING]);
    p->week_suffix = attrs[ATTR_WEEK_SUFFIX].value;
    attrs[ATTR_WEEK_SUFFIX].value = NULL;
    p->year_abbreviation = spvxml_attr_parse_bool (&nctx, &attrs[ATTR_YEAR_ABBREVIATION]);
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvdx_free_format (p);
        return false;
    }

    /* Parse content. */
    input = input->children;
    if (!spvdx_parse_format_1 (&nctx, &input, p)
        || !spvxml_content_parse_end (&nctx, input)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvdx_free_format (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvdx_free_format (struct spvdx_format *p)
{
    if (!p)
        return;

    free (p->error_character);
    free (p->separator_chars);
    free (p->quarter_prefix);
    free (p->quarter_suffix);
    free (p->week_suffix);
    free (p->prefix);
    free (p->suffix);
    for (size_t i = 0; i < p->n_relabel; i++)
        spvdx_free_relabel (p->relabel[i]);
    free (p->relabel);
    for (size_t i = 0; i < p->n_affix; i++)
        spvdx_free_affix (p->affix[i]);
    free (p->affix);
    free (p->node_.id);
    free (p);
}

void
spvdx_collect_ids_format (struct spvxml_context *ctx, struct spvdx_format *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

    for (size_t i = 0; i < p->n_relabel; i++)
        spvdx_collect_ids_relabel (ctx, p->relabel[i]);
    for (size_t i = 0; i < p->n_affix; i++)
        spvdx_collect_ids_affix (ctx, p->affix[i]);
}

bool
spvdx_is_format (const struct spvxml_node *node)
{
    return node->class_ == &spvdx_format_class;
}

struct spvdx_format *
spvdx_cast_format (const struct spvxml_node *node)
{
    return (node && spvdx_is_format (node)
            ? UP_CAST (node, struct spvdx_format, node_)
            : NULL);
}

void
spvdx_resolve_refs_format (struct spvxml_context *ctx UNUSED, struct spvdx_format *p UNUSED)
{
    if (!p)
        return;

    for (size_t i = 0; i < p->n_relabel; i++)
        spvdx_resolve_refs_relabel (ctx, p->relabel[i]);
    for (size_t i = 0; i < p->n_affix; i++)
        spvdx_resolve_refs_affix (ctx, p->affix[i]);
}

static void
spvdx_do_free_format (struct spvxml_node *node)
{
    spvdx_free_format (UP_CAST (node, struct spvdx_format, node_));
}

static void
spvdx_do_collect_ids_format (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_collect_ids_format (ctx, UP_CAST (node, struct spvdx_format, node_));
}

static void
spvdx_do_resolve_refs_format (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_resolve_refs_format (ctx, UP_CAST (node, struct spvdx_format, node_));
}

struct spvxml_node_class spvdx_format_class = {
    "format",
    spvdx_do_free_format,
    spvdx_do_collect_ids_format,
    spvdx_do_resolve_refs_format,
};


static bool UNUSED
spvdx_try_parse_format_mapping (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvdx_format_mapping *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvdx_format_mapping *))
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
spvdx_parse_format_mapping_2 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_format_mapping *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "format", &node))
        return false;
    if (!spvdx_parse_format (nctx->up, node, &p->format))
        return false;
    return true;
}

static bool
spvdx_parse_format_mapping_1 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_format_mapping *p)
{
    spvdx_try_parse_format_mapping (nctx, input, p, spvdx_parse_format_mapping_2);
    return true;
}

bool
spvdx_parse_format_mapping (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvdx_format_mapping **p_)
{
    enum {
        ATTR_FROM,
        ATTR_ID,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_FROM] = { "from", true, NULL },
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
    struct spvdx_format_mapping *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvdx_format_mapping_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->from = spvxml_attr_parse_int (&nctx, &attrs[ATTR_FROM]);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvdx_free_format_mapping (p);
        return false;
    }

    /* Parse content. */
    input = input->children;
    if (!spvdx_parse_format_mapping_1 (&nctx, &input, p)
        || !spvxml_content_parse_end (&nctx, input)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvdx_free_format_mapping (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvdx_free_format_mapping (struct spvdx_format_mapping *p)
{
    if (!p)
        return;

    spvdx_free_format (p->format);
    free (p->node_.id);
    free (p);
}

void
spvdx_collect_ids_format_mapping (struct spvxml_context *ctx, struct spvdx_format_mapping *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

    spvdx_collect_ids_format (ctx, p->format);
}

bool
spvdx_is_format_mapping (const struct spvxml_node *node)
{
    return node->class_ == &spvdx_format_mapping_class;
}

struct spvdx_format_mapping *
spvdx_cast_format_mapping (const struct spvxml_node *node)
{
    return (node && spvdx_is_format_mapping (node)
            ? UP_CAST (node, struct spvdx_format_mapping, node_)
            : NULL);
}

void
spvdx_resolve_refs_format_mapping (struct spvxml_context *ctx UNUSED, struct spvdx_format_mapping *p UNUSED)
{
    if (!p)
        return;

    spvdx_resolve_refs_format (ctx, p->format);
}

static void
spvdx_do_free_format_mapping (struct spvxml_node *node)
{
    spvdx_free_format_mapping (UP_CAST (node, struct spvdx_format_mapping, node_));
}

static void
spvdx_do_collect_ids_format_mapping (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_collect_ids_format_mapping (ctx, UP_CAST (node, struct spvdx_format_mapping, node_));
}

static void
spvdx_do_resolve_refs_format_mapping (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_resolve_refs_format_mapping (ctx, UP_CAST (node, struct spvdx_format_mapping, node_));
}

struct spvxml_node_class spvdx_format_mapping_class = {
    "formatMapping",
    spvdx_do_free_format_mapping,
    spvdx_do_collect_ids_format_mapping,
    spvdx_do_resolve_refs_format_mapping,
};


static bool UNUSED
spvdx_try_parse_formatting (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvdx_formatting *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvdx_formatting *))
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
spvdx_parse_formatting_2 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_formatting *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "formatMapping", &node))
        return false;
    struct spvdx_format_mapping *format_mapping;
    if (!spvdx_parse_format_mapping (nctx->up, node, &format_mapping))
        return false;
    p->format_mapping = xrealloc (p->format_mapping, sizeof *p->format_mapping * (p->n_format_mapping + 1));
    p->format_mapping[p->n_format_mapping++] = format_mapping;
    return true;
}

static bool
spvdx_parse_formatting_1 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_formatting *p)
{
    while (spvdx_try_parse_formatting (nctx, input, p, spvdx_parse_formatting_2))
        continue;
    return true;
}

bool
spvdx_parse_formatting (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvdx_formatting **p_)
{
    enum {
        ATTR_ID,
        ATTR_VARIABLE,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_ID] = { "id", false, NULL },
        [ATTR_VARIABLE] = { "variable", true, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvdx_formatting *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvdx_formatting_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvdx_free_formatting (p);
        return false;
    }

    /* Parse content. */
    input = input->children;
    if (!spvdx_parse_formatting_1 (&nctx, &input, p)
        || !spvxml_content_parse_end (&nctx, input)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvdx_free_formatting (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvdx_free_formatting (struct spvdx_formatting *p)
{
    if (!p)
        return;

    for (size_t i = 0; i < p->n_format_mapping; i++)
        spvdx_free_format_mapping (p->format_mapping[i]);
    free (p->format_mapping);
    free (p->node_.id);
    free (p);
}

void
spvdx_collect_ids_formatting (struct spvxml_context *ctx, struct spvdx_formatting *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

    for (size_t i = 0; i < p->n_format_mapping; i++)
        spvdx_collect_ids_format_mapping (ctx, p->format_mapping[i]);
}

bool
spvdx_is_formatting (const struct spvxml_node *node)
{
    return node->class_ == &spvdx_formatting_class;
}

struct spvdx_formatting *
spvdx_cast_formatting (const struct spvxml_node *node)
{
    return (node && spvdx_is_formatting (node)
            ? UP_CAST (node, struct spvdx_formatting, node_)
            : NULL);
}

void
spvdx_resolve_refs_formatting (struct spvxml_context *ctx UNUSED, struct spvdx_formatting *p UNUSED)
{
    if (!p)
        return;

    static const struct spvxml_node_class *const classes[] = {
        &spvdx_derived_variable_class,
        &spvdx_source_variable_class,
    };
    const size_t n_classes = sizeof classes / sizeof *classes;
    p->variable = spvxml_node_resolve_ref (ctx, p->node_.raw, "variable", classes, n_classes);
    for (size_t i = 0; i < p->n_format_mapping; i++)
        spvdx_resolve_refs_format_mapping (ctx, p->format_mapping[i]);
}

static void
spvdx_do_free_formatting (struct spvxml_node *node)
{
    spvdx_free_formatting (UP_CAST (node, struct spvdx_formatting, node_));
}

static void
spvdx_do_collect_ids_formatting (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_collect_ids_formatting (ctx, UP_CAST (node, struct spvdx_formatting, node_));
}

static void
spvdx_do_resolve_refs_formatting (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_resolve_refs_formatting (ctx, UP_CAST (node, struct spvdx_formatting, node_));
}

struct spvxml_node_class spvdx_formatting_class = {
    "formatting",
    spvdx_do_free_formatting,
    spvdx_do_collect_ids_formatting,
    spvdx_do_resolve_refs_formatting,
};


static bool UNUSED
spvdx_try_parse_graph (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvdx_graph *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvdx_graph *))
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
spvdx_parse_graph_2 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_graph *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "location", &node))
        return false;
    struct spvdx_location *location;
    if (!spvdx_parse_location (nctx->up, node, &location))
        return false;
    p->location = xrealloc (p->location, sizeof *p->location * (p->n_location + 1));
    p->location[p->n_location++] = location;
    return true;
}

static bool
spvdx_parse_graph_1 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_graph *p)
{
    if (!spvdx_parse_graph_2 (nctx, input, p))
        return false;
    while (spvdx_try_parse_graph (nctx, input, p, spvdx_parse_graph_2))
        continue;

    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "coordinates", &node))
        return false;
    if (!spvdx_parse_coordinates (nctx->up, node, &p->coordinates))
        return false;

    xmlNode *node2;
    if (!spvxml_content_parse_element (nctx, input, "faceting", &node2))
        return false;
    if (!spvdx_parse_faceting (nctx->up, node2, &p->faceting))
        return false;

    xmlNode *node3;
    if (!spvxml_content_parse_element (nctx, input, "facetLayout", &node3))
        return false;
    if (!spvdx_parse_facet_layout (nctx->up, node3, &p->facet_layout))
        return false;

    xmlNode *node4;
    if (!spvxml_content_parse_element (nctx, input, "interval", &node4))
        return false;
    if (!spvdx_parse_interval (nctx->up, node4, &p->interval))
        return false;
    return true;
}

bool
spvdx_parse_graph (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvdx_graph **p_)
{
    enum {
        ATTR_CELL_STYLE,
        ATTR_ID,
        ATTR_STYLE,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_CELL_STYLE] = { "cellStyle", true, NULL },
        [ATTR_ID] = { "id", false, NULL },
        [ATTR_STYLE] = { "style", true, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvdx_graph *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvdx_graph_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvdx_free_graph (p);
        return false;
    }

    /* Parse content. */
    input = input->children;
    if (!spvdx_parse_graph_1 (&nctx, &input, p)
        || !spvxml_content_parse_end (&nctx, input)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvdx_free_graph (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvdx_free_graph (struct spvdx_graph *p)
{
    if (!p)
        return;

    for (size_t i = 0; i < p->n_location; i++)
        spvdx_free_location (p->location[i]);
    free (p->location);
    spvdx_free_coordinates (p->coordinates);
    spvdx_free_faceting (p->faceting);
    spvdx_free_facet_layout (p->facet_layout);
    spvdx_free_interval (p->interval);
    free (p->node_.id);
    free (p);
}

void
spvdx_collect_ids_graph (struct spvxml_context *ctx, struct spvdx_graph *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

    for (size_t i = 0; i < p->n_location; i++)
        spvdx_collect_ids_location (ctx, p->location[i]);
    spvdx_collect_ids_coordinates (ctx, p->coordinates);
    spvdx_collect_ids_faceting (ctx, p->faceting);
    spvdx_collect_ids_facet_layout (ctx, p->facet_layout);
    spvdx_collect_ids_interval (ctx, p->interval);
}

bool
spvdx_is_graph (const struct spvxml_node *node)
{
    return node->class_ == &spvdx_graph_class;
}

struct spvdx_graph *
spvdx_cast_graph (const struct spvxml_node *node)
{
    return (node && spvdx_is_graph (node)
            ? UP_CAST (node, struct spvdx_graph, node_)
            : NULL);
}

void
spvdx_resolve_refs_graph (struct spvxml_context *ctx UNUSED, struct spvdx_graph *p UNUSED)
{
    if (!p)
        return;

    static const struct spvxml_node_class *const classes
        = &spvdx_style_class;
    p->cell_style = spvdx_cast_style (spvxml_node_resolve_ref (ctx, p->node_.raw, "cellStyle", &classes, 1));
    static const struct spvxml_node_class *const classes2
        = &spvdx_style_class;
    p->style = spvdx_cast_style (spvxml_node_resolve_ref (ctx, p->node_.raw, "style", &classes2, 1));
    for (size_t i = 0; i < p->n_location; i++)
        spvdx_resolve_refs_location (ctx, p->location[i]);
    spvdx_resolve_refs_coordinates (ctx, p->coordinates);
    spvdx_resolve_refs_faceting (ctx, p->faceting);
    spvdx_resolve_refs_facet_layout (ctx, p->facet_layout);
    spvdx_resolve_refs_interval (ctx, p->interval);
}

static void
spvdx_do_free_graph (struct spvxml_node *node)
{
    spvdx_free_graph (UP_CAST (node, struct spvdx_graph, node_));
}

static void
spvdx_do_collect_ids_graph (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_collect_ids_graph (ctx, UP_CAST (node, struct spvdx_graph, node_));
}

static void
spvdx_do_resolve_refs_graph (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_resolve_refs_graph (ctx, UP_CAST (node, struct spvdx_graph, node_));
}

struct spvxml_node_class spvdx_graph_class = {
    "graph",
    spvdx_do_free_graph,
    spvdx_do_collect_ids_graph,
    spvdx_do_resolve_refs_graph,
};


static bool UNUSED
spvdx_try_parse_gridline (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvdx_gridline *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvdx_gridline *))
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
spvdx_parse_gridline (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvdx_gridline **p_)
{
    enum {
        ATTR_ID,
        ATTR_STYLE,
        ATTR_Z_ORDER,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_ID] = { "id", false, NULL },
        [ATTR_STYLE] = { "style", true, NULL },
        [ATTR_Z_ORDER] = { "zOrder", true, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvdx_gridline *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvdx_gridline_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    p->z_order = spvxml_attr_parse_int (&nctx, &attrs[ATTR_Z_ORDER]);
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvdx_free_gridline (p);
        return false;
    }

    /* Parse content. */
    if (!spvxml_content_parse_end (&nctx, input->children)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvdx_free_gridline (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvdx_free_gridline (struct spvdx_gridline *p)
{
    if (!p)
        return;

    free (p->node_.id);
    free (p);
}

void
spvdx_collect_ids_gridline (struct spvxml_context *ctx, struct spvdx_gridline *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

}

bool
spvdx_is_gridline (const struct spvxml_node *node)
{
    return node->class_ == &spvdx_gridline_class;
}

struct spvdx_gridline *
spvdx_cast_gridline (const struct spvxml_node *node)
{
    return (node && spvdx_is_gridline (node)
            ? UP_CAST (node, struct spvdx_gridline, node_)
            : NULL);
}

void
spvdx_resolve_refs_gridline (struct spvxml_context *ctx UNUSED, struct spvdx_gridline *p UNUSED)
{
    if (!p)
        return;

    static const struct spvxml_node_class *const classes
        = &spvdx_style_class;
    p->style = spvdx_cast_style (spvxml_node_resolve_ref (ctx, p->node_.raw, "style", &classes, 1));
}

static void
spvdx_do_free_gridline (struct spvxml_node *node)
{
    spvdx_free_gridline (UP_CAST (node, struct spvdx_gridline, node_));
}

static void
spvdx_do_collect_ids_gridline (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_collect_ids_gridline (ctx, UP_CAST (node, struct spvdx_gridline, node_));
}

static void
spvdx_do_resolve_refs_gridline (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_resolve_refs_gridline (ctx, UP_CAST (node, struct spvdx_gridline, node_));
}

struct spvxml_node_class spvdx_gridline_class = {
    "gridline",
    spvdx_do_free_gridline,
    spvdx_do_collect_ids_gridline,
    spvdx_do_resolve_refs_gridline,
};


static bool UNUSED
spvdx_try_parse_intersect (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvdx_intersect *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvdx_intersect *))
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
spvdx_parse_intersect_6 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_intersect *p)
{
    (void) nctx;
    (void) input;
    (void) p;
    return true;
}

static bool
spvdx_parse_intersect_5 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_intersect *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "alternating", &node))
        return false;
    if (!spvdx_parse_alternating (nctx->up, node, &p->alternating))
        return false;
    return true;
}

static bool
spvdx_parse_intersect_4 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_intersect *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "intersectWhere", &node))
        return false;
    if (!spvdx_parse_intersect_where (nctx->up, node, &p->intersect_where))
        return false;
    return true;
}

static bool
spvdx_parse_intersect_3 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_intersect *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "where", &node))
        return false;
    struct spvdx_where *where;
    if (!spvdx_parse_where (nctx->up, node, &where))
        return false;
    p->where = xrealloc (p->where, sizeof *p->where * (p->n_where + 1));
    p->where[p->n_where++] = where;
    return true;
}

static bool
spvdx_parse_intersect_2 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_intersect *p)
{
    if (!spvdx_parse_intersect_3 (nctx, input, p))
        return false;
    while (spvdx_try_parse_intersect (nctx, input, p, spvdx_parse_intersect_3))
        continue;
    return true;
}

static bool
spvdx_parse_intersect_1 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_intersect *p)
{
    if (!spvdx_try_parse_intersect (nctx, input, p, spvdx_parse_intersect_2)
        && !spvdx_try_parse_intersect (nctx, input, p, spvdx_parse_intersect_4)
        && !spvdx_try_parse_intersect (nctx, input, p, spvdx_parse_intersect_5)
        && !spvdx_try_parse_intersect (nctx, input, p, spvdx_parse_intersect_6))
      {
        spvxml_content_error (nctx, *input, "Syntax error.");
        return false;
      }
    return true;
}

bool
spvdx_parse_intersect (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvdx_intersect **p_)
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
    struct spvdx_intersect *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvdx_intersect_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvdx_free_intersect (p);
        return false;
    }

    /* Parse content. */
    input = input->children;
    if (!spvdx_parse_intersect_1 (&nctx, &input, p)
        || !spvxml_content_parse_end (&nctx, input)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvdx_free_intersect (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvdx_free_intersect (struct spvdx_intersect *p)
{
    if (!p)
        return;

    for (size_t i = 0; i < p->n_where; i++)
        spvdx_free_where (p->where[i]);
    free (p->where);
    spvdx_free_intersect_where (p->intersect_where);
    spvdx_free_alternating (p->alternating);
    free (p->node_.id);
    free (p);
}

void
spvdx_collect_ids_intersect (struct spvxml_context *ctx, struct spvdx_intersect *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

    for (size_t i = 0; i < p->n_where; i++)
        spvdx_collect_ids_where (ctx, p->where[i]);
    spvdx_collect_ids_intersect_where (ctx, p->intersect_where);
    spvdx_collect_ids_alternating (ctx, p->alternating);
}

bool
spvdx_is_intersect (const struct spvxml_node *node)
{
    return node->class_ == &spvdx_intersect_class;
}

struct spvdx_intersect *
spvdx_cast_intersect (const struct spvxml_node *node)
{
    return (node && spvdx_is_intersect (node)
            ? UP_CAST (node, struct spvdx_intersect, node_)
            : NULL);
}

void
spvdx_resolve_refs_intersect (struct spvxml_context *ctx UNUSED, struct spvdx_intersect *p UNUSED)
{
    if (!p)
        return;

    for (size_t i = 0; i < p->n_where; i++)
        spvdx_resolve_refs_where (ctx, p->where[i]);
    spvdx_resolve_refs_intersect_where (ctx, p->intersect_where);
    spvdx_resolve_refs_alternating (ctx, p->alternating);
}

static void
spvdx_do_free_intersect (struct spvxml_node *node)
{
    spvdx_free_intersect (UP_CAST (node, struct spvdx_intersect, node_));
}

static void
spvdx_do_collect_ids_intersect (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_collect_ids_intersect (ctx, UP_CAST (node, struct spvdx_intersect, node_));
}

static void
spvdx_do_resolve_refs_intersect (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_resolve_refs_intersect (ctx, UP_CAST (node, struct spvdx_intersect, node_));
}

struct spvxml_node_class spvdx_intersect_class = {
    "intersect",
    spvdx_do_free_intersect,
    spvdx_do_collect_ids_intersect,
    spvdx_do_resolve_refs_intersect,
};


static bool UNUSED
spvdx_try_parse_intersect_where (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvdx_intersect_where *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvdx_intersect_where *))
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
spvdx_parse_intersect_where (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvdx_intersect_where **p_)
{
    enum {
        ATTR_ID,
        ATTR_VARIABLE,
        ATTR_VARIABLE2,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_ID] = { "id", false, NULL },
        [ATTR_VARIABLE] = { "variable", true, NULL },
        [ATTR_VARIABLE2] = { "variable2", true, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvdx_intersect_where *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvdx_intersect_where_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvdx_free_intersect_where (p);
        return false;
    }

    /* Parse content. */
    if (!spvxml_content_parse_end (&nctx, input->children)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvdx_free_intersect_where (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvdx_free_intersect_where (struct spvdx_intersect_where *p)
{
    if (!p)
        return;

    free (p->node_.id);
    free (p);
}

void
spvdx_collect_ids_intersect_where (struct spvxml_context *ctx, struct spvdx_intersect_where *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

}

bool
spvdx_is_intersect_where (const struct spvxml_node *node)
{
    return node->class_ == &spvdx_intersect_where_class;
}

struct spvdx_intersect_where *
spvdx_cast_intersect_where (const struct spvxml_node *node)
{
    return (node && spvdx_is_intersect_where (node)
            ? UP_CAST (node, struct spvdx_intersect_where, node_)
            : NULL);
}

void
spvdx_resolve_refs_intersect_where (struct spvxml_context *ctx UNUSED, struct spvdx_intersect_where *p UNUSED)
{
    if (!p)
        return;

    static const struct spvxml_node_class *const classes[] = {
        &spvdx_derived_variable_class,
        &spvdx_source_variable_class,
    };
    const size_t n_classes = sizeof classes / sizeof *classes;
    p->variable = spvxml_node_resolve_ref (ctx, p->node_.raw, "variable", classes, n_classes);
    static const struct spvxml_node_class *const classes2[] = {
        &spvdx_derived_variable_class,
        &spvdx_source_variable_class,
    };
    const size_t n_classes2 = sizeof classes2 / sizeof *classes2;
    p->variable2 = spvxml_node_resolve_ref (ctx, p->node_.raw, "variable2", classes2, n_classes2);
}

static void
spvdx_do_free_intersect_where (struct spvxml_node *node)
{
    spvdx_free_intersect_where (UP_CAST (node, struct spvdx_intersect_where, node_));
}

static void
spvdx_do_collect_ids_intersect_where (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_collect_ids_intersect_where (ctx, UP_CAST (node, struct spvdx_intersect_where, node_));
}

static void
spvdx_do_resolve_refs_intersect_where (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_resolve_refs_intersect_where (ctx, UP_CAST (node, struct spvdx_intersect_where, node_));
}

struct spvxml_node_class spvdx_intersect_where_class = {
    "intersectWhere",
    spvdx_do_free_intersect_where,
    spvdx_do_collect_ids_intersect_where,
    spvdx_do_resolve_refs_intersect_where,
};


static bool UNUSED
spvdx_try_parse_interval (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvdx_interval *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvdx_interval *))
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
spvdx_parse_interval_2 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_interval *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "footnotes", &node))
        return false;
    if (!spvdx_parse_footnotes (nctx->up, node, &p->footnotes))
        return false;
    return true;
}

static bool
spvdx_parse_interval_1 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_interval *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "labeling", &node))
        return false;
    if (!spvdx_parse_labeling (nctx->up, node, &p->labeling))
        return false;
    spvdx_try_parse_interval (nctx, input, p, spvdx_parse_interval_2);
    return true;
}

bool
spvdx_parse_interval (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvdx_interval **p_)
{
    enum {
        ATTR_ID,
        ATTR_STYLE,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_ID] = { "id", false, NULL },
        [ATTR_STYLE] = { "style", true, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvdx_interval *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvdx_interval_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvdx_free_interval (p);
        return false;
    }

    /* Parse content. */
    input = input->children;
    if (!spvdx_parse_interval_1 (&nctx, &input, p)
        || !spvxml_content_parse_end (&nctx, input)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvdx_free_interval (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvdx_free_interval (struct spvdx_interval *p)
{
    if (!p)
        return;

    spvdx_free_labeling (p->labeling);
    spvdx_free_footnotes (p->footnotes);
    free (p->node_.id);
    free (p);
}

void
spvdx_collect_ids_interval (struct spvxml_context *ctx, struct spvdx_interval *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

    spvdx_collect_ids_labeling (ctx, p->labeling);
    spvdx_collect_ids_footnotes (ctx, p->footnotes);
}

bool
spvdx_is_interval (const struct spvxml_node *node)
{
    return node->class_ == &spvdx_interval_class;
}

struct spvdx_interval *
spvdx_cast_interval (const struct spvxml_node *node)
{
    return (node && spvdx_is_interval (node)
            ? UP_CAST (node, struct spvdx_interval, node_)
            : NULL);
}

void
spvdx_resolve_refs_interval (struct spvxml_context *ctx UNUSED, struct spvdx_interval *p UNUSED)
{
    if (!p)
        return;

    static const struct spvxml_node_class *const classes
        = &spvdx_style_class;
    p->style = spvdx_cast_style (spvxml_node_resolve_ref (ctx, p->node_.raw, "style", &classes, 1));
    spvdx_resolve_refs_labeling (ctx, p->labeling);
    spvdx_resolve_refs_footnotes (ctx, p->footnotes);
}

static void
spvdx_do_free_interval (struct spvxml_node *node)
{
    spvdx_free_interval (UP_CAST (node, struct spvdx_interval, node_));
}

static void
spvdx_do_collect_ids_interval (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_collect_ids_interval (ctx, UP_CAST (node, struct spvdx_interval, node_));
}

static void
spvdx_do_resolve_refs_interval (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_resolve_refs_interval (ctx, UP_CAST (node, struct spvdx_interval, node_));
}

struct spvxml_node_class spvdx_interval_class = {
    "interval",
    spvdx_do_free_interval,
    spvdx_do_collect_ids_interval,
    spvdx_do_resolve_refs_interval,
};


static bool UNUSED
spvdx_try_parse_label (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvdx_label *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvdx_label *))
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
spvdx_parse_label_4 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_label *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "descriptionGroup", &node))
        return false;
    if (!spvdx_parse_description_group (nctx->up, node, &p->description_group))
        return false;
    return true;
}

static bool
spvdx_parse_label_3 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_label *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "text", &node))
        return false;
    struct spvdx_text *text;
    if (!spvdx_parse_text (nctx->up, node, &text))
        return false;
    p->text = xrealloc (p->text, sizeof *p->text * (p->n_text + 1));
    p->text[p->n_text++] = text;
    return true;
}

static bool
spvdx_parse_label_2 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_label *p)
{
    if (!spvdx_parse_label_3 (nctx, input, p))
        return false;
    while (spvdx_try_parse_label (nctx, input, p, spvdx_parse_label_3))
        continue;
    return true;
}

static bool
spvdx_parse_label_1 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_label *p)
{
    if (!spvdx_try_parse_label (nctx, input, p, spvdx_parse_label_2)
        && !spvdx_try_parse_label (nctx, input, p, spvdx_parse_label_4))
      {
        spvxml_content_error (nctx, *input, "Syntax error.");
        return false;
      }
    return true;
}

bool
spvdx_parse_label (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvdx_label **p_)
{
    enum {
        ATTR_ID,
        ATTR_PURPOSE,
        ATTR_STYLE,
        ATTR_TEXT_FRAME_STYLE,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_ID] = { "id", false, NULL },
        [ATTR_PURPOSE] = { "purpose", false, NULL },
        [ATTR_STYLE] = { "style", true, NULL },
        [ATTR_TEXT_FRAME_STYLE] = { "textFrameStyle", false, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvdx_label *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvdx_label_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    p->purpose = spvxml_attr_parse_enum (
        &nctx, &attrs[ATTR_PURPOSE], spvdx_purpose_map);
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvdx_free_label (p);
        return false;
    }

    /* Parse content. */
    input = input->children;
    if (!spvdx_parse_label_1 (&nctx, &input, p)
        || !spvxml_content_parse_end (&nctx, input)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvdx_free_label (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvdx_free_label (struct spvdx_label *p)
{
    if (!p)
        return;

    for (size_t i = 0; i < p->n_text; i++)
        spvdx_free_text (p->text[i]);
    free (p->text);
    spvdx_free_description_group (p->description_group);
    free (p->node_.id);
    free (p);
}

void
spvdx_collect_ids_label (struct spvxml_context *ctx, struct spvdx_label *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

    for (size_t i = 0; i < p->n_text; i++)
        spvdx_collect_ids_text (ctx, p->text[i]);
    spvdx_collect_ids_description_group (ctx, p->description_group);
}

bool
spvdx_is_label (const struct spvxml_node *node)
{
    return node->class_ == &spvdx_label_class;
}

struct spvdx_label *
spvdx_cast_label (const struct spvxml_node *node)
{
    return (node && spvdx_is_label (node)
            ? UP_CAST (node, struct spvdx_label, node_)
            : NULL);
}

void
spvdx_resolve_refs_label (struct spvxml_context *ctx UNUSED, struct spvdx_label *p UNUSED)
{
    if (!p)
        return;

    static const struct spvxml_node_class *const classes
        = &spvdx_style_class;
    p->style = spvdx_cast_style (spvxml_node_resolve_ref (ctx, p->node_.raw, "style", &classes, 1));
    static const struct spvxml_node_class *const classes2
        = &spvdx_style_class;
    p->text_frame_style = spvdx_cast_style (spvxml_node_resolve_ref (ctx, p->node_.raw, "textFrameStyle", &classes2, 1));
    for (size_t i = 0; i < p->n_text; i++)
        spvdx_resolve_refs_text (ctx, p->text[i]);
    spvdx_resolve_refs_description_group (ctx, p->description_group);
}

static void
spvdx_do_free_label (struct spvxml_node *node)
{
    spvdx_free_label (UP_CAST (node, struct spvdx_label, node_));
}

static void
spvdx_do_collect_ids_label (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_collect_ids_label (ctx, UP_CAST (node, struct spvdx_label, node_));
}

static void
spvdx_do_resolve_refs_label (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_resolve_refs_label (ctx, UP_CAST (node, struct spvdx_label, node_));
}

struct spvxml_node_class spvdx_label_class = {
    "label",
    spvdx_do_free_label,
    spvdx_do_collect_ids_label,
    spvdx_do_resolve_refs_label,
};


static bool UNUSED
spvdx_try_parse_label_frame (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvdx_label_frame *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvdx_label_frame *))
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
spvdx_parse_label_frame_4 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_label_frame *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "paragraph", &node))
        return false;
    if (!spvdx_parse_paragraph (nctx->up, node, &p->paragraph))
        return false;
    return true;
}

static bool
spvdx_parse_label_frame_3 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_label_frame *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "label", &node))
        return false;
    if (!spvdx_parse_label (nctx->up, node, &p->label))
        return false;
    return true;
}

static bool
spvdx_parse_label_frame_2 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_label_frame *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "location", &node))
        return false;
    struct spvdx_location *location;
    if (!spvdx_parse_location (nctx->up, node, &location))
        return false;
    p->location = xrealloc (p->location, sizeof *p->location * (p->n_location + 1));
    p->location[p->n_location++] = location;
    return true;
}

static bool
spvdx_parse_label_frame_1 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_label_frame *p)
{
    if (!spvdx_parse_label_frame_2 (nctx, input, p))
        return false;
    while (spvdx_try_parse_label_frame (nctx, input, p, spvdx_parse_label_frame_2))
        continue;
    spvdx_try_parse_label_frame (nctx, input, p, spvdx_parse_label_frame_3);
    spvdx_try_parse_label_frame (nctx, input, p, spvdx_parse_label_frame_4);
    return true;
}

bool
spvdx_parse_label_frame (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvdx_label_frame **p_)
{
    enum {
        ATTR_ID,
        ATTR_STYLE,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_ID] = { "id", false, NULL },
        [ATTR_STYLE] = { "style", true, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvdx_label_frame *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvdx_label_frame_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvdx_free_label_frame (p);
        return false;
    }

    /* Parse content. */
    input = input->children;
    if (!spvdx_parse_label_frame_1 (&nctx, &input, p)
        || !spvxml_content_parse_end (&nctx, input)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvdx_free_label_frame (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvdx_free_label_frame (struct spvdx_label_frame *p)
{
    if (!p)
        return;

    for (size_t i = 0; i < p->n_location; i++)
        spvdx_free_location (p->location[i]);
    free (p->location);
    spvdx_free_label (p->label);
    spvdx_free_paragraph (p->paragraph);
    free (p->node_.id);
    free (p);
}

void
spvdx_collect_ids_label_frame (struct spvxml_context *ctx, struct spvdx_label_frame *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

    for (size_t i = 0; i < p->n_location; i++)
        spvdx_collect_ids_location (ctx, p->location[i]);
    spvdx_collect_ids_label (ctx, p->label);
    spvdx_collect_ids_paragraph (ctx, p->paragraph);
}

bool
spvdx_is_label_frame (const struct spvxml_node *node)
{
    return node->class_ == &spvdx_label_frame_class;
}

struct spvdx_label_frame *
spvdx_cast_label_frame (const struct spvxml_node *node)
{
    return (node && spvdx_is_label_frame (node)
            ? UP_CAST (node, struct spvdx_label_frame, node_)
            : NULL);
}

void
spvdx_resolve_refs_label_frame (struct spvxml_context *ctx UNUSED, struct spvdx_label_frame *p UNUSED)
{
    if (!p)
        return;

    static const struct spvxml_node_class *const classes
        = &spvdx_style_class;
    p->style = spvdx_cast_style (spvxml_node_resolve_ref (ctx, p->node_.raw, "style", &classes, 1));
    for (size_t i = 0; i < p->n_location; i++)
        spvdx_resolve_refs_location (ctx, p->location[i]);
    spvdx_resolve_refs_label (ctx, p->label);
    spvdx_resolve_refs_paragraph (ctx, p->paragraph);
}

static void
spvdx_do_free_label_frame (struct spvxml_node *node)
{
    spvdx_free_label_frame (UP_CAST (node, struct spvdx_label_frame, node_));
}

static void
spvdx_do_collect_ids_label_frame (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_collect_ids_label_frame (ctx, UP_CAST (node, struct spvdx_label_frame, node_));
}

static void
spvdx_do_resolve_refs_label_frame (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_resolve_refs_label_frame (ctx, UP_CAST (node, struct spvdx_label_frame, node_));
}

struct spvxml_node_class spvdx_label_frame_class = {
    "labelFrame",
    spvdx_do_free_label_frame,
    spvdx_do_collect_ids_label_frame,
    spvdx_do_resolve_refs_label_frame,
};


static bool UNUSED
spvdx_try_parse_labeling (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvdx_labeling *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvdx_labeling *))
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
spvdx_parse_labeling_5 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_labeling *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "footnotes", &node))
        return false;
    struct spvdx_footnotes *seq;
    if (!spvdx_parse_footnotes (nctx->up, node, &seq))
        return false;
    p->seq = xrealloc (p->seq, sizeof *p->seq * (p->n_seq + 1));
    p->seq[p->n_seq++] = &seq->node_;
    return true;
}

static bool
spvdx_parse_labeling_4 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_labeling *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "format", &node))
        return false;
    struct spvdx_format *seq;
    if (!spvdx_parse_format (nctx->up, node, &seq))
        return false;
    p->seq = xrealloc (p->seq, sizeof *p->seq * (p->n_seq + 1));
    p->seq[p->n_seq++] = &seq->node_;
    return true;
}

static bool
spvdx_parse_labeling_3 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_labeling *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "formatting", &node))
        return false;
    struct spvdx_formatting *seq;
    if (!spvdx_parse_formatting (nctx->up, node, &seq))
        return false;
    p->seq = xrealloc (p->seq, sizeof *p->seq * (p->n_seq + 1));
    p->seq[p->n_seq++] = &seq->node_;
    return true;
}

static bool
spvdx_parse_labeling_2 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_labeling *p)
{
    if (!spvdx_try_parse_labeling (nctx, input, p, spvdx_parse_labeling_3)
        && !spvdx_try_parse_labeling (nctx, input, p, spvdx_parse_labeling_4)
        && !spvdx_try_parse_labeling (nctx, input, p, spvdx_parse_labeling_5))
      {
        spvxml_content_error (nctx, *input, "Syntax error.");
        return false;
      }
    return true;
}

static bool
spvdx_parse_labeling_1 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_labeling *p)
{
    while (spvdx_try_parse_labeling (nctx, input, p, spvdx_parse_labeling_2))
        continue;
    return true;
}

bool
spvdx_parse_labeling (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvdx_labeling **p_)
{
    enum {
        ATTR_ID,
        ATTR_STYLE,
        ATTR_VARIABLE,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_ID] = { "id", false, NULL },
        [ATTR_STYLE] = { "style", false, NULL },
        [ATTR_VARIABLE] = { "variable", true, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvdx_labeling *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvdx_labeling_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvdx_free_labeling (p);
        return false;
    }

    /* Parse content. */
    input = input->children;
    if (!spvdx_parse_labeling_1 (&nctx, &input, p)
        || !spvxml_content_parse_end (&nctx, input)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvdx_free_labeling (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvdx_free_labeling (struct spvdx_labeling *p)
{
    if (!p)
        return;

    for (size_t i = 0; i < p->n_seq; i++)
        p->seq[i]->class_->spvxml_node_free (p->seq[i]);
    free (p->seq);
    free (p->node_.id);
    free (p);
}

void
spvdx_collect_ids_labeling (struct spvxml_context *ctx, struct spvdx_labeling *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

    for (size_t i = 0; i < p->n_seq; i++)
        p->seq[i]->class_->spvxml_node_collect_ids (ctx, p->seq[i]);
}

bool
spvdx_is_labeling (const struct spvxml_node *node)
{
    return node->class_ == &spvdx_labeling_class;
}

struct spvdx_labeling *
spvdx_cast_labeling (const struct spvxml_node *node)
{
    return (node && spvdx_is_labeling (node)
            ? UP_CAST (node, struct spvdx_labeling, node_)
            : NULL);
}

void
spvdx_resolve_refs_labeling (struct spvxml_context *ctx UNUSED, struct spvdx_labeling *p UNUSED)
{
    if (!p)
        return;

    static const struct spvxml_node_class *const classes
        = &spvdx_style_class;
    p->style = spvdx_cast_style (spvxml_node_resolve_ref (ctx, p->node_.raw, "style", &classes, 1));
    static const struct spvxml_node_class *const classes2[] = {
        &spvdx_derived_variable_class,
        &spvdx_source_variable_class,
    };
    const size_t n_classes2 = sizeof classes2 / sizeof *classes2;
    p->variable = spvxml_node_resolve_ref (ctx, p->node_.raw, "variable", classes2, n_classes2);
    for (size_t i = 0; i < p->n_seq; i++)
        p->seq[i]->class_->spvxml_node_resolve_refs (ctx, p->seq[i]);
}

static void
spvdx_do_free_labeling (struct spvxml_node *node)
{
    spvdx_free_labeling (UP_CAST (node, struct spvdx_labeling, node_));
}

static void
spvdx_do_collect_ids_labeling (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_collect_ids_labeling (ctx, UP_CAST (node, struct spvdx_labeling, node_));
}

static void
spvdx_do_resolve_refs_labeling (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_resolve_refs_labeling (ctx, UP_CAST (node, struct spvdx_labeling, node_));
}

struct spvxml_node_class spvdx_labeling_class = {
    "labeling",
    spvdx_do_free_labeling,
    spvdx_do_collect_ids_labeling,
    spvdx_do_resolve_refs_labeling,
};


static bool UNUSED
spvdx_try_parse_layer (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvdx_layer *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvdx_layer *))
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
spvdx_parse_layer (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvdx_layer **p_)
{
    enum {
        ATTR_ID,
        ATTR_LAYER_METHOD,
        ATTR_TITLE_VISIBLE,
        ATTR_VALUE,
        ATTR_VARIABLE,
        ATTR_VISIBLE,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_ID] = { "id", false, NULL },
        [ATTR_LAYER_METHOD] = { "method", false, NULL },
        [ATTR_TITLE_VISIBLE] = { "titleVisible", false, NULL },
        [ATTR_VALUE] = { "value", true, NULL },
        [ATTR_VARIABLE] = { "variable", true, NULL },
        [ATTR_VISIBLE] = { "visible", false, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvdx_layer *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvdx_layer_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    p->layer_method_present = spvxml_attr_parse_fixed (
        &nctx, &attrs[ATTR_LAYER_METHOD], "nest");
    p->title_visible = spvxml_attr_parse_bool (&nctx, &attrs[ATTR_TITLE_VISIBLE]);
    p->value = attrs[ATTR_VALUE].value;
    attrs[ATTR_VALUE].value = NULL;
    p->visible = spvxml_attr_parse_bool (&nctx, &attrs[ATTR_VISIBLE]);
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvdx_free_layer (p);
        return false;
    }

    /* Parse content. */
    if (!spvxml_content_parse_end (&nctx, input->children)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvdx_free_layer (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvdx_free_layer (struct spvdx_layer *p)
{
    if (!p)
        return;

    free (p->value);
    free (p->node_.id);
    free (p);
}

void
spvdx_collect_ids_layer (struct spvxml_context *ctx, struct spvdx_layer *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

}

bool
spvdx_is_layer (const struct spvxml_node *node)
{
    return node->class_ == &spvdx_layer_class;
}

struct spvdx_layer *
spvdx_cast_layer (const struct spvxml_node *node)
{
    return (node && spvdx_is_layer (node)
            ? UP_CAST (node, struct spvdx_layer, node_)
            : NULL);
}

void
spvdx_resolve_refs_layer (struct spvxml_context *ctx UNUSED, struct spvdx_layer *p UNUSED)
{
    if (!p)
        return;

    static const struct spvxml_node_class *const classes[] = {
        &spvdx_derived_variable_class,
        &spvdx_source_variable_class,
    };
    const size_t n_classes = sizeof classes / sizeof *classes;
    p->variable = spvxml_node_resolve_ref (ctx, p->node_.raw, "variable", classes, n_classes);
}

static void
spvdx_do_free_layer (struct spvxml_node *node)
{
    spvdx_free_layer (UP_CAST (node, struct spvdx_layer, node_));
}

static void
spvdx_do_collect_ids_layer (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_collect_ids_layer (ctx, UP_CAST (node, struct spvdx_layer, node_));
}

static void
spvdx_do_resolve_refs_layer (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_resolve_refs_layer (ctx, UP_CAST (node, struct spvdx_layer, node_));
}

struct spvxml_node_class spvdx_layer_class = {
    "layer",
    spvdx_do_free_layer,
    spvdx_do_collect_ids_layer,
    spvdx_do_resolve_refs_layer,
};


static bool UNUSED
spvdx_try_parse_layer_controller (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvdx_layer_controller *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvdx_layer_controller *))
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
spvdx_parse_layer_controller (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvdx_layer_controller **p_)
{
    enum {
        ATTR_ID,
        ATTR_SOURCE,
        ATTR_TARGET,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_ID] = { "id", false, NULL },
        [ATTR_SOURCE] = { "source", true, NULL },
        [ATTR_TARGET] = { "target", false, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvdx_layer_controller *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvdx_layer_controller_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    spvxml_attr_parse_fixed (&nctx, &attrs[ATTR_SOURCE], "tableData");
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvdx_free_layer_controller (p);
        return false;
    }

    /* Parse content. */
    if (!spvxml_content_parse_end (&nctx, input->children)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvdx_free_layer_controller (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvdx_free_layer_controller (struct spvdx_layer_controller *p)
{
    if (!p)
        return;

    free (p->node_.id);
    free (p);
}

void
spvdx_collect_ids_layer_controller (struct spvxml_context *ctx, struct spvdx_layer_controller *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

}

bool
spvdx_is_layer_controller (const struct spvxml_node *node)
{
    return node->class_ == &spvdx_layer_controller_class;
}

struct spvdx_layer_controller *
spvdx_cast_layer_controller (const struct spvxml_node *node)
{
    return (node && spvdx_is_layer_controller (node)
            ? UP_CAST (node, struct spvdx_layer_controller, node_)
            : NULL);
}

void
spvdx_resolve_refs_layer_controller (struct spvxml_context *ctx UNUSED, struct spvdx_layer_controller *p UNUSED)
{
    if (!p)
        return;

    static const struct spvxml_node_class *const classes
        = &spvdx_label_class;
    p->target = spvdx_cast_label (spvxml_node_resolve_ref (ctx, p->node_.raw, "target", &classes, 1));
}

static void
spvdx_do_free_layer_controller (struct spvxml_node *node)
{
    spvdx_free_layer_controller (UP_CAST (node, struct spvdx_layer_controller, node_));
}

static void
spvdx_do_collect_ids_layer_controller (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_collect_ids_layer_controller (ctx, UP_CAST (node, struct spvdx_layer_controller, node_));
}

static void
spvdx_do_resolve_refs_layer_controller (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_resolve_refs_layer_controller (ctx, UP_CAST (node, struct spvdx_layer_controller, node_));
}

struct spvxml_node_class spvdx_layer_controller_class = {
    "layerController",
    spvdx_do_free_layer_controller,
    spvdx_do_collect_ids_layer_controller,
    spvdx_do_resolve_refs_layer_controller,
};


static bool UNUSED
spvdx_try_parse_location (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvdx_location *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvdx_location *))
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
spvdx_parse_location (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvdx_location **p_)
{
    enum {
        ATTR_ID,
        ATTR_MAX,
        ATTR_METHOD,
        ATTR_MIN,
        ATTR_PART,
        ATTR_TARGET,
        ATTR_VALUE,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_ID] = { "id", false, NULL },
        [ATTR_MAX] = { "max", false, NULL },
        [ATTR_METHOD] = { "method", true, NULL },
        [ATTR_MIN] = { "min", false, NULL },
        [ATTR_PART] = { "part", true, NULL },
        [ATTR_TARGET] = { "target", false, NULL },
        [ATTR_VALUE] = { "value", false, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvdx_location *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvdx_location_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    p->max = spvxml_attr_parse_dimension (&nctx, &attrs[ATTR_MAX]);
    p->method = spvxml_attr_parse_enum (
        &nctx, &attrs[ATTR_METHOD], spvdx_method_map);
    p->min = spvxml_attr_parse_dimension (&nctx, &attrs[ATTR_MIN]);
    p->part = spvxml_attr_parse_enum (
        &nctx, &attrs[ATTR_PART], spvdx_part_map);
    p->value = attrs[ATTR_VALUE].value;
    attrs[ATTR_VALUE].value = NULL;
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvdx_free_location (p);
        return false;
    }

    /* Parse content. */
    if (!spvxml_content_parse_end (&nctx, input->children)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvdx_free_location (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvdx_free_location (struct spvdx_location *p)
{
    if (!p)
        return;

    free (p->value);
    free (p->node_.id);
    free (p);
}

void
spvdx_collect_ids_location (struct spvxml_context *ctx, struct spvdx_location *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

}

bool
spvdx_is_location (const struct spvxml_node *node)
{
    return node->class_ == &spvdx_location_class;
}

struct spvdx_location *
spvdx_cast_location (const struct spvxml_node *node)
{
    return (node && spvdx_is_location (node)
            ? UP_CAST (node, struct spvdx_location, node_)
            : NULL);
}

void
spvdx_resolve_refs_location (struct spvxml_context *ctx UNUSED, struct spvdx_location *p UNUSED)
{
    if (!p)
        return;

    static const struct spvxml_node_class *const classes[] = {
        &spvdx_container_class,
        &spvdx_graph_class,
        &spvdx_label_frame_class,
    };
    const size_t n_classes = sizeof classes / sizeof *classes;
    p->target = spvxml_node_resolve_ref (ctx, p->node_.raw, "target", classes, n_classes);
}

static void
spvdx_do_free_location (struct spvxml_node *node)
{
    spvdx_free_location (UP_CAST (node, struct spvdx_location, node_));
}

static void
spvdx_do_collect_ids_location (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_collect_ids_location (ctx, UP_CAST (node, struct spvdx_location, node_));
}

static void
spvdx_do_resolve_refs_location (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_resolve_refs_location (ctx, UP_CAST (node, struct spvdx_location, node_));
}

struct spvxml_node_class spvdx_location_class = {
    "location",
    spvdx_do_free_location,
    spvdx_do_collect_ids_location,
    spvdx_do_resolve_refs_location,
};


static bool UNUSED
spvdx_try_parse_major_ticks (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvdx_major_ticks *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvdx_major_ticks *))
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
spvdx_parse_major_ticks_2 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_major_ticks *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "gridline", &node))
        return false;
    if (!spvdx_parse_gridline (nctx->up, node, &p->gridline))
        return false;
    return true;
}

static bool
spvdx_parse_major_ticks_1 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_major_ticks *p)
{
    spvdx_try_parse_major_ticks (nctx, input, p, spvdx_parse_major_ticks_2);
    return true;
}

bool
spvdx_parse_major_ticks (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvdx_major_ticks **p_)
{
    enum {
        ATTR_ID,
        ATTR_LABEL_ANGLE,
        ATTR_LABEL_FREQUENCY,
        ATTR_LENGTH,
        ATTR_STAGGER,
        ATTR_STYLE,
        ATTR_TICK_FRAME_STYLE,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_ID] = { "id", false, NULL },
        [ATTR_LABEL_ANGLE] = { "labelAngle", true, NULL },
        [ATTR_LABEL_FREQUENCY] = { "labelFrequency", false, NULL },
        [ATTR_LENGTH] = { "length", true, NULL },
        [ATTR_STAGGER] = { "stagger", false, NULL },
        [ATTR_STYLE] = { "style", true, NULL },
        [ATTR_TICK_FRAME_STYLE] = { "tickFrameStyle", true, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvdx_major_ticks *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvdx_major_ticks_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    p->label_angle = spvxml_attr_parse_int (&nctx, &attrs[ATTR_LABEL_ANGLE]);
    p->label_frequency = spvxml_attr_parse_int (&nctx, &attrs[ATTR_LABEL_FREQUENCY]);
    p->length = spvxml_attr_parse_dimension (&nctx, &attrs[ATTR_LENGTH]);
    p->stagger = spvxml_attr_parse_bool (&nctx, &attrs[ATTR_STAGGER]);
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvdx_free_major_ticks (p);
        return false;
    }

    /* Parse content. */
    input = input->children;
    if (!spvdx_parse_major_ticks_1 (&nctx, &input, p)
        || !spvxml_content_parse_end (&nctx, input)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvdx_free_major_ticks (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvdx_free_major_ticks (struct spvdx_major_ticks *p)
{
    if (!p)
        return;

    spvdx_free_gridline (p->gridline);
    free (p->node_.id);
    free (p);
}

void
spvdx_collect_ids_major_ticks (struct spvxml_context *ctx, struct spvdx_major_ticks *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

    spvdx_collect_ids_gridline (ctx, p->gridline);
}

bool
spvdx_is_major_ticks (const struct spvxml_node *node)
{
    return node->class_ == &spvdx_major_ticks_class;
}

struct spvdx_major_ticks *
spvdx_cast_major_ticks (const struct spvxml_node *node)
{
    return (node && spvdx_is_major_ticks (node)
            ? UP_CAST (node, struct spvdx_major_ticks, node_)
            : NULL);
}

void
spvdx_resolve_refs_major_ticks (struct spvxml_context *ctx UNUSED, struct spvdx_major_ticks *p UNUSED)
{
    if (!p)
        return;

    static const struct spvxml_node_class *const classes
        = &spvdx_style_class;
    p->style = spvdx_cast_style (spvxml_node_resolve_ref (ctx, p->node_.raw, "style", &classes, 1));
    static const struct spvxml_node_class *const classes2
        = &spvdx_style_class;
    p->tick_frame_style = spvdx_cast_style (spvxml_node_resolve_ref (ctx, p->node_.raw, "tickFrameStyle", &classes2, 1));
    spvdx_resolve_refs_gridline (ctx, p->gridline);
}

static void
spvdx_do_free_major_ticks (struct spvxml_node *node)
{
    spvdx_free_major_ticks (UP_CAST (node, struct spvdx_major_ticks, node_));
}

static void
spvdx_do_collect_ids_major_ticks (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_collect_ids_major_ticks (ctx, UP_CAST (node, struct spvdx_major_ticks, node_));
}

static void
spvdx_do_resolve_refs_major_ticks (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_resolve_refs_major_ticks (ctx, UP_CAST (node, struct spvdx_major_ticks, node_));
}

struct spvxml_node_class spvdx_major_ticks_class = {
    "majorTicks",
    spvdx_do_free_major_ticks,
    spvdx_do_collect_ids_major_ticks,
    spvdx_do_resolve_refs_major_ticks,
};


static bool UNUSED
spvdx_try_parse_nest (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvdx_nest *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvdx_nest *))
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
spvdx_parse_nest_2 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_nest *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "variableReference", &node))
        return false;
    struct spvdx_variable_reference *vars;
    if (!spvdx_parse_variable_reference (nctx->up, node, &vars))
        return false;
    p->vars = xrealloc (p->vars, sizeof *p->vars * (p->n_vars + 1));
    p->vars[p->n_vars++] = vars;
    return true;
}

static bool
spvdx_parse_nest_1 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_nest *p)
{
    if (!spvdx_parse_nest_2 (nctx, input, p))
        return false;
    while (spvdx_try_parse_nest (nctx, input, p, spvdx_parse_nest_2))
        continue;
    return true;
}

bool
spvdx_parse_nest (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvdx_nest **p_)
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
    struct spvdx_nest *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvdx_nest_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvdx_free_nest (p);
        return false;
    }

    /* Parse content. */
    input = input->children;
    if (!spvdx_parse_nest_1 (&nctx, &input, p)
        || !spvxml_content_parse_end (&nctx, input)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvdx_free_nest (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvdx_free_nest (struct spvdx_nest *p)
{
    if (!p)
        return;

    for (size_t i = 0; i < p->n_vars; i++)
        spvdx_free_variable_reference (p->vars[i]);
    free (p->vars);
    free (p->node_.id);
    free (p);
}

void
spvdx_collect_ids_nest (struct spvxml_context *ctx, struct spvdx_nest *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

    for (size_t i = 0; i < p->n_vars; i++)
        spvdx_collect_ids_variable_reference (ctx, p->vars[i]);
}

bool
spvdx_is_nest (const struct spvxml_node *node)
{
    return node->class_ == &spvdx_nest_class;
}

struct spvdx_nest *
spvdx_cast_nest (const struct spvxml_node *node)
{
    return (node && spvdx_is_nest (node)
            ? UP_CAST (node, struct spvdx_nest, node_)
            : NULL);
}

void
spvdx_resolve_refs_nest (struct spvxml_context *ctx UNUSED, struct spvdx_nest *p UNUSED)
{
    if (!p)
        return;

    for (size_t i = 0; i < p->n_vars; i++)
        spvdx_resolve_refs_variable_reference (ctx, p->vars[i]);
}

static void
spvdx_do_free_nest (struct spvxml_node *node)
{
    spvdx_free_nest (UP_CAST (node, struct spvdx_nest, node_));
}

static void
spvdx_do_collect_ids_nest (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_collect_ids_nest (ctx, UP_CAST (node, struct spvdx_nest, node_));
}

static void
spvdx_do_resolve_refs_nest (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_resolve_refs_nest (ctx, UP_CAST (node, struct spvdx_nest, node_));
}

struct spvxml_node_class spvdx_nest_class = {
    "nest",
    spvdx_do_free_nest,
    spvdx_do_collect_ids_nest,
    spvdx_do_resolve_refs_nest,
};


static bool UNUSED
spvdx_try_parse_number_format (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvdx_number_format *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvdx_number_format *))
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
spvdx_parse_number_format_2 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_number_format *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "affix", &node))
        return false;
    struct spvdx_affix *affix;
    if (!spvdx_parse_affix (nctx->up, node, &affix))
        return false;
    p->affix = xrealloc (p->affix, sizeof *p->affix * (p->n_affix + 1));
    p->affix[p->n_affix++] = affix;
    return true;
}

static bool
spvdx_parse_number_format_1 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_number_format *p)
{
    while (spvdx_try_parse_number_format (nctx, input, p, spvdx_parse_number_format_2))
        continue;
    return true;
}

bool
spvdx_parse_number_format (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvdx_number_format **p_)
{
    enum {
        ATTR_ID,
        ATTR_MAXIMUM_FRACTION_DIGITS,
        ATTR_MINIMUM_FRACTION_DIGITS,
        ATTR_MINIMUM_INTEGER_DIGITS,
        ATTR_PREFIX,
        ATTR_SCIENTIFIC,
        ATTR_SMALL,
        ATTR_SUFFIX,
        ATTR_USE_GROUPING,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_ID] = { "id", false, NULL },
        [ATTR_MAXIMUM_FRACTION_DIGITS] = { "maximumFractionDigits", false, NULL },
        [ATTR_MINIMUM_FRACTION_DIGITS] = { "minimumFractionDigits", false, NULL },
        [ATTR_MINIMUM_INTEGER_DIGITS] = { "minimumIntegerDigits", false, NULL },
        [ATTR_PREFIX] = { "prefix", false, NULL },
        [ATTR_SCIENTIFIC] = { "scientific", false, NULL },
        [ATTR_SMALL] = { "small", false, NULL },
        [ATTR_SUFFIX] = { "suffix", false, NULL },
        [ATTR_USE_GROUPING] = { "useGrouping", false, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvdx_number_format *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvdx_number_format_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    p->maximum_fraction_digits = spvxml_attr_parse_int (&nctx, &attrs[ATTR_MAXIMUM_FRACTION_DIGITS]);
    p->minimum_fraction_digits = spvxml_attr_parse_int (&nctx, &attrs[ATTR_MINIMUM_FRACTION_DIGITS]);
    p->minimum_integer_digits = spvxml_attr_parse_int (&nctx, &attrs[ATTR_MINIMUM_INTEGER_DIGITS]);
    p->prefix = attrs[ATTR_PREFIX].value;
    attrs[ATTR_PREFIX].value = NULL;
    p->scientific = spvxml_attr_parse_enum (
        &nctx, &attrs[ATTR_SCIENTIFIC], spvdx_scientific_map);
    p->small = spvxml_attr_parse_real (&nctx, &attrs[ATTR_SMALL]);
    p->suffix = attrs[ATTR_SUFFIX].value;
    attrs[ATTR_SUFFIX].value = NULL;
    p->use_grouping = spvxml_attr_parse_bool (&nctx, &attrs[ATTR_USE_GROUPING]);
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvdx_free_number_format (p);
        return false;
    }

    /* Parse content. */
    input = input->children;
    if (!spvdx_parse_number_format_1 (&nctx, &input, p)
        || !spvxml_content_parse_end (&nctx, input)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvdx_free_number_format (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvdx_free_number_format (struct spvdx_number_format *p)
{
    if (!p)
        return;

    free (p->prefix);
    free (p->suffix);
    for (size_t i = 0; i < p->n_affix; i++)
        spvdx_free_affix (p->affix[i]);
    free (p->affix);
    free (p->node_.id);
    free (p);
}

void
spvdx_collect_ids_number_format (struct spvxml_context *ctx, struct spvdx_number_format *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

    for (size_t i = 0; i < p->n_affix; i++)
        spvdx_collect_ids_affix (ctx, p->affix[i]);
}

bool
spvdx_is_number_format (const struct spvxml_node *node)
{
    return node->class_ == &spvdx_number_format_class;
}

struct spvdx_number_format *
spvdx_cast_number_format (const struct spvxml_node *node)
{
    return (node && spvdx_is_number_format (node)
            ? UP_CAST (node, struct spvdx_number_format, node_)
            : NULL);
}

void
spvdx_resolve_refs_number_format (struct spvxml_context *ctx UNUSED, struct spvdx_number_format *p UNUSED)
{
    if (!p)
        return;

    for (size_t i = 0; i < p->n_affix; i++)
        spvdx_resolve_refs_affix (ctx, p->affix[i]);
}

static void
spvdx_do_free_number_format (struct spvxml_node *node)
{
    spvdx_free_number_format (UP_CAST (node, struct spvdx_number_format, node_));
}

static void
spvdx_do_collect_ids_number_format (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_collect_ids_number_format (ctx, UP_CAST (node, struct spvdx_number_format, node_));
}

static void
spvdx_do_resolve_refs_number_format (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_resolve_refs_number_format (ctx, UP_CAST (node, struct spvdx_number_format, node_));
}

struct spvxml_node_class spvdx_number_format_class = {
    "numberFormat",
    spvdx_do_free_number_format,
    spvdx_do_collect_ids_number_format,
    spvdx_do_resolve_refs_number_format,
};


static bool UNUSED
spvdx_try_parse_paragraph (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvdx_paragraph *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvdx_paragraph *))
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
spvdx_parse_paragraph (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvdx_paragraph **p_)
{
    enum {
        ATTR_HANGING_INDENT,
        ATTR_ID,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_HANGING_INDENT] = { "hangingIndent", false, NULL },
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
    struct spvdx_paragraph *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvdx_paragraph_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->hanging_indent = spvxml_attr_parse_dimension (&nctx, &attrs[ATTR_HANGING_INDENT]);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvdx_free_paragraph (p);
        return false;
    }

    /* Parse content. */
    if (!spvxml_content_parse_end (&nctx, input->children)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvdx_free_paragraph (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvdx_free_paragraph (struct spvdx_paragraph *p)
{
    if (!p)
        return;

    free (p->node_.id);
    free (p);
}

void
spvdx_collect_ids_paragraph (struct spvxml_context *ctx, struct spvdx_paragraph *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

}

bool
spvdx_is_paragraph (const struct spvxml_node *node)
{
    return node->class_ == &spvdx_paragraph_class;
}

struct spvdx_paragraph *
spvdx_cast_paragraph (const struct spvxml_node *node)
{
    return (node && spvdx_is_paragraph (node)
            ? UP_CAST (node, struct spvdx_paragraph, node_)
            : NULL);
}

void
spvdx_resolve_refs_paragraph (struct spvxml_context *ctx UNUSED, struct spvdx_paragraph *p UNUSED)
{
    if (!p)
        return;

}

static void
spvdx_do_free_paragraph (struct spvxml_node *node)
{
    spvdx_free_paragraph (UP_CAST (node, struct spvdx_paragraph, node_));
}

static void
spvdx_do_collect_ids_paragraph (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_collect_ids_paragraph (ctx, UP_CAST (node, struct spvdx_paragraph, node_));
}

static void
spvdx_do_resolve_refs_paragraph (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_resolve_refs_paragraph (ctx, UP_CAST (node, struct spvdx_paragraph, node_));
}

struct spvxml_node_class spvdx_paragraph_class = {
    "paragraph",
    spvdx_do_free_paragraph,
    spvdx_do_collect_ids_paragraph,
    spvdx_do_resolve_refs_paragraph,
};


static bool UNUSED
spvdx_try_parse_relabel (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvdx_relabel *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvdx_relabel *))
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
spvdx_parse_relabel (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvdx_relabel **p_)
{
    enum {
        ATTR_FROM,
        ATTR_ID,
        ATTR_TO,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_FROM] = { "from", true, NULL },
        [ATTR_ID] = { "id", false, NULL },
        [ATTR_TO] = { "to", true, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvdx_relabel *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvdx_relabel_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->from = spvxml_attr_parse_real (&nctx, &attrs[ATTR_FROM]);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    p->to = attrs[ATTR_TO].value;
    attrs[ATTR_TO].value = NULL;
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvdx_free_relabel (p);
        return false;
    }

    /* Parse content. */
    if (!spvxml_content_parse_end (&nctx, input->children)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvdx_free_relabel (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvdx_free_relabel (struct spvdx_relabel *p)
{
    if (!p)
        return;

    free (p->to);
    free (p->node_.id);
    free (p);
}

void
spvdx_collect_ids_relabel (struct spvxml_context *ctx, struct spvdx_relabel *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

}

bool
spvdx_is_relabel (const struct spvxml_node *node)
{
    return node->class_ == &spvdx_relabel_class;
}

struct spvdx_relabel *
spvdx_cast_relabel (const struct spvxml_node *node)
{
    return (node && spvdx_is_relabel (node)
            ? UP_CAST (node, struct spvdx_relabel, node_)
            : NULL);
}

void
spvdx_resolve_refs_relabel (struct spvxml_context *ctx UNUSED, struct spvdx_relabel *p UNUSED)
{
    if (!p)
        return;

}

static void
spvdx_do_free_relabel (struct spvxml_node *node)
{
    spvdx_free_relabel (UP_CAST (node, struct spvdx_relabel, node_));
}

static void
spvdx_do_collect_ids_relabel (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_collect_ids_relabel (ctx, UP_CAST (node, struct spvdx_relabel, node_));
}

static void
spvdx_do_resolve_refs_relabel (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_resolve_refs_relabel (ctx, UP_CAST (node, struct spvdx_relabel, node_));
}

struct spvxml_node_class spvdx_relabel_class = {
    "relabel",
    spvdx_do_free_relabel,
    spvdx_do_collect_ids_relabel,
    spvdx_do_resolve_refs_relabel,
};


static bool UNUSED
spvdx_try_parse_set_cell_properties (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvdx_set_cell_properties *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvdx_set_cell_properties *))
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
spvdx_parse_set_cell_properties_7 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_set_cell_properties *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "union", &node))
        return false;
    if (!spvdx_parse_union (nctx->up, node, &p->union_))
        return false;
    return true;
}

static bool
spvdx_parse_set_cell_properties_6 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_set_cell_properties *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "setMetaData", &node))
        return false;
    struct spvdx_set_meta_data *seq;
    if (!spvdx_parse_set_meta_data (nctx->up, node, &seq))
        return false;
    p->seq = xrealloc (p->seq, sizeof *p->seq * (p->n_seq + 1));
    p->seq[p->n_seq++] = &seq->node_;
    return true;
}

static bool
spvdx_parse_set_cell_properties_5 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_set_cell_properties *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "setFormat", &node))
        return false;
    struct spvdx_set_format *seq;
    if (!spvdx_parse_set_format (nctx->up, node, &seq))
        return false;
    p->seq = xrealloc (p->seq, sizeof *p->seq * (p->n_seq + 1));
    p->seq[p->n_seq++] = &seq->node_;
    return true;
}

static bool
spvdx_parse_set_cell_properties_4 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_set_cell_properties *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "setFrameStyle", &node))
        return false;
    struct spvdx_set_frame_style *seq;
    if (!spvdx_parse_set_frame_style (nctx->up, node, &seq))
        return false;
    p->seq = xrealloc (p->seq, sizeof *p->seq * (p->n_seq + 1));
    p->seq[p->n_seq++] = &seq->node_;
    return true;
}

static bool
spvdx_parse_set_cell_properties_3 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_set_cell_properties *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "setStyle", &node))
        return false;
    struct spvdx_set_style *seq;
    if (!spvdx_parse_set_style (nctx->up, node, &seq))
        return false;
    p->seq = xrealloc (p->seq, sizeof *p->seq * (p->n_seq + 1));
    p->seq[p->n_seq++] = &seq->node_;
    return true;
}

static bool
spvdx_parse_set_cell_properties_2 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_set_cell_properties *p)
{
    if (!spvdx_try_parse_set_cell_properties (nctx, input, p, spvdx_parse_set_cell_properties_3)
        && !spvdx_try_parse_set_cell_properties (nctx, input, p, spvdx_parse_set_cell_properties_4)
        && !spvdx_try_parse_set_cell_properties (nctx, input, p, spvdx_parse_set_cell_properties_5)
        && !spvdx_try_parse_set_cell_properties (nctx, input, p, spvdx_parse_set_cell_properties_6))
      {
        spvxml_content_error (nctx, *input, "Syntax error.");
        return false;
      }
    return true;
}

static bool
spvdx_parse_set_cell_properties_1 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_set_cell_properties *p)
{
    while (spvdx_try_parse_set_cell_properties (nctx, input, p, spvdx_parse_set_cell_properties_2))
        continue;
    spvdx_try_parse_set_cell_properties (nctx, input, p, spvdx_parse_set_cell_properties_7);
    return true;
}

bool
spvdx_parse_set_cell_properties (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvdx_set_cell_properties **p_)
{
    enum {
        ATTR_APPLY_TO_CONVERSE,
        ATTR_ID,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_APPLY_TO_CONVERSE] = { "applyToConverse", false, NULL },
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
    struct spvdx_set_cell_properties *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvdx_set_cell_properties_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->apply_to_converse = spvxml_attr_parse_bool (&nctx, &attrs[ATTR_APPLY_TO_CONVERSE]);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvdx_free_set_cell_properties (p);
        return false;
    }

    /* Parse content. */
    input = input->children;
    if (!spvdx_parse_set_cell_properties_1 (&nctx, &input, p)
        || !spvxml_content_parse_end (&nctx, input)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvdx_free_set_cell_properties (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvdx_free_set_cell_properties (struct spvdx_set_cell_properties *p)
{
    if (!p)
        return;

    for (size_t i = 0; i < p->n_seq; i++)
        p->seq[i]->class_->spvxml_node_free (p->seq[i]);
    free (p->seq);
    spvdx_free_union (p->union_);
    free (p->node_.id);
    free (p);
}

void
spvdx_collect_ids_set_cell_properties (struct spvxml_context *ctx, struct spvdx_set_cell_properties *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

    for (size_t i = 0; i < p->n_seq; i++)
        p->seq[i]->class_->spvxml_node_collect_ids (ctx, p->seq[i]);
    spvdx_collect_ids_union (ctx, p->union_);
}

bool
spvdx_is_set_cell_properties (const struct spvxml_node *node)
{
    return node->class_ == &spvdx_set_cell_properties_class;
}

struct spvdx_set_cell_properties *
spvdx_cast_set_cell_properties (const struct spvxml_node *node)
{
    return (node && spvdx_is_set_cell_properties (node)
            ? UP_CAST (node, struct spvdx_set_cell_properties, node_)
            : NULL);
}

void
spvdx_resolve_refs_set_cell_properties (struct spvxml_context *ctx UNUSED, struct spvdx_set_cell_properties *p UNUSED)
{
    if (!p)
        return;

    for (size_t i = 0; i < p->n_seq; i++)
        p->seq[i]->class_->spvxml_node_resolve_refs (ctx, p->seq[i]);
    spvdx_resolve_refs_union (ctx, p->union_);
}

static void
spvdx_do_free_set_cell_properties (struct spvxml_node *node)
{
    spvdx_free_set_cell_properties (UP_CAST (node, struct spvdx_set_cell_properties, node_));
}

static void
spvdx_do_collect_ids_set_cell_properties (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_collect_ids_set_cell_properties (ctx, UP_CAST (node, struct spvdx_set_cell_properties, node_));
}

static void
spvdx_do_resolve_refs_set_cell_properties (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_resolve_refs_set_cell_properties (ctx, UP_CAST (node, struct spvdx_set_cell_properties, node_));
}

struct spvxml_node_class spvdx_set_cell_properties_class = {
    "setCellProperties",
    spvdx_do_free_set_cell_properties,
    spvdx_do_collect_ids_set_cell_properties,
    spvdx_do_resolve_refs_set_cell_properties,
};


static bool UNUSED
spvdx_try_parse_set_format (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvdx_set_format *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvdx_set_format *))
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
spvdx_parse_set_format_7 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_set_format *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "elapsedTimeFormat", &node))
        return false;
    if (!spvdx_parse_elapsed_time_format (nctx->up, node, &p->elapsed_time_format))
        return false;
    return true;
}

static bool
spvdx_parse_set_format_6 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_set_format *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "dateTimeFormat", &node))
        return false;
    if (!spvdx_parse_date_time_format (nctx->up, node, &p->date_time_format))
        return false;
    return true;
}

static bool
spvdx_parse_set_format_5 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_set_format *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "stringFormat", &node))
        return false;
    struct spvdx_string_format *string_format;
    if (!spvdx_parse_string_format (nctx->up, node, &string_format))
        return false;
    p->string_format = xrealloc (p->string_format, sizeof *p->string_format * (p->n_string_format + 1));
    p->string_format[p->n_string_format++] = string_format;
    return true;
}

static bool
spvdx_parse_set_format_4 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_set_format *p)
{
    if (!spvdx_parse_set_format_5 (nctx, input, p))
        return false;
    while (spvdx_try_parse_set_format (nctx, input, p, spvdx_parse_set_format_5))
        continue;
    return true;
}

static bool
spvdx_parse_set_format_3 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_set_format *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "numberFormat", &node))
        return false;
    if (!spvdx_parse_number_format (nctx->up, node, &p->number_format))
        return false;
    return true;
}

static bool
spvdx_parse_set_format_2 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_set_format *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "format", &node))
        return false;
    if (!spvdx_parse_format (nctx->up, node, &p->format))
        return false;
    return true;
}

static bool
spvdx_parse_set_format_1 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_set_format *p)
{
    if (!spvdx_try_parse_set_format (nctx, input, p, spvdx_parse_set_format_2)
        && !spvdx_try_parse_set_format (nctx, input, p, spvdx_parse_set_format_3)
        && !spvdx_try_parse_set_format (nctx, input, p, spvdx_parse_set_format_4)
        && !spvdx_try_parse_set_format (nctx, input, p, spvdx_parse_set_format_6)
        && !spvdx_try_parse_set_format (nctx, input, p, spvdx_parse_set_format_7))
      {
        spvxml_content_error (nctx, *input, "Syntax error.");
        return false;
      }
    return true;
}

bool
spvdx_parse_set_format (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvdx_set_format **p_)
{
    enum {
        ATTR_ID,
        ATTR_RESET,
        ATTR_TARGET,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_ID] = { "id", false, NULL },
        [ATTR_RESET] = { "reset", false, NULL },
        [ATTR_TARGET] = { "target", true, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvdx_set_format *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvdx_set_format_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    p->reset = spvxml_attr_parse_bool (&nctx, &attrs[ATTR_RESET]);
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvdx_free_set_format (p);
        return false;
    }

    /* Parse content. */
    input = input->children;
    if (!spvdx_parse_set_format_1 (&nctx, &input, p)
        || !spvxml_content_parse_end (&nctx, input)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvdx_free_set_format (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvdx_free_set_format (struct spvdx_set_format *p)
{
    if (!p)
        return;

    spvdx_free_format (p->format);
    spvdx_free_number_format (p->number_format);
    for (size_t i = 0; i < p->n_string_format; i++)
        spvdx_free_string_format (p->string_format[i]);
    free (p->string_format);
    spvdx_free_date_time_format (p->date_time_format);
    spvdx_free_elapsed_time_format (p->elapsed_time_format);
    free (p->node_.id);
    free (p);
}

void
spvdx_collect_ids_set_format (struct spvxml_context *ctx, struct spvdx_set_format *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

    spvdx_collect_ids_format (ctx, p->format);
    spvdx_collect_ids_number_format (ctx, p->number_format);
    for (size_t i = 0; i < p->n_string_format; i++)
        spvdx_collect_ids_string_format (ctx, p->string_format[i]);
    spvdx_collect_ids_date_time_format (ctx, p->date_time_format);
    spvdx_collect_ids_elapsed_time_format (ctx, p->elapsed_time_format);
}

bool
spvdx_is_set_format (const struct spvxml_node *node)
{
    return node->class_ == &spvdx_set_format_class;
}

struct spvdx_set_format *
spvdx_cast_set_format (const struct spvxml_node *node)
{
    return (node && spvdx_is_set_format (node)
            ? UP_CAST (node, struct spvdx_set_format, node_)
            : NULL);
}

void
spvdx_resolve_refs_set_format (struct spvxml_context *ctx UNUSED, struct spvdx_set_format *p UNUSED)
{
    if (!p)
        return;

    static const struct spvxml_node_class *const classes[] = {
        &spvdx_labeling_class,
        &spvdx_major_ticks_class,
    };
    const size_t n_classes = sizeof classes / sizeof *classes;
    p->target = spvxml_node_resolve_ref (ctx, p->node_.raw, "target", classes, n_classes);
    spvdx_resolve_refs_format (ctx, p->format);
    spvdx_resolve_refs_number_format (ctx, p->number_format);
    for (size_t i = 0; i < p->n_string_format; i++)
        spvdx_resolve_refs_string_format (ctx, p->string_format[i]);
    spvdx_resolve_refs_date_time_format (ctx, p->date_time_format);
    spvdx_resolve_refs_elapsed_time_format (ctx, p->elapsed_time_format);
}

static void
spvdx_do_free_set_format (struct spvxml_node *node)
{
    spvdx_free_set_format (UP_CAST (node, struct spvdx_set_format, node_));
}

static void
spvdx_do_collect_ids_set_format (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_collect_ids_set_format (ctx, UP_CAST (node, struct spvdx_set_format, node_));
}

static void
spvdx_do_resolve_refs_set_format (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_resolve_refs_set_format (ctx, UP_CAST (node, struct spvdx_set_format, node_));
}

struct spvxml_node_class spvdx_set_format_class = {
    "setFormat",
    spvdx_do_free_set_format,
    spvdx_do_collect_ids_set_format,
    spvdx_do_resolve_refs_set_format,
};


static bool UNUSED
spvdx_try_parse_set_frame_style (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvdx_set_frame_style *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvdx_set_frame_style *))
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
spvdx_parse_set_frame_style (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvdx_set_frame_style **p_)
{
    enum {
        ATTR_ID,
        ATTR_STYLE,
        ATTR_TARGET,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_ID] = { "id", false, NULL },
        [ATTR_STYLE] = { "style", true, NULL },
        [ATTR_TARGET] = { "target", true, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvdx_set_frame_style *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvdx_set_frame_style_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvdx_free_set_frame_style (p);
        return false;
    }

    /* Parse content. */
    if (!spvxml_content_parse_end (&nctx, input->children)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvdx_free_set_frame_style (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvdx_free_set_frame_style (struct spvdx_set_frame_style *p)
{
    if (!p)
        return;

    free (p->node_.id);
    free (p);
}

void
spvdx_collect_ids_set_frame_style (struct spvxml_context *ctx, struct spvdx_set_frame_style *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

}

bool
spvdx_is_set_frame_style (const struct spvxml_node *node)
{
    return node->class_ == &spvdx_set_frame_style_class;
}

struct spvdx_set_frame_style *
spvdx_cast_set_frame_style (const struct spvxml_node *node)
{
    return (node && spvdx_is_set_frame_style (node)
            ? UP_CAST (node, struct spvdx_set_frame_style, node_)
            : NULL);
}

void
spvdx_resolve_refs_set_frame_style (struct spvxml_context *ctx UNUSED, struct spvdx_set_frame_style *p UNUSED)
{
    if (!p)
        return;

    static const struct spvxml_node_class *const classes
        = &spvdx_style_class;
    p->style = spvdx_cast_style (spvxml_node_resolve_ref (ctx, p->node_.raw, "style", &classes, 1));
    static const struct spvxml_node_class *const classes2
        = &spvdx_major_ticks_class;
    p->target = spvdx_cast_major_ticks (spvxml_node_resolve_ref (ctx, p->node_.raw, "target", &classes2, 1));
}

static void
spvdx_do_free_set_frame_style (struct spvxml_node *node)
{
    spvdx_free_set_frame_style (UP_CAST (node, struct spvdx_set_frame_style, node_));
}

static void
spvdx_do_collect_ids_set_frame_style (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_collect_ids_set_frame_style (ctx, UP_CAST (node, struct spvdx_set_frame_style, node_));
}

static void
spvdx_do_resolve_refs_set_frame_style (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_resolve_refs_set_frame_style (ctx, UP_CAST (node, struct spvdx_set_frame_style, node_));
}

struct spvxml_node_class spvdx_set_frame_style_class = {
    "setFrameStyle",
    spvdx_do_free_set_frame_style,
    spvdx_do_collect_ids_set_frame_style,
    spvdx_do_resolve_refs_set_frame_style,
};


static bool UNUSED
spvdx_try_parse_set_meta_data (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvdx_set_meta_data *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvdx_set_meta_data *))
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
spvdx_parse_set_meta_data (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvdx_set_meta_data **p_)
{
    enum {
        ATTR_ID,
        ATTR_KEY,
        ATTR_TARGET,
        ATTR_VALUE,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_ID] = { "id", false, NULL },
        [ATTR_KEY] = { "key", true, NULL },
        [ATTR_TARGET] = { "target", true, NULL },
        [ATTR_VALUE] = { "value", true, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvdx_set_meta_data *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvdx_set_meta_data_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    p->key = attrs[ATTR_KEY].value;
    attrs[ATTR_KEY].value = NULL;
    p->value = attrs[ATTR_VALUE].value;
    attrs[ATTR_VALUE].value = NULL;
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvdx_free_set_meta_data (p);
        return false;
    }

    /* Parse content. */
    if (!spvxml_content_parse_end (&nctx, input->children)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvdx_free_set_meta_data (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvdx_free_set_meta_data (struct spvdx_set_meta_data *p)
{
    if (!p)
        return;

    free (p->key);
    free (p->value);
    free (p->node_.id);
    free (p);
}

void
spvdx_collect_ids_set_meta_data (struct spvxml_context *ctx, struct spvdx_set_meta_data *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

}

bool
spvdx_is_set_meta_data (const struct spvxml_node *node)
{
    return node->class_ == &spvdx_set_meta_data_class;
}

struct spvdx_set_meta_data *
spvdx_cast_set_meta_data (const struct spvxml_node *node)
{
    return (node && spvdx_is_set_meta_data (node)
            ? UP_CAST (node, struct spvdx_set_meta_data, node_)
            : NULL);
}

void
spvdx_resolve_refs_set_meta_data (struct spvxml_context *ctx UNUSED, struct spvdx_set_meta_data *p UNUSED)
{
    if (!p)
        return;

    static const struct spvxml_node_class *const classes
        = &spvdx_graph_class;
    p->target = spvdx_cast_graph (spvxml_node_resolve_ref (ctx, p->node_.raw, "target", &classes, 1));
}

static void
spvdx_do_free_set_meta_data (struct spvxml_node *node)
{
    spvdx_free_set_meta_data (UP_CAST (node, struct spvdx_set_meta_data, node_));
}

static void
spvdx_do_collect_ids_set_meta_data (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_collect_ids_set_meta_data (ctx, UP_CAST (node, struct spvdx_set_meta_data, node_));
}

static void
spvdx_do_resolve_refs_set_meta_data (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_resolve_refs_set_meta_data (ctx, UP_CAST (node, struct spvdx_set_meta_data, node_));
}

struct spvxml_node_class spvdx_set_meta_data_class = {
    "setMetaData",
    spvdx_do_free_set_meta_data,
    spvdx_do_collect_ids_set_meta_data,
    spvdx_do_resolve_refs_set_meta_data,
};


static bool UNUSED
spvdx_try_parse_set_style (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvdx_set_style *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvdx_set_style *))
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
spvdx_parse_set_style (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvdx_set_style **p_)
{
    enum {
        ATTR_ID,
        ATTR_STYLE,
        ATTR_TARGET,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_ID] = { "id", false, NULL },
        [ATTR_STYLE] = { "style", true, NULL },
        [ATTR_TARGET] = { "target", true, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvdx_set_style *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvdx_set_style_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvdx_free_set_style (p);
        return false;
    }

    /* Parse content. */
    if (!spvxml_content_parse_end (&nctx, input->children)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvdx_free_set_style (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvdx_free_set_style (struct spvdx_set_style *p)
{
    if (!p)
        return;

    free (p->node_.id);
    free (p);
}

void
spvdx_collect_ids_set_style (struct spvxml_context *ctx, struct spvdx_set_style *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

}

bool
spvdx_is_set_style (const struct spvxml_node *node)
{
    return node->class_ == &spvdx_set_style_class;
}

struct spvdx_set_style *
spvdx_cast_set_style (const struct spvxml_node *node)
{
    return (node && spvdx_is_set_style (node)
            ? UP_CAST (node, struct spvdx_set_style, node_)
            : NULL);
}

void
spvdx_resolve_refs_set_style (struct spvxml_context *ctx UNUSED, struct spvdx_set_style *p UNUSED)
{
    if (!p)
        return;

    static const struct spvxml_node_class *const classes
        = &spvdx_style_class;
    p->style = spvdx_cast_style (spvxml_node_resolve_ref (ctx, p->node_.raw, "style", &classes, 1));
    static const struct spvxml_node_class *const classes2[] = {
        &spvdx_graph_class,
        &spvdx_interval_class,
        &spvdx_labeling_class,
        &spvdx_major_ticks_class,
    };
    const size_t n_classes2 = sizeof classes2 / sizeof *classes2;
    p->target = spvxml_node_resolve_ref (ctx, p->node_.raw, "target", classes2, n_classes2);
}

static void
spvdx_do_free_set_style (struct spvxml_node *node)
{
    spvdx_free_set_style (UP_CAST (node, struct spvdx_set_style, node_));
}

static void
spvdx_do_collect_ids_set_style (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_collect_ids_set_style (ctx, UP_CAST (node, struct spvdx_set_style, node_));
}

static void
spvdx_do_resolve_refs_set_style (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_resolve_refs_set_style (ctx, UP_CAST (node, struct spvdx_set_style, node_));
}

struct spvxml_node_class spvdx_set_style_class = {
    "setStyle",
    spvdx_do_free_set_style,
    spvdx_do_collect_ids_set_style,
    spvdx_do_resolve_refs_set_style,
};


static bool UNUSED
spvdx_try_parse_simple_sort (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvdx_simple_sort *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvdx_simple_sort *))
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
spvdx_parse_simple_sort_1 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_simple_sort *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "categoryOrder", &node))
        return false;
    if (!spvdx_parse_category_order (nctx->up, node, &p->category_order))
        return false;
    return true;
}

bool
spvdx_parse_simple_sort (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvdx_simple_sort **p_)
{
    enum {
        ATTR_ID,
        ATTR_SORT_METHOD,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_ID] = { "id", false, NULL },
        [ATTR_SORT_METHOD] = { "method", true, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvdx_simple_sort *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvdx_simple_sort_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    spvxml_attr_parse_fixed (&nctx, &attrs[ATTR_SORT_METHOD], "custom");
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvdx_free_simple_sort (p);
        return false;
    }

    /* Parse content. */
    input = input->children;
    if (!spvdx_parse_simple_sort_1 (&nctx, &input, p)
        || !spvxml_content_parse_end (&nctx, input)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvdx_free_simple_sort (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvdx_free_simple_sort (struct spvdx_simple_sort *p)
{
    if (!p)
        return;

    spvdx_free_category_order (p->category_order);
    free (p->node_.id);
    free (p);
}

void
spvdx_collect_ids_simple_sort (struct spvxml_context *ctx, struct spvdx_simple_sort *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

    spvdx_collect_ids_category_order (ctx, p->category_order);
}

bool
spvdx_is_simple_sort (const struct spvxml_node *node)
{
    return node->class_ == &spvdx_simple_sort_class;
}

struct spvdx_simple_sort *
spvdx_cast_simple_sort (const struct spvxml_node *node)
{
    return (node && spvdx_is_simple_sort (node)
            ? UP_CAST (node, struct spvdx_simple_sort, node_)
            : NULL);
}

void
spvdx_resolve_refs_simple_sort (struct spvxml_context *ctx UNUSED, struct spvdx_simple_sort *p UNUSED)
{
    if (!p)
        return;

    spvdx_resolve_refs_category_order (ctx, p->category_order);
}

static void
spvdx_do_free_simple_sort (struct spvxml_node *node)
{
    spvdx_free_simple_sort (UP_CAST (node, struct spvdx_simple_sort, node_));
}

static void
spvdx_do_collect_ids_simple_sort (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_collect_ids_simple_sort (ctx, UP_CAST (node, struct spvdx_simple_sort, node_));
}

static void
spvdx_do_resolve_refs_simple_sort (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_resolve_refs_simple_sort (ctx, UP_CAST (node, struct spvdx_simple_sort, node_));
}

struct spvxml_node_class spvdx_simple_sort_class = {
    "simpleSort",
    spvdx_do_free_simple_sort,
    spvdx_do_collect_ids_simple_sort,
    spvdx_do_resolve_refs_simple_sort,
};


static bool UNUSED
spvdx_try_parse_source_variable (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvdx_source_variable *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvdx_source_variable *))
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
spvdx_parse_source_variable_5 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_source_variable *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "stringFormat", &node))
        return false;
    struct spvdx_string_format *seq;
    if (!spvdx_parse_string_format (nctx->up, node, &seq))
        return false;
    p->seq = xrealloc (p->seq, sizeof *p->seq * (p->n_seq + 1));
    p->seq[p->n_seq++] = &seq->node_;
    return true;
}

static bool
spvdx_parse_source_variable_4 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_source_variable *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "format", &node))
        return false;
    struct spvdx_format *seq;
    if (!spvdx_parse_format (nctx->up, node, &seq))
        return false;
    p->seq = xrealloc (p->seq, sizeof *p->seq * (p->n_seq + 1));
    p->seq[p->n_seq++] = &seq->node_;
    return true;
}

static bool
spvdx_parse_source_variable_3 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_source_variable *p)
{
    if (!spvdx_try_parse_source_variable (nctx, input, p, spvdx_parse_source_variable_4)
        && !spvdx_try_parse_source_variable (nctx, input, p, spvdx_parse_source_variable_5))
      {
        spvxml_content_error (nctx, *input, "Syntax error.");
        return false;
      }
    return true;
}

static bool
spvdx_parse_source_variable_2 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_source_variable *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "extension", &node))
        return false;
    struct spvdx_variable_extension *variable_extension;
    if (!spvdx_parse_variable_extension (nctx->up, node, &variable_extension))
        return false;
    p->variable_extension = xrealloc (p->variable_extension, sizeof *p->variable_extension * (p->n_variable_extension + 1));
    p->variable_extension[p->n_variable_extension++] = variable_extension;
    return true;
}

static bool
spvdx_parse_source_variable_1 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_source_variable *p)
{
    while (spvdx_try_parse_source_variable (nctx, input, p, spvdx_parse_source_variable_2))
        continue;
    spvdx_try_parse_source_variable (nctx, input, p, spvdx_parse_source_variable_3);
    return true;
}

bool
spvdx_parse_source_variable (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvdx_source_variable **p_)
{
    enum {
        ATTR_CATEGORICAL,
        ATTR_DEPENDS_ON,
        ATTR_DOMAIN,
        ATTR_ID,
        ATTR_LABEL,
        ATTR_LABEL_VARIABLE,
        ATTR_SOURCE,
        ATTR_SOURCE_NAME,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_CATEGORICAL] = { "categorical", true, NULL },
        [ATTR_DEPENDS_ON] = { "dependsOn", false, NULL },
        [ATTR_DOMAIN] = { "domain", false, NULL },
        [ATTR_ID] = { "id", true, NULL },
        [ATTR_LABEL] = { "label", false, NULL },
        [ATTR_LABEL_VARIABLE] = { "labelVariable", false, NULL },
        [ATTR_SOURCE] = { "source", true, NULL },
        [ATTR_SOURCE_NAME] = { "sourceName", true, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvdx_source_variable *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvdx_source_variable_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    spvxml_attr_parse_fixed (&nctx, &attrs[ATTR_CATEGORICAL], "true");
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    p->label = attrs[ATTR_LABEL].value;
    attrs[ATTR_LABEL].value = NULL;
    p->source = attrs[ATTR_SOURCE].value;
    attrs[ATTR_SOURCE].value = NULL;
    p->source_name = attrs[ATTR_SOURCE_NAME].value;
    attrs[ATTR_SOURCE_NAME].value = NULL;
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvdx_free_source_variable (p);
        return false;
    }

    /* Parse content. */
    input = input->children;
    if (!spvdx_parse_source_variable_1 (&nctx, &input, p)
        || !spvxml_content_parse_end (&nctx, input)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvdx_free_source_variable (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvdx_free_source_variable (struct spvdx_source_variable *p)
{
    if (!p)
        return;

    free (p->source);
    free (p->source_name);
    free (p->label);
    for (size_t i = 0; i < p->n_variable_extension; i++)
        spvdx_free_variable_extension (p->variable_extension[i]);
    free (p->variable_extension);
    for (size_t i = 0; i < p->n_seq; i++)
        p->seq[i]->class_->spvxml_node_free (p->seq[i]);
    free (p->seq);
    free (p->node_.id);
    free (p);
}

void
spvdx_collect_ids_source_variable (struct spvxml_context *ctx, struct spvdx_source_variable *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

    for (size_t i = 0; i < p->n_variable_extension; i++)
        spvdx_collect_ids_variable_extension (ctx, p->variable_extension[i]);
    for (size_t i = 0; i < p->n_seq; i++)
        p->seq[i]->class_->spvxml_node_collect_ids (ctx, p->seq[i]);
}

bool
spvdx_is_source_variable (const struct spvxml_node *node)
{
    return node->class_ == &spvdx_source_variable_class;
}

struct spvdx_source_variable *
spvdx_cast_source_variable (const struct spvxml_node *node)
{
    return (node && spvdx_is_source_variable (node)
            ? UP_CAST (node, struct spvdx_source_variable, node_)
            : NULL);
}

void
spvdx_resolve_refs_source_variable (struct spvxml_context *ctx UNUSED, struct spvdx_source_variable *p UNUSED)
{
    if (!p)
        return;

    static const struct spvxml_node_class *const classes
        = &spvdx_source_variable_class;
    p->depends_on = spvdx_cast_source_variable (spvxml_node_resolve_ref (ctx, p->node_.raw, "dependsOn", &classes, 1));
    static const struct spvxml_node_class *const classes2
        = &spvdx_categorical_domain_class;
    p->domain = spvdx_cast_categorical_domain (spvxml_node_resolve_ref (ctx, p->node_.raw, "domain", &classes2, 1));
    static const struct spvxml_node_class *const classes3
        = &spvdx_source_variable_class;
    p->label_variable = spvdx_cast_source_variable (spvxml_node_resolve_ref (ctx, p->node_.raw, "labelVariable", &classes3, 1));
    for (size_t i = 0; i < p->n_variable_extension; i++)
        spvdx_resolve_refs_variable_extension (ctx, p->variable_extension[i]);
    for (size_t i = 0; i < p->n_seq; i++)
        p->seq[i]->class_->spvxml_node_resolve_refs (ctx, p->seq[i]);
}

static void
spvdx_do_free_source_variable (struct spvxml_node *node)
{
    spvdx_free_source_variable (UP_CAST (node, struct spvdx_source_variable, node_));
}

static void
spvdx_do_collect_ids_source_variable (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_collect_ids_source_variable (ctx, UP_CAST (node, struct spvdx_source_variable, node_));
}

static void
spvdx_do_resolve_refs_source_variable (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_resolve_refs_source_variable (ctx, UP_CAST (node, struct spvdx_source_variable, node_));
}

struct spvxml_node_class spvdx_source_variable_class = {
    "sourceVariable",
    spvdx_do_free_source_variable,
    spvdx_do_collect_ids_source_variable,
    spvdx_do_resolve_refs_source_variable,
};


static bool UNUSED
spvdx_try_parse_string_format (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvdx_string_format *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvdx_string_format *))
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
spvdx_parse_string_format_3 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_string_format *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "affix", &node))
        return false;
    struct spvdx_affix *affix;
    if (!spvdx_parse_affix (nctx->up, node, &affix))
        return false;
    p->affix = xrealloc (p->affix, sizeof *p->affix * (p->n_affix + 1));
    p->affix[p->n_affix++] = affix;
    return true;
}

static bool
spvdx_parse_string_format_2 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_string_format *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "relabel", &node))
        return false;
    struct spvdx_relabel *relabel;
    if (!spvdx_parse_relabel (nctx->up, node, &relabel))
        return false;
    p->relabel = xrealloc (p->relabel, sizeof *p->relabel * (p->n_relabel + 1));
    p->relabel[p->n_relabel++] = relabel;
    return true;
}

static bool
spvdx_parse_string_format_1 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_string_format *p)
{
    while (spvdx_try_parse_string_format (nctx, input, p, spvdx_parse_string_format_2))
        continue;
    while (spvdx_try_parse_string_format (nctx, input, p, spvdx_parse_string_format_3))
        continue;
    return true;
}

bool
spvdx_parse_string_format (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvdx_string_format **p_)
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
    struct spvdx_string_format *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvdx_string_format_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvdx_free_string_format (p);
        return false;
    }

    /* Parse content. */
    input = input->children;
    if (!spvdx_parse_string_format_1 (&nctx, &input, p)
        || !spvxml_content_parse_end (&nctx, input)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvdx_free_string_format (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvdx_free_string_format (struct spvdx_string_format *p)
{
    if (!p)
        return;

    for (size_t i = 0; i < p->n_relabel; i++)
        spvdx_free_relabel (p->relabel[i]);
    free (p->relabel);
    for (size_t i = 0; i < p->n_affix; i++)
        spvdx_free_affix (p->affix[i]);
    free (p->affix);
    free (p->node_.id);
    free (p);
}

void
spvdx_collect_ids_string_format (struct spvxml_context *ctx, struct spvdx_string_format *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

    for (size_t i = 0; i < p->n_relabel; i++)
        spvdx_collect_ids_relabel (ctx, p->relabel[i]);
    for (size_t i = 0; i < p->n_affix; i++)
        spvdx_collect_ids_affix (ctx, p->affix[i]);
}

bool
spvdx_is_string_format (const struct spvxml_node *node)
{
    return node->class_ == &spvdx_string_format_class;
}

struct spvdx_string_format *
spvdx_cast_string_format (const struct spvxml_node *node)
{
    return (node && spvdx_is_string_format (node)
            ? UP_CAST (node, struct spvdx_string_format, node_)
            : NULL);
}

void
spvdx_resolve_refs_string_format (struct spvxml_context *ctx UNUSED, struct spvdx_string_format *p UNUSED)
{
    if (!p)
        return;

    for (size_t i = 0; i < p->n_relabel; i++)
        spvdx_resolve_refs_relabel (ctx, p->relabel[i]);
    for (size_t i = 0; i < p->n_affix; i++)
        spvdx_resolve_refs_affix (ctx, p->affix[i]);
}

static void
spvdx_do_free_string_format (struct spvxml_node *node)
{
    spvdx_free_string_format (UP_CAST (node, struct spvdx_string_format, node_));
}

static void
spvdx_do_collect_ids_string_format (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_collect_ids_string_format (ctx, UP_CAST (node, struct spvdx_string_format, node_));
}

static void
spvdx_do_resolve_refs_string_format (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_resolve_refs_string_format (ctx, UP_CAST (node, struct spvdx_string_format, node_));
}

struct spvxml_node_class spvdx_string_format_class = {
    "stringFormat",
    spvdx_do_free_string_format,
    spvdx_do_collect_ids_string_format,
    spvdx_do_resolve_refs_string_format,
};


static bool UNUSED
spvdx_try_parse_style (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvdx_style *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvdx_style *))
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
spvdx_parse_style (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvdx_style **p_)
{
    enum {
        ATTR_BORDER_BOTTOM,
        ATTR_BORDER_BOTTOM_COLOR,
        ATTR_BORDER_LEFT,
        ATTR_BORDER_LEFT_COLOR,
        ATTR_BORDER_RIGHT,
        ATTR_BORDER_RIGHT_COLOR,
        ATTR_BORDER_TOP,
        ATTR_BORDER_TOP_COLOR,
        ATTR_COLOR,
        ATTR_COLOR2,
        ATTR_DECIMAL_OFFSET,
        ATTR_FONT_FAMILY,
        ATTR_FONT_SIZE,
        ATTR_FONT_STYLE,
        ATTR_FONT_UNDERLINE,
        ATTR_FONT_WEIGHT,
        ATTR_ID,
        ATTR_LABEL_ANGLE,
        ATTR_LABEL_LOCATION_HORIZONTAL,
        ATTR_LABEL_LOCATION_VERTICAL,
        ATTR_MARGIN_BOTTOM,
        ATTR_MARGIN_LEFT,
        ATTR_MARGIN_RIGHT,
        ATTR_MARGIN_TOP,
        ATTR_SIZE,
        ATTR_TEXT_ALIGNMENT,
        ATTR_VISIBLE,
        ATTR_WIDTH,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_BORDER_BOTTOM] = { "border-bottom", false, NULL },
        [ATTR_BORDER_BOTTOM_COLOR] = { "border-bottom-color", false, NULL },
        [ATTR_BORDER_LEFT] = { "border-left", false, NULL },
        [ATTR_BORDER_LEFT_COLOR] = { "border-left-color", false, NULL },
        [ATTR_BORDER_RIGHT] = { "border-right", false, NULL },
        [ATTR_BORDER_RIGHT_COLOR] = { "border-right-color", false, NULL },
        [ATTR_BORDER_TOP] = { "border-top", false, NULL },
        [ATTR_BORDER_TOP_COLOR] = { "border-top-color", false, NULL },
        [ATTR_COLOR] = { "color", false, NULL },
        [ATTR_COLOR2] = { "color2", false, NULL },
        [ATTR_DECIMAL_OFFSET] = { "decimal-offset", false, NULL },
        [ATTR_FONT_FAMILY] = { "font-family", false, NULL },
        [ATTR_FONT_SIZE] = { "font-size", false, NULL },
        [ATTR_FONT_STYLE] = { "font-style", false, NULL },
        [ATTR_FONT_UNDERLINE] = { "font-underline", false, NULL },
        [ATTR_FONT_WEIGHT] = { "font-weight", false, NULL },
        [ATTR_ID] = { "id", false, NULL },
        [ATTR_LABEL_ANGLE] = { "labelAngle", false, NULL },
        [ATTR_LABEL_LOCATION_HORIZONTAL] = { "labelLocationHorizontal", false, NULL },
        [ATTR_LABEL_LOCATION_VERTICAL] = { "labelLocationVertical", false, NULL },
        [ATTR_MARGIN_BOTTOM] = { "margin-bottom", false, NULL },
        [ATTR_MARGIN_LEFT] = { "margin-left", false, NULL },
        [ATTR_MARGIN_RIGHT] = { "margin-right", false, NULL },
        [ATTR_MARGIN_TOP] = { "margin-top", false, NULL },
        [ATTR_SIZE] = { "size", false, NULL },
        [ATTR_TEXT_ALIGNMENT] = { "textAlignment", false, NULL },
        [ATTR_VISIBLE] = { "visible", false, NULL },
        [ATTR_WIDTH] = { "width", false, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvdx_style *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvdx_style_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->border_bottom = spvxml_attr_parse_enum (
        &nctx, &attrs[ATTR_BORDER_BOTTOM], spvdx_border_bottom_map);
    p->border_bottom_color = attrs[ATTR_BORDER_BOTTOM_COLOR].value;
    attrs[ATTR_BORDER_BOTTOM_COLOR].value = NULL;
    p->border_left = spvxml_attr_parse_enum (
        &nctx, &attrs[ATTR_BORDER_LEFT], spvdx_border_left_map);
    p->border_left_color = attrs[ATTR_BORDER_LEFT_COLOR].value;
    attrs[ATTR_BORDER_LEFT_COLOR].value = NULL;
    p->border_right = spvxml_attr_parse_enum (
        &nctx, &attrs[ATTR_BORDER_RIGHT], spvdx_border_right_map);
    p->border_right_color = attrs[ATTR_BORDER_RIGHT_COLOR].value;
    attrs[ATTR_BORDER_RIGHT_COLOR].value = NULL;
    p->border_top = spvxml_attr_parse_enum (
        &nctx, &attrs[ATTR_BORDER_TOP], spvdx_border_top_map);
    p->border_top_color = attrs[ATTR_BORDER_TOP_COLOR].value;
    attrs[ATTR_BORDER_TOP_COLOR].value = NULL;
    p->color = spvxml_attr_parse_color (&nctx, &attrs[ATTR_COLOR]);
    p->color2 = spvxml_attr_parse_color (&nctx, &attrs[ATTR_COLOR2]);
    p->decimal_offset = spvxml_attr_parse_dimension (&nctx, &attrs[ATTR_DECIMAL_OFFSET]);
    p->font_family = attrs[ATTR_FONT_FAMILY].value;
    attrs[ATTR_FONT_FAMILY].value = NULL;
    p->font_size = attrs[ATTR_FONT_SIZE].value;
    attrs[ATTR_FONT_SIZE].value = NULL;
    p->font_style = spvxml_attr_parse_enum (
        &nctx, &attrs[ATTR_FONT_STYLE], spvdx_font_style_map);
    p->font_underline = spvxml_attr_parse_enum (
        &nctx, &attrs[ATTR_FONT_UNDERLINE], spvdx_font_underline_map);
    p->font_weight = spvxml_attr_parse_enum (
        &nctx, &attrs[ATTR_FONT_WEIGHT], spvdx_font_weight_map);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    p->label_angle = spvxml_attr_parse_real (&nctx, &attrs[ATTR_LABEL_ANGLE]);
    p->label_location_horizontal = spvxml_attr_parse_enum (
        &nctx, &attrs[ATTR_LABEL_LOCATION_HORIZONTAL], spvdx_label_location_horizontal_map);
    p->label_location_vertical = spvxml_attr_parse_enum (
        &nctx, &attrs[ATTR_LABEL_LOCATION_VERTICAL], spvdx_label_location_vertical_map);
    p->margin_bottom = spvxml_attr_parse_dimension (&nctx, &attrs[ATTR_MARGIN_BOTTOM]);
    p->margin_left = spvxml_attr_parse_dimension (&nctx, &attrs[ATTR_MARGIN_LEFT]);
    p->margin_right = spvxml_attr_parse_dimension (&nctx, &attrs[ATTR_MARGIN_RIGHT]);
    p->margin_top = spvxml_attr_parse_dimension (&nctx, &attrs[ATTR_MARGIN_TOP]);
    p->size = attrs[ATTR_SIZE].value;
    attrs[ATTR_SIZE].value = NULL;
    p->text_alignment = spvxml_attr_parse_enum (
        &nctx, &attrs[ATTR_TEXT_ALIGNMENT], spvdx_text_alignment_map);
    p->visible = spvxml_attr_parse_bool (&nctx, &attrs[ATTR_VISIBLE]);
    p->width = attrs[ATTR_WIDTH].value;
    attrs[ATTR_WIDTH].value = NULL;
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvdx_free_style (p);
        return false;
    }

    /* Parse content. */
    if (!spvxml_content_parse_end (&nctx, input->children)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvdx_free_style (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvdx_free_style (struct spvdx_style *p)
{
    if (!p)
        return;

    free (p->border_bottom_color);
    free (p->border_top_color);
    free (p->border_left_color);
    free (p->border_right_color);
    free (p->font_family);
    free (p->font_size);
    free (p->size);
    free (p->width);
    free (p->node_.id);
    free (p);
}

void
spvdx_collect_ids_style (struct spvxml_context *ctx, struct spvdx_style *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

}

bool
spvdx_is_style (const struct spvxml_node *node)
{
    return node->class_ == &spvdx_style_class;
}

struct spvdx_style *
spvdx_cast_style (const struct spvxml_node *node)
{
    return (node && spvdx_is_style (node)
            ? UP_CAST (node, struct spvdx_style, node_)
            : NULL);
}

void
spvdx_resolve_refs_style (struct spvxml_context *ctx UNUSED, struct spvdx_style *p UNUSED)
{
    if (!p)
        return;

}

static void
spvdx_do_free_style (struct spvxml_node *node)
{
    spvdx_free_style (UP_CAST (node, struct spvdx_style, node_));
}

static void
spvdx_do_collect_ids_style (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_collect_ids_style (ctx, UP_CAST (node, struct spvdx_style, node_));
}

static void
spvdx_do_resolve_refs_style (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_resolve_refs_style (ctx, UP_CAST (node, struct spvdx_style, node_));
}

struct spvxml_node_class spvdx_style_class = {
    "style",
    spvdx_do_free_style,
    spvdx_do_collect_ids_style,
    spvdx_do_resolve_refs_style,
};


static bool UNUSED
spvdx_try_parse_table_layout (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvdx_table_layout *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvdx_table_layout *))
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
spvdx_parse_table_layout (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvdx_table_layout **p_)
{
    enum {
        ATTR_FIT_CELLS,
        ATTR_ID,
        ATTR_STYLE,
        ATTR_VERTICAL_TITLES_IN_CORNER,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_FIT_CELLS] = { "fitCells", false, NULL },
        [ATTR_ID] = { "id", false, NULL },
        [ATTR_STYLE] = { "style", false, NULL },
        [ATTR_VERTICAL_TITLES_IN_CORNER] = { "verticalTitlesInCorner", true, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvdx_table_layout *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvdx_table_layout_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->fit_cells = spvxml_attr_parse_enum (
        &nctx, &attrs[ATTR_FIT_CELLS], spvdx_fit_cells_map);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    p->vertical_titles_in_corner = spvxml_attr_parse_bool (&nctx, &attrs[ATTR_VERTICAL_TITLES_IN_CORNER]);
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvdx_free_table_layout (p);
        return false;
    }

    /* Parse content. */
    if (!spvxml_content_parse_end (&nctx, input->children)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvdx_free_table_layout (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvdx_free_table_layout (struct spvdx_table_layout *p)
{
    if (!p)
        return;

    free (p->node_.id);
    free (p);
}

void
spvdx_collect_ids_table_layout (struct spvxml_context *ctx, struct spvdx_table_layout *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

}

bool
spvdx_is_table_layout (const struct spvxml_node *node)
{
    return node->class_ == &spvdx_table_layout_class;
}

struct spvdx_table_layout *
spvdx_cast_table_layout (const struct spvxml_node *node)
{
    return (node && spvdx_is_table_layout (node)
            ? UP_CAST (node, struct spvdx_table_layout, node_)
            : NULL);
}

void
spvdx_resolve_refs_table_layout (struct spvxml_context *ctx UNUSED, struct spvdx_table_layout *p UNUSED)
{
    if (!p)
        return;

    static const struct spvxml_node_class *const classes
        = &spvdx_style_class;
    p->style = spvdx_cast_style (spvxml_node_resolve_ref (ctx, p->node_.raw, "style", &classes, 1));
}

static void
spvdx_do_free_table_layout (struct spvxml_node *node)
{
    spvdx_free_table_layout (UP_CAST (node, struct spvdx_table_layout, node_));
}

static void
spvdx_do_collect_ids_table_layout (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_collect_ids_table_layout (ctx, UP_CAST (node, struct spvdx_table_layout, node_));
}

static void
spvdx_do_resolve_refs_table_layout (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_resolve_refs_table_layout (ctx, UP_CAST (node, struct spvdx_table_layout, node_));
}

struct spvxml_node_class spvdx_table_layout_class = {
    "tableLayout",
    spvdx_do_free_table_layout,
    spvdx_do_collect_ids_table_layout,
    spvdx_do_resolve_refs_table_layout,
};


static bool UNUSED
spvdx_try_parse_text (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvdx_text *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvdx_text *))
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
spvdx_parse_text_1 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_text *p)
{
    if (!spvxml_content_parse_text (nctx, input, &p->text))
        return false;
    return true;
}

bool
spvdx_parse_text (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvdx_text **p_)
{
    enum {
        ATTR_DEFINES_REFERENCE,
        ATTR_ID,
        ATTR_POSITION,
        ATTR_STYLE,
        ATTR_USES_REFERENCE,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_DEFINES_REFERENCE] = { "definesReference", false, NULL },
        [ATTR_ID] = { "id", false, NULL },
        [ATTR_POSITION] = { "position", false, NULL },
        [ATTR_STYLE] = { "style", true, NULL },
        [ATTR_USES_REFERENCE] = { "usesReference", false, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvdx_text *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvdx_text_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->defines_reference = spvxml_attr_parse_int (&nctx, &attrs[ATTR_DEFINES_REFERENCE]);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    p->position = spvxml_attr_parse_enum (
        &nctx, &attrs[ATTR_POSITION], spvdx_position_map);
    p->uses_reference = spvxml_attr_parse_int (&nctx, &attrs[ATTR_USES_REFERENCE]);
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvdx_free_text (p);
        return false;
    }

    /* Parse content. */
    input = input->children;
    if (!spvdx_parse_text_1 (&nctx, &input, p)
        || !spvxml_content_parse_end (&nctx, input)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvdx_free_text (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvdx_free_text (struct spvdx_text *p)
{
    if (!p)
        return;

    free (p->text);
    free (p->node_.id);
    free (p);
}

void
spvdx_collect_ids_text (struct spvxml_context *ctx, struct spvdx_text *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

}

bool
spvdx_is_text (const struct spvxml_node *node)
{
    return node->class_ == &spvdx_text_class;
}

struct spvdx_text *
spvdx_cast_text (const struct spvxml_node *node)
{
    return (node && spvdx_is_text (node)
            ? UP_CAST (node, struct spvdx_text, node_)
            : NULL);
}

void
spvdx_resolve_refs_text (struct spvxml_context *ctx UNUSED, struct spvdx_text *p UNUSED)
{
    if (!p)
        return;

    static const struct spvxml_node_class *const classes
        = &spvdx_style_class;
    p->style = spvdx_cast_style (spvxml_node_resolve_ref (ctx, p->node_.raw, "style", &classes, 1));
}

static void
spvdx_do_free_text (struct spvxml_node *node)
{
    spvdx_free_text (UP_CAST (node, struct spvdx_text, node_));
}

static void
spvdx_do_collect_ids_text (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_collect_ids_text (ctx, UP_CAST (node, struct spvdx_text, node_));
}

static void
spvdx_do_resolve_refs_text (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_resolve_refs_text (ctx, UP_CAST (node, struct spvdx_text, node_));
}

struct spvxml_node_class spvdx_text_class = {
    "text",
    spvdx_do_free_text,
    spvdx_do_collect_ids_text,
    spvdx_do_resolve_refs_text,
};


static bool UNUSED
spvdx_try_parse_union (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvdx_union *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvdx_union *))
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
spvdx_parse_union_2 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_union *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "intersect", &node))
        return false;
    struct spvdx_intersect *intersect;
    if (!spvdx_parse_intersect (nctx->up, node, &intersect))
        return false;
    p->intersect = xrealloc (p->intersect, sizeof *p->intersect * (p->n_intersect + 1));
    p->intersect[p->n_intersect++] = intersect;
    return true;
}

static bool
spvdx_parse_union_1 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_union *p)
{
    if (!spvdx_parse_union_2 (nctx, input, p))
        return false;
    while (spvdx_try_parse_union (nctx, input, p, spvdx_parse_union_2))
        continue;
    return true;
}

bool
spvdx_parse_union (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvdx_union **p_)
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
    struct spvdx_union *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvdx_union_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvdx_free_union (p);
        return false;
    }

    /* Parse content. */
    input = input->children;
    if (!spvdx_parse_union_1 (&nctx, &input, p)
        || !spvxml_content_parse_end (&nctx, input)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvdx_free_union (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvdx_free_union (struct spvdx_union *p)
{
    if (!p)
        return;

    for (size_t i = 0; i < p->n_intersect; i++)
        spvdx_free_intersect (p->intersect[i]);
    free (p->intersect);
    free (p->node_.id);
    free (p);
}

void
spvdx_collect_ids_union (struct spvxml_context *ctx, struct spvdx_union *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

    for (size_t i = 0; i < p->n_intersect; i++)
        spvdx_collect_ids_intersect (ctx, p->intersect[i]);
}

bool
spvdx_is_union (const struct spvxml_node *node)
{
    return node->class_ == &spvdx_union_class;
}

struct spvdx_union *
spvdx_cast_union (const struct spvxml_node *node)
{
    return (node && spvdx_is_union (node)
            ? UP_CAST (node, struct spvdx_union, node_)
            : NULL);
}

void
spvdx_resolve_refs_union (struct spvxml_context *ctx UNUSED, struct spvdx_union *p UNUSED)
{
    if (!p)
        return;

    for (size_t i = 0; i < p->n_intersect; i++)
        spvdx_resolve_refs_intersect (ctx, p->intersect[i]);
}

static void
spvdx_do_free_union (struct spvxml_node *node)
{
    spvdx_free_union (UP_CAST (node, struct spvdx_union, node_));
}

static void
spvdx_do_collect_ids_union (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_collect_ids_union (ctx, UP_CAST (node, struct spvdx_union, node_));
}

static void
spvdx_do_resolve_refs_union (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_resolve_refs_union (ctx, UP_CAST (node, struct spvdx_union, node_));
}

struct spvxml_node_class spvdx_union_class = {
    "union",
    spvdx_do_free_union,
    spvdx_do_collect_ids_union,
    spvdx_do_resolve_refs_union,
};


static bool UNUSED
spvdx_try_parse_unity (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvdx_unity *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvdx_unity *))
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
spvdx_parse_unity (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvdx_unity **p_)
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
    struct spvdx_unity *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvdx_unity_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvdx_free_unity (p);
        return false;
    }

    /* Parse content. */
    if (!spvxml_content_parse_end (&nctx, input->children)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvdx_free_unity (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvdx_free_unity (struct spvdx_unity *p)
{
    if (!p)
        return;

    free (p->node_.id);
    free (p);
}

void
spvdx_collect_ids_unity (struct spvxml_context *ctx, struct spvdx_unity *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

}

bool
spvdx_is_unity (const struct spvxml_node *node)
{
    return node->class_ == &spvdx_unity_class;
}

struct spvdx_unity *
spvdx_cast_unity (const struct spvxml_node *node)
{
    return (node && spvdx_is_unity (node)
            ? UP_CAST (node, struct spvdx_unity, node_)
            : NULL);
}

void
spvdx_resolve_refs_unity (struct spvxml_context *ctx UNUSED, struct spvdx_unity *p UNUSED)
{
    if (!p)
        return;

}

static void
spvdx_do_free_unity (struct spvxml_node *node)
{
    spvdx_free_unity (UP_CAST (node, struct spvdx_unity, node_));
}

static void
spvdx_do_collect_ids_unity (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_collect_ids_unity (ctx, UP_CAST (node, struct spvdx_unity, node_));
}

static void
spvdx_do_resolve_refs_unity (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_resolve_refs_unity (ctx, UP_CAST (node, struct spvdx_unity, node_));
}

struct spvxml_node_class spvdx_unity_class = {
    "unity",
    spvdx_do_free_unity,
    spvdx_do_collect_ids_unity,
    spvdx_do_resolve_refs_unity,
};


static bool UNUSED
spvdx_try_parse_user_source (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvdx_user_source *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvdx_user_source *))
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
spvdx_parse_user_source (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvdx_user_source **p_)
{
    enum {
        ATTR_ID,
        ATTR_MISSING,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_ID] = { "id", false, NULL },
        [ATTR_MISSING] = { "missing", false, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvdx_user_source *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvdx_user_source_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    p->missing = spvxml_attr_parse_enum (
        &nctx, &attrs[ATTR_MISSING], spvdx_missing_map);
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvdx_free_user_source (p);
        return false;
    }

    /* Parse content. */
    if (!spvxml_content_parse_end (&nctx, input->children)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvdx_free_user_source (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvdx_free_user_source (struct spvdx_user_source *p)
{
    if (!p)
        return;

    free (p->node_.id);
    free (p);
}

void
spvdx_collect_ids_user_source (struct spvxml_context *ctx, struct spvdx_user_source *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

}

bool
spvdx_is_user_source (const struct spvxml_node *node)
{
    return node->class_ == &spvdx_user_source_class;
}

struct spvdx_user_source *
spvdx_cast_user_source (const struct spvxml_node *node)
{
    return (node && spvdx_is_user_source (node)
            ? UP_CAST (node, struct spvdx_user_source, node_)
            : NULL);
}

void
spvdx_resolve_refs_user_source (struct spvxml_context *ctx UNUSED, struct spvdx_user_source *p UNUSED)
{
    if (!p)
        return;

}

static void
spvdx_do_free_user_source (struct spvxml_node *node)
{
    spvdx_free_user_source (UP_CAST (node, struct spvdx_user_source, node_));
}

static void
spvdx_do_collect_ids_user_source (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_collect_ids_user_source (ctx, UP_CAST (node, struct spvdx_user_source, node_));
}

static void
spvdx_do_resolve_refs_user_source (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_resolve_refs_user_source (ctx, UP_CAST (node, struct spvdx_user_source, node_));
}

struct spvxml_node_class spvdx_user_source_class = {
    "userSource",
    spvdx_do_free_user_source,
    spvdx_do_collect_ids_user_source,
    spvdx_do_resolve_refs_user_source,
};


static bool UNUSED
spvdx_try_parse_value_map_entry (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvdx_value_map_entry *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvdx_value_map_entry *))
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
spvdx_parse_value_map_entry (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvdx_value_map_entry **p_)
{
    enum {
        ATTR_FROM,
        ATTR_ID,
        ATTR_TO,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_FROM] = { "from", true, NULL },
        [ATTR_ID] = { "id", false, NULL },
        [ATTR_TO] = { "to", true, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvdx_value_map_entry *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvdx_value_map_entry_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->from = attrs[ATTR_FROM].value;
    attrs[ATTR_FROM].value = NULL;
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    p->to = attrs[ATTR_TO].value;
    attrs[ATTR_TO].value = NULL;
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvdx_free_value_map_entry (p);
        return false;
    }

    /* Parse content. */
    if (!spvxml_content_parse_end (&nctx, input->children)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvdx_free_value_map_entry (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvdx_free_value_map_entry (struct spvdx_value_map_entry *p)
{
    if (!p)
        return;

    free (p->from);
    free (p->to);
    free (p->node_.id);
    free (p);
}

void
spvdx_collect_ids_value_map_entry (struct spvxml_context *ctx, struct spvdx_value_map_entry *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

}

bool
spvdx_is_value_map_entry (const struct spvxml_node *node)
{
    return node->class_ == &spvdx_value_map_entry_class;
}

struct spvdx_value_map_entry *
spvdx_cast_value_map_entry (const struct spvxml_node *node)
{
    return (node && spvdx_is_value_map_entry (node)
            ? UP_CAST (node, struct spvdx_value_map_entry, node_)
            : NULL);
}

void
spvdx_resolve_refs_value_map_entry (struct spvxml_context *ctx UNUSED, struct spvdx_value_map_entry *p UNUSED)
{
    if (!p)
        return;

}

static void
spvdx_do_free_value_map_entry (struct spvxml_node *node)
{
    spvdx_free_value_map_entry (UP_CAST (node, struct spvdx_value_map_entry, node_));
}

static void
spvdx_do_collect_ids_value_map_entry (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_collect_ids_value_map_entry (ctx, UP_CAST (node, struct spvdx_value_map_entry, node_));
}

static void
spvdx_do_resolve_refs_value_map_entry (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_resolve_refs_value_map_entry (ctx, UP_CAST (node, struct spvdx_value_map_entry, node_));
}

struct spvxml_node_class spvdx_value_map_entry_class = {
    "valueMapEntry",
    spvdx_do_free_value_map_entry,
    spvdx_do_collect_ids_value_map_entry,
    spvdx_do_resolve_refs_value_map_entry,
};


static bool UNUSED
spvdx_try_parse_variable_reference (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvdx_variable_reference *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvdx_variable_reference *))
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
spvdx_parse_variable_reference (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvdx_variable_reference **p_)
{
    enum {
        ATTR_ID,
        ATTR_REF,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_ID] = { "id", false, NULL },
        [ATTR_REF] = { "ref", true, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvdx_variable_reference *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvdx_variable_reference_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvdx_free_variable_reference (p);
        return false;
    }

    /* Parse content. */
    if (!spvxml_content_parse_end (&nctx, input->children)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvdx_free_variable_reference (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvdx_free_variable_reference (struct spvdx_variable_reference *p)
{
    if (!p)
        return;

    free (p->node_.id);
    free (p);
}

void
spvdx_collect_ids_variable_reference (struct spvxml_context *ctx, struct spvdx_variable_reference *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

}

bool
spvdx_is_variable_reference (const struct spvxml_node *node)
{
    return node->class_ == &spvdx_variable_reference_class;
}

struct spvdx_variable_reference *
spvdx_cast_variable_reference (const struct spvxml_node *node)
{
    return (node && spvdx_is_variable_reference (node)
            ? UP_CAST (node, struct spvdx_variable_reference, node_)
            : NULL);
}

void
spvdx_resolve_refs_variable_reference (struct spvxml_context *ctx UNUSED, struct spvdx_variable_reference *p UNUSED)
{
    if (!p)
        return;

    static const struct spvxml_node_class *const classes[] = {
        &spvdx_derived_variable_class,
        &spvdx_source_variable_class,
    };
    const size_t n_classes = sizeof classes / sizeof *classes;
    p->ref = spvxml_node_resolve_ref (ctx, p->node_.raw, "ref", classes, n_classes);
}

static void
spvdx_do_free_variable_reference (struct spvxml_node *node)
{
    spvdx_free_variable_reference (UP_CAST (node, struct spvdx_variable_reference, node_));
}

static void
spvdx_do_collect_ids_variable_reference (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_collect_ids_variable_reference (ctx, UP_CAST (node, struct spvdx_variable_reference, node_));
}

static void
spvdx_do_resolve_refs_variable_reference (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_resolve_refs_variable_reference (ctx, UP_CAST (node, struct spvdx_variable_reference, node_));
}

struct spvxml_node_class spvdx_variable_reference_class = {
    "variableReference",
    spvdx_do_free_variable_reference,
    spvdx_do_collect_ids_variable_reference,
    spvdx_do_resolve_refs_variable_reference,
};


static bool UNUSED
spvdx_try_parse_variable_extension (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvdx_variable_extension *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvdx_variable_extension *))
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
spvdx_parse_variable_extension (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvdx_variable_extension **p_)
{
    enum {
        ATTR_FROM,
        ATTR_HELP_ID,
        ATTR_ID,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_FROM] = { "from", true, NULL },
        [ATTR_HELP_ID] = { "helpId", true, NULL },
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
    struct spvdx_variable_extension *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvdx_variable_extension_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->from = attrs[ATTR_FROM].value;
    attrs[ATTR_FROM].value = NULL;
    p->help_id = attrs[ATTR_HELP_ID].value;
    attrs[ATTR_HELP_ID].value = NULL;
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvdx_free_variable_extension (p);
        return false;
    }

    /* Parse content. */
    if (!spvxml_content_parse_end (&nctx, input->children)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvdx_free_variable_extension (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvdx_free_variable_extension (struct spvdx_variable_extension *p)
{
    if (!p)
        return;

    free (p->from);
    free (p->help_id);
    free (p->node_.id);
    free (p);
}

void
spvdx_collect_ids_variable_extension (struct spvxml_context *ctx, struct spvdx_variable_extension *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

}

bool
spvdx_is_variable_extension (const struct spvxml_node *node)
{
    return node->class_ == &spvdx_variable_extension_class;
}

struct spvdx_variable_extension *
spvdx_cast_variable_extension (const struct spvxml_node *node)
{
    return (node && spvdx_is_variable_extension (node)
            ? UP_CAST (node, struct spvdx_variable_extension, node_)
            : NULL);
}

void
spvdx_resolve_refs_variable_extension (struct spvxml_context *ctx UNUSED, struct spvdx_variable_extension *p UNUSED)
{
    if (!p)
        return;

}

static void
spvdx_do_free_variable_extension (struct spvxml_node *node)
{
    spvdx_free_variable_extension (UP_CAST (node, struct spvdx_variable_extension, node_));
}

static void
spvdx_do_collect_ids_variable_extension (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_collect_ids_variable_extension (ctx, UP_CAST (node, struct spvdx_variable_extension, node_));
}

static void
spvdx_do_resolve_refs_variable_extension (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_resolve_refs_variable_extension (ctx, UP_CAST (node, struct spvdx_variable_extension, node_));
}

struct spvxml_node_class spvdx_variable_extension_class = {
    "variable_extension (extension)",
    spvdx_do_free_variable_extension,
    spvdx_do_collect_ids_variable_extension,
    spvdx_do_resolve_refs_variable_extension,
};


static bool UNUSED
spvdx_try_parse_visualization (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvdx_visualization *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvdx_visualization *))
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
spvdx_parse_visualization_11 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_visualization *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "layerController", &node))
        return false;
    if (!spvdx_parse_layer_controller (nctx->up, node, &p->layer_controller))
        return false;
    return true;
}

static bool
spvdx_parse_visualization_10 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_visualization *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "style", &node))
        return false;
    struct spvdx_style *style;
    if (!spvdx_parse_style (nctx->up, node, &style))
        return false;
    p->style = xrealloc (p->style, sizeof *p->style * (p->n_style + 1));
    p->style[p->n_style++] = style;
    return true;
}

static bool
spvdx_parse_visualization_9 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_visualization *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "labelFrame", &node))
        return false;
    struct spvdx_label_frame *lf2;
    if (!spvdx_parse_label_frame (nctx->up, node, &lf2))
        return false;
    p->lf2 = xrealloc (p->lf2, sizeof *p->lf2 * (p->n_lf2 + 1));
    p->lf2[p->n_lf2++] = lf2;
    return true;
}

static bool
spvdx_parse_visualization_8 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_visualization *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "container", &node))
        return false;
    if (!spvdx_parse_container (nctx->up, node, &p->container))
        return false;
    return true;
}

static bool
spvdx_parse_visualization_7 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_visualization *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "labelFrame", &node))
        return false;
    struct spvdx_label_frame *lf1;
    if (!spvdx_parse_label_frame (nctx->up, node, &lf1))
        return false;
    p->lf1 = xrealloc (p->lf1, sizeof *p->lf1 * (p->n_lf1 + 1));
    p->lf1[p->n_lf1++] = lf1;
    return true;
}

static bool
spvdx_parse_visualization_6 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_visualization *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "categoricalDomain", &node))
        return false;
    if (!spvdx_parse_categorical_domain (nctx->up, node, &p->categorical_domain))
        return false;
    return true;
}

static bool
spvdx_parse_visualization_5 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_visualization *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "derivedVariable", &node))
        return false;
    struct spvdx_derived_variable *seq;
    if (!spvdx_parse_derived_variable (nctx->up, node, &seq))
        return false;
    p->seq = xrealloc (p->seq, sizeof *p->seq * (p->n_seq + 1));
    p->seq[p->n_seq++] = &seq->node_;
    return true;
}

static bool
spvdx_parse_visualization_4 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_visualization *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "sourceVariable", &node))
        return false;
    struct spvdx_source_variable *seq;
    if (!spvdx_parse_source_variable (nctx->up, node, &seq))
        return false;
    p->seq = xrealloc (p->seq, sizeof *p->seq * (p->n_seq + 1));
    p->seq[p->n_seq++] = &seq->node_;
    return true;
}

static bool
spvdx_parse_visualization_3 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_visualization *p)
{
    if (!spvdx_try_parse_visualization (nctx, input, p, spvdx_parse_visualization_4)
        && !spvdx_try_parse_visualization (nctx, input, p, spvdx_parse_visualization_5))
      {
        spvxml_content_error (nctx, *input, "Syntax error.");
        return false;
      }
    return true;
}

static bool
spvdx_parse_visualization_2 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_visualization *p)
{
    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "extension", &node))
        return false;
    if (!spvdx_parse_visualization_extension (nctx->up, node, &p->visualization_extension))
        return false;
    return true;
}

static bool
spvdx_parse_visualization_1 (struct spvxml_node_context *nctx, xmlNode **input, struct spvdx_visualization *p)
{
    spvdx_try_parse_visualization (nctx, input, p, spvdx_parse_visualization_2);

    xmlNode *node;
    if (!spvxml_content_parse_element (nctx, input, "userSource", &node))
        return false;
    if (!spvdx_parse_user_source (nctx->up, node, &p->user_source))
        return false;
    if (!spvdx_parse_visualization_3 (nctx, input, p))
        return false;
    while (spvdx_try_parse_visualization (nctx, input, p, spvdx_parse_visualization_3))
        continue;
    spvdx_try_parse_visualization (nctx, input, p, spvdx_parse_visualization_6);

    xmlNode *node2;
    if (!spvxml_content_parse_element (nctx, input, "graph", &node2))
        return false;
    if (!spvdx_parse_graph (nctx->up, node2, &p->graph))
        return false;
    while (spvdx_try_parse_visualization (nctx, input, p, spvdx_parse_visualization_7))
        continue;
    spvdx_try_parse_visualization (nctx, input, p, spvdx_parse_visualization_8);
    while (spvdx_try_parse_visualization (nctx, input, p, spvdx_parse_visualization_9))
        continue;
    if (!spvdx_parse_visualization_10 (nctx, input, p))
        return false;
    while (spvdx_try_parse_visualization (nctx, input, p, spvdx_parse_visualization_10))
        continue;
    spvdx_try_parse_visualization (nctx, input, p, spvdx_parse_visualization_11);
    return true;
}

bool
spvdx_parse_visualization (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvdx_visualization **p_)
{
    enum {
        ATTR_CREATOR,
        ATTR_DATE,
        ATTR_ID,
        ATTR_LANG,
        ATTR_NAME,
        ATTR_SCHEMA_LOCATION,
        ATTR_STYLE_REF,
        ATTR_TYPE,
        ATTR_VERSION,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_CREATOR] = { "creator", true, NULL },
        [ATTR_DATE] = { "date", true, NULL },
        [ATTR_ID] = { "id", false, NULL },
        [ATTR_LANG] = { "lang", true, NULL },
        [ATTR_NAME] = { "name", true, NULL },
        [ATTR_SCHEMA_LOCATION] = { "schemaLocation", false, NULL },
        [ATTR_STYLE_REF] = { "style", true, NULL },
        [ATTR_TYPE] = { "type", true, NULL },
        [ATTR_VERSION] = { "version", true, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvdx_visualization *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvdx_visualization_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->creator = attrs[ATTR_CREATOR].value;
    attrs[ATTR_CREATOR].value = NULL;
    p->date = attrs[ATTR_DATE].value;
    attrs[ATTR_DATE].value = NULL;
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    p->lang = attrs[ATTR_LANG].value;
    attrs[ATTR_LANG].value = NULL;
    p->name = attrs[ATTR_NAME].value;
    attrs[ATTR_NAME].value = NULL;
    p->schema_location = attrs[ATTR_SCHEMA_LOCATION].value;
    attrs[ATTR_SCHEMA_LOCATION].value = NULL;
    p->type = attrs[ATTR_TYPE].value;
    attrs[ATTR_TYPE].value = NULL;
    p->version = attrs[ATTR_VERSION].value;
    attrs[ATTR_VERSION].value = NULL;
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvdx_free_visualization (p);
        return false;
    }

    /* Parse content. */
    input = input->children;
    if (!spvdx_parse_visualization_1 (&nctx, &input, p)
        || !spvxml_content_parse_end (&nctx, input)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvdx_free_visualization (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvdx_free_visualization (struct spvdx_visualization *p)
{
    if (!p)
        return;

    free (p->creator);
    free (p->date);
    free (p->lang);
    free (p->name);
    free (p->type);
    free (p->version);
    free (p->schema_location);
    spvdx_free_visualization_extension (p->visualization_extension);
    spvdx_free_user_source (p->user_source);
    for (size_t i = 0; i < p->n_seq; i++)
        p->seq[i]->class_->spvxml_node_free (p->seq[i]);
    free (p->seq);
    spvdx_free_categorical_domain (p->categorical_domain);
    spvdx_free_graph (p->graph);
    for (size_t i = 0; i < p->n_lf1; i++)
        spvdx_free_label_frame (p->lf1[i]);
    free (p->lf1);
    spvdx_free_container (p->container);
    for (size_t i = 0; i < p->n_lf2; i++)
        spvdx_free_label_frame (p->lf2[i]);
    free (p->lf2);
    for (size_t i = 0; i < p->n_style; i++)
        spvdx_free_style (p->style[i]);
    free (p->style);
    spvdx_free_layer_controller (p->layer_controller);
    free (p->node_.id);
    free (p);
}

void
spvdx_collect_ids_visualization (struct spvxml_context *ctx, struct spvdx_visualization *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

    spvdx_collect_ids_visualization_extension (ctx, p->visualization_extension);
    spvdx_collect_ids_user_source (ctx, p->user_source);
    for (size_t i = 0; i < p->n_seq; i++)
        p->seq[i]->class_->spvxml_node_collect_ids (ctx, p->seq[i]);
    spvdx_collect_ids_categorical_domain (ctx, p->categorical_domain);
    spvdx_collect_ids_graph (ctx, p->graph);
    for (size_t i = 0; i < p->n_lf1; i++)
        spvdx_collect_ids_label_frame (ctx, p->lf1[i]);
    spvdx_collect_ids_container (ctx, p->container);
    for (size_t i = 0; i < p->n_lf2; i++)
        spvdx_collect_ids_label_frame (ctx, p->lf2[i]);
    for (size_t i = 0; i < p->n_style; i++)
        spvdx_collect_ids_style (ctx, p->style[i]);
    spvdx_collect_ids_layer_controller (ctx, p->layer_controller);
}

bool
spvdx_is_visualization (const struct spvxml_node *node)
{
    return node->class_ == &spvdx_visualization_class;
}

struct spvdx_visualization *
spvdx_cast_visualization (const struct spvxml_node *node)
{
    return (node && spvdx_is_visualization (node)
            ? UP_CAST (node, struct spvdx_visualization, node_)
            : NULL);
}

void
spvdx_resolve_refs_visualization (struct spvxml_context *ctx UNUSED, struct spvdx_visualization *p UNUSED)
{
    if (!p)
        return;

    static const struct spvxml_node_class *const classes
        = &spvdx_style_class;
    p->style_ref = spvdx_cast_style (spvxml_node_resolve_ref (ctx, p->node_.raw, "style", &classes, 1));
    spvdx_resolve_refs_visualization_extension (ctx, p->visualization_extension);
    spvdx_resolve_refs_user_source (ctx, p->user_source);
    for (size_t i = 0; i < p->n_seq; i++)
        p->seq[i]->class_->spvxml_node_resolve_refs (ctx, p->seq[i]);
    spvdx_resolve_refs_categorical_domain (ctx, p->categorical_domain);
    spvdx_resolve_refs_graph (ctx, p->graph);
    for (size_t i = 0; i < p->n_lf1; i++)
        spvdx_resolve_refs_label_frame (ctx, p->lf1[i]);
    spvdx_resolve_refs_container (ctx, p->container);
    for (size_t i = 0; i < p->n_lf2; i++)
        spvdx_resolve_refs_label_frame (ctx, p->lf2[i]);
    for (size_t i = 0; i < p->n_style; i++)
        spvdx_resolve_refs_style (ctx, p->style[i]);
    spvdx_resolve_refs_layer_controller (ctx, p->layer_controller);
}

static void
spvdx_do_free_visualization (struct spvxml_node *node)
{
    spvdx_free_visualization (UP_CAST (node, struct spvdx_visualization, node_));
}

static void
spvdx_do_collect_ids_visualization (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_collect_ids_visualization (ctx, UP_CAST (node, struct spvdx_visualization, node_));
}

static void
spvdx_do_resolve_refs_visualization (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_resolve_refs_visualization (ctx, UP_CAST (node, struct spvdx_visualization, node_));
}

struct spvxml_node_class spvdx_visualization_class = {
    "visualization",
    spvdx_do_free_visualization,
    spvdx_do_collect_ids_visualization,
    spvdx_do_resolve_refs_visualization,
};


static bool UNUSED
spvdx_try_parse_visualization_extension (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvdx_visualization_extension *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvdx_visualization_extension *))
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
spvdx_parse_visualization_extension (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvdx_visualization_extension **p_)
{
    enum {
        ATTR_ID,
        ATTR_MAX_WIDTH_SET,
        ATTR_MIN_WIDTH_SET,
        ATTR_NUM_ROWS,
        ATTR_SHOW_GRIDLINE,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_ID] = { "id", false, NULL },
        [ATTR_MAX_WIDTH_SET] = { "maxWidthSet", false, NULL },
        [ATTR_MIN_WIDTH_SET] = { "minWidthSet", false, NULL },
        [ATTR_NUM_ROWS] = { "numRows", false, NULL },
        [ATTR_SHOW_GRIDLINE] = { "showGridline", false, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvdx_visualization_extension *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvdx_visualization_extension_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    p->max_width_set_present = spvxml_attr_parse_fixed (
        &nctx, &attrs[ATTR_MAX_WIDTH_SET], "true");
    p->min_width_set_present = spvxml_attr_parse_fixed (
        &nctx, &attrs[ATTR_MIN_WIDTH_SET], "true");
    p->num_rows = spvxml_attr_parse_int (&nctx, &attrs[ATTR_NUM_ROWS]);
    p->show_gridline = spvxml_attr_parse_bool (&nctx, &attrs[ATTR_SHOW_GRIDLINE]);
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvdx_free_visualization_extension (p);
        return false;
    }

    /* Parse content. */
    if (!spvxml_content_parse_end (&nctx, input->children)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvdx_free_visualization_extension (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvdx_free_visualization_extension (struct spvdx_visualization_extension *p)
{
    if (!p)
        return;

    free (p->node_.id);
    free (p);
}

void
spvdx_collect_ids_visualization_extension (struct spvxml_context *ctx, struct spvdx_visualization_extension *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

}

bool
spvdx_is_visualization_extension (const struct spvxml_node *node)
{
    return node->class_ == &spvdx_visualization_extension_class;
}

struct spvdx_visualization_extension *
spvdx_cast_visualization_extension (const struct spvxml_node *node)
{
    return (node && spvdx_is_visualization_extension (node)
            ? UP_CAST (node, struct spvdx_visualization_extension, node_)
            : NULL);
}

void
spvdx_resolve_refs_visualization_extension (struct spvxml_context *ctx UNUSED, struct spvdx_visualization_extension *p UNUSED)
{
    if (!p)
        return;

}

static void
spvdx_do_free_visualization_extension (struct spvxml_node *node)
{
    spvdx_free_visualization_extension (UP_CAST (node, struct spvdx_visualization_extension, node_));
}

static void
spvdx_do_collect_ids_visualization_extension (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_collect_ids_visualization_extension (ctx, UP_CAST (node, struct spvdx_visualization_extension, node_));
}

static void
spvdx_do_resolve_refs_visualization_extension (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_resolve_refs_visualization_extension (ctx, UP_CAST (node, struct spvdx_visualization_extension, node_));
}

struct spvxml_node_class spvdx_visualization_extension_class = {
    "visualization_extension (extension)",
    spvdx_do_free_visualization_extension,
    spvdx_do_collect_ids_visualization_extension,
    spvdx_do_resolve_refs_visualization_extension,
};


static bool UNUSED
spvdx_try_parse_where (
    struct spvxml_node_context *nctx, xmlNode **input,
    struct spvdx_where *p,
    bool (*sub) (struct spvxml_node_context *,
                 xmlNode **,
                 struct spvdx_where *))
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
spvdx_parse_where (
    struct spvxml_context *ctx, xmlNode *input,
    struct spvdx_where **p_)
{
    enum {
        ATTR_ID,
        ATTR_INCLUDE,
        ATTR_VARIABLE,
    };
    struct spvxml_attribute attrs[] = {
        [ATTR_ID] = { "id", false, NULL },
        [ATTR_INCLUDE] = { "include", true, NULL },
        [ATTR_VARIABLE] = { "variable", true, NULL },
    };
    enum { N_ATTRS = sizeof attrs / sizeof *attrs };
    struct spvxml_node_context nctx = {
        .up = ctx,
        .parent = input,
        .attrs = attrs,
        .n_attrs = N_ATTRS,
    };

    *p_ = NULL;
    struct spvdx_where *p = xzalloc (sizeof *p);
    p->node_.raw = input;
    p->node_.class_ = &spvdx_where_class;

    /* Parse attributes. */
    spvxml_parse_attributes (&nctx);
    p->node_.id = attrs[ATTR_ID].value;
    attrs[ATTR_ID].value = NULL;
    p->include = attrs[ATTR_INCLUDE].value;
    attrs[ATTR_INCLUDE].value = NULL;
    if (ctx->error) {
        spvxml_node_context_uninit (&nctx);
        ctx->hard_error = true;
        spvdx_free_where (p);
        return false;
    }

    /* Parse content. */
    if (!spvxml_content_parse_end (&nctx, input->children)) {
        ctx->hard_error = true;
        spvxml_node_context_uninit (&nctx);
        spvdx_free_where (p);
        return false;
    }

    spvxml_node_context_uninit (&nctx);
    *p_ = p;
    return true;
}

void
spvdx_free_where (struct spvdx_where *p)
{
    if (!p)
        return;

    free (p->include);
    free (p->node_.id);
    free (p);
}

void
spvdx_collect_ids_where (struct spvxml_context *ctx, struct spvdx_where *p)
{
    if (!p)
        return;

    spvxml_node_collect_id (ctx, &p->node_);

}

bool
spvdx_is_where (const struct spvxml_node *node)
{
    return node->class_ == &spvdx_where_class;
}

struct spvdx_where *
spvdx_cast_where (const struct spvxml_node *node)
{
    return (node && spvdx_is_where (node)
            ? UP_CAST (node, struct spvdx_where, node_)
            : NULL);
}

void
spvdx_resolve_refs_where (struct spvxml_context *ctx UNUSED, struct spvdx_where *p UNUSED)
{
    if (!p)
        return;

    static const struct spvxml_node_class *const classes[] = {
        &spvdx_derived_variable_class,
        &spvdx_source_variable_class,
    };
    const size_t n_classes = sizeof classes / sizeof *classes;
    p->variable = spvxml_node_resolve_ref (ctx, p->node_.raw, "variable", classes, n_classes);
}

static void
spvdx_do_free_where (struct spvxml_node *node)
{
    spvdx_free_where (UP_CAST (node, struct spvdx_where, node_));
}

static void
spvdx_do_collect_ids_where (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_collect_ids_where (ctx, UP_CAST (node, struct spvdx_where, node_));
}

static void
spvdx_do_resolve_refs_where (struct spvxml_context *ctx, struct spvxml_node *node)
{
    spvdx_resolve_refs_where (ctx, UP_CAST (node, struct spvdx_where, node_));
}

struct spvxml_node_class spvdx_where_class = {
    "where",
    spvdx_do_free_where,
    spvdx_do_collect_ids_where,
    spvdx_do_resolve_refs_where,
};

