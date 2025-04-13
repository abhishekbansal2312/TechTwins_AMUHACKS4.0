// loading.js - Create this file in the same folder as your SummaryPage
import BgGradient from "@/components/common/bg-gradient";
import { Skeleton } from "@/components/ui/skeleton";
import { FileText } from "lucide-react";

export default function Loading() {
  return (
    <div className="relative min-h-screen items-center">
      <BgGradient className="from-emerald-400 via-emerald-300 to-orange-200" />
      <div className="container mx-auto flex flex-col gap-4">
        <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-12 lg:py-24">
          <div className="flex flex-col">
            {/* Loading header */}
            <div className="space-y-2">
              <Skeleton className="h-10 w-3/4 max-w-2xl bg-emerald-100" />
              <div className="flex gap-4">
                <Skeleton className="h-6 w-32 bg-emerald-50" />
                <Skeleton className="h-6 w-24 bg-emerald-50" />
              </div>
            </div>
          </div>

          {/* Loading source info */}
          <div className="mt-4">
            <Skeleton className="h-16 w-full max-w-3xl bg-emerald-50 border border-emerald-100/30 rounded-xl" />
          </div>

          <div className="relative mt-4 sm:mt-8 lg:mt-16">
            <div
              className="relative p-4 sm:p-6 lg:p-8
              bg-white/80 backdrop-blur-md rounded-2xl
              sm:rounded-3xl shadow-xl border border-emerald-100/30 
              transition-all duration-300 hover:shadow-2xl
              hover:bg-white/90 max-w-4xl mx-auto"
            >
              <div
                className="absolute inset-0
                bg-linear-to-br from-emerald-50/50 via-orange-50/30 to-transparent opacity-50 rounded-2xl sm:rounded-3xl"
              />

              <div
                className="absolute top-2 sm:top-4
                right-2 sm:right-4 flex items-center gap-1.5
                sm:gap-2 text-xs sm:text-sm
                text-muted-foreground bg-white/90 px-2 sm:px-3
                py-1 sm:py-1.5 rounded-full shadow-xs"
              >
                <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-400" />
                <Skeleton className="h-3 w-12 sm:h-4 sm:w-16 bg-emerald-50" />
              </div>

              <div className="relative mt-8 sm:mt-6 flex justify-center">
                {/* Loading summary content */}
                <div className="w-full space-y-4">
                  <Skeleton className="h-6 w-full bg-emerald-50" />
                  <Skeleton className="h-6 w-11/12 bg-emerald-50" />
                  <Skeleton className="h-6 w-full bg-emerald-50" />
                  <Skeleton className="h-6 w-10/12 bg-emerald-50" />
                  <Skeleton className="h-6 w-full bg-emerald-50" />
                  <Skeleton className="h-6 w-9/12 bg-emerald-50" />
                  <Skeleton className="h-6 w-full bg-emerald-50" />
                  <Skeleton className="h-6 w-11/12 bg-emerald-50" />
                  <Skeleton className="h-6 w-10/12 bg-emerald-50" />
                  <Skeleton className="h-6 w-full bg-emerald-50" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
