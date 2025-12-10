#sub affixes in caps with plus and sometimes '
sed -i  -f processes/affixes.sed data/o-*

 cat data/o-concateness.csv | awk  -FS"," -f sum-syns.awk | awk -v valcol=3 -f csv2js.awk | sed 's/texts=/dic=/'>  toptxts.js
 cat data/o-reserves.csv | awk  -FS"," -f sum-syns.awk | awk -v valcol=3 -f csv2js.awk |sed 's/texts=/reserves=/'  >  reservetxts.js

 cat data/o-concateness.csv | awk  -FS"," -f sum-syns.awk | awk -v valcol=4 -f csv2js.awk | sed 's/texts=/caps=/;s/.*/\U&/g'>  caps.js
 cat data/o-reserves.csv | awk  -FS"," -f sum-syns.awk | awk -v valcol=4 -f csv2js.awk |sed 's/texts=/reservecaps=/;s/.*/\U&/g'  >  reservecaps.js


cp toptxts.js $maj/js/toptxts.js
cp caps.js $maj/js/caps.js
cp reservetxts.js $maj/js/reserves.js
cp reservecaps.js $maj/js/reservecaps.js

perl -i.bak -pe 's/export const dic={/\/\/export\nconst dic={/;s/#//g' $maj/js/toptxts.js
perl -i.bak -pe 's/export const reserves={/\/\/export\nconst reserves={/;s/#//g' $maj/js/reserves.js
perl -i.bak -pe 's/EXPORT CONST CAPS={/\/\/export\nconst caps={/' $maj/js/caps.js
perl -i.bak -pe 's/EXPORT CONST RESERVECAPS={/\/\/export\nconst reservecaps={/' $maj/js/reservecaps.js
