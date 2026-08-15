#!/usr/bin/perl

use strict;
use warnings;
use utf8;
binmode STDOUT, ':utf8';

while (<>) {
    chomp;

    #     if(/Å(?!R)/){
    #         
    #       my $line=$_;
    #       my $line2 = $line;
    #       $line2    =~ s/Å/O/;
    #       print simplesubs($line), "\n";
    #       print simplesubs($line2), "\n";
    #       } else {
    #       print simplesubs($_), "\n";
    #       }


       my $line=$_;
       my $line2 = $line;
       my $two_lines=0;

     if(/Å(?!R)/){
       $line2    =~ s/Å(?!R)/O/g;
       $two_lines=1;
       }

     if(/Ā(?!R)/){
       $line2    =~ s/Ā(?!R)/A/g;
       $two_lines=1;
       }

     if(/Ø(?!R)/){
       $line2    =~ s/Ø(?!R)/O/g;
       $two_lines=1;
       }

     if($two_lines){
       print simplesubs($line2), "\n";
       }

       print simplesubs($line), "\n";
}



sub simplesubs {
  my ($text) = @_;
   $text =~  s/[ÀÈÌÒÙĦ]|[A-Z]0//g;
   $text =~  s/ØÙ?Ò?R?#?|Å/OŘ/g;
   $text =~  s/([A-Z])\1/$1/g;
   $text =~  s/Ö|Ü|Ë/OO/g;
   $text =~  s/U~/Õ/g;
   $text =~  s/U=/Ô/g;
   $text =~  s/Õ/OU/g;
   $text =~  s/ẆW/Ẇ/g;
   $text =~  s/Σ/OI/g;
   $text =~  s/O#/O/g;
   $text =~  s/Z#/J/g;
   $text =~  s/ŌŪ?/UU/g;
   $text =~  s/Ū/UU/g;
   $text =~  s/ÃÝ|EĨ|EY|[ĔÂ]/AE/g;
   $text =~  s/Ã#?/E/g;
   $text =~  s/[ÊÏÝ]/EE/g;
   $text =~  s/Ô/OẆ/g;
   $text =~  s/Û/YOO/g;
   $text =~  s/[ÎŶ]|UY/IE/g;
   $text =~  s/ÑK/NK/g;
   $text =~  s/NGK/NK/g;
   $text =~  s/Ñ/NG/g;
   $text =~  s/NGG/NG/g;
   #   $text =~  s/ĀR?#?/AŘ/g;# us/uk split 
   #   $text =~  s/ĀR?#?/AŘ/g;# us/uk split 
   $text =~  s/[ŜĆŢ]/SH/g;
   $text =~  s/C/K/g;
   $text =~  s/[ĈŤ]|CH/KH/g;
   $text =~  s/Π/TH/g;
   $text =~  s/Τ/ΤĤ/g;
   $text =~  s/X/KS/g;
   $text =~  s/([^,]{2})Ŕ\b/$1X/g;
   $text =~  s/([^,]{2})ŔŚ\b/$1XZ/g;
   $text =~  s/Ŕ/ER/g;
#  $text =~  s/ĀR/AŘ/g;
   $text =~  s/ĀR?#?/AŘ/g;
   $text =~  s/[A-Z]0//g;
   $text =~  tr/ÁÉÍÓÚ/XXXXX/;
   $text =~  tr/ĜΜĖẎÞÇQĴĨŚŐΥÐ/JIXIFSKYYZUWT/;
   $text =~  s/WW/W/g;
   $text =~  s/UUR/OŘ/g;
   $text =~  s/DUERING/DOŘING/g;
   $text =~  s/YY/Y/g;
 
  return $text;

}
