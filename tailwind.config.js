/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        result: "min-content 1fr",
        images: "124px 1fr",
        cart: "1fr max-content",
        products: "repeat(auto-fill, minmax(320px, 1fr))",
      },
    },
  },
  plugins: [],
};
