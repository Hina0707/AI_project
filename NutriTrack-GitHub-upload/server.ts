import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { searchNutrition } from './backend/nutrition.js';

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 3000;
const host = process.env.HOST || '127.0.0.1';

app.use(express.json());

app.get('/api/search-nutrition', async (req: Request, res: Response) => {
  const query = typeof req.query.q === 'string' ? req.query.q : '';
  try {
    res.json(await searchNutrition(query));
  } catch (error) {
    console.error('Nutrition search failed:', error);
    res.status(500).json({ error: 'Nutrition search failed' });
  }
});

// Setup Vite in Dev or Static files in Production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production' || process.argv.includes('--production');

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(port, host, () => {
    console.log(`> NutriTrack running on http://localhost:${port}`);
  }).on('error', (error) => {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
