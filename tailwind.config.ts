import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FAFAFA",
        hover:"#EFEBFF",
        accent:"#633CFF",
        paragraph:"#737373",
        heading:"#333333",
        outline:"#D9D9D9"
      },
      boxShadow: {
        'empty': '0px 5px 7px 0px rgba(191,189,191,1)',
      },
      fontSize: {
        'heading-sm': '24px',
        'heading-md': '32px',
      },
    },
  },
  plugins: [],
};
export default config;
