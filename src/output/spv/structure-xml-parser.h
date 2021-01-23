/* Generated automatically -- do not modify!    -*- buffer-read-only: t -*- */
#ifndef SPVSX_PARSER_H
#define SPVSX_PARSER_H

#include <stddef.h>
#include <stdint.h>
#include <stdbool.h>
#include "output/spv/spvxml-helpers.h"

struct spvsx_vi_zml {
    struct spvxml_node node_;

    /* Attributes. */
    char *view_name;               /* Possibly null. */

    /* Content. */
    char *text; /* Always nonnull. */
};

extern struct spvxml_node_class spvsx_vi_zml_class;

bool spvsx_parse_vi_zml (struct spvxml_context *, xmlNode *input, struct spvsx_vi_zml **);
void spvsx_free_vi_zml (struct spvsx_vi_zml *);
bool spvsx_is_vi_zml (const struct spvxml_node *);
struct spvsx_vi_zml *spvsx_cast_vi_zml (const struct spvxml_node *);

struct spvsx_border_properties {
    struct spvxml_node node_;

    /* Content. */
    struct spvsx_border_style **border_style;
    size_t n_border_style;
};

extern struct spvxml_node_class spvsx_border_properties_class;

bool spvsx_parse_border_properties (struct spvxml_context *, xmlNode *input, struct spvsx_border_properties **);
void spvsx_free_border_properties (struct spvsx_border_properties *);
bool spvsx_is_border_properties (const struct spvxml_node *);
struct spvsx_border_properties *spvsx_cast_border_properties (const struct spvxml_node *);

enum spvsx_border_style_type {
    SPVSX_BORDER_STYLE_TYPE_DASHED = 1,
    SPVSX_BORDER_STYLE_TYPE_DOUBLE,
    SPVSX_BORDER_STYLE_TYPE_NONE,
    SPVSX_BORDER_STYLE_TYPE_SOLID,
    SPVSX_BORDER_STYLE_TYPE_THICK,
    SPVSX_BORDER_STYLE_TYPE_THIN,
};
const char *spvsx_border_style_type_to_string (enum spvsx_border_style_type);

struct spvsx_border_style {
    struct spvxml_node node_;

    /* Attributes. */
    enum spvsx_border_style_type border_style_type; /* Zero if not present. */
    int color;                     /* -1 if not present. */
};

extern struct spvxml_node_class spvsx_border_style_class;

bool spvsx_parse_border_style (struct spvxml_context *, xmlNode *input, struct spvsx_border_style **);
void spvsx_free_border_style (struct spvsx_border_style *);
bool spvsx_is_border_style (const struct spvxml_node *);
struct spvsx_border_style *spvsx_cast_border_style (const struct spvxml_node *);

struct spvsx_cell_format_properties {
    struct spvxml_node node_;

    /* Content. */
    struct spvsx_cell_style **cell_style;
    size_t n_cell_style;
};

extern struct spvxml_node_class spvsx_cell_format_properties_class;

bool spvsx_parse_cell_format_properties (struct spvxml_context *, xmlNode *input, struct spvsx_cell_format_properties **);
void spvsx_free_cell_format_properties (struct spvsx_cell_format_properties *);
bool spvsx_is_cell_format_properties (const struct spvxml_node *);
struct spvsx_cell_format_properties *spvsx_cast_cell_format_properties (const struct spvxml_node *);

struct spvsx_cell_style {
    struct spvxml_node node_;

    /* Attributes. */
    int alternating_color;         /* -1 if not present. */
    int alternating_text_color;    /* -1 if not present. */

    /* Content. */
    struct spvsx_style *style; /* Always nonnull. */
};

extern struct spvxml_node_class spvsx_cell_style_class;

bool spvsx_parse_cell_style (struct spvxml_context *, xmlNode *input, struct spvsx_cell_style **);
void spvsx_free_cell_style (struct spvsx_cell_style *);
bool spvsx_is_cell_style (const struct spvxml_node *);
struct spvsx_cell_style *spvsx_cast_cell_style (const struct spvxml_node *);

enum spvsx_text_align {
    SPVSX_TEXT_ALIGN_CENTER = 1,
    SPVSX_TEXT_ALIGN_LEFT,
};
const char *spvsx_text_align_to_string (enum spvsx_text_align);

enum spvsx_visibility {
    SPVSX_VISIBILITY_HIDDEN = 1,
    SPVSX_VISIBILITY_VISIBLE,
};
const char *spvsx_visibility_to_string (enum spvsx_visibility);

struct spvsx_container {
    struct spvxml_node node_;

    /* Attributes. */
    bool page_break_before_present; /* True if attribute present. */
    enum spvsx_text_align text_align; /* Zero if not present. */
    enum spvsx_visibility visibility; /* Always nonzero. */
    double width;                  /* In inches.  Always present. */

    /* Content. */
    struct spvsx_label *label; /* Always nonnull. */
    struct spvxml_node **seq;
    size_t n_seq;
};

extern struct spvxml_node_class spvsx_container_class;

bool spvsx_parse_container (struct spvxml_context *, xmlNode *input, struct spvsx_container **);
void spvsx_free_container (struct spvsx_container *);
bool spvsx_is_container (const struct spvxml_node *);
struct spvsx_container *spvsx_cast_container (const struct spvxml_node *);

enum spvsx_text_type {
    SPVSX_TEXT_TYPE_LOG = 1,
    SPVSX_TEXT_TYPE_PAGE_TITLE,
    SPVSX_TEXT_TYPE_TEXT,
    SPVSX_TEXT_TYPE_TITLE,
};
const char *spvsx_text_type_to_string (enum spvsx_text_type);

struct spvsx_container_text {
    struct spvxml_node node_;

    /* Attributes. */
    char *command_name;            /* Possibly null. */
    char *creator_version;         /* Possibly null. */
    enum spvsx_text_type text_type; /* Always nonzero. */

    /* Content. */
    struct spvsx_html *html; /* Always nonnull. */
};

extern struct spvxml_node_class spvsx_container_text_class;

bool spvsx_parse_container_text (struct spvxml_context *, xmlNode *input, struct spvsx_container_text **);
void spvsx_free_container_text (struct spvsx_container_text *);
bool spvsx_is_container_text (const struct spvxml_node *);
struct spvsx_container_text *spvsx_cast_container_text (const struct spvxml_node *);

struct spvsx_csv_path {
    struct spvxml_node node_;

    /* Content. */
    char *text; /* Always nonnull. */
};

extern struct spvxml_node_class spvsx_csv_path_class;

bool spvsx_parse_csv_path (struct spvxml_context *, xmlNode *input, struct spvsx_csv_path **);
void spvsx_free_csv_path (struct spvsx_csv_path *);
bool spvsx_is_csv_path (const struct spvxml_node *);
struct spvsx_csv_path *spvsx_cast_csv_path (const struct spvxml_node *);

struct spvsx_data_path {
    struct spvxml_node node_;

    /* Content. */
    char *text; /* Always nonnull. */
};

extern struct spvxml_node_class spvsx_data_path_class;

bool spvsx_parse_data_path (struct spvxml_context *, xmlNode *input, struct spvsx_data_path **);
void spvsx_free_data_path (struct spvsx_data_path *);
bool spvsx_is_data_path (const struct spvxml_node *);
struct spvsx_data_path *spvsx_cast_data_path (const struct spvxml_node *);

enum spvsx_marker_position {
    SPVSX_MARKER_POSITION_SUBSCRIPT = 1,
    SPVSX_MARKER_POSITION_SUPERSCRIPT,
};
const char *spvsx_marker_position_to_string (enum spvsx_marker_position);

enum spvsx_number_format {
    SPVSX_NUMBER_FORMAT_ALPHABETIC = 1,
    SPVSX_NUMBER_FORMAT_NUMERIC,
};
const char *spvsx_number_format_to_string (enum spvsx_number_format);

struct spvsx_footnote_properties {
    struct spvxml_node node_;

    /* Attributes. */
    enum spvsx_marker_position marker_position; /* Zero if not present. */
    enum spvsx_number_format number_format; /* Zero if not present. */
};

extern struct spvxml_node_class spvsx_footnote_properties_class;

bool spvsx_parse_footnote_properties (struct spvxml_context *, xmlNode *input, struct spvsx_footnote_properties **);
void spvsx_free_footnote_properties (struct spvsx_footnote_properties *);
bool spvsx_is_footnote_properties (const struct spvxml_node *);
struct spvsx_footnote_properties *spvsx_cast_footnote_properties (const struct spvxml_node *);

enum spvsx_row_dimension_labels {
    SPVSX_ROW_DIMENSION_LABELS_IN_CORNER = 1,
    SPVSX_ROW_DIMENSION_LABELS_NESTED,
};
const char *spvsx_row_dimension_labels_to_string (enum spvsx_row_dimension_labels);

struct spvsx_general_properties {
    struct spvxml_node node_;

    /* Attributes. */
    int hide_empty_rows;           /* -1 if not present, otherwise 0 or 1. */
    double maximum_column_width;   /* In inches.  DBL_MAX if not present. */
    double maximum_row_width;      /* In inches.  DBL_MAX if not present. */
    double minimum_column_width;   /* In inches.  DBL_MAX if not present. */
    double minimum_row_width;      /* In inches.  DBL_MAX if not present. */
    enum spvsx_row_dimension_labels row_dimension_labels; /* Zero if not present. */
};

extern struct spvxml_node_class spvsx_general_properties_class;

bool spvsx_parse_general_properties (struct spvxml_context *, xmlNode *input, struct spvsx_general_properties **);
void spvsx_free_general_properties (struct spvsx_general_properties *);
bool spvsx_is_general_properties (const struct spvxml_node *);
struct spvsx_general_properties *spvsx_cast_general_properties (const struct spvxml_node *);

struct spvsx_graph {
    struct spvxml_node node_;

    /* Attributes. */
    char *v_d_p_id;                /* Possibly null. */
    char *vi_zml_source;           /* Possibly null. */
    char *command_name;            /* Possibly null. */
    char *creator_version;         /* Possibly null. */
    char *csv_file_ids;            /* Possibly null. */
    char *csv_file_names;          /* Possibly null. */
    char *data_map_id;             /* Possibly null. */
    char *data_map_u_r_i;          /* Possibly null. */
    char *editor;                  /* Possibly null. */
    char *ref_map_id;              /* Possibly null. */
    char *ref_map_u_r_i;           /* Possibly null. */

    /* Content. */
    struct spvsx_data_path *data_path; /* Possibly null. */
    struct spvsx_path *path; /* Always nonnull. */
    struct spvsx_csv_path *csv_path; /* Possibly null. */
};

extern struct spvxml_node_class spvsx_graph_class;

bool spvsx_parse_graph (struct spvxml_context *, xmlNode *input, struct spvsx_graph **);
void spvsx_free_graph (struct spvsx_graph *);
bool spvsx_is_graph (const struct spvxml_node *);
struct spvsx_graph *spvsx_cast_graph (const struct spvxml_node *);

struct spvsx_heading {
    struct spvxml_node node_;

    /* Attributes. */
    char *command_name;            /* Possibly null. */
    char *creator_version;         /* Possibly null. */
    bool heading_visibility_present; /* True if attribute present. */
    char *locale;                  /* Possibly null. */
    char *olang;                   /* Possibly null. */

    /* Content. */
    struct spvsx_label *label; /* Always nonnull. */
    struct spvxml_node **seq;
    size_t n_seq;
};

extern struct spvxml_node_class spvsx_heading_class;

bool spvsx_parse_heading (struct spvxml_context *, xmlNode *input, struct spvsx_heading **);
void spvsx_free_heading (struct spvsx_heading *);
bool spvsx_is_heading (const struct spvxml_node *);
struct spvsx_heading *spvsx_cast_heading (const struct spvxml_node *);

struct spvsx_html {
    struct spvxml_node node_;

    /* Content. */
    char *text; /* Always nonnull. */
};

extern struct spvxml_node_class spvsx_html_class;

bool spvsx_parse_html (struct spvxml_context *, xmlNode *input, struct spvsx_html **);
void spvsx_free_html (struct spvsx_html *);
bool spvsx_is_html (const struct spvxml_node *);
struct spvsx_html *spvsx_cast_html (const struct spvxml_node *);

struct spvsx_image {
    struct spvxml_node node_;

    /* Attributes. */
    char *v_d_p_id;                /* Always nonnull. */
    char *command_name;            /* Always nonnull. */

    /* Content. */
    struct spvsx_data_path *data_path; /* Always nonnull. */
};

extern struct spvxml_node_class spvsx_image_class;

bool spvsx_parse_image (struct spvxml_context *, xmlNode *input, struct spvsx_image **);
void spvsx_free_image (struct spvsx_image *);
bool spvsx_is_image (const struct spvxml_node *);
struct spvsx_image *spvsx_cast_image (const struct spvxml_node *);

struct spvsx_label {
    struct spvxml_node node_;

    /* Content. */
    char *text; /* Always nonnull. */
};

extern struct spvxml_node_class spvsx_label_class;

bool spvsx_parse_label (struct spvxml_context *, xmlNode *input, struct spvsx_label **);
void spvsx_free_label (struct spvsx_label *);
bool spvsx_is_label (const struct spvxml_node *);
struct spvsx_label *spvsx_cast_label (const struct spvxml_node *);

struct spvsx_model {
    struct spvxml_node node_;

    /* Attributes. */
    char *p_m_m_l_container_id;    /* Possibly null. */
    char *p_m_m_l_id;              /* Always nonnull. */
    char *stat_x_m_l_container_id; /* Always nonnull. */
    char *v_d_p_id;                /* Always nonnull. */
    char *auxiliary_view_name;     /* Always nonnull. */
    char *command_name;            /* Always nonnull. */
    char *creator_version;         /* Always nonnull. */
    char *main_view_name;          /* Always nonnull. */

    /* Content. */
    struct spvsx_vi_zml *vi_zml; /* Possibly null. */
    struct spvsx_data_path *data_path; /* Possibly null. */
    struct spvsx_path *path; /* Always nonnull. */
    struct spvsx_pmml_container_path *pmml_container_path; /* Always nonnull. */
    struct spvsx_stats_container_path *stats_container_path; /* Always nonnull. */
};

extern struct spvxml_node_class spvsx_model_class;

bool spvsx_parse_model (struct spvxml_context *, xmlNode *input, struct spvsx_model **);
void spvsx_free_model (struct spvsx_model *);
bool spvsx_is_model (const struct spvxml_node *);
struct spvsx_model *spvsx_cast_model (const struct spvxml_node *);

struct spvsx_object {
    struct spvxml_node node_;

    /* Attributes. */
    char *type;                    /* Always nonnull. */
    char *uri;                     /* Always nonnull. */
};

extern struct spvxml_node_class spvsx_object_class;

bool spvsx_parse_object (struct spvxml_context *, xmlNode *input, struct spvsx_object **);
void spvsx_free_object (struct spvsx_object *);
bool spvsx_is_object (const struct spvxml_node *);
struct spvsx_object *spvsx_cast_object (const struct spvxml_node *);

struct spvsx_page_footer {
    struct spvxml_node node_;

    /* Content. */
    struct spvsx_page_paragraph *page_paragraph; /* Possibly null. */
};

extern struct spvxml_node_class spvsx_page_footer_class;

bool spvsx_parse_page_footer (struct spvxml_context *, xmlNode *input, struct spvsx_page_footer **);
void spvsx_free_page_footer (struct spvsx_page_footer *);
bool spvsx_is_page_footer (const struct spvxml_node *);
struct spvsx_page_footer *spvsx_cast_page_footer (const struct spvxml_node *);

struct spvsx_page_header {
    struct spvxml_node node_;

    /* Content. */
    struct spvsx_page_paragraph *page_paragraph; /* Possibly null. */
};

extern struct spvxml_node_class spvsx_page_header_class;

bool spvsx_parse_page_header (struct spvxml_context *, xmlNode *input, struct spvsx_page_header **);
void spvsx_free_page_header (struct spvsx_page_header *);
bool spvsx_is_page_header (const struct spvxml_node *);
struct spvsx_page_header *spvsx_cast_page_header (const struct spvxml_node *);

struct spvsx_page_paragraph {
    struct spvxml_node node_;

    /* Content. */
    struct spvsx_page_paragraph_text *page_paragraph_text; /* Always nonnull. */
};

extern struct spvxml_node_class spvsx_page_paragraph_class;

bool spvsx_parse_page_paragraph (struct spvxml_context *, xmlNode *input, struct spvsx_page_paragraph **);
void spvsx_free_page_paragraph (struct spvsx_page_paragraph *);
bool spvsx_is_page_paragraph (const struct spvxml_node *);
struct spvsx_page_paragraph *spvsx_cast_page_paragraph (const struct spvxml_node *);

enum spvsx_type {
    SPVSX_TYPE_TEXT = 1,
    SPVSX_TYPE_TITLE,
};
const char *spvsx_type_to_string (enum spvsx_type);

struct spvsx_page_paragraph_text {
    struct spvxml_node node_;

    /* Attributes. */
    enum spvsx_type type;          /* Always nonzero. */

    /* Content. */
    char *text; /* Always nonnull. */
};

extern struct spvxml_node_class spvsx_page_paragraph_text_class;

bool spvsx_parse_page_paragraph_text (struct spvxml_context *, xmlNode *input, struct spvsx_page_paragraph_text **);
void spvsx_free_page_paragraph_text (struct spvsx_page_paragraph_text *);
bool spvsx_is_page_paragraph_text (const struct spvxml_node *);
struct spvsx_page_paragraph_text *spvsx_cast_page_paragraph_text (const struct spvxml_node *);

enum spvsx_chart_size {
    SPVSX_CHART_SIZE_O_T_H_E_R = 1,
    SPVSX_CHART_SIZE_AS_IS,
    SPVSX_CHART_SIZE_FULL_HEIGHT,
    SPVSX_CHART_SIZE_HALF_HEIGHT,
    SPVSX_CHART_SIZE_QUARTER_HEIGHT,
};
const char *spvsx_chart_size_to_string (enum spvsx_chart_size);

struct spvsx_page_setup {
    struct spvxml_node node_;

    /* Attributes. */
    enum spvsx_chart_size chart_size; /* Zero if not present. */
    int initial_page_number;       /* INT_MIN if not present. */
    double margin_bottom;          /* In inches.  DBL_MAX if not present. */
    double margin_left;            /* In inches.  DBL_MAX if not present. */
    double margin_right;           /* In inches.  DBL_MAX if not present. */
    double margin_top;             /* In inches.  DBL_MAX if not present. */
    double paper_height;           /* In inches.  DBL_MAX if not present. */
    double paper_width;            /* In inches.  DBL_MAX if not present. */
    char *reference_orientation;   /* Possibly null. */
    double space_after;            /* In inches.  DBL_MAX if not present. */

    /* Content. */
    struct spvsx_page_header *page_header; /* Always nonnull. */
    struct spvsx_page_footer *page_footer; /* Always nonnull. */
};

extern struct spvxml_node_class spvsx_page_setup_class;

bool spvsx_parse_page_setup (struct spvxml_context *, xmlNode *input, struct spvsx_page_setup **);
void spvsx_free_page_setup (struct spvsx_page_setup *);
bool spvsx_is_page_setup (const struct spvxml_node *);
struct spvsx_page_setup *spvsx_cast_page_setup (const struct spvxml_node *);

struct spvsx_path {
    struct spvxml_node node_;

    /* Content. */
    char *text; /* Always nonnull. */
};

extern struct spvxml_node_class spvsx_path_class;

bool spvsx_parse_path (struct spvxml_context *, xmlNode *input, struct spvsx_path **);
void spvsx_free_path (struct spvsx_path *);
bool spvsx_is_path (const struct spvxml_node *);
struct spvsx_path *spvsx_cast_path (const struct spvxml_node *);

struct spvsx_pmml_container_path {
    struct spvxml_node node_;

    /* Content. */
    char *text; /* Always nonnull. */
};

extern struct spvxml_node_class spvsx_pmml_container_path_class;

bool spvsx_parse_pmml_container_path (struct spvxml_context *, xmlNode *input, struct spvsx_pmml_container_path **);
void spvsx_free_pmml_container_path (struct spvsx_pmml_container_path *);
bool spvsx_is_pmml_container_path (const struct spvxml_node *);
struct spvsx_pmml_container_path *spvsx_cast_pmml_container_path (const struct spvxml_node *);

struct spvsx_printing_properties {
    struct spvxml_node node_;

    /* Attributes. */
    char *continuation_text;       /* Possibly null. */
    int continuation_text_at_bottom; /* -1 if not present, otherwise 0 or 1. */
    int continuation_text_at_top;  /* -1 if not present, otherwise 0 or 1. */
    int print_all_layers;          /* -1 if not present, otherwise 0 or 1. */
    int print_each_layer_on_separate_page; /* -1 if not present, otherwise 0 or 1. */
    int rescale_long_table_to_fit_page; /* -1 if not present, otherwise 0 or 1. */
    int rescale_wide_table_to_fit_page; /* -1 if not present, otherwise 0 or 1. */
    int window_orphan_lines;       /* INT_MIN if not present. */
};

extern struct spvxml_node_class spvsx_printing_properties_class;

bool spvsx_parse_printing_properties (struct spvxml_context *, xmlNode *input, struct spvsx_printing_properties **);
void spvsx_free_printing_properties (struct spvsx_printing_properties *);
bool spvsx_is_printing_properties (const struct spvxml_node *);
struct spvsx_printing_properties *spvsx_cast_printing_properties (const struct spvxml_node *);

struct spvsx_root_heading {
    struct spvxml_node node_;

    /* Attributes. */
    char *creation_date_time;      /* Possibly null. */
    char *creator;                 /* Possibly null. */
    char *creator_version;         /* Possibly null. */
    int lock_reader;               /* -1 if not present, otherwise 0 or 1. */
    char *schema_location;         /* Possibly null. */

    /* Content. */
    struct spvsx_label *label; /* Always nonnull. */
    struct spvsx_page_setup *page_setup; /* Possibly null. */
    struct spvxml_node **seq;
    size_t n_seq;
};

extern struct spvxml_node_class spvsx_root_heading_class;

bool spvsx_parse_root_heading (struct spvxml_context *, xmlNode *input, struct spvsx_root_heading **);
void spvsx_free_root_heading (struct spvsx_root_heading *);
bool spvsx_is_root_heading (const struct spvxml_node *);
struct spvsx_root_heading *spvsx_cast_root_heading (const struct spvxml_node *);

struct spvsx_stats_container_path {
    struct spvxml_node node_;

    /* Content. */
    char *text; /* Always nonnull. */
};

extern struct spvxml_node_class spvsx_stats_container_path_class;

bool spvsx_parse_stats_container_path (struct spvxml_context *, xmlNode *input, struct spvsx_stats_container_path **);
void spvsx_free_stats_container_path (struct spvsx_stats_container_path *);
bool spvsx_is_stats_container_path (const struct spvxml_node *);
struct spvsx_stats_container_path *spvsx_cast_stats_container_path (const struct spvxml_node *);

enum spvsx_font_style {
    SPVSX_FONT_STYLE_ITALIC = 1,
    SPVSX_FONT_STYLE_REGULAR,
};
const char *spvsx_font_style_to_string (enum spvsx_font_style);

enum spvsx_font_weight {
    SPVSX_FONT_WEIGHT_BOLD = 1,
    SPVSX_FONT_WEIGHT_REGULAR,
};
const char *spvsx_font_weight_to_string (enum spvsx_font_weight);

enum spvsx_label_location_vertical {
    SPVSX_LABEL_LOCATION_VERTICAL_CENTER = 1,
    SPVSX_LABEL_LOCATION_VERTICAL_NEGATIVE,
    SPVSX_LABEL_LOCATION_VERTICAL_POSITIVE,
};
const char *spvsx_label_location_vertical_to_string (enum spvsx_label_location_vertical);

enum spvsx_text_alignment {
    SPVSX_TEXT_ALIGNMENT_CENTER = 1,
    SPVSX_TEXT_ALIGNMENT_DECIMAL,
    SPVSX_TEXT_ALIGNMENT_LEFT,
    SPVSX_TEXT_ALIGNMENT_MIXED,
    SPVSX_TEXT_ALIGNMENT_RIGHT,
};
const char *spvsx_text_alignment_to_string (enum spvsx_text_alignment);

struct spvsx_style {
    struct spvxml_node node_;

    /* Attributes. */
    int color;                     /* -1 if not present. */
    int color2;                    /* -1 if not present. */
    double decimal_offset;         /* In inches.  DBL_MAX if not present. */
    char *font_family;             /* Possibly null. */
    char *font_size;               /* Possibly null. */
    enum spvsx_font_style font_style; /* Zero if not present. */
    enum spvsx_font_weight font_weight; /* Zero if not present. */
    enum spvsx_label_location_vertical label_location_vertical; /* Zero if not present. */
    double margin_bottom;          /* In inches.  DBL_MAX if not present. */
    double margin_left;            /* In inches.  DBL_MAX if not present. */
    double margin_right;           /* In inches.  DBL_MAX if not present. */
    double margin_top;             /* In inches.  DBL_MAX if not present. */
    enum spvsx_text_alignment text_alignment; /* Zero if not present. */
};

extern struct spvxml_node_class spvsx_style_class;

bool spvsx_parse_style (struct spvxml_context *, xmlNode *input, struct spvsx_style **);
void spvsx_free_style (struct spvsx_style *);
bool spvsx_is_style (const struct spvxml_node *);
struct spvsx_style *spvsx_cast_style (const struct spvxml_node *);

enum spvsx_table_type {
    SPVSX_TABLE_TYPE_NOTE = 1,
    SPVSX_TABLE_TYPE_TABLE,
    SPVSX_TABLE_TYPE_WARNING,
};
const char *spvsx_table_type_to_string (enum spvsx_table_type);

struct spvsx_table {
    struct spvxml_node node_;

    /* Attributes. */
    char *v_d_p_id;                /* Possibly null. */
    char *vi_zml_source;           /* Possibly null. */
    int active_page_id;            /* INT_MIN if not present. */
    char *command_name;            /* Always nonnull. */
    char *creator_version;         /* Possibly null. */
    int display_filtering;         /* -1 if not present, otherwise 0 or 1. */
    int max_num_cells;             /* INT_MIN if not present. */
    int orphan_tolerance;          /* INT_MIN if not present. */
    int row_break_number;          /* INT_MIN if not present. */
    char *sub_type;                /* Always nonnull. */
    char *table_id;                /* Always nonnull. */
    char *table_look_id;           /* Possibly null. */
    enum spvsx_table_type table_type; /* Always nonzero. */

    /* Content. */
    struct spvsx_table_properties *table_properties; /* Possibly null. */
    struct spvsx_table_structure *table_structure; /* Always nonnull. */
};

extern struct spvxml_node_class spvsx_table_class;

bool spvsx_parse_table (struct spvxml_context *, xmlNode *input, struct spvsx_table **);
void spvsx_free_table (struct spvsx_table *);
bool spvsx_is_table (const struct spvxml_node *);
struct spvsx_table *spvsx_cast_table (const struct spvxml_node *);

struct spvsx_table_properties {
    struct spvxml_node node_;

    /* Content. */
    struct spvsx_general_properties *general_properties; /* Always nonnull. */
    struct spvsx_footnote_properties *footnote_properties; /* Always nonnull. */
    struct spvsx_cell_format_properties *cell_format_properties; /* Always nonnull. */
    struct spvsx_border_properties *border_properties; /* Always nonnull. */
    struct spvsx_printing_properties *printing_properties; /* Always nonnull. */
};

extern struct spvxml_node_class spvsx_table_properties_class;

bool spvsx_parse_table_properties (struct spvxml_context *, xmlNode *input, struct spvsx_table_properties **);
void spvsx_free_table_properties (struct spvsx_table_properties *);
bool spvsx_is_table_properties (const struct spvxml_node *);
struct spvsx_table_properties *spvsx_cast_table_properties (const struct spvxml_node *);

struct spvsx_table_structure {
    struct spvxml_node node_;

    /* Content. */
    struct spvsx_path *path; /* Possibly null. */
    struct spvsx_data_path *data_path; /* Always nonnull. */
};

extern struct spvxml_node_class spvsx_table_structure_class;

bool spvsx_parse_table_structure (struct spvxml_context *, xmlNode *input, struct spvsx_table_structure **);
void spvsx_free_table_structure (struct spvsx_table_structure *);
bool spvsx_is_table_structure (const struct spvxml_node *);
struct spvsx_table_structure *spvsx_cast_table_structure (const struct spvxml_node *);

struct spvsx_tree {
    struct spvxml_node node_;

    /* Attributes. */
    char *command_name;            /* Always nonnull. */
    char *creator_version;         /* Always nonnull. */
    char *name;                    /* Always nonnull. */
    char *type;                    /* Always nonnull. */

    /* Content. */
    struct spvsx_data_path *data_path; /* Always nonnull. */
    struct spvsx_path *path; /* Always nonnull. */
};

extern struct spvxml_node_class spvsx_tree_class;

bool spvsx_parse_tree (struct spvxml_context *, xmlNode *input, struct spvsx_tree **);
void spvsx_free_tree (struct spvsx_tree *);
bool spvsx_is_tree (const struct spvxml_node *);
struct spvsx_tree *spvsx_cast_tree (const struct spvxml_node *);

#endif /* SPVSX_PARSER_H */
