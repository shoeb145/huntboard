import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      display: ["Edu AU VIC WA NT Arrows", "cursive"],
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["black", "light"],
  },
};
