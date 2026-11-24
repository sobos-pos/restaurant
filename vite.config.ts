import { fileURLToPath } from 'node:url';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

const DEFAULT_ORDER_URL = 'https://order.sobos.in';

/**
 * Two pages: the showcase (`/`) and the dine-in ordering page (`/order/`),
 * which hosts the SOBOS embed script.
 *
 * VITE_SOBOS_ORDER_URL defaults to the production SOBOS host. If
 * VITE_SOBOS_LOCATION_ID is not set, the build still succeeds (with a warning)
 * but the embed script is left out of the order page, which then just asks the
 * guest to scan the table QR code. Set the variable in the host's environment
 * settings (e.g. Vercel > Project > Settings > Environment Variables) and
 * redeploy to turn ordering on.
 */
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const orderUrl = (env.VITE_SOBOS_ORDER_URL?.trim() || DEFAULT_ORDER_URL).replace(/\/+$/, '');
  const locationId = env.VITE_SOBOS_LOCATION_ID?.trim() ?? '';

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'sobos-embed-html',
        transformIndexHtml: {
          order: 'pre',
          handler(html) {
            if (!locationId) {
              console.warn(
                '\n[sobos] VITE_SOBOS_LOCATION_ID is not set: the /order/ page is built WITHOUT the ordering embed.\n',
              );
              return html.replace(/<script\s+src="%VITE_SOBOS_ORDER_URL%[\s\S]*?<\/script>/, '');
            }
            return html
              .replaceAll('%VITE_SOBOS_ORDER_URL%', orderUrl)
              .replaceAll('%VITE_SOBOS_LOCATION_ID%', locationId);
          },
        },
      },
    ],
    build: {
      rolldownOptions: {
        input: {
          main: fileURLToPath(new URL('./index.html', import.meta.url)),
          order: fileURLToPath(new URL('./order/index.html', import.meta.url)),
        },
      },
    },
  };
});
