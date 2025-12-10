#!/bin/bash
#source ~/.bashrc
echo "This is a web app for predictive text input" > temp
echo "It uses a similar encoding to the e161 numpad" >> temp
echo "Which maps the alphabet to 8 digits 2-9" >> temp
echo "This app dictionary toptxts.js maps to 1-9" >> temp
echo "but reorders pairs of digit ascending where pairs exist" >> temp
echo "trailing odd digits are not reordered" >> temp
echo "The dictionry contains fragmets so common words are recognised before the entire word is typed" >> temp
echo "single letter fragments offer 3 candidate words" >> temp
echo "all other fragment lengths offer 2 candidates" >> temp
echo "if the user cant find the word they are after" >> temp
echo "they press b and 4 reserve words are placed hyphenated in the text" >> temp
echo "all candidates are ordered by frequency to present the most usefulwords to the typist as soon as possible" >> temp
echo "After two carriage returns, each paragraph the paragraph is sent fo a secnod parse that allows a user to choose from the reserve list or type in missed words in qwerty" >> temp
echo  >> temp
echo "here is readme file" >> temp
cat README.md >> temp
echo "here is the DOM manipulation function javascript file" >> temp
cat js/uiUtils.js >> temp
echo "here is the main javascript file to the app" >> temp
cat js/script.js >> temp
echo "here is the index.html file" >> temp
cat mappings/v1/index.html >> temp
echo "here is the mappings.js file that organised keyboard mappings and chords" >> temp
cat mappings/v1/mappings.js >> temp
echo "here is the style sheet styles.css" >> temp
cat styles/styles.css >> temp
echo "here is a snippet of the dictionary file toptxts.js" >> temp
head -200 js/toptxts.js  >> temp
echo "here is a snippet of the reserves file reerves.js" >> temp
head -200 js/reserves.js  >> temp
cat temp | termux-clipboard-set
#rm temp
