
#!/bin/bash

#ABCJEZGHDIKLMWOXQRSTUVNPYF 
# Initial setup
#ABCJEZGHRIKLMWSXQONTUVDPYF
#OBCJEZGHRIKLMWSXQANTUVDPYF
#OBDJEZGHRIKLCWSXQANTMVUPYF
#OVDJEZGHRIKLCWSXQANTPBUMYF
# ETAONRIS HDLFCMUG YPWBVKJX ZQ", 
# ETAO NRISHDLF CMUGYPWB VKJXZQ", 


firstMapping=''
firstMapping='OVDLEFGHRIJMCPSXQANTKZUWYB'
firstMapping='OVDLEFGHRIJMCPSXQANTKZUWYB'
firstMapping='ABCDEFGHIJKLMNOPQRSTUVWXYZ'
firstMapping='ABCDEFGHIJKLMNSPQROTUVWXYZ'
firstMapping='EBCDAFGHSJKLMRIPQNOTUVWXYZ'
firstMapping='ABCDEFGHIJKLMNOPQRSTUVWXYZ'
firstMapping='EBCDAFGHTJKLMNOPQSIRUVWXYZ'
firstMapping='EYCDAFGHTJBLMNOPQSIRUVWXKZ'
firstMapping='EYCMAFGHTJBLDNOPQSIRUVWXKZ'
firstMapping='EYBMAFGHTJULDNOPQSIRCVWXKZ'
firstMapping='EYBMAFGHTJULDNOPQSIRCZWXKV'
firstMapping='EYBMAFGHTJULCNOPQSIRDZWXKV'
firstMapping='EYBMAFGHTZUWVNOPQSIRDJLXKC'
firstMapping='ABDEFGHIJKLMNOPRSTUVWYZ'





swaps='CMUGYPWB'
swaps='HDLFCMUG'
swaps='NRISHDLF'
swaps='ETAONRIS' #start
swaps='ZQETAO'
swaps='VKJXZQ'
swaps='YPWBVKJX'
swaps='ETAONRISHDLFMUGYPWBVKJZ'

currentMapping="$firstMapping"

# Run initial go.sh to get baseline reject count
. ./go.sh 1 1 "$currentMapping" | tail -1 | sed "s/ .*//g" > rejectCount.num
currentReject=$(cat rejectCount.num)
cat rejectCount.num
# Initialize iterationhistory file
echo "Initial mapping: $currentMapping, Reject count: $currentReject" >> iterationhistory

# Function to swap two characters in a string
swap_chars() {
    local str=$1
    local pos1=$2
    local pos2=$3
    local char1=${str:pos1:1}
    local char2=${str:pos2:1}
    echo "$str" | sed "s/$char1/0/g; s/$char2/$char1/g; s/0/$char2/g"
}

# Track visited mappings to avoid cycles
declare -A visitedMappings
visitedMappings["$currentMapping"]=1

# Main loop
while true; do
    improved=false
    bestReject=$currentReject
    bestMapping="$currentMapping"

    # Try all possible swaps systematically
    for ((i=0; i<${#swaps}-1; i++)); do
        for ((j=i+1; j<${#swaps}; j++)); do
            char1=${swaps:i:1}
            char2=${swaps:j:1}

            # Perform swap on currentMapping
            newMapping=$(swap_chars "$currentMapping" $(expr index "$currentMapping" "$char1" - 1) $(expr index "$currentMapping" "$char2" - 1))

            # Skip if mapping has been visited
            if [[ -n "${visitedMappings[$newMapping]}" ]]; then
                echo "Skipping visited mapping: $newMapping"
                continue
            fi

            # Run go.sh with new mapping
            . ./go.sh 1 1 "$newMapping" | tail -1 | sed "s/ .*//g" > rejectCount.num
            newReject=$(cat rejectCount.num)
            cat rejectCount.num
            # Check if this swap improves the reject count
            if [ $newReject -lt $currentReject ]; then
                echo "Improved! Swap $char1 and $char2, reject count: $newReject (was $currentReject), new mapping: $newMapping" | tee -a iterationhistory
                bestReject=$newReject
                bestMapping="$newMapping"
                improved=true
                # Mark as visited
                visitedMappings["$newMapping"]=1
                break  # Take the first improvement
            else
                echo "No improvement. Swap $char1 and $char2, reject count: $newReject (kept $currentReject)"
            fi
        done
        [ "$improved" = true ] && break  # Exit inner loop if improved
    done

    # Update current state
    currentMapping="$bestMapping"
    currentReject=$bestReject

    # Stop conditions
    if [ "$improved" = false ]; then
        echo "No further improvements found." | tee -a iterationhistory
        break
    fi
    if [ $currentReject -eq 0 ]; then
        echo "Optimal solution found with reject count 0" | tee -a iterationhistory
        break
    fi
done

# Output final mapping
echo "Final mapping: $currentMapping" | tee -a iterationhistory
echo "Final reject count: $currentReject" | tee -a iterationhistory
