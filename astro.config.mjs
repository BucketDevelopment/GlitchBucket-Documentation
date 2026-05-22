import starlight from "@astrojs/starlight";
import sitemap from '@astrojs/sitemap';

import { defineConfig } from "astro/config";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
    site: 'https://bot.tudubucket.dev',
    srcDir: "./web",
    output: 'static',
    integrations: [
        sitemap({
            customSitemaps: ['https://bot.tudubucket.dev/sitemap.xml'],
            changefreq: 'weekly',
            priority: 0.7,
            lastmod: new Date(),
        }),
        starlight({
            title: "BucketDevelopment",
            logo: {
                light: "/web/assets/favicon.webp",
                dark: "/web/assets/favicon.webp",
                replacesTitle: false,
            },
            lastUpdated: true,
            // components: {
            //     Hero: '/web/content/docs/docs/components/Hero.astro',
            // },
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
                        name: "keywords",
                        content: "GlitchBucket, GlitchBucket Bot, BucketBot, Glitch Bucket bot, bot nối từ, bot nối từ discord, bot nối từ tiếng việt, nối từ, sticky bot commands, snipe bot discord commands, donation bot, discord donation bot, discord voting bot, utils bot, utilities bot, xô lỗi, bot xô lỗi",
                    },
                },
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
                // {
                //     tag: "meta",
                //     attrs: {
                //         property: "og:image",
                //         content: "https://bot.tudubucket.dev/favicon.webp",
                //     },
                // },
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
                    autogenerate: { directory: "docs/getting-started" },
                },
                {
                    label: "Premium",
                    badge: { text: "Mới", variant: "caution" },
                    autogenerate: { directory: "docs/premium" },
                },
                {
                    label: "Các lệnh của bot",
                    items: [
                        {
                            label: "Lệnh đơn",
                            autogenerate: { directory: "docs/commands/single/" },
                            collapsed: true,
                        },
                        {
                            label: "Khối lệnh",
                            autogenerate: { directory: "docs/commands/group/" },
                            collapsed: false,
                        },
                    ],
                },
                    {
                        label: "BucketScript",
                        badge: { text: "Mới", variant: "caution" },
                        autogenerate: { directory: "docs/bucketscript/" },
                    },
                {
                    label: "Pháp lý",
                    autogenerate: { directory: "docs/policy" },
                },
        ],
		}), icon()],
});