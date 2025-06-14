// src/contexts/WeatherContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentWeather, getForecast } from "../services/WeatherAPI";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState("celsius");
  const [theme, setTheme] = useState("dark");

  const fetchWeather = async (query = "Colombo") => {
    setLoading(true);
    setError(null);
    try {
      const [current, forecast] = await Promise.all([
        getCurrentWeather(query),
        getForecast(query),
      ]);
      setWeatherData(current);
      setForecastData(forecast);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleUnit = () => {
    setUnit((prev) => (prev === "celsius" ? "fahrenheit" : "celsius"));
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    // Apply 'dark' class to <html> for Tailwind dark mode
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        forecastData,
        loading,
        error,
        unit,
        theme,
        fetchWeather,
        toggleUnit,
        toggleTheme,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => useContext(WeatherContext);
