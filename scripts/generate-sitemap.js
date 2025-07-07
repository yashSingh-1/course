import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

const DOMAIN = 'https://propogation.co.in';

const staticRoutes = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/courses', changefreq: 'weekly', priority: 0.9 },
  { url: '/events', changefreq: 'weekly', priority: 0.9 },
  { url: '/blog', changefreq: 'weekly', priority: 0.8 },
  { url: '/about', changefreq: 'monthly', priority: 0.7 },
  { url: '/contact', changefreq: 'monthly', priority: 0.7 },
  { url: '/resources', changefreq: 'weekly', priority: 0.8 },
  { url: '/projects', changefreq: 'weekly', priority: 0.8 },
  { url: '/signin', changefreq: 'monthly', priority: 0.5 },
  { url: '/signup', changefreq: 'monthly', priority: 0.5 },
];

async function generateSitemap() {
  const sitemap = new SitemapStream({ 
    hostname: DOMAIN,
    xmlns: {
      news: false,
      xhtml: false,
      image: false,
      video: false
    }
  });
  
  const writeStream = createWriteStream('./dist/sitemap.xml');
  sitemap.pipe(writeStream);

  for (const route of staticRoutes) {
    sitemap.write(route);
  }

  const blogDir = join(process.cwd(), 'src/content/blog');
  const blogFiles = readdirSync(blogDir).filter(file => file.endsWith('.md'));

  for (const file of blogFiles) {
    const filePath = join(blogDir, file);
    const fileContent = readFileSync(filePath, 'utf8');
    const { data } = matter(fileContent);
    
    const slug = file.replace('.md', '');
    const lastmod = data.date ? new Date(data.date).toISOString() : new Date().toISOString();
    
    sitemap.write({
      url: `/blog/${slug}`,
      changefreq: 'monthly',
      priority: 0.6,
      lastmod
    });
  }

  sitemap.end();

  return new Promise((resolve, reject) => {
    writeStream.on('finish', () => {
      console.log('Sitemap generated successfully at dist/sitemap.xml');
      resolve();
    });
    writeStream.on('error', reject);
  });
}

generateSitemap().catch(console.error); 