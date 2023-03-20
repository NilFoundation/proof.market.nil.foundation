import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

import { createHtmlPlugin } from 'vite-plugin-html';
import legacy from '@vitejs/plugin-legacy';

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
        legacy({
            targets: ['defaults'],
            additionalLegacyPolyfills: [
                'core-js/stable'
            ],
        }),
    ],
    build: {
        outDir: 'build',
    }
})
