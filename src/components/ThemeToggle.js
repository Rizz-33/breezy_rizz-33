// src/components/ThemeToggle.js
import { motion } from "framer-motion";
import { FiMoon, FiSun } from "react-icons/fi";
import { useWeather } from "../contexts/WeatherContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useWeather();

  return (
    <motion.button
      className={`relative w-12 h-6 rounded-full p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
        theme === "light"
          ? "bg-gray-200 hover:bg-gray-300"
          : "bg-gray-700 hover:bg-gray-600"
      }`}
      onClick={toggleTheme}
      whileTap={{ scale: 0.95 }}
      initial={false}
      animate={{
        transition: { duration: 0.3 },
      }}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      aria-label={`Toggle ${theme === "light" ? "dark" : "light"} mode`}
    >
      <motion.div
        className={`absolute top-1/2 w-5 h-5 rounded-full shadow-md flex items-center justify-center ${
          theme === "light"
            ? "left-1 bg-yellow-400 text-yellow-700"
            : "left-6 bg-gray-200 text-gray-800"
        }`}
        initial={false}
        animate={{
          x: theme === "light" ? 0 : 1,
          transition: {
            type: "spring",
            stiffness: 400,
            damping: 20,
          },
        }}
        style={{ y: "-50%" }}
      >
        {theme === "light" ? (
          <motion.div
            initial={{ rotate: 0, scale: 1 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <FiSun size={14} />
          </motion.div>
        ) : (
          <motion.div
            initial={{ rotate: 40, scale: 0.8 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <FiMoon size={14} />
          </motion.div>
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
