console.log(`JavaScript connected`);
//Async/Await function
async function fetchWeather() {
    //Local Variables
    const apiKey = `6d60883b5d34c83f5e1abcef6c4f1765`;
    let city = document.getElementById("city-input").value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    //clear after getting input value
    document.getElementById("city-input").value = "";

    //Check whether input is valid
    if (!city) {
        alert('Please enter a city!');
        return;
    }
        //fetch weather data
    try {
        let weatherData= await fetch(url);
        let response = await weatherData.json();
        console.log(response);
        //Call display weather function here
        displayWeather(response);
    } catch(error) {
        console.error(`There was an error fetching your weather data.`, error);
    }
}

//Event listener for search button
const searchWeather = document.getElementById("search-btn");
searchWeather.addEventListener("click", ()=> {
    //call fetchWeather function
    fetchWeather();
});

//display weather function
function displayWeather(weatherData) {
    //Reference node for weather card
    const cardBody = document.querySelector(".card-body");
    //clear any previous data
    cardBody.innerHTML = "";

    //weather data from object array
    const temperature= weatherData.main.temp;
    const description= weatherData.weather[0].description;
    const cityName= weatherData.name;
    const countryName= weatherData.sys.country;
    const iconCode= weatherData.weather[0].icon;

    //weather icon url
    const iconUrl= `https://openweathermap.org/img/w/${iconCode}.png`;

    //create new elements and append to card-body
    //Weather icon
    const weatherIcon= document.createElement("img");
    weatherIcon.src= iconUrl;
    weatherIcon.alt= "The weather icon";
    cardBody.appendChild(weatherIcon);
    //Temperature Element
    const temperatureElement= document.createElement("p");
    temperatureElement.textContent= `Temperature:${temperature}\u00B0 C`;
    cardBody.appendChild(temperatureElement);

    //Description Element
    const conditionElement= document.createElement("p");
    conditionElement.textContent= `Conditions:${description}`;
    cardBody.appendChild(conditionElement);

    //City name Element
    const cityElement= document.createElement("p");
    cityElement.textContent = `City:${cityName}`
    cardBody.appendChild(cityElement);

    //Country name Element
    const countryElement= document.createElement("p");
    countryElement.textContent= `Country:${countryName}`;
    cardBody.appendChild(countryElement);
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

