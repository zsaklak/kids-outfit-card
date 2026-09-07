import {readFileSync,writeFileSync,readdirSync,mkdirSync} from 'node:fs';
const {version}=JSON.parse(readFileSync(new URL('./package.json',import.meta.url),'utf8'));
const languages=Object.fromEntries(readdirSync(new URL('./translations/',import.meta.url)).filter(f=>f.endsWith('.json')).sort().map(f=>[f.slice(0,-5),JSON.parse(readFileSync(new URL(`./translations/${f}`,import.meta.url),'utf8'))]));
for(const [lang,dict] of Object.entries(languages)){
  for(const key of Object.keys(languages.en)) if(typeof dict[key]!=='string') throw new Error(`${lang}: missing ${key}`);
}
const art=readFileSync(new URL('./src/art.js',import.meta.url),'utf8').replaceAll('export function','function');
const card=readFileSync(new URL('./src/card.js',import.meta.url),'utf8').replace(/^import .*\n/,'').replace('export class','class');
mkdirSync(new URL('./dist/',import.meta.url),{recursive:true});
writeFileSync(new URL('./dist/kids-outfit-card.js',import.meta.url),`// Kids Outfit Card v${version} — MIT — Zsáklak\nconst LANGUAGES=${JSON.stringify(languages)};\n${art}\n${card}`);
console.log(`Built self-contained card with ${Object.keys(languages).length} languages.`);
