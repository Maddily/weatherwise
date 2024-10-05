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
