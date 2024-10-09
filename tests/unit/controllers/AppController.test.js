import { expect } from 'chai';
import sinon from 'sinon';
import { mockRequest, mockResponse } from 'mock-req-res';
import esmock from 'esmock';
import redisClient from '../../../utils/redis.js';

describe('AppController', function () {
  let mockedGetCachedData;
  let mockedFetchData;
  let mockedGetVisibilityText;
  let redisMock;
  let req;
  let res;

  describe('getNowData', function () {
    let AppControllerWithMock, mockedGetCurrentHour, mockedMinutesToSeconds;

    beforeEach(async () => {
      mockedGetCurrentHour = sinon.stub().returns(0);
      mockedGetVisibilityText = sinon.stub().returns('Clear');
      mockedMinutesToSeconds = sinon.stub().returns(600);

      AppControllerWithMock = await esmock(
        '../../../controllers/AppController.js',
        {
          '../../../src/utils.js': {
            getCurrentHour: mockedGetCurrentHour,
            getVisibilityText: mockedGetVisibilityText,
          },
          'date-fns': {
            minutesToSeconds: mockedMinutesToSeconds,
          },
        }
      );

      mockedGetCachedData = sinon
        .stub(AppControllerWithMock, '_getCachedData')
        .resolves({ temp: 25 });

      mockedFetchData = sinon
        .stub(AppControllerWithMock, '_fetchData')
        .resolves({
          days: [
            {
              datetime: '2024-09-17',
              tempmax: 22,
              tempmin: 16,
              hours: [
                {
                  temp: 20,
                  feelslike: 18,
                  conditions: 'Clear',
                  icon: 'clear-day',
                  humidity: 60,
                  dew: 10,
                  pressure: 1015,
                  windspeed: 17,
                  winddir: 14,
                  visibility: 10,
                  uvindex: 3,
                },
              ],
            },
          ],
          tzoffset: 0,
        });

      req = mockRequest({
        params: { location: 'cairo' },
        socket: { remoteAddress: '127.0.0.1' },
      });
      res = mockResponse({
        status: sinon.stub().returns(res),
        json: sinon.stub(),
      });
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should call getCachedData with the correct location', async function () {
      await AppControllerWithMock.getNowData(req, res);

      expect(mockedGetCachedData.calledOnceWith('cairo')).to.be.true;
    });

    it('should not call _fetchData if cached data is found', async function () {
      await AppControllerWithMock.getNowData(req, res);

      expect(mockedFetchData.calledOnce).to.be.false;
    });

    it('should call _fetchData if cached data is not found', async function () {
      mockedGetCachedData.resolves(null);

      await AppControllerWithMock.getNowData(req, res);

      expect(mockedFetchData.calledOnce).to.be.true;
    });

    it('should call getCurrentHour', async function () {
      mockedGetCachedData.resolves(null);

      await AppControllerWithMock.getNowData(req, res);

      expect(mockedGetCurrentHour.calledOnce).to.be.true;
    });

    it('should call getVisibilityText', async function () {
      mockedGetCachedData.resolves(null);

      await AppControllerWithMock.getNowData(req, res);

      expect(mockedGetVisibilityText.calledOnce).to.be.true;
    });

    it('should respond with an error if location is missing', async function () {
      req = mockRequest({
        params: {},
        socket: { remoteAddress: '127.0.0.1' },
      });

      await AppControllerWithMock.getNowData(req, res);

      expect(res.status.calledOnceWith(400)).to.be.true;
      expect(
        res.json.calledOnceWith({ error: 'Location parameter is required' })
      ).to.be.true;
    });

    it('should respond with an error if an exception is thrown', async function () {
      mockedGetCachedData.rejects(new Error('Something went wrong!'));

      await AppControllerWithMock.getNowData(req, res);

      expect(res.json.calledOnceWith({ error: 'Something went wrong!' })).to.be
        .true;
    });

    it('should respond with the correct data', async function () {
      mockedGetCachedData.resolves(null);
      await AppControllerWithMock.getNowData(req, res);

      const expectedData = {
        datetime: '2024-09-17',
        temp: 20,
        feelslike: 18,
        tempmax: 22,
        tempmin: 16,
        conditions: 'Clear',
        icon: 'clear-day',
        humidity: 60,
        dew: 10,
        pressure: 1015,
        windspeed: 17,
        winddir: 14,
        visibility: 10,
        visibilityText: 'Clear',
        uvindex: 3,
      };

      expect(res.status.calledOnceWith(200)).to.be.true;
      expect(res.json.calledOnceWith(expectedData)).to.be.true;
    });
  });

  describe('getHourlyData', function () {
    let AppControllerWithMock,
      mockedGetCurrentHour,
      mockedGetVisibilityText,
      mockedMinutesToSeconds;

    beforeEach(async () => {
      mockedGetCurrentHour = sinon.stub().returns(0);
      mockedGetVisibilityText = sinon.stub().returns('Clear');
      mockedMinutesToSeconds = sinon.stub().returns(600);

      AppControllerWithMock = await esmock(
        '../../../controllers/AppController.js',
        {
          '../../../src/utils.js': {
            getCurrentHour: mockedGetCurrentHour,
            getVisibilityText: mockedGetVisibilityText,
          },
          'date-fns': {
            minutesToSeconds: mockedMinutesToSeconds,
          },
        }
      );

      mockedGetCachedData = sinon.stub(AppControllerWithMock, '_getCachedData');
      mockedFetchData = sinon
        .stub(AppControllerWithMock, '_fetchData')
        .resolves({
          days: [
            {
              datetime: '2024-09-17',
              tempmax: 22,
              tempmin: 16,
              hours: [
                {
                  datetime: '00:00:00',
                  temp: 20,
                  feelslike: 18,
                  conditions: 'Clear',
                  icon: 'clear-day',
                  humidity: 60,
                  dew: 10,
                  pressure: 1015,
                  windspeed: 17,
                  winddir: 14,
                  visibility: 10,
                  uvindex: 3,
                },
                {
                  datetime: '00:00:00',
                  temp: 20,
                  feelslike: 18,
                  conditions: 'Clear',
                  icon: 'clear-day',
                  humidity: 60,
                  dew: 10,
                  pressure: 1015,
                  windspeed: 17,
                  winddir: 14,
                  visibility: 10,
                  uvindex: 3,
                },
                {
                  datetime: '00:00:00',
                  temp: 20,
                  feelslike: 18,
                  conditions: 'Clear',
                  icon: 'clear-day',
                  humidity: 60,
                  dew: 10,
                  pressure: 1015,
                  windspeed: 17,
                  winddir: 14,
                  visibility: 10,
                  uvindex: 3,
                },
                {
                  datetime: '00:00:00',
                  temp: 20,
                  feelslike: 18,
                  conditions: 'Clear',
                  icon: 'clear-day',
                  humidity: 60,
                  dew: 10,
                  pressure: 1015,
                  windspeed: 17,
                  winddir: 14,
                  visibility: 10,
                  uvindex: 3,
                },
                {
                  datetime: '00:00:00',
                  temp: 20,
                  feelslike: 18,
                  conditions: 'Clear',
                  icon: 'clear-day',
                  humidity: 60,
                  dew: 10,
                  pressure: 1015,
                  windspeed: 17,
                  winddir: 14,
                  visibility: 10,
                  uvindex: 3,
                },
                {
                  datetime: '00:00:00',
                  temp: 20,
                  feelslike: 18,
                  conditions: 'Clear',
                  icon: 'clear-day',
                  humidity: 60,
                  dew: 10,
                  pressure: 1015,
                  windspeed: 17,
                  winddir: 14,
                  visibility: 10,
                  uvindex: 3,
                },
                {
                  datetime: '00:00:00',
                  temp: 20,
                  feelslike: 18,
                  conditions: 'Clear',
                  icon: 'clear-day',
                  humidity: 60,
                  dew: 10,
                  pressure: 1015,
                  windspeed: 17,
                  winddir: 14,
                  visibility: 10,
                  uvindex: 3,
                },
                {
                  datetime: '00:00:00',
                  temp: 20,
                  feelslike: 18,
                  conditions: 'Clear',
                  icon: 'clear-day',
                  humidity: 60,
                  dew: 10,
                  pressure: 1015,
                  windspeed: 17,
                  winddir: 14,
                  visibility: 10,
                  uvindex: 3,
                },
                {
                  datetime: '00:00:00',
                  temp: 20,
                  feelslike: 18,
                  conditions: 'Clear',
                  icon: 'clear-day',
                  humidity: 60,
                  dew: 10,
                  pressure: 1015,
                  windspeed: 17,
                  winddir: 14,
                  visibility: 10,
                  uvindex: 3,
                },
              ],
            },
          ],
          tzoffset: 0,
        });

      req = mockRequest({
        params: { location: 'cairo' },
        socket: { remoteAddress: '127.0.0.1' },
      });
      res = mockResponse({
        status: sinon.stub().returns(res),
        json: sinon.stub(),
      });
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should call getCachedData with the correct location', async function () {
      mockedGetCachedData.resolves(null);

      await AppControllerWithMock.getHourlyData(req, res);

      expect(mockedGetCachedData.calledOnceWith('cairo')).to.be.true;
    });

    it('should not call _fetchData if cached data is found', async function () {
      mockedGetCachedData.resolves({ temp: 25 });

      await AppControllerWithMock.getHourlyData(req, res);

      expect(mockedFetchData.calledOnce).to.be.false;
    });

    it('should call _fetchData if cached data is not found', async function () {
      mockedGetCachedData.resolves(null);
      mockedFetchData.resolves({ temp: 25 });

      await AppControllerWithMock.getHourlyData(req, res);

      expect(mockedFetchData.calledOnce).to.be.true;
    });

    it('should call getCurrentHour', async function () {
      mockedGetCachedData.resolves({ temp: 25 });

      await AppControllerWithMock.getHourlyData(req, res);

      expect(mockedGetCurrentHour.calledOnce).to.be.true;
    });

    it('should respond with an error if location is missing', async function () {
      req = mockRequest({
        params: {},
        socket: { remoteAddress: '127.0.0.1' },
      });

      await AppControllerWithMock.getHourlyData(req, res);

      expect(res.status.calledOnceWith(400)).to.be.true;
      expect(
        res.json.calledOnceWith({ error: 'Location parameter is required' })
      ).to.be.true;
    });

    it('should respond with an error if an exception is thrown', async function () {
      mockedGetCachedData.rejects(new Error('Something went wrong!'));

      await AppControllerWithMock.getHourlyData(req, res);

      expect(res.json.calledOnceWith({ error: 'Something went wrong!' })).to.be
        .true;
    });

    it('should respond with the correct data', async function () {
      mockedGetCurrentHour.returns(0);
      mockedGetCachedData.resolves(null);
      await AppControllerWithMock.getHourlyData(req, res);

      const expectedData = [
        {
          datetime: '00:00:00',
          icon: 'clear-day',
          temp: 20,
        },
        {
          datetime: '00:00:00',
          icon: 'clear-day',
          temp: 20,
        },
        {
          datetime: '00:00:00',
          icon: 'clear-day',
          temp: 20,
        },
        {
          datetime: '00:00:00',
          icon: 'clear-day',
          temp: 20,
        },
        {
          datetime: '00:00:00',
          icon: 'clear-day',
          temp: 20,
        },
        {
          datetime: '00:00:00',
          icon: 'clear-day',
          temp: 20,
        },
        {
          datetime: '00:00:00',
          icon: 'clear-day',
          temp: 20,
        },
        {
          datetime: '00:00:00',
          icon: 'clear-day',
          temp: 20,
        },
      ];

      expect(res.status.calledOnceWith(200)).to.be.true;
      expect(res.json.calledOnceWith(expectedData)).to.be.true;
    });
  });

  describe('getDailyData', function () {
    let AppControllerWithMock;

    beforeEach(async () => {
      AppControllerWithMock = await esmock(
        '../../../controllers/AppController.js',
        {}
      );

      mockedGetCachedData = sinon.stub(AppControllerWithMock, '_getCachedData');
      mockedFetchData = sinon
        .stub(AppControllerWithMock, '_fetchData')
        .resolves({
          days: [
            {
              datetime: '2024-09-17',
              tempmax: 22,
              tempmin: 16,
              icon: 'clear-day',
              conditions: 'Clear',
              hours: [
                {
                  temp: 20,
                  feelslike: 18,
                  conditions: 'Clear',
                  icon: 'clear-day',
                  humidity: 60,
                  dew: 10,
                  pressure: 1015,
                  windspeed: 17,
                  winddir: 14,
                  visibility: 10,
                  uvindex: 3,
                },
              ],
            },
            {
              datetime: '2024-09-17',
              tempmax: 22,
              tempmin: 16,
              icon: 'clear-day',
              conditions: 'Clear',
              hours: [
                {
                  temp: 20,
                  feelslike: 18,
                  conditions: 'Clear',
                  icon: 'clear-day',
                  humidity: 60,
                  dew: 10,
                  pressure: 1015,
                  windspeed: 17,
                  winddir: 14,
                  visibility: 10,
                  uvindex: 3,
                },
              ],
            },
            {
              datetime: '2024-09-17',
              tempmax: 22,
              tempmin: 16,
              icon: 'clear-day',
              conditions: 'Clear',
              hours: [
                {
                  temp: 20,
                  feelslike: 18,
                  conditions: 'Clear',
                  icon: 'clear-day',
                  humidity: 60,
                  dew: 10,
                  pressure: 1015,
                  windspeed: 17,
                  winddir: 14,
                  visibility: 10,
                  uvindex: 3,
                },
              ],
            },
            {
              datetime: '2024-09-17',
              tempmax: 22,
              tempmin: 16,
              icon: 'clear-day',
              conditions: 'Clear',
              hours: [
                {
                  temp: 20,
                  feelslike: 18,
                  conditions: 'Clear',
                  icon: 'clear-day',
                  humidity: 60,
                  dew: 10,
                  pressure: 1015,
                  windspeed: 17,
                  winddir: 14,
                  visibility: 10,
                  uvindex: 3,
                },
              ],
            },
            {
              datetime: '2024-09-17',
              tempmax: 22,
              tempmin: 16,
              icon: 'clear-day',
              conditions: 'Clear',
              hours: [
                {
                  temp: 20,
                  feelslike: 18,
                  conditions: 'Clear',
                  icon: 'clear-day',
                  humidity: 60,
                  dew: 10,
                  pressure: 1015,
                  windspeed: 17,
                  winddir: 14,
                  visibility: 10,
                  uvindex: 3,
                },
              ],
            },
            {
              datetime: '2024-09-17',
              tempmax: 22,
              tempmin: 16,
              icon: 'clear-day',
              conditions: 'Clear',
              hours: [
                {
                  temp: 20,
                  feelslike: 18,
                  conditions: 'Clear',
                  icon: 'clear-day',
                  humidity: 60,
                  dew: 10,
                  pressure: 1015,
                  windspeed: 17,
                  winddir: 14,
                  visibility: 10,
                  uvindex: 3,
                },
              ],
            },
            {
              datetime: '2024-09-17',
              tempmax: 22,
              tempmin: 16,
              icon: 'clear-day',
              conditions: 'Clear',
              hours: [
                {
                  temp: 20,
                  feelslike: 18,
                  conditions: 'Clear',
                  icon: 'clear-day',
                  humidity: 60,
                  dew: 10,
                  pressure: 1015,
                  windspeed: 17,
                  winddir: 14,
                  visibility: 10,
                  uvindex: 3,
                },
              ],
            },
            {
              datetime: '2024-09-17',
              tempmax: 22,
              tempmin: 16,
              icon: 'clear-day',
              conditions: 'Clear',
              hours: [
                {
                  temp: 20,
                  feelslike: 18,
                  conditions: 'Clear',
                  icon: 'clear-day',
                  humidity: 60,
                  dew: 10,
                  pressure: 1015,
                  windspeed: 17,
                  winddir: 14,
                  visibility: 10,
                  uvindex: 3,
                },
              ],
            },
            {
              datetime: '2024-09-17',
              tempmax: 22,
              tempmin: 16,
              icon: 'clear-day',
              conditions: 'Clear',
              hours: [
                {
                  temp: 20,
                  feelslike: 18,
                  conditions: 'Clear',
                  icon: 'clear-day',
                  humidity: 60,
                  dew: 10,
                  pressure: 1015,
                  windspeed: 17,
                  winddir: 14,
                  visibility: 10,
                  uvindex: 3,
                },
              ],
            },
            {
              datetime: '2024-09-17',
              tempmax: 22,
              tempmin: 16,
              icon: 'clear-day',
              conditions: 'Clear',
              hours: [
                {
                  temp: 20,
                  feelslike: 18,
                  conditions: 'Clear',
                  icon: 'clear-day',
                  humidity: 60,
                  dew: 10,
                  pressure: 1015,
                  windspeed: 17,
                  winddir: 14,
                  visibility: 10,
                  uvindex: 3,
                },
              ],
            },
            {
              datetime: '2024-09-17',
              tempmax: 22,
              tempmin: 16,
              icon: 'clear-day',
              conditions: 'Clear',
              hours: [
                {
                  temp: 20,
                  feelslike: 18,
                  conditions: 'Clear',
                  icon: 'clear-day',
                  humidity: 60,
                  dew: 10,
                  pressure: 1015,
                  windspeed: 17,
                  winddir: 14,
                  visibility: 10,
                  uvindex: 3,
                },
              ],
            },
          ],
          tzoffset: 0,
        });

      req = mockRequest({
        params: { location: 'cairo' },
        socket: { remoteAddress: '127.0.0.1' },
      });
      res = mockResponse();
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should call getCachedData with the correct location', async function () {
      mockedGetCachedData.resolves(null);

      await AppControllerWithMock.getDailyData(req, res);

      expect(mockedGetCachedData.calledOnceWith('cairo')).to.be.true;
    });

    it('should not call _fetchData if cached data is found', async function () {
      mockedGetCachedData.resolves({ temp: 25 });

      await AppControllerWithMock.getDailyData(req, res);

      expect(mockedFetchData.calledOnce).to.be.false;
    });

    it('should call _fetchData if cached data is not found', async function () {
      mockedGetCachedData.resolves(null);
      mockedFetchData.resolves({ temp: 25 });

      await AppControllerWithMock.getDailyData(req, res);

      expect(mockedFetchData.calledOnce).to.be.true;
    });

    it('should respond with an error if location is missing', async function () {
      req = mockRequest({
        params: {},
        socket: { remoteAddress: '127.0.0.1' },
      });

      await AppControllerWithMock.getDailyData(req, res);

      expect(res.status.calledOnceWith(400)).to.be.true;
      expect(
        res.json.calledOnceWith({ error: 'Location parameter is required' })
      ).to.be.true;
    });

    it('should respond with an error if an exception is thrown', async function () {
      mockedGetCachedData.rejects(new Error('Something went wrong!'));

      await AppControllerWithMock.getDailyData(req, res);

      expect(res.json.calledOnceWith({ error: 'Something went wrong!' })).to.be
        .true;
    });

    it('should respond with the correct data', async function () {
      mockedGetCachedData.resolves(null);
      await AppControllerWithMock.getDailyData(req, res);

      const expectedData = [
        {
          datetime: '2024-09-17',
          icon: 'clear-day',
          tempmax: 22,
          tempmin: 16,
          conditions: 'Clear',
        },
        {
          datetime: '2024-09-17',
          icon: 'clear-day',
          tempmax: 22,
          tempmin: 16,
          conditions: 'Clear',
        },
        {
          datetime: '2024-09-17',
          icon: 'clear-day',
          tempmax: 22,
          tempmin: 16,
          conditions: 'Clear',
        },
        {
          datetime: '2024-09-17',
          icon: 'clear-day',
          tempmax: 22,
          tempmin: 16,
          conditions: 'Clear',
        },
        {
          datetime: '2024-09-17',
          icon: 'clear-day',
          tempmax: 22,
          tempmin: 16,
          conditions: 'Clear',
        },
        {
          datetime: '2024-09-17',
          icon: 'clear-day',
          tempmax: 22,
          tempmin: 16,
          conditions: 'Clear',
        },
        {
          datetime: '2024-09-17',
          icon: 'clear-day',
          tempmax: 22,
          tempmin: 16,
          conditions: 'Clear',
        },
        {
          datetime: '2024-09-17',
          icon: 'clear-day',
          tempmax: 22,
          tempmin: 16,
          conditions: 'Clear',
        },
        {
          datetime: '2024-09-17',
          icon: 'clear-day',
          tempmax: 22,
          tempmin: 16,
          conditions: 'Clear',
        },
        {
          datetime: '2024-09-17',
          icon: 'clear-day',
          tempmax: 22,
          tempmin: 16,
          conditions: 'Clear',
        },
      ];

      expect(res.status.calledOnceWith(200)).to.be.true;
      expect(res.json.calledOnceWith(expectedData)).to.be.true;
    });
  });

  describe('_getCachedData', function () {
    let AppControllerWithMock, mockedFormat;

    beforeEach(async () => {
      mockedFormat = sinon.stub().returns('2024-09-17');

      AppControllerWithMock = await esmock(
        '../../../controllers/AppController.js',
        {
          'date-fns': {
            format: mockedFormat,
          },
        }
      );

      redisMock = sinon.stub(redisClient.redisClient);
    });

    afterEach(() => {
      sinon.restore();
    });

    after(() => {
      redisClient.redisClient.disconnect();
    });

    it('should call format', async function () {
      redisMock.get.resolves(JSON.stringify({ key: 'value' }));
      await AppControllerWithMock._getCachedData('cairo');

      expect(mockedFormat.calledOnce).to.be.true;
    });

    it('should call get method of redisClient', async function () {
      redisMock.get.resolves(JSON.stringify({ key: 'value' }));

      await AppControllerWithMock._getCachedData('cairo');

      expect(redisMock.get.calledOnce).to.be.true;
    });

    it('should return correct parsed json', async function () {
      redisMock.get.resolves(JSON.stringify({ key: 'value' }));

      const data = await AppControllerWithMock._getCachedData('cairo');

      expect(data).to.deep.equal({ key: 'value' });
    });
  });

  describe('_fetchData', function () {
    let AppControllerWithMock,
      mockedCheckRateLimit,
      mockedFetch,
      mockedCheckResponseStatus,
      mockedRateLimit;

    beforeEach(async () => {
      mockedFetch = sinon.stub().returns(new Promise((resolve) => resolve()));

      AppControllerWithMock = await esmock(
        '../../../controllers/AppController.js',
        {}
      );

      mockedCheckRateLimit = sinon
        .stub(AppControllerWithMock, '_checkRateLimit')
        .resolves(false);

      mockedCheckResponseStatus = sinon
        .stub(AppControllerWithMock, '_checkResponseStatus')
        .resolves();

      mockedRateLimit = sinon
        .stub(AppControllerWithMock, '_rateLimit')
        .resolves();

      redisMock = sinon.stub(redisClient.redisClient);
    });

    afterEach(() => {
      sinon.restore();
    });

    after(() => {
      redisClient.redisClient.disconnect();
    });

    it('should call _checkRateLimit', async function () {
      await AppControllerWithMock._fetchData('::1', 'cairo', 100);

      expect(mockedCheckRateLimit.calledOnce).to.be.true;
    });

    it('should throw an error when _checkRateLimit returns true', async function () {
      let errorMessage;

      mockedCheckRateLimit.resolves(true);

      try {
        await AppControllerWithMock._fetchData('::1', 'cairo', 100);
      } catch (error) {
        errorMessage = error.message;
      }

      expect(errorMessage).to.equal('Too many requests! Try again tomorrow.');
    });

    it('should call _checkResponseStatus', async function () {
      await AppControllerWithMock._fetchData('::1', 'cairo', 100);

      expect(mockedCheckResponseStatus.calledOnce).to.be.true;
    });

    it('should call _rateLimit', async function () {
      await AppControllerWithMock._fetchData('::1', 'cairo', 100);

      expect(mockedRateLimit.calledOnce).to.be.true;
    });

    it('should call set method on redisClient', async function () {
      redisMock.setEx.resolves();

      await AppControllerWithMock._fetchData('::1', 'cairo', 100);

      expect(redisMock.setEx.calledOnce).to.be.true;
    });

    it('should return the retrieved data', async function () {
      mockedFetch = sinon.stub(global, 'fetch');

      const weatherData = {
        days: [{ key: 'value' }],
      };

      const mockResponse = {
        ok: true,
        status: 200,
        json: sinon.stub().resolves(weatherData),
      };

      mockedFetch.resolves(mockResponse);

      const data = await AppControllerWithMock._fetchData('::1', 'cairo', 100);

      expect(data).to.deep.equal(weatherData);
    });
  });

  describe('_checkResponseStatus', function () {
    let AppControllerWithMock;

    beforeEach(async () => {
      AppControllerWithMock = await esmock(
        '../../../controllers/AppController.js',
        {}
      );
    });

    it('should throw an error if the response status is not 200', function () {
      let response = {
        status: 400,
      };
      let errorMessage;

      try {
        AppControllerWithMock._checkResponseStatus(response, 'ca');
      } catch (error) {
        errorMessage = error.message;
      }

      expect(errorMessage).to.equal(
        'The location "ca" could not be found. Please check the spelling and try again.'
      );

      response.status = '500';

      try {
        AppControllerWithMock._checkResponseStatus(response, 'ca');
      } catch (error) {
        errorMessage = error.message;
      }

      expect(errorMessage).to.equal('Something went wrong!');
    });
  });

  describe('_checkRateLimit', function () {
    let AppControllerWithMock;

    beforeEach(async () => {
      AppControllerWithMock = await esmock(
        '../../../controllers/AppController.js',
        {}
      );

      redisMock = sinon.stub(redisClient.redisClient);
    });

    afterEach(() => {
      sinon.restore();
    });

    after(() => {
      redisClient.redisClient.disconnect();
    });

    it('should return true if the retrieved value is greater than or equal to 30', async function () {
      redisMock.get.resolves(30);

      expect(await AppControllerWithMock._checkRateLimit('::1')).to.be.true;
    });

    it('should return false if the retrieved value is less than 30', async function () {
      redisMock.get.resolves(29);

      expect(await AppControllerWithMock._checkRateLimit('::1')).to.be.false;
    });
  });

  describe('_rateLimit', function () {
    let AppControllerWithMock,
      mockedGetRemainingHoursToday,
      mockedHoursToSeconds;

    mockedGetRemainingHoursToday = sinon.stub().returns(1);
    mockedHoursToSeconds = sinon.stub().returns(3600);

    beforeEach(async () => {
      AppControllerWithMock = await esmock(
        '../../../controllers/AppController.js',
        {
          '../../../src/utils.js': {
            getRemainingHoursToday: mockedGetRemainingHoursToday,
          },
          'date-fns': {
            hoursToSeconds: mockedHoursToSeconds,
          },
        }
      );

      redisMock = sinon.stub(redisClient.redisClient);
    });

    afterEach(() => {
      sinon.restore();
    });

    after(() => {
      redisClient.redisClient.disconnect();
    });

    it('should call the set method on the redisClient if the retrieved value is falsy', async function () {
      const ipAddress = '::1';

      redisMock.get.resolves(undefined);
      redisMock.setEx.resolves();

      await AppControllerWithMock._rateLimit(ipAddress);

      expect(redisMock.setEx.calledOnceWith(ipAddress, 3600, '1')).to.be.true;
    });

    it('should call the incr method on the redisClient if the retrieved value is truthy', async function () {
      const ipAddress = '::1';

      redisMock.get.resolves(ipAddress);
      redisMock.incr.resolves();

      await AppControllerWithMock._rateLimit(ipAddress);

      expect(redisMock.incr.calledOnceWith(ipAddress)).to.be.true;
    });
  });
});
