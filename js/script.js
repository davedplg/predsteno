//left and right hand chords
let left='',right=''; 

// encoded fragment
let frag = '';        

//prime products from key combinations. Keys have prime values
let lProduct = 1, rProduct = 1, thumbProduct = 1; 

//let lastlProduct = 1;
let lastrProduct = 1;

// both chords appended, thumb chord
let chord = '', thumbChord = ''; 

// Flag for active missing word input, set by M chord or recursion
let need3rdPass = 0; 

//pending hyphen groups (2nd parse options)
let pendingHfnGps = []; 
let groupIndex = 0;
let bwords = '';
let opts = '';
//let oldOpts = '';

let lastDecidingSpan="";

// first and second parse separators
// sep1=␣ sep2=↔ (double ended arrow)
sep1 = '\u2423'
sep2 = '\u2194'
sep3 = '\u2014';

// cursor characters increasing thickness
cursor4 = '\u2758';
cursor2 = '\u2503';
cursor3 = '\u2759';
cursor = '\u275A';


//key list for - current chord
let presdKeys = new Set();   
let keysDown  = 0;

//timeout - needed to register keypresses
let timeoutId = null;        
//together not individuality 

const validKeys = new Set(Object.keys(primeMap));

//to select from hyphenated reserve words on 2nd pass
const keyMap2ndPass = {
  'u': 7,
  'i': 8,
  'o': 9,
  'p': 10,
  'g': 11,
  'h': 11,
  'b': 1,   // duplicated so user can dbl click b; 1st & 2nd parse
  ' ': 1,   // duplicated so user can dbl click b; 1st & 2nd parse
  'j': 3,
  'k': 4,
  'v': 2,
  'l': 5,
  ';': 6
};
const optionKeys = Object.keys(keyMap2ndPass);

// spanRegEx detects the first group of hyphenated
// reserve (2nd parse) words after it has been highlighted
// in a span with class="SecondParse"
const spanRegEx    = /<span[^<]*>([^<]*)<\/span> /;
// reserveRegEx detects unhighlighted raw groups
//    Matches word-like tokens 
//      (letters, numbers, punctuation) 
//     separated by at least one ↔ arrow
// Safe symbol list for empty reserves slots (punctuation injection)
 
const KEYBOARD_PUNCTUATION = "!@#$%^&*()_+-=[]{};:'\"\\|,.<>/?`~";

// escape regex-special chars in punctuation for safe insertion
const escapeForRegex = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const punct = escapeForRegex(KEYBOARD_PUNCTUATION) + '0-9';
// character class body: letters, numbers, punctuation (escaped)
const charClass = `\\p{L}\\p{N}'${punct}`;

// build pattern string
const pattern = `${sep1}[${charClass}]+(?:${sep2}[${charClass}]+)+`;

// final RegExp with Unicode flag
const reserveRegEx = new RegExp(pattern, 'u');

// result
console.log(reserveRegEx);

const missingRegEx = new RegExp(sep3 + sep3 + 'MissingWord' + sep3 + sep3 + ' ');

/** calcProducts: calculate prime (p) products
 * there will be 1-6 keys pressed simultaneously
 * each alphabetic key will map to 1 of 8 digits (This will vary in subsequent neobet variants).
 * easiest to give each digit uniquie prime p (left hand keys),
 * or 2p (for the right hand keys). Then sort them
 * into thumbkeys (2p>58), right keys (2p <58), and left
 * keys (p < 58) then multiply them all together as 
 * three combinations otherwise there would be 
 * a number of permutations of keys pressed
 * (especially if later we reuse the function for 
 * 2+finger chords) depending on their order registerd.
 * Prime products ensures a single combination.
 * Think steno has key ordering precedence; doubt this will 
 * be so useful with collapsed neobets for some combinatorial
 * hunch I have yet to justify.
 */ 

function calcPrimeProducts() { 
     let lp = 1, rp = 1, tp =1;
  for (const key of presdKeys) {
    // p is prime
    const p = primeMap[key]; 
    if (p % 2 === 0 ) {
//    if(p > 58){     
      if(p > 62){     
      //thumb product 
      tp *= p / 2  
      } else {
      //right product 
      rp *= p / 2; 
      } 
    } else {
      //left product
      lp *= p;
    }
  }
  return { lp , rp,tp };
}


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
  console.log(` 2nd pass frag:${frag}`);
  const choice = keyMap2ndPass[key];
  if (!choice || frag === '') return;

  const wds = mdMatch(spanRegEx)?.[1] || '';
  const wdList = reserves[frag].split(sep1) || [];
  let selectedWord = wdList[choice - 1] || wdList[0] || '';

  const isThirdPass = (choice === 11);
  
  if (isThirdPass) {
    selectedWord = "\u2014\u2014MissingWord\u2014\u2014";
  }

  mdRepl(spanRegEx, '');
  doc.col -= (wds.length+1 || 0);
  
  addspace=true;
   
  if(selectedWord.includes("^")){
    selectedWord=selectedWord.replace(/\^/,"");
    addspace=false;
  }
  
  insertWord(selectedWord, addspace);   // no extra space
  clearFrag();
// No RAF for the decision — do it immediately
  if (isThirdPass) {
    console.trace("Calling mark3rdPassWds from select2ndPassWd");
    need3rdPass=1;
    mark3rdPassWds();           // ← call directly, same as working path
    reParseParagraph();
  } else {
    requestAnimationFrame(() => {
      renderMarkdown();
//    outputMarkdown.focus();
      outputHTML.focus();
      updateDisplay();
    });
  }
  console.log('=== select2ndPassWd END ===');
}

//highlight hypenated reserve.js words with css highlight
function hŷlŷt_2nd_pās_opts() {
  mdRepl(reserveRegEx, `<span class="SecondParse">$&</span>`);
  renderMarkdown();
}

function mark3rdPassWds() {
  console.trace("=== mark3rdPassWds CALLED FROM ===");
  const placeholder = mdMatch(missingRegEx);
  if (!placeholder) {
    need3rdPass = 0;
    renderMarkdown();
//  requestAnimationFrame(() => outputMarkdown.focus());
    requestAnimationFrame(() => outputHTML.focus());
    return;
  }

  mdRepl(missingRegEx, `<input class="missing-word" value=":" />`);
  renderMarkdown();
  //unselect the pipe (select the character after the pipe?)
  //this allow immediate entrance to the commmand language
  requestAnimationFrame(() => {
      const input = document.querySelector('.missing-word');
      if (input) {
          input.focus();
          input.setSelectionRange(1, 1);        // place cursor after |
      }
  });
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
  let l = String(leftChord);   // Can be 1 or 2-finger chord
  let r = String(rightChord);  // Can be 1 or 2-finger chord
  
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
return typeof result === 'string' && result.match(/[a-z]/) ? false : ofra + order(g, singleL) + result;
}

// Orders two characters lexicographically
function order(m, n) { 
  if (pairwise_reordered_dic == false) return  `${m}${n}`;
  return m < n ? `${m}${n}` : `${n}${m}`; 
}

/* affixes are Capitalised in dic 
 * +AFFIX is suffix, AFFIX+ is prefix
 */ 
function parseAffixes(text){
 let t=text;                
     
t = t.replace(
///(\s*<span[^<]*<\/span>)*( +\+)(['A-Z]*)/g,
///([ \t]*<span[^<]*<\/span>)*( +\+)(['A-Z]*)/g,
/([ \t]*<span[^<]*<\/span>)*( *\+)(['A-Z]*)/g,
 (_,SPAN,GAP,SUFX) => (SUFX + ' ').toLowerCase()
);

// prefix version (example)
t = t.replace(/(?<prefix>[A-Z']+)\+ /g, (m, p) => p.toLowerCase() + "'");  
 return t;

}

function parseCaseMarking(text) {
  let t = text;
  if (!text.includes('⟐')) return text; 
//uppercase singleton
  t=t.replace(/([^\p{L}^0|^])([\p{Lu}]\s*) ⟐ /gu,(m,before,letter)=> before + letter.toLowerCase());
//lowercase singleton
  t=t.replace(/([^\p{L}^0|^])([\p{Ll}]\s*) ⟐ /gu,(m,before,letter)=> before + letter.toUpperCase());
  
  // Title case word 
  let tCâs = /([\p{Lu}][\p{Ll}0]+\s*) ⟐ /gu;     
  // Lower case  (initial)(rest) 
  let lCâs = /([\p{Ll}0])([\p{Ll}0]+\s*) ⟐ /gu;    
  // Uppercase
  let uCâs = /([\p{Lu}0][\p{Lu}0]*\s*) ⟐ /gu;     

  t = t.replace(tCâs, (_,FRODO) => FRODO.toUpperCase());
  t = t.replace(lCâs, (_,B,ilbo) => B.toUpperCase() + ilbo);
  t = t.replace(uCâs, (_,frodo) => frodo.toLowerCase());

  setMd(t); 
requestAnimationFrame(() => {
    syncFromMarkdown();
    doc.col+= -3;
});
  return t;
}

//The user must put these markers (⟑,⟐) before text to modify case


/*
 *  2nd pass: user chooses from reserve.js options (b was pressed
 *  on first pass to insert hyphenated words from reserves.js)
 *  then (else) if the word needed is not on the reserves list 
 *  user supplies the word uisng qwerty entry on the 3rd pass 
*/
function reParseParagraph(){
//Clear lingering 1st-parse spans before highlighting reserves.
  removeWordOptions();
  if(mdMatch(/`[0-9a-zA-Z'+]${sep2}`/)){
    hŷlŷt_2nd_pās_opts();                      //2nd input pass
  } else if (mdMatch(missingRegEx)) {
      need3rdPass = 1;
      mark3rdPassWds();                  //3rd input pass
    } else  {
          renderMarkdown();
      } 
  console.log('reParseParagraph');
}

/* Delete, Enter, comma, period, and other functions 
 * and characters are detected and handled here.
 * These characters are blocked by input keys.
 * these chords are defined in NON_ALPHA_CHORDS.
 * Originially all punctuation was here until the 
 * passThrough keys event block was added.
 * lproduct > rproduct here (by construction) as 
 * these dont collide with reordered digit pairs. Not sure 
 * this convention will work with 1-finger chord dual
 * hand input variants.
 * technically p1*p2 can be less than 31 3*3,3*5,3*7,5*5
 * but these are 
*/

function nonAlphabetic() {
  function addSpecialChar(special){
    clearFrag();
    let enter = (special == "\n") 
    //ensure  enter is space space enter so html shows newline
    if(!(doc.col==0) && enter) 
    {
     //most words have a space already 
     special=' '+special;
     //for cases when no space ahead 
     if(doc.lines[doc.row].substr[doc.col-1,1]!==' ') special=' '+special;
    }
    insertWord(special,false);
    requestAnimationFrame(() => {
      syncFromMarkdown();
      //enter key
      if(enter) { doc.dRow(1);doc.col=0;}
  });
 // updateDisplay();
 // wdOpts.innerHTML = '';
    return true;
   }

/**
 * deleteWord — deletes the last complete word BEFORE the cursor.
 * Fully respects the document model (doc.lines + doc.col).
 * When at column 0, it joins with the previous line (standard editor behavior).
 */
function del(size) {
  syncFromMarkdown();

  const row = doc.row;
  let line = doc.lines[row];

  // ────── CASE 1: 
  // Cursor at start of line → join with previous line ──────
  if (doc.col === 0  && row === 0) return true;

  if (doc.col === 0) {
    // Join previous line + current line
    const prevLine = doc.lines[row - 1];
    const currentLine = doc.lines[row];

    // Remove trailing newline from previous line 
    // (it's implicit in the array)
    doc.lines[row - 1] = prevLine + currentLine;
    // Remove the now-empty current line
    doc.lines.splice(row, 1);

    // Move cursor to the end of what was the previous line
    doc.row = row - 1;
    doc.col = prevLine.length;

    updateDisplay();
    return true;
  }

  // ────── CASE 2: 
  // Normal word deletion inside the line ──────
  const beforeCursor = line.slice(0, doc.col);

  // Match the last sequence of non-whitespace 
  // characters before cursor
  const wordMatch = beforeCursor.match(/\S+\s*$/);

  // Rebuild line: everything before the word + everything after cursor
  if(size=='char'){
    newBefore = beforeCursor.slice(0, -1);
  } else newBefore = beforeCursor.slice(0, -wordMatch[0].length);
  const after = line.slice(doc.col);

  doc.lines[row] = newBefore + after;

  // Place cursor where the deleted word began
  doc.col = newBefore.length;

  updateDisplay();
  return true;
}
//start of parent function 
	removeWordOptions();
  let size='char';

  let special = NON_ALPHA_CHORDS[chord];
    // may fall over with n > 8 in future variants
//if (special  && 38 > lProduct > rProduct || chord?.[0] === '9' ) 
  if (special  && 38 > lProduct > rProduct || chord?.match('9') ) 
  {
    //  delete or special charac.
    if (special !== 'X' && special !== 'D')  return addSpecialChar(special); 
//  if (special !== 'D')  return addSpecialChar(special); 
    
    if(special == 'X') size = 'word';

    // delete entire word
    if (frag === '')  return del(size);
    
    // delete to even string
    if(evenString(frag)) frag = frag.replace(/.$/, '');
    frag = frag.replace(/.$/, '');
  
    let capsOpts =underlineFirstNLtrs(frag,caps);   
    if(dic[frag]) setWordOptions(capsOpts); 
    
    return true;
 }
}
//A function that splits the options list
//in two when the frag length is less than
//3 (legacy to original e.161 based neobet). 
//single and 2-finger chord words have
//4 options we split these in two pairs
//the front pair for right hand single chord words
//the rear pair other wise for composite and left
//hand words. This will need to understand when future
//variants are single finger chords as these will not
//afford handedness and pairwise reordering will be
//turned off. May still have handedness for single letter
//words i.e. 2n frags may be handed.
//function RHSawareDic(f,dict){
//}

/**
 * NEW & IMPROVED firstParse() – handles all thumb-chord cases
 * Fixes:
 *   • Focus loss when a single reserve word auto-inserts
 *   • Ghost <span id='firstParse'> or old options staying on screen
 *   • Inconsistent clearFrag() behaviour
 */

//User chooses from 2-3 options with two spacebar keys
//May try to add direct 2nd parse 'b' button to here so
//User can press it since they learn high freq misses
function firstParse() {
  const wdList =  dic[frag]?.split(sep1) || [];
  const wdListR = reserves[frag]?.split(sep1) ?? [];
// want to get rid of below once dic and reserves are
// merged
  let wd = '';

  switch (thumbChord) {
    case 'wd1'  : wd = wdList[0] || ''; break;
    case 'wd2'  : wd = wdList[1] || ''; break;
    case 'wd3':  wd = wdList[2] ?? wdListR[0] ?? ''; break;
    case 'wd4':  wd = wdList[3] ??  (
                 wdList[2] ? wdListR[0] : wdListR[1] 
            ) ?? '';
    case 'space': wd = ' '            ; break;

    case 'missed': 
        wd = (reserves[frag] || '').includes(sep1) 
          ? sep1+reserves[frag].replace(new RegExp(sep1,'g'), sep2)
                          .replace(/\+/g,"")
                          
       : (reserves[frag] || '').replace(/GT/g,"&gt;")
                       .replace(/LT/g,"&lt;") ;
//  wd= sep1 +wd
//  wd= ' ' +wd
      break;

    default:
      wd = ' ';
  }
  // ────── THIS BLOCK RUNS FOR EVERY SINGLE PATH ──────
  if(!(wd+' ').includes(sep2)) clearFrag();
  insertWord(wd);
  // ────── Only trigger next phase when needed ──────
  if (thumbChord === 'missed' && String(wd).includes(sep2)) {
    hŷlŷt_2nd_pās_opts();
  } else if (thumbChord === 'missed' && wd.includes('\u2014\u2014')) {
    need3rdPass = 1;
    mark3rdPassWds();
  }
}

/* Help user remember how many letters they have typed
 * by underlineing the start of the words presented to the user
 * the length of the underlineing is the same as the length of
 * the current frag. Do this to all options in dic[frg]
 * Think this may have screwed up when html color tags were
 * added or when I underlineed selection option font-weight css 
 */

function underlineFirstNLtrs(frg,dict) {
    let wds=dict[frg] || '';
    let n    =frg.length;
    if (typeof wds !== 'string' || n < 0) return '';
    return caps2underlineLcase(wds
        .split(sep1)
        .map(wd => {
            if (n > wd.length) return wd.toLowerCase();//??
            return wd.slice(0, n).toLowerCase() + wd.slice(n);
        })
//      .join('-'));
        .join(sep1));
}
//frag length is number of keys pressed so far for word
function caps2underlineLcase(str) {
    let underlineed=str
        .replace(/[a-zřẇġḩυ]+/g, '<z>$&</z>') // lcase ltrs in <b> tags
    return underlineed.toUpperCase();
}


//handle both hands chords
/**
 * Processes a chord input by calculating prime products
 * and updating the UI.
 * @param {void}
 * @returns {void}
 */

function processBiChord()
{

  console.trace("processBiChord WAS CALLED FROM:");   // ← shows exact call stack
  console.log("  Current presdKeys:", Array.from(presdKeys));

({ lp: lProduct, rp: rProduct, tp: thumbProduct } = calcPrimeProducts());
  ({ldigits: left, rdigits: right}  = mapChordToDigits(lProduct, rProduct));
  chord         = left+right;     
  thumbChord    = productMap[thumbProduct] || '';

  if(whenInputNonAlpha()) return;

  let pfrag=frag; 
  //appends chord and/or rejects ambig chord
  if (chord) {
   frag=appendChord_recursive(frag,left,right)
   console.log('dic[frag], frag, left, right',!dic[frag],frag,left,right); 
   if(!(frag)) {
     console.warn('ambigous chord frag, left, right',frag,left,right); 
      }} else console.warn('invalid chord, skips appendChord');
  if(!dic[frag]) 
  {
    frag=pfrag;
  }

//  let append='';
 
  if(whenInputIsWordOptionSelection(thumbChord)) return; 

  let capsOpts =underlineFirstNLtrs(frag,caps);   
//tidyWordOptions(capsOpts);
   setWordOptions(capsOpts);
  presdKeys.clear();
  keysDown=0;
}

// Function to handle non-alphabetic cases
function whenInputNonAlpha() {
    if (nonAlphabetic()) {
        presdKeys.clear();   
        keysDown=0;
        renderMarkdown();
        if (mdMatch(new RegExp(`\\n\\n${cursor}$`))) {
          reParseParagraph();
        }

       return true; // Early return for alignment
    }
    return false; // Optional: indicates normal flow continues
}

// Function to handle word option selection
function whenInputIsWordOptionSelection(thC) {
    if (thC) {
        firstParse();
        presdKeys.clear();
        keysDown=0;
        return true; // "We're done here. Word committed. Move on."
    }
  return false;
}

// Function to underline options based on current fragment length
function underlineOptionsToCurrentFragLength(frag) {
    const capsOpts = underlineFirstNLtrs(frag, caps);   
//  tidyWordOptions(capsOpts);
    setWordOptions(capsOpts);
    presdKeys.clear();
    keysDown=0;
}

function evenString(frag){String(frag).length % 2 == 0?true:false}

function setWordOptions(capsOpts)
{  
//  console.log('tidyWordOptions');    
//console.log('col:' + doc.col);    
 	removeWordOptions();

  if (!dic[frag]) return;

  opts=`<span id='firstParse'>${capsOpts}</span>`; 
  //renderMarkdown();
  insertWord(opts,false);
  doc.dCol(-opts.length);
  renderMarkdown();
}  


// event handling (keypresses) functions below

const inputRegex = /<input [^>]*>/;

//Third pass key handling
function on3rdPass(key) {
  if (key === 'enter') {
    const input = outpt2.querySelector('input.missing-word');
    if (input) {
      event.preventDefault();
      const value = input.value.trim() ;
      mdRepl(inputRegex, '');
      doc.col+=-missingRegEx.source.length;
      syncFromMarkdown();
//      vimLein(input.value)} else {
      if(typeof value =='string' && value.startsWith(':')){
      vimLein(value)} else {
      insertWord(value)  
      }
      renderMarkdown();
//    requestAnimationFrame(() => outputMarkdown.focus()); // back to source
      requestAnimationFrame(() => outputHTML.focus()); // back to source
      // Check for next missing word
      if (mdMatch(missingRegEx)) {
        mark3rdPassWds();
      } else {
        need3rdPass = 0;
      }
    }
  }
}
/* handle2ndPassWords this selects from the
 *
*/


function on2ndPass(key){
   event.preventDefault();
   console.log('on2ndPass');
   select2ndPassWd(key);
// reserveRegEx a regEx to find hyphenated reserve words
   if (!mdMatch(reserveRegEx)) {
     reParseParagraph(); // Check for missing words after 2nd pass
   }
   return;
}

document.addEventListener('keydown', (event) => {

 const key = event.key.toLowerCase();
 if(key.match(/tab|ctrl|esc/)) return;

//  console.log(`[KEYDOWN START] key=\( ${event.key}  repeat= \)${event.repeat}  code=${event.code}`);
 if (event.repeat && validKeys.has(key)) {
//   console.log(`[REPEAT IGNORED] ${key}`);   // temporary debug
   return;
 }
 
 if(presdKeys.has(key)) {
   console.log('repeated keydown');
   return;
 } 

// === NEW: Alt + Key menu shortcuts ===
  if (event.altKey) {
//    if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;

      switch (key) {
          case 'i': toggleMenu('file-dialog'); break;
//          case 't': outputHTML.focus(); break;
          case 'v': toggleMenu('view-menu'); break;
          case 'h': toggleMenu('help-menu'); break;
          case 'a': toggleMenu('about-menu'); break;
          case 'm': toggleMenu('code-menu'); outputMarkdown.focus(); break;
          case 'o': toggleMenu('editor-menu'); outputHTML.focus();break;
       // case 'c': document.getElementById('btn-clear')?.click(); break;
      }
      return;                    // optional: stop further processing
  }

  const editor = document.getElementById('outpt2');
 if (!editor.matches(':focus')) return;

 const active = document.activeElement;
 if ((active.tagName === 'INPUT' && 
   !active.classList?.contains('missing-word')) ||
// !active.id.includes('outpt2') ||
//   active.tagName === 'TEXTAREA' ||
     active.isContentEditable ||
     active.closest('dialog')) {
   return;   // ← browser handles the key normally
 }

 //######### arrow keys ############ 

  if (key.startsWith("arrow")||["home","end"].includes(key)) {
   event.preventDefault();
 
   switch (key) {
     case "arrowleft":  doc.dCol(-1); break;
     case "arrowright": doc.dCol(1);  break;
     case "arrowup":    doc.dRow(-1); break;
     case "arrowdown":  doc.dRow(1);  break;
     case "home":       doc.col=0;  break;
     case "end":        doc.col=doc.lines[doc.row].length-1;  break;
   }
    updateDisplay();
  }


//########## second parse ############

  if (mdMatch(spanRegEx)) {
   event.preventDefault();
//   removeWordOptions();
   if (optionKeys.includes(key)) {
     removeWordOptions();
     on2ndPass(key);
   }
   return;
 }


//######### third parse ##############

  if (need3rdPass) {
   on3rdPass(key); 
   return;
 }



//######## punctuation and digits ########
 if (passThroughKeys.has(key)) {
   event.preventDefault();
// setMd(md()+key);
   insertWord(key,false);
   renderMarkdown();
   return;
  }
 
// encoded digit keys, delete and enter  
  if (!validKeys.has(key)) return;


//####### first pass continues through ####

  event.preventDefault();
  presdKeys.add(key);
//if(!presdKeys.includes(key)) keysDown++;
  keysDown++;

  console.log('down,keys,key,count',presdKeys,key,keysDown);
});

document.addEventListener('keyup', (event) => {
  const key = event.key.toLowerCase();
  //early return for when outside editor or 
  //3rd parse enter is keyed
//  let active3rdParse = (document.activeElement.tagName == 'INPUT'); 
  //active.classList?.contains('missing-word')
  let active3rdParse = (document.activeElement.classList?.contains('missing-word'))
  console.log(active3rdParse);
  let inEditor=outputHTML.matches(':focus');
  if (!inEditor && !active3rdParse) return; 
  if (key !="enter" &&  active3rdParse) return;
  if (key =="enter" &&  active3rdParse) {
    on3rdPass(key); 
    return;
  }

//if(key.match(/tab|ctrl|esc/)){
  if(!validKeys.has(key)){
    keysDown=0;
    return;
  } 

//  if(!presdKeys.includes(key)) keysDown--;
  keysDown--;
    if(keysDown<0)keysDown=0;
  console.log('up,keys,key,count',presdKeys,key,keysDown);
  // Last key of the chord was just released → process it now
  if (keysDown === 0) {
    processBiChord();
  }
});
// Close all other when one is opened
document.addEventListener('click', function(e) {
  const summary = e.target.closest('summary');
  
  if (summary) {
    const details = summary.parentElement;   // the tag

    // Close all other tags
    document.querySelectorAll('details').forEach(otherDetails => {
      if (otherDetails !== details) {
        otherDetails.open = false;
      }
    });
  }
});

// Close menus when they lose focus
document.querySelectorAll('details').forEach(detail => {
    detail.addEventListener('focusout', function () {
        // Small delay so clicking inside dialog doesn't close it immediately
        setTimeout(() => {
            if (!detail.contains(document.activeElement)) {
                detail.open = false;
            }
        }, 10);
    });
});

// Button to go full screen
function goFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen({ navigationUI: "hide" });
  } else {
    document.exitFullscreen();
  }
}
