"use client";

import { Card } from "@/components/ui/card";
import DeleteButton from "./delete-button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { FileText, Shield, AlertTriangle } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";

const ParchmentHeader = ({
  fileUrl,
  title,
  createdAt,
}: {
  fileUrl: string;
  title: string | null;
  createdAt: string;
}) => {
  return (
    <div className="flex items-start gap-2 sm:gap-4">
      <FileText className="w-5 h-5 sm:w-7 sm:h-7 text-amber-600 mt-1" />
      <div className="flex-1 min-w-0">
        <h3 className="text-sm sm:text-base xl:text-lg font-semibold text-gray-900 truncate w-4/5">
          {title || "Unnamed Parchment"}
        </h3>
        <p className="text-xs sm:text-sm text-gray-500">
          {createdAt ? format(new Date(createdAt), "PPP") : "Date Unknown"}
        </p>
      </div>
    </div>
  );
};

// This shows what types of magical identifiers were found
const MagicalIdentifierChips = ({ piiTypes }: { piiTypes: string[] }) => {
  if (!piiTypes || piiTypes.length === 0) return null;

  // Map of PII type to Wizarding World equivalent
  const wizardingTerms: { [key: string]: string } = {
    AADHAR: "Wand Registry",
    PAN: "Gringotts ID",
    CREDIT_CARD: "Vault Number",
    PHONE: "Floo Address",
    EMAIL: "Owl Post",
    PASSPORT: "Int'l Portkey ID",
    VOTER_ID: "Wizengamot Reg",
    LICENSE: "Apparition License",
    BANK_ACCOUNT: "Gringotts Vault",
  };

  return (
    <div className="flex flex-wrap gap-1 mt-1">
      {piiTypes.slice(0, 3).map((type, index) => (
        <span
          key={index}
          className="px-1.5 py-0.5 text-xs bg-amber-100 text-amber-800 rounded font-medium"
        >
          {wizardingTerms[type] || type.toLowerCase()}
        </span>
      ))}
      {piiTypes.length > 3 && (
        <span className="px-1.5 py-0.5 text-xs bg-amber-100 text-amber-800 rounded font-medium">
          +{piiTypes.length - 3} more spells
        </span>
      )}
    </div>
  );
};

export default function SummaryCard({ summary }: { summary: any }) {
  // Extract magical identifier types from summary text if they exist
  const piiTypes = summary.pii_types
    ? JSON.parse(summary.pii_types)
    : extractMagicalIdentifiersFromSummary(summary.summary_text);

  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        rotate: 0.5,
        boxShadow: "0 4px 12px rgba(139, 69, 19, 0.15)",
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="relative"
    >
      <Card
        className={cn(
          "relative h-full p-3 sm:p-4 transition-all duration-300 border-amber-300 bg-amber-50"
        )}
      >
        <div className="absolute top-2 right-2">
          <DeleteButton summaryId={summary.id} />
        </div>

        <Link
          href={`/summaries/${summary.id}`}
          className="block p-3 sm:p-5 pb-2 sm:pb-3"
        >
          <div className="flex flex-col gap-2 sm:gap-3">
            <ParchmentHeader
              fileUrl={summary.original_file_url}
              title={summary.title}
              createdAt={summary.created_at}
            />

            <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 pl-1 sm:pl-2 font-serif">
              {summary.summary_text || "No magical detection report available."}
            </p>

            <div className="flex flex-col gap-1 mt-1 sm:mt-2">
              <MagicalIdentifierChips piiTypes={piiTypes} />
            </div>
          </div>
        </Link>
      </Card>
    </motion.div>
  );
}

// Helper function to extract magical identifier types from summary text
function extractMagicalIdentifiersFromSummary(summaryText: string): string[] {
  if (!summaryText) return [];

  // Look for common magical identifier labels in the report
  const magicalLabels = [
    "AADHAR",
    "PAN",
    "CREDIT_CARD",
    "PHONE",
    "EMAIL",
    "PASSPORT",
    "VOTER_ID",
    "LICENSE",
    "BANK_ACCOUNT",
  ];

  const foundTypes = magicalLabels.filter(
    (label) =>
      summaryText.includes(label) ||
      summaryText.includes(label.toLowerCase()) ||
      summaryText.includes(label.replace("_", " "))
  );

  return foundTypes;
}
