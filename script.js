/**
 * Goals:
 * able to search for your location and let data output it
 * be able to display the data in both celcius and fahrenheit
 * be able to change the look of the page based on the data 
 *  - ex changing background, or adding a gif that describes the weather
 *  - ex use giphy API for that
 */



// https://openweathermap.org/current  -- API documentation




async function getFrankfurtWeather() {

    const response = await fetch("http://api.openweathermap.org/geo/1.0/direct?q=Frankfurt&limit=5&appid=cfe4c10894e8958662e9f26648de2b00");
    const frankfurtData = await response.json();

    console.log(frankfurtData);
    // Wait for API key to activate

}


getFrankfurtWeather();