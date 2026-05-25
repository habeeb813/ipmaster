import { NextResponse } from 'next/server';
import { getAdminFromRequest } from '@/lib/jwt';
import { rateLimiter, getClientIp } from '@/lib/rateLimit';

// Premium Curated Unsplash Stock Media library assets
const CURATED_MEDIA = [
  {
    id: 'media-1',
    name: 'law_library_intellectual_property',
    url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
    type: 'image/jpeg',
    size: '124 KB',
    dimensions: '1920x1080',
    createdAt: '2026-05-20T10:00:00Z',
  },
  {
    id: 'media-2',
    name: 'corporate_contract_signing',
    url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    type: 'image/jpeg',
    size: '98 KB',
    dimensions: '1600x900',
    createdAt: '2026-05-21T11:30:00Z',
  },
  {
    id: 'media-3',
    name: 'brand_protection_security',
    url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    type: 'image/jpeg',
    size: '145 KB',
    dimensions: '1200x800',
    createdAt: '2026-05-22T08:15:00Z',
  },
  {
    id: 'media-4',
    name: 'patent_industrial_design',
    url: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=800&q=80',
    type: 'image/jpeg',
    size: '110 KB',
    dimensions: '1500x1000',
    createdAt: '2026-05-23T14:45:00Z',
  },
  {
    id: 'media-5',
    name: 'advocate_consulting_client',
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    type: 'image/jpeg',
    size: '86 KB',
    dimensions: '800x800',
    createdAt: '2026-05-24T09:00:00Z',
  },
  {
    id: 'media-6',
    name: 'startup_compliance_meeting',
    url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
    type: 'image/jpeg',
    size: '132 KB',
    dimensions: '1400x933',
    createdAt: '2026-05-25T12:00:00Z',
  }
];

// Memory registry to track admin uploaded media items
let localRegistry = [...CURATED_MEDIA];

export async function GET(req: Request) {
  const ip = getClientIp(req);
  const limiter = rateLimiter(ip);
  if (!limiter.success) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }

  return NextResponse.json(localRegistry);
}

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
    const { name, url, type, size, dimensions } = await req.json();

    if (!name || !url) {
      return NextResponse.json({ error: 'Name and URL are required' }, { status: 400 });
    }

    const newAsset = {
      id: `media-${Date.now()}`,
      name: name.toLowerCase().replace(/[^a-z0-9_-]/g, '_'),
      url,
      type: type || 'image/jpeg',
      size: size || '100 KB',
      dimensions: dimensions || '1024x768',
      createdAt: new Date().toISOString(),
    };

    localRegistry.unshift(newAsset);

    return NextResponse.json({ success: true, asset: newAsset });
  } catch (err: any) {
    console.error('Media POST Error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
