#!/usr/bin/perl

use strict;
use warnings;
use utf8;
binmode STDOUT, ':utf8';

while (<>) {
    chomp;
     s/[ÀÈÌÒÙĦ]|[A-Z]0//g;
#    s/ØÙ?Ò?R?#?|Å/AW/g;
     s/ØÙ?Ò?R?#?|Å/AẆ/g;
#    s/ØÙ?Ò?R?#?|Å/OR/g;ř ẇ ġ ḩ υ Ř Ẇ ĠḨ Υ


#    s/ØÙ?Ò?R?#?|Å/AU/g;
     s/([A-Z])\1/$1/g;
#    s/Ö|Ü|Ë/EW/g;
     s/Ö|Ü|Ë/OO/g;
     s/U~/Õ/g;
     s/U=/Ô/g;
#    s/Õ/OU/g;
#    s/Õ/OW/g;
     s/Õ/OẆ/g;
     s/ẆW/Ẇ/g;
#    s/Σ/OY/g;
     s/Σ/OI/g;
     s/O#/O/g;
     s/Z#/J/g;
     s/ŌŪ?/UU/g;
     s/Ū/UU/g;
#    s/ÃÝ|EĨ/EY/g;
     s/ÃÝ|EĨ/AE/g;
     s/Ã#?/E/g;
     s/[ĔÂ]/AE/g;
#    s/[ĔÂ]/EY/g;
     s/[ÊÏÝ]/EE/g;
#    s/[ÊÏÝ]/IY/g;
#    s/[ÊÏÝ]/EA/g;
     s/Ô/OE/g;
     s/Û/UE/g;
     s/[ÎŶ]/IE/g;
#    s/[ÎŶ]/UY/g;
#    s/[ÎŶ]/II/g;
#    s/[ÎŶ]/YY/g;
     s/ÑK/NK/g;
     s/NGK/NK/g;
     s/Ñ/NG/g;
     s/NGG/NG/g;
#    s/Ŕ,/A,/g;
#    s/Ŕ/IR/g;
#     s/ĀR?#?/AR/g;
     s/ĀR?#?/AŘ/g;
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
#     s/Ŕ/UR/g;
     s/Ŕ/UŘ/g;
#    s/Ŕ/ER/g;
#    s/Ŕ/IR/g;
#     s/ĀR?#?/AR/g;
     s/ĀR?#?/AŘ/g;
     s/[A-Z]0//g;
     s/X/KS/g;
    tr/ÁÉÍÓÚ\
      /AEIOU/;
#     /X/;
#     /C/;
    tr/ĜΜĖẎÞÇQĴĨŚŐΥÐ\
      /JIIIFSKYYZUWT/;
     s/WW/W/g;
#    s/UUR/AW/g;
     s/UUR/AẆ/g;
#    s/DUERING/DAWING/g;
     s/DUERING/DAẆING/g;
     s/YY/Y/g;
#      /jjjjeiifaeiouszkyyzuaeiouw/;
    print "$_\n";
}
