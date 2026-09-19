# Rootrack

**Real Insights Into Your Roobet Gambling Behavior**

Rootrack is a transparency tool for players on [Roobet](https://roobet.com/), a crypto online casino. Roobet doesn't give users an easy way to see their full betting history, deposits, withdrawals, and most importantly their real net losses. Rootrack fills that gap: it pulls your data directly from Roobet's backend, processes everything locally in your browser, and turns it into clear statistics and charts so you can actually see how you're doing.

Since launching, Rootrack has helped **over 1,200 users** get an honest picture of their gambling behavior.

> **Disclaimer:** _Rootrack is an independent tool and is not affiliated with Roobet in any way. It was created to help Roobet users gain better insights into their gambling behavior by providing detailed tracking and analysis of their betting activities._

### A note on Roobet's API changes

Roobet has been actively restricting the API permissions available to users, shrinking the amount of historical data you can pull, first from unlimited to 12 months, and now down to just 6 months. This makes it harder for people to see the full picture of what they've actually lost, and it's outside of my control as the developer of this tool.

If there's enough demand, I may build a follow-up tool that lets you combine data from multiple timeframes to reconstruct a more complete picture despite these new limits. If that's something you'd want, let me know.

---

## Screenshot

![Rootrack Roobet Statistics](https://res.cloudinary.com/jwb6swpg/image/upload/v1789825388/Screenshot_2026-09-19_at_15-36-54_Rootrack_Roobet_Statistics_oohrvl.png)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Available Scripts](#available-scripts)
- [Usage](#usage)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Rootrack is a **React TypeScript** application designed to help users track their betting activities on **Roobet**. By downloading your deposits, withdrawals, and bets data from Roobet's backend and processing them locally, Rootrack provides insightful statistics and visualizations to help you understand your betting patterns and financial performance.

---

## Features

- **Comprehensive Tracking:** Monitor your deposits, withdrawals, and bets seamlessly.
- **Detailed Statistics:** Gain insights into your profits, losses, and betting trends.
- **Interactive Charts:** Visualize your data with a variety of charts powered by Recharts.
- **Screenshot Downloads:** Users can download a screenshot of their stats to share them.
- **Customizable Layout:** Users can rearrange the stats to change the layout to their liking.
- **Persistent Data:** Rootrack saves the current stats in local storage, allowing users to revisit and access their data later.
- **User-Friendly Interface:** Easy to navigate and use, even for beginners.
- **Local Data Processing:** All calculations and statistics are performed locally, ensuring your data remains private.

---

## Technologies Used

- **React** with **TypeScript** for building the user interface.
- **Vite** as the build tool for a fast and optimized development experience.
- **Recharts** for creating dynamic and responsive charts.
- **Framer Motion** for animations and transitions.
- **Flowbite** for UI components (currently in use, with plans for replacement).

---

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/computerd36/rootrack.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd rootrack
   ```

3. **Install the dependencies:**

   ```bash
   npm install
   ```

---

## Available Scripts

In the project directory, you can run:

- **Install Dependencies:**

  ```bash
  npm install
  ```

- **Run Locally:**

  ```bash
  npm run dev
  ```

  Runs the app in development mode. Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

- **Build for Production:**

  ```bash
  npm run build
  ```

  Builds the app for production to the `dist` folder. It bundles React in production mode and optimizes the build for the best performance.

---

## Usage

1. **Visit Rootrack:**
   - Open your web browser and navigate to [rootrack.me](https://rootrack.me).

2. **Create a New Insight**
   - Click on the "Create New" button to start creating a new insight.

3. **Follow the Steps of the GUI:**
   - Log in on [Roobet](https://roobet.com/)
   - Download your files from the backend
   - Drop them on the file upload.

5. **Explore Your Roobet Stats:**
   - Analyze your betting performance through interactive charts and detailed statistics.

6. **Customize and Share (Optional):**
   - Rearrange the layout of your stats to suit your preferences.
   - Download screenshots of your stats to share with friends.

---

## Future Improvements

- [x] Better looking landing page with animation
- [x] Added *FAQ* page
- [x] Added *About* page
- [x] Saving last statistics to local storage
- [ ] Replaced all Flowbite components and removed package
- [x] Rearranged layout stays saved in local storage
- [x] Improved the wobble animation when rearranging the layout for large cards
- [ ] When rearranging, the moving card is always in the foreground
- [ ] Added internationalisation with i18n
- [ ] Added at least three languages
- [ ] Added multi-currency support
- [ ] Export of current stats in other formats supported (PDF, CSV, ...)

---

## Contributing

Contributions are welcome! If you have suggestions or improvements, feel free to open an issue or submit a pull request.

1. **Fork the Repository**
2. **Create a New Branch**

   ```bash
   git checkout -b feature/YourFeature
   ```

3. **Commit Your Changes**

   ```bash
   git commit -m "Add some feature"
   ```

4. **Push to the Branch**

   ```bash
   git push origin feature/YourFeature
   ```

5. **Open a Pull Request**

---

## License

This project is licensed under the [MIT License](https://mit-license.org/).

---

**Disclaimer:** _Rootrack is an independent tool and is not affiliated with Roobet in any way. It was created to help Roobet users gain better insights into their gambling behavior by providing detailed tracking and analysis of their betting activities._
