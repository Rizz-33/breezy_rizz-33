import axios from "axios";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = "https://api.weatherapi.com/v1";

export const getCurrentWeather = async (query) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/current.json?key=${API_KEY}&q=${query}&aqi=no`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error?.message || "Failed to fetch weather data"
    );
  }
};

export const getForecast = async (query, days = 5) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/forecast.json?key=${API_KEY}&q=${query}&days=${days}&aqi=no&alerts=no`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error?.message || "Failed to fetch forecast data"
    );
  }
};
