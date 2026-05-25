import { NextResponse } from 'next/server';
import { connectToDatabase, Blog } from '@/lib/db';
import { getAdminFromRequest } from '@/lib/jwt';
import { rateLimiter, getClientIp } from '@/lib/rateLimit';

// 1. GET ALL BLOG POSTS (With dynamic Search, Category, Status filtering)
export async function GET(req: Request) {
  const ip = getClientIp(req);
  const limiter = rateLimiter(ip);
  if (!limiter.success) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }

  try {
    await connectToDatabase();
    
    // Extract query parameters
    const url = new URL(req.url);
    const search = url.searchParams.get('search') || '';
    const category = url.searchParams.get('category') || '';
    const status = url.searchParams.get('status') || ''; // 'Published', 'Draft', or 'All'

    // Build filter query
    const filterQuery: any = {};

    if (search) {
      filterQuery.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { keywords: { $regex: search, $options: 'i' } },
      ];
    }

    if (category && category !== 'All') {
      filterQuery.category = category;
    }

    if (status && status !== 'All') {
      if (status === 'Draft') {
        filterQuery.$or = [
          { publishedAt: { $regex: 'draft', $options: 'i' } },
          { metaDescription: { $regex: 'draft', $options: 'i' } },
        ];
      } else if (status === 'Published') {
        filterQuery.$and = [
          { publishedAt: { $not: { $regex: 'draft', $options: 'i' } } },
          { metaDescription: { $not: { $regex: 'draft', $options: 'i' } } },
        ];
      }
    }

    const posts = await Blog.find(filterQuery).sort({ createdAt: -1 });
    return NextResponse.json(posts);
  } catch (err: any) {
    console.error('Blogs GET Error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// 2. CREATE A NEW BLOG POST (Secure Admin Protected)
export async function POST(req: Request) {
  const ip = getClientIp(req);
  const limiter = rateLimiter(ip);
  if (!limiter.success) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }

  // Auth Protection Check
  const admin = getAdminFromRequest(req);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized: Security credentials invalid or missing.' }, { status: 401 });
  }

  try {
    const payload = await req.json();
    
    // API Payload Validation
    const { title, slug, excerpt, content, category, imageUrl } = payload;
    if (!title || !slug || !excerpt || !content || !category || !imageUrl) {
      return NextResponse.json({ error: 'Missing required publication details (title, slug, excerpt, content, category, imageUrl).' }, { status: 400 });
    }

    await connectToDatabase();

    // Check unique slug URL
    const existing = await Blog.findOne({ slug });
    if (existing) {
      return NextResponse.json({ error: 'A publication with this slug URL already exists.' }, { status: 409 });
    }

    // Save to Database
    const newPost = new Blog({
      ...payload,
      createdAt: new Date(),
    });

    await newPost.save();
    return NextResponse.json({ success: true, post: newPost }, { status: 21 });
  } catch (err: any) {
    console.error('Blogs POST Error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
