//These keys will register in the text area as is

//export  \
const passThroughKeys = new Set(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+','?','|','[',']','"','\'','{','}','/','\\','?','|','<','>']);


/* These prime mappings, map the keys to prime numbers, 
 * enter, delete, comma, and period. The right hand keys 
 * are doubled so they can be distinguished 
 * from the left hand keys
*/
//export \
const primeMap = {
    // Left:  primes    keys   mnemonic
    'q': 19,  'v': 19,  //abc  1+9 = 10; 1+0=1
    'w': 13,  'c': 13,  //def  1+3 = 4 
    'e': 7,   'x':  7,  //ghi  7   = 7
    'r': 17,  'z': 17,  //jkl  1+7 = 8 
    'a': 11,            //mno  1+1 = 2
    's': 3,             //pqrs 3   = 3 
    'd': 5,             //tuv  5   = 5
    'f': 23,           //wxyz  2x3 = 6 
    // Left: squared key doubles middle row keys 
    'g': 29,

    // Right: doubled primes
    'p': 38,  'n':38, //abc 
    'o': 26, 'm':26, //def
    'i': 14, ',':14, //ghi
    'u': 34, '.':34, //jkl 
    ';': 22,
    'l': 6,
    'k': 10,
    'j': 46,
    // right: squared key doubles middle row keys
     'h': 58,
    
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

 [19  *  19]       : '11',
 [19  *  11]       : '12',
 [19  *  3 ]       : '13', 
 [19  *  13]       : '14', 
 [19  *  5 ]       : '15', 
 [19  *  23]       : '16', 
 [19  *   7]       : '17', 
 [19  *  17]       : '18', 

 [11  *  11]       : '22',
 [11  *  3 ]       : '23', 
 [11  *  13]       : '24', 
 [11  *   5]       : '25', 
 [11  *  23]       : '26', 
 [11  *   7]       : '27', 
 [11  *  17]       : '28', 
  
 [3  *  3 ]       : '33', 
 [3  *  13]       : '34', 
 [3  *   5]       : '35', 
 [3  *  23]       : '36', 
 [3  *   7]       : '37', 
 [3  *  17]       : '38', 

 [13  *  13]      : '44', 
 [13  *   5]      : '45', 
 [13  *  23]      : '46', 
 [13  *   7]      : '47', 
 [13  *  17]      : '48', 
   
 [ 5  *   5]      : '55', 
 [ 5  *  23]      : '56', 
 [ 5  *   7]      : '57', 
 [ 5  *  17]      : '58', 
    
 [23  *  23]      : '66', 
 [23  *   7]      : '67', 
 [23  *  17]      : '68', 
 
 [ 7  *   7]      : '77', 
 [ 7  *  17]      : '78', 

 [17  *  17]      : '88',

 //single handed doubles. h and g keys mapped to p=29
 [29  *  17]      : '88', 
 [29  *   7]      : '77',
 [29  *  23]      : '66',
 [29  *   5]      : '55',
 [29  *  13]      : '44',
 [29  *   3]      : '33',
 [29  *  11]      : '22',
 [29  *  19]      : '11',
  
 //comma, stop, delete

  59:'91',   //,
  61:'92',   //.
  97:'93',   //delete
  71:'94',   //enter
//73:'95',   //missed


    [19 * 13 *  7]: '97',  // sdf upper-case-marker
    [13 *  7 * 17]: '96', //  asd title-case-marker

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
  '91': '+.  ⟐ ' ,
  '92': '+, ' ,
  '93': 'D' ,
  '94': '\n' ,
  '96': ' ⟑ ' ,
  '97': ' ⟐ ' ,
};


