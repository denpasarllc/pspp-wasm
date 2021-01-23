#!/bin/sh

~/Downloads/emsdk-master/upstream/emscripten/emcc -static -r -o libmath.o -O3 -s WASM=1 \
	-s RELOCATABLE=1 \
	-s ALLOW_MEMORY_GROWTH=1 -s ASSERTIONS=1 -s NO_EXIT_RUNTIME=1 --no-entry \
	-s EXPORT_ALL=1 \
	--profiling-funcs -g \
	-I<path_to_project>/ \
	-I<path_to_project>/src/ \
	-I<path_to_project>/gl \
	-I<path_to_project>/gsl \
	-I<path_to_project>/lib \
	-I<path_to_emsdk>/upstream/emscripten/system/include/libc/ \
box-whisker.c categoricals.c chart-geometry.c correlation.c \
covariance.c extrema.c histogram.c interaction.c levene.c linreg.c \
merge.c moments.c np.c order-stats.c percentiles.c random.c \
shapiro-wilk.c sort.c trimmed-mean.c tukey-hinges.c wilcoxon-sig.c


