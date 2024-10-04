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

  /**
   * Throw an error if the status code of the response
   * is not in the 200 range.
   * @param {Promise} response - The response of fetching data from the API
   * @param {string} location - The name of a city
   */
  static _checkResponseStatus(response, location) {
    if (!response.ok) {
      if (response.status === 400) {
        throw new Error(
          `The location "${location}" could not be found. Please check the spelling and try again.`
        );
      } else {
        throw new Error('Something went wrong!');
      }
    }
  }

  /**
   * Check if the user has made 20 requests today,
   * and throw an error if so.
   * @param {string} ipAddress - The user's IP adderss
   */
  static async _checkRateLimit(ipAddress) {
    const requestsToday = await redisClient.get(ipAddress);

    if (parseInt(requestsToday, 10) >= 30) {
      return true;
    }

    return false;
  }
}
