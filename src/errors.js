import { toggleLoader, addLoader } from "./loader.js";

/**
 * Display an error message.
 * @param {string} error - An error message
 */
export default function displayError(error) {
  // Create a container for the error
  const errorContainer = document.createElement('section');
  errorContainer.className = 'error-container';

  // The error
  const errorMessage = document.createElement('p');
  errorMessage.className = 'error-message';
  errorMessage.textContent = error;

  const weatherDataContainer = document.querySelector(
    '.weather-data-container'
  );
  weatherDataContainer.textContent = '';

  errorContainer.appendChild(errorMessage);

  weatherDataContainer.appendChild(errorContainer);

  errorContainer.style.maxWidth = '600px';
  weatherDataContainer.style.display = 'flex';

  // Reactivate the loader
  toggleLoader();
  addLoader();
}
