import { expect } from 'chai';
import request from 'supertest';
import Joi from 'joi';
import { hoursToSeconds } from 'date-fns';
import sinon from 'sinon';
import app from '../../../server.js';
import redisClient from '../../../utils/redis.js';
import { getRemainingHoursToday } from '../../../src/utils.js'
import AppController from '../../../controllers/AppController.js';

describe('GET /daily/:location', function () {
  afterEach(() => {
    redisClient.flushAll();
  });

  const schema = Joi.array().items(
    Joi.object({
      datetime: Joi.string().isoDate().required(),
      icon: Joi.string().required(),
      tempmax: Joi.number().required(),
      tempmin: Joi.number().required(),
      conditions: Joi.string().required(),
    })
  ).min(10).max(10);

  describe('valid location', function () {
    it('should respond with the correct data when the location is valid', async function () {
      const res = await request(app).get('/daily/alexandria');
      expect(res.status).to.equal(200);
      expect(schema.validate(res.body).error).to.be.undefined;
    });
  });

  describe('error handling', function () {
    afterEach(() => {
      redisClient.flushAll();
    });

    it('should respond with a 400 error if the location is invalid', async function () {
      const res = await request(app).get('/daily/ca');
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.equal(
        'The location "ca" could not be found. Please check the spelling and try again.'
      );
    });

    it('should respond with a 500 error if the API request fails', async function () {
      sinon.stub(AppController, '_fetchData').throws(new Error('Network failure'));

      const res = await request(app).get('/daily/alexandria');

      expect(res.status).to.equal(500);
      expect(res.body.error).to.equal('Something went wrong!');

      sinon.restore();
    });

    it('should respond with a 429 error if the user has exceeded the rate limit', async function () {
      const ipAddress = '::ffff:127.0.0.1';
      const remainingHoursInDay = getRemainingHoursToday();

      redisClient.set(ipAddress, '30', hoursToSeconds(remainingHoursInDay));

      const res = await request(app).get('/daily/cairo');
      expect(res.status).to.equal(429);
      expect(res.body.error).to.equal('Too many requests! Try again tomorrow.');
    });
  });

  describe('caching behavior', function () {
    it('should cache the weather data after the first request', async function () {
      redisClient.flushAll();

      const firstRes = await request(app).get('/daily/kyoto');
      expect(firstRes.status).to.equal(200);

      const secondRes = await request(app).get('/daily/kyoto');
      expect(secondRes.status).to.equal(200);

      expect(firstRes.body).to.deep.equal(secondRes.body);
    });
  });
});
