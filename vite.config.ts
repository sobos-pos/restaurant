import { fileURLToPath } from 'node:url';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

/**
 * Two pages: the showcase (`/`) and the dine-in ordering page (`/order/`),
 * which hosts the SOBOS embed script.
 *
 * A production build without the SOBOS values would ship an ordering page that
 * shows nothing. Fail the build instead of the guest. `vite dev` still starts
 * without them; the order page then just asks the guest to scan.
 */
export default defineConfig(({ command, mode }) => {
  if (command === 'build') {
    const env = loadEnv(mode, process.cwd(), 'VITE_');
    const missing = ['VITE_SOBOS_ORDER_URL', 'VITE_SOBOS_LOCATION_ID'].filter(
      (name) => !env[name]?.trim(),
    );
    if (missing.length > 0) {
      throw new Error(`Set ${missing.join(' and ')} (see .env.example) before building.`);
    }
  }

  return {
    plugins: [react(), tailwindcss()],
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
