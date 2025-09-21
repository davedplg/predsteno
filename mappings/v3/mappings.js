//These keys will register in the text area as is

// export \
const passThroughKeys = new Set(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+','?','|','[',']','"','\'','{','}','/','\\','?','|','<','>']);


/* These prime mappings, map the keys to prime numbers, 
 * enter, delete, comma, and period. The right hand keys 
 * are doubled so they can be distinguished 
 * from the left hand keys
*/
// export \
 const primeMap = {
    // Left:  primes
    'a': 11,          //def
    's':  3,          //ghi
    'd':  5,          //mon
    'f': 23,          //pqrs
    // Left: squared key doubles middle row keys 
    'g': 29,

    // Right: doubled primes
    ';': 22,         //def
    'l':  6,         //ghi
    'k': 10,         //mon
    'j': 46,         //pqrs
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
     'meta': 146, 

    'alt': 74,
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
    11: '2',   
     3: '3',   
     5: '5',   
    23: '6',  

 [29  *  11]       : '22', 
 [29  *   3]       : '33', 
 [29  *   5]       : '55', 
 [29  *  23]       : '66', 

 [11  *    3]       : '23', 
 [11  *    5]       : '25', 
 [11  *   23]       : '26', 
 
 [ 3  *    5]       : '35', 
 [ 3  *   23]       : '36', 
 
 [ 5  *   23]       : '56', 

 [23  *   3  *  5]  : '1', 
 [23  *  11  *  5]  : '4', 
 [23  *  11  *  3]  : '7', 
 [ 5  *  11  *  3]  : '8', 

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
  '91': '+.  ⟐ ' ,
  '92': '+, ' ,
  '93': 'D' ,
  '94': '\n' ,
  '96': ' ⟑ ' ,
  '97': ' ⟐ ' ,
};


