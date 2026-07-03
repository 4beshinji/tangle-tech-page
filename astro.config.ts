import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import { ChangeFreqEnum } from "@astrojs/sitemap";
import { SITE } from "./src/config";

export default defineConfig({
  site: SITE.website,
  integrations: [
    sitemap({
      serialize(item) {
        if (item.url === SITE.website || item.url === `${SITE.website}/`) {
          item.priority = 1.0;
          item.changefreq = ChangeFreqEnum.WEEKLY;
        } else if (item.url.includes("/services/")) {
          item.priority = 0.8;
          item.changefreq = ChangeFreqEnum.MONTHLY;
        } else if (item.url.includes("/gallery/")) {
          item.priority = 0.6;
          item.changefreq = ChangeFreqEnum.MONTHLY;
        } else {
          item.priority = 0.7;
          item.changefreq = ChangeFreqEnum.MONTHLY;
        }
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    responsiveStyles: true,
    layout: "constrained",
  },
});
