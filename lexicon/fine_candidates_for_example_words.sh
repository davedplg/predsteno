#!/data/data/com.termux/files/usr/bin/bash
#some script to find common words with the phonic patterns and the marked-TO words


cat ../js/uni-8-select-3-homos/c*.js ../js/uni-8-select-3-homos/toptxts.js |
sort |
sed 's/[:",]//g;s/␣/ /g;/\^/d' |
awk '  
$2 {print $1"100",$2}
$3 {print $1"200",$3}
$4 {print $1"300",$4}
' |
sort -n |
awk '
BEGIN {
  last_frag = "";
  last_wd = "";
  }
{
 frag = $1;
 wd = $2;
  
 if(frag == last_frag) {
    print frag, wd, last_wd;
  }
    last_frag=frag;
    last_wd=wd;
}
' > temp
#set -x

phoneme2(){
#echo
#echo "phoneme2"
#echo $1 $2 $3 $4
command grep -e "$1"  temp | 
command grep -e "$2"  | 
command grep -v "$3"  | 
awk -v SOUND="$4->$2" -v SPELLING="$2" -v MAXLEN=$LEN \
'length($3) < MAXLEN  {printf "|%-7s|%-8s|%-8s|  \n", SOUND, $3, $2}'> pattern
cat pattern | wc -l
head -$HEAD pattern |  tail -$TAIL
}

phoneme(){
#echo
#echo "phoneme"
echo  "#### $4 $2"
#echo  "||[$4 → $2](#$4 $2)||"
#printf "|%-7s|%-8s|%-8s|  \n" $4 $2 '' 
#echo  "|:-----:|:------:|:------:|"
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
phoneme "A[^LEŘ]" "ā" "x" "Aā-us"

phoneme "E[^LEŘ]" e  "ãý" E
phoneme "E[^LEŘ]" ã  ìŕ E

phoneme "I[^LEŘ]" i x I

phoneme "O[^LẆOUEŘ]" o x O
phoneme "O[^LẆOUEŘ]" å år O

phoneme "U" u [őõ] U
phoneme "U" ő u U

echo  "|       |        |        |"
phoneme "UU[^LUEŘ]" ū x UU
phoneme "UU" ō x UU

phoneme "Ə"  . X Ə  
phoneme "Ə"  . á Ə  

echo  "| Vowel | Name   |        |"
echo  "|       |        |        |"

phoneme "AE" "â"  "âì"  AE
phoneme "AE" "âì" x     AE
phoneme "AE" ey   x     AE
phoneme "AE" [âã]ý   x     AE

phoneme "EE[^LEŘ]" êà x     EE
phoneme "EE[^LEŘ]" êè x     EE
phoneme "EE[^LEŘ]" ê  [àè]  EE
phoneme "EE[^LEŘ]" ý  X     EE

echo  "|       |        |        |"
phoneme "EE[^LEŘ]" ï x EE

phoneme "IE[^LEŘ]" î    X    IE
phoneme "IE[^LEŘ]" îè   X    IE
phoneme "IE[^LEŘ]" ùŷ   î    IE
phoneme "IE[^LEŘ]" ŷ    ùŷ   IE
phoneme "IE[^LEŘ]" îg0ħ X    IE

phoneme "OẆ" ô  w OW
phoneme "OẆ" ôw x OW
phoneme "OẆ" ôà x OW

phoneme "YOO" û x YOO
phoneme "YOO" ë x YOO

echo  "|R-marked|Vowels |        |"
echo  "|       |        |        |"

phoneme "AŘ" ār x   AR
phoneme "AŘ" ā  ār  AR-uk

phoneme "EŘ[^LEŘ]" èŕ x       ER
phoneme "EŘ[^LEŘ]" ìŕ ãìŕ     ER
phoneme "EŘ[^LEŘ]" ùŕ x       ER
phoneme "EŘ[^LEŘ]" ŕ [èìù]ŕ   ER

phoneme "OŘ" ø x  OR
phoneme "OŘ" ø ør OR
phoneme "OŘ" å ø  OR

echo  "|Rare    |Vowels |        |"
echo  "|       |        |        |"
#phoneme "EEŘ" ŕ  x EER
phoneme "EƏ"  [eã]ŕ          x EƏ
phoneme "EER" [eã]ŕ          x EER
phoneme "EƏ"  [eã][àèìòù]ŕ   x EƏ
phoneme "EER" [eã][àèìòù]ŕ   x EER

#phoneme "IEŘ" ŕ x IER
phoneme "IƏ" ŕ              x IƏ
phoneme "IƏ" [iėê]ŕ         x IƏ
phoneme "IƏ" [iėê][àèìòù]ŕ  x IƏ
phoneme "IER" [iėê][àèìòù]ŕ x IER

phoneme "OI" σy0  x OI
phoneme "OI" σì   x OI

phoneme "I[^LEŘ]" ẏ i I
echo  "|W sound|Vowels  |        |"
echo  "|       |        |        |"

phoneme "OU" õù x OU
phoneme "OU" õ  ù OU

phoneme  "OO" ö x OO
phoneme  "OO" ü x OO
phoneme  "OO" ë x OO


echo  "|Consonants|     |        |"
echo  "|       |        |        |"
phoneme "B" b x B

phoneme "K" c k C
phoneme "K" k c C

phoneme "D" d x D
phoneme "F" f x F

phoneme "G" g x G
phoneme "J" ĝ j J

phoneme "H" h  x H
phoneme "J" j  x J
phoneme "L" l  x L
phoneme "M" m  x M
phoneme "N" n  x N
phoneme "P" p  x P
phoneme "KW" . x QU
phoneme "R" r  x R

phoneme "S" ç s S
phoneme "S" s x S

phoneme "T" t x T
phoneme "V" v x V
phoneme "W" w x W

phoneme "KS" . [ck] X

phoneme "Y" y x Y

phoneme "Z" z x Z
phoneme "Z" ś x Z

echo  "|SH,CH  |TH,PH   |        |"
echo  "|       |        |        |"
phoneme "SH" ŝħ x SH
phoneme "SH" ŝ  ŝħ SH
phoneme "SH" .  ŝ  SH

phoneme "KH" ĉħ x CH
phoneme "KH" ĉ ĉħ CH
phoneme "KH" . ĉ  CH


phoneme "ΤĤ" τ  x TH

phoneme "TH" π  x TH

phoneme "F"  . f  F 

echo  "|Silent |Letters |        |"
echo  "|       |        |        |"
phoneme "[A-Z]" [0àèìòùħ] x 0 
phoneme "[A-Z]" "[0àèìòùħ]" x 0 
}

#LEN=6;HEAD=15;TAIL=15;
#makePhonemeTable 
#LEN=6;HEAD=25;TAIL=25;
LEN=6;HEAD=15;TAIL=15;
# phoneme IƏ    IƏ    "ėàŕ\|ėèŕ\|ėá\|iá\|ėŕ\|OIƏ"   IƏ--
#phoneme IƏ    IƏ    "ėàŕ\|ėèŕ\|iá"   IƏ--
phoneme IƏ    ėàŕ   X    IƏ
phoneme IƏ    ėŕ   X    IƏ
phoneme IƏ    ėèŕ   X    IƏ
LEN=8;HEAD=35;TAIL=35;
phoneme IƏ    ėá    X    IƏ
LEN=7;HEAD=15;TAIL=15;
#phoneme IƏ    iá    X    IƏ
phoneme "EEŘ" ãìŕ   X   air
phoneme "EEŘ" "EEŘ" ãìŕ air-no-air
LEN=8;HEAD=35;TAIL=35;
phoneme "EE" ý  X     EE
phoneme "KH" . ĉ   CH-ti
phoneme "KH" . ť[ùü]   CH-ti

phoneme "F"  . f  F-ph
phoneme "[A-Z]"  [àìèòù] "åù\|åw\|ìŕ\|ùŕ\|èŕ\|êà\|õù\|ōò\|ōù\|êè\|öù\|öò"  SilentVowels
phoneme "[A-Z]" [a-z]0  [rylgwk]0 Silent0


#makePhonemeTable 
