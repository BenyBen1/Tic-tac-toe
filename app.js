// HTML element IDs
const HOURLY_FORECAST_CONTAINER_ID = "hourly-forecast-container";
const CITY_INPUT_ID = "city-input";
const CARD_BODY_CLASS = "card-body";

// Hourly forecast display function
function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById(HOURLY_FORECAST_CONTAINER_ID);

    hourlyForecastDiv.innerHTML = ""; // Clear any previous hourly forecast data

    const next24Hours = hourlyData.slice(0, 8); // Display the next 24 hours (3-hour intervals)

    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000); // Convert timestamp to milliseconds
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15); // Convert to Celsius
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHtml = `
            <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${iconUrl}" alt="Hourly Weather Icon">
                <span>${temperature}°C</span>
            </div>
        `;

        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}

// Async function to fetch weather data
async function fetchWeather() {
    const apiKey = `6d60883b5d34c83f5e1abcef6c4f1765`;
    const city = document.getElementById(CITY_INPUT_ID).value.trim();

    // Clear input field after capturing value
    document.getElementById(CITY_INPUT_ID).value = "";

    if (!city) {
        alert('Please enter a city!');
        return;
    }

    try {
        // Fetch current weather data
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();

        if (weatherData.cod !== 200) {
            alert(`Error: ${weatherData.message}`);
            return;
        }

        // Display current weather
        displayWeather(weatherData);

        // Fetch hourly forecast data using the city name
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();

        // Display hourly forecast
        displayHourlyForecast(forecastData.list);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Error fetching weather data. Please try again.");
    }
}

// Event listener for search button
const searchWeather = document.getElementById("search-btn");
searchWeather.addEventListener("click", fetchWeather);

// Function to display current weather
function displayWeather(weatherData) {
    const cardBody = document.querySelector(`.${CARD_BODY_CLASS}`);
    cardBody.innerHTML = ""; // Clear previous data

    // Weather data
    const temperature = weatherData.main.temp;
    const description = weatherData.weather[0].description;
    const cityName = weatherData.name;
    const countryName = weatherData.sys.country;
    const iconCode = weatherData.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;

    // Create elements and append to card-body
    const weatherIcon = document.createElement("img");
    weatherIcon.src = iconUrl;
    weatherIcon.alt = "Weather icon";
    cardBody.appendChild(weatherIcon);

    const temperatureElement = document.createElement("p");
    temperatureElement.textContent = `Temperature: ${temperature}°C`;
    cardBody.appendChild(temperatureElement);

    const conditionElement = document.createElement("p");
    conditionElement.textContent = `Conditions: ${description}`;
    cardBody.appendChild(conditionElement);

    const cityElement = document.createElement("p");
    cityElement.textContent = `City: ${cityName}`;
    cardBody.appendChild(cityElement);

    const countryElement = document.createElement("p");
    countryElement.textContent = `Country: ${countryName}`;
    cardBody.appendChild(countryElement);
}

document.addEventListener("DOMContentLoaded", () => {
    getWeatherByLocation(); // Fetch weather based on geolocation on page load
});

function getWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                fetchWeatherByCoordinates(latitude, longitude);
                fetchHourlyForecastByCoordinates(latitude, longitude);
            },
            error => {
                console.error("Error getting geolocation:", error);
                alert("Unable to retrieve location. Please allow location access.");
            }
        );
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

async function fetchWeatherByCoordinates(latitude, longitude) {
    const apiKey = "6d60883b5d34c83f5e1abcef6c4f1765";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

async function fetchHourlyForecastByCoordinates(latitude, longitude) {
    const apiKey = "6d60883b5d34c83f5e1abcef6c4f1765";
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    try {
        const response = await fetch(forecastUrl);
        const forecastData = await response.json();
        displayHourlyForecast(forecastData.list);
    } catch (error) {
        console.error("Error fetching hourly forecast data:", error);
    }
}

// Function to display hourly forecast
function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById('hourly-forecast-container');
    hourlyForecastDiv.innerHTML = ""; // Clear previous content

    const next24Hours = hourlyData.slice(0, 8); // Display the next 24 hours (3-hour intervals)

    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000); // Convert timestamp to milliseconds
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15); // Convert to Celsius
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHtml = `
            <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${iconUrl}" alt="Hourly Weather Icon">
                <span>${temperature}°C</span>
            </div>
        `;
        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}

// Function to display current weather data
function displayWeather(weatherData) {
    const cardBody = document.querySelector(".card-body");
    cardBody.innerHTML = ""; // Clear any previous data

    const temperature = weatherData.main.temp;
    const description = weatherData.weather[0].description;
    const cityName = weatherData.name;
    const countryName = weatherData.sys.country;
    const iconCode = weatherData.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;

    // Create and append elements
    const weatherIcon = document.createElement("img");
    weatherIcon.src = iconUrl;
    weatherIcon.alt = "Weather Icon";
    cardBody.appendChild(weatherIcon);

    const temperatureElement = document.createElement("p");
    temperatureElement.textContent = `Temperature: ${temperature}°C`;
    cardBody.appendChild(temperatureElement);

    const conditionElement = document.createElement("p");
    conditionElement.textContent = `Conditions: ${description}`;
    cardBody.appendChild(conditionElement);

    const cityElement = document.createElement("p");
    cityElement.textContent = `City: ${cityName}`;
    cardBody.appendChild(cityElement);

    const countryElement = document.createElement("p");
    countryElement.textContent = `Country: ${countryName}`;
    cardBody.appendChild(countryElement);
}
