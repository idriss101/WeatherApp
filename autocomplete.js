// let APIKEY = "fcf9827d9e09bf4ed16d689aab56d4dd";

// autoComplete.js on typing event emitter
const x = document
  .querySelector("#autoComplete")
  .addEventListener("autoComplete", (event) => {
    // console.log(event.target);
  });
// The autoComplete.js Engine instance creator
const autoCompletejs = new autoComplete({
  data: {
    src: () => {
      // Loading placeholder text
      const data = ["Montreal", "London", "New York", "Chicago"];
      return data;
    },
    cache: false,
  },
  sort: (a, b) => {
    if (a.match < b.match) return -1;
    if (a.match > b.match) return 1;
    return 0;
  },
  placeHolder: "Enter a City",
  selector: "#autoComplete",
  threshold: 0,
  debounce: 0,
  searchEngine: "strict",
  highlight: true,
  maxResults: 5,
  resultsList: {
    render: true,
    container: (source) => {
      source.setAttribute("id", "autoComplete_list");
    },
    destination: document.querySelector("#search-items"),
    position: "afterbegin",
    element: "ul",
  },
  resultItem: {
    content: (data, source) => {
      source.innerHTML = data.match;
      source.setAttribute("id", "autocomplete-item");
    },
    element: "li",
  },
  noResults: () => {
    const result = document.createElement("li");
    result.setAttribute("class", "no_result");
    result.setAttribute("tabindex", "1");
    result.innerHTML = "No Results";
    document.querySelector("#autoComplete_list").appendChild(result);
  },
  onSelection: (feedback) => {
    const selection = feedback.selection.value;
    document.querySelector("#autoComplete").value = selection;
    const city = selection;
    let URL = `api.openweathermap.org/data/2.5/weather?q=${selection}&appid=${APIKEY}`;

    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${selection}&units=metric&appid=${APIKEY}`
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
        weatherDescription.textContent = res.data.weather[0].main;
        console.log(res.data);
      });

    console.log(feedback);
  },
});
