import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

/**
 * A production build without the ordering link would ship a site whose one
 * job (Order Now) does nothing. Fail the build instead of the visitor.
 * `vite dev` still starts without it and shows the button as unavailable.
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

  return { plugins: [react(), tailwindcss()] };
});
