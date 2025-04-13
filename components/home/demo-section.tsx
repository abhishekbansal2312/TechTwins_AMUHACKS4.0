"use client";
import { Shield, Eye, Lock } from "lucide-react";
import { SummaryViewer } from "../summaries/summary-viewer";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { about } from "@/utils/about";

export default function DemoSection() {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  return (
    <section ref={ref} className="relative">
      <div className="max-w-7xl pb-20 mx-auto px-4 sm:px-6 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 
            bg-gradient-to-br from-green-500 via-blue-600 to-green-700 opacity-30 
            sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 100 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="flex flex-col items-center text-center space-y-6"
        >
          <div className="inline-flex items-center justify-center p-3"></div>

          <h3 className="font-bold text-3xl md:text-4xl max-w-2xl mx-auto font-serif text-green-900">
            Behold how our{" "}
            <span className="text-green-600 italic">Confidential Charm</span>{" "}
            protects your private information!
          </h3>

          <p className="text-green-800 max-w-xl mx-auto text-lg">
            Our magical shield detects and protects your sensitive information
            faster than you can say "Expecto Patronum!" — keeping your identity
            safe from the dark forces of the digital realm.
          </p>

          <div className="relative">
            <div className="absolute -inset-1 bg-green-300/30 blur-sm rounded-lg"></div>
            <div className="relative">
              <SummaryViewer summary={about} />
            </div>
            <div className="absolute -bottom-4 -right-4 w-16 h-16 opacity-20">
              <svg viewBox="0 0 100 100" className="text-green-700">
                <path
                  d="M50,10 L60,40 L90,40 L65,60 L75,90 L50,70 L25,90 L35,60 L10,40 L40,40 Z"
                  fill="currentColor"
                />
                <circle cx="50" cy="50" r="15" fill="currentColor" />
              </svg>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
