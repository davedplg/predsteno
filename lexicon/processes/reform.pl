use utf8;
binmode STDOUT, ':utf8';


while (<>) {
    chomp;

    $_  =~ s/WÅTÈŔ/WÅXXXTX/g;
    $_  =~ s/WĦÅT/WOT/g;
    $_  =~ s/WĦ*ÅL(?!0)/WOL/g;
    $_  =~ s/WĦ*ÅL0/WÅXXX/g;
    $_  =~ s/WĦ*ÅR/WÅXXXR/g;
    $_  =~ s/WĦ*Å(?!XXX)/WO/g;
    $_  =~ s/XXX//g;

    my $lineUK=$_;
    my $lineUS = $_;
    my $two_lines=+0;

#   if(/[ØĀÅ](?!R)/){  all 
    if(/[ØĀÅ](?!R)/){
       $lineUS    =~ s/Ø(?!R)/O/g;
       $lineUS    =~ s/Ā(?!R)/A/g;
       $lineUS    =~ s/Å(?!R)/O/g;
       $two_lines=+1;
       }

       #     if(/(?<!W)Å(?!R)/){
       #       $lineUS    =~ s/Å(?!R)/O/g;
       #       $two_lines=+1;
       #       }

     if(/[TDN]ËW0(?!ŔÈ[Ś]*,)/){
       $lineUS    =~ s/([TDN])ËW0/$1Ü/g;
       $two_lines=+1;
       }

     if(/[TDN]Û(?!ŔÈ[Ś]*,)/){
       $lineUS    =~ s/([TDN])Û/$1Ü/g;
       $two_lines=+1;
       }

     if(/SÛM/){
       $lineUS    =~ s/SÛM/SOOM/g;
       $two_lines=+1;
       }

     if(/WĦ?ÅRR/){
       $lineUK   =~  s/WÅRR/WOR/g;
       $lineUS   =~  s/WÅRR/WOŘ/g;
       $two_lines=+1;
      }
#
#    if(/WĦ?ÅL[0]/){
#       $lineUK   =~  s/W(Ħ)*ÅL[0]/W\1ORL/g;
#       $two_lines=+1;
#     }
#
#    if(/WĦ?Å[^RL]/){
#       $lineUK   =~  s/W(Ħ)*Å/W\1O/g;
#       $two_lines=+0;
#     }

     #    if(/WÅTÈŔ/){
     #       $lineUK   =~  s/WOTÈŔ/WORTƏ/g;
     #       $lineUS   =~  s/WOTÈŔ/WOTƏ/g;
     #       $two_lines=+1;
     #       }

      if($two_lines){
       #
       print nonRhoticUK($lineUS), "\n";
#      print $lineUS, "\n";  # temp test
       }

       print nonRhoticUK($lineUK), "\n";
}



sub nonRhoticUK {
  my ($text) = @_;

#  $text =~  s/WĦ?ÅL/WOL/g;
   $text =~  s/[ÀÈÌÒÙĦ]|[A-Z]0//g;
   $text =~  s/ØÙ?Ò?R?#?|Å/OŘ/g;
   $text =~  s/([A-Z])\1/$1/g;
   $text =~  s/Ö|Ü/OO/g;
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
   $text =~  s/([TDN])Ë/$1YOO/g;
   $text =~  s/([^TDN])Ë/$1OO/g;
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
   $text =~  s/Ə/X/g;
   $text =~  s/([^,]{2})Ŕ\b/$1X/g;
   $text =~  s/([^,]{2})ŔŚ\b/$1XZ/g;
   $text =~  s/([^,]{2})ŔD\b/$1XD/g;
   $text =~  s/Ŕ/EŘ/g;
#  $text =~  s/ĀR/AŘ/g;
   $text =~  s/ĀR?#?/AŘ/g;
   $text =~  s/[A-Z]0//g;
   $text =~  s/,Ė([^A-E])/,X$1/g;
   $text =~  s/Ė([A-E])/I$1/g;
   $text =~  tr/ÁÉÍÓÚ/XXXXX/;
   $text =~  tr/ĜΜĖẎÞÇQĴĨŚŐΥÐ/JIIIFSKYYZUWT/;
   $text =~  s/WW/W/g;
   $text =~  s/UUR/OŘ/g;
   $text =~  s/DUERING/DOŘING/g;
   $text =~  s/YY/Y/g;
   $text =~  s/YOOX,/YX,/g;
   $text =~  s/YOOXZ,/YXZ,/g;
   $text =~  s/IEŘ/IX/g;
 
  return $text;

}
