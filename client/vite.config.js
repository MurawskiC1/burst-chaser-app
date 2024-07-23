// client/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    open: true,
    port: 5173,
  },
  build: {
    outDir: 'build' // Set the output directory for the build
  },
  plugins: [react()]
});
