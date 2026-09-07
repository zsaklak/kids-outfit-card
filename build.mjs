import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'node:fs';

const read = path => readFileSync(new URL(path, import.meta.url), 'utf8');
const { version } = JSON.parse(read('./package.json'));
const languages = Object.fromEntries(
  readdirSync(new URL('./translations/', import.meta.url))
    .filter(file => file.endsWith('.json')).sort()
    .map(file => [file.slice(0, -5), JSON.parse(read(`./translations/${file}`))])
);
const expectedKeys = Object.keys(languages.en).sort();
for (const [language, dictionary] of Object.entries(languages)) {
  if (JSON.stringify(Object.keys(dictionary).sort()) !== JSON.stringify(expectedKeys)) {
    throw new Error(`${language}: translation keys differ from English`);
  }
  for (const key of expectedKeys) {
    if (typeof dictionary[key] !== 'string' || !dictionary[key].trim()) {
      throw new Error(`${language}: missing or empty ${key}`);
    }
  }
}
// Explicit dependency order; all source imports are local, with no runtime loader.
const modules = ['art', 'localization', 'data', 'styles', 'card'];
const source = modules.map(name => {
  const code = read(`./src/${name}.js`)
    .replace(/^import .*;\r?\n/gm, '')
    .replace(/^export (?=(?:function|class|const) )/gm, '');
  return `// Source: ${name}.js\n${code}`;
}).join('\n');
mkdirSync(new URL('./dist/', import.meta.url), { recursive: true });
writeFileSync(new URL('./dist/kids-outfit-card.js', import.meta.url),
  `// Kids Outfit Card v${version} — MIT — Zsáklak\nconst LANGUAGES=${JSON.stringify(languages)};\n${source}`);
console.log(`Built self-contained card with ${Object.keys(languages).length} translation variants.`);
