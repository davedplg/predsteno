BEGIN { 
  FS=","; 
  lst_frg="";
  wd="";
  aug="";
  caps="";
}

{ 
wd=$1;
frg=$2;
rnk=$3;
aug=$5;
caps=$6;

if (frg != lst_frg) { 
  print lst_frg,lst_wd,lst_aug,lst_caps;  
  lst_frg=frg; 
  lst_wd=wd; 
  lst_aug=aug;
  lst_caps=caps;
}
{
  if (wd != lst_wd ){
#    lst_wd  = lst_wd "-" wd;
#    lst_aug = lst_aug "-" aug;
#    lst_caps = lst_caps "-" caps;
    lst_wd  = lst_wd    "\u2423" wd;
    lst_aug = lst_aug   "\u2423" aug;
    lst_caps = lst_caps "\u2423" caps;
 }
  lst_frg=frg; 
#  print wd,frag,rnk;
}
}
