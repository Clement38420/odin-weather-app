const VISUAL_CROSSING_API_KEY = "SS9Y6VJ23PJ46ZFSVAQ7ARBCF";
const GIPHY_API_KEY = "7Xtr62UwpOXqjueVijtlHHrPHMGf20j6";

function formatWeather(data) {
  data.currentConditions.fullName = data.resolvedAddress;
  return data.currentConditions;
}

async function getLocatedWeather(location) {
  let data = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${VISUAL_CROSSING_API_KEY}&unitGroup=metric`,
    { mode: "cors" },
  );
  data = await data.json();
  return formatWeather(data);
}

function formatGif(data) {
  return data.data.images.original.url;
}

async function getRelatedGif(prompt) {
  let data = await fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=${GIPHY_API_KEY}&s=${prompt}`,
    { mode: "cors" },
  );
  data = await data.json();
  return formatGif(data);
}

export { getLocatedWeather, getRelatedGif };
