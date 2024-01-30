import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import myImage from "../assets/104169263_p2.webp";

// https://astro.build/config
export default defineConfig({
  srcDir: './docs',
  integrations: [
    starlight({
      title: "BucketDevelopment",
      head: [
				{
					tag: 'meta',
					attrs: { property: 'og:image', content: myImage },
				},
				{
					tag: 'meta',
					attrs: { property: 'twitter:image', content: myImage },
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
