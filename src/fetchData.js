/**
 * Fetch data from the backend API
 * @param {string} type - today, daily or hourly
 * @param {string} location - The name of a city
 * @returns The weather data fetched from the backend API
 */
export default async function fetchData(type, location) {
  const response = await fetch(`https://weatherwiseforecast.vercel.app/${type}/${location}`);

  if (!response.ok) {
    const { error } = await response.json();
    throw Error(error);
  }

  const data = await response.json();
  if ('error' in data) {
    throw Error(data.error);
  }

  return data;
}
