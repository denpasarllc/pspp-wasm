#!/bin/sh

~/Downloads/emsdk-master/upstream/emscripten/emcc -static -r -o liboutput.o -O3 -s WASM=1 -s RELOCATABLE=1 \
	-s ALLOW_MEMORY_GROWTH=1 -s ASSERTIONS=1 -s NO_EXIT_RUNTIME=1 --no-entry \
	-s EXPORT_ALL=1 \
	--profiling-funcs -g \
	-I/Users/<user>/Downloads/denpasar/ \
	-I/Users/<user>/Downloads/denpasar/gl/ \
	-I/Users/<user>/Downloads/denpasar/gsl/ \
	-I/Users/<user>/Downloads/denpasar/src/output \
	-I/Users/<user>/Downloads/denpasar/src/ \
	-I/Users/<user>/Downloads/denpasar/libxml2/include \
ascii.c chart-item.c csv.c driver.c group-item.c html.c journal.c \
measure.c message-item.c msglog.c odt.c options.c output-item.c \
page-setup-item.c pivot-output.c pivot-table.c render.c spv-driver.c \
table-item.c table.c text-item.c \
spv/*.c \
charts/barchart.c charts/boxplot.c charts/np-plot.c charts/piechart.c charts/plot-hist.c \
charts/roc-chart.c charts/scatterplot.c charts/scree.c charts/spreadlevel-plot.c
