/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    backgroundImage: {
      banner: "url('../src/assets/banner.png')",
      banner2: "url('../src/assets/banner2.png')",
      car: "url('../src/assets/car.png')",
    },
    extend: {},
  },
  plugins: [],
};
