//for DOM related stuff
const outpt = document.getElementById('output');
const outpt2 = document.getElementById('outpt2');
const wdOpts = document.getElementById('wdOpts');

const outputMarkdown = document.getElementById("output");
const outputHTML = document.getElementById("outpt2");

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

//const CHORD_TIMEOUT = 80;
const CHORD_TIMEOUT = 110;

function renderMarkdown() {
  let htm=marked.parse(md());
  htm  = htm.replace(/ + \u275A/,"\uFE4E\uFE4E\u275A")
  htm = format_augmented_words(htm);
  setHtml(htm);
  outputMarkdown.focus();
  outputMarkdown.scrollTop = outputMarkdown.scrollHeight;
}

// Utility to remove emoji cursor
function removeEmojiCursor(text) {
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
  mdRepl(/<span id='deciding'.*?<\/span>|\u275A+/g, '');
  let decidingSpan = outpt2.querySelector('#deciding');
  lastDecidingSpan = decidingSpan ? decidingSpan.innerHTML : '';
  if (decidingSpan) { 
  decidingSpan.remove()
  renderMarkdown();
  }
}

function format_augmented_words(t){
  t=t.replace(/πħ/gi,'th');
  t=t.replace(/ŝħ/gi,'sh');
  t=t.replace(/ĉħ/gi,'ch');
  t=t.replace(/þħ/gi,'ph');
  t=t.replace(/îg0ħ/gi,'iġḩ');
  t=t.replace(/iñg0/gi,'ing');
  t=t.replace(/ār/gi, 'ař');
  t=t.replace(/ëw(0)*/gi, 'eẇ');
  t=t.replace(/ør/gi, 'oř');
  t=t.replace(/õw(0)*/gi,'oẇ');
  t=t.replace(/õù/gi,'ou');
  t=t.replace(/âì/gi,'ai');
  t=t.replace(/êè/gi,'ee');
  t=t.replace(/êà/gi,'ea');
  t=t.replace(/öò/gi,'oo');
  t=t.replace(/åw(0)*/gi,'aẇ');
  t=t.replace(/èŕ/gi,'eř');
  t=t.replace(/(?<![<][^>]*)[aeŕiouâêîôûáéíóúåãāėëøöõőōüūŷẏýġḩřẇ]+/gi,'<v>$&</v>');
  t=t.replace(/(<v[^<0]*)0/gi,'$1');
  t=t.replace(/(.)0($1)/gi,'$1$2');
  t=t.replace(/τħ/gi,'<vc>th</vc>');
  t=t.replace(/[ħàèìòù]+|(.)0(?!$1)/gi,'<x>$&</x>');
  t=t.replace(/ñ/g,'n');
  t=t.replace(/Ñ/g,'N');
  t=t.replace(/(?<![</][^>]*)[BĈDĜJLMNRVZYŚbĉdĝjlmnrvzyś]+/gi,'<vc>$&</vc>');
  t=t.replace(/ř/g,'r');
  t=t.replace(/ẇ/g,'w');
  t=t.replace(/ġ/g,'g');
  t=t.replace(/ḩ/g,'h');
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
