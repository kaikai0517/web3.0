/** @type {import('tailwindcss').Config} */
module.exports = {
	corePlugins: {
		preflight: false,
	},
	content: ["./src/**/*.{vue,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#151517",
				secondary: "#F9D749",
				third: "#ffffff",
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
