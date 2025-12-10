#!/bin/bash
sort -t, -k2,2n -k3,3n data/d6-e161FragReordered.csv | awk -F, '
BEGIN { FS=",";OFS="\t"; count=1; prv_enc="" }
{ word=$1; enc=$2+0; rank=$3+0 }
#/^\w+,[0-9]+,[0-9]+$/ 
{
  count = enc != prv_enc ? 1 : count+1;
  print word, enc, rank, count
  prv_enc = enc
}'
