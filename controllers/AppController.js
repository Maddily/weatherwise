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
  static _APIKEY = process.env.API_KEY;

  // Fetch weather data and return the current weather details
  static async getNowData(req, res) {
    const { location } = req.params;
    if (location) {
      try {
        // Retrieve the data if cached, otherwise fetch it from the API
        const cachedData = await AppController._getCachedData(location);

        const weatherData =
          cachedData ||
          (await AppController._fetchData(
            req.socket.remoteAddress,
            location,
            minutesToSeconds(10)
          ));

        // Extract the specific properties needed from the retrieved data
        const { datetime, tempmax, tempmin } = weatherData.days[0];
        const { tzoffset } = weatherData;

        const currentHour = getCurrentHour(tzoffset);
        // Get the current hour's details
        const {
          temp,
          feelslike,
          conditions,
          icon,
          humidity,
          dew,
          pressure,
          windspeed,
          winddir,
          visibility,
          uvindex,
        } = weatherData.days[0].hours[currentHour];

        // Choose an appropriate message according to the visibility value
        const visibilityText = getVisibilityText(visibility);

        // The retrieved data plus the visibilityText
        const data = {
          datetime,
          temp,
          feelslike,
          tempmax,
          tempmin,
          conditions,
          icon,
          humidity,
          dew,
          pressure,
          windspeed,
          winddir,
          visibility,
          visibilityText,
          uvindex,
        };

        res.status(200).json(data);
      } catch (error) {
        if (error.message.startsWith('The location')) {
          res.status(400).json({ error: error.message });
        } else if (error.message.startsWith('Too many')) {
          res.status(429).json({ error: error.message });
        } else {
          res.status(500).json({ error: 'Something went wrong!' });
        }
      }
    } else {
      res.status(400).json({ error: 'Location parameter is required' });
    }
  }

  // Fetch weather data and return hourly weather details
  static async getHourlyData(req, res) {
    const { location } = req.params;
    if (location) {
      try {
        // Retrieve the data if cached, otherwise fetch it from the API
        const cachedData = await AppController._getCachedData(location);
        const weatherData =
          cachedData ||
          (await AppController._fetchData(
            req.socket.remoteAddress,
            location,
            minutesToSeconds(10)
          ));
        const { tzoffset } = weatherData;
        const nextHour = getCurrentHour(tzoffset) + 1;

        // Extract specific data from each hour object
        let hours = weatherData.days[0].hours.slice(nextHour).map((hour) => {
          return {
            datetime: hour.datetime,
            icon: hour.icon,
            temp: hour.temp,
          };
        });

        // Display the data of the next 8 hours only
        if (hours.length > 8) {
          hours = hours.slice(0, 8);
        }

        /**
         * If the hours remaining in the current day are less than 8,
         * Add hourly data of the following day to have a total of 8.
         */
        if (hours.length < 8) {
          const hoursRemainingToday = hours.length;
          const numberOfExtraHours = 8 - hoursRemainingToday;

          const extraHours = weatherData.days[1].hours
            .slice(0, numberOfExtraHours)
            .map((hour) => {
              return {
                datetime: hour.datetime,
                icon: hour.icon,
                temp: hour.temp,
              };
            });

          const totalHours = [...hours, ...extraHours];

          res.status(200).json(totalHours);
          return;
        }

        // Send only the remaining hours (when exactly 8 hours are remaining in the day)
        res.status(200).json(hours);
      } catch (error) {
        if (error.message.startsWith('The location')) {
          res.status(400).json({ error: error.message });
        } else if (error.message.startsWith('Too many')) {
          res.status(429).json({ error: error.message });
        } else {
          res.status(500).json({ error: 'Something went wrong!' });
        }
      }
    } else {
      res.status(400).json({ error: 'Location parameter is required' });
    }
  }

  // Fetch and return weather data for the next 10 days
  static async getDailyData(req, res) {
    const { location } = req.params;
    if (location) {
      try {
        // Retrieve the data if cached, otherwise fetch it from the API
        const cachedData = await AppController._getCachedData(location);
        const weatherData =
          cachedData ||
          (await AppController._fetchData(
            req.socket.remoteAddress,
            location,
            minutesToSeconds(10)
          ));

        // Extract specific data in every day object for the next 10 days
        const days = [...weatherData.days].slice(1, 11).map((day) => {
          return {
            datetime: day.datetime,
            icon: day.icon,
            tempmax: day.tempmax,
            tempmin: day.tempmin,
            conditions: day.conditions,
          };
        });

        res.status(200).json(days);
      } catch (error) {
        if (error.message.startsWith('The location')) {
          res.status(400).json({ error: error.message });
        } else if (error.message.startsWith('Too many')) {
          res.status(429).json({ error: error.message });
        } else {
          res.status(500).json({ error: 'Something went wrong!' });
        }
      }
    } else {
      res.status(400).json({ error: 'Location parameter is required' });
    }
  }

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
