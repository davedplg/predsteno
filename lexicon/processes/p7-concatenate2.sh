#sub affixes in caps with plus and sometimes '
#sed -i  -f processes/affixes.sed data/o-*
sed -i  -f affixes/affixes.sed data/o-*

 cat data/o-concateness.csv | awk  -FS"," -f sum-syns.awk | awk -v valcol=3 -f csv2js.awk | sed 's/texts=/dic=/'>  toptxts.js
 cat data/o-reserves.csv | awk  -FS"," -f sum-syns.awk | awk -v valcol=3 -f csv2js.awk |sed 's/texts=/reserves=/'  >  reservetxts.js
sed -i '1r affixes/reserves_punc_numbers_and_affixes.js' reservetxts.js
 
 cat data/o-concateness.csv | awk  -FS"," -f sum-syns.awk | awk -v valcol=4 -f csv2js.awk | sed 's/texts=/caps=/;s/.*/\U&/g'>  caps.js
# cat data/o-reserves.csv | awk  -FS"," -f sum-syns.awk | awk -v valcol=4 -f csv2js.awk |sed 's/texts=/reservecaps=/;s/.*/\U&/g'  >  reservecaps.js


mkdir -p $maj/js/$DICNAME/js
cp toptxts.js $maj/js/$DICNAME/toptxts.js
cp caps.js $maj/js/$DICNAME/caps.js
cp reservetxts.js $maj/js/$DICNAME/reserves.js
#cp reservecaps.js $maj/js/$DICNAME/reservecaps.js

perl -i.bak -pe 's/export const dic={/\/\/export\nconst dic={/;s/#//g' $maj/js/$DICNAME/toptxts.js
perl -i.bak -pe 's/export const reserves={/\/\/export\nconst reserves={/;s/#//g' $maj/js/$DICNAME/reserves.js
perl -i.bak -pe 's/EXPORT CONST CAPS={/\/\/export\nconst caps={/' $maj/js/$DICNAME/caps.js
#perl -i.bak -pe 's/EXPORT CONST RESERVECAPS={/\/\/export\nconst reservecaps={/' $maj/js/$DICNAME/reservecaps.js
