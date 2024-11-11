console.log(`JavaScript connected`);

async function fetchWeather() {
    const apiKey = process.env.OPEN_WEATHER_API_KEY;
    const url =
    //fetch weather data from api
    try {
        const weatherData = await fetch();
    } catch(error) {
        
    }
}



























/*async function getWeather() {
    // Get the city name from the input field
    const cityName = document.getElementById('city').value;
    const apiKey = "bb211d3d0e3ffb6aa101a71f6d562d37";  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;

    // Elements to display the temperature and weather icon
    const tempElement = document.getElementById('temp-div');
    const iconElement = document.getElementById('weather-icon');
    const description = document.getElementById('description-div');

    try {
        // Fetch the data from the API
        const response = await fetch(url);

        // Check if the response is successful
        if ((!response.ok) && (cityName !== "") ){
            throw new Error(`City not found: ${cityName} or you have not entered a city`);
        }

        // Convert the response to JSON format
        const result = await response.json();

        // Extract temperature in Celsius and weather icon
        const temperatureCelsius = Math.floor(result.main.temp);
        const iconCode = result.weather[0].icon;
        const descriptions = result.weather[0].description

        // Display the temperature in the HTML and update\ the weather icon
        tempElement.textContent = `Temperature: ${temperatureCelsius}°C`;
        iconElement.src = `http://openweathermap.org/img/wn/${iconCode}.png`;
        description.textContent = `Weather description: ${descriptions}`;

        // Show the icon by setting its display property to 'block'
        iconElement.style.display = 'block';

    } catch (error) {
        // Log any errors that occur during the fetch
        console.error("Error fetching weather data:", error);
        tempElement.textContent = "Error fetching weather data.";
    }
}*/

