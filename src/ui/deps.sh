#!/bin/sh

args="'$*'"
echo $args

(grep -q "libp" <<< "$args" && cd ../libpspp && echo "Building `pwd`"  && ./build.sh) & \
(grep -q "output" <<< "$args" && cd ../output && echo "Building `pwd`" && ./build.sh) & \
(grep -q "lang" <<< "$args" &&  cd ../language && echo "Building `pwd`" && ./build.sh) & \
(grep -q "data" <<< "$args" &&  cd ../data && echo "Building `pwd`" && ./build.sh)

wait
echo "Dependencies built"

(echo "Building `pwd`"  && ./build.sh)
