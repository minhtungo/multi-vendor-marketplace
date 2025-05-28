import { getCustomer } from '@/server/customer/get-customer';
import HeroSection from '@/components/home/hero-section';

export default async function Home() {
  const customer = await getCustomer();
  return (
    <>
      {customer && <div>{customer.email}</div>}
      <HeroSection />
    </>
  );
}
