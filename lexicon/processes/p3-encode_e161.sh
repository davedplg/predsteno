#!/bin/bash
echo 
echo "# p3-encode_e161.sh #"
echo
echo "encode e161 numberpad"
echo "alphabet collapsed to digits"
echo
echo "capitalise,CAPITALISE"
echo "d4-e161.csv:"


#add homophone indices 
awk  -v field=3 -v OFS="," -F"," -f processes/count_homos.awk data/d3-reformed.csv data/d3-reformed.csv > data/temp
mv data/temp  data/d3-reformed.csv

awk -F"," -v OFS=',' '{
  word=$3;
  sub(/[0-9]+$/, "", word); 
  sub(/[A-Z]*!/, "", word); 
  len = length(word); 
  print $1, toupper($3), $2, len, $4, tolower($3) 
  }' data/d3-reformed.csv > data/d4-e161.csv
head -${HEADLINES:-${HEADLINES:-2000}} data/d4-e161.csv | tail -${TAILLINES:-10}
echo

#read -n 1 -s -r -p "Press any key"; clear

echo "translate uppercase to e.161-ish (e.161 - 1)"
echo 
mapping=${LETTERMAP:-'ABDEFGHIJKLMNOPRSTUVWYZ'}
#mapping='ABCJEZGHDIKLMWOXQRSTUVNPYF' 
echo "tr $mapping 1122233344455A666777888" | tee >> reserves.txt

tr $mapping '11222333444555666777888' < data/d4-e161.csv > temp
#tr $mapping '11122233344455566667888888' < data/d4-e161.csv > temp
#sed 's/[1-8]*!//;' temp > d4-e161.csv
mv temp data/d4-e161.csv
sed 's/[1-8A]*!//;s/![^,]*//;s/[^,]*!//' data/d4-e161.csv > temp
mv temp data/d4-e161.csv
head -${HEADLINES:-${HEADLINES:-2000}} data/d4-e161.csv | tail -${TAILLINES:-10}
echo 
 echo "#lines  $(wc -l data/d4*)"
#key2=$(echo "$a + $b + $c" | bc)
#key3=$(echo "$j + $e + $z" | bc)
#key4=$(echo "$g + $h + $d" | bc)
#key5=$(echo "$i + $k + $l" | bc)
#key6=$(echo "$m + $w + $o" | bc)
#key7=$(echo "$x + $q + $r + $s" | bc)
#key8=$(echo "$t + $u + $v" | bc)
#key9=$(echo "$n + $p + $y + $f" | bc)

echo
