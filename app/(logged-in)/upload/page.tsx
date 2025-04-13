import BgGradient from "@/components/common/bg-gradient";
import { SummaryViewerSkeleton } from "@/components/upload/loading-skeleton";
import UploadForm from "@/components/upload/upload-form";
import UploadHeader from "@/components/upload/upload-header";
import { hasReachedUploadLimit } from "@/lib/user";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SummaryViewer } from "@/components/summaries/summary-viewer";
import { aboutUpload } from "@/utils/about";

export const maxDuration = 60;
export default async function Page() {
  const user = await currentUser();
  const userId = user?.id;

  if (!userId) {
    redirect("/sign-in");
  }

  const uploadLimitData = await hasReachedUploadLimit(userId);

  let hasReachedLimit = true;
  let uploadLimit = 0;

  if (uploadLimitData) {
    hasReachedLimit = uploadLimitData.hasReachedLimit;
    uploadLimit = uploadLimitData.uploadLimit;
  } else {
    console.error("Failed to retrieve upload limit data.");
  }

  if (hasReachedLimit) {
    redirect("/dashboard");
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center">
      <BgGradient />
      <div className="w-full max-w-7xl px-6 py-8 sm:py-20 lg:px-8">
        <UploadHeader />
        <UploadForm />
      </div>
      <div className="w-full flex justify-center py-6 sm:py-8">
        <SummaryViewer summary={aboutUpload} />
      </div>
    </div>
  );
}
