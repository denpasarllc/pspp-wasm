/* Generated automatically -- do not modify!    -*- buffer-read-only: t -*- */
#ifndef SPVOB_PARSER_H
#define SPVOB_PARSER_H

#include <stddef.h>
#include <stdint.h>
#include <stdbool.h>
#include "output/spv/spvbin-helpers.h"

struct spvob_legacy_binary {
    size_t start, len;
    uint8_t version;
    uint16_t n_sources;
    uint32_t member_size;
    struct spvob_metadata **metadata;
};
bool spvob_parse_legacy_binary (struct spvbin_input *, struct spvob_legacy_binary **);
void spvob_free_legacy_binary (struct spvob_legacy_binary *);
void spvob_print_legacy_binary (const char *title, int indent, const struct spvob_legacy_binary *);

struct spvob_metadata {
    size_t start, len;
    uint32_t n_values;
    uint32_t n_variables;
    uint32_t data_offset;
    uint8_t source_name[28];
    uint8_t ext_source_name[36];
    uint32_t x;
};
bool spvob_parse_metadata (struct spvbin_input *, struct spvob_metadata **);
void spvob_free_metadata (struct spvob_metadata *);
void spvob_print_metadata (const char *title, int indent, const struct spvob_metadata *);

struct spvob_strings {
    size_t start, len;
    struct spvob_source_maps *maps;
    struct spvob_labels *labels;
};
bool spvob_parse_strings (struct spvbin_input *, struct spvob_strings **);
void spvob_free_strings (struct spvob_strings *);
void spvob_print_strings (const char *title, int indent, const struct spvob_strings *);

struct spvob_source_maps {
    size_t start, len;
    uint32_t n_maps;
    struct spvob_source_map **maps;
};
bool spvob_parse_source_maps (struct spvbin_input *, struct spvob_source_maps **);
void spvob_free_source_maps (struct spvob_source_maps *);
void spvob_print_source_maps (const char *title, int indent, const struct spvob_source_maps *);

struct spvob_source_map {
    size_t start, len;
    char *source_name;
    uint32_t n_variables;
    struct spvob_variable_map **variables;
};
bool spvob_parse_source_map (struct spvbin_input *, struct spvob_source_map **);
void spvob_free_source_map (struct spvob_source_map *);
void spvob_print_source_map (const char *title, int indent, const struct spvob_source_map *);

struct spvob_variable_map {
    size_t start, len;
    char *variable_name;
    uint32_t n_data;
    struct spvob_datum_map **data;
};
bool spvob_parse_variable_map (struct spvbin_input *, struct spvob_variable_map **);
void spvob_free_variable_map (struct spvob_variable_map *);
void spvob_print_variable_map (const char *title, int indent, const struct spvob_variable_map *);

struct spvob_datum_map {
    size_t start, len;
    uint32_t value_idx;
    uint32_t label_idx;
};
bool spvob_parse_datum_map (struct spvbin_input *, struct spvob_datum_map **);
void spvob_free_datum_map (struct spvob_datum_map *);
void spvob_print_datum_map (const char *title, int indent, const struct spvob_datum_map *);

struct spvob_labels {
    size_t start, len;
    uint32_t n_labels;
    struct spvob_label **labels;
};
bool spvob_parse_labels (struct spvbin_input *, struct spvob_labels **);
void spvob_free_labels (struct spvob_labels *);
void spvob_print_labels (const char *title, int indent, const struct spvob_labels *);

struct spvob_label {
    size_t start, len;
    uint32_t frequency;
    char *label;
};
bool spvob_parse_label (struct spvbin_input *, struct spvob_label **);
void spvob_free_label (struct spvob_label *);
void spvob_print_label (const char *title, int indent, const struct spvob_label *);

#endif /* SPVOB_PARSER_H */
