import { parse, format } from 'date-fns';

/**
 * Determine the wind direction based on the given degrees.
 * @param {number} degrees - Wind direction degrees
 * @returns The wind direction
 */
export function getWindDirectionText(degrees) {
  const directions = [
    'N',
    'NNE',
    'NE',
    'ENE',
    'E',
    'ESE',
    'SE',
    'SSE',
    'S',
    'SSW',
    'SW',
    'WSW',
    'W',
    'WNW',
    'NW',
    'NNW',
  ];

  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
}

/**
 * Format a given time string
 * @param {string} timeString - EX: 12:00:00
 * @returns The time string formatted. EX: 12 AM
 */
export function formatTime(timeString) {
  const date = parse(timeString, 'HH:mm:ss', new Date());

  return format(date, 'h a');
}

/**
 * Format the date for the daily forecast section
 * @param {string} dateString - A date string
 * @returns The formatted date and the day of the week
 */
export function formatDate(dateString) {
  const date = parse(dateString, 'yyyy-MM-dd', new Date());
  const formattedDate = format(date, 'd/M');
  const dayOfWeek = format(date, 'EEE');

  return { formattedDate, dayOfWeek };
}

/**
 * Calculate the current hour
 * @param {number} tzoffset - The time zone offset
 * @returns The local current hour
 */
export function getCurrentHour(tzoffset) {
  const currentUTC = new Date();

  const currentLocalTime = new Date(
    currentUTC.getUTCFullYear(),
    currentUTC.getUTCMonth(),
    currentUTC.getUTCDate(),
    currentUTC.getUTCHours(),
    currentUTC.getUTCMinutes(),
    currentUTC.getUTCSeconds()
  );

  currentLocalTime.setHours(currentLocalTime.getHours() + tzoffset);

  return currentLocalTime.getHours();
}

/**
 * Return the appropriate text representation for a given UV index
 * @param {number} uvIndex - The UV index
 * @returns The UV index text representation
 */
export function getUvIndexText(uvIndex) {
  let value, phrase;

  if (uvIndex >= 0 && uvIndex <= 2) {
    value = 'Low';
    phrase = 'No protection needed. You can safely stay outside.';
  } else if (uvIndex >= 3 && uvIndex <= 5) {
    value = 'Moderate';
    phrase =
      'Take precautions if you will be outside, such as wearing sunscreen.';
  } else if (uvIndex >= 6 && uvIndex <= 7) {
    value = 'High';
    phrase = 'Protection against sunburn is needed. Wear sunscreen and a hat.';
  } else if (uvIndex >= 8 && uvIndex <= 10) {
    value = 'Very High';
    phrase =
      'Extra protection is needed. Avoid being outside during midday hours.';
  } else if (uvIndex >= 11) {
    value = 'Extreme';
    phrase = 'Take all precautions. Avoid going outside if possible.';
  } else {
    value = 'Invalid UV Index';
    phrase = 'The UV index value is invalid.';
  }

  return { value, phrase };
}
