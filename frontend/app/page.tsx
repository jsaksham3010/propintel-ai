import Navbar from "@/components/common/Navbar";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import HowItWorks from "@/components/home/HowItWorks";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Founder from "@/components/home/Founder";
import OurVision from "@/components/home/OurVision";
import FAQ from "@/components/home/FAQ";
import CTA from "@/components/home/CTA";
import Footer from "@/components/common/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <WhyChooseUs />
      <Founder />
      <OurVision />
      <FAQ />
      <CTA />
      <Footer />
    </>
  );
}