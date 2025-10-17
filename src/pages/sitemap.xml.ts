import type { APIRoute } from 'astro';

const pages = [
  { url: '', priority: 1.0, changefreq: 'daily' },
  { url: 'diseña', priority: 0.9, changefreq: 'weekly' },
  { url: 'modelos', priority: 0.8, changefreq: 'weekly' },
  { url: 'galeria', priority: 0.8, changefreq: 'weekly' },
  { url: 'comunidad', priority: 0.7, changefreq: 'daily' },
  { url: 'contacto', priority: 0.6, changefreq: 'never' },
  { url: 'privacy', priority: 0.3, changefreq: 'yearly' },
  { url: 'terms', priority: 0.3, changefreq: 'yearly' },
];

const generateSitemap = () => {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `
  <url>
    <loc>https://streetcap.com/${page.url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`
  )
  .join('')}
</urlset>`;
};

export const GET: APIRoute = () => {
  return new Response(generateSitemap(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
