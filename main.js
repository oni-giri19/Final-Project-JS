//The api key i needed from the website
let weather = {
  apiKey: "6cb7147d324fd880f15cf7506aa19f4d",
};
// Grabbing the input and outputs and saving them in variables
const cityInput = document.querySelector(".city-input");
const cityName = document.querySelector("#city-name");

const tempOutput = document.querySelector("#temperature");
const mainOutput = document.querySelector("#main");
const humidityOutput = document.querySelector("#humidity");
const pressureOutput = document.querySelector("#pressure");

const windOutput = document.querySelector("#wind");
const windDirectionOutput = document.querySelector("#wind-direction");
const cloudsOutput = document.querySelector("#clouds");
const countryOutput = document.querySelector("#country");

const citySearch = cityInput.value; //aq dawerils azri ar aqvs sanam raime qalaqi ar chaiwereba citySearch-shi
const weatherFetch = fetch(
  `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&units=metric&appid=${weather.apiKey}`
);
// Fetching the API
weatherFetch
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`HTTP error ${response.status}`);
    }
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error(`Error detected: ${error}`);
  });
//The onclick function that gives the search results
async function handleSearch() {
  const citySearch = cityInput.value;

  if (citySearch) {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&units=metric&appid=${weather.apiKey}`
    );
    const data = await response.json();
    cityName.innerHTML = `Weather in: ${citySearch}`;
    tempOutput.innerHTML = `${data.main.temp}°C`;
    mainOutput.innerHTML = `type: ${data.weather[0].main}`;
    humidityOutput.innerHTML = `humidity: ${data.main.humidity} %`;
    pressureOutput.innerHTML = `pressure: ${data.main.pressure} hPa`;

    windOutput.innerHTML = `wind: ${data.wind.speed} km/h`;
    windDirectionOutput.innerHTML = `direction: ${data.wind.deg}°`;
    cloudsOutput.innerHTML = `clouds: ${data.clouds.all} %`;
    countryOutput.innerHTML = `country: ${data.sys.country}`;
  } else {
    const alert = document.querySelector(".alert");
    alert.innerHTML = "Please enter a city name above";
    alert.style.display = "block"; // Show the alert message

    setTimeout(() => {
      alert.style.display = "none"; // Hide the alert message after 0.5 seconds
    }, 1500);
  }
}
// If enter key is pressed it will activate handleSearch()
document.querySelector(".city-input").addEventListener("keyup", (event) => {
  if (event.key == "Enter") {
    handleSearch();
  }
});
