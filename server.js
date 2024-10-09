import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import createRouter from './routes/index.js';
import AppController from './controllers/AppController.js';

const app = express();
const port = process.env.PORT || 5000;
const router = createRouter(AppController);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from /dist
app.use(express.static(path.join(__dirname, 'dist')));

app.use(cors());
app.use(router);

// Set `trust proxy` to `true` so that `req.ip` returns real IP addresses
app.set('trust proxy', true);

app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});

export default app;
