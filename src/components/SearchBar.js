// src/components/SearchBar.js
import { motion } from "framer-motion";
import { useState } from "react";
import { FiNavigation, FiSearch } from "react-icons/fi";
import { useWeather } from "../contexts/WeatherContext";
import useGeolocation from "../hooks/useGeolocation";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const { fetchWeather } = useWeather();
  const { coords, isGeolocationAvailable, isGeolocationEnabled, getPosition } =
    useGeolocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      fetchWeather(query);
      setQuery("");
    }
  };

  const handleGeolocation = () => {
    if (isGeolocationAvailable && isGeolocationEnabled && coords) {
      fetchWeather(`${coords.latitude},${coords.longitude}`);
    } else {
      getPosition();
      if (coords) {
        fetchWeather(`${coords.latitude},${coords.longitude}`);
      }
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="relative flex-1 max-w-xl"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="relative flex items-center">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="h-5 w-5 text-gray-500 dark:text-gray-300" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a city..."
          className="block w-full pl-10 pr-12 py-2 border border-gray-200 dark:border-gray-700 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200"
          aria-label="Search for a city"
        />
        <button
          type="button"
          onClick={handleGeolocation}
          disabled={!isGeolocationAvailable}
          title={
            !isGeolocationAvailable
              ? "Geolocation not available"
              : "Use my location"
          }
          aria-label="Use my location"
          className={`absolute right-2 inset-y-0 flex items-center pr-2 ${
            !isGeolocationAvailable
              ? "text-gray-400 dark:text-gray-500 cursor-not-allowed"
              : "text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
          } transition-colors duration-200`}
        >
          <FiNavigation className="h-5 w-5" />
        </button>
      </div>
    </motion.form>
  );
};

export default SearchBar;
