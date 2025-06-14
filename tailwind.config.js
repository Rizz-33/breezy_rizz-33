// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        lg: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      },
      borderRadius: {
        "2xl": "1rem",
        lg: "0.5rem",
      },
    },
  },
  plugins: [require("tailwindcss"), require("autoprefixer")],
  darkMode: "class", // Explicitly enable class-based dark mode
};
