/// <reference types="vite/client" />

/* 環境変数定義 */
interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string;
}
interface ImportMeta {
    readonly env: ImportMetaEnv;
}
