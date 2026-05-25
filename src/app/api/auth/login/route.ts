import { NextResponse } from 'next/server';
import { connectToDatabase, User } from '@/lib/db';
import { comparePassword, signToken } from '@/lib/jwt';
import { rateLimiter, getClientIp } from '@/lib/rateLimit';

export async function POST(req: Request) {
  // 1. Apply Rate Limiting
  const ip = getClientIp(req);
  const limiter = rateLimiter(ip);
  if (!limiter.success) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again in a minute.' },
      { 
        status: 429,
        headers: {
          'X-RateLimit-Limit': String(limiter.limit),
          'X-RateLimit-Remaining': String(limiter.remaining),
          'X-RateLimit-Reset': String(limiter.reset),
        }
      }
    );
  }

  try {
    const { username, password } = await req.json();

    // API Validation
    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required.' }, { status: 400 });
    }

    // Connect to database
    await connectToDatabase();

    // Query user
    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json({ error: 'Invalid admin username or password credentials.' }, { status: 401 });
    }

    // Compare encrypted passwords
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid admin username or password credentials.' }, { status: 401 });
    }

    // Sign cryptographic JWT token
    const userId = user._id ? user._id.toString() : (user.id || user.username || '');
    const token = signToken({ userId, username: user.username });

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: userId,
        username: user.username,
        role: user.role,
      }
    });

  } catch (err: any) {
    console.error('Login Route Error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
