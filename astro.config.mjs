import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	srcDir: "./docs",
	integrations: [
		starlight({
			title: "BucketDevelopment",
			customCss: ["./docs/styles/global.css"],
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
            { label: "Lệnh đơn", autogenerate: { directory: 'single' }},
            { label: "Khối lệnh", autogenerate: { directory: 'group' }},
          ],
				},
			],
		}),
	],
});
