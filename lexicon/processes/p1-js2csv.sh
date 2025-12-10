#!/bin/bash
echo
echo "# p1-js2csv.sh #"
echo "d1-lexicon.js -> data/d2-lexicon.csv  (comma)"
echo
echo "remove heteonym encoding"
echo "remove xx/yy homograph encoding"
echo
echo
#head -3000 data/d1-lexicon.js | \
 cat data/d1-lexicon.js | \

#
# convert to comma separated variable
#

sed \
-e 's/":\({"a":"\)/,/;' \
-e 's/","f":"/,/;'      \
-e 's/^,"//;'           \
-e 's/\"}$//'            | \
#
# remove HETERONYM coding
#
 sed \
-e 's/--HETERONYM--[^,]*//' | \
# remove alternate pronunciation
#
## 
# sed \
# -e 's/[^,]*\!//'   |\
##-e 's/\![^,]*//'   |\
# remove xx yy homographs
#
# 
 sed \
-e 's/xx//;s/yy//'   |\
sort -t"," -k3,3n > data/d2-lexicon.csv
 head -${HEADLINES:-2000} data/d2-lexicon.csv | tail -${TAILLINES:-10}
 echo 
 echo "#lines  $(wc -l data/d2*)"
echo
