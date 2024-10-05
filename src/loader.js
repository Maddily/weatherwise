// Create an element that represents a loader
export function addLoader() {
  const loader = document.createElement('div');
  loader.className = 'loader';

  const weatherDataContainer = document.querySelector(
    '.weather-data-container'
  );
  weatherDataContainer.appendChild(loader);
}

// Display the loader if it's inactive or hide it if it's displayed
export function toggleLoader() {
  const loader = document.querySelector('.loader');
  if (loader) {
    const weatherDataContainer = document.querySelector(
      '.weather-data-container'
    );
    weatherDataContainer.textContent = '';
    weatherDataContainer.style.display = 'flex';
    weatherDataContainer.appendChild(loader);

    loader.classList.toggle('active');
  }
}
