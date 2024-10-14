/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		extend: {
			keyframes: {
				//Our fall animation keyframes
				collabse: {
					"0%": { transform: "scale(100%)" },
					"100%": { transform: "scale(0%)" },
				},
				fall: {
					"0%": { transform: "translate(0%,-250%)" },

					"60%": { transform: "translate(0%,0%)" },
					"100%": { transform: "translate(0%,100%)" },
				},
			},

			animation: {
				// You can then reference these keyframes by name in the
				// animation section of your theme configuration
				collabse: "collabse 1s ease-out",
				fall: "fall 10s ease-out infinite",
			},
			fontFamily: {
				sans: ["Inter var", ...defaultTheme.fontFamily.sans],
			},
		},
	},
	plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
