/// <reference types="vite/client" />

declare module '@fontsource-variable/gabarito';

interface ImportMetaEnv {
    readonly VITE_API_KEY: string;
    // add other environment variables here as needed
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
