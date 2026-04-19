// @ts-check
import { defineConfig } from 'astro/config';
import fs from 'node:fs';
import path from 'node:path';

// Plugin Vite pour servir les Flutter web apps depuis public/
function flutterAppsPlugin() {
  const apps = ['pharma', 'doctor'];
  return {
    name: 'flutter-web-apps',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        for (const app of apps) {
          const prefix = '/' + app + '/';
          if (req.url?.startsWith(prefix) || req.url === '/' + app) {
            // Redirect /pharma to /pharma/
            if (req.url === '/' + app) {
              res.writeHead(301, { Location: prefix });
              res.end();
              return;
            }
            // Resolve file from public/<app>/
            let filePath = req.url.slice(prefix.length) || 'index.html';
            const fullPath = path.join(process.cwd(), 'public', app, filePath);
            if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
              const ext = path.extname(fullPath);
              const mimeTypes = {
                '.html': 'text/html',
                '.js': 'application/javascript',
                '.css': 'text/css',
                '.json': 'application/json',
                '.png': 'image/png',
                '.jpg': 'image/jpeg',
                '.svg': 'image/svg+xml',
                '.woff': 'font/woff',
                '.woff2': 'font/woff2',
                '.ttf': 'font/ttf',
                '.otf': 'font/otf',
                '.wasm': 'application/wasm',
              };
              res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
              fs.createReadStream(fullPath).pipe(res);
              return;
            }
            // SPA fallback: serve index.html for all unmatched routes
            const indexPath = path.join(process.cwd(), 'public', app, 'index.html');
            if (fs.existsSync(indexPath)) {
              res.setHeader('Content-Type', 'text/html');
              fs.createReadStream(indexPath).pipe(res);
              return;
            }
          }
        }
        next();
      });
    },
  };
}

export default defineConfig({
  vite: {
    plugins: [flutterAppsPlugin()],
  },
});
