let APIKEY = "fcf9827d9e09bf4ed16d689aab56d4dd";
const search = document.querySelector("#search");
const cityName = document.querySelector("h2");
const currentTemp = document.querySelector("#current");
const minTemp = document.querySelector("#min");
const maxTemp = document.querySelector("#max");
const atmosPressure = document.querySelector("#pressure");
const humidity = document.querySelector("#humidity");
const wind = document.querySelector("#wind");
const weatherIcon = document.querySelector("#weather-icon");
const autocompleteItem = document.querySelector("#autocomplete-item");
const weatherDescription = document.querySelector("h3");
const forecastBtn = document.querySelector("#forecast-btn");
const currentContent = document.querySelector(".main-content-current");

const celcius = String.fromCharCode(8451);

function getLocation() {
  let loader = ` <div class="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div> `;
  currentContent.innerHTML = loader;
  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position);
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${APIKEY}`
      )
      .then((res) => {
        currentContent.innerHTML = `<h2>${res.data.name}</h2>
            <img src="${`./icons/${res.data.weather[0].icon}.png`}" alt="" id="weather-icon" />
            <h3>${res.data.weather[0].main}</h3>
            <ul>
              <li>
                <p>
                  Current Temperature: <span id="current" class="data">${`${Math.round(
                    res.data.main.temp
                  )} ${celcius} `}</span>
                </p>
              </li>
              <li>
                <p>Min Temperature: <span id="min" class="data">${`${Math.round(
                  res.data.main.temp_min
                )} ${celcius}`}</span></p>
              </li>
              <li>
                <p>Max Temperature: <span id="max" class="data">${`${Math.round(
                  res.data.main.temp_max
                )} ${celcius}`}</span></p>
              </li>
              <li>
                <p>
                  Atmospheric pressure: <span id="pressure" class="data">${`${res.data.main.pressure} hPa`}</span>
                </p>
              </li>
              <li>
                <p>Humidity: <span id="humidity" class="data">${`${res.data.main.humidity}%`}</span></p>
              </li>
              <li>
                <p>Wind: <span id="wind" class="data">${`${res.data.wind.speed} km/h, SW`}</span></p>
              </li>
            </ul>
        `;
      });
  });
}

getLocation();

search.addEventListener("submit", (e) => {
  e.preventDefault();
  e.stopImmediatePropagation();
  const city = e.target[0].value;
  let URL = `api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}`;

  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKEY}`
    )
    .then((res) => {
      currentContent.innerHTML = `<h2>${res.data.name}</h2>
            <img src="${`./icons/${res.data.weather[0].icon}.png`}" alt="" id="weather-icon" />
            <h3>${res.data.weather[0].main}</h3>
            <ul>
              <li>
                <p>
                  Current Temperature: <span id="current" class="data">${`${Math.round(
                    res.data.main.temp
                  )} ${celcius} `}</span>
                </p>
              </li>
              <li>
                <p>Min Temperature: <span id="min" class="data">${`${Math.round(
                  res.data.main.temp_min
                )} ${celcius}`}</span></p>
              </li>
              <li>
                <p>Max Temperature: <span id="max" class="data">${`${Math.round(
                  res.data.main.temp_max
                )} ${celcius}`}</span></p>
              </li>
              <li>
                <p>
                  Atmospheric pressure: <span id="pressure" class="data">${`${res.data.main.pressure} hPa`}</span>
                </p>
              </li>
              <li>
                <p>Humidity: <span id="humidity" class="data">${`${res.data.main.humidity}%`}</span></p>
              </li>
              <li>
                <p>Wind: <span id="wind" class="data">${`${res.data.wind.speed} km/h, SW`}</span></p>
              </li>
            </ul>
        `;
    });
});
