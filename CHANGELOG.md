# Changelog

## 0.5.0

- Add Arabic, Hindi, Simplified Chinese and Traditional Chinese translations.
- Extract localization, sensor validation and styles into testable source modules.
- Resolve Chinese scripts from regional tags and apply Arabic RTL to card and editor.
- Isolate numeric ranges in RTL; reject malformed clothing data and expired windows.
- Keep demo dates current and validate translation keys during the single-file build.

## 0.4.0

- Bundle all 24 official EU languages, including setup, errors and clothing labels.
- Separate English and Hungarian documentation and product screenshots.
- Add structured bug, feature and translation issue forms and feedback links.
- Draw the sandal icon in side view, matching other footwear.

## 0.3.0

- Rename sun hat to straw hat and add a per-child baseball cap preference.
- Fit both sunny-weather hats to the shared character head geometry.
- Keep straw hats as the default for existing profiles; preserve cold-weather hats.

## 0.2.0

- Draw socks and tights as underlayers, with distinct clothing-list icons.
- Diagnose missing/wrong entities, waiting/unavailable sensors, stale forecasts and incompatible data separately.
- Add in-card/editor setup help, detected sensor IDs and README FAQ links.
- Filter the native entity picker to Kids Outfit; remove the nonexistent default sensor ID.
- Keep rendering older integration data; add diagnosis, editor and legwear browser tests.

## 0.1.1

- Make layer advice accurate for both warming and cooling school days.
- Derive the built module version from package metadata.

## 0.1.0

- Consistent boy/girl SVG characters with layered clothing and accessory icons.
- Responsive and compact tablet layouts, visual configuration editor.
- English/Hungarian, any-language text overrides, locale formatting and RTL support.
- Freshness handling, screen-reader labels and dependency-free runtime bundle.
- HACS Dashboard packaging and browser regression tests.
