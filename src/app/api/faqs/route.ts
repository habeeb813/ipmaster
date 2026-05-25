import { NextResponse } from 'next/server';
import { connectToDatabase, Faq } from '@/lib/db';
import { getAdminFromRequest } from '@/lib/jwt';
import { rateLimiter, getClientIp } from '@/lib/rateLimit';

// 1. GET ALL FAQS
export async function GET(req: Request) {
  const ip = getClientIp(req);
  const limiter = rateLimiter(ip);
  if (!limiter.success) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }

  try {
    await connectToDatabase();
    const faqs = await Faq.find().sort({ createdAt: -1 });
    return NextResponse.json(faqs);
  } catch (err: any) {
    console.error('FAQs GET Error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// 2. CREATE / UPDATE FAQ (Secure Admin Protected)
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
    const payload = await req.json();
    const { question, answer, slug, category, detailedAnswer } = payload;

    if (!question || !answer || !slug || !category) {
      return NextResponse.json({ error: 'Missing required FAQ fields' }, { status: 400 });
    }

    await connectToDatabase();

    // Upsert FAQ by slug
    const updatedFaq = await Faq.findOneAndUpdate(
      { slug },
      {
        $set: {
          question,
          answer,
          detailedAnswer: detailedAnswer || '',
          category,
          updatedAt: new Date(),
        }
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true, faq: updatedFaq });
  } catch (err: any) {
    console.error('FAQ POST Error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// 3. DELETE FAQ (Secure Admin Protected)
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
    const slug = url.searchParams.get('slug');

    if (!slug) {
      return NextResponse.json({ error: 'FAQ slug query parameter is required' }, { status: 400 });
    }

    await connectToDatabase();

    const result = await Faq.deleteOne({ slug });
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'FAQ entry not found' }, { status: 44 });
    }

    return NextResponse.json({ success: true, message: 'FAQ entry permanently deleted.' });
  } catch (err: any) {
    console.error('FAQ DELETE Error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
