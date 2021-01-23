/* Generated automatically -- do not modify!    -*- buffer-read-only: t -*- */
#ifndef SPVLB_PARSER_H
#define SPVLB_PARSER_H

#include <stddef.h>
#include <stdint.h>
#include <stdbool.h>
#include "output/spv/spvbin-helpers.h"

struct spvlb_table {
    size_t start, len;
    struct spvlb_header *header;
    struct spvlb_titles *titles;
    struct spvlb_footnotes *footnotes;
    struct spvlb_areas *areas;
    struct spvlb_borders *borders;
    struct spvlb_print_settings *ps;
    struct spvlb_table_settings *ts;
    struct spvlb_formats *formats;
    struct spvlb_dimensions *dimensions;
    struct spvlb_axes *axes;
    struct spvlb_cells *cells;
};
bool spvlb_parse_table (struct spvbin_input *, struct spvlb_table **);
void spvlb_free_table (struct spvlb_table *);
void spvlb_print_table (const char *title, int indent, const struct spvlb_table *);

struct spvlb_header {
    size_t start, len;
    uint32_t version;
    bool x0;
    bool x1;
    bool rotate_inner_column_labels;
    bool rotate_outer_row_labels;
    bool x2;
    uint32_t x3;
    uint32_t min_col_width;
    uint32_t max_col_width;
    uint32_t min_row_height;
    uint32_t max_row_height;
    uint64_t table_id;
};
bool spvlb_parse_header (struct spvbin_input *, struct spvlb_header **);
void spvlb_free_header (struct spvlb_header *);
void spvlb_print_header (const char *title, int indent, const struct spvlb_header *);

struct spvlb_titles {
    size_t start, len;
    struct spvlb_value *title;
    struct spvlb_value *subtype;
    struct spvlb_value *user_title;
    struct spvlb_value *corner_text;
    struct spvlb_value *caption;
};
bool spvlb_parse_titles (struct spvbin_input *, struct spvlb_titles **);
void spvlb_free_titles (struct spvlb_titles *);
void spvlb_print_titles (const char *title, int indent, const struct spvlb_titles *);

struct spvlb_footnotes {
    size_t start, len;
    uint32_t n_footnotes;
    struct spvlb_footnote **footnotes;
};
bool spvlb_parse_footnotes (struct spvbin_input *, struct spvlb_footnotes **);
void spvlb_free_footnotes (struct spvlb_footnotes *);
void spvlb_print_footnotes (const char *title, int indent, const struct spvlb_footnotes *);

struct spvlb_footnote {
    size_t start, len;
    struct spvlb_value *text;
    struct spvlb_value *marker;
    uint32_t show;
};
bool spvlb_parse_footnote (struct spvbin_input *, struct spvlb_footnote **);
void spvlb_free_footnote (struct spvlb_footnote *);
void spvlb_print_footnote (const char *title, int indent, const struct spvlb_footnote *);

struct spvlb_areas {
    size_t start, len;
    struct spvlb_area *areas[8];
};
bool spvlb_parse_areas (struct spvbin_input *, struct spvlb_areas **);
void spvlb_free_areas (struct spvlb_areas *);
void spvlb_print_areas (const char *title, int indent, const struct spvlb_areas *);

struct spvlb_area {
    size_t start, len;
    uint8_t index;
    char *typeface;
    double size;
    uint32_t style;
    bool underline;
    uint32_t halign;
    uint32_t valign;
    char *fg_color;
    char *bg_color;
    bool alternate;
    char *alt_fg_color;
    char *alt_bg_color;
    uint32_t left_margin;
    uint32_t right_margin;
    uint32_t top_margin;
    uint32_t bottom_margin;
};
bool spvlb_parse_area (struct spvbin_input *, struct spvlb_area **);
void spvlb_free_area (struct spvlb_area *);
void spvlb_print_area (const char *title, int indent, const struct spvlb_area *);

struct spvlb_borders {
    size_t start, len;
    uint32_t n_borders;
    struct spvlb_border **borders;
    bool show_grid_lines;
};
bool spvlb_parse_borders (struct spvbin_input *, struct spvlb_borders **);
void spvlb_free_borders (struct spvlb_borders *);
void spvlb_print_borders (const char *title, int indent, const struct spvlb_borders *);

struct spvlb_border {
    size_t start, len;
    uint32_t border_type;
    uint32_t stroke_type;
    uint32_t color;
};
bool spvlb_parse_border (struct spvbin_input *, struct spvlb_border **);
void spvlb_free_border (struct spvlb_border *);
void spvlb_print_border (const char *title, int indent, const struct spvlb_border *);

struct spvlb_print_settings {
    size_t start, len;
    bool all_layers;
    bool paginate_layers;
    bool fit_width;
    bool fit_length;
    bool top_continuation;
    bool bottom_continuation;
    uint32_t n_orphan_lines;
    char *continuation_string;
};
bool spvlb_parse_print_settings (struct spvbin_input *, struct spvlb_print_settings **);
void spvlb_free_print_settings (struct spvlb_print_settings *);
void spvlb_print_print_settings (const char *title, int indent, const struct spvlb_print_settings *);

struct spvlb_table_settings {
    size_t start, len;
    uint32_t x5;
    uint32_t current_layer;
    bool omit_empty;
    bool show_row_labels_in_corner;
    bool show_alphabetic_markers;
    bool footnote_marker_superscripts;
    uint8_t x6;
    struct spvlb_breakpoints *row_breaks;
    struct spvlb_breakpoints *col_breaks;
    struct spvlb_keeps *row_keeps;
    struct spvlb_keeps *col_keeps;
    struct spvlb_point_keeps *row_point_keeps;
    struct spvlb_point_keeps *col_point_keeps;
    char *notes;
    char *table_look;
};
bool spvlb_parse_table_settings (struct spvbin_input *, struct spvlb_table_settings **);
void spvlb_free_table_settings (struct spvlb_table_settings *);
void spvlb_print_table_settings (const char *title, int indent, const struct spvlb_table_settings *);

struct spvlb_breakpoints {
    size_t start, len;
    uint32_t n_breaks;
    uint32_t *breaks;
};
bool spvlb_parse_breakpoints (struct spvbin_input *, struct spvlb_breakpoints **);
void spvlb_free_breakpoints (struct spvlb_breakpoints *);
void spvlb_print_breakpoints (const char *title, int indent, const struct spvlb_breakpoints *);

struct spvlb_keeps {
    size_t start, len;
    uint32_t n_keeps;
    struct spvlb_keep **keeps;
};
bool spvlb_parse_keeps (struct spvbin_input *, struct spvlb_keeps **);
void spvlb_free_keeps (struct spvlb_keeps *);
void spvlb_print_keeps (const char *title, int indent, const struct spvlb_keeps *);

struct spvlb_keep {
    size_t start, len;
    uint32_t offset;
    uint32_t n;
};
bool spvlb_parse_keep (struct spvbin_input *, struct spvlb_keep **);
void spvlb_free_keep (struct spvlb_keep *);
void spvlb_print_keep (const char *title, int indent, const struct spvlb_keep *);

struct spvlb_point_keeps {
    size_t start, len;
    uint32_t n_point_keeps;
    struct spvlb_point_keep **point_keeps;
};
bool spvlb_parse_point_keeps (struct spvbin_input *, struct spvlb_point_keeps **);
void spvlb_free_point_keeps (struct spvlb_point_keeps *);
void spvlb_print_point_keeps (const char *title, int indent, const struct spvlb_point_keeps *);

struct spvlb_point_keep {
    size_t start, len;
    uint32_t offset;
};
bool spvlb_parse_point_keep (struct spvbin_input *, struct spvlb_point_keep **);
void spvlb_free_point_keep (struct spvlb_point_keep *);
void spvlb_print_point_keep (const char *title, int indent, const struct spvlb_point_keep *);

struct spvlb_formats {
    size_t start, len;
    uint32_t n_widths;
    uint32_t *widths;
    char *locale;
    uint32_t current_layer;
    bool x7;
    bool x8;
    bool x9;
    struct spvlb_y0 *y0;
    struct spvlb_custom_currency *custom_currency;
    struct spvlb_x0 *x0;
    struct spvlb_x1 *x1;
    struct spvlb_x2 *x2;
    struct spvlb_x3 *x3;
};
bool spvlb_parse_formats (struct spvbin_input *, struct spvlb_formats **);
void spvlb_free_formats (struct spvlb_formats *);
void spvlb_print_formats (const char *title, int indent, const struct spvlb_formats *);

struct spvlb_y0 {
    size_t start, len;
    uint32_t epoch;
    uint8_t decimal;
    uint8_t grouping;
};
bool spvlb_parse_y0 (struct spvbin_input *, struct spvlb_y0 **);
void spvlb_free_y0 (struct spvlb_y0 *);
void spvlb_print_y0 (const char *title, int indent, const struct spvlb_y0 *);

struct spvlb_custom_currency {
    size_t start, len;
    uint32_t n_ccs;
    char **ccs;
};
bool spvlb_parse_custom_currency (struct spvbin_input *, struct spvlb_custom_currency **);
void spvlb_free_custom_currency (struct spvlb_custom_currency *);
void spvlb_print_custom_currency (const char *title, int indent, const struct spvlb_custom_currency *);

struct spvlb_x0 {
    size_t start, len;
    struct spvlb_y1 *y1;
    struct spvlb_y2 *y2;
};
bool spvlb_parse_x0 (struct spvbin_input *, struct spvlb_x0 **);
void spvlb_free_x0 (struct spvlb_x0 *);
void spvlb_print_x0 (const char *title, int indent, const struct spvlb_x0 *);

struct spvlb_y1 {
    size_t start, len;
    char *command;
    char *command_local;
    char *language;
    char *charset;
    char *locale;
    bool x10;
    bool x11;
    bool x12;
    bool x13;
    struct spvlb_y0 *y0;
};
bool spvlb_parse_y1 (struct spvbin_input *, struct spvlb_y1 **);
void spvlb_free_y1 (struct spvlb_y1 *);
void spvlb_print_y1 (const char *title, int indent, const struct spvlb_y1 *);

struct spvlb_y2 {
    size_t start, len;
    struct spvlb_custom_currency *custom_currency;
    uint8_t missing;
    bool x17;
};
bool spvlb_parse_y2 (struct spvbin_input *, struct spvlb_y2 **);
void spvlb_free_y2 (struct spvlb_y2 *);
void spvlb_print_y2 (const char *title, int indent, const struct spvlb_y2 *);

struct spvlb_x1 {
    size_t start, len;
    bool x14;
    uint8_t x15;
    bool x16;
    uint8_t lang;
    uint8_t show_variables;
    uint8_t show_values;
    uint32_t x18;
    uint32_t x19;
    bool x20;
    bool show_caption;
};
bool spvlb_parse_x1 (struct spvbin_input *, struct spvlb_x1 **);
void spvlb_free_x1 (struct spvlb_x1 *);
void spvlb_print_x1 (const char *title, int indent, const struct spvlb_x1 *);

struct spvlb_x2 {
    size_t start, len;
    uint32_t n_row_heights;
    uint32_t *row_heights;
    uint32_t n_style_map;
    struct spvlb_style_map **style_map;
    uint32_t n_styles;
    struct spvlb_style_pair **styles;
};
bool spvlb_parse_x2 (struct spvbin_input *, struct spvlb_x2 **);
void spvlb_free_x2 (struct spvlb_x2 *);
void spvlb_print_x2 (const char *title, int indent, const struct spvlb_x2 *);

struct spvlb_style_map {
    size_t start, len;
    uint64_t cell_index;
    uint16_t style_index;
};
bool spvlb_parse_style_map (struct spvbin_input *, struct spvlb_style_map **);
void spvlb_free_style_map (struct spvlb_style_map *);
void spvlb_print_style_map (const char *title, int indent, const struct spvlb_style_map *);

struct spvlb_x3 {
    size_t start, len;
    uint8_t x21;
    struct spvlb_y1 *y1;
    double small;
    char *dataset;
    char *datafile;
    uint32_t date;
    struct spvlb_y2 *y2;
    uint32_t x22;
};
bool spvlb_parse_x3 (struct spvbin_input *, struct spvlb_x3 **);
void spvlb_free_x3 (struct spvlb_x3 *);
void spvlb_print_x3 (const char *title, int indent, const struct spvlb_x3 *);

struct spvlb_dimensions {
    size_t start, len;
    uint32_t n_dims;
    struct spvlb_dimension **dims;
};
bool spvlb_parse_dimensions (struct spvbin_input *, struct spvlb_dimensions **);
void spvlb_free_dimensions (struct spvlb_dimensions *);
void spvlb_print_dimensions (const char *title, int indent, const struct spvlb_dimensions *);

struct spvlb_dimension {
    size_t start, len;
    struct spvlb_value *name;
    struct spvlb_dim_properties *props;
    uint32_t n_categories;
    struct spvlb_category **categories;
};
bool spvlb_parse_dimension (struct spvbin_input *, struct spvlb_dimension **);
void spvlb_free_dimension (struct spvlb_dimension *);
void spvlb_print_dimension (const char *title, int indent, const struct spvlb_dimension *);

struct spvlb_dim_properties {
    size_t start, len;
    uint8_t x1;
    uint8_t x2;
    uint32_t x3;
    bool hide_dim_label;
    bool hide_all_labels;
    uint32_t dim_index;
};
bool spvlb_parse_dim_properties (struct spvbin_input *, struct spvlb_dim_properties **);
void spvlb_free_dim_properties (struct spvlb_dim_properties *);
void spvlb_print_dim_properties (const char *title, int indent, const struct spvlb_dim_properties *);

struct spvlb_category {
    size_t start, len;
    struct spvlb_value *name;
    struct spvlb_leaf *leaf;
    struct spvlb_group *group;
};
bool spvlb_parse_category (struct spvbin_input *, struct spvlb_category **);
void spvlb_free_category (struct spvlb_category *);
void spvlb_print_category (const char *title, int indent, const struct spvlb_category *);

struct spvlb_leaf {
    size_t start, len;
    uint32_t leaf_index;
};
bool spvlb_parse_leaf (struct spvbin_input *, struct spvlb_leaf **);
void spvlb_free_leaf (struct spvlb_leaf *);
void spvlb_print_leaf (const char *title, int indent, const struct spvlb_leaf *);

struct spvlb_group {
    size_t start, len;
    bool merge;
    uint32_t x23;
    uint32_t n_subcategories;
    struct spvlb_category **subcategories;
};
bool spvlb_parse_group (struct spvbin_input *, struct spvlb_group **);
void spvlb_free_group (struct spvlb_group *);
void spvlb_print_group (const char *title, int indent, const struct spvlb_group *);

struct spvlb_axes {
    size_t start, len;
    uint32_t n_layers;
    uint32_t n_rows;
    uint32_t n_columns;
    uint32_t *layers;
    uint32_t *rows;
    uint32_t *columns;
};
bool spvlb_parse_axes (struct spvbin_input *, struct spvlb_axes **);
void spvlb_free_axes (struct spvlb_axes *);
void spvlb_print_axes (const char *title, int indent, const struct spvlb_axes *);

struct spvlb_cells {
    size_t start, len;
    uint32_t n_cells;
    struct spvlb_cell **cells;
};
bool spvlb_parse_cells (struct spvbin_input *, struct spvlb_cells **);
void spvlb_free_cells (struct spvlb_cells *);
void spvlb_print_cells (const char *title, int indent, const struct spvlb_cells *);

struct spvlb_cell {
    size_t start, len;
    uint64_t index;
    struct spvlb_value *value;
};
bool spvlb_parse_cell (struct spvbin_input *, struct spvlb_cell **);
void spvlb_free_cell (struct spvlb_cell *);
void spvlb_print_cell (const char *title, int indent, const struct spvlb_cell *);

struct spvlb_value {
    size_t start, len;
    int type;
    union {
        struct {
            struct spvlb_value_mod *value_mod;
            uint32_t format;
            double x;
        } type_01;
        struct {
            struct spvlb_value_mod *value_mod;
            uint32_t format;
            double x;
            char *var_name;
            char *value_label;
            uint8_t show;
        } type_02;
        struct {
            char *local;
            struct spvlb_value_mod *value_mod;
            char *id;
            char *c;
            bool fixed;
        } type_03;
        struct {
            struct spvlb_value_mod *value_mod;
            uint32_t format;
            char *value_label;
            char *var_name;
            uint8_t show;
            char *s;
        } type_04;
        struct {
            struct spvlb_value_mod *value_mod;
            char *var_name;
            char *var_label;
            uint8_t show;
        } type_05;
        struct {
            char *local;
            struct spvlb_value_mod *value_mod;
            char *id;
            char *c;
        } type_06;
        struct {
            struct spvlb_value_mod *value_mod;
            char *template;
            uint32_t n_args;
            struct spvlb_argument **args;
        } type_else;
    };
};
bool spvlb_parse_value (struct spvbin_input *, struct spvlb_value **);
void spvlb_free_value (struct spvlb_value *);
void spvlb_print_value (const char *title, int indent, const struct spvlb_value *);

struct spvlb_argument {
    size_t start, len;
    struct spvlb_value *value;
    uint32_t n_values;
    struct spvlb_value **values;
};
bool spvlb_parse_argument (struct spvbin_input *, struct spvlb_argument **);
void spvlb_free_argument (struct spvlb_argument *);
void spvlb_print_argument (const char *title, int indent, const struct spvlb_argument *);

struct spvlb_value_mod {
    size_t start, len;
    uint32_t n_refs;
    uint16_t *refs;
    uint32_t n_subscripts;
    char **subscripts;
    struct spvlb_template_string *template_string;
    struct spvlb_style_pair *style_pair;
};
bool spvlb_parse_value_mod (struct spvbin_input *, struct spvlb_value_mod **);
void spvlb_free_value_mod (struct spvlb_value_mod *);
void spvlb_print_value_mod (const char *title, int indent, const struct spvlb_value_mod *);

struct spvlb_template_string {
    size_t start, len;
    char *id;
};
bool spvlb_parse_template_string (struct spvbin_input *, struct spvlb_template_string **);
void spvlb_free_template_string (struct spvlb_template_string *);
void spvlb_print_template_string (const char *title, int indent, const struct spvlb_template_string *);

struct spvlb_style_pair {
    size_t start, len;
    struct spvlb_font_style *font_style;
    struct spvlb_cell_style *cell_style;
};
bool spvlb_parse_style_pair (struct spvbin_input *, struct spvlb_style_pair **);
void spvlb_free_style_pair (struct spvlb_style_pair *);
void spvlb_print_style_pair (const char *title, int indent, const struct spvlb_style_pair *);

struct spvlb_font_style {
    size_t start, len;
    bool bold;
    bool italic;
    bool underline;
    bool show;
    char *fg_color;
    char *bg_color;
    char *typeface;
    uint8_t size;
};
bool spvlb_parse_font_style (struct spvbin_input *, struct spvlb_font_style **);
void spvlb_free_font_style (struct spvlb_font_style *);
void spvlb_print_font_style (const char *title, int indent, const struct spvlb_font_style *);

struct spvlb_cell_style {
    size_t start, len;
    uint32_t halign;
    uint32_t valign;
    double decimal_offset;
    uint16_t left_margin;
    uint16_t right_margin;
    uint16_t top_margin;
    uint16_t bottom_margin;
};
bool spvlb_parse_cell_style (struct spvbin_input *, struct spvlb_cell_style **);
void spvlb_free_cell_style (struct spvlb_cell_style *);
void spvlb_print_cell_style (const char *title, int indent, const struct spvlb_cell_style *);

#endif /* SPVLB_PARSER_H */
