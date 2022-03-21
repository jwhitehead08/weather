var searchBtn = document.querySelector('#search-btn');
var cityInputEl = document.getElementById('city-input');
var currentEl = document.getElementById('current-container');
var forecastEl = document.getElementById('forecast-container');
var fiveDayEl = document.getElementById('five-day');

var today = moment();
var dateNow = moment().format('l');
let btnvalue = '';

// search button initiates
var inputHandler = function (event) {
  event.preventDefault();

  let cityNameRaw = cityInputEl.value.trim();
  let cityName = cityNameRaw[0].toUpperCase() + cityNameRaw.slice(1);
  cityInputEl.value = " ";

  while (currentEl.firstChild) {
    currentEl.removeChild(currentEl.firstChild);
  }

  while (forecastEl.firstChild) {
    forecastEl.removeChild(forecastEl.firstChild);
  }

  getApi(cityName);
  localSet(cityName);
  displayCity();


}



// create an array from the user input
function localSet(cityName) {
  // create object from submission

  var cities = {
    Name: cityName
  };


  var citylistString = localStorage.getItem("cities");

  if (citylistString === null) {
    var citylist = [];
  } else {

    var citylist = JSON.parse(citylistString)
  }

  citylist.push(cities);

  // set new submission to local storage
  localStorage.setItem("cities", JSON.stringify(citylist));



  //displayCity();
};


// create a array and list from the string in local storage 
function displayCity() {

  var cityListGet = localStorage.getItem("cities");

  var cityListNew = JSON.parse(cityListGet);

  console.log(cityListNew);

  listEl = document.createElement('div');
  listItemsNum = cityListNew.length;

  document.getElementById('buttons-container').appendChild(listEl);

 
  for (i = 0; i < listItemsNum; i++) {

    listItem = document.createElement('button');
    listItem.innerHTML = cityListNew[i].Name;
    btnvalue = listItem.innerHTML;
    console.log(btnvalue);
    listItem.classList.add('btn', 'btn-primary', 'city-btn');

    
    // add an event listener to each city button
    listItem.addEventListener("click", function () {
      while (currentEl.firstChild) {
        currentEl.removeChild(currentEl.firstChild);
      }
    
      while (forecastEl.firstChild) {
        forecastEl.removeChild(forecastEl.firstChild);
      }
      getApi(this.innerHTML);
      console.log(btnvalue);
    });
    while (listEl.firstChild) {
      listEl.removeChild(listEl.firstChild);
    }  
    listEl.appendChild(listItem);
  }

};



// Get city name. When input and submit button...
function getApi(cityName) {

  console.log(cityName);
  

  var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=imperial&appid=42315a92a191c90b4007c062b41a8de1';

  fetch(requestUrl)
    .then(function (response) {
      //console.log(response);
      response.json().then(function (data) {

        console.log(data);

        var lat = data.coord.lat;
        var lon = data.coord.lon;
        oneCallApi(lat, lon, cityName);

      })
    })
}

// request one call api
function oneCallApi(lat, lon, cityName) {

  var requestOneCallApi = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=42315a92a191c90b4007c062b41a8de1'

  fetch(requestOneCallApi)
    .then(function (response) {
      //console.log(response);
      response.json().then(function (data) {

        console.log(data);

        displayCurrent(data.current, cityName);
        forecast(data.daily)
      })
    })
}

// display current weather
var displayCurrent = function (current, cityName) {

  var currentWrapper = document.createElement('div');
  currentEl.appendChild(currentWrapper);
  currentWrapper.classList.add('currentWrapper');

  var nameIcon = document.createElement('div');
  currentWrapper.appendChild(nameIcon);
  nameIcon.classList.add('row', 'nameIcon');
  nameIcon.setAttribute("style", "margin: 0");

  var city = document.createElement('h2');
  city.innerHTML = cityName + '(' + dateNow + ')';
  nameIcon.appendChild(city);

  var iconDisplay = document.createElement('img');
  iconDisplay.setAttribute('src', `http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`);
  nameIcon.appendChild(iconDisplay);

  var temp = document.createElement('p');
  temp.innerHTML = "Temp:" + " " + current.temp + "℉";
  currentWrapper.appendChild(temp);

  var wind = document.createElement('p');
  wind.innerHTML = "Wind:" + " " + current.wind_speed + "MPH";
  currentWrapper.appendChild(wind);

  var humidity = document.createElement('p');
  humidity.innerHTML = "Humidity:" + " " + current.humidity + "%";
  currentWrapper.appendChild(humidity);

  var uvDiv = document.createElement('div');
  currentWrapper.appendChild(uvDiv);
  uvDiv.classList.add('row');
  uvDiv.setAttribute("style", "margin: 0");

  var uvText = document.createElement('p');
  uvText.innerHTML = 'UV Index:'+ " " ;
  uvDiv.appendChild(uvText);


  var uvi = document.createElement('p');
  uvi.innerHTML = current.uvi;
  if (current.uvi >= 11) {
    uvi.classList.add('purple');
  } else if (current.uvi >= 8 && current.uvi < 11) {
    uvi.classList.add('red');
  } else if (current.uvi >= 6 && current.uvi < 7) {
    uvi.classList.add('orange');
  } else if (current.uvi >= 3 && current.uvi < 5) {
    uvi.classList.add('yellow');
  } else if (current.uvi >= 0 && current.uvi < 2) {
    uvi.classList.add('green');
  }
  uvi.classList.add('uvi');
  uvDiv.classList.add('uvDiv');

  uvDiv.appendChild(uvi);



}

// display 5 day forecast
function forecast(daily) {


  for (i = 0; i < 5; i++) {

    fiveDayEl.classList.remove('hide');
    
    var dayEl = document.createElement('div');
    dayEl.classList.add('forecast', 'col-2', 'dayEl');

    var forecastDate = document.createElement('h5');
    forecastDate.innerHTML = moment().add(i + 1, 'days').calendar();
    dayEl.appendChild(forecastDate);
    forecastDate.setAttribute("style", "font-weight: bolder");

    var temp = document.createElement('p');
    temp.innerHTML = "Temp:" + " " + daily[i].temp.day + "℉";
    dayEl.appendChild(temp);

    var wind = document.createElement('p');
    wind.innerHTML = "Wind:" + " " + daily[i].wind_speed + "MPH";
    dayEl.appendChild(wind);

    var humidity = document.createElement('p');
    humidity.innerHTML = "Humidity:" + " " + daily[i].humidity + "%";
    dayEl.appendChild(humidity);

    var iconDisplay = document.createElement('img');
    iconDisplay.setAttribute('src', `http://openweathermap.org/img/wn/${daily[i].weather[0].icon}@2x.png`);
    dayEl.appendChild(iconDisplay);

    forecastEl.appendChild(dayEl);
  }
}



searchBtn.addEventListener('click', inputHandler);


// clear the content in containers when new city is searched
// push to local storage to create a button for searched city



