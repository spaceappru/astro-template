interface ImportMetaEnv {
  readonly PUBLIC_YMAP_API_KEY: string;
  readonly VITE_YMAP_IMAGE_PATH: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
