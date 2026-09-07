const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.BROWSER_CHANNEL?{channel:process.env.BROWSER_CHANNEL}:{})});
 const page=await browser.newPage({viewport:{width:1280,height:1100}});
 const errors=[];page.on('pageerror',e=>errors.push(String(e)));
 const output=process.env.QA_OUTPUT||'qa';fs.mkdirSync(output,{recursive:true});
 await page.goto(process.env.DEMO_URL||'http://127.0.0.1:8768/demo/');
 await page.locator('#boy .child').waitFor();
 await page.screenshot({path:`${output}/desktop-rain.png`,fullPage:true});
 for(const scenario of ['rain','winter','hot','cap','layers','storm','swim','daily','tights','setup','missing']){
  await page.selectOption('#scenario',scenario);
  const text=await page.locator('#boy ha-card').innerText();
  if(scenario==='rain')assert(text.includes('Gumicsizma')&&text.includes('Esernyő'));
  if(scenario==='winter')assert(text.includes('Télikabát')&&text.includes('Kesztyű')&&text.includes('Meleg zokni'));
  if(scenario==='tights')assert(text.includes('Harisnya')&&text.includes('A nadrág alá'));
  if(scenario==='setup')assert(text.includes('Nem kell saját template szenzort'));
  if(scenario==='hot')assert(text.includes('Rövidnadrág')&&text.includes('Szalmakalap'));
  if(scenario==='storm')assert(text.includes('Zivatar')&&!text.includes('Esernyő'));
  if(scenario==='swim')assert(text.includes('Fürdőruha'));
  if(scenario==='daily')assert(text.includes('Napi becslés'));
  if(scenario==='missing')assert.equal(await page.locator('#boy .child').count(),0);
 }
 for(const [scenario,item,label] of [['hot','sunhat','Szalmakalap'],['cap','baseball_cap','Baseballsapka']]){
  await page.selectOption('#scenario',scenario);
  for(const character of ['boy','girl']){
   assert.equal(await page.locator(`#${character} [data-headwear="${item}"]`).count(),1);
   assert((await page.locator(`#${character} ha-card`).innerText()).includes(label));
  }
  await page.screenshot({path:`${output}/headwear-${scenario}.png`,fullPage:true});
 }
 await page.selectOption('#scenario','rain');await page.selectOption('#language','en');
 assert((await page.locator('#boy ha-card').innerText()).includes('Rain boots'));
 await page.selectOption('#language','ar');
 assert.equal(await page.locator('#boy').getAttribute('dir'),'rtl');
 assert((await page.locator('#boy ha-card').innerText()).includes('حذاء مطر'));
 await page.screenshot({path:`${output}/desktop-rtl.png`,fullPage:true});
 await page.selectOption('#language','hu');
 await page.setViewportSize({width:390,height:844});
 for(const scenario of ['rain','winter','hot','cap','storm','swim','tights','setup','missing']){
  await page.selectOption('#scenario',scenario);
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
  assert.equal(overflow,false,`Page overflow: ${scenario}`);
  const cardOverflow=await page.locator('#boy').evaluate(el=>{const c=el.shadowRoot.querySelector('ha-card');return c.scrollWidth>c.clientWidth;});
  assert.equal(cardOverflow,false,`Card overflow: ${scenario}`);
  await page.screenshot({path:`${output}/mobile-${scenario}.png`,fullPage:true});
 }
 await page.selectOption('#scenario','rain');
 await page.locator('#boy').evaluate(el=>el.setConfig({...el._config,title:'<img src=x onerror=alert(1)>',translations:{rain_boots:'<script>bad()</script>'}}));
 assert.equal(await page.locator('#boy img').count(),0);assert.equal(await page.locator('#boy script').count(),0);
 await page.evaluate(()=>window.showScenario());
 await page.locator('#boy').evaluate(el=>{el._hass.states['sensor.demo'].attributes.valid_until='2000-01-01T00:00:00Z';el.render();});
 assert.equal(await page.locator('#boy .child').count(),0);
 // Diagnose configuration errors separately; never draw clothing from bad data.
 for(const [kind,expected] of [['none','setup_needed'],['missing','entity_missing'],['wrong','wrong_entity'],['weather','wrong_entity'],['unavailable','forecast_unavailable'],['unknown','forecast_pending'],['expired','forecast_stale'],['schema','incompatible_data'],['broken','incompatible_data']]){
  await page.selectOption('#scenario','rain');await page.evaluate(()=>window.showScenario());
  await page.locator('#boy').evaluate((el,kind)=>{
    const entity='sensor.demo', state=el._hass.states[entity];
    if(kind==='none')el.setConfig({});
    if(kind==='missing')el.setConfig({entity:'sensor.does_not_exist'});
    if(kind==='wrong'){state.attributes={};el.render();}
    if(kind==='weather'){el._hass.states['weather.home']={state:'sunny',attributes:{}};el.setConfig({entity:'weather.home'});}
    if(kind==='unavailable'||kind==='unknown'){state.state=kind;el.render();}
    if(kind==='expired'){state.attributes.valid_until='2000-01-01T00:00:00Z';el.render();}
    if(kind==='schema'){state.attributes.schema_version=99;el.render();}
    if(kind==='broken'){delete state.attributes.window_start;el.render();}
  },kind);
  assert.equal(await page.locator('#boy [data-problem]').getAttribute('data-problem'),expected);
  assert.equal(await page.locator('#boy .child').count(),0);
  assert.equal(await page.locator('#boy .setup-help a').count(),2);
 }
 await page.evaluate(()=>window.showScenario());
 await page.locator('#boy').evaluate(el=>{delete el._hass.states['sensor.demo'].attributes.legwear;el.render();});
 assert.equal(await page.locator('#boy .child').count(),1,'older integration data still renders');
 await page.selectOption('#scenario','tights');
 for(const sex of ['boy','girl']){
  assert.equal(await page.locator(`#${sex} .child [data-legwear="tights"]`).count(),1);
  assert.equal(await page.locator(`#${sex} .item[data-item="tights"]`).count(),1);
  assert.equal(await page.locator(`#${sex} .item[data-item="socks"]`).count(),0);
 }
 await page.setViewportSize({width:1280,height:800});
 await page.locator('#boy').evaluate(el=>el.setConfig({...el._config,compact:true}));
 assert((await page.locator('#boy').boundingBox()).height<=800,'compact tights card height');
 await page.locator('#boy').screenshot({path:`${output}/tights-card.png`});
 // Native editor receives integration filtering and retains advanced YAML options.
 const editorResult=await page.evaluate(()=>{
  const card=document.querySelector('#boy'), editor=card.constructor.getConfigElement();
  editor.setConfig({entity:'sensor.demo',translations:{wear:'Test'}});editor.hass=card._hass;
  const form=editor.shadowRoot.querySelector('ha-form');
  let result;editor.addEventListener('config-changed',e=>result=e.detail.config);
  form.dispatchEvent(new CustomEvent('value-changed',{detail:{value:{entity:'sensor.other'}}}));
  return {filter:form.schema[0].selector.entity.filter,result,emptyStub:card.constructor.getStubConfig({states:{}})};
 });
 assert.deepEqual(editorResult.filter,{domain:'sensor',integration:'kids_outfit'});
 assert.equal(editorResult.result.translations.wear,'Test');
 assert.deepEqual(editorResult.emptyStub,{});
 assert.equal(errors.length,0,errors.join('\n'));
 console.log('PASS: weather and legwear, 9 diagnostic states, old sensor compatibility, editor contract, HU/EN/RTL, desktop/390px, escaping; no browser errors.');
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
