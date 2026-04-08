import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import WhyUsSection from '@/components/WhyUsSection';
import ServicesSection from '@/components/ServicesSection';
import TrustSection from '@/components/TrustSection';
import StatsSection from '@/components/StatsSection';
import CTASection from '@/components/CTASection';
import BookingSection from '@/components/BookingSection';
import TrackingSection from '@/components/TrackingSection';
import BlogSection from '@/components/BlogSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <WhyUsSection />
      <ServicesSection />
      <TrustSection />
      <StatsSection />
      <CTASection />
      <BookingSection />
      <TrackingSection />
      <BlogSection />
      <AboutSection />
      <ContactSection />
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default Index;
