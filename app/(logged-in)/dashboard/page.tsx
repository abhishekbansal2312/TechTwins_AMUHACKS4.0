import BgGradient from "@/components/common/bg-gradient";
import { Button } from "@/components/ui/button";
import { ArrowRight, Plus } from "lucide-react";
import Link from "next/link";
import SummaryCard from "@/components/summaries/summary-card";
import { getSummaries } from "@/lib/summaries";
import { Suspense } from "react";

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import EmptySummaryState from "@/components/summaries/empty-summary";
import { hasReachedUploadLimit } from "@/lib/user";

import Loading from "./loading";

async function DashboardContent() {
  const user = await currentUser();
  const userId = user?.id;
  if (!userId) {
    return redirect("/sign-in");
  }

  const uploadLimitData = await hasReachedUploadLimit(userId);
  let hasReachedLimit = uploadLimitData?.hasReachedLimit ?? true;
  let uploadLimit = uploadLimitData?.uploadLimit ?? 0;

  const summaries = await getSummaries(userId);

  return (
    <div className="container max-w-5xl z-0 mx-auto flex flex-col gap-4 px-2 py-12 sm:py-24">
      {/* Heading & Button */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-amber-600 to-red-700 bg-clip-text text-transparent">
            Privacy Scan Reports
          </h1>
          <p className="text-gray-600">
            Scan your uploaded documents for sensitive or personally
            identifiable information.
          </p>
        </div>

        {hasReachedLimit ? (
          <Button
            disabled
            className="bg-amber-500 opacity-50 cursor-not-allowed"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Scan
          </Button>
        ) : (
          <Link href="/upload">
            <Button className="bg-amber-500 hover:bg-red-700 hover:scale-105 transition-all">
              <Plus className="w-5 h-5 mr-2" />
              New Scan
            </Button>
          </Link>
        )}
      </div>

      {/* Upload Limit Alert */}
      {hasReachedLimit && (
        <div className="border border-amber-300 bg-amber-100 text-amber-700 p-4 rounded-lg">
          <strong>
            You've reached your daily scan limit of {uploadLimit} uploads.
          </strong>{" "}
          Upgrade your plan to unlock more scans.
          <Link
            href="/#pricing"
            className="ml-2 text-red-700 font-semibold hover:underline"
          >
            View Plans <ArrowRight className="w-4 h-4 inline" />
          </Link>
        </div>
      )}

      {/* Reports List */}
      {summaries.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {summaries.map((summary, index) => (
            <SummaryCard
              key={index}
              summary={{
                ...summary,
                piiStatus: summary
                  ? "bg-red-100 border-red-300"
                  : "bg-emerald-100 border-emerald-300",
              }}
            />
          ))}
        </div>
      ) : (
        <EmptySummaryState />
      )}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <main className="min-h-screen">
      <BgGradient className="from-amber-200 via-red-200 to-red-100" />
      <Suspense fallback={<Loading />}>
        <DashboardContent />
      </Suspense>
    </main>
  );
}
