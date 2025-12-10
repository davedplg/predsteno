#!/usr/bin/perl

use strict;
use warnings;
use utf8;
binmode STDOUT, ':utf8';

while (<>) {
    chomp;
     s/[ÀÈÌÒÙĦ]|[A-Z]0//g;
     s/ØÙ?Ò?R?#?|Å/AW/g;
#    s/ØÙ?Ò?R?#?|Å/OR/g;
#    s/ØÙ?Ò?R?#?|Å/AU/g;
     s/([A-Z])\1/$1/g;
#    s/Ö|Ü|Ë/EW/g;
     s/Ö|Ü|Ë/OO/g;
     s/U~/Õ/g;
     s/U=/Ô/g;
#    s/Õ/OU/g;
     s/Õ/OW/g;
#    s/Σ/OY/g;
     s/Σ/OI/g;
     s/O#/O/g;
     s/Z#/J/g;
     s/ŌŪ?/UU/g;
     s/Ū/UU/g;
     s/ÃÝ|EĨ/EY/g;
     s/Ã#?/E/g;
#    s/[ĔÂ]/AE/g;
     s/[ĔÂ]/EY/g;
#    s/[ÊÏÝ]/EE/g;
     s/[ÊÏÝ]/IY/g;
     s/Ô/OE/g;
     s/Û/UE/g;
#    s/[ÎŶ]/IE/g;
     s/[ÎŶ]/UY/g;
     s/ÑK/NK/g;
     s/NGK/NK/g;
     s/Ñ/NG/g;
     s/NGG/NG/g;
#    s/Ŕ,/A,/g;
#    s/Ŕ/IR/g;
     s/ĀR?#?/AR/g;
     s/[ŜĆŢ]/SH/g;
     s/C/K/g;
     s/[ĈŤ]|CH/KH/g;
     s/[ΠΤ]/TH/g;
#    s/[Τ]/DH/g;
#     s/[Τ]/ZH/g;
#     s/[Π]/TH/g;
#    s/([^,]{2})Ŕ(Ś)*\b/$1A$2/g;
     s/([^,]{2})Ŕ\b/$1A/g;
     s/([^,]{2})ŔŚ\b/$1AZ/g;
     s/Ŕ/UR/g;
#    s/Ŕ/ER/g;
#    s/Ŕ/IR/g;
     s/ĀR?#?/AR/g;
     s/ĀR?#?/AR/g;
     s/[A-Z]0//g;
     s/X/KS/g;
    tr/ÁÉÍÓÚ\
      /AEIOU/;
#     /X/;
#     /C/;
    tr/ĜΜĖẎÞÇQĴĨŚŐΥÐ\
      /JIIIFSKYYZUWT/;
     s/WW/W/g;
#      /jjjjeiifaeiouszkyyzuaeiouw/;
    print "$_\n";
}
