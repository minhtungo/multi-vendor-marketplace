import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@repo/ui/globals.css';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { siteConfig } from '@/configs/site';

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
        <div className='grid grid-rows-[auto_1fr_auto] min-h-screen'>
          <Header />
          <main className='container'>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
