import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
export default defineConfig({
  site: 'https://kmlsales.com',
  integrations: [sitemap()],
  build: { format: 'directory', inlineStylesheets: 'always' },
  trailingSlash: 'ignore',
});
