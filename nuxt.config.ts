// https://v3.nuxtjs.org/api/configuration/nuxt.config
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { resolve } from "path";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
export default defineNuxtConfig({
	app: {
		head: {
			meta: [
				{ name: "viewport", content: "width=device-width, initial-scale=1" },
			],
			title: "Web3.0",
			link: [
				{
					rel: "icon",
					type: "image/svg+xml",
					href: "/icon.png",
				},
				{
					rel: "stylesheet",
					type: "text/css",
					href: "https://cdn.jsdelivr.net/gh/loadingio/loading.css@v2.0.0/dist/loading.css",
				},
			],
		},
	},
	modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
	buildModules: ["@nuxtjs/pwa"],
	build: {
		transpile:
			process.env.NODE_ENV === "production"
				? [
						"naive-ui",
						"vueuc",
						"@css-render/vue3-ssr",
						"@juggle/resize-observer",
				  ]
				: ["@juggle/resize-observer"],
	},
	vite: {
		resolve: {
			alias: {
				"@": resolve(__dirname, "./"),
			},
		},
		plugins: [
			AutoImport({
				imports: [
					{
						"naive-ui": [
							"useDialog",
							"useMessage",
							"useNotification",
							"useLoadingBar",
						],
					},
				],
			}),
			Components({
				resolvers: [NaiveUiResolver()],
			}),
		],
		optimizeDeps: {
			include:
				process.env.NODE_ENV === "development"
					? ["naive-ui", "vueuc", "date-fns-tz/esm/formatInTimeZone"]
					: [],
		},
	},
});
