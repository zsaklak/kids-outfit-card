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
 for(const scenario of ['rain','winter','hot','layers','storm','swim','daily','missing']){
  await page.selectOption('#scenario',scenario);
  const text=await page.locator('#boy ha-card').innerText();
  if(scenario==='rain')assert(text.includes('Gumicsizma')&&text.includes('Esernyő'));
  if(scenario==='winter')assert(text.includes('Télikabát')&&text.includes('Kesztyű'));
  if(scenario==='hot')assert(text.includes('Rövidnadrág')&&text.includes('Napkalap'));
  if(scenario==='storm')assert(text.includes('Zivatar')&&!text.includes('Esernyő'));
  if(scenario==='swim')assert(text.includes('Fürdőruha'));
  if(scenario==='daily')assert(text.includes('Napi becslés'));
  if(scenario==='missing')assert.equal(await page.locator('#boy .child').count(),0);
 }
 await page.selectOption('#scenario','rain');await page.selectOption('#language','en');
 assert((await page.locator('#boy ha-card').innerText()).includes('Rain boots'));
 await page.selectOption('#language','ar');
 assert.equal(await page.locator('#boy').getAttribute('dir'),'rtl');
 assert((await page.locator('#boy ha-card').innerText()).includes('حذاء مطر'));
 await page.screenshot({path:`${output}/desktop-rtl.png`,fullPage:true});
 await page.selectOption('#language','hu');
 await page.setViewportSize({width:390,height:844});
 for(const scenario of ['rain','winter','hot','storm','swim','missing']){
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
 assert.equal(errors.length,0,errors.join('\n'));
 console.log('PASS: 8 weather states, HU/EN/custom RTL, 390px overflow, escaping, stale-data hiding; no browser errors.');
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
