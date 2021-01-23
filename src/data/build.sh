#!/bin/sh

~/Downloads/emsdk-master/upstream/emscripten/emcc -static -r -o libdata.o -O3 -s WASM=1 \
	-s USE_ZLIB=1 -s RELOCATABLE=1 \
	-s ALLOW_MEMORY_GROWTH=1 -s ASSERTIONS=1 -s NO_EXIT_RUNTIME=1 --no-entry \
	-s EXPORT_ALL=1 -s SAFE_HEAP=1 -s DETERMINISTIC=1 \
	--profiling-funcs -g \
	-I/Users/<user>/Downloads/denpasar/ \
	-I/Users/<user>/Downloads/denpasar/gl/ \
	-I/Users/<user>/Downloads/denpasar/src/data \
	-I/Users/<user>/Downloads/denpasar/src/ \
	-L/Users/<user>/Downloads/denpasar/gl/ \
	-I/Users/<user>/Downloads/denpasar/libxml2/include \
	case.c caseproto.c value.c variable.c mrset.c vector.c \
	attributes.c data-out.c dictionary.c dict-class.c format.c identifier.c identifier2.c \
	missing-values.c settings.c value-labels.c calendar.c any-reader.c \
	any-writer.c case-map.c case-matcher.c case-tmpfile.c casegrouper.c \
	caseinit.c casereader-filter.c casereader-project.c casereader-select.c \
	casereader-shim.c casereader-translator.c casereader.c casewindow.c \
	casewriter-translator.c casewriter.c csv-file-writer.c data-in.c \
	dataset.c datasheet.c encrypted-file.c file-handle-def.c file-name.c \
	format-guesser.c transformations.c dataset-writer.c lazy-casereader.c \
	por-file-writer.c sys-file-writer.c subcase.c make-file.c session.c \
	short-names.c spreadsheet-reader.c sys-file-encoding.c sys-file-private.c \
	sys-file-reader.c gnumeric-reader.c mdd-writer.c ods-reader.c \
	pc+-file-reader.c psql-reader.c por-file-reader.c
	
