// Uses marked.min.js (https://github.com/markedjs/marked) under MIT License

//import { primeMap, productMap, NON_ALPHA_CHORDS, passThroughKeys } from './mappings.js';
//import { dic } from './toptxts.js';
//import { reserves } from './reserves.js';


let left='',right=''; //left and right hand chords
let frag = '';   // encoded fragment
let lProduct = 1, rProduct = 1, thumbProduct = 1;
let chord = '', thumbChord = ''; // both chords appended, thumb chord
let need3rdPass = 0; // Flag for active missing word input, set by M chord or recursion
let pendingHfnGps = []; //pending hyphen groups
let groupIndex = 0;

let lastDecidingSpan="";
let presdKeys = new Set();   //keys list for current chord
let timeoutId = null;        //timeout needed to register keypresses
                             //together not individuality 

const validKeys = new Set(Object.keys(primeMap));

//to select from hyphenated reserve words on 2nd pass
const keyMap2ndPass = {
  'h': 5,
  'j': 1,
  'k': 2,
  'l': 3,
  ';': 4
};
const optionKeys = Object.keys(keyMap2ndPass);

// spanRegEx detects the first group of hyphenated
// reserve words after it has been highlighted
// in a span with class="highlight"
const spanRegEx    = /<span[^<]*>([^<]*)<\/span>/;
// reserveRegEx detects unhighlighted raw groups
// of reserve words · 
const reserveRegEx =   /[a-zA-Z'+]+(?:\u2194['+a-zA-Z]+)+/;
///const reserveRegEx =   /[a-zA-Z'+]+(?:-['+a-zA-Z]+)+/;
const missingRegEx =   /\u2014\u2014MissingWord\u2014\u2014/

/** calcProducts: calculate prime (p) products
 * there will be 1-6 keys pressed simultaneously
 * each alphabetic key will map to 1 of 8 digits.
 * easiest to give each digit uniquie prime p (left hand keys),
 * or 2p (for the right hand keys). Then sort them
 * into thumbkeys (2p>58), right keys (2p <58), and left
 * keys (p < 58) then multiply them all together as 
 * three combinations otherwise there would be 
 * a number of permutations of keys pressed
 * (especially if later we reuse the function for 
 * 2+finger chords) depending on their order registerd.
 * Prime products ensures a single combination.
 * 
 */ 

function calcPrimeProducts() { 
  let lProduct = 1, rProduct = 1, thumbProduct=1;
  for (const key of presdKeys) {
    const prime = primeMap[key];
    if (prime % 2 === 0 ) {
      if(prime > 58){     //thumb keys 
      thumbProduct *= prime / 2
      } else {
      rProduct *= prime / 2; //right keys 
      } 
    } else {
      lProduct *= prime;     //left keys
    }
  }
  return { lProduct, rProduct,thumbProduct };
}

//function tr(str, fromChars, toChars) {
//  if (fromChars.length !== toChars.length) {
//    throw new Error("fromChars and toChars strings must have equal length");
//  }
//  const map = {};
//  for (let i = 0; i < fromChars.length; i++) {
//    map[fromChars[i]] = toChars[i];
//  }
//  return str.replace(/./g, char => map[char] || char);
//}

/* mapChordToDigits: map chord to digits
 * turns prime products into digit strings 
 */
function mapChordToDigits(lProduct, rProduct) { 
  const ldigits = productMap[lProduct] || '';
  const rdigits = productMap[rProduct] || '';
  return {ldigits,rdigits};
}

// pick from inserted reserves
function select2ndPassWd(key) { 
  const choice = keyMap2ndPass[key];
  if (!choice) return;
//hyphenated reserve word options are inside span tags
  const wds = mdMatch(spanRegEx)[1]; 
  const wdList = wds.split("\u2194") || [];
  let selectedWord = wdList[choice - 1] || wdList[0] || '';

// user selects h (5) if 3rd pass is needed for qwerty 
// 999 used as place holder. 
  if (choice === 5)  selectedWord = "\u2014\u2014MissingWord\u2014\u2014";  
// swap hyphenated word options with selected word
  mdRepl(spanRegEx, selectedWord);
  renderMarkdown();
//Are there any more hyphenated words
  if (mdMatch(reserveRegEx)) {
    markReserves(); // Highlight next group
  } else {
    pendingHfnGps = 0; // No more groups, allow other keys
    } 
  
  }

//highlight hypenated reserve.js words with css highlight
function markReserves() {
  mdRepl(reserveRegEx, `<span class="highlight">$&</span>`);
  renderMarkdown();
}

function mark3rdPassWds() {
    const placeholder = mdMatch(missingRegEx);
     
    if (!placeholder) {//no 3rd parse frag placeholders
        need3rdPass = 0;
        renderMarkdown();
        removeWordOptions();
        reParseParagraph();
        return;
    }

    const placeholderNum = placeholder[1];
   //put place holders into input field for qwerty input
    mdRepl(missingRegEx, `<input class="missing-word" data-placeholder="${placeholderNum}" placeholder="${placeholderNum}" />`);
    renderMarkdown();
    //give field focus
    const input = outpt2.querySelector('input.missing-word');
    input.focus();
}

/**
 * Appends left and right chords to the encoded fragment, 
 * chords digit values were reordered (asc) in productMap 
 * so 2-letter/digit string pairs are not ambiguous.
 * @param {string} leftChord - The left-hand chord digits.
 * @param {string} rightChord - The right-hand chord digits.
 * @returns {boolean} - True if the chord was appended successfully and exists in the dictionary, false otherwise.
 *
 * imagine we have an odd digit (left chord) 
 * followed by a pair of digits  (right chord)
 * this can be described as if the digits were permutations of
 * 1,23 for all cases (digits 1-8) 
 * without changing the ordering inequalities between them. 
 * below is a table of all cases and whether the
 * ordering is ambiguous when they are appended
 *
 * word-order want  left, reord-right    reord-after-concat ambiguous 
 * 123        12,3   1   , 23                  12,3 ✓           y  
 * 132        13,2   1   , 23                  12,3 ✗           y 
                   
 * 213        12,3   2   , 13                  12,3 ✓           y 
 * 231        23,1   2   , 13                  12,3 ✗           y 
                   
 * 312        13,2   3   , 12                  13,2 ✓           y 
 * 321        23,1   3   , 12                  13,2 ✗           y 
 * so odd followed by even is ambigous            
 * unless it has doubles                    
 * 111; 122; 211  (by inspection?)
 */

// Appends chords to global frag, returns true for success or false for invalid


// Combines fragment and chords, handling even/odd lengths and doubled digits
function appendChord_recursive(ofrag, leftChord, rightChord) {
  // Coerce inputs to strings to handle numbers or undefined
  ofrag = String(ofrag);
  let l = String(leftChord);   // Can be single or two-finger chord
  let r = String(rightChord);  // Can be single or two-finger chord
  
  // Base case: if left chord is empty, shift right to left
  if (l === "") { l = r; r = ""; }
  // Base case: if left chord is still empty, return fragment
  if (l === "") return ofrag;
  
  // Ensure fragment length is at least 1
  let ofragLen = ofrag.length || 0;
  
  // Even-length fragment: concatenate and recurse with chords
  if (ofragLen % 2 === 0) {
    const result = appendChord_recursive(l, r, "");
    return result === false ? false : ofrag + result;
  }
  
  // Odd-length fragment: split into all but last (frag) and last character (m)
  let ofra  = ofrag.substring(0, ofragLen - 1);
  let g = ofrag[ofragLen - 1] || "";
  let lLen = l.length;
  
  // Left chord is single character: combine frag, ordered m/l, and right chord
  if (lLen === 1) return ofra + order(g, l) + r;
  
  // Left chord is even: check if it’s a doubled digit (e.g., "55" = 5*11)
  let lNum = parseInt(l);
  if (lNum % 11 > 0) return false; // Not a doubled digit, return false
  
  // Extract single digit from doubled digit (e.g., "55" → "5")
  let singleL = String(lNum / 11);
  
  // Recurse with single digit, combining frag, ordered m/singleL, and result
  const result = appendChord_recursive(singleL, r, "");
//  return result === false ? false : ofra + order(g, singleL) + result;
return typeof result === 'string' && result.match(/[a-z]/) ? false : ofra + order(g, singleL) + result;
}




// Orders two characters lexicographically
function order(m, n) { return m < n ? `${m}${n}` : `${n}${m}`; }

/* affixes are Capitalised in dic 
 * +AFFIX is suffix, AFFIX+ is prefix
 */ 
function parseAffixes(text){
 let t=text;                
 t = t.replace(/( +\+)(['A-Z]*)/g, (_,GAP,SUFX) => SUFX.toLowerCase());
 t = t.replace(/([A-Z']*)(\+ +)/g, (_,PREFX,GAP) => PREFX.toLowerCase());
 return t;

}

//The user must put these markers (⟑,⟐) before text to modify case
 function parseCaseMarking(text) {
  let t=text;
// sandwiched by pairs of marks modifies whole phrases   
  t = t.replace(/⟑\s*⟑\s*([^⟑]*)⟑\s*⟑\s*/g,(_,PHRASE) => PHRASE.toUpperCase());
  t = t.replace(/⟐\s*⟐\s*([^⟐]*)⟐\s*⟐\s*/g, (_, w) => w.split(/[^a-z]+/).map(wd => wd.charAt(0).toUpperCase() + wd.slice(1)).join(' '));
// directly preceeded by a mark affects single words   
  t = t.replace(/⟑\s*([a-z]*)([^a-z]*)/g, (_,FRODO,not_a_word) => FRODO.toUpperCase() + not_a_word);
  t = t.replace(/⟐\s*([a-z])([^a-z]*)/g, (_,B,ilbo) => B.toUpperCase() + ilbo);
  return t;
}

/*
 *  2nd pass: user chooses from reserve.js options (b was pressed
 *  on first pass to insert hyphenated words from reserves.js)
 *  then (else) if the word needed is not on the reserves list 
 *  user supplies the word uisng qwerty entry on the 3rd pass 
*/
function reParseParagraph(){
  if(mdMatch(/[a-zA-Z'+]\u2194/)){
    markReserves();                      //2nd input pass
  } else if (mdMatch(missingRegEx)) {
      need3rdPass = 1;
      mark3rdPassWds();                  //3rd input pass
    } else  {
          setMd(parseAffixes(md()))      //1st format pass
          setMd(parseCaseMarking(md()))  //2nd format pass
          renderMarkdown();
      } 
}

/* Delete, Enter, comma, period, and other functions 
 * and characters are detected and handled here
 * these chords are defined in NON_ALPHA_CHORDS
 * lproduct > rproduct here (by construction) as 
 * these dont collide with reordered digit pairs.
 * technically p1*p2 can be less than 31 3*3,3*5,3*7,5*5
 * but these are 
*/

function nonAlphabetic() {
	removeWordOptions();
 
  let special = NON_ALPHA_CHORDS[chord];
  
  if (special  && 38 > lProduct > rProduct || chord?.[0] === '9' ) {

  if (special !== 'D') {
    frag = '';
    setMd(md() + special + '\u275A');
    wdOpts.innerHTML = '';
    return true;
  }
  // We are deleteing from here on in
  if (frag === '') {
    mdRepl(/[a-z-\u2194\u275A]+$| +$|\n$|.$/, '\u275A');
    wdOpts.innerHTML =   '---';
    return true;
   }
   
  frag = frag.replace(/.$/, '');
  if(dic[frag]){
 	  removeWordOptions();
    let bwords="<span id='deciding'>" + boldFirstNLtrs(frag) +"</span>";
//  wdOpts.innerHTML = bwords;
    setMd(md() + bwords);
   }
   return true;
 }

}

//User chooses from 2-3 options with two spacebar keys
function multiSpacebar() {
  const wdList = dic[frag]?.split('-') || [];
  let wd = '';
  switch (thumbChord) {
    case 'wd1': wd = wdList[0] || ' '; break;
    case 'wd2': wd = wdList[1] || ''; break;
    case 'wd3': wd = wdList[2] || ''; break;
    case 'missed': wd = reserves[frag].replace(/-/g,"\u2194") || `\u2014\u2014${frag}\u2014\u2014`; frag = ''; break;
    case 'space': wd = ' '; frag = ''; break;
  }
		removeWordOptions();

    setMd(md() + (wd ? wd + ' \u275A' : '\u275A'));
    wdOpts.innerHTML = '';
   
  if (thumbChord !== 'missed' && thumbChord !== 'space') frag = '';
  renderMarkdown();
}

/* Help user remember how many letters they have typed
 * by bolding the start of the words presented to the user
 * the length of the bolding is the same as the length of
 * the current frag. Do this to all options in dic[frg]
 */

function boldFirstNLtrs(frg) {
    let wds=dic[frg];
    let n    =frg.length;
    if (typeof wds !== 'string' || n < 0) return '';
    return caps2boldLcase(wds
        .split('-')
        .map(wd => {
            if (n > wd.length) return wd.toUpperCase();//??
            return wd.slice(0, n).toUpperCase() + wd.slice(n);
        })
        .join('-'));
}
//frag length is number of keys pressed so far for word
function caps2boldLcase(str) {
    return str
        .replace(/[A-Z]+/g, '<b>$&</b>') // capital ltrs in <b> tags
        .toLowerCase(); // Convert the entire string to lowercase
}

//handle both hands chords
/**
 * Processes a chord input by calculating prime products
 * and updating the UI.
 * @param {void}
 * @returns {void}
 */
function processBiChord() {
  ({lProduct, rProduct, thumbProduct}  = calcPrimeProducts());
  ({ldigits: left, rdigits: right}  = mapChordToDigits(lProduct, rProduct));
  chord         = left+right;     
  thumbChord    = productMap[thumbProduct] || '';

  updtDebugInfo(presdKeys, lProduct, rProduct, thumbChord, chord, frag);
 
  setMd(removeEmojiCursor(md()));
 
  if (nonAlphabetic()){
    presdKeys.clear();   
    renderMarkdown();
    // paragraph triggers 2nd parse
    if (mdMatch(/\n\n\u275A$/))  reParseParagraph();                         
  return;
  }
  
  if (chord) {
  //appends chord and/or rejects ambig chord
    if(!(frag=appendChord_recursive(frag,left,right))){
  updtDebugInfo(presdKeys, lProduct, rProduct, thumbChord, chord, 'ambig chord - even after odd?');
        } 
  } else console.warn('No valid chord generated, skipping appendChord');
 
  let append='';
 
  if (thumbChord) multiSpacebar(); //select the encoding word option 
 
  let boldCueWds =boldFirstNLtrs(frag);   
  
  if (dic[frag]) { // if word finished delete suggestions
  	removeWordOptions();
    let opts =`<span id='deciding'>${boldCueWds}</span>`; 
    setMd(  md()   + opts);
 // wdOpts.innerHTML = opts;//? previous frag might be good for trigger happy users
    wdOpts.innerHTML = lastDecidingSpan;
    renderMarkdown();
    } else {
        frag="";
  	  	removeWordOptions();
        setMd(md() + (append ? append + ' \u275A' : '\u275A'));
        wdOpts.innerHTML = '';
   }
 presdKeys.clear();
}



const inputRegex = /<input [^>]*>/;

//Third pass key handling
function on3rdPass(key)  {
  if (key === 'enter') {
    const input = outpt2.querySelector('input.missing-word');
    if (input) {
      event.preventDefault();
      const value = input.value || `gg`;
      mdRepl(inputRegex, value);
      mark3rdPassWds(); // Recursively handle next placeholder
    }
        return;
  }
      return;
 }   
/* handle2ndPassWords this selects from the
 *
*/


function on2ndPass(key){
   event.preventDefault();
   select2ndPassWd(key);
// reserveRegEx a regEx to find hyphenated reserve words
   if (!mdMatch(reserveRegEx)) {
     reParseParagraph(); // Check for missing words after 2nd pass
   }
   return;
}

document.addEventListener('keydown', (event) => {
 const key = event.key.toLowerCase();
 if (mdMatch(spanRegEx) && optionKeys.includes(key)) {
   on2ndPass(key);
   return;
 }
 if (need3rdPass) {
   on3rdPass(key); 
   return;
 }

// first pass continues through

// punctuation and digits
 if (passThroughKeys.has(key)) {
   event.preventDefault();
// setMd(md().replace(/\u275A$/, '') + key + '\u275A');
   mdRepl(/\u275A$/,  key + '\u275A');
   renderMarkdown();
   return;
  }
 
// encoded digit keys, delete and enter  
  if (!validKeys.has(key)) return;

  event.preventDefault();
  presdKeys.add(key);

  if (timeoutId) clearTimeout(timeoutId);
  timeoutId = setTimeout(processBiChord, CHORD_TIMEOUT);
});

document.addEventListener('keyup', (event) => {
  const key = event.key.toLowerCase();
  if (validKeys.has(key)) {
  presdKeys.delete(key);
    updtDebugInfo(presdKeys, '-', '-', '-', frag);
  }
});

