#!/bin/bash

echo
echo "# p6-concatenate.sh #"
echo "merge two most frequent words of each frag"
echo " This may have long hyphenated lists as I"
echo " Work out how to do this"
echo
awk -F"," -v OFS="," '{$3 = int($3*10.5/$4); print $0}' data/d6* | \
#sort -t"," -k2,2n -k3,3n data/d6* | \
sort -t"," -k2,2n -k3,3n  | \
awk -F"," -v OFS="," '
BEGIN {
  # frg_cnt is count of printed words with this fragment encoding
  # wdPrntd  is list of words printed so far
}
  
{
  wd     = $1; # word
  frg    = $2; # encoded fragment
  rnk    = $3; # frequency rank
  refLen = $4; # reformed word length
  n   = 2    # number of words offered to user
  res = 7    # second pass rows

  if(length(frg) == 2) { n=4;} 
  if(length(frg) == 1) { n=4;} 
 
# print  word if new and frag has only been seen once before
   {print "input row: "$0;}
 
   if (wdPrntd[wd] != 1) {
   if (frg_cnt[frg] < n) { 
     print         $0;
     wdPrntd[wd]  =  1; 
     frg_cnt[frg]++;
     } else      { 
#       if(length(frg) == length(wd)){
       if(length(frg) == refLen){
       if(frg_cnt[frg] < n + res ){
         print $0",reserve row " frg_cnt[frg]-n+1": ";
       } else {
         print $0",reject row: ";
       }
       frg_cnt[frg]++;

  }
}
}
}

' > data/d7-ready4hyphenation.csv
cat data/d7-ready4hyphenation.csv | \
grep -v input | \
head -${HEADLINES:-2000}|\
tail -${TAILLINES:-300}   | \
grep -v 888888 | \
sed 's/,/\t/g' 
  
  # record final distribution of words (eg concatenees, reserve list second parse candidates, and rejected words)
  echo | tee >> reserves.txt 
  
  file="data/d7-ready4hyphenation.csv"
  {
    echo "accepted words $(grep -v ' row' "$file" | wc -l)"
    for i in {1..7}; do
      echo "reserve word $i $(grep "reserve row $i" "$file" | wc -l)"
    done
    echo "rejected words $(grep 'reject row' "$file" | wc -l)"
  } >> reserves.txt
  
  grep -v      ' row'   data/d7-ready4hyphenation.csv > data/o-concateness.csv
  grep    'reserve row' data/d7-ready4hyphenation.csv | sed 's/reserve row/rr/' > data/o-reserves.csv
  grep    'reject row'  data/d7-ready4hyphenation.csv | sed 's/reject row/rr/'> data/o-rejects.csv
  #
