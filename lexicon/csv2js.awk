BEGIN {
#    FS=","; # comma-separated input
    print "export const texts={"; # Start JSON array
    first = 1;
}
NR > 1 { # Skip header if present; adjust if no header
    if (!first) print ","; # Comma between objects
    first = 0;
    printf "   \"%s\": \"%s\"", $1, $valcol;
#   printf "   \"%s\": \"%s\"", $1, $3;
}
END {
    print "\n}"; # Close JSON array
}
