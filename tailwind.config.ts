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
				background: "#f3faeb",
				"card-background": "#e4f4d3",
				"card-border": "#cbe9ad",
				"peer-focus-ring": "#a9d97d",
				"peer-check-bg": "#8ac754",
				"text-primary": "#2f481f",
				"btn-primary": "#a9db7b",
			},
		},
	},
	plugins: [],
};
export default config;
