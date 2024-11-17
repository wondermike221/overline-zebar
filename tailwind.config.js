/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#23272e",
        "background-deeper": "#1e2227",
        text: "#ECEFF4",
        icon: "#c1c4c9",
        "background-subtle": "#81A1C1",
        "app-border": "#495366",
      },
    },
  },
  plugins: [],
};
