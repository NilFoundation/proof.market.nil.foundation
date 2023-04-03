import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

import { createHtmlPlugin } from 'vite-plugin-html';
import legacy from '@vitejs/plugin-legacy';
import eslint from 'vite-plugin-eslint';
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        }
    },
    plugins: [
        createHtmlPlugin({
            minify: true,
        }),
        react(),
        eslint(),
        legacy({
            targets: ['defaults'],
            additionalLegacyPolyfills: [
                'core-js/stable'
            ],
        }),
        viteCompression(),
    ],
    build: {
        outDir: 'build',
    }
})
