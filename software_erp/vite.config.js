import {
  defineConfig
} from 'vite';
import react from '@vitejs/plugin-react';
import {
  resolve
} from 'path';

export default defineConfig({
  root: 'src/renderer',
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src/renderer/src')
    }
  },
  build: {
    outDir: '../../dist/renderer',
    emptyOutDir: true
  },
  esbuild: {
    jsxFactory: 'React.createElement',
    jsxInject: `import React from 'react'`
  },
  server: {
    host: '0.0.0.0',
    port: 3000
  }
});
