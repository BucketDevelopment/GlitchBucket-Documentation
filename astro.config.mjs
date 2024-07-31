import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	srcDir: "./web",
	integrations: [
		starlight({
			title: "BucketDevelopment",
			favicon: "/favicon.png",
			customCss: ["./web/styles/global.css"],
			defaultLocale: "vi",
			locales: {
				root: {
					label: "Tiếng Việt",
					lang: "vi",
				},
			},
			head: [
				{
					tag: "meta",
					attrs: {
						property: "og:image",
						content: "https://docs.tudubucket.dev/favicon.webp",
					},
				},
				{
					tag: "meta",
					attrs: {
						property: "twitter:image",
						content: "https://docs.tudubucket.dev/favicon.webp",
					},
				},
				{
					tag: "meta",
					attrs: { property: "theme-color", content: "#C0CDFF" },
				},
			],
			social: {
				github: "https://github.com/tudubucket",
				discord: "https://langdua.net/discord",
			},
			sidebar: [
				{
					label: "Chung",
					autogenerate: { directory: "getting-started" },
				},
				{
					label: "Các lệnh của bot",
					items: [
						{
							label: "Lệnh đơn",
							autogenerate: { directory: "commands/single/" },
						},
						{
							label: "Khối lệnh",
							autogenerate: { directory: "commands/group/" },
						},
						{
							label: "BucketScript",
							autogenerate: { directory: "bucketscript/" },
						},
					],
				},
				{
					label: "Pháp lý",
					autogenerate: { directory: "policy" },
				},
			],
		}),
	],
});
