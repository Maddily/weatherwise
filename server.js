import express from 'express';
import cors from 'cors';
import createRouter from './routes/index.js';
import AppController from './controllers/AppController.js';

const app = express();
const port = 5000;
const router = createRouter(AppController);

app.use(cors());
app.use(router);

app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});

export default app;
