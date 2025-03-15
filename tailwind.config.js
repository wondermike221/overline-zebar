/** @type {import('tailwindcss').Config} */

import twGlow from "twglow";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#23272e",
        "background-deeper": "#1e2227",
        text: "#dae1ed",
        icon: "#d8dee9",
        "background-subtle": "#81A1C1",
        "app-border": "#495366",
        success: "#a3be8c",
        danger: "#bf616a",
        warning: "#d08770",
      },
      fontFamily: {
        mono: ["Geist Mono", "monospace"],
      },
    },
  },
  plugins: [twGlow],
};
