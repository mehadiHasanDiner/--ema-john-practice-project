/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#e5f475",

          secondary: "#cc2c32",

          accent: "#ce66e2",

          neutral: "#242842",

          "base-100": "#412447",

          info: "#45a4d3",

          success: "#118d3f",

          warning: "#ba9d0d",

          error: "#f14153",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
