import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'
import checker from 'vite-plugin-checker'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        checker({
            typescript: true,
        }),
    ],
    resolve: {
        alias: {
            '@components': path.resolve(__dirname, './src/components'),
        },
    },
})
