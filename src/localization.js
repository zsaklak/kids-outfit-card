// Pure locale handling shared by the card and its editor.
export function localeFor(config, hass) {
  const requested = config.language && config.language !== 'auto'
    ? config.language : (hass?.locale?.language || hass?.language || 'en');
  try {
    return Intl.getCanonicalLocales(requested.replaceAll('_', '-'))[0] || 'en';
  } catch {
    return 'en';
  }
}

export function createLocalizer(config, hass, languages) {
  const locale = localeFor(config, hass);
  const parsed = new Intl.Locale(locale);
  // Explicit scripts win over region defaults: zh-Hans-TW must stay simplified.
  const script = parsed.script || parsed.maximize().script;
  const candidates = [parsed.language, `${parsed.language}-${script}`, locale];
  const dictionary = Object.assign({}, languages.en,
    ...candidates.map(key => languages[key] || {}), config.translations || {});
  const t = key => typeof dictionary[key] === 'string'
    ? dictionary[key] : (languages.en[key] || key);
  const direction = ['ltr', 'rtl'].includes(config.direction) ? config.direction
    : /^(Arab|Hebr|Thaa|Nkoo|Adlm|Rohg)$/.test(script) ? 'rtl' : 'ltr';
  return { locale, direction, t };
}
