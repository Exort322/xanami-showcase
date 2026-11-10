/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      screens: {
        xs: "400px",
      },
      colors: {
        ink: "#080809",
        coal: "#0D0D0F",
        bone: "#ECE9E4",
        silver: "#A8A49E",
        ash: "#8A8681",
        blood: "#9B1420",
        ember: "#D9505C",
        bloodDeep: "#5A0A10",
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', "Georgia", "serif"],
        cond: ['"Oswald"', '"Arial Narrow"', "sans-serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
      },
      letterSpacing: {
        mega: "0.42em",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translate3d(0,0,0)" },
          "100%": { transform: "translate3d(-50%,0,0)" },
        },
        rise: {
          "0%": { opacity: "0", transform: "translateY(26px)", filter: "blur(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)", filter: "blur(0)" },
        },
        breathe: {
          "0%,100%": { opacity: "0.35", transform: "scale(1)" },
          "50%": { opacity: "0.6", transform: "scale(1.08)" },
        },
        scrollCue: {
          "0%": { transform: "translateY(-100%)" },
          "60%,100%": { transform: "translateY(100%)" },
        },
      },
      animation: {
        marquee: "marquee 110s linear infinite",
        rise: "rise 1.1s cubic-bezier(0.16,1,0.3,1) both",
        breathe: "breathe 9s ease-in-out infinite",
        scrollCue: "scrollCue 2.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
