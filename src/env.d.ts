interface ImportMetaEnv {
  readonly PUBLIC_YMAP_API_KEY: string;
  readonly PUBLIC_YMAP_IMAGE_PATH: string;
  readonly PUBLIC_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
