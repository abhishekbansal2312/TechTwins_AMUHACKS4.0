import React from "react";
import Heemeraldction from "@/components/home/hero-section";
import BgGradient from "@/components/common/bg-gradient";
import DemoSection from "@/components/home/demo-section";
import HowItWorksSection from "@/components/home/how-it-work";
import PricingSection from "@/components/home/pricing-section";
import CTASection from "@/components/home/cta-section";

export default function page() {
  return (
    <div className="relative w-full">
      <BgGradient />
      <div className="flex flex-col">
        <Heemeraldction />
        <DemoSection />
        <HowItWorksSection />
        <PricingSection />
        <CTASection />
      </div>
    </div>
  );
}
