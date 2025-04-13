"use client";
import React from "react";
import { motion } from "framer-motion";
import JourneyHero from "@/components/journey/JourneyHero";
import JourneySteps from "@/components/journey/JourneySteps";
import JourneyBenefits from "@/components/journey/JourneyBenefits";
import JourneyFeatures from "@/components/journey/JourneyFeatures";
const JourneyPage: React.FC = () => {
  return (
    <div className="relative bg-green-950 text-green-50 min-h-screen overflow-hidden">
      {/* Snake motif background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-20 -left-20 w-64 h-64 opacity-5"
          animate={{
            x: [0, 20, 0],
            y: [0, 10, 0],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg
            viewBox="0 0 200 200"
            fill="currentColor"
            className="w-full h-full text-green-300"
          >
            <path d="M190,100c0,49.71-40.29,90-90,90S10,149.71,10,100S50.29,10,100,10S190,50.29,190,100z M140,70c-5.52,0-10-4.48-10-10s4.48-10,10-10s10,4.48,10,10S145.52,70,140,70z M60,70c-5.52,0-10-4.48-10-10s4.48-10,10-10s10,4.48,10,10S65.52,70,60,70z M100,150c-22.09,0-40-17.91-40-40h10c0,16.54,13.46,30,30,30s30-13.46,30-30h10C140,132.09,122.09,150,100,150z" />
          </svg>
        </motion.div>

        <motion.div
          className="absolute -bottom-20 -right-20 w-96 h-96 opacity-5"
          animate={{
            x: [0, -20, 0],
            y: [0, -10, 0],
            rotate: [0, -5, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg
            viewBox="0 0 200 200"
            fill="currentColor"
            className="w-full h-full text-green-300"
          >
            <path d="M185.42,14.58c-19.88-19.88-52.14-19.88-72.02,0c-11.72,11.72-16.68,27.74-14.76,43.3C84.34,62.06,72,77.02,72,95c0,17.92,12.26,32.82,28.58,37.14C98.18,148.78,83.84,160,67,160H37C17.2,160,0,177.2,0,200h10c0-14.88,12.12-27,27-27h30c28.16,0,51-22.84,51-51c0-22.5-14.76-41.64-35.02-48.26c-0.34-12.94,4.44-25.88,14.42-35.86c15.54-15.54,40.84-15.54,56.36,0C167.44,51.54,167.44,76.86,152,92.4c-15.62,15.42-40.92,15.42-56.4,92.4l-7.08,7.08c19.16,19.16,50.3,19.16,69.46,0c19.76-19.76,19.76-51.8,0-71.56S107.16,8.16,127,8.16S107.16,14.58,185.42,14.58z" />
          </svg>
        </motion.div>
      </div>

      {/* Main content */}
      <div className="relative z-10">
        <JourneyHero />
        <JourneySteps />
        <JourneyFeatures />
        <JourneyBenefits />
      </div>
    </div>
  );
};

export default JourneyPage;
