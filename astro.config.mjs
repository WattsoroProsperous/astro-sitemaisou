// @ts-check
import { defineConfig } from 'astro/config';
import fs from 'node:fs';
import path from 'node:path';

// Middleware pour servir les Flutter web apps depuis public/pharma et public/doctor
function flutterAppsMiddleware() {
  const apps = ['pharma', 'doctor'];
  const mimeTypes = {
    '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css',
    '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml', '.woff': 'font/woff', '.woff2': 'font/woff2',
    '.ttf': 'font/ttf', '.otf': 'font/otf', '.wasm': 'application/wasm',
    '.ico': 'image/x-icon',
  };

  return {
    name: 'serve-flutter-apps',
    hooks: {
      'astro:server:setup': ({ server }) => {
        server.middlewares.use((req, res, next) => {
          const url = (req.url || '').split('?')[0];
          for (const app of apps) {
            const prefix = '/' + app + '/';
            if (url === '/' + app) {
              res.writeHead(301, { Location: prefix });
              res.end();
              return;
            }
            if (!url.startsWith(prefix)) continue;

            const relPath = url.slice(prefix.length) || 'index.html';
            const fullPath = path.join(process.cwd(), 'public', app, relPath);

            if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
              const ext = path.extname(fullPath);
              res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
              fs.createReadStream(fullPath).pipe(res);
              return;
            }
            // SPA fallback — Flutter routing
            const indexPath = path.join(process.cwd(), 'public', app, 'index.html');
            if (fs.existsSync(indexPath)) {
              res.setHeader('Content-Type', 'text/html');
              fs.createReadStream(indexPath).pipe(res);
              return;
            }
          }
          next();
        });
      },
    },
  };
}

export default defineConfig({
  integrations: [flutterAppsMiddleware()],
});
