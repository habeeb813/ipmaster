import { NextResponse } from 'next/server';
import { connectToDatabase, Blog } from '@/lib/db';
import { getAdminFromRequest } from '@/lib/jwt';
import { rateLimiter, getClientIp } from '@/lib/rateLimit';

interface RouteParams {
  params: Promise<{ slug: string }>;
}

// 1. GET SINGLE BLOG POST BY SLUG
export async function GET(req: Request, { params }: RouteParams) {
  const { slug } = await params;
  const ip = getClientIp(req);
  const limiter = rateLimiter(ip);
  if (!limiter.success) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }

  try {
    await connectToDatabase();
    const post = await Blog.findOne({ slug });
    if (!post) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 44 });
    }
    return NextResponse.json(post);
  } catch (err: any) {
    console.error('Blog GET Single Error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// 2. UPDATE BLOG POST (Secure Admin Protected)
export async function PUT(req: Request, { params }: RouteParams) {
  const { slug } = await params;
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
    await connectToDatabase();

    const post = await Blog.findOne({ slug });
    if (!post) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 44 });
    }

    // Update blog post fields
    const updatedPost = await Blog.findOneAndUpdate(
      { slug },
      { $set: payload },
      { new: true }
    );

    return NextResponse.json({ success: true, post: updatedPost });
  } catch (err: any) {
    console.error('Blog PUT Error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// 3. DELETE BLOG POST (Secure Admin Protected)
export async function DELETE(req: Request, { params }: RouteParams) {
  const { slug } = await params;
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
    await connectToDatabase();

    const post = await Blog.findOne({ slug });
    if (!post) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 44 });
    }

    await Blog.deleteOne({ slug });
    return NextResponse.json({ success: true, message: 'Article permanently deleted.' });
  } catch (err: any) {
    console.error('Blog DELETE Error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
