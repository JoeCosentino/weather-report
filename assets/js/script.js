// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
var inputValue = document.querySelector("#cityname");
var submitBtn = document.querySelector("#submit");

var getCityWeather = function(city) {
    var geoConverterUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + inputValue.value + "&limit=5&appid={API key}";
    console.log(geoConverterUrl);
    // var apiUrl = "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=139bfa69532b5f8c4c783dac503cee31";

    // make a request to the url
    fetch(geoConverterUrl)
        .then(function(response) {
            // request was successful
            if (response.ok) {
                response.json().then(function(data) {
                    displayCity(city);
                });
            } else {
                alert("City Not Found");
            }
        })
        .catch(function(error) {
            alert("Unable to connect to server");
        });
};

submitBtn.addEventListener("submit", getCityWeather);