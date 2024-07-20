import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      height: {
        'screen-minus-5rem': 'calc(100vh - 8rem)'
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "background": "#000000",
        "background-alt": "#121211",
        "background-blue": "#1E3264",
        "background-purple": "#523BA1",
        "tag": "#232323",
        "tag-hover": "#303031",
        "green": "#1ED45E"
      },
    },
  },
  plugins: [],
};
export default config;
