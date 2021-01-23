#!/bin/sh

~/Downloads/emsdk-master/upstream/emscripten/emcc \
    -O3 -s WASM=1 -s LLD_REPORT_UNDEFINED=1 -s RELOCATABLE=1  -s NO_EXIT_RUNTIME=1 \
    -s ALLOW_MEMORY_GROWTH=1 -s ASSERTIONS=1 -s ERROR_ON_UNDEFINED_SYMBOLS=1 \
    -s USE_ZLIB=1 -s EXPORT_ALL=1 -s SAFE_HEAP=1 -s DETERMINISTIC=1 \
    --shell-file shell_minimal.html --profiling-funcs -g \
    -s "EXTRA_EXPORTED_RUNTIME_METHODS=['ccall', 'cwrap', 'getMemory', 'setValue', 'getValue', 'intArrayFromString', 'ALLOC_NORMAL', 'allocate']" \
    -o ui.html \
	-I<path_to_project>/ \
	-I<path_to_project>/gsl/ \
    -I<path_to_project>/gl/ \
	-I<path_to_project>/src/output \
	-I<path_to_project>/src/ \
	-I<path_to_project>/libxml2/include \
terminal/main.c terminal/terminal-opts.c terminal/terminal-reader.c  *.c \
../../gl/libgl.o ../../gsl/libgsl.a ../../gsl/libgslcblas.a ../../lib/libmisc.o ../data/libdata.o \
../language/liblanguage.o ../libpspp/libpspp.o ../math/libmath.o ../output/liboutput.o \
../../libxml2/.libs/libxml2.a <path_to_libiconv>/libiconv-1.16/lib/.libs/libiconv.a

mv ui.html web/public/index.html
mv ui.js web/public/
mv ui.wasm web/public/


// LIBXML2_CFLAGS="-I<path_to_project>/libxml2/include -L<path_to_project>/libxml2/.libs/" LIBXML2_LIBS="-lxml2 -lm" FREETYPE_CFLAGS="-s USE_FREETYPE=1" FREETYPE_LIBS=" " emconfigure ./configure --prefix=$(pwd)/dist --enable-libxml2 --disable-docs

