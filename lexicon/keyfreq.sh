 head -15000 data/d3-reformed.csv | awk -F"," '{print $3}' | sed -f sed.pat | sort | uniq -c | sort
