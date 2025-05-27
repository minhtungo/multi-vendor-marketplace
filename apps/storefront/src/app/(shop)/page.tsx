import { getUser } from '@/api/auth/get-user';
import HeroSection from '@/components/home/hero-section';

export default async function Home() {
  const user = await getUser();
  return (
    <>
      {user && <div>{user.email}</div>}
      <HeroSection />
    </>
  );
}
