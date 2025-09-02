//These keys will register in the text area as is

//export  \
const passThroughKeys = new Set(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+','?','|']);


/* These prime mappings, map the keys to prime numbers, 
 * enter, delete, comma, and period. The right hand keys 
 * are doubled so they can be distinguished 
 * from the left hand keys
*/
//export \
const primeMap = {
    // Left:  primes
    'q': 3,   //abc on numpad
    'w': 5,   //def
    'e': 7,   //ghi
    'r': 11,  //jkl
    'a': 13,  //mno
    's': 17,  //pqrs
    'd': 19,  //tuv
    'f': 23,  //wxyz
    // Left: squared key doubles middle row keys 
    'g': 29,

    // Right: doubled primes
    'p': 6,  //abc 
    'o': 10, //def
    'i': 14, //ghi
    'u': 22, //jkl 
    ';': 26,
    'l': 34,
    'k': 38,
    'j': 46,
    // right: squared key doubles middle row keys
     'h': 58,
    
     't': 59,
     'y': 61,
     'backspace': 97,
     'enter': 71,
  //honorary thumb rejects word options for reserves
     'b': 146, 

    '/': 74,
    '\\': 82,
    ' ' : 62
};



/* key primes and prime products are used to identify the
 * digit, or pair of digits (reorderd ascending combinations) 
 * that were pressed. Two keys from the same hand can not be
 * have no ordering hence need to normalise both permutations into
 * a reordered ascending combination.
 */

//export \
const productMap = {
    3: '1',   // q/v or p/n
    5: '2',   // w/c or o/m
    7: '3',   // e/x or i/,
    11: '4',  // f/z or j/.
    13: '5',  // a or ;
    17: '6',  // s or l
    19: '7',  // d or k
    23: '8',  // c or m

 //comma, stop, delete

  59:'91',   //,
  61:'92',   //.
  97:'93',   //delete
  71:'94',   //enter
//73:'95',   //missed


    [17 * 19 * 23]: '96',  // sdf upper-case-marker
    [17 * 19 * 13]: '97', //  asd title-case-marker

    31       : 'wd1',  // <space>  selct 1st word
    37       : 'wd2', //  /        selct 2nd word
    [31 * 37]: 'wd3', //  <space>/ select 3rd word
    41       : 'space', //  \        space character
    73       : 'missed', // this is now letter b
 // [37 * 41]: '6', // actual independent space


};

// includes codes corresponding to non alphabetic input
//export \
const NON_ALPHA_CHORDS = {
  '91': '.  ⟐ ' ,
  '92': ', ' ,
  '93': 'D' ,
  '94': '\n' ,
  '96': ' ⟑ ' ,
  '97': ' ⟐ ' ,
};


