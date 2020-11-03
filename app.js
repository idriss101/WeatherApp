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
  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position);
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${APIKEY}`
      )
      .then((res) => {
        cityName.textContent = res.data.name;
        currentTemp.textContent = `${res.data.main.temp} ${celcius} `;
        minTemp.textContent = `${res.data.main.temp_min} ${celcius}`;
        maxTemp.textContent = `${res.data.main.temp_max} ${celcius}`;
        atmosPressure.textContent = `${res.data.main.pressure} hPa`;
        humidity.textContent = `${res.data.main.humidity}%`;
        wind.textContent = `${res.data.wind.speed} km/h, SW`;
        weatherIcon.src = `./icons/${res.data.weather[0].icon}.png`;
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
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKEY}`
    )
    .then((res) => {
      cityName.textContent = res.data.name;
      currentTemp.textContent = `${res.data.main.temp} ${celcius} `;
      minTemp.textContent = `${res.data.main.temp_min} ${celcius}`;
      maxTemp.textContent = `${res.data.main.temp_max} ${celcius}`;
      atmosPressure.textContent = `${res.data.main.pressure} hPa`;
      humidity.textContent = `${res.data.main.humidity}%`;
      wind.textContent = `${res.data.wind.speed} km/h, SW`;
      weatherIcon.src = `./icons/${res.data.weather[0].icon}.png`;
      console.log(res.data);
    });
});

forecastBtn.addEventListener("click", () => {
  currentContent.style.display = "none";
  forecastBtn.classList.add("selected");
});
