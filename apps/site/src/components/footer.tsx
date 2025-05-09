import { menu } from '@/configs/menu';
import { siteConfig } from '@/configs/site';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className='container py-12'>
      <div className='flex flex-wrap justify-between gap-6'>
        <span className='text-muted-foreground order-last block text-center text-sm md:order-first'>
          © {new Date().getFullYear()} {siteConfig.name}, All rights reserved
        </span>
        <div className='order-first flex flex-wrap justify-center gap-6 text-sm md:order-last'>
          {menu.footer.map((link) => (
            <Link
              key={`footer-${link.title}`}
              href={link.href}
              className='text-muted-foreground hover:text-primary block duration-150'
            >
              <span>{link.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
