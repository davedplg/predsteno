#!/bin/bash
# 
# This is to order fragments to allow sensible concatenation
#

wlc=${1:-6} # word lenght cut-off

filter_no_frags_length() {
  awk -F"," ' 
  length($2) == length($1)  {
    print $0;
  }
  ' 
}

sortcount() { 
  sort | uniq -u | wc -l | tr -d '[:space:]'
}

filter_word_length() {
  local n=$1
  awk -F"," -v len="$n" '
# length($1) == len {
  length($2) == len && length($1) == len {
    print $1;
  }
  ' "${@:2}" | sortcount
}

filter_e161_length() {
  local n=$1
  awk -F"," -v len="$n" '
  length($2) == len && length($1) == len {
    print $2;
  }
  ' "${@:2}" | sortcount
}


#   
#   main program
#
   
for j in 500 1000 2000 4000 8000 16000; do
  e161=$(  cat data/d4* | filter_no_frags_length | head -$j)
  e161RO=$(cat data/d6* | filter_no_frags_length | head -$j)
  
  echo "words $j"
  printf '%s\t\t%s\t%s\t%s\t\t%s\t%s\n' 'len(wd)' 'x=#wd' '#enc' '#encRO' '%enc' '%encRO';
  
  # Example usage: filter $1 with length 5
  for ((i=1; i<= $wlc; i++)) do
    words=$( echo "$e161"   | filter_word_length  $i);
    e161_count=$(  echo "$e161"   | filter_e161_length  $i) ;
    e161RO_count=$(echo "$e161RO" | filter_e161_length  $i);
    
    e161_100=$((   (words * 100) / (e161_count == 0 ? 1 : e161_count)));
    e161RO_100=$(( (words * 100) / (e161RO_count == 0 ? 1 : e161RO_count)));
     
    printf "%d\t\t%d\t%d\t%d\t\t%d\t%d\n" "$i" "$words" "$e161_count"  "$e161RO_count" "$e161_100"  "$e161RO_100";
  done;

  words=0  # Initialize to 0
  e161_count=0
  e161RO_count=0
  
  for ((i=$wlc+1; i<=15; i++)); do
    words=$(( words  + $(echo "$e161"   | filter_word_length $i)))
    e161_count=$((  e161_count + $(echo "$e161"   | filter_e161_length $i)))
    e161RO_count=$((e161RO_count+ $(echo "$e161RO" |filter_e161_length $i)))
  done;

    e161_100=$((   (words * 100) / (e161_count == 0 ? 1 : e161_count)));
    e161RO_100=$(( (words * 100) / (e161RO_count == 0 ? 1 : e161RO_count)));
  # echo "$i  $words $e161  $e161RO";
  printf ">%d\t\t%d\t%d\t%d\t\t%d\t%d\n\n" "$wlc" "$words" "$e161_count"  "$e161RO_count" "$e161_100" "$e161RO_100";


done;
