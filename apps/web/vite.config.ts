import 'dotenv/config';

import react from '@vitejs/plugin-react';
import dayjs from 'dayjs';
import path from 'path';
import { defineConfig } from 'vite';
import { ViteEjsPlugin as viteEjsPlugin } from 'vite-plugin-ejs';
import tsconfigPaths from 'vite-tsconfig-paths';
import { version } from './package.json';

const now = dayjs();
const releaseDate = now.format('DD/MM/YYYY HH:mm:ss');
const moduleReleaseExt = now.format('DDMMYYHHmmss');

const workspaceRoot = path.resolve(__dirname, '..', '..');
const root = __dirname;

export default defineConfig({
  root,
  base: process.env.VITE_BASE_URL,
  envPrefix: 'VITE_',
  envDir: path.join(root, '.env'),

  plugins: [
    react(),
    tsconfigPaths(),
    viteEjsPlugin({
      releaseDate,
      releaseVersion: version,
      baseUrl: process.env.VITE_BASE_URL,
      logoUrl: process.env.VITE_ASSET_URL + '/img/app-logo.svg',
      faviconUrl: process.env.VITE_ASSET_URL + '/img/app-logo.svg'
    })
  ],

  define: { 'process.env': {} },

  build: {
    emptyOutDir: true,
    outDir: path.join(workspaceRoot, 'build/apps/web'),
    reportCompressedSize: true,
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        assetFileNames: `assets/[name]-[hash]-${moduleReleaseExt}.[ext]`,
        entryFileNames: `assets/[name]-[hash]-${moduleReleaseExt}.js`,
        chunkFileNames: `assets/[name]-[hash]-${moduleReleaseExt}.js`
      }
    }
  },

  server: {
    open: true,
    host: process.env.DEV_SERVER_HOST || '0.0.0.0',
    port: Number(process.env.DEV_SERVER_PORT || 8000),
    hmr: { overlay: false },
    fs: { strict: false }
  },

  preview: {
    host: process.env.DEV_SERVER_HOST || '0.0.0.0',
    port: Number(process.env.DEV_SERVER_PORT || 8000)
  }
});
