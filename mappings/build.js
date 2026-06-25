
// mappings/build.js
const fs = require('fs');
const path = require('path');

console.log("🚀 Building chording app variants...\n");

const variants = [
  { id: 'v1', title: 'Variant 1', dict: 'uni-8-select-3-homos' },
  { id: 'v2', title: 'Variant 2', dict: 'uni-8-select-3-homos' },
  { id: 'v5', title: 'Variant 5', dict: 'uni-8-select-3-homos' },
  { id: 'v4', title: 'Variant 4', dict: 'di-36-select-3-homos' },   // ← special one
];

const header = fs.readFileSync('header.html', 'utf8');
const footer = fs.readFileSync('footer.html', 'utf8');

variants.forEach(variant => {
    const dir = path.join('.', variant.id);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    let content = header.replace('[[TITLE]]', variant.title);

    // Add variant-specific keymap
    const keymapFile = `${variant.id}-keymap.html`;
    if (fs.existsSync(keymapFile)) {
        content += fs.readFileSync(keymapFile, 'utf8');
        console.log(`✓ Added ${keymapFile}`);
    }

    // Add footer with correct dictionary
    let finalFooter = footer.replace(/\[\[DICTIONARY\]\]/g, variant.dict);
    content += finalFooter;

    const outputPath = path.join(dir, 'index.html');
    fs.writeFileSync(outputPath, content);
    
    console.log(`✅ Built ${variant.id}/index.html  (using ${variant.dict})`);
});

console.log("\n🎉 All variants built successfully!");
