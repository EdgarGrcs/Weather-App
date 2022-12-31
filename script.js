// https://openweathermap.org/current  -- API documentation

async function getLocation(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=cfe4c10894e8958662e9f26648de2b00`);
    try {
        const cityData = getWeatherData(await response.json());
        return cityData;
    } catch (error) {
        alert(`City named ${city} not found!`);
        return null;
    }
}

function getWeatherData(data) {
    const {
        name: cityName,
        main: {
            humidity: humidity,
            temp: temperature,
            temp_max: tempMax,
            temp_min: tempMin,
        },
        weather: [{
            main: info,
        }],
        wind: { speed: windSpeed },
    } = data;

    return { cityName, humidity, temperature, windSpeed, tempMax, tempMin, info, };
}


async function appendData(name, checkBoxBool) {
    try {
        const cityTitle = document.querySelector(".cityName");
        const temp = document.querySelector(".temp");
        const weatherInfo = document.querySelector(".weather-condition");
        const maxTemp = document.querySelector(".maxTemp");
        const minTemp = document.querySelector(".minTemp");
        const humidity = document.querySelector(".humidity");
        const windSpeed = document.querySelector(".windSpeed");


        const data = await getLocation(name);

        cityTitle.textContent = data.cityName;

        if (checkBoxBool) {
            temp.textContent = ((data.temperature * 1.8) + 32).toFixed(0) + " F";
            maxTemp.textContent = ((data.tempMax * 1.8) + 32).toFixed(0) + " F";
            minTemp.textContent = ((data.tempMin * 1.8) + 32).toFixed(0) + " F";
        } else {
            temp.textContent = (data.temperature).toFixed(0) + "°";
            maxTemp.textContent = (data.tempMax).toFixed(0) + "°";
            minTemp.textContent = (data.tempMin).toFixed(0) + "°";
        }

        weatherInfo.textContent = data.info;
        humidity.textContent = data.humidity + "%";
        windSpeed.textContent = data.windSpeed;
    } catch (e) {
        alert("Error, something went wrong!");
    }
}


const searchBar = document.querySelector(".searchBar");

searchBar.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        const value = document.querySelector(".searchBar").value;
        appendData(value);
    }
})

appendData("Tokyo");