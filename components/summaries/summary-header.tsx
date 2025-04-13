import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Sparkles, Calendar, Clock } from "lucide-react";
import Link from "next/link";

export function SummaryHeader({
  title,
  created_at,
  readingTime,
}: {
  title: string;
  created_at: string;
  readingTime: number;
}) {
  return (
    <div>
      <div className="flex justify-between items-center gap-4 mb-4">
        <div className="flex items-center gap-4">
          <Badge
            variant="secondary"
            className="relative px-4 py-1.5 text-sm font-medium 
              bg-white/80 backdrop-blur-xs rounded-full hover:bg-white/90 
              transition-all duration-200 shadow-xs hover:shadow-md flex items-center"
          >
            <Sparkles className="h-4 w-4 mr-1.5 text-emerald-500" />
            AI Summary
          </Badge>

          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="h-4 w-4 text-emerald-400" />
            {new Date(created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="h-4 w-4 text-emerald-400" />
            {readingTime} min read
          </div>
        </div>

        <div>
          <Link href="/dashboard">
            <Button
              variant="link"
              size="sm"
              className="group flex items-center gap-1 sm:gap-2 
                hover:bg-white/80 backdrop-blur-xs rounded-full transition-all 
                duration-200 shadow-xs hover:shadow-md border border-emerald-100/30 
                bg-emerald-100 px-2 py-4 sm:px-3"
            >
              <ChevronLeft
                className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-500 
                transition-transform group-hover:translate-x-0.5"
              />
              <span className="text-xs sm:text-sm text-muted-foreground font-medium">
                Back <span className="hidden sm:inline">to Dashboard</span>
              </span>
            </Button>
          </Link>
        </div>
      </div>

      <h1 className="text-2xl lg:text-4xl font-bold lg:tracking-tight mt-4 mb-2">
        <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
          {title}
        </span>
      </h1>
    </div>
  );
}

export function parsePoint(point: string) {
  const isNumbered = /^\d+\./.test(point);
  const isMainPoint = /^[A-Z]/.test(point);
  const emojiRegex = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]/u;
  const emojiMatch = point.match(emojiRegex);
  const hasEmoji = !!emojiMatch;
  const emoji = hasEmoji ? emojiMatch[0] : null;

  let cleanPoint = point.replace(emojiRegex, "").trim();
  if (isNumbered) cleanPoint = cleanPoint.replace(/^\d+\.\s*/, "");

  return { isNumbered, isMainPoint, hasEmoji, emoji, cleanPoint };
}
