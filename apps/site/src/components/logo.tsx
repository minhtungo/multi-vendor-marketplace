import { siteConfig } from '@/configs/site';

export const Logo = () => {
  return <div className='text-xl font-bold'>{siteConfig.name}</div>;
};
