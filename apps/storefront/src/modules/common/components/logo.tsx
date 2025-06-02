import { siteConfig } from '@/config/site';

export const Logo = () => {
  return <div className='text-xl font-bold'>{siteConfig.name}</div>;
};
