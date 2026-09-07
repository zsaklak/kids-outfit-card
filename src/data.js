import { hasArtwork } from './art.js';

export function outfitEntities(hass) {
  return Object.entries(hass?.states || {})
    .filter(([id, state]) => id.startsWith('sensor.') &&
      state?.attributes?.schema_version === 1 && state.attributes.outfit)
    .map(([id]) => id);
}

// Validate the display contract before rendering any clothing recommendation.
export function dataProblem(config, state, now = Date.now()) {
  if (!config.entity) return 'setup_needed';
  if (!state) return 'entity_missing';
  if (!config.entity.startsWith('sensor.')) return 'wrong_entity';
  if (state.state === 'unavailable') return 'forecast_unavailable';
  if (state.state === 'unknown') return 'forecast_pending';
  const a = state.attributes || {};
  if (a.schema_version === undefined) return 'wrong_entity';
  if (a.schema_version !== 1) return 'incompatible_data';
  const validTimestamp = key => typeof a[key] === 'string' && Number.isFinite(Date.parse(a[key]));
  const validItem = item => typeof item === 'string' && hasArtwork(item);
  const optionalItem = item => item == null || validItem(item);
  const validList = (value, check) => value === undefined || (Array.isArray(value) && value.every(check));
  if (!['valid_until', 'window_start', 'window_end', 'updated_at'].every(validTimestamp) ||
      !['temperature_min', 'temperature_max', 'feels_like'].every(key => Number.isFinite(a[key])) ||
      !['top', 'bottom', 'shoes'].every(key => validItem(a[key])) ||
      !['outer', 'legwear'].every(key => optionalItem(a[key])) ||
      !['accessories', 'pack'].every(key => validList(a[key], validItem)) ||
      !validList(a.notes, value => typeof value === 'string') ||
      a.temperature_min > a.temperature_max ||
      Date.parse(a.window_start) >= Date.parse(a.window_end) ||
      Date.parse(a.updated_at) > Date.parse(a.valid_until)) return 'incompatible_data';
  if (now >= Math.min(Date.parse(a.valid_until), Date.parse(a.window_end))) return 'forecast_stale';
  return null;
}
