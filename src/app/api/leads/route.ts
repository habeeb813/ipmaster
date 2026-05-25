import { NextResponse } from 'next/server';
import { connectToDatabase, Lead } from '@/lib/db';
import { getAdminFromRequest } from '@/lib/jwt';
import { rateLimiter, getClientIp } from '@/lib/rateLimit';

// 1. GET ALL LEADS (Secure Admin Protected)
export async function GET(req: Request) {
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
    await connectToDatabase();
    const leads = await Lead.find().sort({ createdAt: -1 });
    return NextResponse.json(leads);
  } catch (err: any) {
    console.error('Leads GET Error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// 2. CREATE A LEAD (Public intake endpoint)
export async function POST(req: Request) {
  const ip = getClientIp(req);
  const limiter = rateLimiter(ip);
  if (!limiter.success) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  try {
    const payload = await req.json();
    const { name, email, phone, service, date, time } = payload;

    if (!name || !email || !phone || !service || !date || !time) {
      return NextResponse.json({ error: 'Missing required consultation details' }, { status: 400 });
    }

    await connectToDatabase();

    const newLead = new Lead({
      name,
      email,
      phone,
      service,
      date,
      time,
      status: 'New',
      createdAt: new Date(),
    });

    await newLead.save();

    return NextResponse.json({ success: true, lead: newLead });
  } catch (err: any) {
    console.error('Lead POST Intake Error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// 3. UPDATE LEAD STATUS (Secure Admin Protected)
export async function PUT(req: Request) {
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
    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json({ error: 'Lead id and status are required' }, { status: 400 });
    }

    await connectToDatabase();

    const updatedLead = await Lead.findByIdAndUpdate(
      id,
      { $set: { status } },
      { new: true }
    );

    if (!updatedLead) {
      return NextResponse.json({ error: 'Lead record not found' }, { status: 44 });
    }

    return NextResponse.json({ success: true, lead: updatedLead });
  } catch (err: any) {
    console.error('Lead PUT Status Error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// 4. DELETE A LEAD RECORD (Secure Admin Protected)
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
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Lead id query parameter is required' }, { status: 400 });
    }

    await connectToDatabase();

    const result = await Lead.findByIdAndDelete(id);
    if (!result) {
      return NextResponse.json({ error: 'Lead record not found' }, { status: 44 });
    }

    return NextResponse.json({ success: true, message: 'Consultation coordinate removed' });
  } catch (err: any) {
    console.error('Lead DELETE Error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
