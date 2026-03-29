/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#0D0E18",
        surface: "#1A1D2A",
        "surface-2": "#22253A",
        primary: "#00D97E",
        "primary-dark": "#00B868",
        secondary: "#8A8FA8",
        muted: "#4B5268",
        danger: "#FF4757",
        "danger-foreground": "#FFFFFF",
        warning: "#FFB300",
        "warning-foreground": "#1A1A1A",
        info: "#2196F3",
        "info-foreground": "#FFFFFF",
        "text-primary": "#FFFFFF",
        "text-secondary": "#8A8FA8",
        "text-muted": "#4B5268",
      },
      fontFamily: {
        sans: ["System"],
      },
    },
  },
  plugins: [],
};
