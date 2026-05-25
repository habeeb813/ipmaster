import { MetadataRoute } from 'next';
import { SERVICES } from '@/data/services';
import { getAllBlogs, getAllFaqs } from '@/lib/dataHelper';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://ipmaster.in';

  // 1. Static Pages
  const staticPages = [
    '',
    '/about',
    '/services',
    '/blog',
    '/faq',
    '/booking',
    '/contact',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // 2. Dynamic Service Pages
  const servicePages = SERVICES.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Query DB with mock fallbacks
  const dbBlogs = await getAllBlogs();
  const dbFaqs = await getAllFaqs();

  // 3. Dynamic Blog Pages
  const blogPages = dbBlogs.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // 4. Dynamic FAQ & Question Pages
  const faqPages = dbFaqs.map((faq) => ({
    url: `${baseUrl}/faq/${faq.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  const questionPages = dbFaqs.map((faq) => ({
    url: `${baseUrl}/questions/${faq.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...servicePages,
    ...blogPages,
    ...faqPages,
    ...questionPages,
  ];
}
