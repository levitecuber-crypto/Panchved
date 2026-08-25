import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://panchved-ayurveda.arnavchougule.chatgpt.site'),
  title: 'Panchved — Authentic Ayurveda, Personalised Care',
  description: 'Doctor-led Ayurvedic care designed around your body, mind and life.',
  openGraph: {
    title: 'Panchved — Return to your natural balance',
    description: 'Doctor-led Ayurvedic care designed around your body, mind and life.',
    url: '/',
    siteName: 'Panchved Ayurveda',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Panchved — Return to your natural balance' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Panchved — Return to your natural balance',
    description: 'Doctor-led Ayurvedic care designed around your body, mind and life.',
    images: ['/og.png'],
  },
  icons: {
    icon: '/panchved-logo.png',
    shortcut: '/panchved-logo.png',
    apple: '/panchved-logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
