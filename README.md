# weather

    console.log(data);
    currentEl.classList.remove('hide');
    var currentWeatherDataEl = document.createElement('div');
    var cityh1El = document.createElement('h1');
    var tempEl = document.createElement('p');
    var windEl = document.createElement('p');
    var humidityEl = document.createElement('p');
    var uvEl = document.createElement('p');

    cityh1El.innerHTML = data[0].name; 
    tempEl.textContent = data[0].temp;
    console.log(data[0].name);


    currentEl.appendChild(currentWeatherDataEl);
    currentWeatherDataEl.appendChild(cityh1El);
    currentWeatherDataEl.appendChild(tempEl);
    currentWeatherDataEl.appendChild(windEl);
    currentWeatherDataEl.appendChild(humidityEl);
    currentWeatherDataEl.appendChild(uvEl);
      }
    });
}

------

var searchBtn = document.querySelector('#search-btn');
var cityInputEl = document.getElementById('city-input');
var currentEl = document.getElementById('current-container');


var inputHandler = function(event) {
  event.preventDefault();

  var cityName = cityInputEl.value.trim();

  getApi(cityName);

}

// Get city name. When input and submit button...
function getApi(cityName) {

  console.log(cityName);

  var requestUrl = 'http://api.openweathermap.org/data/2.5/weather?q='+cityName+'&units=imperial&appid=42315a92a191c90b4007c062b41a8de1';

  fetch(requestUrl)
    .then(function(response) {
      console.log(response);
      response.json().then(function(data) {
        
        console.log(data.weather[0].icon);
        displayCurrent(data);
      
    })
})
}


var displayCurrent = function(current) {

    var city = document.createElement('h1');
        city.innerHTML = current.name;
        currentEl.appendChild(city);

    var iconDisplay = document.createElement('p');
        iconDisplay.innerHTML = current.weather[0].icon;
        currentEl.appendChild(iconDisplay);

}

searchBtn.addEventListener('click', inputHandler);