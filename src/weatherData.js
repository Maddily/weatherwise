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

/**
 * Display the location (city name) in the DOM.
 * @param {string} location - The name of a city
 */
function displayLocation(location) {
  if (location) {
    const locationContainer = document.createElement('div');
    locationContainer.className = 'location-container';

    const locationIcon = createLocationIcon();

    const locationText = document.createElement('h1');
    locationText.className = 'location';
    locationText.textContent = location;

    locationContainer.append(locationIcon, locationText);

    const weatherDataContainer = document.querySelector(
      '.weather-data-container'
    );
    weatherDataContainer.appendChild(locationContainer);
  }
}

/**
 * Display the current weather data in the DOM.
 * @param {object} nowData - The current weather data
 */
function displayNowData(nowData) {
  if (!nowData) {
    throw Error('Invalid data:', nowData);
  }

  const {
    feelslike,
    temp,
    tempmin,
    tempmax,
    conditions,
    winddir,
    windspeed,
    humidity,
    icon,
  } = nowData;

  // Create the 'now' section
  const nowSection = document.createElement('section');
  nowSection.className = 'now';

  // Display the real feel temperature
  const realFeelDiv = document.createElement('div');
  realFeelDiv.className = 'real-feel';

  const realFeelText = document.createElement('p');
  realFeelText.className = 'real-feel-text';

  const realFeelNumber = document.createElement('p');
  realFeelNumber.className = 'real-feel-number f-c';

  realFeelText.textContent = 'Feels like';
  realFeelNumber.textContent = `${Math.round(feelslike)}\u00B0`;

  realFeelDiv.append(realFeelText, realFeelNumber);

  // Display the current temperature
  const tempNow = document.createElement('div');
  tempNow.className = 'temp f-c';
  tempNow.textContent = `${Math.round(temp)}\u00B0C`;

  // Display a temp F/C toggle button
  const label = document.createElement('label');
  label.setAttribute('for', 'checkbox');
  label.className = 'toggler';

  const checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.setAttribute('id', 'checkbox');
  checkbox.checked = true;

  const ball = document.createElement('span');
  ball.className = 'ball';

  const c = document.createElement('span');
  c.textContent = '\u00B0C';
  c.className = 'c';

  const f = document.createElement('span');
  f.textContent = '\u00B0F';
  f.className = 'f';

  label.append(checkbox, ball, c, f);

  // Create a container for the temp + switch button
  const tempSwitchContainer = document.createElement('div');
  tempSwitchContainer.className = 'temp-switch-container';

  tempSwitchContainer.append(tempNow, label);

  // Create min-max-conditions div
  const minMaxConditionsDiv = document.createElement('div');
  minMaxConditionsDiv.className = 'min-max-conditions';

  // Display the min temperature
  const lowArrow = createLowArrowIcon();

  const tempMin = document.createElement('div');
  tempMin.className = 'min';

  const minText = document.createElement('p');
  minText.className = 'f-c';
  minText.textContent = `${Math.round(tempmin)}\u00B0`;
  tempMin.append(lowArrow, minText);

  // Display the max temperature
  const highArrow = createHighArrowIcon();

  const tempMax = document.createElement('div');
  tempMax.className = 'max';

  const maxText = document.createElement('p');
  maxText.className = 'f-c';
  maxText.textContent = `${Math.round(tempmax)}\u00B0`;
  tempMax.append(maxText, highArrow);

  // Display the current weather conditions
  const conditionsNow = document.createElement('p');
  conditionsNow.className = 'conditions';
  conditionsNow.textContent = conditions;

  minMaxConditionsDiv.append(tempMin, conditionsNow, tempMax);

  // Create the wind-humidity div
  const windHumidity = document.createElement('div');
  windHumidity.className = 'wind-humidity';

  // Display the wind direction
  const windDir = document.createElement('div');
  windDir.className = 'wind-dir';

  const windArrow = createWindArrowIcon();
  const windDirText = document.createElement('p');
  windDirText.textContent = getWindDirectionText(winddir);
  windDir.append(windArrow, windDirText);

  // Display the wind speed
  const windSpeed = document.createElement('div');
  windSpeed.className = 'wind-speed';

  const windmill = createWindmillIcon();
  const windSpeedText = document.createElement('p');
  windSpeedText.textContent = `${windspeed}km/h`;
  windSpeed.append(windmill, windSpeedText);

  // Display the humidity
  const humidityNow = document.createElement('div');
  humidityNow.className = 'humidity';

  const humidityIcon = createHumidityIcon();
  const humidityText = document.createElement('p');
  humidityText.textContent = `${Math.round(humidity)}%`;
  humidityNow.append(humidityIcon, humidityText);

  windHumidity.append(windDir, windSpeed, humidityNow);

  // Display the weather icon
  let weatherIcon;
  const iconPath = getIconPath(icon);
  if (iconPath) {
    weatherIcon = document.createElement('div');
    weatherIcon.className = 'icon';
    weatherIcon.style.backgroundImage = `url(${iconPath})`;
  }

  nowSection.append(
    realFeelDiv,
    tempSwitchContainer,
    minMaxConditionsDiv,
    windHumidity,
    weatherIcon
  );

  const weatherDataContainer = document.querySelector(
    '.weather-data-container'
  );
  weatherDataContainer.appendChild(nowSection);
}

/**
 * Display hourly weather data in the DOM.
 * @param {object} hourlyData - Weather data for the hours remaining in the day
 */
function displayHourlyData(hourlyData) {
  if (!hourlyData || !Array.isArray(hourlyData)) {
    throw Error('Invalid data');
  }

  // Create a section for hourlyData
  const hourlyDataSection = document.createElement('section');
  hourlyDataSection.className = 'hourly';

  // Create a heading for the hourly data
  const heading = document.createElement('h2');
  heading.className = 'hourly-heading';
  heading.textContent = 'Hourly Forecast';

  // Create an svg icon for the heading
  const hourlyIcon = createHourlyIcon();

  // Create a container for the heading
  const headingContainer = document.createElement('div');
  headingContainer.className = 'heading-container';

  headingContainer.append(hourlyIcon, heading);

  // Create a container for the hourly data
  const hourlyDataContainer = document.createElement('div');
  hourlyDataContainer.className = 'hourly-data-container';

  hourlyData.forEach((hourData) => {
    const { datetime, icon, temp } = hourData;

    // A container for an hour's weather details
    const hourContainer = document.createElement('div');
    hourContainer.className = 'hour-container';

    // The hour
    const hour = document.createElement('p');
    hour.className = 'hour';
    hour.textContent = formatTime(datetime);

    // The icon
    let weatherIcon;
    const iconPath = getIconPath(icon);
    if (iconPath) {
      weatherIcon = document.createElement('div');
      weatherIcon.className = 'icon';
      weatherIcon.style.backgroundImage = `url(${iconPath})`;
    }

    // The temperature
    const temperature = document.createElement('p');
    temperature.className = 'hour-temp f-c';
    temperature.textContent = `${Math.round(temp)}\u00B0`;

    hourContainer.append(hour, weatherIcon, temperature);

    hourlyDataContainer.appendChild(hourContainer);
  });

  hourlyDataSection.append(headingContainer, hourlyDataContainer);

  const weatherDataContainer = document.querySelector(
    '.weather-data-container'
  );
  weatherDataContainer.appendChild(hourlyDataSection);
}

/**
 * Display daily weather data in the DOM.
 * @param {object} dailyData - Weather data for the next 10 days
 */
function displayDailyData(dailyData) {
  if (!dailyData) {
    throw Error('Invalid data:', dailyData);
  }

  // Create a section for daily data
  const dailyDataSection = document.createElement('section');
  dailyDataSection.className = 'daily';

  // Create a heading for the daily data
  const heading = document.createElement('h2');
  heading.className = 'daily-heading';
  heading.textContent = 'Daily Forecast';

  // Create an svg icon for the heading
  const calendarIcon = createCalendarIcon();

  // Create a container for the heading
  const headingContainer = document.createElement('div');
  headingContainer.className = 'heading-container';

  headingContainer.append(calendarIcon, heading);

  // Create a container for the daily data
  const dailyDataContainer = document.createElement('div');
  dailyDataContainer.className = 'daily-data-container';

  dailyData.forEach((dayData) => {
    const { datetime, icon, conditions, tempmax, tempmin } = dayData;

    // A container for a day's weather details
    const dayContainer = document.createElement('div');
    dayContainer.className = 'day-container';

    // Format the date
    const { formattedDate, dayOfWeek } = formatDate(datetime);

    // The day
    const dateContainer = document.createElement('div');
    const dayNumber = document.createElement('p');
    dayNumber.className = 'day-number';
    dayNumber.textContent = formattedDate;

    const dayName = document.createElement('p');
    dayName.className = 'day-name';
    dayName.textContent = dayOfWeek;

    dateContainer.append(dayNumber, dayName);

    // The icon
    let weatherIcon;
    const iconPath = getIconPath(icon);
    if (iconPath) {
      weatherIcon = document.createElement('div');
      weatherIcon.className = 'icon';
      weatherIcon.style.backgroundImage = `url(${iconPath})`;
    }

    // The weather conditions
    const weatherConditions = document.createElement('p');
    weatherConditions.className = 'day-weather-condition';
    weatherConditions.textContent = conditions;

    // The max/min temperatures
    const maxMinTemps = document.createElement('p');
    maxMinTemps.className = 'max-min-temps f-c';
    maxMinTemps.textContent = `${Math.round(tempmax)}\u00B0/${Math.round(
      tempmin
    )}\u00B0`;

    dayContainer.append(
      dateContainer,
      weatherIcon,
      weatherConditions,
      maxMinTemps
    );

    dailyDataContainer.appendChild(dayContainer);
  });

  dailyDataSection.append(headingContainer, dailyDataContainer);

  const weatherDataContainer = document.querySelector(
    '.weather-data-container'
  );
  weatherDataContainer.appendChild(dailyDataSection);
}

/**
 * Display data for pressure, UV Index, visibility and humidity
 * @param {object} nowData - The current weather data
 */
function displayOtherData(nowData) {
  const { pressure, uvindex, visibility, visibilityText, humidity, dew } =
    nowData;

  // Create a section for all data
  const dataSection = document.createElement('section');
  dataSection.className = 'pressure-uv-visibility-humidity';

  // Create pressure container
  const pressureContainer = createPressureContainer(pressure);

  // Create UV index container
  const uvIndexContainer = createUvIndexContainer(uvindex);

  // Create visibility container
  const visibilityContainer = createVisibilityContainer(
    visibility,
    visibilityText
  );

  // Create humidity container
  const humidityContainer = createHumidityContainer(humidity, dew);

  dataSection.append(
    pressureContainer,
    uvIndexContainer,
    visibilityContainer,
    humidityContainer
  );

  const weatherDataContainer = document.querySelector(
    '.weather-data-container'
  );
  weatherDataContainer.appendChild(dataSection);
}

/**
 * Display the air pressure value
 * @param {number} pressure - The air pressure
 */
function createPressureContainer(pressure) {
  // Create a container for the pressure data
  const pressureContainer = document.createElement('div');
  pressureContainer.className = 'pressure-container other-data-container';

  // Create a heading
  const heading = document.createElement('h3');
  heading.className = 'pressure-heading';
  heading.textContent = 'Pressure';

  // Create a pressure icon
  const pressureIcon = createAirPressureIcon();

  // Create a container for the heading
  const headingContainer = document.createElement('div');
  headingContainer.className = 'heading-container';

  headingContainer.append(pressureIcon, heading);

  // Create pressure gauge icon
  const gaugeIcon = createGaugeIcon();

  const pressureValue = document.createElement('p');
  pressureValue.className = 'pressure-value';
  pressureValue.textContent = `${pressure} mbar`;

  pressureContainer.append(headingContainer, gaugeIcon, pressureValue);

  return pressureContainer;
}

/**
 * Display the UV index value
 * @param {number} uvindex - The UV index
 */
function createUvIndexContainer(uvindex) {
  // Create a container for the uv index data
  const uvIndexContainer = document.createElement('div');
  uvIndexContainer.className = 'uv-index-container other-data-container';

  // Create a heading
  const heading = document.createElement('h3');
  heading.className = 'uv-index-heading';
  heading.textContent = 'UV Index';

  // Create UV index icon
  const uvIndexIcon = createUvIndexIcon();

  // Create a container for the heading
  const headingContainer = document.createElement('div');
  headingContainer.className = 'heading-container';

  headingContainer.append(uvIndexIcon, heading);

  // The UV index value
  const uvIndexValue = document.createElement('p');
  uvIndexValue.textContent = uvindex;

  // The UV index text value
  const { value, phrase } = getUvIndexText(uvindex);
  const uvIndexTextValue = document.createElement('p');
  uvIndexTextValue.textContent = value;

  const uvIndexPhrase = document.createElement('p');
  uvIndexPhrase.textContent = phrase;

  uvIndexContainer.append(
    headingContainer,
    uvIndexValue,
    uvIndexTextValue,
    uvIndexPhrase
  );

  return uvIndexContainer;
}
