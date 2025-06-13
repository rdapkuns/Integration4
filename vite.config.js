// vite.config.js
import { defineConfig } from 'vite'
import { resolve } from 'path'
import fs from 'fs'
import path from 'path'

export default defineConfig({
    base: '/Integration4/',
    build: {
        outDir: 'docs',
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                intro: resolve(__dirname, 'intro.html'),
                game: resolve(__dirname, 'game.html'),
            }
        }
    },
    server: {
        host: true, // enables network access
        https: {
            key: fs.readFileSync(path.resolve(__dirname, './localhost.key')),
            cert: fs.readFileSync(path.resolve(__dirname, './localhost.crt')),
        }
    }
});
