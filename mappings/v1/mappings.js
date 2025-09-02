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
    'q': 3,  'v': 3,  //abc on numpad
    'w': 5,  'c': 5,  //def
    'e': 7,  'x': 7,  //ghi
    'r': 11, 'z': 11, //jkl
    'a': 13,          //mno
    's': 17,          //pqrs
    'd': 19,          //tuv
    'f': 23,          //wxyz
    // Left: squared key doubles middle row keys 
    'g': 29,

    // Right: doubled primes
    'p': 6,  'n':6, //abc 
    'o': 10, 'm':10, //def
    'i': 14, ',':14, //ghi
    'u': 22, '.':22, //jkl 
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

 [3  *  3 ]       : '11',
 [3  *  5 ]       : '12',
 [3  *  7 ]       : '13', 
 [3  *  11]       : '14', 
 [3  *  13]       : '15', 
 [3  *  17]       : '16', 
 [3  *  19]       : '17', 
 [3  *  23]       : '18', 

 [5  *  5 ]       : '22',
 [5  *  7 ]       : '23', 
 [5  *  11]       : '24', 
 [5  *  13]       : '25', 
 [5  *  17]       : '26', 
 [5  *  19]       : '27', 
 [5  *  23]       : '28', 
  
 [7  *  7 ]       : '33', 
 [7  *  11]       : '34', 
 [7  *  13]       : '35', 
 [7  *  17]       : '36', 
 [7  *  19]       : '37', 
 [7  *  23]       : '38', 

 [11  *  11]      : '44', 
 [11  *  13]      : '45', 
 [11  *  17]      : '46', 
 [11  *  19]      : '47', 
 [11  *  23]      : '48', 
   
 [13  *  13]      : '55', 
 [13  *  17]      : '56', 
 [13  *  19]      : '57', 
 [13  *  23]      : '58', 
    
 [17  *  17]      : '66', 
 [17  *  19]      : '67', 
 [17  *  23]      : '68', 
 
 [19  *  19]      : '77', 
 [19  *  23]      : '78', 

 [23  *  23]      : '88',

 //single handed doubles. h and g keys mapped to p=29
 [29  *  23]      : '88', 
 [29  *  19]      : '77',
 [29  *  17]      : '66',
 [29  *  13]      : '55',
 [29  *  11]      : '44',
 [29  *   7]      : '33',
 [29  *   5]      : '22',
 [29  *   3]      : '11',
  
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


