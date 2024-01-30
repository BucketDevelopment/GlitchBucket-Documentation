import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  srcDir: './docs',
  integrations: [
    starlight({
      title: "BucketDevelopment",
      head: [
				{
					tag: 'meta',
					attrs: { property: 'og:image', content: "https://docs.tudubucket.dev/favicon.webp" },
				},
				{
					tag: 'meta',
					attrs: { property: 'twitter:image', content: "https://docs.tudubucket.dev/favicon.webp" },
				},
        {
					tag: 'meta',
					attrs: { property: 'twitter:card'},
				},
        {
					tag: 'meta',
					attrs: { property: 'theme-color', content: '#C0CDFF' },
				},
			],
      social: {
        github: "https://github.com/tudubucket",
        discord: "https://langdua.net/discord"
      },
      sidebar: [
        {
          label: "Welcome",
					autogenerate: { directory: "getting-started" },
        },
      ],
    }),
  ],
});
