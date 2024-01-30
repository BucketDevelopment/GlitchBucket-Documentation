import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  srcDir: './docs',
  integrations: [
    starlight({
      title: "BucketDevelopment",
      social: {
        github: "https://github.com/tudubucket",
        discord: "https://langdua.net/discord"
      },
      sidebar: [
        {
          label: "Hướng dẫn",
					autogenerate: { directory: "getting-started" },
        },
      ],
    }),
  ],
});
