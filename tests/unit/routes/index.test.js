import { expect } from 'chai';
import sinon from 'sinon';
import request from 'supertest';
import express from 'express';
import createRouter from '../../../routes/index.js';

describe('createRouter', function () {
  let app;
  let getNowDataStub, getDailyDataStub, getHourlyDataStub;

  before(() => {
    app = express();

    getNowDataStub = sinon.stub().callsFake((req, res) => {
      res.json({ data: 'Mocked data' });
    });

    getDailyDataStub = sinon.stub().callsFake((req, res) => {
      res.json({ data: 'Mocked data' });
    });

    getHourlyDataStub = sinon.stub().callsFake((req, res) => {
      res.json({ data: 'Mocked data' });
    });

    const router = createRouter({
      getNowData: getNowDataStub,
      getDailyData: getDailyDataStub,
      getHourlyData: getHourlyDataStub,
    });

    app.use(router);
  });

  describe('GET /today/:location', function () {
    it('should call AppController.getNowData', function (done) {
      request(app)
        .get('/today/cairo')
        .end((err, res) => {
          if (err) return done(err);
          console.log('Response:', res.text);
          expect(getNowDataStub.calledOnce).to.be.true;
          done();
        });
    });
  });

  describe('GET /daily/:location', function () {
    it('should call AppController.getDailyData', function (done) {
      request(app)
        .get('/daily/cairo')
        .end((err, res) => {
          if (err) return done(err);
          console.log('Response:', res.text);
          expect(getDailyDataStub.calledOnce).to.be.true;
          done();
        });
    });
  });

  describe('GET /hourly/:location', function () {
    it('should call AppController.getHourlyData', function (done) {
      request(app)
        .get('/Hourly/alexandria')
        .end((err, res) => {
          if (err) return done(err);
          console.log('Response:', res.text);
          expect(getHourlyDataStub.calledOnce).to.be.true;
          done();
        });
    });
  });
});
