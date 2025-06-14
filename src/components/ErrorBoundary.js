// src/components/ErrorBoundary.js
import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 p-4">
          <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center">
            <div className="flex justify-center mb-4">
              <svg
                className="w-16 h-16 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
              Something went wrong
            </h2>
            <p className="text-gray-600 dark:text-gray-200 mb-4">
              {this.state.error?.message || "An unexpected error occurred"}
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
              We're sorry for the inconvenience. Please try again.
            </p>
            <button
              onClick={this.handleRetry}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
