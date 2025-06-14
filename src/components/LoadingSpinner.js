// src/components/LoadingSpinner.js
import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-4 p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="relative w-16 h-16">
        <motion.div
          className="absolute inset-0 border-4 border-blue-600 dark:border-blue-400 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute inset-2 border-4 border-blue-400 dark:border-blue-300 border-b-transparent rounded-full"
          animate={{ rotate: -360 }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
      <motion.p
        className="text-lg font-medium text-gray-700 dark:text-gray-200"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
        }}
      >
        Loading weather data...
      </motion.p>
    </motion.div>
  );
};

export default LoadingSpinner;
