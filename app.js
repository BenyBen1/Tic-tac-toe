async function getWeather() {
    const fetch = require('node-fetch');

    const url = 'https://weatherapi-com.p.rapidapi.com/search.json';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'c85c4ed36emshaf7a7e1125ca416p1a37f0jsn917063e460b3',
            'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}
