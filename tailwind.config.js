/** @type {import('tailwindcss').Config} */

import twGlow from "twglow";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "oklch(0.250 0.013 261.7)",
        "background-deeper": "oklch(0.150 0.008 261.7)",
        button: "oklch(0.350 0.019 261.7)",
        "button-border": "oklch(0.450 0.024 261.7)",
        /**
         * Primary colours are used for accents:
         *   - Current workspace indicator
         *   - Volume slider
         *   - Media progress bar
        */
        primary: "oklch(0.542 0.041 248.7)",
        "primary-border": "oklch(0.623 0.047 248.7)",
        text: "oklch(0.950 0.003 261.7)",
        "text-muted": "oklch(0.850 0.009 261.7)",
        icon: "oklch(0.750 0.015 261.7)",
        border: "oklch(0.350 0.019 261.7)",
        /**
         * These colours are used for feedback, mainly for stat indicators.
         */
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
