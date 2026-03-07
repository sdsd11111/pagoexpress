import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import VideoSpotlight from "@/components/VideoSpotlight";
import ServicesSection from "@/components/ServicesSection";
import Testimonials from "@/components/Testimonials";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutUs />
      <VideoSpotlight />
      <ServicesSection />
      <Testimonials />
      <FAQSection />
      <ContactSection />
    </>
  );
}

