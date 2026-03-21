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

const CHORD_TIMEOUT = 80;
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

function titleCase(word){
  len  = word.length;
  return word.charAt(0).toUpperCase() + word.substr(1-len)
}

// Runs title, upper and lowercase replacements
function caseReplace(text, match,replace){

 match_Re   = new RegExp(match,"g");//new

//MATCH   = match.toUpperCase();
 MATCH_Re  = new RegExp(match.toUpperCase(),"g")
 REPLACE = replace.toUpperCase();

// Match   = titleCase(match);
 Match_Re   = new RegExp(titleCase(match),"g");
 Replace = titleCase(replace);
  
// text    = text.replaceAll(match,replace);
// text    = text.replaceAll(MATCH,REPLACE);
// text    = text.replaceAll(Match,Replace);
 text    = text.replace(match_Re,replace);
 text    = text.replace(MATCH_Re,REPLACE);
 text    = text.replace(Match_Re,Replace);

 return text;

}
function loopReplace(t){

const obj = { 
  "πħ":'th', "ŝħ":'sh', "ĉħ":'ch', "þħ":'ph',
  //funky eye sound
  "îg0ħ":'iġḩ',
  //ing is treated as lexical/trigraph
  "iñg0":'ing',
  //complex vowels
  "ār(0)*":'ař', "ëw(0)*":'eẇ', "ør(0)*":'oř', "õw(0)*":'oẇ',
  "σì":'oi'    , "σy(0)*":'oÿ', "õù":'ou'    , "âì" :'ai'   , 
  "êè":'ee'    , "êà":'ea'    , "öò":'oo'    , "åw(0)*":'aẇ',
  "ey":'ey'     , "ãÿ":'aÿ'    , 
  



}
 
//Object.keys(obj).forEach(key => console.log(key, obj[key]));
Object.keys(obj).forEach(key => {
 t= caseReplace(t,key, obj[key]);
});

  return t;
}

//function format_augmented_words(t){
function format_augmented_words(t,style){
  // Step 1: Protect sequences that look like HTML entities
  // We use a negative lookahead to skip coloring if & is followed by entity-like content
  // But easier: replace known entities first with placeholders 
  // that won't match coloring
  //spread sound from one to two letters
  //ie dont treat h as silent its a digraph
  t=loopReplace(t);

// t=t.replace(/τħ/gi,'<vc>th</vc>');
  t=caseReplace(t,'τħ','<vc>th</vc>');
//  t=t.replace(/èŕ/gi,'eř');
  t=caseReplace(t,'èŕ','eř');
  t=t.replace(/[ħàèìòùĦÀÈÌÒÙ]/g, '<x>$&</x>');  
  //non doubled silents
  t = t.replace(/([a-zA-Zřẇġḩ])0/gi, '$1');
//  t=t.replace(/([a-zA-Z])(0)(?!\1)/gi, '<x>$1</x>');  
  //tag vowels <v>
  t=t.replace(/(?<![<][^>]*|&[^;]*)[aeŕiouâêîôûáéíóúåãāėëøöõőōüūÿŷẏýġḩřẇ]+/gi,'<v>$&</v>');
  //forgot what im doing next
  t=t.replace(/(<v[^<0]*)0/gi,'$1');
//t=t.replace(/τħ/gi,'<vc>th</vc>');
  //remaing doubled letters remove silent marking
  t=t.replace(/([a-zA-Z])0/gi,'$1');
  t=t.replace(/ñ/g,'n');
  t=t.replace(/Ñ/g,'N');
  //tag voiced consonants <vc>
  t=t.replace(/(?<![<][^>]*|&[^;]*)[BĈDĜJLMNRVZYŚbĉdĝjlmnrvzyś]+(?!<\/x)/gi,'<vc>$&</vc>');
  t=t.replace(/ÿ/g,'y');  t=t.replace(/Ÿ/g,'Y');
  t=t.replace(/ř/g,'r');  t=t.replace(/Ř/g,'R');
  t=t.replace(/ẇ/g,'w');  t=t.replace(/Ẇ/g,'W');
  t=t.replace(/ġ/g,'g');  t=t.replace(/Ġ/g,'G');
  t=t.replace(/ḩ/g,'h');  t=t.replace(/Ḩ/g,'H');
  t=t.replace(/υ/g,'u');  t=t.replace(/Υ/g,'U');
  //merge similar tags for debugging clarity 
  t=t.replace(/<\/v><v>|<\/x><x>|<\/vc><vc>/gi,'');
  //style="color"
//  console.log(style);
//if(style!='color') {
  if(!style.includes('color')) {
  t=t.replace(/\<(\/)*(v|vc|x)\>/g,"")
  } else {
  t=t.replace(/à/g,"a");t=t.replace(/À/g,"A");
  t=t.replace(/è/g,"e");t=t.replace(/È/g,"E");
  t=t.replace(/ì/g,"i");t=t.replace(/Ì/g,"I");
  t=t.replace(/ò/g,"o");t=t.replace(/Ò/g,"O");
  t=t.replace(/ù/g,"u");t=t.replace(/Ù/g,"U");
  t=t.replace(/ħ/g,"h");t=t.replace(/Ħ/g,"H");
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


// ───────────────────────────────────────────────
// Simple modal helper (using native <dialog> when possible)
function showSimpleModal(title, innerHTML, onConfirm) {
  const dialog = document.createElement('dialog');
  dialog.innerHTML = `
    <h4 style="margin-top:0;">${title}</h4>
    ${innerHTML}
    <div style="margin-top:1.2em; text-align:right;">
      <button type="button" id="modal-cancel">Cancel</button>
      <button type="button" id="modal-confirm" style="margin-left:0.8em;">OK</button>
    </div>
  `;
  document.body.appendChild(dialog);

  dialog.querySelector('#modal-confirm').onclick = () => {
    onConfirm(dialog);
    dialog.close();
  };
  dialog.querySelector('#modal-cancel').onclick = () => dialog.close();

  dialog.addEventListener('close', () => dialog.remove());
  dialog.showModal();
// ← ADD THIS (runs after the modal opens)
  requestAnimationFrame(() => {
    const fnameInput = dialog.querySelector('#save-fname');
    if (fnameInput) {
      fnameInput.focus();
      fnameInput.select();   // ← everything highlighted, ready to overwrite
    }
  });
}

// ───────────────────────────────────────────────
// Save as… dialog + logic
async function handleSaveAs() {
  const now = new Date().toISOString().slice(0,16).replace(/[:T-]/g, '');
  const firstLine = (md() || '').split('\n')[0]
    .replace(/^\s*#+\s*|\s*[-*_]+\s*$/g, '')
    .trim()
    .slice(0, 35) || 'chorded-notes';
  
  const suggestedName = `${firstLine || 'notes'}-${now}`;

  const content = `
    <label style="display:block; margin:0.8em 0;">
      Filename:
      <input type="text" id="save-fname" value="${suggestedName}" style="width:100%; padding:0.4em; margin-top:0.3em;">
    </label>
    
    <label style="display:block; margin:0.8em 0;">
      Format:
      <select id="save-format" style="width:100%; padding:0.4em;">
        <option value="md">Markdown (with phonetics / diacritics)</option>
        <option value="md-clean">Markdown (clean / ASCII only)</option>
        <option value="html">HTML (rendered + styles)</option>
      </select>
    </label>
  `;

  showSimpleModal("Save As…", content, async (dlg) => {
    const fname = (dlg.querySelector('#save-fname').value || 'notes').trim();
    const format = dlg.querySelector('#save-format').value;

    let finalName, finalContent, mimeType;

    if (format === 'md') {
      finalName = fname + '.md';
      finalContent = md();
      mimeType = 'text/markdown; charset=utf-8';
    } else if (format === 'md-clean') {
      finalName = fname + '.md';
      finalContent = removeDiacritics(md());
      mimeType = 'text/markdown; charset=utf-8';
    } else if (format === 'html') {
      finalName = fname + '.html';
      finalContent = await makeHTML();
      mimeType = 'text/html; charset=utf-8';
    }

    // Try modern File System Access API first
    if ('showSaveFilePicker' in window) {
      try {
        const handle = await window.showSaveFilePicker({
          suggestedName: finalName,
          types: [{
            description: format === 'html' ? 'HTML Files' : 'Markdown Files',
            accept: format === 'html' 
              ? { 'text/html': ['.html'] } 
              : { 'text/markdown': ['.md'], 'text/plain': ['.txt'] }
          }]
        });

        const writable = await handle.createWritable();
        await writable.write(finalContent);
        await writable.close();
        return; // success — no need for fallback
      } catch (err) {
        if (err.name === 'AbortError') return; // user canceled
        console.warn('Native save failed, falling back →', err);
      }
    }

    // Fallback: old-school download
    const blob = new Blob(['\uFEFF' + finalContent], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = finalName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  });

}

// ───────────────────────────────────────────────
// Load Markdown file
function handleLoadMarkdown() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.md,.markdown,.txt';
  input.onchange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      setMd(text);
      renderMarkdown();
      // Optional: show brief feedback
      // alert(`Loaded ${file.name}`);
    } catch (err) {
      console.error('Load failed:', err);
      alert('Could not read the file.');
    }
  };
  input.click();
}

// ───────────────────────────────────────────────
// Wire everything up (run once on page load)
function initFileControls() {
  document.getElementById('btn-save-as')?.addEventListener('click', handleSaveAs);
  document.getElementById('btn-load')?.addEventListener('click', handleLoadMarkdown);
  document.getElementById('btn-clear')?.addEventListener('click', () => {
      setMd(' ');
      renderMarkdown();
    });
 }

window.addEventListener('DOMContentLoaded', initFileControls);
