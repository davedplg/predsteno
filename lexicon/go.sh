#!/usr/bin/env bash
set -eu 
#export PS4='+ $BASH_SOURCE:$LINENO '   # nicer trace
#set -x

CONFIG_FILE="${CONFIG_FILE:-./config.sh}"

echo "=== REDUCED KEYBOARD CONFIG ==="
cat "$CONFIG_FILE"
echo "================="

# shellcheck source=config.sh
source "$CONFIG_FILE"

#log the intermediate files md5sum 

log() {
  md5sum "$1" | awk '{printf "%-35s %s\n", "'"$1"'", substr($1,1,6)}' >> data/pipeline-md5.log
}
#log() { md5sum "$1" | awk '{printf "%-35s %s\n", "'"$1"'", $1}' >> data/pipeline-md5.log; }

# pause between steps
pressAnyKey() {
   if [ "$WATCH" = '1' ]; then 
   read -n 1 -s -r -p "Press any key "; clear
   fi 
 }


 # use most common n word subsets for 15K optimisation
 sort -t"\"" -k10n,10n data/d0-lexicon.js  | head -$WORDS > data/d1-lexicon.js 
log data/d1-lexicon.js
 source processes/p1-js2csv.sh 
pressAnyKey
log data/d2*.csv

source processes/p2-reform-spelling.sh 
pressAnyKey
log data/d3*.csv

source processes/p3-encode_e161.sh
pressAnyKey
log data/d4*.csv

source processes/p4-truncate.sh
pressAnyKey
log data/d5-e161Frag.csv

if [ "$REORDER" = '1' ]; then
  source processes/p5-reorder.sh
  pressAnyKey
  else
    cp data/d5-e161Frag.csv data/d6-e161FragReordered.csv
fi
log data/d6*.csv



source processes/p6-concatenate.sh
pressAnyKey
log data/d7*.csv

#WATCH="1"
source processes/p7*
pressAnyKey
log data/o*.csv

 
wc -l data/o*
wc -l data/o-reserves.csv
#pressAnyKey

#sort -t"," -k3,3n data/o-rej* | head -50


