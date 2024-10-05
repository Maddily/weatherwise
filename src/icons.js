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
