// @ts-nocheck
/** @type { import('tailwindcss/plugin') } */
const plugin = require("tailwindcss/plugin");
const Color = require("color");

const track = "&::-webkit-scrollbar-track";
const thumb = "&::-webkit-scrollbar-thumb";

module.exports = plugin(({ addUtilities, theme }) => {
	// console.log(new Color(theme("colors.gray.400"))
	// .darken(0.2)
	// .toString())
	const createScrollBar = () => {
		let obj = {
			".scrollbar": {
				"&::-webkit-scrollbar": {
					height: theme("spacing.2"),
					width: theme("spacing.2"),
				},
				[track]: {
					backgroundColor: theme("colors.gray.100"),
				},
				[thumb]: {
					borderRadius: theme("borderRadius.lg"),
					backgroundColor: theme("colors.gray.400"),
					"&:hover": {
						backgroundColor: new Color(theme("colors.gray.400"))
							.darken(0.2)
							.toString(),
					},
				},
			},
		};
		[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach((k) => {
			obj[`.scrollbar-${k}`] = {
				"&::-webkit-scrollbar": {
					height: theme(`spacing.${k}`),
					width: theme(`spacing.${k}`),
				},
			};
		});
		// @ts-ignore
		Object.entries(theme("colors")).forEach(([k, v]) => {
			if (typeof v === "object") {
				Object.entries(v).forEach(([o, l]) => {
					obj[`.scrollbar-${k}-${o}`] = {
						[track]: {
							backgroundColor: theme(`colors.${k}.100`),
						},
						[thumb]: {
							backgroundColor: l,
							"&:hover": {
								backgroundColor: new Color(l).darken(0.2).toString(),
							},
						},
					};
				});
			}
		});
		return obj;
	};
	addUtilities(createScrollBar());
});
