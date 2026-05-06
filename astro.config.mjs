// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'node:fs';
import path from 'node:path';

export default defineConfig({
  output: 'static',
  integrations: [react()],

  vite: {
    plugins: [
      tailwindcss(),
      {
        name: 'flutter-spa-fallback',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.url?.startsWith('/doctor') || req.url?.startsWith('/pharma')) {
              const app = req.url.startsWith('/doctor') ? 'doctor' : 'pharma';
              const filePath = path.join(process.cwd(), 'public', req.url);
              if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
                return next();
              }
              req.url = `/${app}/index.html`;
            }
            next();
          });
        },
      },
    ],
  },
});
