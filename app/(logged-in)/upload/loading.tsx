"use client";

import React from "react";
import BgGradient from "@/components/common/bg-gradient";
import { Sparkle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Loading() {
  return (
    <div className="relative min-h-screen flex flex-col items-center">
      <BgGradient />

      <div className="w-full max-w-7xl px-6 py-8 sm:py-20 lg:px-8">
        {/* Upload Header Skeleton */}
        <section className="relative w-full flex flex-col justify-center items-center overflow-hidden mb-8">
          <div className="relative z-10 flex items-center space-x-2">
            <div className="relative p-[1px] overflow-hidden rounded-full bg-emerald-500/70 animate-pulse">
              <Badge
                variant={"secondary"}
                className="relative flex items-center px-6 py-2 text-base font-medium bg-white/80 rounded-full"
              >
                <div className="h-12 w-12 lg:h-12 lg:w-10 mr-2 bg-emerald-200/50 rounded-full animate-pulse" />
                <div className="w-48 h-6 bg-gray-200 rounded-md animate-pulse" />
              </Badge>
            </div>
          </div>

          <div className="relative z-10 mx-auto max-w-5xl px-6 text-center mt-6">
            <div className="h-14 w-3/4 mx-auto bg-gray-200 dark:bg-gray-800/60 rounded-lg animate-pulse" />
            <div className="mt-4 h-6 w-1/2 mx-auto bg-gray-200 dark:bg-gray-800/60 rounded-md animate-pulse" />
          </div>
        </section>

        {/* Upload Form Skeleton */}
        <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto p-6 bg-white dark:bg-gray-900/50 backdrop-blur-sm rounded-xl shadow-lg">
          <div className="flex flex-col gap-6">
            {/* Form title */}
            <div className="flex justify-between items-center">
              <div className="h-7 w-36 bg-gray-200 dark:bg-gray-800/60 rounded-md animate-pulse" />
              <div className="h-7 w-28 bg-gray-200 dark:bg-gray-800/60 rounded-md animate-pulse" />
            </div>

            {/* Upload area */}
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 flex flex-col items-center justify-center animate-pulse">
              <div className="w-16 h-16 rounded-full bg-emerald-200/30 dark:bg-emerald-800/20 mb-4 animate-pulse" />
              <div className="w-2/3 h-5 bg-gray-200 dark:bg-gray-800/60 rounded-md mb-2 animate-pulse" />
              <div className="w-1/2 h-4 bg-gray-200 dark:bg-gray-800/60 rounded-md mb-6 animate-pulse" />
              <div className="w-32 h-10 bg-emerald-200/50 dark:bg-emerald-800/20 rounded-md animate-pulse" />
            </div>

            {/* Additional form elements */}
            <div className="space-y-4">
              <div className="h-10 w-full bg-gray-200 dark:bg-gray-800/60 rounded-md animate-pulse" />
              <div className="h-10 w-full bg-gray-200 dark:bg-gray-800/60 rounded-md animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Summary viewer skeleton */}
    </div>
  );
}
