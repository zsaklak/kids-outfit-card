import { child, icon } from './art.js';
import { createLocalizer } from './localization.js';
import { dataProblem, outfitEntities } from './data.js';
import { styles } from './styles.js';
// LANGUAGES is inlined from translations/*.json by the dependency-free build.
const escape = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const color = (s, fallback) => /^#[0-9a-f]{6}$/i.test(s || '') ? s : fallback;
function setupHelp(t, hass) {
  const ids=outfitEntities(hass);
  return `<p>${escape(t('setup_intro'))}</p><ol>${['setup_install','setup_profile','setup_select'].map(key=>`<li>${escape(t(key))}</li>`).join('')}</ol>
    ${ids.length?`<p>${escape(t('available_sensors'))}</p><ul>${ids.map(id=>`<li><code dir="ltr">${escape(id)}</code></li>`).join('')}</ul>`:`<p>${escape(t('no_sensors'))}</p>`}
    <a href="/config/integrations">${escape(t('open_integrations'))}</a> · <a href="https://github.com/zsaklak/ha-kids-outfit#faq" target="_blank" rel="noopener noreferrer">${escape(t('setup_guide'))}</a>`;
}
export class KidsOutfitCard extends HTMLElement {
  constructor(){ super(); this.attachShadow({mode:'open'}); }
  setConfig(config){
    if(config.entity != null && typeof config.entity !== 'string') throw new Error(createLocalizer(config,this._hass,LANGUAGES).t('config_error'));
    this._config={...config}; this.render();
  }
  set hass(hass){ this._hass=hass; this.render(); }
  connectedCallback(){ clearInterval(this._timer); this._timer=setInterval(()=>this.render(),60000); this.render(); }
  disconnectedCallback(){ clearInterval(this._timer); }
  getCardSize(){return Math.ceil((this.getBoundingClientRect().height || 800)/50);}
  getGridOptions(){return {columns:12,min_columns:9};}
  static getConfigElement(){return document.createElement('kids-outfit-card-editor');}
  static getStubConfig(hass){const entity=outfitEntities(hass)[0];return entity?{entity}:{};}
  render(){
    if(!this._config || !this._hass) return;
    const config=this._config;
    const {t,locale,direction}=createLocalizer(config,this._hass,LANGUAGES);
    this.lang=locale;
    this.dir=direction;
    const state=this._hass.states?.[config.entity], a=state?.attributes;
    const problem=dataProblem(config,state);
    const renderKey=JSON.stringify([config,state,locale,this._hass.config?.unit_system,this._hass.config?.time_zone,problem,problem?outfitEntities(this._hass):null]);
    if(renderKey===this._renderKey)return;
    this._renderKey=renderKey;
    if(problem){
      this.shadowRoot.innerHTML=`<style>${styles}</style><ha-card><div class="error" data-problem="${problem}"><div role="status"><div class="error-icon" aria-hidden="true">☁</div><h1>${escape(t('unavailable'))}</h1><p>${escape(t(problem))}</p></div>
        ${config.entity?`<p class="entity-id">${escape(t('selected_entity'))}: <code dir="ltr">${escape(config.entity)}</code></p>`:''}
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
      <h1>${escape(config.title || `${a.name} · ${t('heading')}`)}</h1><p class="sub">${escape(t('day'))} · <bdi dir="ltr"><bdi dir="ltr">${escape(clock(a.window_start))}</bdi>–<bdi dir="ltr">${escape(clock(a.window_end))}</bdi></bdi></p>
      <div class="scene">${child(attrs,color(config.skin_color,'#edbc96'),color(config.hair_color,'#614939'))}<div class="weather"><div class="temp"><bdi dir="ltr">${temp(a.temperature_min)}°</bdi></div><div class="range"><bdi dir="ltr">${a.temperature_min===a.temperature_max?temp(a.temperature_min):`${temp(a.temperature_min)}–${temp(a.temperature_max)}`} ${unit}</bdi><br>${escape(t('feels'))} <bdi dir="ltr">${temp(a.feels_like)}°</bdi></div><span class="badge">${escape(t(a.snow?'snow':a.rain?'rain':'dry'))}</span></div></div>
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
    const {t,locale,direction}=createLocalizer(this._config,this._hass,LANGUAGES);
    this.lang=locale;
    this.dir=direction;
    // HA's native form preserves selectors, keyboard navigation and entity filtering.
    if(!this._form){this.shadowRoot.innerHTML='<style>.setup-help{font:14px/1.5 system-ui;padding:12px 0}.setup-help code{overflow-wrap:anywhere}.setup-help a{color:var(--primary-color,#367966)}.setup-help li{margin-bottom:8px}</style><details class="setup-help"><summary></summary><div></div></details><ha-form></ha-form>';this._form=this.shadowRoot.querySelector('ha-form');this._form.addEventListener('value-changed',e=>{this._config={...this._config,...e.detail.value};this.dispatchEvent(new CustomEvent('config-changed',{detail:{config:this._config},bubbles:true,composed:true}));});}
    this.shadowRoot.querySelector('summary').textContent=t('setup_help');
    this.shadowRoot.querySelector('.setup-help div').innerHTML=setupHelp(t,this._hass);
    if(!this._config.entity)this.shadowRoot.querySelector('details').open=true;
    this._form.hass=this._hass;
    this._form.data=this._config;
    const labelKeys={temperature_unit:'unit',skin_color:'skin',hair_color:'hair'};
    this._form.computeLabel=s=>t(labelKeys[s.name]||s.name);
    this._form.schema=[
      {name:'entity',required:true,selector:{entity:{filter:{domain:'sensor',integration:'kids_outfit'}}}},
      {name:'title',selector:{text:{}}}, {name:'compact',selector:{boolean:{}}}, {name:'language',selector:{text:{}}},
      {name:'character',selector:{select:{options:['auto','boy','girl'].map(value=>({value,label:t(value)}))}}},
      {name:'temperature_unit',selector:{select:{options:['auto','°C','°F']}}},
      {name:'skin_color',selector:{text:{}}}, {name:'hair_color',selector:{text:{}}},
      {name:'direction',selector:{select:{options:['auto','ltr','rtl']}}}
    ];
  }
}
if(!customElements.get('kids-outfit-card'))customElements.define('kids-outfit-card',KidsOutfitCard);
if(!customElements.get('kids-outfit-card-editor'))customElements.define('kids-outfit-card-editor',KidsOutfitEditor);
window.customCards=window.customCards||[];
window.customCards.push({type:'kids-outfit-card',name:'Kids Outfit',description:'A consistent character showing what to wear for the school day.',preview:true});
