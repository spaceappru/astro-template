interface ImportMetaEnv {
  readonly PUBLIC_YMAP_API_KEY: string;
  readonly PUBLIC_BUILD_PATH: string;
  readonly PUBLIC_FORM_PATH: string;
  readonly PUBLIC_DOMAIN_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
