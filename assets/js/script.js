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

var submitBtn = document.querySelector("#submit");
var apiKey = "139bfa69532b5f8c4c783dac503cee31";


var getCoords = function(event) {
    var city = document.querySelector("input[id='cityname']").value;

    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
    console.log(apiUrl);
    // make a request to the url
    fetch(apiUrl)
        .then(function(response) {
            // request was successful
            if (response.ok) {
                response.json().then(function(data) {
                    var lon = data.coord.lon;
                    var lat = data.coord.lat;
                    getCityWeather(lon, lat);
                    document.querySelector("input[id='cityname']").value = "";
                });
            } else {
                alert("City Not Found");
            }
        })
        .catch(function(error) {
            alert("Unable to connect to server");
        });
};

var getCityWeather = function (lon, lat) {
    var apiUrl2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude={part}&appid=" + apiKey;
    console.log(apiUrl2);

    // make a request again using what we got from previous fetch
    fetch(apiUrl2)
        .then(function(response) {
            //request was successful
            if (response.ok) {
                response.json().then(function(data) {
                    displayWeather(data);
                    console.log(data);
                })
            }
        })
}

var displayWeather = function (data) {
    var currentDay = new Date(data.current.dt * 1000);
    console.log(currentDay);
}

submitBtn.addEventListener("click", getCoords);