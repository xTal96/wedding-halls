# השוואת אולמות — Wedding Hall Price Comparison PWA

A Hebrew (RTL) PWA for comparing wedding hall prices, built mainly for iPhone. It has no build step and no dependencies.

## Features
- **Price per guest by month and weekday**, with optional guest-count tiers (e.g. ₪400, or ₪385 for everyone above 200 guests). For example, "September · Thursday" costs ₪450 and "October · Thursday" costs ₪550. When several rules match the same date, the most specific one wins.
- **Guest count** on the main screen. You can override it inside a hall, and again inside a single price breakdown.
- **Contractor meals** (photographers, DJ, and so on). You set the list and counts once. Each hall has its own meal price, and a single price rule can override it.
- **Extra charges** with preset suggestions and autocomplete, also with optional guest-count tiers. Each charge can be a fixed amount, a per-guest amount, or a percentage of the meals (for example, a service fee).
- Minimum guest count, VAT toggle per hall, and a price grid (month × weekday).
- Main screen sorts halls from cheapest to most expensive. You can filter by month, weekday or a specific date.
- Offline support, a JSON backup that you can export and import, and a share button for the breakdown.

## Run locally
```bash
python3 -m http.server 8765
```
Then open http://localhost:8765.

## Install on iPhone
The service worker needs HTTPS. You can host the folder for free on GitHub Pages, Netlify Drop or Cloudflare Pages. Then open the site in Safari and choose Share → **Add to Home Screen**.

Your data lives in the device's localStorage. Use **Settings → Export backup** now and then, or to move your data to another phone.

## Updating
After you change any file, bump `CACHE` in `sw.js` (for example, `halls-v4`) and push. When online, the app always loads the latest files. When it comes back to the foreground it checks for a new version and reloads itself once the new version is ready. The version shows at the bottom of ⚙️ Settings.
