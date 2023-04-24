/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    fontFamily: {
      caption: ['"Tactic Round"', "sans-serif"],
      body: ["Aeroport", "sans-serif"],
    },
    screens: {
      sm: "375px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
    },
    backgroundImage: {
      none: "none",
      texture: `url(./assets/img/bg-texture.png)`,
    },
    backgroundPosition: {
      "left-10": "10px",
    },
    boxShadow: {
      sm: "0px 0px 6px #E8B844",
      md: "0px 0px 22px rgba(0, 0, 0, 0.47)",
    },
    dropShadow: {
      sm: "2.45161px 35.5484px 47.8065px rgba(0, 0, 0, 0.23)",
    },
    backdropBlur: {
      sm: "8.58065px",
    },
    extend: {
      colors: {
        yellow: {
          main: "#F3CF7A",
          dark: "#E9BE5C",
          light: "#FFE3A1",
          deep: "#F0B93A",
          lighter: "#FCF6E8",
          lighter2: "#FAF6EB",
          darker: "#E3AB1C",
          lightest: "#FFF6E2",
          darkest: "#644900",
          mild: "#FBF8F0",
        },
        grey: {
          dark: "#1E1E1E",
          darker: "#8c8c8f",
          darker2: "#5C5C5C",
          deep: "#A7A7A7",
          black: "#19191E",
          darkest: "#010106",
          light: "#31383D",
          lighter: "#828282",
          lighter2: "rgba(208, 208, 208, 0.4)",
          lighter3: "#ACACAC",
          lighter4: "#F9F9F9",
          lighter5: "#FEFCF9",
          lighter6: "#C3C3C3",
          lightest: "#D0D0D0",
          bright: "#F7F7F7",
          white: "#FFEFEF",
          "lightest-40": "#D0D0D066",
          black43: "rgba(0, 0, 0, 0.43)",
          light38: "rgba(208, 208, 208, 0.38)",
        },
        green: {
          light: "#00B67A",
          dark: "#067651",
        },
        red: {
          light: "#E31818",
          lighter: "#FF3939",
          dark: "#AA1515",
        },
        blue: {
          light: "#1DA1F2",
          dark: "#2488C6",
        },
        purple: {
          light: "#5865F2",
          dark: "#3A45B6",
        },
      },
      keyframes: {
        ripple: {
          from: {
            opacity: 0.3,
            transform: "scale(0)",
          },
          to: {
            opacity: 0,
            transform: "scale(2)",
          },
        },
        fadeIn: {
          from: {
            opacity: 0,
          },
          to: {
            opacity: 1,
          },
        },
        delayedFadeIn: {
          "0%": {
            opacity: 0,
          },
          "50%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
      },
      animation: {
        ripple: "ripple .8s ease-in-out",
        fadeIn: "fadeIn .3s ease-in-out",
        delayedFadeIn: "delayedFadeIn .6s ease-in-out",
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("child-span", "& > span");
    },
  ],
};
