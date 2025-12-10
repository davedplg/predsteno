#!/bin/bash


echo
echo
echo
echo "# p5-reorder.sh #"
echo
echo "d5-e161Frag.csv     >  d6-e161FragReordered.csv"
echo
perl -f reorder-5.pl data/d5-e161Frag.csv > data/d6-e161FragReordered.csv
head -${HEADLINES:-2000} data/d6-e161FragReordered.csv | tail -${TAILLINES:-10}
echo 
 echo "#lines $(wc -l data/d6*)"
echo
