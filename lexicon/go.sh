#!/usr/bin/env bash
set -eu 
#export PS4='+ $BASH_SOURCE:$LINENO '   # nicer trace
#set -x

CONFIG_FILE="${CONFIG_FILE:-./config-uni-8.sh}"
#CONFIG_FILE="\( {1:- \){CONFIG_FILE:-./config.sh}}"

echo "=== REDUCED KEYBOARD CONFIG ==="
cat "$CONFIG_FILE"
echo "================="
# pause between steps
pressAnyKey() {
   if [ "$WATCH" = '1' ]; then 
   read -n 1 -s -r -p "Press any key "; clear
   fi 
 }


# shellcheck source=config.sh
printenv | grep -v PATH
#   read -n 1 -s -r -p "Press any key "; clear
pressAnyKey

#source "$CONFIG_FILE"
source "$CONFIG_FILE"

pressAnyKey
#   read -n 1 -s -r -p "Press any key "; clear
#log the intermediate files md5sum 

log() {
  md5sum "$1" | awk '{printf "%-35s %s\n", "'"$1"'", substr($1,1,6)}' >> data/pipeline-md5.log
}
#log() { md5sum "$1" | awk '{printf "%-35s %s\n", "'"$1"'", $1}' >> data/pipeline-md5.log; }

## pause between steps
#pressAnyKey() {
#   if [ "$WATCH" = '1' ]; then 
#   read -n 1 -s -r -p "Press any key "; clear
#   fi 
# }


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
echo 2-3 letter frag
grep -w -e [0-9][0-9] -e [0-9][0-9][0-9] $maj/js/$DICNAME/reserves.js | wc -l

echo
echo 4-5 letter frag
grep -w -e [0-9][0-9][0-9][0-9] -e [0-9][0-9][0-9][0-9][0-9] $maj/js/$DICNAME/reserves.js | wc -l

#pressAnyKey

#sort -t"," -k3,3n data/o-rej* | head -50

mkdir -p ../js/$DICNAME/SHORT_WORD_BIAS_$SHORT_WORD_BIAS

cp ../js/$DICNAME/reserves.js ../js/$DICNAME/SHORT_WORD_BIAS_$SHORT_WORD_BIAS/reserves.js
cp ../js/$DICNAME/toptxts.js  ../js/$DICNAME/SHORT_WORD_BIAS_$SHORT_WORD_BIAS/toptxts.js
cp ../js/$DICNAME/caps.js     ../js/$DICNAME/SHORT_WORD_BIAS_$SHORT_WORD_BIAS/caps.js
#make the TO->AUG transformation dic
echo '{' > ../js/d0-lexicon.json
echo ' "dumbtoby":{"a":"toby","f":"0"} ' >> ../js/d0-lexicon.json
sed 's/#/0/g;s/o0/o/g;' data/d0-lexicon.js >> ../js/d0-lexicon.json
echo '}' >> ../js/d0-lexicon.json

