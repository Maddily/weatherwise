import redisClient from '../utils/redis.js';
import { format, minutesToSeconds, hoursToSeconds } from 'date-fns';
import dotenv from 'dotenv';
import {
  getCurrentHour,
  getVisibilityText,
  getRemainingHoursToday,
} from '../src/utils.js';

dotenv.config();

export default class AppController {
  /**
   *
   * @param {string} location - The name of a city
   * @returns Cached data
   */
  static async _getCachedData(location) {
    const today = format(new Date(), 'yyyy-MM-dd');
    const cachedData = await redisClient.get(`${location}-${today}`);

    return JSON.parse(cachedData);
  }
}
