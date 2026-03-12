import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import CertificationsSection from "@/components/CertificationsSection";
import Footer from "@/components/Footer";
import AdvancedStratigies from "@/components/AdvancedStratigies";
import Testimonials from "@/components/Testimonials";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <AdvancedStratigies />
      <CertificationsSection />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
