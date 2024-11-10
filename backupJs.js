async function getWeather() {
    // Get the city name from the input field
    const cityName = document.getElementById('city').value;
    const apiKey = "bb211d3d0e3ffb6aa101a71f6d562d37";  // Replace with your valid OpenWeather API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;

    // Elements to display the temperature and weather icon
    const tempElement = document.getElementById('temp-div');
    const iconElement = document.getElementById('weather-icon');

    try {
        // Fetch the data from the API
        const response = await fetch(url);
        
        // Check if the response is successful
        if (!response.ok) {
            throw new Error(`City not found: ${cityName}`);
        }

        // Convert the response to JSON format
        const result = await response.json();
        
        // Extract temperature in Celsius and weather icon
        const temperatureCelsius = Math.floor(result.main.temp);
        const iconCode = result.weather[0].icon;

        // Display the temperature in the HTML and update the weather icon
        tempElement.textContent = `Temperature: ${temperatureCelsius}°C`;
        iconElement.src = `http://openweathermap.org/img/wn/${iconCode}.png`;

    } catch (error) {
        // Log any errors that occur during the fetch
        console.error("Error fetching weather data:", error);
        tempElement.textContent = "Error fetching weather data.";
    }
}
