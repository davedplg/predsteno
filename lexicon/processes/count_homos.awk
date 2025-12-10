
#!/usr/bin/awk -f

# Usage: awk -v field=3 -v OFS="," -F"," -f this_script.awk your_file.txt your_file.txt > output.txt
# Note: Feed the file TWICE (as the last two args) for the two-pass logic.
# Replace '3' with your desired field number (1-based).
# First pass: Counts total occurrences per word.
# Second pass: If total >1 (has homophones/duplicates), numbers sequentially starting from 1; else, leaves plain.

BEGIN {
    # No initialization needed
}

NR == FNR {
    # First pass: Build total counts for words in the specified field
    word = $field
    total_count[word]++
    next
}

{
    # Second pass: Process the line
    word = $field
    
    # Check if this word has homophones (total occurrences >1)
    if (total_count[word] > 1) {
        # Increment running count for this word (starts from 1 on first occurrence here)
        running_count[word]++
        new_word = word "" running_count[word]
    } else {
        # Unique word: leave plain
        new_word = word
    }
    
    # Replace the original field with the new word
    $field = new_word
    
    # Print the modified line (uses OFS for comma-separated output)
    print
}

END {
    # Optional: Print summary of totals if desired
    # for (w in total_count) {
    #     print "Word '" w "' total: " total_count[w] " (numbered: " (total_count[w] > 1 ? "yes" : "no") ")"
    # }
}

