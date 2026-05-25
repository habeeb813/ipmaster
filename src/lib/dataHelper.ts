import { connectToDatabase, Blog, Faq } from '@/lib/db';
import { BLOG_POSTS, BlogPost } from '@/data/blogs';
import { FAQS, FAQ } from '@/data/faqs';

/**
 * Fetch all blogs from MongoDB, falling back to static BLOG_POSTS array.
 */
export async function getAllBlogs(): Promise<BlogPost[]> {
  try {
    await connectToDatabase();
    const dbBlogs = await Blog.find().sort({ createdAt: -1 }).lean();
    if (dbBlogs && dbBlogs.length > 0) {
      // Format _id to string for serialization
      return dbBlogs.map((b: any) => ({
        ...b,
        _id: b._id ? b._id.toString() : (b.id || b.slug || ''),
      })) as BlogPost[];
    }
  } catch (err) {
    console.warn('Firebase query failed, falling back to static blog posts:', err);
  }
  return BLOG_POSTS;
}

/**
 * Fetch a single blog by slug from MongoDB/Firestore, falling back to static BLOG_POSTS array.
 */
export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  try {
    await connectToDatabase();
    const post = await Blog.findOne({ slug }).lean();
    if (post) {
      return {
        ...post,
        _id: (post as any)._id ? (post as any)._id.toString() : ((post as any).id || (post as any).slug || ''),
      } as BlogPost;
    }
  } catch (err) {
    console.warn(`Firebase single blog query for ${slug} failed, falling back to static array:`, err);
  }
  
  const fallback = BLOG_POSTS.find((p) => p.slug === slug);
  return fallback || null;
}

/**
 * Fetch all FAQs from MongoDB/Firestore, falling back to static FAQS array.
 */
export async function getAllFaqs(): Promise<FAQ[]> {
  try {
    await connectToDatabase();
    const dbFaqs = await Faq.find().sort({ createdAt: -1 }).lean();
    if (dbFaqs && dbFaqs.length > 0) {
      return dbFaqs.map((f: any) => ({
        ...f,
        _id: f._id ? f._id.toString() : (f.id || f.slug || ''),
      })) as FAQ[];
    }
  } catch (err) {
    console.warn('Firebase FAQ query failed, falling back to static FAQs:', err);
  }
  return FAQS;
}
