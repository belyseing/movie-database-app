/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#fea928",
    
      },
      container: {
        center: true,
        padding: {
          DEFAULT:"1em",
          sm:"3em",
        }
      },
    },
  },
  plugins: [],
};
