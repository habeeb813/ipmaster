import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppCTA from '@/components/WhatsAppCTA';
import LeadPopup from '@/components/LeadPopup';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'IPMASTER | Premium Intellectual Property & Legal Corporate Services',
  description: 'Secure your brand name, logo, software copyright, patents, ISO credentials, and GST registrations online with expert trademark attorneys and agents.',
  keywords: 'trademark registration, copyright filing, patent drafting, ISO certification, GSTIN registration, DPIIT startup India, legal documentation corporate, IP attorney',
  metadataBase: new URL('https://ipmaster.in'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'IPMASTER | Intellectual Property & Legal Corporate Services',
    description: 'Expert online trademark, copyright, patent filing, and business compliances with 99.4% success rate.',
    url: 'https://ipmaster.in',
    siteName: 'IPMASTER India',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&h=630&q=80',
        width: 1200,
        height: 630,
        alt: 'IPMASTER Legal Services',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IPMASTER | Premium Brand Protection Services',
    description: 'Register trademarks, copyrights, and patents online. Fast DPIIT & GSTIN setup.',
    images: ['https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&h=630&q=80'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Inject structured JSON-LD local business schema to maximize search engine authority
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    'name': 'IPMASTER Legal & IP Advisory',
    'image': 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
    'telePhone': '+919876543210',
    'email': 'contact@ipmaster.in',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Level 9, Raheja Towers, MG Road',
      'addressLocality': 'Bengaluru',
      'addressRegion': 'Karnataka',
      'postalCode': '560001',
      'addressCountry': 'IN'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': '12.9739',
      'longitude': '77.6119'
    },
    'url': 'https://ipmaster.in',
    'priceRange': '$$',
    'openingHoursSpecification': {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday'
      ],
      'opens': '09:00',
      'closes': '18:00'
    }
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-accent/30">
        <Header />
        
        {/* Main Content Layout offset to account for fixed header */}
        <main className="flex-1 pt-20">
          {children}
        </main>
        
        <Footer />
        <WhatsAppCTA />
        <LeadPopup />
      </body>
    </html>
  );
}
