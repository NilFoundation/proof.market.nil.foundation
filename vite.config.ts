/**
 * @file Vite configuration.
 */

import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';
import eslint from 'vite-plugin-eslint';
import viteCompression from 'vite-plugin-compression';
import { createMpaPlugin, createPages } from 'vite-plugin-virtual-mpa';

const pages = createPages([
    {
        name: 'index',
        entry: '/src/index.tsx',
    },
    {
        name: 'charts',
        entry: '/src/index.charts.tsx',
    },
]);

export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    plugins: [
        createMpaPlugin({
            htmlMinify: true,
            pages,
            verbose: true,
            template: 'index.html',
        }),
        react(),
        eslint(),
        legacy({
            targets: ['defaults'],
            additionalLegacyPolyfills: ['core-js/stable'],
        }),
        viteCompression(),
    ],
    build: {
        outDir: 'build',
    },
});
