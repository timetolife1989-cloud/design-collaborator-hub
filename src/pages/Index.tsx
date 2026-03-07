import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';

import ModulesSection from '@/components/ModulesSection';
import FeaturesSection from '@/components/FeaturesSection';
import TechSection from '@/components/TechSection';
import CtaSection from '@/components/CtaSection';
import Footer from '@/components/Footer';
import NeuronCanvas from '@/components/NeuronCanvas';
import LiquidBlobs from '@/components/LiquidBlobs';

const Index = () => (
  <div className="ainova-body-bg ainova-body-vignette ainova-grid-bg relative">
    <LiquidBlobs />
    <NeuronCanvas />
    <div className="relative z-[2]">
      <Navbar />
      <Hero />
      
      <ModulesSection />
      <FeaturesSection />
      <TechSection />
      <CtaSection />
      <Footer />
    </div>
  </div>
);

export default Index;
