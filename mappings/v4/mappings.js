// this disables the order function that reorders the UI key input
// when appending to odd fragments
//export  \
const pairwise_reordered_dic = true;


//These keys will register in the text area as is

//export  \

const passThroughKeys = new Set(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+','?','|','[',']','"','{','}','?','|','<','>',',','.','/','\'']);

/* These prime mappings, map the keys to prime numbers, 
 * enter, delete, comma, and period. The right hand keys 
 * are doubled so they can be distinguished 
 * from the left hand keys
*/
//export \
const primeMap = {
    // Left:  primes    keys   mnemonic
    'q': 19,            //abc  1+9 = 10; 1+0=1
    'w': 13,            //def  1+3 = 4 
    'e': 7,             //ghi  7   = 7
    'r': 17,            //jkl  1+7 = 8 
    'a': 11,            //mno  1+1 = 2
    's': 3,             //pqrs 3   = 3 
    'd': 5,             //tuv  5   = 5
    'f': 23,           //wxyz  2x3 = 6 
    // Left: squared key doubles middle row keys 
    'g': 29,
    't': 31,

    // Right: doubled primes
    'p': 38,            //abc 
    'o': 26,            //def
    'i': 14,            //ghi
    'u': 34,            //jkl 
    ';': 22,
    'l': 6,
    'k': 10,
    'j': 46,
    // right: squared key doubles middle row keys
     'h': 58,
     'y':  62,
    
    'backspace': 97,
    'enter':  71,

     ' ': 86,     //reserves
    'c': 106,    //spacebar4
    'n': 94,     //spacebar3
    'x': 94,     //spacebar3
    'v': 74,     //spacebar2
    'm': 74,     //spacebar2
    'b' : 106,    //spacebar1

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
    29: '9',  // c or m

 [19  *  19]       : '11',
 [19  *  11]       : '12',
 [ 3  *  5  *  23] : '12', //stacked
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
  
 [3  *  3 ]        : '33', 
 [3  *  13]        : '34', 
 [11  *   5  * 23] : '34', //stacked
 [3  *   5]        : '35', 
 [3  *  23]        : '36', 
 [3  *   7]        : '37', 
 [3  *  17]        : '38', 

 [13  *  13]       : '44', 
 [13  *   5]       : '45', 
 [13  *  23]       : '46', 
 [13  *   7]       : '47', 
 [13  *  17]       : '48', 
   
 [ 5  *   5]       : '55', 
 [ 5  *  23]       : '56', 
 [ 5  *   7]       : '57', 
 [11  *   3  * 23] : '57', //stacked
 [ 5  *  17]       : '58', 
    
 [23  *  23]       : '66', 
 [23  *   7]       : '67', 
 [23  *  17]       : '68', 
 [11  *   3  * 5]  : '68', //stacked
 
 [ 7  *   7]       : '77', 
 [ 7  *  17]       : '78', 

 [17  *  17]       : '88',

 //single handed doubles. h and g keys mapped to p=29
 [29  *  17]      : '88', 
 [29  *   7]      : '77',
 [29  *  23]      : '66',
 [29  *   5]      : '55',
 [29  *  13]      : '44',
 [29  *   3]      : '33',
 [29  *  11]      : '22',
 [29  *  19]      : '11',

[ 11  * 31]        : '97', 
 [ 31  *  3]        : '93', 
 [ 31  *  5]        : '94', 
// [ 31  * 23]        : '96', 
// [ 31  * 17]        : '96', 
 [ 31  *  7]        : '94', 
 [ 31  * 13]        : '93', 
 [ 31  * 19]        : '97', 



 //comma, stop, delete

  31                : '91',   //,
  61                : '92',   //.
 [ 31  * 17]        : '92', 
 [ 31  * 23]        : '92', 
  97:'93',   //delete
  71:'94',   //enter


    53       : 'wd1',  // <space>  selct 1st word
    37       : 'wd2', //  /        selct 2nd word
    43       : 'missed', //  /        selct 3rd word
//  53       : 'wd4', //  /        selct 4th word
    47       : 'wd3', //  <space>/ select 3rd word
    41       : 'space', //  \        space character



};

// includes codes corresponding to non alphabetic input
//export \
const NON_ALPHA_CHORDS = {
  '91': '+.  ' ,
  '92': '+, ' ,
  '93': 'D' ,
  '94': '\n' ,
  '97': ' ⟐ ' ,

  '99'  : 'D' ,
  '9999'  : '\'' ,
  '599' : ' ⟐ ' ,
  '995' : ' ⟐ ' ,
  '299' : '+.  ' ,
  '992' : '+.  ' ,
  '993' : '+,  ' ,
  '399' : '+,  ' ,
  '996' : '\n' ,
  '699' : '\n' ,
};


