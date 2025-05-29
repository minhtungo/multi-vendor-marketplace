import HeroSection from '@/components/home/hero-section';
import { FeaturedProducts } from '@/modules/home/components/featured-products';
import { Section, SectionContent, SectionHeader, SectionTitle } from '@/components/section';

export default async function Home() {
  return (
    <>
      <HeroSection />
      <Section>
        <SectionHeader>
          <SectionTitle>Featured Products</SectionTitle>
        </SectionHeader>
        <SectionContent>
          <FeaturedProducts />
        </SectionContent>
      </Section>
    </>
  );
}
