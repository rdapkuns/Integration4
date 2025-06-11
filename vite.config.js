// vite.config.js
import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    base: '/Integration4/',
    root: 'public',
    build: {
        outDir: '../docs', // Output goes one level up from 'public' to keep things clean
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'public/index.html'),
                intro: resolve(__dirname, 'public/intro.html'),
                game: resolve(__dirname, 'public/game.html'),
            }
        }
    }
});
