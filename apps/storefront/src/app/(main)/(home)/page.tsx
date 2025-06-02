import { FeaturedProducts } from '@/modules/home/components/featured-products';
import Features from '@/modules/home/components/features';
import HeroSection from '@/modules/home/templates/hero-section';
import { Section, SectionContent, SectionHeader, SectionTitle } from '@/modules/layout/components/section';

export default async function Home() {
  return (
    <main>
      <HeroSection />
      <Section>
        <SectionHeader>
          <SectionTitle>Featured Products</SectionTitle>
        </SectionHeader>
        <SectionContent>
          <FeaturedProducts />
        </SectionContent>
      </Section>
      <Features />
    </main>
  );
}
