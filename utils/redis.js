import { createClient } from 'redis';

export class RedisClient {
  // Create a redis client and start a connection
  constructor() {
    this.redisClient = createClient();

    this.redisClient.on('error', (error) => {
      console.error(`Error: ${error}`);
    });

    (async () => await this.redisClient.connect())();
  }

  // Retrieve cached data
  async get(key) {
    try {
      const value = await this.redisClient.get(key);
      return value;
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  }

  // Cache data with expiry
  set(key, value, lifetime) {
    this.redisClient.setEx(key, lifetime, value);
  }

  // Increment the value of an existing key
  incr(key) {
    this.redisClient.incr(key);
  }

  // Delete all keys
  flushAll() {
    this.redisClient.flushAll();
  }

  // Disconnect
  quit() {
    this.redisClient.quit();
  }
}

const redisClient = new RedisClient();
export default redisClient;
