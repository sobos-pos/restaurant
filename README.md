# Restaurant showcase site

A restaurant website (React 19 + Vite 8 + Tailwind 4) with **dine-in ordering built in**: guests scan their table's QR code and order inside this site, through SOBOS.

## Run

```
npm install
cp .env.example .env.local   # then fill in VITE_SOBOS_LOCATION_ID
npm run dev                  # or "restaurant-site" in the workspace .claude/launch.json (port 5180)
npm run build                # without VITE_SOBOS_LOCATION_ID the build passes but /order/ has no embed
```

## Pages

| Path | What it is |
|---|---|
| `/` | The showcase: signboard, dishes, how ordering works, visit details. **Order Now** goes to `/order/`. |
| `/order/` | Hosts the SOBOS embed (`order/index.html`). A table scan lands here as `/order/?t=<table code>`. |

## How a guest gets here

1. The table sticker is SOBOS's own `https://qr.sobos.in/t/<code>`; it never changes.
2. In the SOBOS dashboard (**Tables & Floor → Website**) the owner adds `https://<this site>/order/`, publishes the DNS TXT record it shows, presses **Verify**, then **Send table scans here**.
3. From then on a scan opens `/order/?t=<code>` here. The embed script takes the code off the address bar and opens the menu in a frame filling the screen. Pairing with the waiter, rounds and the bill work exactly as on SOBOS.
4. Turning it off in the dashboard sends the next scan straight to SOBOS. No reprint either way.

The frame only renders on a domain the outlet has verified (SOBOS sends `frame-ancestors` per outlet). If it does not come up within 12 s, the page offers "Open ordering in a new tab". Spec: `final_prd/qr_ordering/embed.md` in the backend repo.

## Editing content

All restaurant text for `/` is in `src/content.ts`; the order page's header is in `order/index.html`. Neither has prices or stock: those come live from the SOBOS menu. The address and phone are placeholders (marked TODO).
