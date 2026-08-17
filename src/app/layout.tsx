import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import AnalyticsTracker from "../components/AnalyticsTracker";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: 'EDMTL - Professional Home Maintenance Services Montreal',
    template: '%s | EDMTL - Montreal Home Maintenance'
  },
  description: 'Professional home maintenance services in Montreal. Window cleaning, gutter services, pressure washing, and deck refinishing. Fully insured and experienced team.',
  keywords: ['home maintenance Montreal', 'window cleaning', 'gutter cleaning', 'pressure washing', 'deck refinishing', 'Montreal cleaning services'],
  authors: [{ name: 'EDMTL' }],
  creator: 'EDMTL',
  publisher: 'EDMTL',
  metadataBase: new URL('https://edmtl.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en': '/',
      'fr': '/fr',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: 'https://edmtl.com',
    title: 'EDMTL - Professional Home Maintenance Services Montreal',
    description: 'Professional home maintenance services in Montreal. Window cleaning, gutter services, pressure washing, and deck refinishing.',
    siteName: 'EDMTL',
    images: [{
      url: '/opengraph-image',
      width: 1200,
      height: 630,
      alt: 'EDMTL - Entretien Domestique Montreal',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EDMTL - Professional Home Maintenance Services Montreal',
    description: 'Professional home maintenance services in Montreal. Window cleaning, gutter services, pressure washing, and deck refinishing.',
    images: ['/twitter-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17512520543"
          strategy="beforeInteractive"
        />
        <Script
          id="google-ads-tag"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17512520543');
              gtag('config', 'G-LBDWKP9YD1', { send_page_view: false });
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense fallback={null}>
          <AnalyticsTracker />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
