#!/bin/sh

~/Downloads/emsdk-master/upstream/emscripten/emcc -static -r -o libpspp.o -O3 -s WASM=1 \
	-s USE_ZLIB=1 -s RELOCATABLE=1 \
	-s ALLOW_MEMORY_GROWTH=1 -s ASSERTIONS=1 -s NO_EXIT_RUNTIME=1 --no-entry \
	-s EXPORT_ALL=1 \
	--profiling-funcs -g \
	-I<path_to_project>/ \
	-I<path_to_project>/gl/ \
	-I<path_to_project>/src/libpspp \
	-I<path_to_project>/src/ \
	-I<path_to_project>/src/ \
	-I<path_to_libiconv>/libiconv-1.16/include/ \
	abt.c argv-parser.c array.c float-format.c hash-functions.c heap.c hmap.c hmapx.c \
	integer-format.c message.c pool.c str.c temp-file.c version.c bit-vector.c bt.c \
	cmac-aes256.c copyleft.c deque.c encoding-guesser.c ext-array.c misc.c i18n.c \
	intern.c line-reader.c ll.c llx.c prompt.c range-map.c range-set.c range-tower.c \
	sparse-array.c sparse-xarray.c start-date.c string-array.c string-map.c string-set.c \
	stringi-map.c stringi-set.c taint.c tower.c u8-istream.c u8-line.c zip-reader.c zip-writer.c