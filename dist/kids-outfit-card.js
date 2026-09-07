// Kids Outfit Card v0.3.0 — MIT — Zsáklak
const LANGUAGES={"en":{"brand":"KIDS OUTFIT","heading":"Let's get dressed!","wear":"Put these on","pack":"Take with you","today":"Today","tomorrow":"Tomorrow","day":"School day","feels":"Feels like","rain":"Rain expected","dry":"Ready to go","snow":"Snow expected","warning":"Check with an adult","unavailable":"Let's check the weather together","unavailable_detail":"There is no fresh forecast. Ask an adult to help choose your clothes.","updated":"Updated","details":"For grown-ups","daily":"Daily estimate","hourly":"Hourly forecast","figure":"Your clothes for going outside","entity":"Outfit sensor","language":"Language (auto follows Home Assistant)","title":"Custom title","character":"Character","auto":"Automatic","boy":"Boy","girl":"Girl","unit":"Temperature unit","skin":"Skin colour (hex)","hair":"Hair colour (hex)","direction":"Text direction","tshirt":"T-shirt","long_sleeve":"Long-sleeve top","sweater":"Sweater","winter_coat":"Winter coat","jacket":"Jacket","light_jacket":"Light jacket","raincoat":"Raincoat","trousers":"Long trousers","shorts":"Shorts","trainers":"Trainers","sandals":"Sandals","winter_boots":"Warm boots","rain_boots":"Rain boots","beanie":"Warm hat","sunhat":"Straw hat","scarf":"Scarf","gloves":"Gloves","umbrella":"Umbrella","sunscreen":"Sunscreen","swimsuit":"Swimwear","towel":"Towel","waterproof":"Wear a waterproof outer layer.","removable_layer":"Temperatures vary: take the outer layer off when you feel warm.","daily_estimate":"Daily estimate: the minimum may occur overnight.","remaining_day":"This recommendation covers the rest of the day.","missing_data":"Some wind or precipitation details are missing. Check before leaving.","storm":"Thunderstorms or strong winds expected. Check with an adult before leaving!","rain_layer":"Waterproof","layer":"Removable layer","config_error":"Choose a sensor entity in the card settings.","compact":"Compact wall tablet layout","socks":"Socks","warm_socks":"Warm socks","tights":"Tights","under_trousers":"Under trousers","tights_under_trousers":"Wear the tights under your long trousers, instead of socks.","setup_needed":"Choose the child’s Kids Outfit sensor in the card settings.","entity_missing":"The selected entity does not exist. Check the sensor ID in the card settings.","wrong_entity":"This is not a Kids Outfit recommendation sensor. Choose the sensor created by the integration, not a weather or temperature entity.","forecast_unavailable":"The selected sensor is unavailable. Check the Kids Outfit integration and its weather provider in Settings → Devices & services.","forecast_pending":"The sensor has not produced a recommendation yet. Check whether the integration is waiting for a forecast.","forecast_stale":"This recommendation has expired. Check the weather provider and the Kids Outfit integration before using it again.","incompatible_data":"The sensor data is incomplete or incompatible. Update both Kids Outfit and Kids Outfit Card, restart Home Assistant and reload your browser.","selected_entity":"Selected entity","setup_help":"For grown-ups: setup help","setup_intro":"The card displays the result; the separate Kids Outfit integration creates the sensor automatically. No template sensor or YAML automation is needed.","setup_install":"In HACS, install zsaklak/ha-kids-outfit as an Integration, then restart Home Assistant. Installing only the Dashboard card does not create a sensor.","setup_profile":"Open Settings → Devices & services → Add integration → Kids Outfit. Choose the child, a weather entity with hourly or daily forecasts, and the departure/return times.","setup_select":"After setup succeeds, select the automatically created Outfit sensor in this card’s settings. Use your real sensor ID, not the example from the README.","available_sensors":"Detected Outfit sensors:","no_sensors":"No ready Outfit sensor was detected. Check that a child profile was added and its setup succeeded.","open_integrations":"Open integrations","setup_guide":"Installation and troubleshooting","baseball_cap":"Baseball cap"},"hu":{"brand":"INDULÓ","heading":"Öltözzünk fel!","wear":"Ezeket vedd fel","pack":"Ezt is vidd magaddal","today":"Ma","tomorrow":"Holnap","day":"Ovis / iskolás nap","feels":"Hőérzet","rain":"Eső is várható","dry":"Indulásra készen","snow":"Hó is várható","warning":"Egyeztess egy felnőttel","unavailable":"Nézzük meg együtt az időt","unavailable_detail":"Nincs friss előrejelzés. Kérj segítséget egy felnőttől az öltözéshez.","updated":"Frissítve","details":"Felnőtteknek","daily":"Napi becslés","hourly":"Órás előrejelzés","figure":"Ezekben a ruhákban indulj el","entity":"Ruhajavaslat-szenzor","language":"Nyelv (auto: Home Assistant nyelve)","title":"Egyéni cím","character":"Karakter","auto":"Automatikus","boy":"Fiú","girl":"Lány","unit":"Hőmérséklet egysége","skin":"Bőrszín (hex)","hair":"Hajszín (hex)","direction":"Szövegirány","tshirt":"Rövid ujjú póló","long_sleeve":"Hosszú ujjú felső","sweater":"Pulóver","winter_coat":"Télikabát","jacket":"Kabát","light_jacket":"Vékony kabát","raincoat":"Esőkabát","trousers":"Hosszúnadrág","shorts":"Rövidnadrág","trainers":"Sportcipő","sandals":"Szandál","winter_boots":"Bélelt csizma","rain_boots":"Gumicsizma","beanie":"Meleg sapka","sunhat":"Szalmakalap","scarf":"Sál","gloves":"Kesztyű","umbrella":"Esernyő","sunscreen":"Naptej","swimsuit":"Fürdőruha","towel":"Törölköző","waterproof":"Vízálló külső réteg kell.","removable_layer":"Változó hőmérséklet: ha meleged van, a külső réteget leveheted.","daily_estimate":"Napi becslés: a minimum éjszakai hőmérséklet is lehet.","remaining_day":"A nap hátralévő részére szól.","missing_data":"Egyes szél- vagy csapadékadatok hiányoznak. Indulás előtt ellenőrizzétek.","storm":"Zivatar vagy erős szél várható. Indulás előtt szólj egy felnőttnek!","rain_layer":"Vízálló","layer":"Levehető réteg","config_error":"Válassz egy sensor entitást a kártya beállításaiban.","compact":"Kompakt nézet fali tabletre","socks":"Zokni","warm_socks":"Meleg zokni","tights":"Harisnya","under_trousers":"A nadrág alá","tights_under_trousers":"A harisnyát a hosszúnadrág alá vedd fel, zokni helyett.","setup_needed":"Válaszd ki a gyerek Kids Outfit ruhajavaslat-szenzorát a kártya beállításaiban.","entity_missing":"A kiválasztott entitás nem létezik. Ellenőrizd a szenzor azonosítóját a kártya beállításaiban.","wrong_entity":"Ez nem Kids Outfit ruhajavaslat-szenzor. Az integráció által létrehozott szenzort válaszd, ne az időjárás- vagy hőmérséklet-entitást.","forecast_unavailable":"A kiválasztott szenzor nem elérhető. Ellenőrizd a Kids Outfit integrációt és az időjárás-szolgáltatót a Beállítások → Eszközök és szolgáltatások alatt.","forecast_pending":"A szenzor még nem adott ruhajavaslatot. Ellenőrizd, hogy az integráció előrejelzésre vár-e.","forecast_stale":"Ez a ruhajavaslat már lejárt. Ellenőrizd az időjárás-szolgáltatót és a Kids Outfit integrációt.","incompatible_data":"A szenzor adatai hiányosak vagy nem kompatibilisek. Frissítsd a Kids Outfit integrációt és a kártyát is, indítsd újra a Home Assistantot, majd frissítsd a böngészőt.","selected_entity":"Kiválasztott entitás","setup_help":"Felnőtteknek: beállítási segítség","setup_intro":"A kártya a javaslatot rajzolja ki; a szenzort a külön telepítendő Kids Outfit integráció automatikusan hozza létre. Nem kell saját template szenzort vagy YAML-automatizálást írnod.","setup_install":"A HACS-ban telepítsd a zsaklak/ha-kids-outfit csomagot Integráció típussal, majd indítsd újra a Home Assistantot. A Dashboard-kártya telepítése önmagában nem hoz létre szenzort.","setup_profile":"Beállítások → Eszközök és szolgáltatások → Integráció hozzáadása → Kids Outfit. Állítsd be a gyereket, egy órás vagy napi előrejelzést adó időjárás-entitást és az indulási időket.","setup_select":"A sikeres beállítás után a kártyán az automatikusan létrejött Ruhajavaslat-szenzort válaszd ki. A saját entitásazonosítódat használd, ne a leírásban szereplő példát.","available_sensors":"Megtalált ruhajavaslat-szenzorok:","no_sensors":"Nem található kész ruhajavaslat-szenzor. Ellenőrizd, hogy hozzáadtál-e gyermekprofilt, és sikerült-e az integráció beállítása.","open_integrations":"Integrációk megnyitása","setup_guide":"Telepítés és hibaelhárítás","baseball_cap":"Baseballsapka"}};
// Original vector artwork. Shared geometry keeps the child consistent in all weather.
const paths = {
  socks: '<path d="M9 9h17v26l10 8q6 9-4 15L9 43Zm29 0h17v26l10 8q6 9-4 15L38 43Z" fill="#edcf8f"/><path d="M9 16h17m12 0h17" stroke="#bb804f" stroke-width="5"/>',
  tights: '<path d="M18 7h37l-3 45 8 6q2 5-4 6H41l-5-36-5 36H15q-6-1-3-6l7-6Z" fill="#ae839a"/><path d="M20 14h32" stroke="#dec2d0" stroke-width="4"/>',

  tshirt: '<path d="M18 12 8 20l8 10 7-4v27h26V26l7 4 8-10-10-8-10-3q-8 9-16 0Z" fill="#ec7354"/>',
  long_sleeve: '<path d="M22 12 11 19 4 46l12 4 9-23v27h24V27l9 23 12-4-7-27-13-7-8-3q-7 8-14 0Z" fill="#e49259"/>',
  sweater: '<path d="M22 12 11 19 4 46l12 4 9-23v27h24V27l9 23 12-4-7-27-13-7-8-3q-7 8-14 0Z" fill="#de8155"/><path d="M27 36h20M27 44h20" stroke="#f6cf9b" stroke-width="4"/>',
  jacket: '<path d="M23 11 12 18 5 47l12 3 8-22v28h25V28l8 22 12-3-7-29-14-7Z" fill="#36837b"/><path d="M37 12v43m-10-15h5m10 0h5" stroke="#fff2d8" stroke-width="3"/>',
  trousers: '<path d="M20 8h33l-2 48H39l-3-28-3 28H20Z" fill="#36536d"/><path d="M21 16h30" stroke="#8095a4" stroke-width="3"/>',
  shorts: '<path d="M18 16h37l3 30H40l-4-16-3 16H16Z" fill="#478f8e"/><path d="M20 23h32" stroke="#a4d4c9" stroke-width="3"/>',
  trainers: '<path d="M8 31h20l7 10 23 2q8 2 6 13H8Z" fill="#f1e5cd"/><path d="M9 54h53M31 39l-9 5m16-1-8 5" stroke="#36536d" stroke-width="4"/>',
  rain_boots: '<path d="M16 10h25v30l17 4q8 3 5 12H15Z" fill="#e6b445"/><path d="M14 13h29M16 54h47" stroke="#8b681d" stroke-width="4"/>',
  umbrella: '<path d="M5 29a31 26 0 0 1 62 0q-8-7-15 0-9-7-16 0-9-7-16 0-8-7-15 0" fill="#e4b545"/><path d="M36 6v48q0 10-10 5" fill="none" stroke="#36536d" stroke-width="4"/>',
  beanie: '<path d="M14 39q0-28 22-28t22 28" fill="#df785b"/><rect x="11" y="34" width="50" height="13" rx="5" fill="#f0ae83"/><circle cx="36" cy="10" r="7" fill="#df785b"/>',
  sunhat: '<path d="M18 37 23 16h27l5 21Z" fill="#e5bb65"/><ellipse cx="36" cy="41" rx="31" ry="8" fill="#edcb85"/><path d="M21 30h31" stroke="#cd7755" stroke-width="6"/>',
  baseball_cap: '<path d="M12 39q0-29 25-29t25 29Z" fill="#478f8e"/><path d="M32 37h27q12 1 11 9-24 6-38-2Z" fill="#326b70"/><path d="M37 12q-11 10-9 25" fill="none" stroke="#a4d4c9" stroke-width="2"/>',
  scarf: '<path d="M14 14h45v14H39v30H25V27H14Z" fill="#e37d5d"/><path d="M27 46h10m-10 6h10" stroke="#f8d4ac" stroke-width="3"/>',
  gloves: '<path d="M14 48V24q0-9 12-9t11 10v4q8-9 12-3t-8 17v11H14Z" fill="#dc7855"/>',
  sandals: '<path d="M14 20q5-15 20-10t18 21l6 18q0 11-23 11T14 48Z" fill="#dfbc88"/><path d="m17 26 32-5M16 42l38-7" stroke="#b9714d" stroke-width="9"/>',
  sunscreen: '<rect x="22" y="16" width="29" height="43" rx="6" fill="#f7cb69"/><rect x="25" y="8" width="23" height="10" rx="2" fill="#39867e"/><circle cx="36" cy="37" r="8" fill="#fff7da"/>',
  swimsuit: '<path d="M20 9h10v14h14V9h10v18l-7 12 11 15-18 7-4-15-4 15-18-7 11-15-5-12Z" fill="#5da4a1"/><path d="M25 30h23" stroke="#fff4d4" stroke-width="5"/>',
  towel: '<rect x="17" y="8" width="38" height="53" rx="3" fill="#d7a4a2"/><path d="M19 17h34M19 51h34" stroke="#f9e4cf" stroke-width="5"/>'
};
paths.warm_socks = paths.socks.replace('#edcf8f','#c58c68').replace('#bb804f','#f1d4a8');
paths.winter_coat = paths.jacket.replace('#36837b', '#547c96');
paths.light_jacket = paths.jacket.replace('#36837b', '#83a69d');
paths.raincoat = paths.jacket.replace('#36837b', '#e6b445');
paths.winter_boots = paths.rain_boots.replace('#e6b445', '#876551');
function icon(item) {
  return `<svg viewBox="0 0 72 68" aria-hidden="true" focusable="false">${paths[item] || paths.tshirt}</svg>`;
}
function child(a, skin, hair) {
  const acc = a.accessories || [], girl = a.character === 'girl';
  const coat = a.outer, short = a.bottom === 'shorts';
  const color = {winter_coat:'#547c96', jacket:'#36837b', light_jacket:'#83a69d', raincoat:'#e6b445'}[coat];
  const glove = acc.includes('gloves') ? '#db7957' : skin;
  const boots = ['rain_boots','winter_boots'].includes(a.shoes);
  const shoeColor = a.shoes === 'rain_boots' ? '#e6b445' : a.shoes === 'winter_boots' ? '#876551' : '#f7ecda';
  return `<svg class="child" viewBox="0 0 360 440" role="img">
  <ellipse cx="179" cy="413" rx="94" ry="13" fill="#294c4220"/>
  ${acc.includes('umbrella') ? '<g stroke="#36536d" stroke-width="4" stroke-linecap="round"><path d="M282 90v211q0 18-14 10" fill="none"/><path d="M282 73v-8"/><path d="M211 111q7-62 71-62t71 62q-18-15-35 0-19-15-36 0-19-15-36 0-18-15-35 0Z" fill="#d9996e" stroke="none"/><path d="M282 49q-33 14-36 62m36-62q33 14 36 62" fill="none" stroke="#b67859" stroke-width="2"/></g>' : ''}
  ${girl ? `<path d="M117 102q-24 31-26 87 19 9 39-9l11-68M242 102q24 31 25 87-19 9-39-9l-11-68" fill="${hair}"/><circle cx="119" cy="134" r="7" fill="#e49c72"/><circle cx="241" cy="134" r="7" fill="#e49c72"/>` : ''}
  <g fill="${skin}"><rect x="140" y="291" width="31" height="106" rx="14"/><rect x="188" y="291" width="31" height="106" rx="14"/><path d="m120 188-25 82q-4 14 9 17t18-9l28-76M238 188l26 82q4 14-9 17t-18-9l-27-76"/></g>
  ${a.legwear==='tights'?'<g data-legwear="tights" fill="#ae839a"><rect x="140" y="291" width="31" height="106" rx="12"/><rect x="188" y="291" width="31" height="106" rx="12"/></g>':''}
  ${['socks','warm_socks'].includes(a.legwear)?`<g data-legwear="${a.legwear}" fill="${a.legwear==='warm_socks'?'#c58c68':'#edcf8f'}"><path d="M140 369h31v28h-31Zm48 0h31v28h-31Z"/><path d="M141 377h29m19 0h29" stroke="#f6e6c4" stroke-width="4"/></g>`:''}
  <path d="M138 272h82l-1 ${short?51:111}h-32l-7-${short?28:72}-8 ${short?28:72}h-32Z" fill="${short?'#4b9391':'#36536d'}"/>
  <path d="M141 287h76" stroke="#ffffff30" stroke-width="3"/>
  <path d="m143 170-27 16-16 52 24 10 15-35v73h81v-73l15 35 24-10-16-52-27-16Z" fill="${a.top==='tshirt'?'#e5835f':'#d89664'}"/>
  ${a.top !== 'tshirt' ? '<path d="m116 188-23 82 27 8 23-77m100-13 24 82-27 8-23-77" fill="#d89664"/>' : ''}
  <path d="M151 233h58M151 248h58" stroke="#f8dec0" stroke-width="7"/>
  ${coat ? `<path d="M142 164q-14 6-25 17l-29 92 31 11 21-66v84h81v-84l21 66 31-11-29-92q-11-11-25-17Z" fill="${color}"/><path d="m144 166 36 37 37-37" fill="#f2d7af"/><path d="M180 204v97" stroke="#fff0d3" stroke-width="4"/><path d="M148 264h20m25 0h20" stroke="#263f443a" stroke-width="4" stroke-linecap="round"/>${coat==='winter_coat'?'<path d="M143 223h74m-74 21h74m-74 42h74" stroke="#355b6e" opacity=".4" stroke-width="2"/>':''}` : ''}
  <g fill="${glove}"><ellipse cx="103" cy="282" rx="12" ry="15" transform="rotate(15 103 282)"/><ellipse cx="257" cy="282" rx="12" ry="15" transform="rotate(-15 257 282)"/></g>
  <rect x="163" y="140" width="34" height="40" rx="13" fill="${skin}"/>
  <ellipse cx="180" cy="100" rx="66" ry="58" fill="${hair}"/>
  <circle cx="120" cy="115" r="13" fill="${skin}"/><circle cx="240" cy="115" r="13" fill="${skin}"/>
  <path d="M123 88q0-40 57-40t57 40v28q-2 51-57 51t-57-51Z" fill="${skin}"/>
  <path d="M119 102q-15-60 41-70 70-14 83 55-34 2-50-28-22 29-70 25Z" fill="${hair}"/>
  <g fill="#333e40"><ellipse cx="157" cy="111" rx="4.5" ry="6"/><ellipse cx="204" cy="111" rx="4.5" ry="6"/></g>
  <g fill="#dc8d75" opacity=".48"><ellipse cx="142" cy="126" rx="10" ry="5"/><ellipse cx="219" cy="126" rx="10" ry="5"/></g>
  <path d="M168 137q12 12 25 0" fill="none" stroke="#9e594b" stroke-width="3" stroke-linecap="round"/>
  ${acc.includes('beanie') ? '<path d="M114 86q0-65 65-65t66 65" fill="#d77957"/><rect x="111" y="73" width="137" height="23" rx="10" fill="#efad7e"/><circle cx="179" cy="18" r="12" fill="#d77957"/><path d="M133 78v13m20-13v13m21-13v13m22-13v13m21-13v13m17-13v13" stroke="#d9946a" stroke-width="3"/>' : ''}
  ${acc.includes('sunhat') ? '<g data-headwear="sunhat"><path d="M110 76 125 20q55-8 110 0l15 56Z" fill="#e4b45f"/><path d="m114 60 132 0 4 16H110Z" fill="#c77853"/><ellipse cx="180" cy="79" rx="94" ry="14" fill="#ebc984"/></g>' : ''}
  ${acc.includes('baseball_cap') ? '<g data-headwear="baseball_cap"><path d="M109 86q0-70 71-70t71 70Z" fill="#478f8e"/><path d="M180 18q-30 20-29 61" fill="none" stroke="#a4d4c9" stroke-width="3"/><ellipse cx="180" cy="17" rx="7" ry="4" fill="#326b70"/><path d="M162 78h86q29 1 33 13-49 16-119-1Z" fill="#326b70"/></g>' : ''}
  ${acc.includes('scarf') ? '<path d="M145 157q34 22 71 0v25q-33 18-71 0Z" fill="#d87957"/><path d="m191 181 22-2 3 58-23 2Z" fill="#dc8860"/><path d="m194 222 20-2m-20 10 20-2" stroke="#efbd8f" stroke-width="4"/>' : ''}
  <g fill="${shoeColor}" stroke="#354b52" stroke-width="2.5" stroke-linejoin="round">
    <path d="M138 ${boots?353:387}h34v${boots?61:27}h-48q-6-15 14-19Z"/>
    <path d="M188 ${boots?353:387}h34v${boots?42:8}q21 4 14 19h-48Z"/>
  </g>
  ${boots ? '<path d="M138 359h34m16 0h34" stroke="#ffffff50" stroke-width="5"/>' : `<path d="M136 399h24m39 0h24" stroke="${a.shoes==='sandals'?'#bc8053':'#73918e'}" stroke-width="${a.shoes==='sandals'?9:4}"/>`}
  </svg>`;
}

// LANGUAGES is inlined from translations/*.json by the dependency-free build.
const escape = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const color = (s, fallback) => /^#[0-9a-f]{6}$/i.test(s || '') ? s : fallback;
function localeFor(config, hass) {
  const requested = config.language && config.language !== 'auto' ? config.language : (hass?.locale?.language || hass?.language || 'en');
  try { return Intl.getCanonicalLocales(requested.replace('_','-'))[0] || 'en'; } catch { return 'en'; }
}
function translator(config, hass) {
  const locale = localeFor(config, hass), base = locale.split('-')[0];
  const dictionary = {...LANGUAGES.en, ...(LANGUAGES[base] || {}), ...(LANGUAGES[locale] || {}), ...(config.translations || {})};
  return key => typeof dictionary[key] === 'string' ? dictionary[key] : (LANGUAGES.en[key] || key);
}
function outfitEntities(hass) {
  return Object.keys(hass?.states || {}).filter(id => id.startsWith('sensor.') && hass.states[id].attributes?.schema_version === 1 && hass.states[id].attributes?.outfit);
}
function dataProblem(config, state) {
  if (!config.entity) return 'setup_needed';
  if (!state) return 'entity_missing';
  if (!config.entity.startsWith('sensor.')) return 'wrong_entity';
  if (state.state === 'unavailable') return 'forecast_unavailable';
  if (state.state === 'unknown') return 'forecast_pending';
  const a=state.attributes || {};
  if (a.schema_version === undefined) return 'wrong_entity';
  if (a.schema_version !== 1) return 'incompatible_data';
  if (['valid_until','window_start','window_end','updated_at'].some(key=>!Number.isFinite(Date.parse(a[key]))) ||
      ['temperature_min','temperature_max','feels_like'].some(key=>!Number.isFinite(a[key])) ||
      ['top','bottom','shoes'].some(key=>typeof a[key] !== 'string') ||
      ['accessories','pack','notes'].some(key=>a[key] !== undefined && !Array.isArray(a[key]))) return 'incompatible_data';
  if (Date.now() > Date.parse(a.valid_until)) return 'forecast_stale';
  return null;
}
function setupHelp(t, hass) {
  const ids=outfitEntities(hass);
  return `<p>${escape(t('setup_intro'))}</p><ol>${['setup_install','setup_profile','setup_select'].map(key=>`<li>${escape(t(key))}</li>`).join('')}</ol>
    ${ids.length?`<p>${escape(t('available_sensors'))}</p><ul>${ids.map(id=>`<li><code>${escape(id)}</code></li>`).join('')}</ul>`:`<p>${escape(t('no_sensors'))}</p>`}
    <a href="/config/integrations">${escape(t('open_integrations'))}</a> · <a href="https://github.com/zsaklak/ha-kids-outfit#faq" target="_blank" rel="noopener noreferrer">${escape(t('setup_guide'))}</a>`;
}
const styles = `
:host{display:block;--ink:#27443f;--muted:#596c61;--paper:#fffdf7;--line:#e4e8da;--accent:#367966;font-family:var(--paper-font-body1_-_font-family,system-ui,sans-serif);color:var(--ink)}
*{box-sizing:border-box}ha-card{display:block;background:var(--paper);border:1px solid var(--line);border-radius:28px;overflow:hidden;color:var(--ink);box-shadow:0 5px 24px #284f3510}.card{padding:24px;container-type:inline-size}header{display:flex;align-items:center;justify-content:space-between;gap:12px}.brand{font-size:11px;font-weight:800;letter-spacing:.16em;display:flex;align-items:center;gap:8px}.mark{background:#d6e8d8;border-radius:9px;padding:4px;color:#3d7964;font-size:18px;line-height:1}.date{font-size:12px;color:var(--muted)}h1{font-size:clamp(24px,5cqi,32px);letter-spacing:-.04em;line-height:1.2;margin:18px 0 6px;font-weight:750}.sub{font-size:13px;color:var(--muted);margin:0 0 20px}.scene{background:#edf3e6;border:1px solid #e1e9d8;border-radius:22px;position:relative;overflow:hidden;display:grid;grid-template-columns:1fr 130px;align-items:center;padding:0 14px 0 0;min-height:310px}.scene:before{content:'';width:270px;height:270px;border-radius:50%;background:#e2edd8;position:absolute;left:-40px;top:45px}.child{width:100%;max-height:350px;display:block;position:relative;z-index:1}.weather{z-index:2;align-self:start;padding-top:28px;min-width:0}.weather .temp{font-size:34px;letter-spacing:-.06em;font-weight:750;line-height:1.1;white-space:nowrap}.range{font-size:12px;color:#53695b;margin-top:6px;line-height:1.5}.badge{font-size:11px;display:inline-block;border-radius:10px;background:#fffdf2c9;padding:8px 10px;line-height:1.4;margin-top:12px}.status{display:flex;gap:8px;align-items:center;font-size:12px;font-weight:650;padding:13px 0 3px}.status i{width:7px;height:7px;border-radius:50%;background:#69977a;flex-shrink:0}.warning{background:#fff0d3;border-radius:12px;padding:12px;font-size:13px;margin-top:12px;color:#704a13}.section-label{font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);font-weight:750;margin:22px 0 10px}.items{list-style:none;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin:0;padding:0}.item{border:1px solid var(--line);background:#fafaf3;border-radius:14px;padding:7px 4px 10px;text-align:center;font-size:12px;font-weight:600;line-height:1.25;overflow-wrap:anywhere}.item svg{width:55px;height:49px;display:block;margin:0 auto 4px}.pack .item{background:#f7f0e5}.tip{font-size:12px;color:var(--muted);line-height:1.5;margin:12px 0 0}details{border-top:1px solid var(--line);margin-top:20px;padding-top:12px;font-size:12px;line-height:1.65;color:var(--muted)}summary{cursor:pointer;min-height:28px;display:list-item;outline-offset:4px}details p{margin:6px 0}.error{padding:40px 24px;text-align:center}.error-icon{font-size:46px}.error h1{font-size:24px}.error p{font-size:15px;line-height:1.6;color:var(--muted)}@container(max-width:340px){.scene{grid-template-columns:1fr 102px;min-height:270px;padding-right:10px}.weather .temp{font-size:29px}.weather{padding-top:24px}.child{max-height:295px}.badge{font-size:10px;padding:7px}.item{font-size:11px}.card{padding:18px}}.compact{padding:18px}.compact h1{margin-top:12px;font-size:25px}.compact .sub{margin-bottom:12px}.compact .scene{min-height:240px}.compact .child{max-height:250px}.compact .section-label{margin:14px 0 8px}.compact .item{padding:4px 3px 7px}.compact .item svg{height:38px;width:45px}.compact details{margin-top:12px;padding-top:8px}.item small{display:block;font-size:10px;font-weight:400;margin-top:3px}.setup-help{text-align:start;line-height:1.6}.setup-help li{margin-bottom:10px}.setup-help p,.entity-id{font-size:13px!important}.setup-help a{color:var(--accent);text-decoration:underline}.setup-help code,.entity-id code{overflow-wrap:anywhere}.error .setup-help{margin-top:16px}.error{padding:28px 22px}@media(prefers-reduced-motion:reduce){*{scroll-behavior:auto}}:host([dir=rtl]) .scene{padding:0 0 0 14px}:host([dir=rtl]) .brand{letter-spacing:normal}
`;
class KidsOutfitCard extends HTMLElement {
  constructor(){ super(); this.attachShadow({mode:'open'}); }
  setConfig(config){
    if(config.entity != null && typeof config.entity !== 'string') throw new Error(translator(config,this._hass)('config_error'));
    this._config={...config}; this.render();
  }
  set hass(hass){ this._hass=hass; this.render(); }
  connectedCallback(){ this._timer=setInterval(()=>this.render(),60000); this.render(); }
  disconnectedCallback(){ clearInterval(this._timer); }
  getCardSize(){return Math.ceil((this.getBoundingClientRect().height || 800)/50);}
  getGridOptions(){return {columns:12,min_columns:9};}
  static getConfigElement(){return document.createElement('kids-outfit-card-editor');}
  static getStubConfig(hass){const entity=outfitEntities(hass)[0];return entity?{entity}:{};}
  render(){
    if(!this._config || !this._hass) return;
    const config=this._config, t=translator(config,this._hass), locale=localeFor(config,this._hass);
    this.lang=locale;
    this.dir=config.direction==='rtl'||config.direction==='ltr'?config.direction:/^(ar|fa|he|ur|ps|dv|yi)(-|$)/i.test(locale)?'rtl':'ltr';
    const state=this._hass.states[config.entity], a=state?.attributes;
    const problem=dataProblem(config,state);
    const renderKey=JSON.stringify([config,state,locale,this._hass.config?.unit_system,this._hass.config?.time_zone,problem,problem?outfitEntities(this._hass):null]);
    if(renderKey===this._renderKey)return;
    this._renderKey=renderKey;
    if(problem){
      this.shadowRoot.innerHTML=`<style>${styles}</style><ha-card><div class="error" data-problem="${problem}"><div role="status"><div class="error-icon" aria-hidden="true">☁</div><h1>${escape(t('unavailable'))}</h1><p>${escape(t(problem))}</p></div>
        ${config.entity?`<p class="entity-id">${escape(t('selected_entity'))}: <code>${escape(config.entity)}</code></p>`:''}
        <details class="setup-help" open><summary>${escape(t('setup_help'))}</summary>${setupHelp(t,this._hass)}</details></div></ha-card>`;
      return;
    }
    const attrs={...a,character:config.character&&config.character!=='auto'?config.character:a.character};
    const unit=config.temperature_unit==='°F'||(config.temperature_unit!=='°C'&&this._hass.config?.unit_system?.temperature==='°F')?'°F':'°C';
    const temp=v=>new Intl.NumberFormat(locale,{maximumFractionDigits:0}).format(unit==='°F'?v*9/5+32:v);
    const clock=iso=>new Intl.DateTimeFormat(locale,{hour:'numeric',minute:'2-digit',timeZone:this._hass.config?.time_zone||undefined}).format(new Date(iso));
    const day=new Intl.DateTimeFormat(locale,{weekday:'short',month:'short',day:'numeric',timeZone:this._hass.config?.time_zone||undefined}).format(new Date(a.window_start));
    const items=[a.top,a.outer,a.legwear,a.bottom,a.shoes,...(a.accessories||[])].filter(Boolean);
    const list=(keys,cls='')=>`<ul class="items ${cls}">${keys.map(key=>`<li class="item" data-item="${escape(key)}">${icon(key)}<span>${escape(t(key))}</span>${key==='tights'?`<small>${escape(t('under_trousers'))}</small>`:''}</li>`).join('')}</ul>`;
    const notes=a.notes||[];
    const detailOpen=this.shadowRoot.querySelector('.card details')?.open;
    this.shadowRoot.innerHTML=`<style>${styles}</style><ha-card><div class="card ${config.compact?'compact':''}">
      <header><div class="brand"><span class="mark" aria-hidden="true">↗</span>${escape(t('brand'))}</div><span class="date">${escape(day)}</span></header>
      <h1>${escape(config.title || `${a.name} · ${t('heading')}`)}</h1><p class="sub">${escape(t('day'))} · ${escape(clock(a.window_start))}–${escape(clock(a.window_end))}</p>
      <div class="scene">${child(attrs,color(config.skin_color,'#edbc96'),color(config.hair_color,'#614939'))}<div class="weather"><div class="temp">${temp(a.temperature_min)}°</div><div class="range">${a.temperature_min===a.temperature_max?temp(a.temperature_min):`${temp(a.temperature_min)}–${temp(a.temperature_max)}`} ${unit}<br>${escape(t('feels'))} ${temp(a.feels_like)}°</div><span class="badge">${escape(t(a.snow?'snow':a.rain?'rain':'dry'))}</span></div></div>
      <div class="status"><i></i>${escape(t(a.warning?'warning':a.forecast_type==='daily'?'daily':a.rain?'rain_layer':notes.includes('removable_layer')?'layer':'dry'))}</div>
      ${a.warning?`<div class="warning" role="status">${escape(t('storm'))}</div>`:''}
      <div class="section-label">${escape(t('wear'))}</div>${list(items)}
      ${a.pack?.length?`<div class="section-label">${escape(t('pack'))}</div><div class="pack">${list(a.pack)}</div>`:''}
      ${notes.includes('removable_layer')?`<p class="tip">${escape(t('removable_layer'))}</p>`:''}
      <details ${detailOpen?'open':''}><summary>${escape(t('details'))}</summary><p>${escape(t('updated'))}: ${escape(clock(a.updated_at))} · ${escape(t(a.forecast_type==='daily'?'daily':'hourly'))}</p>${notes.map(n=>`<p>${escape(t(n))}</p>`).join('')}</details>
    </div></ha-card>`;
    const figure=this.shadowRoot.querySelector('.child');
    figure.setAttribute('aria-label',`${t('figure')}: ${items.map(t).join(', ')}`);
  }
}
class KidsOutfitEditor extends HTMLElement {
  constructor(){super();this.attachShadow({mode:'open'});}
  setConfig(config){this._config={...config};this.render();}
  set hass(hass){this._hass=hass;this.render();}
  render(){
    if(!this._config||!this._hass)return;
    const t=translator(this._config,this._hass);
    // HA's native form preserves selectors, keyboard navigation and entity filtering.
    if(!this._form){this.shadowRoot.innerHTML='<style>.setup-help{font:14px/1.5 system-ui;padding:12px 0}.setup-help code{overflow-wrap:anywhere}.setup-help a{color:var(--primary-color,#367966)}.setup-help li{margin-bottom:8px}</style><details class="setup-help"><summary></summary><div></div></details><ha-form></ha-form>';this._form=this.shadowRoot.querySelector('ha-form');this._form.addEventListener('value-changed',e=>{this._config={...this._config,...e.detail.value};this.dispatchEvent(new CustomEvent('config-changed',{detail:{config:this._config},bubbles:true,composed:true}));});}
    this.shadowRoot.querySelector('summary').textContent=t('setup_help');
    this.shadowRoot.querySelector('.setup-help div').innerHTML=setupHelp(t,this._hass);
    if(!this._config.entity)this.shadowRoot.querySelector('details').open=true;
    this._form.hass=this._hass;
    this._form.data=this._config;
    this._form.computeLabel=s=>t(s.name);
    this._form.schema=[
      {name:'entity',required:true,selector:{entity:{filter:{domain:'sensor',integration:'kids_outfit'}}}},
      {name:'title',selector:{text:{}}}, {name:'compact',selector:{boolean:{}}}, {name:'language',selector:{text:{}}},
      {name:'character',selector:{select:{options:['auto','boy','girl'].map(value=>({value,label:t(value)}))}}},
      {name:'temperature_unit',selector:{select:{options:['auto','°C','°F']}}},
      {name:'skin_color',selector:{text:{}}}, {name:'hair_color',selector:{text:{}}},
      {name:'direction',selector:{select:{options:['auto','ltr','rtl']}}}
    ];
    const previous=this._form.computeLabel;
    this._form.computeLabel=s=>s.name==='temperature_unit'?t('unit'):s.name==='skin_color'?t('skin'):s.name==='hair_color'?t('hair'):previous(s);
  }
}
if(!customElements.get('kids-outfit-card'))customElements.define('kids-outfit-card',KidsOutfitCard);
if(!customElements.get('kids-outfit-card-editor'))customElements.define('kids-outfit-card-editor',KidsOutfitEditor);
window.customCards=window.customCards||[];
window.customCards.push({type:'kids-outfit-card',name:'Kids Outfit',description:'A consistent character showing what to wear for the school day.',preview:true});
