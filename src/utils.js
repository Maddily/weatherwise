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
