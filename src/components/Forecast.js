// src/components/Forecast.js
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import {
  FiCalendar,
  FiChevronLeft,
  FiChevronRight,
  FiClock,
  FiDroplet,
  FiUmbrella,
  FiWind,
} from "react-icons/fi";
import {
  WiBarometer,
  WiCloudy,
  WiDayCloudy,
  WiDaySunny,
  WiFog,
  WiRain,
  WiSnow,
  WiSunrise,
  WiSunset,
  WiThunderstorm,
} from "react-icons/wi";
import { useWeather } from "../contexts/WeatherContext";

const Forecast = () => {
  const { forecastData, unit } = useWeather();
  const [currentView, setCurrentView] = useState("week");
  const [currentDate, setCurrentDate] = useState(new Date());

  // Generate extended forecast data with proper error handling
  const generateExtendedForecast = useMemo(() => {
    if (!forecastData || !forecastData.forecast) return [];

    const { forecast } = forecastData;
    const extendedData = [];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30); // Start 30 days ago

    for (let i = 0; i < 365; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);

      // Use actual forecast data if available, otherwise simulate
      const actualForecast = forecast.forecastday?.find(
        (day) => new Date(day.date).toDateString() === date.toDateString()
      );

      if (actualForecast) {
        extendedData.push(actualForecast);
      } else {
        // Simulate more detailed weather data with fallbacks
        const conditions = [
          {
            code: 1000,
            text: "Sunny",
            temp: [20, 25],
            wind: [5, 10],
            humidity: [40, 60],
            uv: [5, 7],
          },
          {
            code: 1003,
            text: "Partly cloudy",
            temp: [18, 23],
            wind: [10, 15],
            humidity: [50, 70],
            uv: [4, 6],
          },
          {
            code: 1006,
            text: "Cloudy",
            temp: [15, 20],
            wind: [8, 12],
            humidity: [60, 80],
            uv: [3, 5],
          },
          {
            code: 1063,
            text: "Light rain",
            temp: [12, 18],
            wind: [12, 18],
            humidity: [70, 90],
            uv: [2, 4],
          },
          {
            code: 1030,
            text: "Foggy",
            temp: [10, 15],
            wind: [3, 8],
            humidity: [85, 95],
            uv: [1, 3],
          },
          {
            code: 1114,
            text: "Snow",
            temp: [-5, 0],
            wind: [10, 15],
            humidity: [70, 85],
            uv: [2, 4],
          },
          {
            code: 1087,
            text: "Thunderstorm",
            temp: [15, 22],
            wind: [20, 30],
            humidity: [75, 90],
            uv: [3, 5],
          },
        ];

        const randomCondition =
          conditions[Math.floor(Math.random() * conditions.length)];
        const baseTemp =
          randomCondition.temp[0] +
          Math.random() * (randomCondition.temp[1] - randomCondition.temp[0]);
        const windSpeed =
          randomCondition.wind[0] +
          Math.random() * (randomCondition.wind[1] - randomCondition.wind[0]);
        const humidity =
          randomCondition.humidity[0] +
          Math.random() *
            (randomCondition.humidity[1] - randomCondition.humidity[0]);
        const uvIndex =
          randomCondition.uv[0] +
          Math.random() * (randomCondition.uv[1] - randomCondition.uv[0]);
        const pressure = 1000 + Math.random() * 30;

        // Generate hourly data with fallbacks
        const hourlyData = [];
        for (let h = 0; h < 24; h++) {
          const hourTemp = baseTemp + Math.sin((h * Math.PI) / 12) * 5; // Simulate daily temperature curve
          hourlyData.push({
            time: `${h}:00`.padStart(5, "0"), // Ensure format like "09:00"
            temp_c: hourTemp,
            temp_f: (hourTemp * 9) / 5 + 32,
            condition: {
              code: randomCondition.code,
              text: randomCondition.text,
            },
            wind_kph: windSpeed + Math.random() * 5,
            wind_degree: Math.floor(Math.random() * 360),
            humidity: Math.min(
              100,
              Math.max(0, humidity + (Math.random() * 10 - 5))
            ),
            cloud: Math.floor(Math.random() * 100),
            feelslike_c: hourTemp + (Math.random() * 2 - 1),
            feelslike_f: ((hourTemp + (Math.random() * 2 - 1)) * 9) / 5 + 32,
            chance_of_rain:
              randomCondition.code === 1063
                ? 30 + Math.random() * 70
                : Math.random() * 30,
            chance_of_snow:
              randomCondition.code === 1114
                ? 30 + Math.random() * 70
                : Math.random() * 10,
            uv: uvIndex * (1 - Math.abs(h - 12) / 12), // UV peaks at noon
          });
        }

        extendedData.push({
          date: date.toISOString().split("T")[0],
          day: {
            condition: {
              code: randomCondition.code,
              text: randomCondition.text,
            },
            maxtemp_c: baseTemp + Math.random() * 5,
            mintemp_c: baseTemp - Math.random() * 5,
            maxtemp_f: ((baseTemp + Math.random() * 5) * 9) / 5 + 32,
            mintemp_f: ((baseTemp - Math.random() * 5) * 9) / 5 + 32,
            avghumidity: humidity,
            daily_chance_of_rain:
              randomCondition.code === 1063
                ? 50 + Math.random() * 50
                : Math.random() * 30,
            daily_chance_of_snow:
              randomCondition.code === 1114
                ? 50 + Math.random() * 50
                : Math.random() * 10,
            maxwind_kph: windSpeed + 5,
            totalprecip_mm:
              randomCondition.code === 1063
                ? Math.random() * 10
                : Math.random() * 2,
            uv: uvIndex,
            avgvis_km:
              randomCondition.code === 1030
                ? 2 + Math.random() * 3
                : 8 + Math.random() * 4,
            pressure_mb: pressure,
            astro: {
              sunrise: "07:00 AM",
              sunset: "07:00 PM",
              moonrise: "12:00 PM",
              moonset: "12:00 AM",
              moon_phase: "Waxing Crescent",
              moon_illumination: Math.floor(Math.random() * 100),
            },
          },
          hour: hourlyData,
        });
      }
    }
    return extendedData;
  }, [forecastData]);

  if (!forecastData) return null;

  // View options
  const viewOptions = [
    { id: "day", label: "Day", icon: FiClock },
    { id: "week", label: "Week", icon: FiCalendar },
    { id: "month", label: "Month", icon: FiCalendar },
    { id: "year", label: "Year", icon: FiCalendar },
  ];

  const getDayIcon = (code, size = 36) => {
    const iconProps = { size };
    switch (code) {
      case 1000:
        return <WiDaySunny className="text-yellow-500" {...iconProps} />;
      case 1003:
      case 1006:
      case 1009:
        return <WiDayCloudy className="text-gray-500" {...iconProps} />;
      case 1030:
      case 1135:
      case 1147:
        return <WiFog className="text-gray-400" {...iconProps} />;
      case 1063:
      case 1072:
      case 1150:
      case 1153:
      case 1168:
      case 1171:
      case 1180:
      case 1183:
      case 1186:
      case 1189:
      case 1192:
      case 1195:
      case 1198:
      case 1201:
        return <WiRain className="text-blue-500" {...iconProps} />;
      case 1204:
      case 1207:
      case 1210:
      case 1213:
      case 1216:
      case 1219:
      case 1222:
      case 1225:
      case 1237:
        return <WiSnow className="text-blue-200" {...iconProps} />;
      case 1240:
      case 1243:
      case 1246:
      case 1249:
      case 1252:
      case 1255:
      case 1258:
      case 1261:
      case 1264:
        return <WiRain className="text-blue-500" {...iconProps} />;
      case 1273:
      case 1276:
      case 1279:
      case 1282:
        return <WiThunderstorm className="text-purple-600" {...iconProps} />;
      default:
        return <WiCloudy className="text-gray-500" {...iconProps} />;
    }
  };

  const formatDate = (date, format = "short") => {
    if (!date) return "";
    const options = {
      short: { weekday: "short", month: "short", day: "numeric" },
      long: { weekday: "long", month: "long", day: "numeric", year: "numeric" },
      dayOnly: { weekday: "short" },
      monthOnly: { month: "short" },
      yearOnly: { year: "numeric" },
    };
    return date.toLocaleDateString("en-US", options[format]);
  };

  // Navigation functions
  const navigateDate = (direction) => {
    const newDate = new Date(currentDate);
    switch (currentView) {
      case "day":
        newDate.setDate(newDate.getDate() + direction);
        break;
      case "week":
        newDate.setDate(newDate.getDate() + direction * 7);
        break;
      case "month":
        newDate.setMonth(newDate.getMonth() + direction);
        break;
      case "year":
        newDate.setFullYear(newDate.getFullYear() + direction);
        break;
      default:
        newDate.setDate(newDate.getDate() + direction);
    }
    setCurrentDate(newDate);
  };

  // Get data for current view with fallbacks
  const getCurrentViewData = () => {
    try {
      const currentDateStr = currentDate.toISOString().split("T")[0];
      const currentDateObj = new Date(currentDate);

      switch (currentView) {
        case "day":
          return (
            generateExtendedForecast.filter(
              (day) => day.date === currentDateStr
            ) || []
          );

        case "week":
          const weekStart = new Date(currentDateObj);
          weekStart.setDate(currentDateObj.getDate() - currentDateObj.getDay());
          const weekEnd = new Date(weekStart);
          weekEnd.setDate(weekStart.getDate() + 6);

          return (
            generateExtendedForecast.filter((day) => {
              const dayDate = new Date(day.date);
              return dayDate >= weekStart && dayDate <= weekEnd;
            }) || []
          );

        case "month":
          const monthStart = new Date(
            currentDateObj.getFullYear(),
            currentDateObj.getMonth(),
            1
          );
          const monthEnd = new Date(
            currentDateObj.getFullYear(),
            currentDateObj.getMonth() + 1,
            0
          );

          return (
            generateExtendedForecast.filter((day) => {
              const dayDate = new Date(day.date);
              return dayDate >= monthStart && dayDate <= monthEnd;
            }) || []
          );

        case "year":
          const yearStart = new Date(currentDateObj.getFullYear(), 0, 1);
          const yearEnd = new Date(currentDateObj.getFullYear(), 11, 31);

          return (
            generateExtendedForecast.filter((day) => {
              const dayDate = new Date(day.date);
              return dayDate >= yearStart && dayDate <= yearEnd;
            }) || []
          );

        default:
          return generateExtendedForecast.slice(0, 7);
      }
    } catch (error) {
      console.error("Error getting view data:", error);
      return [];
    }
  };

  const viewData = getCurrentViewData();

  // Temperature color gradient
  const getTempColor = (temp, isCelsius = true) => {
    const baseTemp = isCelsius ? temp : ((temp - 32) * 5) / 9;
    if (baseTemp < -10) return "bg-blue-900 text-white";
    if (baseTemp < 0) return "bg-blue-600 text-white";
    if (baseTemp < 10) return "bg-blue-400 text-white";
    if (baseTemp < 20) return "bg-green-400 text-white";
    if (baseTemp < 30) return "bg-yellow-400 text-gray-800";
    if (baseTemp < 35) return "bg-orange-500 text-white";
    return "bg-red-600 text-white";
  };

  // UV index color
  const getUvColor = (uv) => {
    if (uv < 3) return "bg-green-500";
    if (uv < 6) return "bg-yellow-500";
    if (uv < 8) return "bg-orange-500";
    if (uv < 11) return "bg-red-600";
    return "bg-purple-800";
  };

  // Render different view layouts with error handling
  const renderDayView = () => {
    const dayData = viewData[0];
    if (!dayData || !dayData.day)
      return (
        <div className="text-center py-8 text-gray-500">
          No weather data available for this day
        </div>
      );

    const hourlyData = dayData.hour || [];
    const currentHour = new Date().getHours();
    const currentHourData = hourlyData[currentHour] || hourlyData[0] || {};

    return (
      <div className="space-y-6">
        {/* Current weather summary */}
        <motion.div
          className="bg-gradient-to-r from-blue-500 to-blue-950 rounded-xl p-6 shadow-lg text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              {getDayIcon(dayData.day.condition?.code, 64)}
              <div>
                <h4 className="text-2xl font-bold">
                  {formatDate(new Date(dayData.date), "long")}
                </h4>
                <p className="text-lg capitalize">
                  {dayData.day.condition?.text || "N/A"}
                </p>
                {dayData.day.astro && (
                  <p className="text-sm flex items-center gap-2 mt-1">
                    <WiSunrise className="text-xl" />
                    {dayData.day.astro.sunrise || "N/A"} •{" "}
                    <WiSunset className="text-xl" />
                    {dayData.day.astro.sunset || "N/A"}
                  </p>
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end gap-2">
                <span className="text-5xl font-bold">
                  {Math.round(
                    unit === "celsius"
                      ? currentHourData.temp_c
                      : currentHourData.temp_f
                  )}
                  °
                </span>
                <div className="flex flex-col">
                  <span className="text-xl">
                    {Math.round(
                      unit === "celsius"
                        ? dayData.day.maxtemp_c
                        : dayData.day.maxtemp_f
                    )}
                    °
                  </span>
                  <span className="text-gray-200">
                    {Math.round(
                      unit === "celsius"
                        ? dayData.day.mintemp_c
                        : dayData.day.mintemp_f
                    )}
                    °
                  </span>
                </div>
              </div>
              <p className="text-sm">
                Feels like:{" "}
                {Math.round(
                  unit === "celsius"
                    ? currentHourData.feelslike_c
                    : currentHourData.feelslike_f
                )}
                °
              </p>
            </div>
          </div>

          {/* Weather stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <FiWind className="text-xl" />
                <span className="font-medium">Wind</span>
              </div>
              <p className="text-xl mt-1">
                {Math.round(currentHourData.wind_kph || 0)} km/h
              </p>
              <p className="text-xs opacity-80">
                {currentHourData.wind_degree || 0}°{" "}
                {currentHourData.wind_dir || "N"}
              </p>
            </div>
            <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <FiDroplet className="text-xl" />
                <span className="font-medium">Humidity</span>
              </div>
              <p className="text-xl mt-1">
                {Math.round(currentHourData.humidity || 0)}%
              </p>
            </div>
            <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <FiUmbrella className="text-xl" />
                <span className="font-medium">Precipitation</span>
              </div>
              <p className="text-xl mt-1">
                {Math.round(dayData.day.totalprecip_mm || 0)} mm
              </p>
              <p className="text-xs opacity-80">
                {Math.round(dayData.day.daily_chance_of_rain || 0)}% chance
              </p>
            </div>
            <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <WiBarometer className="text-xl" />
                <span className="font-medium">Pressure</span>
              </div>
              <p className="text-xl mt-1">
                {Math.round(dayData.day.pressure_mb || 0)} mb
              </p>
            </div>
          </div>
        </motion.div>
        {/* Hourly forecast */}
        <div className="bg-white/95 dark:bg-gray-700/95 rounded-xl p-6 shadow-sm">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Hourly Forecast
          </h4>
          {hourlyData.length > 0 ? (
            <div className="overflow-x-auto pb-2">
              <div className="flex gap-4">
                {hourlyData.map((hour, index) => {
                  // Parse hour from time string (format "HH:00")
                  const hourString = hour.time?.split(":")[0] || "0";
                  const hourNum = parseInt(hourString, 10);
                  const ampm = hourNum >= 12 ? "PM" : "AM";
                  const displayHour = hourNum % 12 || 12; // Convert to 12-hour format

                  return (
                    <motion.div
                      key={index}
                      className={`flex flex-col items-center p-3 rounded-lg min-w-[80px] ${
                        hourNum === currentHour
                          ? "bg-blue-100 dark:bg-blue-900/50 ring-2 ring-blue-500"
                          : "bg-gray-100/50 dark:bg-gray-600/50 hover:bg-gray-200 dark:hover:bg-gray-500/50"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {`${displayHour} ${ampm}`}
                      </p>
                      <div className="my-2">
                        {getDayIcon(hour.condition?.code, 24)}
                      </div>
                      <p className="text-lg font-bold text-gray-800 dark:text-white">
                        {Math.round(
                          unit === "celsius" ? hour.temp_c : hour.temp_f
                        )}
                        °
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {Math.round(hour.chance_of_rain || 0)}%
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500 py-4">
              No hourly data available
            </p>
          )}
        </div>
        {/* Additional weather details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* UV Index */}
          <div className="bg-white/95 dark:bg-gray-700/95 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h5 className="font-medium text-gray-800 dark:text-white">
                UV Index
              </h5>
              {dayData.day.uv ? (
                <div
                  className={`px-2 py-1 rounded-full text-xs font-bold ${getUvColor(
                    dayData.day.uv
                  )}`}
                >
                  {Math.round(dayData.day.uv)}
                </div>
              ) : null}
            </div>
            <div className="mt-2 h-2 bg-gradient-to-r from-green-500 via-yellow-500 to-red-600 rounded-full w-full" />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>Low</span>
              <span>Moderate</span>
              <span>High</span>
              <span>Very High</span>
              <span>Extreme</span>
            </div>
            <p className="text-sm mt-2 text-gray-600 dark:text-gray-300">
              {dayData.day.uv < 3
                ? "No protection needed"
                : dayData.day.uv < 6
                ? "Protection recommended"
                : dayData.day.uv < 8
                ? "Protection required"
                : "Extra protection needed"}
            </p>
          </div>

          {/* Sunrise & Sunset */}
          <div className="bg-white/95 dark:bg-gray-700/95 rounded-xl p-4 shadow-sm">
            <h5 className="font-medium text-gray-800 dark:text-white mb-3">
              Sun & Moon
            </h5>
            {dayData.day.astro ? (
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-full">
                    <WiSunrise className="text-2xl text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Sunrise
                    </p>
                    <p className="font-medium text-gray-800 dark:text-white">
                      {dayData.day.astro.sunrise || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full">
                    <WiSunset className="text-2xl text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Sunset
                    </p>
                    <p className="font-medium text-gray-800 dark:text-white">
                      {dayData.day.astro.sunset || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                    <WiDayCloudy className="text-2xl text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Moon Phase
                    </p>
                    <p className="font-medium capitalize text-gray-800 dark:text-white">
                      {dayData.day.astro.moon_phase || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded-full">
                    <WiDaySunny className="text-2xl text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Illumination
                    </p>
                    <p className="font-medium text-gray-800 dark:text-white">
                      {dayData.day.astro.moon_illumination || 0}%
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-500 py-2">
                No astronomical data available
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderWeekView = () => {
    if (viewData.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          No weather data available for this week
        </div>
      );
    }

    return (
      <div className="flex justify-center">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-2 md:gap-4 w-full">
          {viewData.map((day, index) => {
            if (!day || !day.day) return null;

            const isToday =
              new Date(day.date).toDateString() === new Date().toDateString();
            return (
              <motion.div
                key={day.date || index}
                className={`
                bg-white/95 dark:bg-gray-700/95 rounded-xl p-3 md:p-4 shadow-sm 
                hover:shadow-md transition-all duration-200 cursor-pointer
                ${isToday ? "ring-2 ring-blue-500" : ""}
                flex flex-col items-center text-center
              `}
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                onClick={() => {
                  setCurrentDate(new Date(day.date));
                  setCurrentView("day");
                }}
              >
                <p className="font-semibold text-gray-700 dark:text-gray-200 text-sm md:text-base">
                  {formatDate(new Date(day.date), "dayOnly")}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(day.date).getDate()}
                </p>
                <div className="my-2 md:my-4">
                  {getDayIcon(day.day.condition?.code, 32)}
                </div>
                <div className="flex items-center justify-center gap-1 text-xs md:text-sm">
                  <span className="font-bold text-gray-800 dark:text-white">
                    {Math.round(
                      unit === "celsius" ? day.day.maxtemp_c : day.day.maxtemp_f
                    )}
                    °
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    {Math.round(
                      unit === "celsius" ? day.day.mintemp_c : day.day.mintemp_f
                    )}
                    °
                  </span>
                </div>
                <div className="mt-2">
                  <div
                    className={`text-xs px-2 py-1 rounded-full ${
                      day.day.daily_chance_of_rain > 50
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-600/30 dark:text-gray-300"
                    }`}
                  >
                    {Math.round(day.day.daily_chance_of_rain || 0)}% rain
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderMonthView = () => {
    const monthData = viewData;
    const firstDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const weeks = [];
    let currentWeek = [];

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);

      const dayData = monthData.find(
        (d) => d && new Date(d.date).toDateString() === date.toDateString()
      );
      const isCurrentMonth = date.getMonth() === currentDate.getMonth();
      const isToday = date.toDateString() === new Date().toDateString();

      currentWeek.push({
        date,
        data: dayData,
        isCurrentMonth,
        isToday,
      });

      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    return (
      <div className="space-y-2">
        <div className="grid grid-cols-7 gap-2 mb-4">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="text-center text-sm font-semibold text-gray-600 dark:text-gray-300 p-2"
            >
              {day}
            </div>
          ))}
        </div>
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-7 gap-2">
            {week.map((day, dayIndex) => (
              <motion.div
                key={dayIndex}
                className={`
                bg-white/95 dark:bg-gray-700/95 rounded-lg p-2 shadow-sm 
                hover:shadow-md transition-all duration-200 cursor-pointer min-h-[100px]
                ${day.isCurrentMonth ? "" : "opacity-50"}
                ${day.isToday ? "ring-2 ring-blue-500" : ""}
              `}
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: (weekIndex * 7 + dayIndex) * 0.02 }}
                onClick={() => {
                  if (day.data) {
                    setCurrentDate(new Date(day.data.date));
                    setCurrentView("day");
                  }
                }}
              >
                <div className="flex flex-col h-full">
                  <p
                    className={`text-sm font-medium text-center ${
                      day.isCurrentMonth
                        ? "text-gray-800 dark:text-white"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {day.date.getDate()}
                  </p>
                  {day.data && (
                    <div className="flex-1 flex flex-col items-center justify-center gap-1 mt-1">
                      <div className="flex justify-center">
                        {getDayIcon(day.data.day?.condition?.code, 20)}
                      </div>
                      <div
                        className={`text-xs px-1 rounded ${getTempColor(
                          unit === "celsius"
                            ? day.data.day?.maxtemp_c
                            : day.data.day?.maxtemp_f,
                          unit === "celsius"
                        )}`}
                      >
                        {Math.round(
                          unit === "celsius"
                            ? day.data.day?.maxtemp_c || 0
                            : day.data.day?.maxtemp_f || 0
                        )}
                        °
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  const renderYearView = () => {
    const months = [];
    for (let i = 0; i < 12; i++) {
      const monthData = generateExtendedForecast.filter((day) => {
        const dayDate = new Date(day.date);
        return (
          dayDate.getFullYear() === currentDate.getFullYear() &&
          dayDate.getMonth() === i
        );
      });

      const avgTemp =
        monthData.length > 0
          ? monthData.reduce(
              (sum, day) =>
                sum +
                (unit === "celsius" ? day.day.maxtemp_c : day.day.maxtemp_f),
              0
            ) / monthData.length
          : 0;

      // Count weather conditions
      const conditionCounts = {};
      monthData.forEach((day) => {
        const condition = day.day.condition?.text;
        if (condition) {
          conditionCounts[condition] = (conditionCounts[condition] || 0) + 1;
        }
      });
      const mostCommonCondition =
        Object.entries(conditionCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ||
        "N/A";

      months.push({
        month: i,
        name: new Date(currentDate.getFullYear(), i, 1).toLocaleDateString(
          "en-US",
          { month: "long" }
        ),
        avgTemp: Math.round(avgTemp),
        mostCommonCondition,
        data: monthData,
      });
    }

    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {months.map((month, index) => (
          <motion.div
            key={month.month}
            className="bg-white/95 dark:bg-gray-700/95 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => {
              setCurrentDate(
                new Date(currentDate.getFullYear(), month.month, 1)
              );
              setCurrentView("month");
            }}
          >
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white text-center">
              {month.name}
            </h4>
            <div
              className={`text-center mt-2 p-2 rounded-lg ${getTempColor(
                month.avgTemp,
                unit === "celsius"
              )}`}
            >
              <span className="text-2xl font-bold">{month.avgTemp}°</span>
              <p className="text-sm">Avg High</p>
            </div>
            <div className="text-center mt-3">
              <p className="text-sm text-gray-600 dark:text-gray-300 capitalize">
                {month.mostCommonCondition}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {month.data.length} days data
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  const getViewTitle = () => {
    switch (currentView) {
      case "day":
        return formatDate(currentDate, "long");
      case "week":
        const weekStart = new Date(currentDate);
        weekStart.setDate(currentDate.getDate() - currentDate.getDay());
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        return `${formatDate(weekStart, "short")} - ${formatDate(
          weekEnd,
          "short"
        )}`;
      case "month":
        return currentDate.toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        });
      case "year":
        return currentDate.getFullYear().toString();
      default:
        return formatDate(currentDate, "long");
    }
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "day":
        return renderDayView();
      case "week":
        return renderWeekView();
      case "month":
        return renderMonthView();
      case "year":
        return renderYearView();
      default:
        return renderWeekView();
    }
  };

  return (
    <motion.div
      className="bg-transparent backdrop-blur-md p-6 w-full max-w-7xl mx-auto mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div className="flex items-center gap-4 justify-center md:justify-start">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">
            Weather Forecast
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateDate(-1)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label="Previous"
            >
              <FiChevronLeft className="w-4 h-4" />
            </button>
            <h4 className="text-lg font-medium text-gray-700 dark:text-gray-200 min-w-[200px] text-center">
              {getViewTitle()}
            </h4>
            <button
              onClick={() => navigateDate(1)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label="Next"
            >
              <FiChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* View Selector */}
        <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1 justify-center">
          {viewOptions.map((option) => {
            const Icon = option.icon;
            return (
              <motion.button
                key={option.id}
                onClick={() => setCurrentView(option.id)}
                className={`
                flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
                ${
                  currentView === option.id
                    ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                }
              `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-4 h-4" />
                {option.label}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentView}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderCurrentView()}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default Forecast;
