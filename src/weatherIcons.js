import clearDay from './assets/images/clear-day.svg';
import clearNight from './assets/images/clear-night.svg';
import cloudy from './assets/images/cloudy.svg';
import fog from './assets/images/fog.svg';
import hail from './assets/images/hail.svg';
import partlyCloudyDay from './assets/images/partly-cloudy-day.svg';
import partlyCloudyNight from './assets/images/partly-cloudy-night.svg';
import rainSnowShowersDay from './assets/images/rain-snow-showers-day.svg';
import rainSnowShowersNight from './assets/images/rain-snow-showers-night.svg';
import rainSnow from './assets/images/rain-snow.svg';
import rain from './assets/images/rain.svg';
import showersDay from './assets/images/showers-day.svg';
import showersNight from './assets/images/showers-night.svg';
import sleet from './assets/images/sleet.svg';
import snowShowersDay from './assets/images/snow-showers-day.svg';
import snowShowersNight from './assets/images/snow-showers-night.svg';
import snow from './assets/images/snow.svg';
import thunderRain from './assets/images/thunder-rain.svg';
import thunderShowersDay from './assets/images/thunder-showers-day.svg';
import thunderShowersNight from './assets/images/thunder-showers-night.svg';
import thunder from './assets/images/thunder.svg';
import wind from './assets/images/wind.svg';

/**
 * Find the path of an icon.
 * @param {string} iconName - The name of an icon
 * @returns The path of the icon, or false if not found.
 */
export default function getIconPath(iconName) {
  const iconMap = {
    'clear-day': clearDay,
    'clear-night': clearNight,
    cloudy,
    fog,
    hail,
    'partly-cloudy-day': partlyCloudyDay,
    'partly-cloudy-night': partlyCloudyNight,
    'rain-snow-showers-day': rainSnowShowersDay,
    'rain-snow-showers-night': rainSnowShowersNight,
    'rain-snow': rainSnow,
    rain,
    'showers-day': showersDay,
    'showers-night': showersNight,
    sleet,
    'snow-showers-day': snowShowersDay,
    'snow-showers-night': snowShowersNight,
    snow,
    'thunder-rain': thunderRain,
    'thunder-showers-day': thunderShowersDay,
    'thunder-showers-night': thunderShowersNight,
    thunder,
    wind,
  };

  return iconMap[iconName] || false;
}
