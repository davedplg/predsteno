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
    'a': 11,          //abc 
    's':  3,          //def
    'd':  5,          //ghi
    'f': 23,          //mon
    // Left: squared key doubles middle row keys 
    'c': 29,

    // Right: doubled primes
    ';': 22,         //def
    'l':  6,         //ghi
    'k': 10,         //mon
    'j': 46,         //pqrs
    // right: squared key doubles middle row keys
     'm': 58,
    // other functions
     'q':  7,
     'w': 17, 	
     't': 59,
     'y': 61,
     'backspace': 97,
     'enter': 71,
  //honorary thumb rejects word options for reserves
    '\\': 146,
//   'meta': 146, for full-sized keyboards
    'alt': 74,      //spacebar2
    ' '  : 62,      //spacebar1
    'control': 86,  //spacebar3
    'b': 86,        //spacebar3
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
    29: '8',   

 [23  *  11]       : '1', 
 [23  *   3]       : '4', 
 [23  *   5]       : '7', 

 [  3  *   11]       : '91', 
 [  3  *    5]       : '92', 

 [ 11  * 29]        : '96', 
 [ 29  *  3]        : '94', 
 [ 11  *  5]        : '93', 
 [  5  * 29]        : '97', 

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
    43       : 'missed', //  /        selct 3rd word
    [43 * 31]: 'wd4', //  /        selct 4th word
    [43 * 37]: 'wd4', //  /        selct 4th word
    [31 * 37]: 'wd3', //  <space>/ select 3rd word
    41       : 'space', //  \        space character
    73       : 'missed', // this is now letter b
 // [37 * 41]: '6', // actual independent space


};

// includes codes corresponding to non alphabetic input
// export \
 const NON_ALPHA_CHORDS = {
  '91': '+.  ' ,
  '92': '+, ' ,
  '93': 'D' ,
  '94': '\n' ,
  '96': ' ⟑ ' ,
  '97': ' ⟐ ' ,
};


