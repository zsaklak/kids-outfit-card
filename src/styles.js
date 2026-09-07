export const styles = `
:host{display:block;--ink:#27443f;--muted:#596c61;--paper:#fffdf7;--line:#e4e8da;--accent:#367966;font-family:var(--paper-font-body1_-_font-family,system-ui,sans-serif);color:var(--ink)}

*{box-sizing:border-box}
ha-card{display:block;background:var(--paper);border:1px solid var(--line);border-radius:28px;overflow:hidden;color:var(--ink);box-shadow:0 5px 24px #284f3510}
.card{padding:24px;container-type:inline-size}
header{display:flex;align-items:center;justify-content:space-between;gap:12px}
.brand{font-size:11px;font-weight:800;letter-spacing:.16em;display:flex;align-items:center;gap:8px}
.mark{background:#d6e8d8;border-radius:9px;padding:4px;color:#3d7964;font-size:18px;line-height:1}
.date{font-size:12px;color:var(--muted)}
h1{font-size:clamp(24px,5cqi,32px);letter-spacing:-.04em;line-height:1.2;margin:18px 0 6px;font-weight:750}
.sub{font-size:13px;color:var(--muted);margin:0 0 20px}
.scene{background:#edf3e6;border:1px solid #e1e9d8;border-radius:22px;position:relative;overflow:hidden;display:grid;grid-template-columns:1fr 130px;align-items:center;padding:0;padding-inline-end:14px;min-height:310px}
.scene:before{content:'';width:270px;height:270px;border-radius:50%;background:#e2edd8;position:absolute;inset-inline-start:-40px;top:45px}
.child{width:100%;max-height:350px;display:block;position:relative;z-index:1}
.weather{z-index:2;align-self:start;padding-top:28px;min-width:0}
.weather .temp{font-size:34px;letter-spacing:-.06em;font-weight:750;line-height:1.1;white-space:nowrap}
.range{font-size:12px;color:#53695b;margin-top:6px;line-height:1.5}
.badge{font-size:11px;display:inline-block;border-radius:10px;background:#fffdf2c9;padding:8px 10px;line-height:1.4;margin-top:12px}
.status{display:flex;gap:8px;align-items:center;font-size:12px;font-weight:650;padding:13px 0 3px}
.status i{width:7px;height:7px;border-radius:50%;background:#69977a;flex-shrink:0}
.warning{background:#fff0d3;border-radius:12px;padding:12px;font-size:13px;margin-top:12px;color:#704a13}
.section-label{font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);font-weight:750;margin:22px 0 10px}
.items{list-style:none;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin:0;padding:0}
.item{border:1px solid var(--line);background:#fafaf3;border-radius:14px;padding:7px 4px 10px;text-align:center;font-size:12px;font-weight:600;line-height:1.25;overflow-wrap:anywhere}
.item svg{width:55px;height:49px;display:block;margin:0 auto 4px}
.pack .item{background:#f7f0e5}
.tip{font-size:12px;color:var(--muted);line-height:1.5;margin:12px 0 0}
details{border-top:1px solid var(--line);margin-top:20px;padding-top:12px;font-size:12px;line-height:1.65;color:var(--muted)}
summary{cursor:pointer;min-height:28px;display:list-item;outline-offset:4px}
details p{margin:6px 0}
.error{padding:40px 24px;text-align:center}
.error-icon{font-size:46px}
.error h1{font-size:24px}
.error p{font-size:15px;line-height:1.6;color:var(--muted)}
@container(max-width:340px){.scene{grid-template-columns:1fr 102px;min-height:270px;padding-inline-end:10px}
.weather .temp{font-size:29px}
.weather{padding-top:24px}
.child{max-height:295px}
.badge{font-size:10px;padding:7px}
.item{font-size:11px}
.card{padding:18px}
}
.compact{padding:18px}
.compact h1{margin-top:12px;font-size:25px}
.compact .sub{margin-bottom:12px}
.compact .scene{min-height:240px}
.compact .child{max-height:250px}
.compact .section-label{margin:14px 0 8px}
.compact .item{padding:4px 3px 7px}
.compact .item svg{height:38px;width:45px}
.compact details{margin-top:12px;padding-top:8px}
.item small{display:block;font-size:10px;font-weight:400;margin-top:3px}
.setup-help{text-align:start;line-height:1.6}
.setup-help li{margin-bottom:10px}
.setup-help p,.entity-id{font-size:13px!important}
.setup-help a{color:var(--accent);text-decoration:underline}
.setup-help code,.entity-id code{overflow-wrap:anywhere}
.error .setup-help{margin-top:16px}
.error{padding:28px 22px}
@media(prefers-reduced-motion:reduce){*{scroll-behavior:auto}
}
:host([dir=rtl]) .brand,:host([dir=rtl]) h1,:host([dir=rtl]) .section-label,:host(:lang(hi)) h1{letter-spacing:normal}

`;
