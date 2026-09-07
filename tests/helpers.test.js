import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { createLocalizer } from '../src/localization.js';
import { dataProblem } from '../src/data.js';
const languages=Object.fromEntries(readdirSync(new URL('../translations/',import.meta.url)).filter(file=>file.endsWith('.json')).map(file=>[file.slice(0,-5),JSON.parse(readFileSync(new URL(`../translations/${file}`,import.meta.url)))]));
for(const [language,expected] of [['zh','zh-Hans'],['zh-CN','zh-Hans'],['zh-SG','zh-Hans'],['zh-TW','zh-Hant'],['zh-HK','zh-Hant'],['zh-MO','zh-Hant'],['zh-Hans-TW','zh-Hans'],['zh-Hant-CN','zh-Hant'],['zh_Hant_HK','zh-Hant'],['hi-IN','hi'],['ar-EG','ar']]){
 test(`Locale fallback ${language}`,()=>{
  const {t,direction}=createLocalizer({language},{},languages);
  assert.equal(t('sandals'),languages[expected].sandals);
  assert.equal(direction,expected==='ar'?'rtl':'ltr');
 });
}
test('User language, custom text and direction override',()=>{
 const {t,direction}=createLocalizer({language:'auto',direction:'ltr',translations:{heading:'Custom'}},{locale:{language:'ar'}},languages);
 assert.equal(t('heading'),'Custom');assert.equal(t('sandals'),languages.ar.sandals);assert.equal(direction,'ltr');
 assert.equal(createLocalizer({language:42},{},languages).locale,'en');
});
const fixture=JSON.parse(readFileSync(new URL('../demo/fixtures.json',import.meta.url))).rain;
const config={entity:'sensor.demo'};
const now=Date.parse(fixture.updated_at);
test('Previous sensor without optional legwear still works',()=>{
 const attributes={...fixture};delete attributes.legwear;
 assert.equal(dataProblem(config,{state:fixture.outfit,attributes},now),null);
});
for(const [name,patch] of [['unknown garment',{top:'missing_art'}],['object accessory',{accessories:[{}]}],['null notes',{notes:null}],['bad outer',{outer:{}}],['inverted temperature',{temperature_min:50}],['inverted window',{window_end:fixture.window_start}]]){
 test(`Invalid data rejected: ${name}`,()=>assert.equal(dataProblem(config,{state:fixture.outfit,attributes:{...fixture,...patch}},now),'incompatible_data'));
}
test('Expiry boundary and window end both hide stale clothing',()=>{
 const state={state:fixture.outfit,attributes:fixture};
 assert.equal(dataProblem(config,state,Date.parse(fixture.valid_until)),'forecast_stale');
 assert.equal(dataProblem(config,{...state,attributes:{...fixture,valid_until:'2099-01-01T00:00:00Z'}},Date.parse(fixture.window_end)),'forecast_stale');
});
