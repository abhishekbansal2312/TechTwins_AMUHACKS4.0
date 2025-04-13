import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-emerald-100", className)}
      {...props}
    />
  );
}

export default function Loading() {
  return (
    <div className="container max-w-5xl mx-auto flex flex-col gap-4 px-2 py-12 sm:py-24">
      {/* Heading */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-10 w-64 bg-gradient-to-r from-emerald-100 to-emerald-200" />
          <Skeleton className="h-5 w-80 bg-emerald-50" />
        </div>
        <Skeleton className="h-10 w-32 bg-gradient-to-r from-emerald-300 to-emerald-400" />
      </div>

      {/* Alert */}
      <div className="mb-6">
        <Skeleton className="h-16 w-full rounded-lg bg-emerald-50 border border-emerald-200" />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm">
            <Skeleton className="h-40 w-full bg-gradient-to-r from-emerald-50 to-emerald-100" />
            <div className="p-4 flex flex-col gap-2">
              <Skeleton className="h-6 w-3/4 bg-emerald-100" />
              <Skeleton className="h-4 w-full bg-emerald-50" />
              <Skeleton className="h-4 w-5/6 bg-emerald-50" />
              <div className="flex justify-between mt-2">
                <Skeleton className="h-8 w-24 bg-emerald-100" />
                <Skeleton className="h-8 w-8 rounded-full bg-emerald-200" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
