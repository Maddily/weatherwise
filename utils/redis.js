import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

export class RedisClient {
  static _PASSWORD = process.env.REDIS_PASSWORD;
  static _HOST = process.env.REDIS_HOST;
  static _PORT = process.env.REDIS_PORT;

  // Create a redis client and start a connection
  constructor() {
    this.redisClient = createClient({
      password: RedisClient._PASSWORD,
      socket: {
        host: RedisClient._HOST,
        port: RedisClient._PORT,
      },
    });

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
