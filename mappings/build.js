
// mappings/build.js
const fs = require('fs');
const path = require('path');

console.log("🚀 Building chording app variants...\n");

const variants = [
  { id: 'v1', title: 'Variant 1', dict: 'di-36-select-3-homos', pairwise_reordered_dic : true },
  { id: 'v2', title: 'Variant 2', dict: 'di-36-select-3-homos', pairwise_reordered_dic : true },
  { id: 'v5', title: 'Variant 5', dict: 'di-36-select-3-homos', pairwise_reordered_dic : true },
  { id: 'v4', title: 'Variant 4', dict: 'di-36-select-3-homos', pairwise_reordered_dic : true },   // ← special one
];

const index = fs.readFileSync('newindex.html', 'utf8');

variants.forEach(variant => {
    const dir = path.join('.', variant.id);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    let content = index.replaceAll('[[ID]]', variant.id)
                        .replace('[[TITLE]]', variant.title)
                        .replace(/\[\[DICTIONARY\]\]/g, variant.dict)
                        .replace(/\[\[PAIRWISE_REORDERED_DIC\]\]/g, variant.pairwise_reordered_dic);
      // Add footer with correct dictionary

    const outputPath = path.join(dir, 'index.html');
    fs.writeFileSync(outputPath, content);
    
    console.log(`✅ Built ${variant.id}/index.html  (using ${variant.dict})`);
});

console.log("\n🎉 All variants built successfully!");
