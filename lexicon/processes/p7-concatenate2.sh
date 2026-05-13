#!/usr/bin/env bash

# Replace affixes (old commented version left for reference)
sed -i -f affixes/affixes.sed data/o-*

# Top texts
cat data/o-concateness.csv |
  awk -F"," -f sum-syns.awk |
  awk -v valcol=3 -f csv2js.awk |
  sed 's/texts=/dic=/' \
  > toptxts.js

# Reserves
cat data/o-reserves.csv |
  awk -F"," -f sum-syns.awk |
  awk -v valcol=3 -f csv2js.awk |
  sed 's/texts=/reserves=/' \
  > reservetxts.js

# Add reserves prefix/punctuation/affixes content at the top
sed -i '1r affixes/reserves_punc_numbers_and_affixes.js' reservetxts.js

# Caps version (uppercase everything)
cat data/o-concateness.csv |
  awk -F"," -f sum-syns.awk |
  awk -v valcol=4 -f csv2js.awk |
  sed 's/.*/\U&/g;s/CONST TEXTS=/const caps=/; ' \
  > caps.js


# Create target directory
mkdir -p "$maj/js/$DICNAME/js"

# Copy files
cp toptxts.js    "$maj/js/$DICNAME/toptxts.js"
cp caps.js       "$maj/js/$DICNAME/caps.js"
cp reservetxts.js "$maj/js/$DICNAME/reserves.js"
 
rm -f toptxts.js
rm -f caps.js
rm -f reservetxts.js


