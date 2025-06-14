// src/components/WeatherDetail.js
import { motion } from "framer-motion";
import { memo } from "react";

const WeatherDetail = ({ icon, title, value, extra, compact = false }) => {
  return (
    <motion.div
      className={`flex items-center ${compact ? "gap-2" : "gap-3"}`}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className={`${compact ? "text-xl" : "text-2xl"}`}>{icon}</div>
      <div>
        <p
          className={`text-gray-500 dark:text-gray-400 ${
            compact ? "text-xs" : "text-sm"
          }`}
        >
          {title}
        </p>
        <div className="flex items-center gap-1">
          <p
            className={`font-medium text-gray-900 dark:text-white ${
              compact ? "text-sm" : "text-base"
            }`}
          >
            {value}
          </p>
          {extra && (
            <span className="text-xs text-gray-500 dark:text-gray-300">
              {extra}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default memo(WeatherDetail);
