#
#firstMapping='ABCDEFGHIJKLMNOPQRSTUVWXYZ'
#
#. go.sh 1 1 $firstMapping | tail -1 | sed "s/[a-z ]//g" > rejectCount.num
#
#swaps='RHINOSLD'
#

#!/bin/bash

# Initial setup
firstMapping='ABCDEFGHIJKLMNOPQRSTUVWXYZ'
swaps='RHINOSLD'
originalMapping="$firstMapping"
currentMapping="$firstMapping"

# Run initial go.sh to get baseline reject count
. ./go.sh 1 1 "$currentMapping" | tail -1 | sed "s/[a-z ]//g" > rejectCount.num
currentReject=$(cat rejectCount.num)

# Function to swap two characters in a string
swap_chars() {
    local str=$1
    local pos1=$2
    local pos2=$3
    local char1=${str:pos1:1}
    local char2=${str:pos2:1}
    # Replace char1 with a temp placeholder, then replace char2, then replace placeholder with char2
    echo "$str" | sed "s/$char1/0/g; s/$char2/$char1/g; s/0/$char2/g"
}

# Main loop for trying swaps
while true; do
    # Select two random distinct letters from swaps
    swaps_len=${#swaps}
    pos1=$((RANDOM % swaps_len))
    pos2=$((RANDOM % swaps_len))
    while [ $pos1 -eq $pos2 ]; do
        pos2=$((RANDOM % swaps_len))
    done
    char1=${swaps:pos1:1}
    char2=${swaps:pos2:1}

    # Perform swap on currentMapping
    newMapping=$(swap_chars "$currentMapping" $(expr index "$currentMapping" "$char1" - 1) $(expr index "$currentMapping" "$char2" - 1))

    # Run go.sh with new mapping
    . ./go.sh 1 1 "$newMapping" | tail -1 | sed "s/[a-z ]//g" > rejectCount.num
    newReject=$(cat rejectCount.num)

    # Compare reject counts
    if [ $newReject -lt $currentReject ]; then
        echo "Improved! Swap $char1 and $char2, reject count: $newReject (was $currentReject)"
        currentMapping="$newMapping"
        currentReject=$newReject
    else
        echo "No improvement. Swap $char1 and $char2, reject count: $newReject (kept $currentReject)"
        # No need to revert mapping since we didn't update currentMapping
    fi

    # Optional: Add a condition to stop, e.g., after a number of iterations or if reject count is 0
    if [ $currentReject -eq 0 ]; then
        echo "Optimal solution found with reject count 0"
        break
    fi

    # Optional: Pause to avoid rapid looping (adjust or remove as needed)
    sleep 1
done

# Output final mapping
echo "Final mapping: $currentMapping"
echo "Final reject count: $currentReject"

