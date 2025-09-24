import { Header } from "../components/landing-page/header";
import { HeroSection } from "../components/landing-page/hero-section";
import { FeaturesSection } from "../components/landing-page/features-section";
import { ModulesSection } from "../components/landing-page/modules-section";
import { CTASection } from "../components/landing-page/cta-section";
import { Footer } from "../components/landing-page/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <ModulesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
