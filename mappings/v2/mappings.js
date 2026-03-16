// this disables the order function that reorders the UI key input
// when appending to odd fragments
//export  \
const pairwise_reordered_dic = false;


//These keys will register in the text area as is

//export  \
const passThroughKeys = new Set(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+','?','|','[',']','"','{','}','?','|','<','>']);
//const passThroughKeys = new Set(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+','?','|','[',']','"','{','}','/','?','|','<','>']);


/* These prime mappings, map the keys to prime numbers, 
 * enter, delete, comma, and period. The right hand keys 
 * are doubled so they can be distinguished 
 * from the left hand keys
*/
//export \
const primeMap = {
    // Left:  primes    keys   mnemonic
    'v': 19,    //abc  1+9 = 10; 1+0=1
    'c': 13,    //def  1+3 = 4 
    'x': 7,     //ghi  7   = 7
    'z': 17,    //jkl  1+7 = 8 
    's': 11,            //mno  1+1 = 2
    'd': 3,             //pqrs 3   = 3 
    'f': 5,             //tuv  5   = 5
    'g': 23,           //wxyz  2x3 = 6 
    // Left: squared key doubles middle row keys 
  //'a': 29,

    // Right: doubled primes
    'n': 38,  //abc 
    'm': 26,  //def
    ',': 14,  //ghi
    '.': 34,  //jkl 
    'l': 22,
    'k': 6,
    'j': 10,
    'h': 46,
    // right: squared key doubles middle row keys
   //';': 58,
    
//   't': 59,
//   'y': 61,
     'backspace': 97,
     'enter': 71,
  //honorary thumb rejects word options for reserves
     'meta': 146, 

//  '/': 74,   I think these were candidates for more
//  '[': 74,   complete full-size keyboards
    '\\': 146,
    'alt': 74,      //spacebar2
    'control': 86,  //spacebar3
    'b': 86,        //spacebar3
    ' ' : 62        //spacebar1
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

 [  3  *   11]       : '91', 
 [  3  *    5]       : '92', 

 [ 11  * 23]        : '96', 
 [ 23  *  3]        : '94', 
 [ 11  *  5]        : '93', 
 [  5  * 23]        : '97', 

  /* some cheeky spacebars*/
 [ 13  * 19 *  7]        : '62', 
 [  7  * 17 * 13]        : '74', 
 [ 13  * 19 * 17]        : '86', 


//comma, stop, delete
  59:'91',   //,
  61:'92',   //.
  97:'93',   //delete
  71:'94',   //enter
//73:'95',   //missed


    [13 *  7 * 17]: '96',  // sdf upper-case-marker
    [7 * 19 * 13]: '97', //  asd title-case-marker

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
//export \
const NON_ALPHA_CHORDS = {
  '91': '+.  ' ,
  '92': '+, ' ,
  '93': 'D' ,
  '94': '\n' ,
  '96': ' ' ,
  '97': ' ⟐ ' ,
};


