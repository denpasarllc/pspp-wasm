/* Generated automatically -- do not modify!    -*- buffer-read-only: t -*- */
#ifndef SPVDX_PARSER_H
#define SPVDX_PARSER_H

#include <stddef.h>
#include <stdint.h>
#include <stdbool.h>
#include "output/spv/spvxml-helpers.h"

enum spvdx_position {
    SPVDX_POSITION_SUBSCRIPT = 1,
    SPVDX_POSITION_SUPERSCRIPT,
};
const char *spvdx_position_to_string (enum spvdx_position);

struct spvdx_affix {
    struct spvxml_node node_;

    /* Attributes. */
    int defines_reference;         /* Always present. */
    enum spvdx_position position;  /* Always nonzero. */
    bool suffix;
    char *value;                   /* Always nonnull. */
};

extern struct spvxml_node_class spvdx_affix_class;

bool spvdx_parse_affix (struct spvxml_context *, xmlNode *input, struct spvdx_affix **);
void spvdx_free_affix (struct spvdx_affix *);
bool spvdx_is_affix (const struct spvxml_node *);
struct spvdx_affix *spvdx_cast_affix (const struct spvxml_node *);

struct spvdx_alternating {
    struct spvxml_node node_;
};

extern struct spvxml_node_class spvdx_alternating_class;

bool spvdx_parse_alternating (struct spvxml_context *, xmlNode *input, struct spvdx_alternating **);
void spvdx_free_alternating (struct spvdx_alternating *);
bool spvdx_is_alternating (const struct spvxml_node *);
struct spvdx_alternating *spvdx_cast_alternating (const struct spvxml_node *);

struct spvdx_axis {
    struct spvxml_node node_;

    /* Attributes. */
    struct spvdx_style *style;     /* Always nonnull. */

    /* Content. */
    struct spvdx_label *label; /* Possibly null. */
    struct spvdx_major_ticks *major_ticks; /* Always nonnull. */
};

extern struct spvxml_node_class spvdx_axis_class;

bool spvdx_parse_axis (struct spvxml_context *, xmlNode *input, struct spvdx_axis **);
void spvdx_free_axis (struct spvdx_axis *);
bool spvdx_is_axis (const struct spvxml_node *);
struct spvdx_axis *spvdx_cast_axis (const struct spvxml_node *);

struct spvdx_categorical_domain {
    struct spvxml_node node_;

    /* Content. */
    struct spvdx_variable_reference *variable_reference; /* Always nonnull. */
    struct spvdx_simple_sort *simple_sort; /* Always nonnull. */
};

extern struct spvxml_node_class spvdx_categorical_domain_class;

bool spvdx_parse_categorical_domain (struct spvxml_context *, xmlNode *input, struct spvdx_categorical_domain **);
void spvdx_free_categorical_domain (struct spvdx_categorical_domain *);
bool spvdx_is_categorical_domain (const struct spvxml_node *);
struct spvdx_categorical_domain *spvdx_cast_categorical_domain (const struct spvxml_node *);

struct spvdx_category_order {
    struct spvxml_node node_;

    /* Content. */
    char *text; /* Always nonnull. */
};

extern struct spvxml_node_class spvdx_category_order_class;

bool spvdx_parse_category_order (struct spvxml_context *, xmlNode *input, struct spvdx_category_order **);
void spvdx_free_category_order (struct spvdx_category_order *);
bool spvdx_is_category_order (const struct spvxml_node *);
struct spvdx_category_order *spvdx_cast_category_order (const struct spvxml_node *);

struct spvdx_container {
    struct spvxml_node node_;

    /* Attributes. */
    struct spvdx_style *style;     /* Always nonnull. */

    /* Content. */
    struct spvdx_container_extension *container_extension; /* Possibly null. */
    struct spvdx_location **location;
    size_t n_location;
    struct spvdx_label_frame **label_frame;
    size_t n_label_frame;
};

extern struct spvxml_node_class spvdx_container_class;

bool spvdx_parse_container (struct spvxml_context *, xmlNode *input, struct spvdx_container **);
void spvdx_free_container (struct spvdx_container *);
bool spvdx_is_container (const struct spvxml_node *);
struct spvdx_container *spvdx_cast_container (const struct spvxml_node *);

struct spvdx_container_extension {
    struct spvxml_node node_;
};

extern struct spvxml_node_class spvdx_container_extension_class;

bool spvdx_parse_container_extension (struct spvxml_context *, xmlNode *input, struct spvdx_container_extension **);
void spvdx_free_container_extension (struct spvdx_container_extension *);
bool spvdx_is_container_extension (const struct spvxml_node *);
struct spvdx_container_extension *spvdx_cast_container_extension (const struct spvxml_node *);

struct spvdx_coordinates {
    struct spvxml_node node_;
};

extern struct spvxml_node_class spvdx_coordinates_class;

bool spvdx_parse_coordinates (struct spvxml_context *, xmlNode *input, struct spvdx_coordinates **);
void spvdx_free_coordinates (struct spvdx_coordinates *);
bool spvdx_is_coordinates (const struct spvxml_node *);
struct spvdx_coordinates *spvdx_cast_coordinates (const struct spvxml_node *);

struct spvdx_cross {
    struct spvxml_node node_;

    /* Content. */
    struct spvxml_node **seq;
    size_t n_seq;
    struct spvxml_node **seq2;
    size_t n_seq2;
};

extern struct spvxml_node_class spvdx_cross_class;

bool spvdx_parse_cross (struct spvxml_context *, xmlNode *input, struct spvdx_cross **);
void spvdx_free_cross (struct spvdx_cross *);
bool spvdx_is_cross (const struct spvxml_node *);
struct spvdx_cross *spvdx_cast_cross (const struct spvxml_node *);

enum spvdx_day_type {
    SPVDX_DAY_TYPE_MONTH = 1,
    SPVDX_DAY_TYPE_YEAR,
};
const char *spvdx_day_type_to_string (enum spvdx_day_type);

enum spvdx_dt_base_format {
    SPVDX_DT_BASE_FORMAT_DATE = 1,
    SPVDX_DT_BASE_FORMAT_DATE_TIME,
    SPVDX_DT_BASE_FORMAT_TIME,
};
const char *spvdx_dt_base_format_to_string (enum spvdx_dt_base_format);

enum spvdx_hour_format {
    SPVDX_HOUR_FORMAT_A_M_P_M = 1,
    SPVDX_HOUR_FORMAT_A_S_12,
    SPVDX_HOUR_FORMAT_A_S_24,
};
const char *spvdx_hour_format_to_string (enum spvdx_hour_format);

enum spvdx_mdy_order {
    SPVDX_MDY_ORDER_DAY_MONTH_YEAR = 1,
    SPVDX_MDY_ORDER_MONTH_DAY_YEAR,
    SPVDX_MDY_ORDER_YEAR_MONTH_DAY,
};
const char *spvdx_mdy_order_to_string (enum spvdx_mdy_order);

enum spvdx_month_format {
    SPVDX_MONTH_FORMAT_LONG = 1,
    SPVDX_MONTH_FORMAT_NUMBER,
    SPVDX_MONTH_FORMAT_PADDED_NUMBER,
    SPVDX_MONTH_FORMAT_SHORT,
};
const char *spvdx_month_format_to_string (enum spvdx_month_format);

struct spvdx_date_time_format {
    struct spvxml_node node_;

    /* Attributes. */
    int day_of_month_padding;      /* -1 if not present, otherwise 0 or 1. */
    int day_of_week_abbreviation;  /* -1 if not present, otherwise 0 or 1. */
    int day_padding;               /* -1 if not present, otherwise 0 or 1. */
    enum spvdx_day_type day_type;  /* Zero if not present. */
    enum spvdx_dt_base_format dt_base_format; /* Always nonzero. */
    enum spvdx_hour_format hour_format; /* Zero if not present. */
    int hour_padding;              /* -1 if not present, otherwise 0 or 1. */
    enum spvdx_mdy_order mdy_order; /* Zero if not present. */
    int minute_padding;            /* -1 if not present, otherwise 0 or 1. */
    enum spvdx_month_format month_format; /* Zero if not present. */
    char *quarter_prefix;          /* Possibly null. */
    char *quarter_suffix;          /* Possibly null. */
    int second_padding;            /* -1 if not present, otherwise 0 or 1. */
    char *separator_chars;         /* Possibly null. */
    int show_day;                  /* -1 if not present, otherwise 0 or 1. */
    int show_day_of_week;          /* -1 if not present, otherwise 0 or 1. */
    int show_hour;                 /* -1 if not present, otherwise 0 or 1. */
    int show_millis;               /* -1 if not present, otherwise 0 or 1. */
    int show_minute;               /* -1 if not present, otherwise 0 or 1. */
    int show_month;                /* -1 if not present, otherwise 0 or 1. */
    int show_quarter;              /* -1 if not present, otherwise 0 or 1. */
    int show_second;               /* -1 if not present, otherwise 0 or 1. */
    int show_week;                 /* -1 if not present, otherwise 0 or 1. */
    int show_year;                 /* -1 if not present, otherwise 0 or 1. */
    int week_padding;              /* -1 if not present, otherwise 0 or 1. */
    char *week_suffix;             /* Possibly null. */
    int year_abbreviation;         /* -1 if not present, otherwise 0 or 1. */

    /* Content. */
    struct spvdx_affix **affix;
    size_t n_affix;
};

extern struct spvxml_node_class spvdx_date_time_format_class;

bool spvdx_parse_date_time_format (struct spvxml_context *, xmlNode *input, struct spvdx_date_time_format **);
void spvdx_free_date_time_format (struct spvdx_date_time_format *);
bool spvdx_is_date_time_format (const struct spvxml_node *);
struct spvdx_date_time_format *spvdx_cast_date_time_format (const struct spvxml_node *);

struct spvdx_derived_variable {
    struct spvxml_node node_;

    /* Attributes. */
    struct spvdx_source_variable *depends_on; /* Possibly null. */
    char *value;                   /* Always nonnull. */

    /* Content. */
    struct spvdx_variable_extension **variable_extension;
    size_t n_variable_extension;
    struct spvxml_node **seq;
    size_t n_seq;
    struct spvdx_value_map_entry **value_map_entry;
    size_t n_value_map_entry;
};

extern struct spvxml_node_class spvdx_derived_variable_class;

bool spvdx_parse_derived_variable (struct spvxml_context *, xmlNode *input, struct spvdx_derived_variable **);
void spvdx_free_derived_variable (struct spvdx_derived_variable *);
bool spvdx_is_derived_variable (const struct spvxml_node *);
struct spvdx_derived_variable *spvdx_cast_derived_variable (const struct spvxml_node *);

enum spvdx_name {
    SPVDX_NAME_VALUE = 1,
    SPVDX_NAME_VARIABLE,
};
const char *spvdx_name_to_string (enum spvdx_name);

struct spvdx_description {
    struct spvxml_node node_;

    /* Attributes. */
    enum spvdx_name name;          /* Always nonzero. */
};

extern struct spvxml_node_class spvdx_description_class;

bool spvdx_parse_description (struct spvxml_context *, xmlNode *input, struct spvdx_description **);
void spvdx_free_description (struct spvdx_description *);
bool spvdx_is_description (const struct spvxml_node *);
struct spvdx_description *spvdx_cast_description (const struct spvxml_node *);

struct spvdx_description_group {
    struct spvxml_node node_;

    /* Attributes. */
    char *separator;               /* Possibly null. */
    struct spvdx_faceting *target; /* Always nonnull. */

    /* Content. */
    struct spvxml_node **seq;
    size_t n_seq;
};

extern struct spvxml_node_class spvdx_description_group_class;

bool spvdx_parse_description_group (struct spvxml_context *, xmlNode *input, struct spvdx_description_group **);
void spvdx_free_description_group (struct spvdx_description_group *);
bool spvdx_is_description_group (const struct spvxml_node *);
struct spvdx_description_group *spvdx_cast_description_group (const struct spvxml_node *);

struct spvdx_elapsed_time_format {
    struct spvxml_node node_;

    /* Attributes. */
    int day_padding;               /* -1 if not present, otherwise 0 or 1. */
    enum spvdx_dt_base_format dt_base_format; /* Always nonzero. */
    int hour_padding;              /* -1 if not present, otherwise 0 or 1. */
    int minute_padding;            /* -1 if not present, otherwise 0 or 1. */
    int second_padding;            /* -1 if not present, otherwise 0 or 1. */
    int show_day;                  /* -1 if not present, otherwise 0 or 1. */
    int show_hour;                 /* -1 if not present, otherwise 0 or 1. */
    int show_millis;               /* -1 if not present, otherwise 0 or 1. */
    int show_minute;               /* -1 if not present, otherwise 0 or 1. */
    int show_second;               /* -1 if not present, otherwise 0 or 1. */
    int show_year;                 /* -1 if not present, otherwise 0 or 1. */

    /* Content. */
    struct spvdx_affix **affix;
    size_t n_affix;
};

extern struct spvxml_node_class spvdx_elapsed_time_format_class;

bool spvdx_parse_elapsed_time_format (struct spvxml_context *, xmlNode *input, struct spvdx_elapsed_time_format **);
void spvdx_free_elapsed_time_format (struct spvdx_elapsed_time_format *);
bool spvdx_is_elapsed_time_format (const struct spvxml_node *);
struct spvdx_elapsed_time_format *spvdx_cast_elapsed_time_format (const struct spvxml_node *);

struct spvdx_facet_layout {
    struct spvxml_node node_;

    /* Content. */
    struct spvdx_table_layout *table_layout; /* Always nonnull. */
    struct spvdx_set_cell_properties **scp1;
    size_t n_scp1;
    struct spvdx_facet_level **facet_level;
    size_t n_facet_level;
    struct spvdx_set_cell_properties **scp2;
    size_t n_scp2;
};

extern struct spvxml_node_class spvdx_facet_layout_class;

bool spvdx_parse_facet_layout (struct spvxml_context *, xmlNode *input, struct spvdx_facet_layout **);
void spvdx_free_facet_layout (struct spvdx_facet_layout *);
bool spvdx_is_facet_layout (const struct spvxml_node *);
struct spvdx_facet_layout *spvdx_cast_facet_layout (const struct spvxml_node *);

struct spvdx_facet_level {
    struct spvxml_node node_;

    /* Attributes. */
    double gap;                    /* In inches.  DBL_MAX if not present. */
    int level;                     /* Always present. */

    /* Content. */
    struct spvdx_axis *axis; /* Always nonnull. */
};

extern struct spvxml_node_class spvdx_facet_level_class;

bool spvdx_parse_facet_level (struct spvxml_context *, xmlNode *input, struct spvdx_facet_level **);
void spvdx_free_facet_level (struct spvdx_facet_level *);
bool spvdx_is_facet_level (const struct spvxml_node *);
struct spvdx_facet_level *spvdx_cast_facet_level (const struct spvxml_node *);

struct spvdx_faceting {
    struct spvxml_node node_;

    /* Content. */
    struct spvdx_layer **layers1;
    size_t n_layers1;
    struct spvdx_cross *cross; /* Always nonnull. */
    struct spvdx_layer **layers2;
    size_t n_layers2;
};

extern struct spvxml_node_class spvdx_faceting_class;

bool spvdx_parse_faceting (struct spvxml_context *, xmlNode *input, struct spvdx_faceting **);
void spvdx_free_faceting (struct spvdx_faceting *);
bool spvdx_is_faceting (const struct spvxml_node *);
struct spvdx_faceting *spvdx_cast_faceting (const struct spvxml_node *);

struct spvdx_footnote_mapping {
    struct spvxml_node node_;

    /* Attributes. */
    int defines_reference;         /* Always present. */
    int from;                      /* Always present. */
    char *to;                      /* Always nonnull. */
};

extern struct spvxml_node_class spvdx_footnote_mapping_class;

bool spvdx_parse_footnote_mapping (struct spvxml_context *, xmlNode *input, struct spvdx_footnote_mapping **);
void spvdx_free_footnote_mapping (struct spvdx_footnote_mapping *);
bool spvdx_is_footnote_mapping (const struct spvxml_node *);
struct spvdx_footnote_mapping *spvdx_cast_footnote_mapping (const struct spvxml_node *);

struct spvdx_footnotes {
    struct spvxml_node node_;

    /* Attributes. */
    int superscript;               /* -1 if not present, otherwise 0 or 1. */
    struct spvxml_node *variable;  /* Always nonnull. */

    /* Content. */
    struct spvdx_footnote_mapping **footnote_mapping;
    size_t n_footnote_mapping;
};

extern struct spvxml_node_class spvdx_footnotes_class;

bool spvdx_parse_footnotes (struct spvxml_context *, xmlNode *input, struct spvdx_footnotes **);
void spvdx_free_footnotes (struct spvdx_footnotes *);
bool spvdx_is_footnotes (const struct spvxml_node *);
struct spvdx_footnotes *spvdx_cast_footnotes (const struct spvxml_node *);

enum spvdx_f_base_format {
    SPVDX_F_BASE_FORMAT_DATE = 1,
    SPVDX_F_BASE_FORMAT_DATE_TIME,
    SPVDX_F_BASE_FORMAT_ELAPSED_TIME,
    SPVDX_F_BASE_FORMAT_TIME,
};
const char *spvdx_f_base_format_to_string (enum spvdx_f_base_format);

enum spvdx_scientific {
    SPVDX_SCIENTIFIC_FALSE = 1,
    SPVDX_SCIENTIFIC_ONLY_FOR_SMALL,
    SPVDX_SCIENTIFIC_TRUE,
    SPVDX_SCIENTIFIC_WHEN_NEEDED,
};
const char *spvdx_scientific_to_string (enum spvdx_scientific);

struct spvdx_format {
    struct spvxml_node node_;

    /* Attributes. */
    int day_of_month_padding;      /* -1 if not present, otherwise 0 or 1. */
    int day_of_week_abbreviation;  /* -1 if not present, otherwise 0 or 1. */
    int day_padding;               /* -1 if not present, otherwise 0 or 1. */
    enum spvdx_day_type day_type;  /* Zero if not present. */
    char *error_character;         /* Possibly null. */
    enum spvdx_f_base_format f_base_format; /* Zero if not present. */
    enum spvdx_hour_format hour_format; /* Zero if not present. */
    int hour_padding;              /* -1 if not present, otherwise 0 or 1. */
    int maximum_fraction_digits;   /* INT_MIN if not present. */
    enum spvdx_mdy_order mdy_order; /* Zero if not present. */
    int minimum_fraction_digits;   /* INT_MIN if not present. */
    int minimum_integer_digits;    /* INT_MIN if not present. */
    int minute_padding;            /* -1 if not present, otherwise 0 or 1. */
    enum spvdx_month_format month_format; /* Zero if not present. */
    int negatives_outside;         /* -1 if not present, otherwise 0 or 1. */
    char *prefix;                  /* Possibly null. */
    char *quarter_prefix;          /* Possibly null. */
    char *quarter_suffix;          /* Possibly null. */
    enum spvdx_scientific scientific; /* Zero if not present. */
    int second_padding;            /* -1 if not present, otherwise 0 or 1. */
    char *separator_chars;         /* Possibly null. */
    int show_day;                  /* -1 if not present, otherwise 0 or 1. */
    int show_day_of_week;          /* -1 if not present, otherwise 0 or 1. */
    int show_hour;                 /* -1 if not present, otherwise 0 or 1. */
    int show_millis;               /* -1 if not present, otherwise 0 or 1. */
    int show_minute;               /* -1 if not present, otherwise 0 or 1. */
    int show_month;                /* -1 if not present, otherwise 0 or 1. */
    int show_quarter;              /* -1 if not present, otherwise 0 or 1. */
    int show_second;               /* -1 if not present, otherwise 0 or 1. */
    int show_week;                 /* -1 if not present, otherwise 0 or 1. */
    int show_year;                 /* -1 if not present, otherwise 0 or 1. */
    double small;                  /* In inches.  DBL_MAX if not present. */
    char *suffix;                  /* Possibly null. */
    int try_strings_as_numbers;    /* -1 if not present, otherwise 0 or 1. */
    int use_grouping;              /* -1 if not present, otherwise 0 or 1. */
    int week_padding;              /* -1 if not present, otherwise 0 or 1. */
    char *week_suffix;             /* Possibly null. */
    int year_abbreviation;         /* -1 if not present, otherwise 0 or 1. */

    /* Content. */
    struct spvdx_relabel **relabel;
    size_t n_relabel;
    struct spvdx_affix **affix;
    size_t n_affix;
};

extern struct spvxml_node_class spvdx_format_class;

bool spvdx_parse_format (struct spvxml_context *, xmlNode *input, struct spvdx_format **);
void spvdx_free_format (struct spvdx_format *);
bool spvdx_is_format (const struct spvxml_node *);
struct spvdx_format *spvdx_cast_format (const struct spvxml_node *);

struct spvdx_format_mapping {
    struct spvxml_node node_;

    /* Attributes. */
    int from;                      /* Always present. */

    /* Content. */
    struct spvdx_format *format; /* Possibly null. */
};

extern struct spvxml_node_class spvdx_format_mapping_class;

bool spvdx_parse_format_mapping (struct spvxml_context *, xmlNode *input, struct spvdx_format_mapping **);
void spvdx_free_format_mapping (struct spvdx_format_mapping *);
bool spvdx_is_format_mapping (const struct spvxml_node *);
struct spvdx_format_mapping *spvdx_cast_format_mapping (const struct spvxml_node *);

struct spvdx_formatting {
    struct spvxml_node node_;

    /* Attributes. */
    struct spvxml_node *variable;  /* Always nonnull. */

    /* Content. */
    struct spvdx_format_mapping **format_mapping;
    size_t n_format_mapping;
};

extern struct spvxml_node_class spvdx_formatting_class;

bool spvdx_parse_formatting (struct spvxml_context *, xmlNode *input, struct spvdx_formatting **);
void spvdx_free_formatting (struct spvdx_formatting *);
bool spvdx_is_formatting (const struct spvxml_node *);
struct spvdx_formatting *spvdx_cast_formatting (const struct spvxml_node *);

struct spvdx_graph {
    struct spvxml_node node_;

    /* Attributes. */
    struct spvdx_style *cell_style; /* Always nonnull. */
    struct spvdx_style *style;     /* Always nonnull. */

    /* Content. */
    struct spvdx_location **location;
    size_t n_location;
    struct spvdx_coordinates *coordinates; /* Always nonnull. */
    struct spvdx_faceting *faceting; /* Always nonnull. */
    struct spvdx_facet_layout *facet_layout; /* Always nonnull. */
    struct spvdx_interval *interval; /* Always nonnull. */
};

extern struct spvxml_node_class spvdx_graph_class;

bool spvdx_parse_graph (struct spvxml_context *, xmlNode *input, struct spvdx_graph **);
void spvdx_free_graph (struct spvdx_graph *);
bool spvdx_is_graph (const struct spvxml_node *);
struct spvdx_graph *spvdx_cast_graph (const struct spvxml_node *);

struct spvdx_gridline {
    struct spvxml_node node_;

    /* Attributes. */
    struct spvdx_style *style;     /* Always nonnull. */
    int z_order;                   /* Always present. */
};

extern struct spvxml_node_class spvdx_gridline_class;

bool spvdx_parse_gridline (struct spvxml_context *, xmlNode *input, struct spvdx_gridline **);
void spvdx_free_gridline (struct spvdx_gridline *);
bool spvdx_is_gridline (const struct spvxml_node *);
struct spvdx_gridline *spvdx_cast_gridline (const struct spvxml_node *);

struct spvdx_intersect {
    struct spvxml_node node_;

    /* Content. */
    struct spvdx_where **where;
    size_t n_where;
    struct spvdx_intersect_where *intersect_where; /* Always nonnull. */
    struct spvdx_alternating *alternating; /* Always nonnull. */
};

extern struct spvxml_node_class spvdx_intersect_class;

bool spvdx_parse_intersect (struct spvxml_context *, xmlNode *input, struct spvdx_intersect **);
void spvdx_free_intersect (struct spvdx_intersect *);
bool spvdx_is_intersect (const struct spvxml_node *);
struct spvdx_intersect *spvdx_cast_intersect (const struct spvxml_node *);

struct spvdx_intersect_where {
    struct spvxml_node node_;

    /* Attributes. */
    struct spvxml_node *variable;  /* Always nonnull. */
    struct spvxml_node *variable2; /* Always nonnull. */
};

extern struct spvxml_node_class spvdx_intersect_where_class;

bool spvdx_parse_intersect_where (struct spvxml_context *, xmlNode *input, struct spvdx_intersect_where **);
void spvdx_free_intersect_where (struct spvdx_intersect_where *);
bool spvdx_is_intersect_where (const struct spvxml_node *);
struct spvdx_intersect_where *spvdx_cast_intersect_where (const struct spvxml_node *);

struct spvdx_interval {
    struct spvxml_node node_;

    /* Attributes. */
    struct spvdx_style *style;     /* Always nonnull. */

    /* Content. */
    struct spvdx_labeling *labeling; /* Always nonnull. */
    struct spvdx_footnotes *footnotes; /* Possibly null. */
};

extern struct spvxml_node_class spvdx_interval_class;

bool spvdx_parse_interval (struct spvxml_context *, xmlNode *input, struct spvdx_interval **);
void spvdx_free_interval (struct spvdx_interval *);
bool spvdx_is_interval (const struct spvxml_node *);
struct spvdx_interval *spvdx_cast_interval (const struct spvxml_node *);

enum spvdx_purpose {
    SPVDX_PURPOSE_FOOTNOTE = 1,
    SPVDX_PURPOSE_LAYER,
    SPVDX_PURPOSE_SUB_SUB_TITLE,
    SPVDX_PURPOSE_SUB_TITLE,
    SPVDX_PURPOSE_TITLE,
};
const char *spvdx_purpose_to_string (enum spvdx_purpose);

struct spvdx_label {
    struct spvxml_node node_;

    /* Attributes. */
    enum spvdx_purpose purpose;    /* Zero if not present. */
    struct spvdx_style *style;     /* Always nonnull. */
    struct spvdx_style *text_frame_style; /* Possibly null. */

    /* Content. */
    struct spvdx_text **text;
    size_t n_text;
    struct spvdx_description_group *description_group; /* Always nonnull. */
};

extern struct spvxml_node_class spvdx_label_class;

bool spvdx_parse_label (struct spvxml_context *, xmlNode *input, struct spvdx_label **);
void spvdx_free_label (struct spvdx_label *);
bool spvdx_is_label (const struct spvxml_node *);
struct spvdx_label *spvdx_cast_label (const struct spvxml_node *);

struct spvdx_label_frame {
    struct spvxml_node node_;

    /* Attributes. */
    struct spvdx_style *style;     /* Always nonnull. */

    /* Content. */
    struct spvdx_location **location;
    size_t n_location;
    struct spvdx_label *label; /* Possibly null. */
    struct spvdx_paragraph *paragraph; /* Possibly null. */
};

extern struct spvxml_node_class spvdx_label_frame_class;

bool spvdx_parse_label_frame (struct spvxml_context *, xmlNode *input, struct spvdx_label_frame **);
void spvdx_free_label_frame (struct spvdx_label_frame *);
bool spvdx_is_label_frame (const struct spvxml_node *);
struct spvdx_label_frame *spvdx_cast_label_frame (const struct spvxml_node *);

struct spvdx_labeling {
    struct spvxml_node node_;

    /* Attributes. */
    struct spvdx_style *style;     /* Possibly null. */
    struct spvxml_node *variable;  /* Always nonnull. */

    /* Content. */
    struct spvxml_node **seq;
    size_t n_seq;
};

extern struct spvxml_node_class spvdx_labeling_class;

bool spvdx_parse_labeling (struct spvxml_context *, xmlNode *input, struct spvdx_labeling **);
void spvdx_free_labeling (struct spvdx_labeling *);
bool spvdx_is_labeling (const struct spvxml_node *);
struct spvdx_labeling *spvdx_cast_labeling (const struct spvxml_node *);

struct spvdx_layer {
    struct spvxml_node node_;

    /* Attributes. */
    bool layer_method_present;     /* True if attribute present. */
    int title_visible;             /* -1 if not present, otherwise 0 or 1. */
    char *value;                   /* Always nonnull. */
    struct spvxml_node *variable;  /* Always nonnull. */
    int visible;                   /* -1 if not present, otherwise 0 or 1. */
};

extern struct spvxml_node_class spvdx_layer_class;

bool spvdx_parse_layer (struct spvxml_context *, xmlNode *input, struct spvdx_layer **);
void spvdx_free_layer (struct spvdx_layer *);
bool spvdx_is_layer (const struct spvxml_node *);
struct spvdx_layer *spvdx_cast_layer (const struct spvxml_node *);

struct spvdx_layer_controller {
    struct spvxml_node node_;

    /* Attributes. */
    struct spvdx_label *target;    /* Possibly null. */
};

extern struct spvxml_node_class spvdx_layer_controller_class;

bool spvdx_parse_layer_controller (struct spvxml_context *, xmlNode *input, struct spvdx_layer_controller **);
void spvdx_free_layer_controller (struct spvdx_layer_controller *);
bool spvdx_is_layer_controller (const struct spvxml_node *);
struct spvdx_layer_controller *spvdx_cast_layer_controller (const struct spvxml_node *);

enum spvdx_method {
    SPVDX_METHOD_ATTACH = 1,
    SPVDX_METHOD_FIXED,
    SPVDX_METHOD_SAME,
    SPVDX_METHOD_SIZE_TO_CONTENT,
};
const char *spvdx_method_to_string (enum spvdx_method);

enum spvdx_part {
    SPVDX_PART_BOTTOM = 1,
    SPVDX_PART_HEIGHT,
    SPVDX_PART_LEFT,
    SPVDX_PART_RIGHT,
    SPVDX_PART_TOP,
    SPVDX_PART_WIDTH,
};
const char *spvdx_part_to_string (enum spvdx_part);

struct spvdx_location {
    struct spvxml_node node_;

    /* Attributes. */
    double max;                    /* In inches.  DBL_MAX if not present. */
    enum spvdx_method method;      /* Always nonzero. */
    double min;                    /* In inches.  DBL_MAX if not present. */
    enum spvdx_part part;          /* Always nonzero. */
    struct spvxml_node *target;    /* Possibly null. */
    char *value;                   /* Possibly null. */
};

extern struct spvxml_node_class spvdx_location_class;

bool spvdx_parse_location (struct spvxml_context *, xmlNode *input, struct spvdx_location **);
void spvdx_free_location (struct spvdx_location *);
bool spvdx_is_location (const struct spvxml_node *);
struct spvdx_location *spvdx_cast_location (const struct spvxml_node *);

struct spvdx_major_ticks {
    struct spvxml_node node_;

    /* Attributes. */
    int label_angle;               /* Always present. */
    int label_frequency;           /* INT_MIN if not present. */
    double length;                 /* In inches.  Always present. */
    int stagger;                   /* -1 if not present, otherwise 0 or 1. */
    struct spvdx_style *style;     /* Always nonnull. */
    struct spvdx_style *tick_frame_style; /* Always nonnull. */

    /* Content. */
    struct spvdx_gridline *gridline; /* Possibly null. */
};

extern struct spvxml_node_class spvdx_major_ticks_class;

bool spvdx_parse_major_ticks (struct spvxml_context *, xmlNode *input, struct spvdx_major_ticks **);
void spvdx_free_major_ticks (struct spvdx_major_ticks *);
bool spvdx_is_major_ticks (const struct spvxml_node *);
struct spvdx_major_ticks *spvdx_cast_major_ticks (const struct spvxml_node *);

struct spvdx_nest {
    struct spvxml_node node_;

    /* Content. */
    struct spvdx_variable_reference **vars;
    size_t n_vars;
};

extern struct spvxml_node_class spvdx_nest_class;

bool spvdx_parse_nest (struct spvxml_context *, xmlNode *input, struct spvdx_nest **);
void spvdx_free_nest (struct spvdx_nest *);
bool spvdx_is_nest (const struct spvxml_node *);
struct spvdx_nest *spvdx_cast_nest (const struct spvxml_node *);

struct spvdx_number_format {
    struct spvxml_node node_;

    /* Attributes. */
    int maximum_fraction_digits;   /* INT_MIN if not present. */
    int minimum_fraction_digits;   /* INT_MIN if not present. */
    int minimum_integer_digits;    /* INT_MIN if not present. */
    char *prefix;                  /* Possibly null. */
    enum spvdx_scientific scientific; /* Zero if not present. */
    double small;                  /* In inches.  DBL_MAX if not present. */
    char *suffix;                  /* Possibly null. */
    int use_grouping;              /* -1 if not present, otherwise 0 or 1. */

    /* Content. */
    struct spvdx_affix **affix;
    size_t n_affix;
};

extern struct spvxml_node_class spvdx_number_format_class;

bool spvdx_parse_number_format (struct spvxml_context *, xmlNode *input, struct spvdx_number_format **);
void spvdx_free_number_format (struct spvdx_number_format *);
bool spvdx_is_number_format (const struct spvxml_node *);
struct spvdx_number_format *spvdx_cast_number_format (const struct spvxml_node *);

struct spvdx_paragraph {
    struct spvxml_node node_;

    /* Attributes. */
    double hanging_indent;         /* In inches.  DBL_MAX if not present. */
};

extern struct spvxml_node_class spvdx_paragraph_class;

bool spvdx_parse_paragraph (struct spvxml_context *, xmlNode *input, struct spvdx_paragraph **);
void spvdx_free_paragraph (struct spvdx_paragraph *);
bool spvdx_is_paragraph (const struct spvxml_node *);
struct spvdx_paragraph *spvdx_cast_paragraph (const struct spvxml_node *);

struct spvdx_relabel {
    struct spvxml_node node_;

    /* Attributes. */
    double from;                   /* In inches.  Always present. */
    char *to;                      /* Always nonnull. */
};

extern struct spvxml_node_class spvdx_relabel_class;

bool spvdx_parse_relabel (struct spvxml_context *, xmlNode *input, struct spvdx_relabel **);
void spvdx_free_relabel (struct spvdx_relabel *);
bool spvdx_is_relabel (const struct spvxml_node *);
struct spvdx_relabel *spvdx_cast_relabel (const struct spvxml_node *);

struct spvdx_set_cell_properties {
    struct spvxml_node node_;

    /* Attributes. */
    int apply_to_converse;         /* -1 if not present, otherwise 0 or 1. */

    /* Content. */
    struct spvxml_node **seq;
    size_t n_seq;
    struct spvdx_union *union_; /* Possibly null. */
};

extern struct spvxml_node_class spvdx_set_cell_properties_class;

bool spvdx_parse_set_cell_properties (struct spvxml_context *, xmlNode *input, struct spvdx_set_cell_properties **);
void spvdx_free_set_cell_properties (struct spvdx_set_cell_properties *);
bool spvdx_is_set_cell_properties (const struct spvxml_node *);
struct spvdx_set_cell_properties *spvdx_cast_set_cell_properties (const struct spvxml_node *);

struct spvdx_set_format {
    struct spvxml_node node_;

    /* Attributes. */
    int reset;                     /* -1 if not present, otherwise 0 or 1. */
    struct spvxml_node *target;    /* Always nonnull. */

    /* Content. */
    struct spvdx_format *format; /* Always nonnull. */
    struct spvdx_number_format *number_format; /* Always nonnull. */
    struct spvdx_string_format **string_format;
    size_t n_string_format;
    struct spvdx_date_time_format *date_time_format; /* Always nonnull. */
    struct spvdx_elapsed_time_format *elapsed_time_format; /* Always nonnull. */
};

extern struct spvxml_node_class spvdx_set_format_class;

bool spvdx_parse_set_format (struct spvxml_context *, xmlNode *input, struct spvdx_set_format **);
void spvdx_free_set_format (struct spvdx_set_format *);
bool spvdx_is_set_format (const struct spvxml_node *);
struct spvdx_set_format *spvdx_cast_set_format (const struct spvxml_node *);

struct spvdx_set_frame_style {
    struct spvxml_node node_;

    /* Attributes. */
    struct spvdx_style *style;     /* Always nonnull. */
    struct spvdx_major_ticks *target; /* Always nonnull. */
};

extern struct spvxml_node_class spvdx_set_frame_style_class;

bool spvdx_parse_set_frame_style (struct spvxml_context *, xmlNode *input, struct spvdx_set_frame_style **);
void spvdx_free_set_frame_style (struct spvdx_set_frame_style *);
bool spvdx_is_set_frame_style (const struct spvxml_node *);
struct spvdx_set_frame_style *spvdx_cast_set_frame_style (const struct spvxml_node *);

struct spvdx_set_meta_data {
    struct spvxml_node node_;

    /* Attributes. */
    char *key;                     /* Always nonnull. */
    struct spvdx_graph *target;    /* Always nonnull. */
    char *value;                   /* Always nonnull. */
};

extern struct spvxml_node_class spvdx_set_meta_data_class;

bool spvdx_parse_set_meta_data (struct spvxml_context *, xmlNode *input, struct spvdx_set_meta_data **);
void spvdx_free_set_meta_data (struct spvdx_set_meta_data *);
bool spvdx_is_set_meta_data (const struct spvxml_node *);
struct spvdx_set_meta_data *spvdx_cast_set_meta_data (const struct spvxml_node *);

struct spvdx_set_style {
    struct spvxml_node node_;

    /* Attributes. */
    struct spvdx_style *style;     /* Always nonnull. */
    struct spvxml_node *target;    /* Always nonnull. */
};

extern struct spvxml_node_class spvdx_set_style_class;

bool spvdx_parse_set_style (struct spvxml_context *, xmlNode *input, struct spvdx_set_style **);
void spvdx_free_set_style (struct spvdx_set_style *);
bool spvdx_is_set_style (const struct spvxml_node *);
struct spvdx_set_style *spvdx_cast_set_style (const struct spvxml_node *);

struct spvdx_simple_sort {
    struct spvxml_node node_;

    /* Content. */
    struct spvdx_category_order *category_order; /* Always nonnull. */
};

extern struct spvxml_node_class spvdx_simple_sort_class;

bool spvdx_parse_simple_sort (struct spvxml_context *, xmlNode *input, struct spvdx_simple_sort **);
void spvdx_free_simple_sort (struct spvdx_simple_sort *);
bool spvdx_is_simple_sort (const struct spvxml_node *);
struct spvdx_simple_sort *spvdx_cast_simple_sort (const struct spvxml_node *);

struct spvdx_source_variable {
    struct spvxml_node node_;

    /* Attributes. */
    struct spvdx_source_variable *depends_on; /* Possibly null. */
    struct spvdx_categorical_domain *domain; /* Possibly null. */
    char *label;                   /* Possibly null. */
    struct spvdx_source_variable *label_variable; /* Possibly null. */
    char *source;                  /* Always nonnull. */
    char *source_name;             /* Always nonnull. */

    /* Content. */
    struct spvdx_variable_extension **variable_extension;
    size_t n_variable_extension;
    struct spvxml_node **seq;
    size_t n_seq;
};

extern struct spvxml_node_class spvdx_source_variable_class;

bool spvdx_parse_source_variable (struct spvxml_context *, xmlNode *input, struct spvdx_source_variable **);
void spvdx_free_source_variable (struct spvdx_source_variable *);
bool spvdx_is_source_variable (const struct spvxml_node *);
struct spvdx_source_variable *spvdx_cast_source_variable (const struct spvxml_node *);

struct spvdx_string_format {
    struct spvxml_node node_;

    /* Content. */
    struct spvdx_relabel **relabel;
    size_t n_relabel;
    struct spvdx_affix **affix;
    size_t n_affix;
};

extern struct spvxml_node_class spvdx_string_format_class;

bool spvdx_parse_string_format (struct spvxml_context *, xmlNode *input, struct spvdx_string_format **);
void spvdx_free_string_format (struct spvdx_string_format *);
bool spvdx_is_string_format (const struct spvxml_node *);
struct spvdx_string_format *spvdx_cast_string_format (const struct spvxml_node *);

enum spvdx_border_bottom {
    SPVDX_BORDER_BOTTOM_DOUBLE = 1,
    SPVDX_BORDER_BOTTOM_NONE,
    SPVDX_BORDER_BOTTOM_SOLID,
    SPVDX_BORDER_BOTTOM_THICK,
    SPVDX_BORDER_BOTTOM_THIN,
};
const char *spvdx_border_bottom_to_string (enum spvdx_border_bottom);

enum spvdx_border_left {
    SPVDX_BORDER_LEFT_DOUBLE = 1,
    SPVDX_BORDER_LEFT_NONE,
    SPVDX_BORDER_LEFT_SOLID,
    SPVDX_BORDER_LEFT_THICK,
    SPVDX_BORDER_LEFT_THIN,
};
const char *spvdx_border_left_to_string (enum spvdx_border_left);

enum spvdx_border_right {
    SPVDX_BORDER_RIGHT_DOUBLE = 1,
    SPVDX_BORDER_RIGHT_NONE,
    SPVDX_BORDER_RIGHT_SOLID,
    SPVDX_BORDER_RIGHT_THICK,
    SPVDX_BORDER_RIGHT_THIN,
};
const char *spvdx_border_right_to_string (enum spvdx_border_right);

enum spvdx_border_top {
    SPVDX_BORDER_TOP_DOUBLE = 1,
    SPVDX_BORDER_TOP_NONE,
    SPVDX_BORDER_TOP_SOLID,
    SPVDX_BORDER_TOP_THICK,
    SPVDX_BORDER_TOP_THIN,
};
const char *spvdx_border_top_to_string (enum spvdx_border_top);

enum spvdx_font_style {
    SPVDX_FONT_STYLE_ITALIC = 1,
    SPVDX_FONT_STYLE_REGULAR,
};
const char *spvdx_font_style_to_string (enum spvdx_font_style);

enum spvdx_font_underline {
    SPVDX_FONT_UNDERLINE_NONE = 1,
    SPVDX_FONT_UNDERLINE_UNDERLINE,
};
const char *spvdx_font_underline_to_string (enum spvdx_font_underline);

enum spvdx_font_weight {
    SPVDX_FONT_WEIGHT_BOLD = 1,
    SPVDX_FONT_WEIGHT_REGULAR,
};
const char *spvdx_font_weight_to_string (enum spvdx_font_weight);

enum spvdx_label_location_horizontal {
    SPVDX_LABEL_LOCATION_HORIZONTAL_CENTER = 1,
    SPVDX_LABEL_LOCATION_HORIZONTAL_NEGATIVE,
    SPVDX_LABEL_LOCATION_HORIZONTAL_POSITIVE,
};
const char *spvdx_label_location_horizontal_to_string (enum spvdx_label_location_horizontal);

enum spvdx_label_location_vertical {
    SPVDX_LABEL_LOCATION_VERTICAL_CENTER = 1,
    SPVDX_LABEL_LOCATION_VERTICAL_NEGATIVE,
    SPVDX_LABEL_LOCATION_VERTICAL_POSITIVE,
};
const char *spvdx_label_location_vertical_to_string (enum spvdx_label_location_vertical);

enum spvdx_text_alignment {
    SPVDX_TEXT_ALIGNMENT_CENTER = 1,
    SPVDX_TEXT_ALIGNMENT_DECIMAL,
    SPVDX_TEXT_ALIGNMENT_LEFT,
    SPVDX_TEXT_ALIGNMENT_MIXED,
    SPVDX_TEXT_ALIGNMENT_RIGHT,
};
const char *spvdx_text_alignment_to_string (enum spvdx_text_alignment);

struct spvdx_style {
    struct spvxml_node node_;

    /* Attributes. */
    enum spvdx_border_bottom border_bottom; /* Zero if not present. */
    char *border_bottom_color;     /* Possibly null. */
    enum spvdx_border_left border_left; /* Zero if not present. */
    char *border_left_color;       /* Possibly null. */
    enum spvdx_border_right border_right; /* Zero if not present. */
    char *border_right_color;      /* Possibly null. */
    enum spvdx_border_top border_top; /* Zero if not present. */
    char *border_top_color;        /* Possibly null. */
    int color;                     /* -1 if not present. */
    int color2;                    /* -1 if not present. */
    double decimal_offset;         /* In inches.  DBL_MAX if not present. */
    char *font_family;             /* Possibly null. */
    char *font_size;               /* Possibly null. */
    enum spvdx_font_style font_style; /* Zero if not present. */
    enum spvdx_font_underline font_underline; /* Zero if not present. */
    enum spvdx_font_weight font_weight; /* Zero if not present. */
    double label_angle;            /* In inches.  DBL_MAX if not present. */
    enum spvdx_label_location_horizontal label_location_horizontal; /* Zero if not present. */
    enum spvdx_label_location_vertical label_location_vertical; /* Zero if not present. */
    double margin_bottom;          /* In inches.  DBL_MAX if not present. */
    double margin_left;            /* In inches.  DBL_MAX if not present. */
    double margin_right;           /* In inches.  DBL_MAX if not present. */
    double margin_top;             /* In inches.  DBL_MAX if not present. */
    char *size;                    /* Possibly null. */
    enum spvdx_text_alignment text_alignment; /* Zero if not present. */
    int visible;                   /* -1 if not present, otherwise 0 or 1. */
    char *width;                   /* Possibly null. */
};

extern struct spvxml_node_class spvdx_style_class;

bool spvdx_parse_style (struct spvxml_context *, xmlNode *input, struct spvdx_style **);
void spvdx_free_style (struct spvdx_style *);
bool spvdx_is_style (const struct spvxml_node *);
struct spvdx_style *spvdx_cast_style (const struct spvxml_node *);

enum spvdx_fit_cells {
    SPVDX_FIT_CELLS_BOTH = 1,
    SPVDX_FIT_CELLS_TICKS,
};
const char *spvdx_fit_cells_to_string (enum spvdx_fit_cells);

struct spvdx_table_layout {
    struct spvxml_node node_;

    /* Attributes. */
    enum spvdx_fit_cells fit_cells; /* Zero if not present. */
    struct spvdx_style *style;     /* Possibly null. */
    bool vertical_titles_in_corner;
};

extern struct spvxml_node_class spvdx_table_layout_class;

bool spvdx_parse_table_layout (struct spvxml_context *, xmlNode *input, struct spvdx_table_layout **);
void spvdx_free_table_layout (struct spvdx_table_layout *);
bool spvdx_is_table_layout (const struct spvxml_node *);
struct spvdx_table_layout *spvdx_cast_table_layout (const struct spvxml_node *);

struct spvdx_text {
    struct spvxml_node node_;

    /* Attributes. */
    int defines_reference;         /* INT_MIN if not present. */
    enum spvdx_position position;  /* Zero if not present. */
    struct spvdx_style *style;     /* Always nonnull. */
    int uses_reference;            /* INT_MIN if not present. */

    /* Content. */
    char *text; /* Always nonnull. */
};

extern struct spvxml_node_class spvdx_text_class;

bool spvdx_parse_text (struct spvxml_context *, xmlNode *input, struct spvdx_text **);
void spvdx_free_text (struct spvdx_text *);
bool spvdx_is_text (const struct spvxml_node *);
struct spvdx_text *spvdx_cast_text (const struct spvxml_node *);

struct spvdx_union {
    struct spvxml_node node_;

    /* Content. */
    struct spvdx_intersect **intersect;
    size_t n_intersect;
};

extern struct spvxml_node_class spvdx_union_class;

bool spvdx_parse_union (struct spvxml_context *, xmlNode *input, struct spvdx_union **);
void spvdx_free_union (struct spvdx_union *);
bool spvdx_is_union (const struct spvxml_node *);
struct spvdx_union *spvdx_cast_union (const struct spvxml_node *);

struct spvdx_unity {
    struct spvxml_node node_;
};

extern struct spvxml_node_class spvdx_unity_class;

bool spvdx_parse_unity (struct spvxml_context *, xmlNode *input, struct spvdx_unity **);
void spvdx_free_unity (struct spvdx_unity *);
bool spvdx_is_unity (const struct spvxml_node *);
struct spvdx_unity *spvdx_cast_unity (const struct spvxml_node *);

enum spvdx_missing {
    SPVDX_MISSING_LISTWISE = 1,
    SPVDX_MISSING_PAIRWISE,
};
const char *spvdx_missing_to_string (enum spvdx_missing);

struct spvdx_user_source {
    struct spvxml_node node_;

    /* Attributes. */
    enum spvdx_missing missing;    /* Zero if not present. */
};

extern struct spvxml_node_class spvdx_user_source_class;

bool spvdx_parse_user_source (struct spvxml_context *, xmlNode *input, struct spvdx_user_source **);
void spvdx_free_user_source (struct spvdx_user_source *);
bool spvdx_is_user_source (const struct spvxml_node *);
struct spvdx_user_source *spvdx_cast_user_source (const struct spvxml_node *);

struct spvdx_value_map_entry {
    struct spvxml_node node_;

    /* Attributes. */
    char *from;                    /* Always nonnull. */
    char *to;                      /* Always nonnull. */
};

extern struct spvxml_node_class spvdx_value_map_entry_class;

bool spvdx_parse_value_map_entry (struct spvxml_context *, xmlNode *input, struct spvdx_value_map_entry **);
void spvdx_free_value_map_entry (struct spvdx_value_map_entry *);
bool spvdx_is_value_map_entry (const struct spvxml_node *);
struct spvdx_value_map_entry *spvdx_cast_value_map_entry (const struct spvxml_node *);

struct spvdx_variable_reference {
    struct spvxml_node node_;

    /* Attributes. */
    struct spvxml_node *ref;       /* Always nonnull. */
};

extern struct spvxml_node_class spvdx_variable_reference_class;

bool spvdx_parse_variable_reference (struct spvxml_context *, xmlNode *input, struct spvdx_variable_reference **);
void spvdx_free_variable_reference (struct spvdx_variable_reference *);
bool spvdx_is_variable_reference (const struct spvxml_node *);
struct spvdx_variable_reference *spvdx_cast_variable_reference (const struct spvxml_node *);

struct spvdx_variable_extension {
    struct spvxml_node node_;

    /* Attributes. */
    char *from;                    /* Always nonnull. */
    char *help_id;                 /* Always nonnull. */
};

extern struct spvxml_node_class spvdx_variable_extension_class;

bool spvdx_parse_variable_extension (struct spvxml_context *, xmlNode *input, struct spvdx_variable_extension **);
void spvdx_free_variable_extension (struct spvdx_variable_extension *);
bool spvdx_is_variable_extension (const struct spvxml_node *);
struct spvdx_variable_extension *spvdx_cast_variable_extension (const struct spvxml_node *);

struct spvdx_visualization {
    struct spvxml_node node_;

    /* Attributes. */
    char *creator;                 /* Always nonnull. */
    char *date;                    /* Always nonnull. */
    char *lang;                    /* Always nonnull. */
    char *name;                    /* Always nonnull. */
    char *schema_location;         /* Possibly null. */
    struct spvdx_style *style_ref; /* Always nonnull. */
    char *type;                    /* Always nonnull. */
    char *version;                 /* Always nonnull. */

    /* Content. */
    struct spvdx_visualization_extension *visualization_extension; /* Possibly null. */
    struct spvdx_user_source *user_source; /* Always nonnull. */
    struct spvxml_node **seq;
    size_t n_seq;
    struct spvdx_categorical_domain *categorical_domain; /* Possibly null. */
    struct spvdx_graph *graph; /* Always nonnull. */
    struct spvdx_label_frame **lf1;
    size_t n_lf1;
    struct spvdx_container *container; /* Possibly null. */
    struct spvdx_label_frame **lf2;
    size_t n_lf2;
    struct spvdx_style **style;
    size_t n_style;
    struct spvdx_layer_controller *layer_controller; /* Possibly null. */
};

extern struct spvxml_node_class spvdx_visualization_class;

bool spvdx_parse_visualization (struct spvxml_context *, xmlNode *input, struct spvdx_visualization **);
void spvdx_free_visualization (struct spvdx_visualization *);
bool spvdx_is_visualization (const struct spvxml_node *);
struct spvdx_visualization *spvdx_cast_visualization (const struct spvxml_node *);

struct spvdx_visualization_extension {
    struct spvxml_node node_;

    /* Attributes. */
    bool max_width_set_present;    /* True if attribute present. */
    bool min_width_set_present;    /* True if attribute present. */
    int num_rows;                  /* INT_MIN if not present. */
    int show_gridline;             /* -1 if not present, otherwise 0 or 1. */
};

extern struct spvxml_node_class spvdx_visualization_extension_class;

bool spvdx_parse_visualization_extension (struct spvxml_context *, xmlNode *input, struct spvdx_visualization_extension **);
void spvdx_free_visualization_extension (struct spvdx_visualization_extension *);
bool spvdx_is_visualization_extension (const struct spvxml_node *);
struct spvdx_visualization_extension *spvdx_cast_visualization_extension (const struct spvxml_node *);

struct spvdx_where {
    struct spvxml_node node_;

    /* Attributes. */
    char *include;                 /* Always nonnull. */
    struct spvxml_node *variable;  /* Always nonnull. */
};

extern struct spvxml_node_class spvdx_where_class;

bool spvdx_parse_where (struct spvxml_context *, xmlNode *input, struct spvdx_where **);
void spvdx_free_where (struct spvdx_where *);
bool spvdx_is_where (const struct spvxml_node *);
struct spvdx_where *spvdx_cast_where (const struct spvxml_node *);

#endif /* SPVDX_PARSER_H */
