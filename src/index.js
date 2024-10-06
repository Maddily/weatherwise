import './styles/styles.css';
import './styles/normalize.css';
import handleInput from './weatherData.js';

// Retrieve user input from the DOM and call a function to handle it.
function retrieveInput() {
  const button = document.querySelector('button');
  const input = document.querySelector('input');

  button.addEventListener('click', () => {
    if (input.value) {
      handleInput(input.value.toLowerCase());
      input.value = '';
      input.blur();
    }
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      if (input.value) {
        handleInput(input.value.toLowerCase());
        input.value = '';
        input.blur();
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  retrieveInput();
})
