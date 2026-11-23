/**
 * Where Order Now sends the guest.
 *
 * A plain top-level navigation to the SOBOS guest ordering app, never an
 * iframe: final_prd edge.md §6 sets `frame-ancestors 'none'` on the guest app,
 * so the browser refuses to render it inside this site anyway.
 *
 * `?l=<location id>` is the guest app's counter / take-away entry (it loads
 * `/api/v1/public/locations/<id>/menu/`). Table QR stickers do not come
 * through this site; they point at the SOBOS QR host directly.
 */
function buildOrderUrl(): string | null {
  const base = import.meta.env.VITE_SOBOS_ORDER_URL?.trim();
  const locationId = import.meta.env.VITE_SOBOS_LOCATION_ID?.trim();
  if (!base || !locationId) return null;

  let url: URL;
  try {
    url = new URL('/', base);
  } catch {
    return null;
  }

  const isLocal = url.hostname === 'localhost' || url.hostname === '127.0.0.1';
  if (url.protocol !== 'https:' && !(url.protocol === 'http:' && isLocal)) return null;

  url.searchParams.set('l', locationId);
  return url.toString();
}

export const orderUrl = buildOrderUrl();

if (orderUrl === null) {
  console.warn(
    'Order Now is disabled: set VITE_SOBOS_ORDER_URL (https, or http on localhost) and VITE_SOBOS_LOCATION_ID. See .env.example.',
  );
}
