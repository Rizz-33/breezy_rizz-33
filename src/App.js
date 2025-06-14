// src/App.js
import "./App.css";
import CurrentWeather from "./components/CurrentWeather";
import ErrorBoundary from "./components/ErrorBoundary";
import Forecast from "./components/Forecast";
import LoadingSpinner from "./components/LoadingSpinner";
import SearchBar from "./components/SearchBar";
import ThemeToggle from "./components/ThemeToggle";
import { useWeather, WeatherProvider } from "./contexts/WeatherContext";

const WeatherApp = () => {
  const { loading, error, theme } = useWeather();

  return (
    <ErrorBoundary>
      <div className="app-container min-h-screen flex flex-col">
        <nav className="navbar">
          <div className="navbar-content">
            <img
              src={theme === "dark" ? "/logo-dark.png" : "/logo-light.png"}
              alt="Logo"
              className="h-12 w-auto"
            />
            <div className="navbar-actions">
              <SearchBar />
              <ThemeToggle />
            </div>
          </div>
        </nav>

        <main className="weather-display flex-1">
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <div className="error-display">{error}</div>
          ) : (
            <>
              <div className="current-weather-container">
                <CurrentWeather />
              </div>
              <div className="forecast-container">
                <Forecast />
              </div>
            </>
          )}
        </main>

        <footer className="bg-white dark:bg-gray-800 text-gray-950 dark:text-white py-2">
          <div className="max-w mx-auto px-2 sm:px-4 lg:px-6 flex justify-between items-center">
            <span className="text-xs">Breezy All rights reserved.</span>
            <a
              href="https://github.com/Rizz-33"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs hover:underline"
            >
              Rizz-33
            </a>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  );
};

const App = () => (
  <WeatherProvider>
    <WeatherApp />
  </WeatherProvider>
);

export default App;
