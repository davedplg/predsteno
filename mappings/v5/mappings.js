// this disables the order function that reorders the UI key input
// when appending to odd fragments
//export  \
const pairwise_reordered_dic = false;


//These keys will register in the text area as is

// export \
const passThroughKeys = new Set(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+','?','|','[',']','"','{','}','/','?','|','<','>']);


/* These prime mappings, map the keys to prime numbers, 
 * enter, delete, comma, and period. The right hand keys 
 * are doubled so they can be distinguished 
 * from the left hand keys
*/
// export \
 const primeMap = {
    // Left:  primes
    'q': 11,          //def
    'w':  3,          //ghi
    'e':  5,          //mon
    'r': 23,          //prz 
    'f': 17,          //ab
   
    't': 29,  // left: function key

    // Right: doubled primes
    'u': 34,         //wys
    'i': 14,         //tuv
    'o': 26,         //jkl
    'p': 38,         //ab
     'j': 46,        //prz 
        
    'y': 58,  // right: function key
    
     'backspace': 97,
     'enter': 71,

    ' ': 86, //reserves
    'c': 106,    //spacebar4
    'n': 94,     //spacebar3
    'v': 74,     //spacebar2
    'b' : 62,    //spacebar1

};



/* key primes and prime products are used to identify the
 * digit, or pair of digits (reorderd ascending combinations) 
 * that were pressed. Two keys from the same hand can not be
 * have no ordering hence need to normalise both permutations into
 * a reordered ascending combination.
 */

// export \
 const productMap = {
    11: '2',   
     3: '3',   
     5: '5',   
    23: '6',   
    19: '1',   
    13: '4',   
     7: '7',   
    17: '8',   

 [23  *  11]       : '1', 
 [23  *   3]       : '4', 
 [23  *   5]       : '7', 

 [17  *   7]       : '5', 
 [17  *  13]       : '3', 
 [17  *  19]       : '2', 

 [ 29  * 11]        : '97', 
 [ 29  *  3]        : '93', 
 [ 29  *  5]        : '94', 
// [ 29  * 23]        : '96', 
// [ 29  * 17]        : '96', 
 [ 29  *  7]        : '94', 
 [ 29  * 13]        : '93', 
 [ 29  * 19]        : '97', 



 //comma, stop, delete

  59                : '91',   //,
 [ 29]              : '91', 
  61                : '92',   //.
 [ 29  * 17]        : '92', 
 [ 29  * 23]        : '92', 
  97:'93',   //delete
  71:'94',   //enter


    31       : 'wd1',  // <space>  selct 1st word
    37       : 'wd2', //  /        selct 2nd word
    43       : 'missed', //  /        selct 3rd word
    53       : 'wd4', //  /        selct 4th word
    47       : 'wd3', //  <space>/ select 3rd word
    41       : 'space', //  \        space character

};

// includes codes corresponding to non alphabetic input
// export \
 const NON_ALPHA_CHORDS = {
  '91': '+.  ' ,
  '92': '+, ' ,
  '93': 'D' ,
  '94': '\n' ,
  '96': ' ',
  '97': ' ⟐ ' ,
};


