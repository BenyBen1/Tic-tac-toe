// API Key
const API_KEY = '6d60883b5d34c83f5e1abcef6c4f1765';

// DOM Elements
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');

// Event Listeners
document.addEventListener('DOMContentLoaded', getWeatherByLocation);
searchBtn.addEventListener('click', handleSearch);

// Get weather by geolocation
function getWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                fetchWeatherByCoords(latitude, longitude, 'local');
                fetchHourlyForecast(latitude, longitude);
            },
            error => {
                console.error('Error getting location:', error);
                alert('Unable to retrieve location. Please allow location access.');
            }
        );
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

// Handle search
async function handleSearch() {
    const city = cityInput.value.trim();
    if (!city) {
        alert('Please enter a city name');
        return;
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        
        if (data.cod === 200) {
            updateWeatherCard(data, 'searched');
            fetchHourlyForecast(data.coord.lat, data.coord.lon);
            cityInput.value = '';
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error fetching weather:', error);
        alert('Error fetching weather data. Please try again.');
    }
}

// Fetch weather by coordinates
async function fetchWeatherByCoords(lat, lon, type) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        updateWeatherCard(data, type);
    } catch (error) {
        console.error('Error fetching weather:', error);
    }
}

// Update weather card
function updateWeatherCard(data, type) {
    document.getElementById(`${type}-temp`).textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById(`${type}-humidity`).textContent = `${data.main.humidity}%`;
    document.getElementById(`${type}-wind`).textContent = `${Math.round(data.wind.speed)} m/s`;
    document.getElementById(`${type}-conditions`).textContent = data.weather[0].description;
    document.getElementById(`${type}-city-name`).textContent = `${data.name}, ${data.sys.country}`;
}

// Fetch hourly forecast
async function fetchHourlyForecast(lat, lon) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        displayHourlyForecast(data.list);
    } catch (error) {
        console.error('Error fetching forecast:', error);
    }
}

// Display hourly forecast
function displayHourlyForecast(forecastData) {
    const hourlyForecast = document.getElementById('hourly-forecast');
    hourlyForecast.innerHTML = '';

    forecastData.slice(0, 8).forEach(item => {
        const date = new Date(item.dt * 1000);
        const hour = date.getHours();
        const temp = Math.round(item.main.temp);
        
        const forecastItem = document.createElement('div');
        forecastItem.className = 'col-md-3 mb-3';
        forecastItem.innerHTML = `
            <div class="forecast-item">
                <h6>${hour}:00</h6>
                <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png" alt="Weather icon">
                <p class="mb-0">${temp}°C</p>
                <p class="mb-0 text-muted">${item.weather[0].description}</p>
            </div>
        `;
        
        hourlyForecast.appendChild(forecastItem);
    });
}