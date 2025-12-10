#!/bin/bash


echo
echo
echo
echo "# p2-reform-spelling.sh #"
echo
echo "d2-lexicon.csv  --> d3-no_pronounciation.csv"
echo
#awk -F"," -v OFS="," '{print $1, $3}' data/d2-lexicon.csv  > data/d3-no_pronunciations.csv
awk -F"," -v OFS="," '{print $1, $3, toupper($2),$2}' data/d2-lexicon.csv  |\
#perl    -pe 'tr/ĜŜĈŢÃĖẎΠÂÊÎÔÛÇΤQŶÝŚŐÁÉÍÓÚΥABCDEFG/\
#               jjjjeiifaeiouszkyyzuaeiouwabcdefg/' > data/d3-no_pronunciations.csv
perl -C processes/reform.pl > data/d3-reformed.csv
head -${HEADLINES:-2000} data/d3* | tail -${TAILLINES:-10}
echo 
 echo "#lines  $(wc -l data/d3*)"
echo
