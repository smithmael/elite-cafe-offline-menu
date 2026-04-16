import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const browserDistFolder = join(__dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * Static File Serving
 * Serve assets from the /browser folder with caching
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Angular SSR Rendering
 * Handle all requests by rendering the Angular application.
 */
app.all('{*path}', (req, res, next) => {
  angularApp
    .handle(req)
    .then((response) => {
      if (response) {
        return writeResponseToNodeResponse(response, res);
      }
      return next();
    })
    .catch(next);
});

/**
 * Server Lifecycle
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  // Use 127.0.0.1 instead of localhost to avoid "Hostname not allowed" errors
  const port = process.env['PORT'] || 3000;
  const host = process.env['HOST'] || '127.0.0.1'; 

  app.listen(Number(port), host, () => {
    console.log(`🚀 Server active at: http://${host}:${port}`);
  });
}

/**
 * Export for Angular CLI / Cloud Functions
 */
export const reqHandler = createNodeRequestHandler(app);