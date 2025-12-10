#!/bin/bash
echo
echo
echo "# p4-truncate.sh #"
echo "calling truncate-4.pl"


perl -f truncate-4.pl data/d4-e161.csv > data/d5a-e161FragMIX.csv

#some of this is redundant
grep -v ALL data/d5a-e161FragMIX.csv > data/d5-e161Frag.csv
echo
head -${HEADLINES:-2000} data/d5-e161Frag.csv | tail -${TAILLINES:-10}
echo 
echo
echo
#read -n 1 -s -r -p "Press any key "; clear
