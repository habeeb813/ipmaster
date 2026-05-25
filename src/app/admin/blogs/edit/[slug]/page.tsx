import React from 'react';
import BlogEditor from '@/components/BlogEditor';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function AdminEditBlog({ params }: PageProps) {
  const { slug } = await params;
  return <BlogEditor editSlug={slug} />;
}
