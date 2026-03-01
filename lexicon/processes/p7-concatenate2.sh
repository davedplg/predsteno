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

# perl -i.bak -pe 's/EXPORT CONST RESERVECAPS={/\/\/export\nconst reservecaps={/' \
#   "$maj/js/$DICNAME/reservecaps.js"

##sub affixes in caps with plus and sometimes '
##sed -i  -f processes/affixes.sed data/o-*
#sed -i  -f affixes/affixes.sed data/o-*
#
# cat data/o-concateness.csv | awk  -FS"," -f sum-syns.awk | awk -v valcol=3 -f csv2js.awk | sed 's/texts=/dic=/'>  toptxts.js
# cat data/o-reserves.csv | awk  -FS"," -f sum-syns.awk | awk -v valcol=3 -f csv2js.awk |sed 's/texts=/reserves=/'  >  reservetxts.js
#sed -i '1r affixes/reserves_punc_numbers_and_affixes.js' reservetxts.js
# 
# cat data/o-concateness.csv | awk  -FS"," -f sum-syns.awk | awk -v valcol=4 -f csv2js.awk | sed 's/texts=/caps=/;s/.*/\U&/g'>  caps.js
## cat data/o-reserves.csv | awk  -FS"," -f sum-syns.awk | awk -v valcol=4 -f csv2js.awk |sed 's/texts=/reservecaps=/;s/.*/\U&/g'  >  reservecaps.js
#
#
#mkdir -p $maj/js/$DICNAME/js
#cp toptxts.js $maj/js/$DICNAME/toptxts.js
#cp caps.js $maj/js/$DICNAME/caps.js
#cp reservetxts.js $maj/js/$DICNAME/reserves.js
##cp reservecaps.js $maj/js/$DICNAME/reservecaps.js
#
#perl -i.bak -pe 's/export const dic={/\/\/export\nconst dic={/;s/#//g' $maj/js/$DICNAME/toptxts.js
#perl -i.bak -pe 's/export const reserves={/\/\/export\nconst reserves={/;s/#//g' $maj/js/$DICNAME/reserves.js
#perl -i.bak -pe 's/EXPORT CONST CAPS={/\/\/export\nconst caps={/' $maj/js/$DICNAME/caps.js
##perl -i.bak -pe 's/EXPORT CONST RESERVECAPS={/\/\/export\nconst reservecaps={/' $maj/js/$DICNAME/reservecaps.js
