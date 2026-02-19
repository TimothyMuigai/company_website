"use client";

import Hero from "./Hero";
import { Navbar } from "@/components/landingPage/navs/navBar";
import UseCasesSection from "../components/UseCaseSection";
import IndustriesTabs from "@/components/industry/IndustriesTab";
import ProcessTabs from "@/components/process/ProcessTab";
import RiskCalculator from "@/components/calculator/RiskCalculator";
import BenefitsSection from "@/components/benefits/BenefitsSection";
import CompareSection from "@/components/benefits/CompareSection";
import TestimonialsSection from "@/components/testimonials/TestimonialSection";
import PricingSection from "@/components/pricing/PricingSection";
import FAQSection from "@/components/faq/FaqSection";
import Image from "next/image";
// import Navbar from "./NavBar";

export default function Home() {
  return (
    <>
      {/* HERO SECTION ONLY */}
      <section className="relative min-h-screen overflow-hidden bg-[#0A1015]">

        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/landingPage_deeptrack.png"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
        </div>

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
        <div id="industries" className="scroll-mt-24">
          <IndustriesTabs />
        </div>
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
        {/* <FinalCTASection /> */}
      </section>
    </>
  );
}
