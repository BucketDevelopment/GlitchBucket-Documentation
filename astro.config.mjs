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
        components: {
            Hero: '/web/content/docs/components/Hero.astro',
        },
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
                tag: "link", 
                attrs: {
                    href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap",
                    rel: "stylesheet",
                },
            },
            {
                tag: "script",
                content: "(function () {const domain = window.location.hostname; const path = window.location.pathname; const url = `https://service.tudubucket.dev/metrics/?domain=${encodeURIComponent(domain)}&path=${encodeURIComponent(path)}`; fetch(url).catch(() => {});})();"
            },
            {
                tag: "meta",
                attrs: {
                    name: "google-site-verification",
                    content: "um3q97hCSAv7TUAD2O6KoMsdGKC-El8E7BMUWUw5bVk",
                },
            },
            {
                tag: "meta",
                attrs: {
                    property: "og:image",
                    content: "https://bot.tudubucket.dev/favicon.webp",
                },
            },
            {
                tag: "meta",
                attrs: {
                    property: "twitter:image",
                    content: "https://cdn.tudubucket.dev/widebucket.png",
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