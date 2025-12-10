#!/bin/sh
grep "èŕ\b" data/d1* | sed 's/\([^"]\{2\}\)èŕ\b/\1a/g'   
