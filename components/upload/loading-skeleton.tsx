"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const SectionTitle = ({ title }: { title: string }) => (
  <motion.div
    className="flex flex-col gap-2 mb-6 sticky top-0 pt-2 pb-4 bg-background/80 backdrop-blur-xs z-10"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >
    <h2 className="text-3xl lg:text-4xl font-bold text-center">{title}</h2>
  </motion.div>
);

const ContentSection = ({ points }: { points: string[] }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="space-y-4"
  >
    {points.map((point, index) => (
      <p key={index} className="text-lg text-gray-700">
        {point}
      </p>
    ))}
  </motion.div>
);

export function SummaryViewerSkeleton() {
  const staticData = {
    title: "Summary Section",
    points: [
      "This is a summary of the content.",
      "It includes key points and information.",
      "More details can be added as required.",
    ],
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Card
        className="relative px-2 h-[500px] sm:h-[400px] lg:h-[500px] 
                   w-full xl:w-[600px] bg-gradient-to-br 
                   from-background via-background/95 to-emerald-500/5
                   backdrop-blur-lg shadow-2xl rounded-3xl 
                   border border-emerald-500/10 overflow-hidden"
      >
        <div className="h-full overflow-y-auto scrollbar-hide pt-12 sm:pt-16 pb-20 sm:pb-24">
          <div className="px-4 sm:px-6">
            <SectionTitle title={staticData.title} />
            <ContentSection points={staticData.points} />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
