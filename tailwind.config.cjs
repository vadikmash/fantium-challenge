/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "card-background": "#1A1A1A",
        "main-background": "#0F0F0F",
        "price-green": "#BDFF1E",
        "button-text": "#121212",
      },
      boxShadow: {
        card: "0 5px 5px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};

module.exports = config;
