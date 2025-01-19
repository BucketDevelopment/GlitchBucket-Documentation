import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
    srcDir: "./web",
    integrations: [starlight({
        title: "BucketDevelopment",
        logo: {
            light: "/web/assets/favicon.webp",
            dark: "/web/assets/favicon.webp",
            replacesTitle: false,
        },
        lastUpdated: true,
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
                    content: "https://cdn.langdua.net/widebucket.png",
                },
            },
            {
                tag: "meta",
                attrs: {
                    property: "twitter:card",
                    content: "summary_large_image",
                },
            },
            {
                tag: "meta",
                attrs: { property: "theme-color", content: "#C0CDFF" },
            },
        ],
        customCss: ['./web/assets/landing.css'],
        social: {
            github: "https://github.com/tudubucket",
            discord: "https://bot.tudubucket.dev/support",
        },
        sidebar: [
            {
                label: "Chung",
                autogenerate: { directory: "getting-started" },
            },
            {
                label: "Premium",
                badge: { text: "Mới", variant: "caution" },
                autogenerate: { directory: "premium" },
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
		}), icon()],
});