#!/bin/bash


echo
echo
echo
echo "# p2-reform-spelling.sh #"
echo
echo "d2-lexicon.csv  --> d3-no_pronounciation.csv"
echo



awk -F"," -v OFS="," '{print $1, $3, toupper($2),$2}' data/d2-lexicon.csv  |\
perl -C processes/reform.pl > data/d3-reformed.csv
head -${HEADLINES:-2000} data/d3* | tail -${TAILLINES:-10}
echo 
 echo "#lines  $(wc -l data/d3*)"
echo

#add homophone indices 
awk  -v field=3 -v OFS="," -F"," -f processes/count_homos.awk data/d3-reformed.csv data/d3-reformed.csv > data/temp
mv data/temp  data/d35-reformed.csv


