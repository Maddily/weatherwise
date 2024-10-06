import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import createRouter from './routes/index.js';
import AppController from './controllers/AppController.js';

const app = express();
const port = process.env.PORT || 5000;
const router = createRouter(AppController);

app.use(cors());
app.use(router);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from dist
app.use(express.static(path.join(__dirname, 'dist')));

// Fallback to index.html for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});

export default app;
