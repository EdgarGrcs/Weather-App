/**
 * Goals:
 * able to search for your location and let data output it
 * be able to display the data in both celcius and fahrenheit
 * be able to change the look of the page based on the data 
 *  - ex changing background, or adding a gif that describes the weather
 *  - ex use giphy API for that
 */

// https://openweathermap.org/current  -- API documentation


async function getLocation(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=cfe4c10894e8958662e9f26648de2b00`);
    try {
        const cityData = getWeatherData(await response.json());
        return cityData;
    } catch (error) {
        alert("Error");
        return null;
    }
}

function getWeatherData(data) {

    const {
        name: cityName,
        main: {
            feels_like: feelsLike,
            humidity: humidity,
            temp: temperature,
            temp_max: tempMax,
            temp_min: tempMin,
        },
        weather: [{
            main: info,
            description: description,
        }],
        wind: { speed: windSpeed },
    } = data;

    return { cityName, feelsLike, humidity, temperature, windSpeed, tempMax, tempMin, info, description };
}


async function appendData(name) {
    try {
        const temp = document.querySelector(".temperature");
        const weatherInfo = document.querySelector(".weather-condition");
        const maxTemp = document.querySelector(".maxTemp");
        const minTemp = document.querySelector(".minTemp");
        const humidity = document.querySelector(".humidity");
        const windSpeed = document.querySelector(".windSpeed");


        const data = await getLocation(name);
        temp.textContent = data.temperature;
        weatherInfo.textContent = data.info;
        maxTemp.textContent = data.tempMax;
        minTemp.textContent = data.tempMin;
        humidity.textContent = data.humidity;
        windSpeed.textContent = data.windSpeed;
    } catch (e) {
        alert("Error");
    }
}



const searchBar = document.querySelector(".searchBar");

searchBar.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        const val = document.querySelector(".searchBar").value;
        appendData(val);
    }
})