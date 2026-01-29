import Hero from "./Hero";
import Navbar from "./NavBar";
import UseCasesSection from "../components/UseCaseSection";
import IndustriesTabs from "@/components/industry/IndustriesTab";
import ProcessTabs from "@/components/process/ProcessTab";
import RiskCalculator from "@/components/calculator/RiskCalculator";
import BenefitsSection from "@/components/benefits/BenefitsSection";
import CompareSection from "@/components/benefits/CompareSection";
import TestimonialsSection from "@/components/testimonials/TestimonialSection";
import PricingSection from "@/components/pricing/PricingSection";
import FAQSection from "@/components/faq/FaqSection";
import FinalCTASection from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* HERO SECTION ONLY */}
      <section className="relative min-h-screen overflow-hidden bg-[#0A1015]">
        {/* Hero background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1a2f] via-[#0e2a4a] to-black" />
        <div className="absolute inset-0 opacity-30 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:120px_120px]" />

        {/* Hero content */}
        <div className="relative z-10">
          <Navbar />
          <Hero />
        </div>
      </section>

      <section className="bg-white">
        {/* NEXT PAGE SECTION */}
        <UseCasesSection />
        {/* NEXT PAGE SECTION */}
        <ProcessTabs />
        {/* NEXT PAGE SECTION */}
        <RiskCalculator />
        {/* NEXT PAGE SECTION */}
        <IndustriesTabs />
        {/* NEXT PAGE SECTION */}
        <BenefitsSection />
        {/* NEXT PAGE SECTION */}
        <CompareSection />
        {/* NEXT PAGE SECTION */}
        <TestimonialsSection />
        {/* NEXT PAGE SECTION */}
        <PricingSection />
        {/* NEXT PAGE SECTION */}
        <FAQSection />
        {/* NEXT PAGE SECTION */}
        <FinalCTASection />
      </section>
    </>
  );
}
