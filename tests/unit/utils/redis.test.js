import { expect } from 'chai';
import sinon from 'sinon';
import redisClient from '../../../utils/redis.js';

describe('RedisClient', function () {
  let redisMock;

  beforeEach(() => {
    redisMock = sinon.stub(redisClient.redisClient);
  });

  afterEach(() => sinon.restore());

  after(() => {
    redisClient.redisClient.disconnect();
  });

  describe('get', function () {
    it('should call get method with the correct key', async function () {
      redisMock.get.resolves('mockedValue');

      const value = await redisClient.get('key');
      expect(redisMock.get.calledOnceWith('key')).to.be.true;
      expect(value).to.equal('mockedValue');
    });
    it('should handle errors properly', async function () {
      const consoleErrorStub = sinon.stub(console, 'error');
      redisMock.get.rejects(new Error('error message'));

      await redisClient.get('key');
      expect(consoleErrorStub.calledOnceWith('Error: error message')).to.be
        .true;

      consoleErrorStub.restore();
    });
  });

  describe('set', function () {
    it('should call setEx with the correct arguments', function () {
      redisMock.setEx.resolves();

      redisClient.set('key', 'value', 10);
      expect(redisMock.setEx.calledOnceWith('key', 10, 'value')).to.be.true;
    });
  });

  describe('incr', function () {
    it('should call incr with the correct key', function () {
      redisMock.incr.resolves();

      redisClient.incr('key');
      expect(redisMock.incr.calledOnceWith('key')).to.be.true;
    });
  });
});
