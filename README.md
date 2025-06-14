# Simple Weather Reporter Website

This project is a simple web application that displays the current weather for Colombo, Sri Lanka. It fetches live weather data from a free weather API and shows essential weather information on a clean and straightforward interface.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Core Features](#core-features)
- [Extra Credit Features (Optional)](#extra-credit-features-optional)
- [Technologies Used](#technologies-used)
- [Installation and Setup](#installation-and-setup)
- [Deployment](#deployment)
- [Usage](#usage)
- [Design Choices](#design-choices)
- [Challenges](#challenges)
- [Repository and Deployment Links](#repository-and-deployment-links)
- [Contact](#contact)

---

## Project Overview

The Simple Weather Reporter Website fetches and displays the current weather conditions for Colombo, Sri Lanka using the [WeatherAPI.com](https://www.weatherapi.com/) service. It demonstrates practical skills in API integration, frontend development, version control, and deployment.

---

## Core Features

- Fetch current weather data for Colombo using WeatherAPI.com
- Display the following weather parameters:
  - Temperature
  - Humidity
  - Wind Speed
  - UV Index
- Clean and simple HTML interface for clear presentation
- Use of Git for version control with meaningful commits
- Publicly deployed for easy access

---

## Extra Credit Features (Optional)

- Responsive UI for mobile and desktop devices
- Loading indicator while fetching data
- Weather condition icons displayed dynamically based on API data
- Search functionality to look up weather for other cities (optional)

---

## Technologies Used

- HTML, CSS, JavaScript (Vanilla or with frontend framework such as React/Vue, if applicable)
- WeatherAPI.com for weather data
- Git and GitHub for version control
- Deployment via [Vercel](https://vercel.com/) (or any other free hosting service)
- Environment variables used for securing API keys during deployment

---

## Installation and Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/simple-weather-reporter.git
   cd simple-weather-reporter
   ```

2. Install dependencies (if using any frontend framework):

   ```bash
   npm install
   ```

3. Create a `.env` file at the root of the project and add your WeatherAPI key:

   ```
   REACT_APP_WEATHER_API_KEY=your_api_key_here
   ```

4. Run the development server:

   ```bash
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

---

## Deployment

- The app is deployed on [Vercel](https://vercel.com/) (or specify your chosen platform).
- API keys are managed securely using environment variables provided by the hosting service.
- The deployed app is accessible via a public URL.

---

## Usage

- Open the website to see the current weather details for Colombo.
- (Optional) Use the search bar to find weather in other cities.
- Weather details update dynamically based on the latest API data.

---

## Design Choices

- **Simplicity:** Focused on minimal UI for clarity and ease of use.
- **API Selection:** Chose WeatherAPI.com for its free tier and straightforward "current weather" endpoint.
- **Environment Variables:** To keep API keys secure and prevent exposure in version control.
- **Deployment:** Selected Vercel for ease of use, free tier, and seamless integration with GitHub.
- **Responsiveness:** Basic responsive design to support mobile users (if implemented).

---

## Challenges

- Managing asynchronous API calls and ensuring data loads smoothly.
- Handling errors such as API rate limits or network failures.
- Keeping API keys secure during deployment.
- Ensuring clear and readable presentation with minimal styling.

---

## Repository and Deployment Links

- **GitHub Repository:** [https://github.com/Rizz-33/weather-reporter](https://github.com/Rizz-33/weather-reporter)
- **Deployed Website:** [https://your-app-name.vercel.app](https://your-app-name.vercel.app)

---

## Contact

For questions or clarifications, please contact me at:  
**Email:** aarruwanthie@gmail.com

---

_Thank you for reviewing my project! I look forward to your feedback._  
**Risini**
