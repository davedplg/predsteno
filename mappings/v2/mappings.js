// this disables the order function that reorders the UI key input
// when appending to odd fragments
//export  \
const pairwise_reordered_dic = false;


//These keys will register in the text area as is

//export  \
//const passThroughKeys = new Set(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+','?','|','[',']','"','{','}','?','|','<','>']);

const passThroughKeys = new Set(['tab','1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+','?','|','[',']','"','{','}','?','|','<','>',',','.','/','\'']);

/* These prime mappings, map the keys to prime numbers, 
 * enter, delete, comma, and period. The right hand keys 
 * are doubled so they can be distinguished 
 * from the left hand keys
*/
//export \
const primeMap = {
    // Left:  primes    keys   mnemonic
    'a': 11,            //def  1+1 = 2
    's': 3,             //ghi  3   = 3 
    'd': 5,             //mon  5   = 5
    'f': 23,            //pqrs 2x3 = 6 
    'q': 19,            //abc  1+9 = 1+0 = 1
    'w': 13,            //jkl  1+3 = 4
    'e':  7,            //tuv  7   = 7
    'r': 17,            //wxyz 1+7 = 8  
    
    'g': 29,  // Left: function key

    // Right: doubled primes
    ';': 22,            //def  
    'l': 6,             //ghi  
    'k': 10,             //mon  
    'j': 46,            //pqrs 
    'u': 34,            //abc 
    'i': 14,            //jkl
    'o': 26,            //tuv
    'p': 38,            //wxyz 
       
    'h': 58,  // right: function key
    
     'backspace': 97,
     'delete': 101,
     'enter': 71,

    ' ': 86,     //reserves
    'c': 106,    //spacebar4
    'n': 94,     //spacebar3
    'x': 94,     //spacebar3
    'v': 74,     //spacebar2
    'm': 74,     //spacebar2
    'b': 106,    //spacebar1

};


/* key primes and prime products are used to identify the
 * digit, or pair of digits (reorderd ascending combinations) 
 * that were pressed. Two keys from the same hand can not be
 * have no ordering hence need to normalise both permutations into
 * a reordered ascending combination.
 */

//export \
const productMap = {
    3: '3',   // q/v or p/n
    5: '5',   // w/c or o/m
    7: '7',   // e/x or i/,
    11: '2',  // f/z or j/.
    13: '4',  // a or ;
    17: '8',  // s or l
    19: '1',  // d or k
    23: '6',  // c or m


 [ 11  * 29]        : '97', 
 [ 29  *  3]        : '93', 
 [ 29  *  5]        : '94', 
 [ 29  * 23]        : '92', 


//comma, stop, delete
  59:'91',   //,
  29:'91',   //,
  61:'92',   //.
  97:'93',   //backspace
 101:'95',   //delete 'delete': 101,
  71:'94',   //enter

    53       : 'wd1',  // <space>  selct 1st word
    37       : 'wd2', //  /        selct 2nd word
    43       : 'missed', //  /        selct 3rd word
//  53       : 'wd4', //  /        selct 4th word
    47       : 'wd3', //  <space>/ select 3rd word
    41       : 'space', //  \        space character

};

// includes codes corresponding to non alphabetic input
//export \ 101:'95',    'delete': 101, '95': 'X' ,
const NON_ALPHA_CHORDS = {
  '91': '+.  ' ,
  '92': '+, ' ,
  '93': 'D' ,
  '94': '\n' ,
  '95': 'X' ,
  '96': ' ' ,
  '97': ' ⟐ ' ,
};


