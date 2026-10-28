import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
export async function GET(context) {
  const posts = (await getCollection('blog')).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  return rss({ title: 'KML Sales Blog', description: 'Field notes on building outbound and deciding where AI belongs in it.', site: context.site,
    items: posts.map((p) => ({ title: p.data.title, description: p.data.description, pubDate: p.data.date, link: `/blog/${p.id}/` })) });
}
