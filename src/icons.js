// Create and return an svg icon that resembles the minimum temperature
export function createLowArrowIcon() {
  const svgNS = 'http://www.w3.org/2000/svg';

  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', '0 0 155.139 155.139');
  svg.classList.add('arrow');

  const path = document.createElementNS(svgNS, 'path');
  path.setAttribute(
    'd',
    'M114.588,45.42h28.17L97.338,0l-45.42,45.42h28.516C76.4,98.937,48.529,142.173,12.381,152.686 c5.513,1.605,11.224,2.452,17.071,2.452C73.601,155.139,109.94,107.111,114.588,45.42z'
  );
  path.setAttribute('fill', '#5792ea');

  svg.setAttribute('transform', 'matrix(-1, 0, 0, -1, 0, 0)');

  svg.appendChild(path);

  return svg;
}

// Create and return an svg icon that resembles the maximum temperature
export function createHighArrowIcon() {
  const svgNS = 'http://www.w3.org/2000/svg';

  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', '0 0 155.139 155.139');
  svg.classList.add('arrow');

  const path = document.createElementNS(svgNS, 'path');
  path.setAttribute(
    'd',
    'M114.588,45.42h28.17L97.338,0l-45.42,45.42h28.516C76.4,98.937,48.529,142.173,12.381,152.686 c5.513,1.605,11.224,2.452,17.071,2.452C73.601,155.139,109.94,107.111,114.588,45.42z'
  );
  path.setAttribute('fill', '#ff3d3d');

  svg.appendChild(path);

  return svg;
}

// Create and return an svg icon for wind direction
export function createWindArrowIcon() {
  const xmlns = 'http://www.w3.org/2000/svg';

  const svg = document.createElementNS(xmlns, 'svg');
  svg.setAttribute('fill', '#fff1d4');
  svg.setAttribute('xmlns', xmlns);
  svg.setAttribute('viewBox', '0 0 24 24');

  const path = document.createElementNS(xmlns, 'path');
  path.setAttribute(
    'd',
    'M12,2L4.5,20.29L5.21,21L12,18L18.79,21L19.5,20.29L12,2Z'
  );

  svg.appendChild(path);

  return svg;
}

// Create and return an svg icon for wind speed
export function createWindmillIcon() {
  const svgNS = 'http://www.w3.org/2000/svg';

  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('xmlns', svgNS);
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', '#fff1d4');

  const path = document.createElementNS(svgNS, 'path');
  path.setAttribute(
    'd',
    'M4 3H10V5H4V3M1 7H6V9H1V7M3 19H8V21H3V19M13.73 10.61C14.5 10.84 15.03 11.39 15.3 12.07L19.57 4.96C20.22 3.88 19.87 2.5 18.79 1.83C17.92 1.31 16.8 1.42 16.06 2.12L12.63 5.33C12.23 5.7 12 6.23 12 6.78V10.71C12.36 10.56 13 10.38 13.73 10.61M10.61 12.27C10.77 11.75 11.09 11.31 11.5 11H3.28C2 11 1 12 1 13.28C1 14.3 1.67 15.19 2.65 15.47L7.16 16.76C7.69 16.91 8.26 16.84 8.74 16.55L11.43 14.94C10.66 14.32 10.3 13.27 10.61 12.27M22.21 18.61L19.93 14.5C19.66 14.03 19.2 13.68 18.67 13.54L15.5 12.74C15.5 13.06 15.5 13.4 15.39 13.73C15.07 14.79 14.11 15.5 13 15.5C12.39 15.5 12 15.28 12 15.28V21C10.9 21 10 21.9 10 23H16C16 21.9 15.1 21 14 21V16.72L18.61 21.33C19.5 22.22 20.94 22.22 21.83 21.33C22.55 20.61 22.71 19.5 22.21 18.61M12.56 14.43C13.35 14.67 14.19 14.23 14.43 13.43C14.67 12.64 14.23 11.8 13.43 11.56C12.64 11.32 11.8 11.76 11.56 12.56C11.32 13.35 11.77 14.19 12.56 14.43Z'
  );

  svg.appendChild(path);

  return svg;
}

// Create and return an svg icon for humidity
export function createHumidityIcon() {
  const xmlns = 'http://www.w3.org/2000/svg';

  const svg = document.createElementNS(xmlns, 'svg');
  svg.setAttribute('xmlns', xmlns);
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', '#fff1d4');

  const path = document.createElementNS(xmlns, 'path');
  path.setAttribute(
    'd',
    'M12,3.25C12,3.25 6,10 6,14C6,17.32 8.69,20 12,20A6,6 0 0,0 18,14C18,10 12,3.25 12,3.25M14.47,9.97L15.53,11.03L9.53,17.03L8.47,15.97M9.75,10A1.25,1.25 0 0,1 11,11.25A1.25,1.25 0 0,1 9.75,12.5A1.25,1.25 0 0,1 8.5,11.25A1.25,1.25 0 0,1 9.75,10M14.25,14.5A1.25,1.25 0 0,1 15.5,15.75A1.25,1.25 0 0,1 14.25,17A1.25,1.25 0 0,1 13,15.75A1.25,1.25 0 0,1 14.25,14.5Z'
  );

  svg.appendChild(path);

  return svg;
}

// Create and return an svg icon for location
export function createLocationIcon() {
  const xmlns = 'http://www.w3.org/2000/svg';

  const svg = document.createElementNS(xmlns, 'svg');
  svg.setAttribute('xmlns', xmlns);
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', '#7d8f71');

  const path = document.createElementNS(xmlns, 'path');
  path.setAttribute(
    'd',
    'M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z'
  );

  svg.appendChild(path);

  return svg;
}

// Create and return an svg icon for hourly forecast heading
export function createHourlyIcon() {
  const xmlns = 'http://www.w3.org/2000/svg';

  const svg = document.createElementNS(xmlns, 'svg');
  svg.setAttribute('xmlns', xmlns);
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', '#fff1d4');

  const path = document.createElementNS(xmlns, 'path');
  path.setAttribute(
    'd',
    'M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12S17.5 2 12 2M17 13H11V7H12.5V11.5H17V13Z'
  );

  svg.appendChild(path);

  return svg;
}

// Create and return an svg icon for daily forecast heading
export function createCalendarIcon() {
  const xmlns = 'http://www.w3.org/2000/svg';

  const svg = document.createElementNS(xmlns, 'svg');
  svg.setAttribute('xmlns', xmlns);
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', '#fff1d4');

  const path = document.createElementNS(xmlns, 'path');
  path.setAttribute(
    'd',
    'M7 11H9V13H7V11M21 5V19C21 20.11 20.11 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H6V1H8V3H16V1H18V3H19C20.11 3 21 3.9 21 5M5 7H19V5H5V7M19 19V9H5V19H19M15 13V11H17V13H15M11 13V11H13V13H11M7 15H9V17H7V15M15 17V15H17V17H15M11 17V15H13V17H11Z'
  );

  svg.appendChild(path);

  return svg;
}

// Create and return an svg icon for air pressure
export function createAirPressureIcon() {
  const xmlns = 'http://www.w3.org/2000/svg';

  const svg = document.createElementNS(xmlns, 'svg');
  svg.setAttribute('xmlns', xmlns);
  svg.setAttribute('viewBox', '-25.6 -25.6 307.20 307.20');
  svg.setAttribute('fill', '#fff1d4');
  svg.setAttribute('transform', 'matrix(1, 0, 0, -1, 0, 0)rotate(270)');

  const path = document.createElementNS(xmlns, 'path');
  path.setAttribute(
    'd',
    'M180,184a28.004,28.004,0,0,1-54.26709,9.71582,3.9999,3.9999,0,0,1,7.50293-2.77539A20.00288,20.00288,0,1,0,152,164H40a4,4,0,0,1,0-8H152A28.03146,28.03146,0,0,1,180,184ZM148,72a28.004,28.004,0,0,0-54.26709-9.71582,3.9999,3.9999,0,0,0,7.50293,2.77539A20.00288,20.00288,0,1,1,120,92H24a4,4,0,0,0,0,8h96A28.03146,28.03146,0,0,0,148,72Zm60,4a28.11549,28.11549,0,0,0-26.26709,18.28418,3.9999,3.9999,0,0,0,7.50293,2.77539A20.00288,20.00288,0,1,1,208,124H32a4,4,0,0,0,0,8H208a28,28,0,0,0,0-56Z'
  );

  svg.appendChild(path);

  return svg;
}

// Create and return an svg icon for pressure
export function createGaugeIcon() {
  const xmlns = 'http://www.w3.org/2000/svg';

  const svg = document.createElementNS(xmlns, 'svg');
  svg.setAttribute('xmlns', xmlns);
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', '#7d8f71cc');

  const path = document.createElementNS(xmlns, 'path');
  path.setAttribute(
    'd',
    'M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12C20,14.4 19,16.5 17.3,18C15.9,16.7 14,16 12,16C10,16 8.2,16.7 6.7,18C5,16.5 4,14.4 4,12A8,8 0 0,1 12,4M14,5.89C13.62,5.9 13.26,6.15 13.1,6.54L11.81,9.77L11.71,10C11,10.13 10.41,10.6 10.14,11.26C9.73,12.29 10.23,13.45 11.26,13.86C12.29,14.27 13.45,13.77 13.86,12.74C14.12,12.08 14,11.32 13.57,10.76L13.67,10.5L14.96,7.29L14.97,7.26C15.17,6.75 14.92,6.17 14.41,5.96C14.28,5.91 14.15,5.89 14,5.89M10,6A1,1 0 0,0 9,7A1,1 0 0,0 10,8A1,1 0 0,0 11,7A1,1 0 0,0 10,6M7,9A1,1 0 0,0 6,10A1,1 0 0,0 7,11A1,1 0 0,0 8,10A1,1 0 0,0 7,9M17,9A1,1 0 0,0 16,10A1,1 0 0,0 17,11A1,1 0 0,0 18,10A1,1 0 0,0 17,9Z'
  );

  svg.appendChild(path);

  return svg;
}

// Create and return an svg icon for UV Index
export function createUvIndexIcon() {
  const xmlns = 'http://www.w3.org/2000/svg';

  const svg = document.createElementNS(xmlns, 'svg');
  svg.setAttribute('xmlns', xmlns);
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', '#fff1d4');

  const path = document.createElementNS(xmlns, 'path');
  path.setAttribute(
    'd',
    'M3.55 19.09L4.96 20.5L6.76 18.71L5.34 17.29M12 6C8.69 6 6 8.69 6 12S8.69 18 12 18 18 15.31 18 12C18 8.68 15.31 6 12 6M20 13H23V11H20M17.24 18.71L19.04 20.5L20.45 19.09L18.66 17.29M20.45 5L19.04 3.6L17.24 5.39L18.66 6.81M13 1H11V4H13M6.76 5.39L4.96 3.6L3.55 5L5.34 6.81L6.76 5.39M1 13H4V11H1M13 20H11V23H13'
  );

  svg.appendChild(path);

  return svg;
}

// Create and return an svg icon for visibility
export function createVisibilityIcon() {
  const xmlns = 'http://www.w3.org/2000/svg';

  const svg = document.createElementNS(xmlns, 'svg');
  svg.setAttribute('xmlns', xmlns);
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', '#fff1d4');

  const path = document.createElementNS(xmlns, 'path');
  path.setAttribute(
    'd',
    'M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z'
  );

  svg.appendChild(path);

  return svg;
}
