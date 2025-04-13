"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, ArrowRight, Upload } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

import { containerVariants, itemVariants } from "@/utils/constants";
import MotionComponents from "../common/motion-wrapper";

const buttonVariants = {
  scale: 1.05,
  transition: {
    type: "spring",
    stiffness: 300,
    damping: 10,
    duration: 0.3,
  },
};

export default function HeroSection() {
  const { MotionSection, MotionDiv, MotionH1, MotionH2 } = MotionComponents;
  const router = useRouter();
  const { userId, isSignedIn } = useAuth();

  const handleGetStarted = () => {
    if (isSignedIn) {
      router.push("/upload");
    } else {
      router.push("/sign-up");
    }
  };

  return (
    <MotionSection
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center text-center min-h-screen px-6 py-16 sm:py-20 lg:pb-28 animate-in transition-all bg-gradient-to-b from-green-50 to-blue-100"
    >
      <MotionDiv
        variants={itemVariants}
        className="flex items-center space-x-2"
      >
        <MotionDiv className="relative p-[1px] overflow-hidden rounded-full bg-green-600 group transition-all duration-300 ease-in-out hover:bg-green-700">
          <Badge
            variant="secondary"
            className="relative flex items-center px-6 py-2 text-base font-medium bg-green-50 rounded-full transition-all duration-300 group-hover:bg-green-100"
          >
            <Shield className="h-8 w-8 lg:h-10 lg:w-10 mr-2 text-green-600 animate-pulse" />
            <p className="text-base text-green-800 transition-colors duration-300 group-hover:text-green-900">
              Backed by Advanced Encryption
            </p>
          </Badge>
        </MotionDiv>
      </MotionDiv>

      <MotionH1
        variants={itemVariants}
        className="font-serif font-bold text-4xl sm:text-5xl md:text-6xl py-6 leading-tight text-green-900"
      >
        Protect What{" "}
        <span className="relative inline-block">
          <span className="relative z-10 px-2">Matters</span>
          <span
            className="absolute inset-0 bg-green-300/50 -rotate-2 transform -skew-y-1"
            aria-hidden="true"
          ></span>
        </span>{" "}
        —Your Identity
      </MotionH1>

      <MotionH2
        variants={itemVariants}
        className="mt-2 text-lg sm:text-xl text-green-800 max-w-2xl mx-auto font-medium"
      >
        Keep your personal information secure with cutting-edge privacy
        technology and streamlined protection workflows.
      </MotionH2>

      <MotionDiv
        variants={itemVariants}
        className="flex flex-col sm:flex-row gap-4 mt-12"
      >
        <MotionDiv whileHover={buttonVariants}>
          <Button
            onClick={handleGetStarted}
            className="px-8 py-5 text-white text-lg sm:text-xl rounded-full bg-gradient-to-r from-green-700 to-blue-700 hover:from-blue-800 hover:to-green-800 font-bold flex gap-2 items-center shadow-lg"
          >
            <span>
              {isSignedIn ? "Upload Document" : "Get Started Securely"}
            </span>
            {isSignedIn ? (
              <Upload className="ml-1" />
            ) : (
              <ArrowRight className="ml-1 animate-pulse" />
            )}
          </Button>
        </MotionDiv>

        <MotionDiv whileHover={buttonVariants}>
          <Button
            variant="outline"
            className="px-8 py-5 text-lg sm:text-xl rounded-full border-2 border-green-500 hover:bg-green-100 hover:border-green-600 text-green-800 font-medium shadow-md"
            onClick={() => router.push("/#pricing")}
          >
            View Plans
          </Button>
        </MotionDiv>
        <MotionDiv whileHover={buttonVariants}>
          <Button
            variant="outline"
            className="px-8 py-5 text-lg sm:text-xl rounded-full border-2 border-green-500 hover:bg-green-100 hover:border-green-600 text-green-800 font-medium shadow-md"
          >
            <Link
              href={"/workflow"}
              className="font-serif hover:text-green-600"
            >
              Workflow
            </Link>
          </Button>
        </MotionDiv>
        <MotionDiv whileHover={buttonVariants}>
          <Button
            variant="outline"
            className="px-8 py-5 text-lg sm:text-xl rounded-full border-2 border-green-500 hover:bg-green-100 hover:border-green-600 text-green-800 font-medium shadow-md"
          >
            <Link
              href={"/voicebot"}
              className="font-serif hover:text-green-600"
            >
              Voice Bot
            </Link>
          </Button>
        </MotionDiv>
      </MotionDiv>

      <MotionDiv variants={itemVariants} className="mt-16 opacity-80">
        <svg className="w-32 h-32 mx-auto" viewBox="0 0 100 100">
          <path
            d="M50,5 L85,15 L85,50 C85,70 70,85 50,95 C30,85 15,70 15,50 L15,15 L50,5 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-green-600"
          />
          <circle cx="50" cy="50" r="15" className="fill-green-500" />
          <path
            d="M40,50 L45,55 L60,40"
            stroke="currentColor"
            strokeWidth="2"
            className="text-green-800"
          />
        </svg>
      </MotionDiv>
    </MotionSection>
  );
}
