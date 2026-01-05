import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { IndustriesGrid } from "@/components/home/IndustriesGrid";
import { TestimonialsCarousel } from "@/components/home/TestimonialsCarousel";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ServicesPreview />
      <IndustriesGrid />
      <TestimonialsCarousel />
      <CTASection />
    </Layout>
  );
};

export default Index;
