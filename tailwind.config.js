/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                primary: ["Inter", "sans-serif"],
                secondary: ["Titillium Web", "sans-serif"],
            },
            colors: {
                primary: "#18BA33",
            },
        },
        container: {
            center: true,
            padding: {
                xs: "16px",
                sm: "40px",
                md: "40px",
                lg: "70px",
                xl: "80px",
                "2xl": "120px",
                "3xl": "220px",
                "4xl": "240px",
            },
        },
        screens: {
            xs: "375px",
            sm: "680px",
            md: "768px",
            lg: "1024px",
            xl: "1200px",
            "2xl": "1440px",
            "3xl": "1680px",
            "4xl": "1920px",
            "max-xs": { max: "374px" },
            "max-sm": { max: "679px" },
            "max-md": { max: "767px" },
            "max-lg": { max: "1023px" },
            "max-xl": { max: "1199px" },
            "max-2xl": { max: "1439px" },
            "max-3xl": { max: "1679px" },
            "max-4xl": { max: "1919px" },
        },
    },
    plugins: [],
};
