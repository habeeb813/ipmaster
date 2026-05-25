import { NextResponse } from 'next/server';
import { connectToDatabase, Category } from '@/lib/db';
import { getAdminFromRequest } from '@/lib/jwt';
import { rateLimiter, getClientIp } from '@/lib/rateLimit';

// 1. GET ALL CATEGORIES
export async function GET(req: Request) {
  const ip = getClientIp(req);
  const limiter = rateLimiter(ip);
  if (!limiter.success) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }

  try {
    await connectToDatabase();
    const categories = await Category.find().sort({ createdAt: 1 });
    return NextResponse.json(categories.map(c => c.name));
  } catch (err: any) {
    console.error('Categories GET Error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// 2. CREATE A NEW CATEGORY (Secure Admin Protected)
export async function POST(req: Request) {
  const ip = getClientIp(req);
  const limiter = rateLimiter(ip);
  if (!limiter.success) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }

  const admin = getAdminFromRequest(req);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { name } = await req.json();
    if (!name || !name.trim()) {
      return NextResponse.json({ error: 'Category name is required' }, { status: 400 });
    }

    await connectToDatabase();

    const existing = await Category.findOne({ name: name.trim() });
    if (existing) {
      return NextResponse.json({ error: 'Category already exists' }, { status: 409 });
    }

    const newCat = new Category({ name: name.trim() });
    await newCat.save();

    return NextResponse.json({ success: true, category: newCat });
  } catch (err: any) {
    console.error('Category POST Error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// 3. DELETE A CATEGORY (Secure Admin Protected)
export async function DELETE(req: Request) {
  const ip = getClientIp(req);
  const limiter = rateLimiter(ip);
  if (!limiter.success) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }

  const admin = getAdminFromRequest(req);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const url = new URL(req.url);
    const name = url.searchParams.get('name');

    if (!name) {
      return NextResponse.json({ error: 'Category name query parameter is required' }, { status: 400 });
    }

    await connectToDatabase();

    const result = await Category.deleteOne({ name });
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Category not found' }, { status: 44 });
    }

    return NextResponse.json({ success: true, message: 'Category deleted' });
  } catch (err: any) {
    console.error('Category DELETE Error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
