// src/components/WeatherCard.js
import { motion } from "framer-motion";
import { FiSun } from "react-icons/fi";
import {
  WiCloudy,
  WiDayCloudy,
  WiDaySunny,
  WiHumidity,
  WiRain,
  WiStrongWind,
} from "react-icons/wi";

const WeatherCard = ({ weatherData }) => {
  if (!weatherData) return null;

  const { current, location } = weatherData;

  const getWeatherIcon = () => {
    const condition = current.condition.text.toLowerCase();
    if (condition.includes("rain"))
      return <WiRain className="text-blue-500" size={80} />;
    if (condition.includes("cloud"))
      return <WiCloudy className="text-gray-500" size={80} />;
    if (condition.includes("sunny") || condition.includes("clear"))
      return (
        <motion.div
          animate={{ rotate: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
        >
          <WiDaySunny className="text-yellow-500" size={80} />
        </motion.div>
      );
    return <WiDayCloudy className="text-gray-500" size={80} />;
  };

  return (
    <motion.div
      className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-lg p-4 sm:p-6 w-full max-w-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Weather in {location.name}, {location.country}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-300">
          {new Date(current.last_updated).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      <div className="flex flex-col items-center mb-6">
        <div className="mb-2">{getWeatherIcon()}</div>
        <div className="flex items-center">
          <span className="text-5xl font-bold text-gray-800 dark:text-white mr-2">
            {current.temp_c}°
          </span>
          <span className="text-2xl text-gray-600 dark:text-gray-300">C</span>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-200 capitalize mt-2">
          {current.condition.text}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white/95 dark:bg-gray-700/95 rounded-lg p-3 shadow-sm flex flex-col items-center">
          <WiHumidity className="text-blue-600" size={28} />
          <span className="text-xs text-gray-500 dark:text-gray-300 mt-1">
            Humidity
          </span>
          <span className="font-semibold text-gray-700 dark:text-gray-100">
            {current.humidity}%
          </span>
        </div>
        <div className="bg-white/95 dark:bg-gray-700/95 rounded-lg p-3 shadow-sm flex flex-col items-center">
          <WiStrongWind className="text-blue-500" size={28} />
          <span className="text-xs text-gray-500 dark:text-gray-300 mt-1">
            Wind
          </span>
          <span className="font-semibold text-gray-700 dark:text-gray-100">
            {current.wind_kph} km/h
          </span>
        </div>
        <div className="bg-white/95 dark:bg-gray-700/95 rounded-lg p-3 shadow-sm flex flex-col items-center">
          <FiSun className="text-yellow-500" size={24} />
          <span className="text-xs text-gray-500 dark:text-gray-300 mt-1">
            UV Index
          </span>
          <span className="font-semibold text-gray-700 dark:text-gray-100">
            {current.uv}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherCard;
