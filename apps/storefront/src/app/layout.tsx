import { Footer } from '@/components/footer/footer';
import { Header } from '@/modules/layout/templates/header';
import { Providers } from '@/components/providers';
import { siteConfig } from '@/configs/site';
import { Toaster } from '@repo/ui/components/sonner';
import '@repo/ui/globals.css';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
