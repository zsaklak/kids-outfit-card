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
  sandals: '<path d="M8 48h49q9 0 8 9H8Z" fill="#dfbc88"/><path d="M13 48V25h8v23m7 0 8-19 7 3-7 16m10 0 4-12 7 2-3 10" fill="#b9714d"/><path d="M8 56h56" stroke="#36536d" stroke-width="3"/>',
  sunscreen: '<rect x="22" y="16" width="29" height="43" rx="6" fill="#f7cb69"/><rect x="25" y="8" width="23" height="10" rx="2" fill="#39867e"/><circle cx="36" cy="37" r="8" fill="#fff7da"/>',
  swimsuit: '<path d="M20 9h10v14h14V9h10v18l-7 12 11 15-18 7-4-15-4 15-18-7 11-15-5-12Z" fill="#5da4a1"/><path d="M25 30h23" stroke="#fff4d4" stroke-width="5"/>',
  towel: '<rect x="17" y="8" width="38" height="53" rx="3" fill="#d7a4a2"/><path d="M19 17h34M19 51h34" stroke="#f9e4cf" stroke-width="5"/>'
};
paths.warm_socks = paths.socks.replace('#edcf8f','#c58c68').replace('#bb804f','#f1d4a8');
paths.winter_coat = paths.jacket.replace('#36837b', '#547c96');
paths.light_jacket = paths.jacket.replace('#36837b', '#83a69d');
paths.raincoat = paths.jacket.replace('#36837b', '#e6b445');
paths.winter_boots = paths.rain_boots.replace('#e6b445', '#876551');
export function icon(item) {
  return `<svg viewBox="0 0 72 68" aria-hidden="true" focusable="false">${paths[item] || paths.tshirt}</svg>`;
}
export function child(a, skin, hair) {
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
