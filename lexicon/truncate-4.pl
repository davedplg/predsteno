#!/usr/bin/perl
use strict;
use warnings;

while (<>) {
    chomp;

    # Expect input: word,orig_e161, rank 
    
    my ($word, $orig_e161, $rank,$reformedLen,$aug,$phonic) = split /,/;
    
    # Validate input
    unless (defined $orig_e161 && defined $word && defined $rank) {
        warn "$_ \nSkipping malformed line $.: $_\n";
        next;
    }
    unless ($orig_e161 =~ /^[1-8]+$/ ) {
        warn "$_  \nSkipping invalid E.161 encoding in line $.: $orig_e161 \n";
        next;
    }
    unless ($rank =~ /^[0-9]+$/) {
        warn "$_  \nSkipping invalid reorder column in line $.: $rank\n";
        next;
    }
    

    #    for my $len (1..length($word)) {
    for my $len (1..$reformedLen) {
      my $fragment = substr($orig_e161, 0, $len);
      my $reordered_part = $fragment;
      my $line = "$word,$fragment,$rank,$reformedLen,$aug,$phonic";
    print "$line\n";
  }
    }
