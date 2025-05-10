import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { siteConfig } from '@/configs/site';
import { Providers } from '@/providers';
import '@repo/ui/globals.css';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Toaster } from '@repo/ui/components/sonner';
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
      <Providers>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}>
          <div className='grid grid-rows-[auto_1fr_auto] min-h-screen'>
            <Header />
            <main className='container'>{children}</main>
            <Footer />
            <Toaster />
          </div>
        </body>
      </Providers>
    </html>
  );
}
