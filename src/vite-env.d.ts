/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SOBOS_ORDER_URL?: string;
  readonly VITE_SOBOS_LOCATION_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
