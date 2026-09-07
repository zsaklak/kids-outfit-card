import { child, icon } from './art.js';
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
export class KidsOutfitCard extends HTMLElement {
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
