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
   * Fetch weather data from the Visual Crossing's API
   * @param {string} location - The name of a city
   * @param {number} lifetime - The lifetime of the data in the cache, in milliseconds
   * @returns The fetched weather data
   */
  static async _fetchData(ipAddress, location, lifetime) {
    // Check if the user has made 20 requests today and throw an error if so.
    if (await AppController._checkRateLimit(ipAddress)) {
      throw new Error('Too many requests! Try again tomorrow.');
    }

    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${AppController._APIKEY}`;

    const response = await fetch(url);

    // In case the status code isn't in the 200 range, throw an error
    AppController._checkResponseStatus(response, location);

    // Update the cache value for rate limiting
    AppController._rateLimit(ipAddress);

    const weatherData = await response.json();

    /**
     * Cache the fetched data.
     * Today's date is used as a part of the key string.
     */
    const today = weatherData.days[0].datetime;

    redisClient.set(
      `${location}-${today}`,
      JSON.stringify(weatherData),
      lifetime
    );

    return weatherData;
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

  /**
   * Update the cache value for rate limiting
   * @param {string} ipAddress - The user's IP adderss
   */
  static async _rateLimit(ipAddress) {
    const requestsToday = await redisClient.get(ipAddress);

    if (!requestsToday) {
      const remainingHoursInDay = getRemainingHoursToday();
      redisClient.set(ipAddress, '1', hoursToSeconds(remainingHoursInDay));
    } else {
      redisClient.incr(ipAddress);
    }
  }
}
