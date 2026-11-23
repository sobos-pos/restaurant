# Restaurant showcase site

A one-page restaurant website (React 19 + Vite 8 + Tailwind 4) whose **Order Now** button sends the guest to SOBOS guest ordering.

## Run

```
npm install
cp .env.example .env.local   # then fill in VITE_SOBOS_LOCATION_ID
npm run dev                  # or "restaurant-site" in the workspace .claude/launch.json (port 5180)
npm run build                # refuses to build without both VITE_SOBOS_* values
```

## How it connects to SOBOS

| On this site | Goes to | What the guest gets |
|---|---|---|
| Order Now | `<VITE_SOBOS_ORDER_URL>/?l=<VITE_SOBOS_LOCATION_ID>` | The outlet's counter / take-away menu: browse, prepay, token number, pickup |
| (nothing) | Table QR stickers print `https://qr.soboss.in/t/<qr_token>`, which redirects to `https://order.soboss.in/?t=<qr_token>` | Dine-in at that table, with waiter pairing |

- Order Now is an ordinary link in the same tab. The guest app is **not** iframed: final_prd `edge.md` §6 sends `frame-ancestors 'none'`, so browsers refuse to embed it.
- The location id is public (the same id a counter QR carries), so it is fine in the site bundle.
- The counter channel must be enabled for the outlet (`Enabled channels` → `counter_takeaway`), otherwise the guest app gets `409 channel_not_enabled`.

## Editing content

All restaurant text is in `src/content.ts`. It has no prices or stock on purpose: those come live from the SOBOS menu on the ordering page. The address and phone are placeholders (marked TODO).
