import "./style.css";
import "./reset.css";
import { getRelatedGif, getLocatedWeather } from "./modules/API";

let weather;
let gifUrl;

function updatePage() {
  document.querySelector("img.gif").src = gifUrl;

  document.querySelector(".content").classList.remove("disabled");

  document.querySelector("#temp").textContent = weather.temp + "°C";
  document.querySelector("#feelslike").textContent = weather.feelslike + "°C";
  document.querySelector("#humidity").textContent = weather.humidity + "%";
  document.querySelector("#wind").textContent = weather.windspeed + "km/h";
  document.querySelector("#city").textContent = weather.fullName;
  document.querySelector("#description").textContent = weather.icon.replaceAll(
    "-",
    " ",
  );
}

async function submitLocation(e) {
  e.preventDefault();

  weather = await getLocatedWeather(getLocation());
  gifUrl = await getRelatedGif(weather.icon);

  updatePage();
}

function getLocation() {
  return document.querySelector("#location-input").value;
}

document
  .querySelector("#submit-input")
  .addEventListener("click", await submitLocation);
