#!/bin/sh


~/Downloads/emsdk-master/upstream/emscripten/emcc -static -r -o liblanguage.o -O3 -s WASM=1 \
	-s RELOCATABLE=1 \
	-s ALLOW_MEMORY_GROWTH=1 -s ASSERTIONS=1 -s NO_EXIT_RUNTIME=1 --no-entry \
	-s EXPORT_ALL=1 \
	--profiling-funcs -g \
	-I/Users/<user>/Downloads/denpasar \
	-I/Users/<user>/Downloads/denpasar/gl \
	-I/Users/<user>/Downloads/denpasar/gsl \
	-I/Users/<user>/Downloads/denpasar/src \
	-I/Users/<user>/Downloads/denpasar/lib \
    *.c expressions/*.c dictionary/*.c data-io/*.c \
    control/*.c stats/*.c tests/*.c utilities/*.c xforms/*.c \
	lexer/command-name.c \
	lexer/format-parser.c lexer/include-path.c lexer/lexer.c lexer/scan.c lexer/segment.c \
	lexer/subcommand-list.c lexer/token.c lexer/value-parser.c lexer/variable-parser.c
		
