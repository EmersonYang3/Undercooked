import { fileURLToPath, URL } from 'node:url'

import { defineConfig, searchForWorkspaceRoot } from 'vite';
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

const resolveSrc = (subpath = '') =>
  fileURLToPath(new URL(`./src${subpath ? `/${subpath}` : ''}`, import.meta.url));

const sharedDir = fileURLToPath(new URL('../shared/src', import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': resolveSrc(),
      'shared': sharedDir,
      'assets': resolveSrc('assets'),
      'components': resolveSrc('components'),
      'connections': resolveSrc('connections'),
      'services': resolveSrc('services'),
      'stores': resolveSrc('stores'),
      'utils': resolveSrc('utils'),
      'views': resolveSrc('views'),
      'router': resolveSrc('router'),
    },
  },
  server: {
    fs: {
      allow: [
        searchForWorkspaceRoot(fileURLToPath(new URL('.', import.meta.url))),
        sharedDir,
      ],
    },
  },
})
