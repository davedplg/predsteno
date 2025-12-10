#!/usr/bin/perl
use strict;
use warnings;

while (<>) {
    chomp;

    # Expect input: word,e161_frag,rank 
    
    my ($word,  $encFrag, $rank, $reformedLen,$aug,$phonic) = split /,/;
    
    # Validate input
    unless (defined $encFrag && defined $word && defined $rank) {
        warn "Skipping malformed line $.: $_\n";
        next;
    }
    unless ($encFrag =~ /^[1-8]+$/ ) {
        warn "Skipping invalid E.161 encoding in line $.: $encFrag \n";
        next;
    }
    unless ($rank =~ /^[0-9]+$/) {
        warn "Skipping invalid reorder column in line $.: $rank\n";
        next;
    }
       
      $encFrag =~ s/(\d)(\d)/$1 > $2 ? "$2$1" : "$1$2"/ge;
      print "$word,$encFrag,$rank,$reformedLen,$aug,$phonic\n";

    }
