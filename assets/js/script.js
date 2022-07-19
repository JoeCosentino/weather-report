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
var currentForDispEl = document.querySelector("#city-display");
var fiveDayForDispEl = document.querySelector("#forecast");
var cityHistoryEl = document.querySelector("#city-history");
var cityArr = [];


var getCoords = function(event) {
    var city = document.querySelector("input[id='cityname']").value;
    document.querySelector("#city-display").innerHTML = '';
    document.querySelector("#forecast").innerHTML = '';

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
    var apiUrl2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=metric&appid=" + apiKey;
    console.log(apiUrl2);

    // make a request again using what we got from previous fetch
    fetch(apiUrl2)
        .then(function(response) {
            //request was successful
            if (response.ok) {
                response.json().then(function(data) {
                    displayWeather(data.current);
                    weatherForecast(data.daily);
                    console.log(data);
                })
            }
        })
}

var displayWeather = function (weather) {
    var currentDay = new Date(weather.dt * 1000);
    var currentTemp = weather.temp;
    var currentHumidity = weather.humidity;
    var currentWindSpeed = weather.wind_speed;
    var currentUvi = weather.uvi;

    var currentDayEl = document.createElement("div");
    var options = {weekday: "long", year: "numeric", month: "long", day: "numeric"};
    currentDayEl.textContent = currentDay.toLocaleDateString("en-us", options);
    currentForDispEl.append(currentDayEl);

    var currentTempEl = document.createElement("div");
    currentTempEl.textContent = currentTemp;
    currentForDispEl.append(currentTempEl);

    var currentHumidityEl = document.createElement("div");
    currentHumidityEl.textContent = currentHumidity;
    currentForDispEl.append(currentHumidityEl); 

    var currentWindSpeedEl = document.createElement("div");
    currentWindSpeedEl.textContent = currentWindSpeed;
    currentForDispEl.append(currentWindSpeedEl);

    var currentUviEl = document.createElement("div");
    currentUviEl.textContent = currentUvi;
    currentForDispEl.append(currentUviEl);

    var weatherIcon = document.createElement("img")
    weatherIcon.setAttribute("id", "weather-icon")
    var icon = weatherIcon.setAttribute("src", 'http://openweathermap.org/img/wn/' + weather.weather[0].icon + '@2x.png')
    weatherIcon.textContent = icon;
    currentForDispEl.append(weatherIcon);
};

// to get 5 day forecast
var weatherForecast = function (fiveDay) {
    for (var i = 1; i < 6; i++) {
        var forecastDay = new Date(fiveDay[i].dt * 1000);
        var fiveDayTemp = fiveDay[i].temp.day;
        var fiveDayHumidity = fiveDay[i].humidity;
        var fiveDayWindSpeed = fiveDay[i].wind_speed;
        var fiveDayUvi = fiveDay[i].uvi;

        var forecastDayEl = document.createElement("div");
        var options = {weekday: "long", year: "numeric", month: "long", day: "numeric"};
        forecastDayEl.textContent = forecastDay.toLocaleDateString("en-us", options);
        fiveDayForDispEl.append(forecastDayEl);

        var fiveDayTempEl = document.createElement("div");
        fiveDayTempEl.textContent = fiveDayTemp;
        fiveDayForDispEl.append(fiveDayTempEl);

        var fiveDayHumidityEl = document.createElement("div");
        fiveDayHumidityEl.textContent = fiveDayHumidity;
        fiveDayForDispEl.append(fiveDayHumidityEl); 

        var fiveDayWindSpeedEl = document.createElement("div");
        fiveDayWindSpeedEl.textContent = fiveDayWindSpeed;
        fiveDayForDispEl.append(fiveDayWindSpeedEl);

        var fiveDayUviEl = document.createElement("div");
        fiveDayUviEl.textContent = fiveDayUvi;
        fiveDayForDispEl.append(fiveDayUviEl);

        var fiveDayWeatherIcon = document.createElement("img")
        fiveDayWeatherIcon.setAttribute("id", "weather-icon")
        var icon = fiveDayWeatherIcon.setAttribute("src", 'http://openweathermap.org/img/wn/' + fiveDay[i].weather[0].icon + '@2x.png')
        fiveDayWeatherIcon.textContent = icon;
        fiveDayForDispEl.append(fiveDayWeatherIcon);
    }
};

// get the search results and add them to the history div using localStorage

submitBtn.onclick = function () {

    var cityValue = document.querySelector("input[id='cityname']").value;
    cityArr.push(cityValue);
    console.log(cityValue);

    if (cityValue) {
        localStorage.setItem("cities", JSON.stringify(cityArr));
        // stringify
    }

   renderHistory();
};

renderHistory = function () {
    var itemsSaved = JSON.parse(localStorage.getItem("cities"));
    for (var i = 0; i < itemsSaved.length; i++) {
        var historyEl = document.createElement("p");
        historyEl.textContent = itemsSaved[i];
        cityHistoryEl.append(historyEl);
    };
}

renderHistory();
submitBtn.addEventListener("click", getCoords);