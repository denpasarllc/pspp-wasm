#!/bin/sh

<path_to_emsdk>/upstream/emscripten/emcc -static -r -o libmisc.o -O3 -s WASM=1 \
	-s RELOCATABLE=1 \
	-s ALLOW_MEMORY_GROWTH=1 -s ASSERTIONS=1 -s NO_EXIT_RUNTIME=1 --no-entry \
	-s EXPORT_ALL=1 \
	-I/Users/<user>/Downloads/denpasar/lib/linreg \
	-I/Users/<user>/Downloads/denpasar/lib/tukey \
	-I/Users/<user>/Downloads/denpasar/gsl \
	-I/Users/<user>/Downloads/denpasar/src \
	-I/Users/<user>/Downloads/denpasar/ \
  	linreg/*.c tukey/*.c


