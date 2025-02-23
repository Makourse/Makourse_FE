import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    resolve: {
        dedupe: ["react", "react-dom"],
    },
    server: {
        proxy: {
            '/v1': {
                target: 'https://openapi.naver.com',
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path
            },
            '/naver-api': {
                target: 'https://naveropenapi.apigw.ntruss.com',
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/naver-api/, '')
            }
        }
    }
});

