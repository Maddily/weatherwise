# WeatherWise
Weatherwise is a responsive weather application that provides real-time weather updates, including current conditions, hourly forecasts, and a 10-day outlook. Built with a robust backend and a user-friendly frontend, this app is designed to deliver accurate weather data with a smooth user experience.

## Table of Contents
- [How to Access WeatherWise](#how-to-access)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Folder Structure](#folder-structure)
- [Acknowledgments](#acknowledgments)
- [License](#license)

## How to Access WeatherWise
WeatherWise is hosted on Vercel. You can access it [here](https://wwforecast.vercel.app/).

## Features
- **Real-Time Weather Data**: Provides current conditions, hourly forecasts, and a 10-day forecast.
- **Dynamic Icons**: Displays weather icons based on current conditions.
- **Caching with Redis**: Reduces API calls by caching responses, improving performance.
- **Rate Limiting**: Prevents excessive requests to ensure fair usage.
- **Responsive Design**: Optimized for both desktop and mobile users.

## Tech Stack
- **Frontend**: HTML, CSS, JavaScript (with Webpack)
- **Backend**: Node.js with Express.js
- **Database**: Redis for caching
- **API**: Visual Crossing Weather API
- **Testing**: Mocha for unit and integration tests
- **Build Tool**: Webpack

## Installation
1. **Clone the Repository**:
    ```bash
    git clone https://github.com/Maddily/weatherwise.git
    cd weatherwise
    ```
2. **Install Dependencies**:
    ```bash
    npm install
    ```
3. **Configure Environment Variables**: Create a `.env` file in the root directory with your API key:
    ```makefile
    VISUAL_CROSSING_API_KEY=your_api_key
    ```
4. **Run Redis Server**: If Redis is not already running, start it using:
    ```bash
    redis-server
    ```
5. **Start the Application**:
    ```bash
    npm start
    ```
The app should now be running at `http://localhost:5000`.

## Usage
1. Open your browser and go to `http://localhost:5000`.
2. Enter a city name to view the current weather, hourly forecast, and a 10-day outlook.

## Testing
To run tests, first make sure the Redis server is running, then use:
```bash
npm test
```
This will execute both unit and integration tests using Mocha.

### Testing Details
- **Unit Tests**: Located in `tests/unit`, covering individual functions and controllers.
- **Integration Tests**: Located in `tests/integration`, ensuring that the app’s components work well together.

## Folder Structure
```bash
weatherwise/
│
├── controllers/            # Application controllers
├── routes/                 # API routes
├── src/                    # Source code for frontend
├── tests/                  # Testing files
│   ├── integration/        # Integration tests
│   └── unit/               # Unit tests
│
├── utils/                  # Utility files
│   └── redis.js            # Redis configuration and cache functions
│
├── .env                    # Environment variables (not included in repo)
├── .gitignore              # Files and directories to ignore in Git
├── babel.config.js         # Babel configuration for ES6+ syntax
├── package.json            # Project dependencies and scripts
├── README.md               # Project documentation
├── server.js               # Entry point for the server
└── webpack.config.js       # Webpack configuration

```

## Acknowledgments
Background image by <a href="https://pixabay.com/users/lucasgrey-679745/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=4032775">Łukasz Siwy</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=4032775">Pixabay</a>

## License
<p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://github.com/Maddily/weatherwise">WeatherWise</a> by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://github.com/Maddily">Mayada Saeed</a> is licensed under <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">CC BY-NC-ND 4.0<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/nd.svg?ref=chooser-v1" alt=""></a></p>
