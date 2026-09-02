#!/data/data/com.termux/files/usr/bin/bash
# some script to find common words with the phonic patterns and the marked-TO words


#cat ../js/uni-8-select-3-homos/c*.js ../js/uni-8-select-3-homos/toptxts.js |
#sort |
#sed 's/[:",]//g;s/␣/ /g;/\^/d' |
#awk '  
#$2 {print 100$1,$2}
#$3 {print 200$1,$3}
#$4 {print 300$1,$4}
#' |
#sort -n |
#awk '
#BEGIN {
#  last_frag = "";
#  last_wd = "";
#  }
#{
# frag = $1;
# wd = $2;
#  
# if(frag == last_frag) {
#    print frag, wd, last_wd;
#  }
#    last_frag=frag;
#    last_wd=wd;
#}
#' > temp
#set -x

phoneme2(){
#echo
#echo "phoneme2"
#echo $1 $2 $3 $4
command grep -e "$1"  temp | 
command grep -e "$2"  | 
command grep -v "$3"  | 
awk -v SOUND="$4->$2" -v SPELLING="$2" -v MAXLEN=$LEN \
'length($3) < MAXLEN  {printf "|%-7s|%-8s|%-8s|  \n", SOUND, $3, $2}'| 
head -$HEAD |  tail -$TAIL
}

phoneme(){
#echo
#echo "phoneme"
echo  "#### $4 $2"
#echo  "||[$4 → $2](#$4 $2)||"
printf "|%-7s|%-8s|%-8s|  \n" $4 $2 '' 
echo  "|:-----:|:------:|:------:|"
#echo "[$1] [$2] [$3] [$4]"
soundFromStart=" $1"  
notSoundFromStart="[^ ]$1"  
#echo "notSoundFromStart$notSoundFromStart"
#echo "soundFromStart$soundFromStart"
phoneme2 "$soundFromStart" "$2" "$3" "$4"
echo  "|       |        |        |"
phoneme2 "$notSoundFromStart" "$2" "$3" "$4"
}

makePhonemeTable(){
echo  "| Short |Vowels  |        |"
echo  "|       |        |        |"
phoneme "A[^LEŘ]" "a" "x" "A"

phoneme "E[^LEŘ]" e  "ãý" E
phoneme "E[^LEŘ]" ã  ìŕ E

phoneme "I[^LEŘ]" i x I

phoneme "O[^LẆOUEŘ]" o x O

phoneme "U" u [őõ] U-test[őõ]
phoneme "U" ő u U-test

echo  "|       |        |        |"
phoneme "UU[^LUEŘ]" ū x UU
phoneme "UU" ō x UU

phoneme "Ə"  . X Ə  
phoneme "Ə"  . á Ə  

echo  "| Vowel | Name   |        |"
echo  "|       |        |        |"

phoneme "AE" "â" "âì" "AE"
phoneme "AE" ey âì AE

phoneme "EE[^LEŘ]" êà x EE
phoneme "EE[^LEŘ]" êè x EE
phoneme "EE[^LEŘ]" ê  [àè] EE
phoneme "EE[^LEŘ]" ý ê EE

echo  "|       |        |        |"
phoneme "EE[^LEŘ]" ï x EE

phoneme "IE[^LEŘ]" î  [èħ] IE
phoneme "IE[^LEŘ]" îè x IE
phoneme "IE[^LEŘ]" ùŷ î IE
phoneme "IE[^LEŘ]" ŷ  ùŷ IE
phoneme "IE[^LEŘ]" îg0ħ x IE
phoneme "IE[^LEŘ]" . î IE-test

phoneme "OẆ" ô  w OW
phoneme "OẆ" ôw x OW
phoneme "OẆ" ôà x OW

phoneme "YOO" û x YOO

echo  "|R-marked|Vowels |        |"
echo  "|       |        |        |"

phoneme "AŘ" ār x AR
phoneme "AŘ" ā ār AR

phoneme "EŘ[^LEŘ]" èŕ x   ER
phoneme "EŘ[^LEŘ]" ìŕ ãìŕ ER
phoneme "EŘ[^LEŘ]" ùŕ x   ER

phoneme "OŘ" ø x  OR
phoneme "OŘ" ø ør OR

echo  "|Rare    |Vowels |        |"
echo  "|       |        |        |"
#phoneme "EEŘ" ŕ  x EER
phoneme "EƏ" eŕ   x EER
phoneme "EƏ" eìŕ  x EER
phoneme "EƏ" ãìŕ  x EER
phoneme "EƏ" ãŕare    
phoneme "EƏ" eàŕ  x EER

#phoneme "IEŘ" ŕ x IER
phoneme "IƏ" ŕ x IER
phoneme "IƏ" êàŕ x IER

#phoneme "EEEŘ" ŕ x EEER
phoneme "EEƏ" ŕ x EEER
phoneme "EEƏ" êàŕ x IER

phoneme "OI" σy0 x OI
phoneme "OI" σì x OI

phoneme "I[^LEŘ]" ẏ i I
echo  "|W sound|Vowels  |        |"
echo  "|       |        |        |"

phoneme "OU" õù x OU
phoneme "OU" õ  ù OU

phoneme  "OO" ö û OO
phoneme  "OO" ü û OO


echo  "|Consonants|     |        |"
echo  "|       |        |        |"
phoneme "B" b x B

phoneme "K" c k C
phoneme "K" k c C

phoneme "D" d x D
phoneme "F" f x F

phoneme "G" g x G
phoneme "J" ĝ j J

phoneme "H" h x H
phoneme "J" j x J
phoneme "L" l x L
phoneme "M" m x M
phoneme "N" n x N
phoneme "P" p x P
phoneme "R" r x R

phoneme "S" ç s S
phoneme "S" s x S

phoneme "T" t x T
phoneme "V" v x V
phoneme "W" w x W
phoneme "W" ə w W
phoneme "Y" y x Y

phoneme "Z" z x Z

phoneme "Z" ś x Z

echo  "|SH,CH  |TH,PH   |        |"
echo  "|       |        |        |"
phoneme "SH" ŝ ŝħ SH
phoneme "SH" ŝħ x SH
phoneme "SH" . ŝħ SH-test

phoneme "KH" [əàèìòù] ĉħ KH
phoneme "KH" . ĉħ KH-test
phoneme "KH" "." ĉħ KH-test
phoneme "KH" ĉħ x KH
phoneme "KH" ĉ ĉħ KH

phoneme "KW" . x KH

phoneme "KS" . [ck] KS

phoneme "TH" τ  x TH-vc

phoneme "TH" π  x TH

phoneme "F" g0ħ f F 

echo  "|Silent |Letters |        |"
echo  "|       |        |        |"
phoneme "[A-Z]" [0àèìòùħ] x 0 
phoneme "[A-Z]" "[0àèìòùħ]" x 0 
}

#LEN=6;HEAD=15;TAIL=15;
#makePhonemeTable 
LEN=6;HEAD=25;TAIL=25;
makePhonemeTable 
