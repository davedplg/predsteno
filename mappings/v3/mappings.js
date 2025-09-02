//These keys will register in the text area as is

// export \
  const passThroughKeys = new Set(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+','?','|']);


/* These prime mappings, map the keys to prime numbers, 
 * enter, delete, comma, and period. The right hand keys 
 * are doubled so they can be distinguished 
 * from the left hand keys
*/
// export \
 const primeMap = {
    // Left:  primes
    'a': 19,          //abc
    's': 11,          //def
    'd':  3,          //ghi
    'f':  5,          //mon
    // Left: squared key doubles middle row keys 
    'g': 29,

    // Right: doubled primes
    ';': 38,         //abc
    'l': 22,         //def
    'k':  6,         //ghi
    'j':  10,         //mon
    // right: squared key doubles middle row keys
     'h': 58,
    // other functions
     'q':  7,
     'w': 17, 	
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

// export \
 const productMap = {
    19: '1',   
    11: '2',   
     3: '3',   
     5: '5',  

 [29  *  19]       : '4', 
 [29  *  11]       : '6', 
 [29  *   3]       : '7', 
 [29  *   5]       : '8', 

 [19  *   11]       : '12', 
 [19  *    3]       : '13', 
 [19  *    5]       : '15', 

 [11  *    3]       : '23', 
 [11  *    5]       : '25', 
 
 [ 3  *    5]       : '35', 
 
 [11  *   3  *  5]  : '4', 
 [19  *   3  *  5]  : '6', 
 [19  *  11  *  5]  : '7', 
 [19  *  11  *  3]  : '8', 

//comma, stop, delete

  59:'91',   //,
  61:'92',   //.
  97:'93',   //delete
  71:'94',   //enter
//73:'95',   //missed


    7: '96',  // sdf upper-case-marker
    17: '97', //  asd title-case-marker

    31       : 'wd1',  // <space>  selct 1st word
    37       : 'wd2', //  /        selct 2nd word
    [31 * 37]: 'wd3', //  <space>/ select 3rd word
    41       : 'space', //  \        space character
    73       : 'missed', // this is now letter b
 // [37 * 41]: '6', // actual independent space


};

// includes codes corresponding to non alphabetic input
// export \
 const NON_ALPHA_CHORDS = {
  '91': '.  ⟐ ' ,
  '92': ', ' ,
  '93': 'D' ,
  '94': '\n' ,
  '96': ' ⟑ ' ,
  '97': ' ⟐ ' ,
};


