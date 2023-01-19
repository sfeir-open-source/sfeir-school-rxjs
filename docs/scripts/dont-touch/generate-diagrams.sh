#!/bin/sh

# pip3 install rxmarbles

cd ./assets/images/diagrams/
rm *.svg

for f in *.txt
do
    echo $f
    marblesgen $f
done