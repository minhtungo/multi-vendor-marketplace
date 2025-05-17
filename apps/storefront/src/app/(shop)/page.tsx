import { CurrentUser } from '@/app/(shop)/current-user';
import HeroSection from '@/components/home/hero-section';

export default function Home() {
  return (
    <>
      <HeroSection />
      <CurrentUser />
    </>
  );
}
