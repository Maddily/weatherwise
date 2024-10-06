import {
  createHighArrowIcon,
  createHumidityIcon,
  createLowArrowIcon,
  createWindArrowIcon,
  createWindmillIcon,
  createLocationIcon,
  createHourlyIcon,
  createCalendarIcon,
  createAirPressureIcon,
  createGaugeIcon,
  createUvIndexIcon,
  createVisibilityIcon,
} from './icons.js';
import {
  getWindDirectionText,
  formatTime,
  formatDate,
  getUvIndexText,
  convertCToF,
  convertFToC,
} from './utils.js';
import getIconPath from './weatherIcons.js';
import fetchData from './fetchData.js';
import displayError from './errors.js';
import { addLoader, toggleLoader } from './loader.js';

/**
 * Fetch weather data based on the given location,
 * and call functions that display the fetched data.
 * @param {string} location - The name of a city
 */
export default async function handleInput(location) {
  toggleLoader();

  try {
    const nowData = await fetchData('today', location);
    const hourlyData = await fetchData('hourly', location);
    const dailyData = await fetchData('daily', location);

    // Clear the weather data container before adding new data
    const weatherDataContainer = document.querySelector(
      '.weather-data-container'
    );
    weatherDataContainer.textContent = '';
    weatherDataContainer.style.display = 'grid';

    addLoader();

    displayLocation(location);
    displayNowData(nowData);
    displayHourlyData(hourlyData);
    displayDailyData(dailyData);
    // Humidity, UV index, pressure and visibility
    displayOtherData(nowData);

    convertTemperatureHelper();
  } catch (error) {
    if (error.message.startsWith('Failed')) {
      displayError('Something went wrong!');
    } else {
      displayError(error.message);
    }
  }
}
