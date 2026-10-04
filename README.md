# Patrol GPS

A simple GPS display for patrol officers. It shows:

- the **street you're on**
- the **nearest cross streets** (ahead and behind) with distances
- your **compass heading** and speed

It is not a navigation app. There is an optional plain map (off by default).

Street names come from OpenStreetMap (Overpass API); map tiles are OpenStreetMap. No accounts or API keys.

## Run it

Browsers only allow GPS on HTTPS (or `localhost`). Host the files on any static HTTPS host (GitHub Pages works), open the page on a phone, and use "Add to Home Screen".

Files: `index.html` (the app), `manifest.json`, `sw.js` (offline shell), `icon.svg`.

For testing without GPS, call `window.__feed(lat, lon, headingDeg, speedMps, accuracyM)` in the browser console.

## Notes

The public Overpass servers and OSM tile servers are fine for testing and light use. For department-wide use, run your own Overpass instance and use a tile provider.
