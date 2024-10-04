import express from 'express';

export default function createRouter(AppController) {
  const router = express.Router();

  router.get('/today/:location', AppController.getNowData);
  router.get('/daily/:location', AppController.getDailyData);
  router.get('/hourly/:location', AppController.getHourlyData);

  return router;
}
