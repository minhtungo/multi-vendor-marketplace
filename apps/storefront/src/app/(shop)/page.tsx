import HeroSection from '@/modules/home/templates/hero-section';
import { FeaturedProducts } from '@/modules/home/components/featured-products';
import { Section, SectionContent, SectionHeader, SectionTitle } from '@/modules/layout/components/section';

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
