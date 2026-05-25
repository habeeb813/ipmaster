import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllBlogs, getBlogBySlug } from '@/lib/dataHelper';
import { Calendar, Clock, Share2, ArrowLeft, ShieldCheck } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static routes for build optimization
export async function generateStaticParams() {
  const posts = await getAllBlogs();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Dynamic SEO metadata generation
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) {
    return {
      title: 'Article Not Found | IPMASTER',
      description: 'The requested intellectual property blog post was not found.',
    };
  }

  return {
    title: `${post.metaTitle} | IPMASTER Blog`,
    description: post.metaDescription,
    keywords: post.keywords ? post.keywords.join(', ') : '',
    alternates: {
      canonical: `https://ipmaster.in/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://ipmaster.in/blog/${slug}`,
      type: 'article',
      publishedTime: new Date(post.publishedAt).toISOString(),
      authors: [post.author.name],
      images: [
        {
          url: post.imageUrl,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.imageUrl],
    },
  };
}

export default async function BlogPostDetail({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) notFound();

  // Find related articles (same category or general)
  const allPosts = await getAllBlogs();
  const relatedPosts = allPosts.filter(
    (p) => p.slug !== slug && (p.category === post.category || p.category === 'Brand Protection')
  ).slice(0, 2);

  // Structured schemas
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': post.title,
    'description': post.excerpt,
    'image': post.imageUrl,
    'datePublished': new Date(post.publishedAt).toISOString(),
    'author': {
      '@type': 'Person',
      'name': post.author.name,
      'jobTitle': post.author.role,
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'IPMASTER',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=150&h=150&q=80',
      },
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://ipmaster.in/blog/${slug}`,
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': post.faqBlock.map((faq) => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer,
      },
    })),
  };

  return (
    <div className="relative pb-24">
      {/* Inject schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Article Header */}
      <section className="bg-slate-50 dark:bg-card/25 border-b border-gray-150 dark:border-border/60 py-16 w-full">
        <div className="max-w-4xl mx-auto px-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-accent mb-6"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Blog Index
          </Link>

          <div className="flex flex-col gap-4">
            <span className="text-[10px] uppercase font-extrabold tracking-widest text-accent font-semibold w-fit">
              Category: {post.category}
            </span>
            <h1 className="text-2xl md:text-4xl font-extrabold text-primary dark:text-white leading-tight">
              {post.title}
            </h1>
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-6 border-t border-gray-150 dark:border-border/60">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full overflow-hidden bg-slate-100 shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={post.author.avatar} alt={post.author.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="text-xs font-bold text-primary dark:text-white leading-tight">{post.author.name}</div>
                  <div className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider">{post.author.role}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-[10px] text-muted-foreground font-medium">
                <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {post.publishedAt}</span>
                <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {post.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Article Body */}
          <article className="lg:col-span-8 flex flex-col gap-8">
            <div className="w-full h-[300px] md:h-[420px] rounded-3xl overflow-hidden bg-slate-800 shadow-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
            </div>

            {/* Rich Article Body */}
            <div 
              className="prose dark:prose-invert text-xs md:text-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Blog specific Q&A Schema Accordion blocks */}
            {post.faqBlock.length > 0 && (
              <div className="mt-10 p-6 rounded-2xl bg-slate-50 dark:bg-card border border-gray-150 dark:border-border flex flex-col gap-6">
                <h3 className="text-sm font-bold text-primary dark:text-white uppercase tracking-wider border-b border-gray-150 dark:border-border/60 pb-3 flex items-center gap-2">
                  <ShieldCheck className="h-4.5 w-4.5 text-accent" /> Key Article Q&A
                </h3>
                <div className="flex flex-col gap-4">
                  {post.faqBlock.map((faq, idx) => (
                    <details
                      key={idx}
                      className="group border border-gray-150 dark:border-border rounded-xl bg-white dark:bg-[#05070f] transition-all"
                    >
                      <summary className="px-5 py-4 text-xs font-bold text-primary dark:text-white hover:text-accent transition-colors list-none cursor-pointer flex justify-between items-center select-none">
                        <span>{faq.question}</span>
                        <span className="text-accent group-open:rotate-180 transition-transform duration-200 text-xs">▼</span>
                      </summary>
                      <div className="px-5 pb-4 text-xs text-muted-foreground leading-relaxed border-t border-slate-50 dark:border-border/40 pt-3">
                        {faq.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Right Column: Social Share & Siloed links */}
          <div className="lg:col-span-4 flex flex-col gap-10">
            {/* Share Post */}
            <div className="p-6 rounded-2xl bg-white dark:bg-card border border-gray-150 dark:border-border shadow-sm flex flex-col gap-4">
              <h3 className="text-xs font-bold text-primary dark:text-white uppercase tracking-wider pb-3 border-b border-slate-50 dark:border-border/40">
                Share This Article
              </h3>
              <div className="flex gap-3">
                <button className="flex-1 p-2 rounded-lg bg-slate-50 hover:bg-slate-100 dark:bg-[#05070f] dark:hover:bg-slate-800 text-primary dark:text-white border border-gray-100 dark:border-border/60 transition-colors flex items-center justify-center gap-2 text-[10px] font-bold">
                  <svg className="h-3.5 w-3.5 fill-current text-sky-400" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  Twitter
                </button>
                <button className="flex-1 p-2 rounded-lg bg-slate-50 hover:bg-slate-100 dark:bg-[#05070f] dark:hover:bg-slate-800 text-primary dark:text-white border border-gray-100 dark:border-border/60 transition-colors flex items-center justify-center gap-2 text-[10px] font-bold">
                  <svg className="h-3.5 w-3.5 fill-current text-blue-500" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  LinkedIn
                </button>
              </div>
            </div>

            {/* Related Posts */}
            <div className="flex flex-col gap-6">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest pb-3 border-b border-gray-150 dark:border-border">
                Related Articles
              </h3>
              <div className="flex flex-col gap-6">
                {relatedPosts.map((rPost) => (
                  <Link
                    key={rPost.slug}
                    href={`/blog/${rPost.slug}`}
                    className="group flex gap-4 items-start"
                  >
                    <div className="h-16 w-20 bg-slate-800 rounded-xl overflow-hidden shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={rPost.imageUrl} alt={rPost.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h4 className="text-xs font-bold leading-snug text-primary dark:text-white group-hover:text-accent transition-colors line-clamp-2">
                        {rPost.title}
                      </h4>
                      <span className="text-[9px] text-muted-foreground font-semibold">{rPost.publishedAt}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Banner Consultation Sidebar */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0b0f19] to-[#05070f] border border-accent/20 flex flex-col gap-4 text-center">
              <h3 className="text-sm font-bold text-white leading-snug">File your Trademark availability report</h3>
              <p className="text-[10px] text-slate-300 leading-relaxed">
                Consult with our experienced IP agents and trademark lawyers. Search reports are generated in 15 minutes.
              </p>
              <Link
                href="/booking"
                className="w-full py-2.5 rounded-xl bg-accent text-black hover:bg-accent/90 transition-all text-xs font-bold shadow-md"
              >
                Book Consult
              </Link>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}
