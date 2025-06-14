// src/components/CurrentWeather.js
import { AnimatePresence, motion } from "framer-motion";
import {
  FiAlertTriangle,
  FiCloudSnow,
  FiDroplet,
  FiEye,
  FiHeart,
  FiSun,
  FiSunrise,
  FiSunset,
  FiThermometer,
  FiUmbrella,
  FiWind,
} from "react-icons/fi";
import {
  WiBarometer,
  WiCloud,
  WiCloudy,
  WiDayCloudy,
  WiDaySunny,
  WiFog,
  WiHumidity,
  WiNightClear,
  WiRain,
  WiSnow,
  WiStrongWind,
  WiThunderstorm,
} from "react-icons/wi";
import { useWeather } from "../contexts/WeatherContext";
import WeatherDetail from "./WeatherDetail";

const RainAnimation = () => (
  <div className="rain-container absolute inset-0 overflow-hidden pointer-events-none z-0">
    {[...Array(60)].map((_, i) => (
      <motion.div
        key={i}
        className="raindrop absolute bg-blue-400/70 rounded-full"
        initial={{ y: -20, opacity: 0 }}
        animate={{
          y: [0, 150],
          opacity: [0.8, 0],
          x: Math.sin(i * 0.5) * 8,
        }}
        transition={{
          duration: Math.random() * 0.8 + 0.4,
          repeat: Infinity,
          delay: Math.random() * 3,
          ease: "linear",
        }}
        style={{
          left: `${Math.random() * 100}%`,
          width: `${Math.random() * 4 + 2}px`,
          height: `${Math.random() * 14 + 8}px`,
        }}
      />
    ))}
  </div>
);

const SnowAnimation = () => (
  <div className="snow-container absolute inset-0 overflow-hidden pointer-events-none z-0">
    {[...Array(40)].map((_, i) => (
      <motion.div
        key={i}
        className="snowflake absolute bg-white/90 rounded-full"
        initial={{ y: -20, opacity: 0 }}
        animate={{
          y: [0, 150],
          opacity: [1, 0],
          x: Math.sin(i * 0.5) * 15,
          rotate: Math.random() * 360,
        }}
        transition={{
          duration: Math.random() * 8 + 5,
          repeat: Infinity,
          delay: Math.random() * 5,
          ease: "linear",
        }}
        style={{
          left: `${Math.random() * 100}%`,
          width: `${Math.random() * 8 + 4}px`,
          height: `${Math.random() * 8 + 4}px`,
        }}
      />
    ))}
  </div>
);

const FogAnimation = () => (
  <div className="fog-container absolute inset-0 overflow-hidden pointer-events-none z-0">
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        className="fog-layer absolute bg-gray-300/30 h-full"
        initial={{ x: -150, opacity: 0 }}
        animate={{
          x: [0, 150],
          opacity: [0.3, 0],
        }}
        transition={{
          duration: Math.random() * 30 + 20,
          repeat: Infinity,
          delay: Math.random() * 20,
          ease: "linear",
        }}
        style={{
          width: `${Math.random() * 120 + 80}%`,
          filter: "blur(15px)",
        }}
      />
    ))}
  </div>
);

const CloudAnimation = () => (
  <div className="cloud-container absolute inset-0 overflow-hidden pointer-events-none z-0">
    {[...Array(3)].map((_, i) => (
      <motion.div
        key={i}
        className="cloud absolute bg-white/50 dark:bg-gray-500/50 rounded-full"
        initial={{ x: -100, opacity: 0 }}
        animate={{
          x: [0, 200],
          opacity: [0.5, 0],
        }}
        transition={{
          duration: Math.random() * 40 + 30,
          repeat: Infinity,
          delay: Math.random() * 10,
          ease: "linear",
        }}
        style={{
          top: `${Math.random() * 50 + 10}%`,
          width: `${Math.random() * 80 + 40}px`,
          height: `${Math.random() * 40 + 20}px`,
          filter: "blur(10px)",
        }}
      />
    ))}
  </div>
);

const WeatherAdvice = ({
  weatherCode,
  temp,
  humidity,
  uvIndex,
  windSpeed,
  unit,
}) => {
  const getWeatherAdvice = () => {
    const tempC = unit === "celsius" ? temp : ((temp - 32) * 5) / 9;
    const advice = [];

    // Temperature-based advice
    if (tempC > 30) {
      advice.push({
        icon: <FiThermometer className="text-red-500" size={20} />,
        message: "It's hot out there! Stay hydrated and wear light colors 🌡️",
        bgColor:
          "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700",
      });
    } else if (tempC < 5) {
      advice.push({
        icon: <FiCloudSnow className="text-blue-500" size={20} />,
        message: "Bundle up! It's freezing cold - wear warm layers 🧥",
        bgColor:
          "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700",
      });
    } else if (tempC < 15) {
      advice.push({
        icon: <FiThermometer className="text-blue-400" size={20} />,
        message: "A bit chilly today - consider bringing a jacket! 🧥",
        bgColor:
          "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700",
      });
    }

    // Weather condition-based advice
    if (weatherCode >= 1063 && weatherCode <= 1264) {
      advice.push({
        icon: <FiUmbrella className="text-blue-600" size={20} />,
        message: "Don't forget your umbrella! It's raining ☔",
        bgColor:
          "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700",
      });
    }

    if (weatherCode >= 1204 && weatherCode <= 1237) {
      advice.push({
        icon: <FiCloudSnow className="text-cyan-500" size={20} />,
        message: "Snow day vibes! Drive carefully and wear warm boots ❄️",
        bgColor:
          "bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-700",
      });
    }

    if (weatherCode === 1030 || weatherCode === 1135 || weatherCode === 1147) {
      advice.push({
        icon: <FiEye className="text-gray-500" size={20} />,
        message: "Foggy conditions ahead - drive slowly and use headlights 🌫️",
        bgColor:
          "bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-700",
      });
    }

    if (weatherCode >= 1273 && weatherCode <= 1282) {
      advice.push({
        icon: <FiAlertTriangle className="text-purple-600" size={20} />,
        message: "Thunderstorm alert! Stay indoors and avoid open areas ⛈️",
        bgColor:
          "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-700",
      });
    }

    if (weatherCode === 1000) {
      advice.push({
        icon: <FiSun className="text-yellow-500" size={20} />,
        message:
          "Perfect weather for outdoor activities! Enjoy the sunshine ☀️",
        bgColor:
          "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-700",
      });
    }

    // UV Index advice
    if (uvIndex > 7) {
      advice.push({
        icon: <FiSun className="text-orange-500" size={20} />,
        message: "High UV levels! Don't forget sunscreen and sunglasses 🕶️",
        bgColor:
          "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-700",
      });
    }

    // Wind advice
    if (windSpeed > 40) {
      advice.push({
        icon: <FiWind className="text-teal-500" size={20} />,
        message:
          "Very windy today! Hold onto your hat and be careful with umbrellas 💨",
        bgColor:
          "bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-700",
      });
    }

    // Humidity advice
    if (humidity > 80) {
      advice.push({
        icon: <FiDroplet className="text-blue-400" size={20} />,
        message: "High humidity - it might feel muggy out there! 💧",
        bgColor:
          "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700",
      });
    }

    // Default positive message if no specific conditions
    if (advice.length === 0) {
      advice.push({
        icon: <FiHeart className="text-pink-500" size={20} />,
        message: "Great weather day! Perfect for whatever you have planned 😊",
        bgColor:
          "bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-700",
      });
    }

    return advice;
  };

  const adviceList = getWeatherAdvice();

  return (
    <motion.div
      className="weather-advice mt-14 mb-14 space-y-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2 }}
    >
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
        <FiHeart className="text-pink-500" />
        Weather Tips for You
      </h3>
      {adviceList.map((advice, index) => (
        <motion.div
          key={index}
          className={`p-4 rounded-xl border-2 ${advice.bgColor} backdrop-blur-sm`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.3 + index * 0.1 }}
          whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
        >
          <div className="flex items-center gap-3">
            {advice.icon}
            <p className="text-gray-700 dark:text-gray-200 font-medium">
              {advice.message}
            </p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

const CurrentWeather = () => {
  const { weatherData, unit } = useWeather();

  if (!weatherData) return null;

  const { current, location, forecast } = weatherData;

  const getWeatherIcon = () => {
    const code = current.condition.code;
    const isDay = current.is_day === 1;

    if (code === 1000)
      return isDay ? (
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 10, 0] }}
          transition={{
            repeat: Infinity,
            duration: 8,
            ease: "easeInOut",
          }}
        >
          <WiDaySunny className="text-yellow-400 drop-shadow-lg" size={140} />
        </motion.div>
      ) : (
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{
            repeat: Infinity,
            duration: 6,
            ease: "easeInOut",
          }}
        >
          <WiNightClear className="text-indigo-300 drop-shadow-lg" size={140} />
        </motion.div>
      );
    if (code === 1003 || code === 1006 || code === 1009)
      return (
        <motion.div
          animate={{ x: [-5, 5, -5], y: [0, -3, 0] }}
          transition={{
            repeat: Infinity,
            duration: 12,
            ease: "easeInOut",
          }}
        >
          <WiDayCloudy className="text-gray-500 drop-shadow-lg" size={140} />
        </motion.div>
      );
    if (code === 1030 || code === 1135 || code === 1147)
      return (
        <motion.div
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ repeat: Infinity, duration: 5 }}
        >
          <WiFog className="text-gray-400 drop-shadow-lg" size={140} />
        </motion.div>
      );
    if (code >= 1063 && code <= 1201)
      return <WiRain className="text-blue-500 drop-shadow-lg" size={140} />;
    if (code >= 1204 && code <= 1237)
      return <WiSnow className="text-blue-200 drop-shadow-lg" size={140} />;
    if (code >= 1240 && code <= 1264)
      return <WiRain className="text-blue-500 drop-shadow-lg" size={140} />;
    if (code >= 1273 && code <= 1282)
      return (
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          <WiThunderstorm
            className="text-purple-600 drop-shadow-lg"
            size={140}
          />
        </motion.div>
      );
    return <WiCloudy className="text-gray-500 drop-shadow-lg" size={140} />;
  };

  const getWeatherAnimation = () => {
    const code = current.condition.code;

    if (code >= 1063 && code <= 1264) return <RainAnimation />;
    if (code >= 1204 && code <= 1237) return <SnowAnimation />;
    if (code === 1030 || code === 1135 || code === 1147)
      return <FogAnimation />;
    if (code === 1003 || code === 1006 || code === 1009)
      return <CloudAnimation />;
    return null;
  };

  const temp = unit === "celsius" ? current.temp_c : current.temp_f;
  const feelsLike =
    unit === "celsius" ? current.feelslike_c : current.feelslike_f;
  // Simulate AQI if not available
  const airQuality =
    current.air_quality?.["us-epa-index"] || Math.floor(Math.random() * 6);
  const sunrise = forecast?.forecastday[0]?.astro?.sunrise || "06:00 AM";
  const sunset = forecast?.forecastday[0]?.astro?.sunset || "06:00 PM";
  const cloudCover = current.cloud || Math.floor(Math.random() * 100);
  const gustSpeed = current.gust_kph || current.wind_kph * 1.5;

  return (
    <motion.div
      className="relative overflow-hidden bg-transparent backdrop-blur-lg p-6 md:p-8 w-full max-w-7xl mx-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <AnimatePresence>{getWeatherAnimation()}</AnimatePresence>

      <div className="location relative z-10 mb-10">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white text-center tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {location.name}, {location.country}
        </motion.h2>
        <motion.p
          className="text-sm md:text-base text-gray-500 dark:text-gray-300 text-center mt-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Updated: {new Date(current.last_updated).toLocaleString()}
        </motion.p>
      </div>

      <div className="weather-main relative z-10 flex flex-col md:flex-row items-center justify-between gap-10 mb-12">
        <motion.div
          className="flex flex-col items-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.5,
          }}
          whileHover={{ scale: 1.05 }}
        >
          {getWeatherIcon()}
          <motion.p
            className="text-xl md:text-2xl font-semibold text-gray-600 dark:text-gray-200 capitalize mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {current.condition.text}
          </motion.p>
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="flex items-end justify-center">
            <span className="text-7xl md:text-8xl font-extrabold text-gray-800 dark:text-white">
              {Math.round(temp)}
            </span>
            <span className="text-4xl md:text-5xl font-medium text-gray-600 dark:text-gray-300 mb-3">
              °{unit === "celsius" ? "C" : "F"}
            </span>
          </div>
          <motion.p
            className="text-lg md:text-xl text-gray-500 dark:text-gray-300 mt-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Feels like: {Math.round(feelsLike)}°{unit === "celsius" ? "C" : "F"}
          </motion.p>
        </motion.div>
      </div>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        {[
          {
            icon: <WiHumidity className="text-blue-600" size={32} />,
            title: "Humidity",
            value: `${current.humidity}%`,
            tooltip: "Relative humidity in the air",
          },
          {
            icon: <WiStrongWind className="text-blue-500" size={32} />,
            title: "Wind",
            value: `${current.wind_kph} km/h`,
            extra: `${current.wind_dir} (Gust: ${Math.round(gustSpeed)} km/h)`,
            tooltip: "Wind speed and direction with gust speed",
          },
          {
            icon: <FiSun className="text-yellow-500" size={32} />,
            title: "UV Index",
            value: current.uv,
            extra: getUVIndexLevel(current.uv),
            tooltip: "Ultraviolet radiation intensity",
          },
          {
            icon: <WiBarometer className="text-indigo-600" size={32} />,
            title: "Pressure",
            value: `${current.pressure_mb} mb`,
            tooltip: "Atmospheric pressure",
          },
          {
            icon: <FiDroplet className="text-blue-400" size={32} />,
            title: "Precipitation",
            value: `${current.precip_mm} mm`,
            tooltip: "Amount of precipitation",
          },
          {
            icon: <FiEye className="text-gray-600" size={32} />,
            title: "Visibility",
            value: `${current.vis_km} km`,
            tooltip: "Distance of clear visibility",
          },
          {
            icon: <WiCloud className="text-gray-500" size={32} />,
            title: "Cloud Cover",
            value: `${cloudCover}%`,
            tooltip: "Percentage of sky covered by clouds",
          },
          {
            icon: <FiWind className="text-teal-500" size={32} />,
            title: "Air Quality",
            value: airQuality,
            extra: getAirQualityLevel(airQuality),
            tooltip: "Air quality index based on US EPA standards",
          },
          {
            icon: <FiSunrise className="text-orange-500" size={32} />,
            title: "Sunrise",
            value: sunrise,
            tooltip: "Time of sunrise",
          },
          {
            icon: <FiSunset className="text-purple-500" size={32} />,
            title: "Sunset",
            value: sunset,
            tooltip: "Time of sunset",
          },
        ].map((detail, index) => (
          <motion.div
            key={detail.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 + index * 0.1 }}
            className="group relative"
          >
            <WeatherDetail
              icon={detail.icon}
              title={detail.title}
              value={detail.value}
              extra={detail.extra}
            />
            <div className="absolute hidden group-hover:block -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 z-20">
              {detail.tooltip}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Weather Advice Section */}
      <WeatherAdvice
        weatherCode={current.condition.code}
        temp={temp}
        humidity={current.humidity}
        uvIndex={current.uv}
        windSpeed={current.wind_kph}
        unit={unit}
      />
    </motion.div>
  );
};

const getUVIndexLevel = (uv) => {
  if (uv <= 2) return "Low";
  if (uv <= 5) return "Moderate";
  if (uv <= 7) return "High";
  if (uv <= 10) return "Very High";
  return "Extreme";
};

const getAirQualityLevel = (aqi) => {
  if (aqi <= 1) return "Good";
  if (aqi <= 2) return "Moderate";
  if (aqi <= 3) return "Unhealthy for Sensitive Groups";
  if (aqi <= 4) return "Unhealthy";
  if (aqi <= 5) return "Very Unhealthy";
  return "Hazardous";
};

export default CurrentWeather;
