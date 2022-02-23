module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      montserratBold: ["Montserrat"],
      robotoSemiBold: ["Roboto"],
    },
    extend: {
      backgroundColor: {
        navBg: "#F7F9FF",
        cardBg: "#E7EDFD",
        inputColor: "#f6f9fe",
      },
      colors: {
        primary: "#466288",
        secondary: "#91A4D1",
      },
      height: {
        logoHeight: "15%",
        footerHeight: "10%",
      },
    },
  },
  plugins: [],
};
