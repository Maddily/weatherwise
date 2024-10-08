import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import createRouter from './routes/index.js';
import AppController from './controllers/AppController.js';

const app = express();
const port = 5000;
const router = createRouter(AppController);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from /dist
app.use(express.static(path.join(__dirname, 'dist')));

app.use(cors());
app.use(router);

app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});

export default app;
