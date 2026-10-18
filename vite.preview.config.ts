import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

/**
 * Builds the whole app into one self-contained HTML file for review:
 * every JS chunk, the CSS and the lazy routes are inlined, so it opens
 * straight from disk with no server. Assets under public/ are rewritten to
 * data URIs by scripts/inline-preview-assets.mjs afterwards.
 */
export default defineConfig({
  plugins: [react(), tailwindcss(), viteSingleFile()],
  resolve: { alias: { '@': path.resolve(__dirname, '.') } },
  build: {
    // preview.html is index.html with the entry swapped to the hash-router shim.
    rollupOptions: { input: path.resolve(__dirname, 'preview.html') },
    outDir: 'dist-preview',
    emptyOutDir: true,
    cssCodeSplit: false,
    assetsInlineLimit: 100000000,
    chunkSizeWarningLimit: 100000,
    target: 'es2019',
  },
});
