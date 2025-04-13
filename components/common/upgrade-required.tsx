import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import BgGradient from "@/components/common/bg-gradient";
import Link from "next/link";

export default function UpgradeRequired() {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center">
      <BgGradient className="from-emerald-100 via-emerald-50 to-white" />

      <div className="container px-8 py-16 relative z-10">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-emerald-100 p-8 md:p-12 flex flex-col items-center justify-center gap-8 text-center max-w-2xl mx-auto">
          <div className="flex items-center gap-2 text-emerald-500 bg-emerald-50 px-4 py-2 rounded-full">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-medium uppercase tracking-wider">
              Premium Feature
            </span>
          </div>

          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
              Subscription Required
            </h1>
            <p className="text-gray-600 mb-2 text-lg">
              You need to upgrade to the Basic Plan or the Pro Plan to access
              this feature
            </p>
            <p className="text-gray-500 text-sm">
              Get unlimited summaries, longer document support, and priority
              processing
            </p>
          </div>

          <Link href="/#pricing" className="w-full max-w-xs">
            <Button className="bg-gradient-to-r from-emerald-500 to-emerald-700 hover:from-emerald-600 hover:to-emerald-800 w-full group transition-all duration-300 h-12 text-base font-medium">
              View Pricing Plans
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
