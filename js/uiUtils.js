//for DOM related stuff
const outpt = document.getElementById('output');
const outpt2 = document.getElementById('outpt2');
const wdOpts = document.getElementById('wdOpts');

const outputMarkdown = document.getElementById("output");
const outputHTML     = document.getElementById("outpt2");
const markLetters    = document.getElementById("markLetters")
const colorVowels    = document.getElementById("colorVowels")
   
colorVowels.addEventListener('change', renderMarkdown);
markLetters.addEventListener('change', renderMarkdown);

const md = () => {
  if (!outputMarkdown || !outputMarkdown.value) throw new error("outputMarkdown is undEFined or lacks a value property");
  return outputMarkdown.value;
};
const setMd = (value) => {
  if (!outputMarkdown) throw new error("outputMarkdown is undEFined");
  outputMarkdown.value = value;
};

const html = () => {
  if (!outputHTML) throw new error("outputHTML is undEFined");
  return outputHTML.innerHTML;
};
const setHtml = (value) => {
  if (!outputHTML) throw new error("outputHTML is undEFined");
  outputHTML.innerHTML = value;
};
 
const mdRepl = (pattern, replacement) => {
  setMd(md().replace(pattern, replacement));
};

const mdMatch = (pattern) => {
  return md().match(pattern);
};


const dbgKeys = document.getElementById('debugKeys');
const dbgLProduct = document.getElementById('debugLeftProduct');
const dbgRProduct = document.getElementById('debugRightProduct');
const dbgThumbs = document.getElementById('debugThumbs');
const dbgChord = document.getElementById('debugChord');
const dbgWd = document.getElementById('debugWord');

const CHORD_TIMEOUT = 50;
//const CHORD_TIMEOUT = 110;

function clearFrag(){
   frag='';
   removeWordOptions();
   lastDecidingSpan='';
 }

/**
 * insertWord — the single source of truth for ALL word insertion
 * Replaces firstParse() word insertion, second-parse insertion, singleton reserves, everything.
 */

function insertWord(word, addSpace = true) {
  removeWordOptions();

  let text = removeCursor(md());
  text += word;
  if (addSpace) text += ' ';
  text += cursor;

  setMd(text);
  renderMarkdown();
}

function renderMarkdown() {
  let text = md();

  // 1. Remove any old cursor first
  text = removeCursor(text);

  // 2. Apply affixes and case marking in memory (NO setMd!)
  text = parseAffixes(text);
  text = parseCaseMarking(text);
  text = text.replace(/^ {4}/gm, '\u00A0\u00A0\u00A0\u00A0');

  // 3. NOW update the markdown — ONCE
  setMd(text);

  // 4. Add exactly ONE cursor at the end
  if (!text.endsWith(cursor))  text += cursor; 

  // 5. Render to HTML
  let htm = marked.parse(text);

  // 6. Double-space → long cursor (your visual style)
  htm = htm.replace(/ + \u275A/g, '\uFE4E\uFE4E' + cursor);

  // 7. Apply phonetic formatting
  
  let state = (markLetters.checked ? "marks " : "") +
              (colorVowels.checked ? "color" : "");

//  let state =
//  (document.getElementById("markLetters").checked ? "marks " : "") +
//  (document.getElementById("colorVowels").checked ? "color" : "");
  
  htm = format_augmented_words(htm,state);
  // 7b. Unescape common entities you care about
  htm = htm.replace(/&lt;/g, '<')
           .replace(/&gt;/g, '>')
           .replace(/&amp;/g, '&')
           .replace(/&quot;/g, '"');

  // 8. Update preview
  setHtml(htm);

  // 9. Focus and scroll
  requestAnimationFrame(() => {
    outputMarkdown.focus();
    outputMarkdown.setSelectionRange(text.length, text.length);
    outputMarkdown.scrollTop = outputMarkdown.scrollHeight;
  });
}
// Utility to remove emoji cursor
function removeCursor(text) {
    return text.replace(/\u275A+$/, '');
}


// ... insert in selectHyphenOption, processBiChord, handleNONALPHAbeticchord, secondParse as bEFore ...
function updtDebugInfo(keys, lProduct, rProduct, thumbChord, chord, wd) {
  dbgKeys.textContent = keys.size ? [...keys].join(' ') : ' ';
  dbgLProduct.textContent = lProduct || '-';
  dbgRProduct.textContent = rProduct || '-';
  dbgThumbs.textContent = thumbChord || '-'
  dbgChord.textContent = chord || '-';
  dbgWd.textContent = wd || '-';
}

// function to word options and containing span tags
function removeWordOptions() {
  mdRepl(/<span id='firstParse'.*?<\/span>|\u275A+/g, '');
  let firstParseSpan = outpt2.querySelector('#firstParse');
  lastDecidingSpan = firstParseSpan ? firstParseSpan.innerHTML : '';
  if (firstParseSpan) { 
  firstParseSpan.remove()
  renderMarkdown();
  }
}

//function format_augmented_words(t){
function format_augmented_words(t,style){
  // Step 1: Protect sequences that look like HTML entities
  // We use a negative lookahead to skip coloring if & is followed by entity-like content
  // But easier: replace known entities first with placeholders 
  // that won't match coloring
  //spread sound from one to two letters
  //ie dont treat h as silent its a digraph
  t=t.replace(/πħ/gi,'th');
  t=t.replace(/ŝħ/gi,'sh');
  t=t.replace(/ĉħ/gi,'ch');
  t=t.replace(/þħ/gi,'ph');
  //funky eye sound
  t=t.replace(/îg0ħ/gi,'iġḩ');
  //ing is treated as lexical/trigraph
  t=t.replace(/iñg0/gi,'ing');
  //complex vowels
  t=t.replace(/ār/gi, 'ař');
  t=t.replace(/ëw(0)*/gi, 'eẇ');
  t=t.replace(/ør/gi, 'oř');
  t=t.replace(/õw(0)*/gi,'oẇ');
  t=t.replace(/σì/gi,'oi');
  t=t.replace(/σy/gi,'oy');
  t=t.replace(/õù/gi,'ou');
  t=t.replace(/âì/gi,'ai');
  t=t.replace(/êè/gi,'ee');
  t=t.replace(/êà/gi,'ea');
  t=t.replace(/öò/gi,'oo');
  t=t.replace(/åw(0)*/gi,'aẇ');
  //tag silent letters <x>
  //vowels and h
  t=t.replace(/τħ/gi,'<vc>th</vc>');
  t=t.replace(/èŕ/gi,'eř');
  t=t.replace(/[ħàèìòù]/gi, '<x>$&</x>');  
  //non doubled silents
  t = t.replace(/([a-zA-Zřẇġḩ])0/gi, '$1');
//  t=t.replace(/([a-zA-Z])(0)(?!\1)/gi, '<x>$1</x>');  
  //tag vowels <v>
  t=t.replace(/(?<![<][^>]*|&[^;]*)[aeŕiouâêîôûáéíóúåãāėëøöõőōüūŷẏýġḩřẇ]+/gi,'<v>$&</v>');
  //forgot what im doing next
  t=t.replace(/(<v[^<0]*)0/gi,'$1');
//t=t.replace(/τħ/gi,'<vc>th</vc>');
  //remaing doubled letters remove silent marking
  t=t.replace(/([a-zA-Z])0/gi,'$1');
  t=t.replace(/ñ/g,'n');
  t=t.replace(/Ñ/g,'N');
  //tag voiced consonants <vc>
  t=t.replace(/(?<![<][^>]*|&[^;]*)[BĈDĜJLMNRVZYŚbĉdĝjlmnrvzyś]+(?!<\/x)/gi,'<vc>$&</vc>');
  t=t.replace(/ř/g,'r');
  t=t.replace(/ẇ/g,'w');
  t=t.replace(/ġ/g,'g');
  t=t.replace(/ḩ/g,'h');
  //merge similar tags for debugging clarity 
  t=t.replace(/<\/v><v>|<\/x><x>|<\/vc><vc>/gi,'');
  //style="color"
  console.log(style);
//if(style!='color') {
  if(!style.includes('color')) {
  t=t.replace(/\<(\/)*(v|vc|x)\>/g,"")
  } else {
  t=t.replace(/à/g,"a");
  t=t.replace(/è/g,"e");
  t=t.replace(/ì/g,"i");
  t=t.replace(/ò/g,"o");
  t=t.replace(/ù/g,"u");
  t=t.replace(/ħ/g,"h");
  }
  
 if(!style.includes("marks")) t=removeDiacritics(t);
 return t;
}

function removeDiacritics(str) {
  str=str.replace(/ħ/g,"h");
  str=str.replace(/Ħ/,"H");
  str=str.replace(/[τπ]/g,"t");
  str=str.replace(/[ΤΠ]/g,"T");
  return str
    .normalize('NFD')  // Decompose: e.g., 'á' → 'a' + combining acute accent
    .replace(/[0ħ\u0300-\u036f]/g, '');  // Remove the diacritic marks
}

function downloadContent({ content, filename, type, linkId }) {
  const link = document.getElementById(linkId);
  if (!link) return console.error(`Link #${linkId} not found`);

  const blob = new Blob(['\uFEFF'+ content], { type });
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.download = filename;
  link.click();
  
  setTimeout(() => {
    link.href = '#';
    link.download = '';
    URL.revokeObjectURL(url);
  }, 100);
}



async function makeHTML(){

  const htmlContent = document.getElementById('outpt2').innerHTML;

  // 1. Fetch the actual CSS file from server
  let css = '';
  try {
    const response = await fetch('../../styles/styles.css');
    if (response.ok) {
      css = await response.text();
    } else {
      console.warn('CSS fetch failed, falling back to inline styles');
    }
  } catch (err) {
    console.warn('CSS fetch failed', err);
  }

  // 2. Build full HTML with embedded CSS
  const fullHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Exported Notes</title>
  <style>
    /* Embedded live CSS */
    ${css}
    
    /* Fallback: ensure v/vc colors */
    v  { color: red  !important; }
    vc { color: blue !important; }
    x  { color: grey !important; }
  </style>
</head>
<body>
  ${htmlContent}
</body>
</html>`;
return fullHTML;
}

let downloadingMD = false;
let downloadingHTML = false;

function exportMD() {
 
  if (downloadingMD) return;  // ← BLOCK REPEAT
  downloadingMD = true;
  
  const md = document.getElementById('output').value;
  
  if (!md.trim()) return alert('No markdown.');
  downloadContent({ content: md, filename: `notes-${Date.now()}.md`, type: 'text/markdown; charset=utf-8', linkId: 'md_download' });
  downloadContent({ content: removeDiacritics(md), filename: `TO_notes-${Date.now()}.md`, type: 'text/markdown; charset=utf-8', linkId: 'TO_md_download' });

if (confirm('Download HTML too?')) {
    exportHTML();  // chain
  } else {
    downloading = false;
  }
  setTimeout(() => downloadingMD = false, 1000);  // ← 1s cooldown
}

async function exportHTML() {
 
  if (downloadingHTML) return;  // ← BLOCK REPEAT
  downloadingHTML = true;

  const htmlContent = document.getElementById('outpt2').innerHTML;
  
  if (!htmlContent.trim()) return alert('No HTML.');
  const fullHTML = await makeHTML();
  downloadContent({ content: fullHTML, filename: `rendered-${Date.now()}.html`, type: 'text/html; charset=utf-8', linkId: 'html_download' });

  setTimeout(() => downloadingHTML = false, 1000);  // ← 1s cooldown
}
