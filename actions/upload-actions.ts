"use server";

import { fetchAndExtractPdfText } from "@/lib/langchain";
import { detectPIIFromOpenAI } from "@/lib/openai";
import { detectPIIFromGemini } from "@/lib/geminiai";
import { auth } from "@clerk/nextjs/server";
import { getDbConnected } from "@/lib/db";
import { formatFileNameTitle } from "@/utils/format-utils";
import { revalidatePath } from "next/cache";
import { extractTitleFromPIIReport } from "@/utils/title-utils";

// PII detection patterns
const PII_PATTERNS = {
  AADHAR: /\b[2-9]{1}[0-9]{3}\s[0-9]{4}\s[0-9]{4}\b/, // Aadhar format: XXXX XXXX XXXX
  PAN: /\b[A-Z]{5}[0-9]{4}[A-Z]{1}\b/, // PAN format: ABCDE1234F
  CREDIT_CARD: /\b(?:\d[ -]*?){13,16}\b/, // Credit card format: XXXX-XXXX-XXXX-XXXX
  PHONE: /\b(?:\+91|0)?[6-9][0-9]{9}\b/, // Indian phone numbers
  EMAIL: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/,
};

// This function keeps the same name but now detects PII instead of generating summaries
export async function generatePdfSummary(uploadResponse: any) {
  try {
    console.log("Raw Upload Response:", uploadResponse);

    let fileUrl, fileName;

    if (typeof uploadResponse === "string") {
      fileUrl = uploadResponse;
      fileName = fileUrl.split("/").pop() || "unknown-file";
    } else if (Array.isArray(uploadResponse) && uploadResponse.length > 0) {
      fileUrl = uploadResponse[0]?.ufsUrl || uploadResponse[0]?.appUrl;
      fileName =
        uploadResponse[0]?.fileName ||
        uploadResponse[0]?.name ||
        "unknown-file";
    } else if (uploadResponse && typeof uploadResponse === "object") {
      fileUrl = uploadResponse.ufsUrl || uploadResponse.appUrl;
      fileName =
        uploadResponse.fileName || uploadResponse.name || "unknown-file";
    }
    console.log(fileUrl, "File URL");

    if (!fileUrl || typeof fileUrl !== "string") {
      throw new Error("Invalid file URL format");
    }

    console.log("Extracting text from:", fileUrl);
    const pdfText = await fetchAndExtractPdfText(fileUrl);
    console.log("Extracted document text:", pdfText);

    // Perform basic regex-based PII detection
    const detectedPII = detectPIIWithRegex(pdfText);

    // Try AI-based detection for more sophisticated patterns
    let aiPIIReport;
    try {
      aiPIIReport = await detectPIIFromOpenAI(pdfText);
    } catch (error) {
      console.error("OpenAI Error:", error);
      aiPIIReport = await detectPIIFromGemini(pdfText);
    }

    if (!aiPIIReport && Object.keys(detectedPII).length === 0) {
      return {
        success: true,
        message: "No PII detected in document",
        data: {
          summary: "No personally identifiable information detected.",
          title: "PII Scan: " + formatFileNameTitle(fileName),
          fileName,
        },
      };
    }

    // Combine regex and AI detection results
    const combinedReport = combineDetectionResults(
      detectedPII,
      aiPIIReport || {}
    );

    // Create a summary report of detected PII
    const summary = generatePIIReport(combinedReport);
    const title =
      extractTitleFromPIIReport(summary) ||
      `PII Scan: ${formatFileNameTitle(fileName)}`;

    return {
      success: true,
      message: "PII scan completed successfully",
      data: {
        summary,
        title,
        fileName,
      },
    };
  } catch (error) {
    console.error("Error scanning document for PII:", error);
    return {
      success: false,
      message: "Failed to scan document for PII",
      data: null,
    };
  }
}

// Helper function to detect PII using regex patterns
function detectPIIWithRegex(text: string) {
  const results: Record<string, string[]> = {};

  for (const [type, pattern] of Object.entries(PII_PATTERNS)) {
    const matches = text.match(new RegExp(pattern, "g")) || [];
    if (matches.length > 0) {
      results[type] = matches;
    }
  }

  return results;
}

// Helper function to combine regex and AI detection results
function combineDetectionResults(
  regexResults: Record<string, string[]>,
  aiResults: any
) {
  const combined = { ...regexResults };

  // Add AI detection results that aren't already covered
  if (aiResults && typeof aiResults === "object") {
    for (const [type, instances] of Object.entries(aiResults)) {
      if (!combined[type]) {
        combined[type] = instances as string[];
      } else {
        // Merge and deduplicate
        const existingSet = new Set(combined[type]);
        (instances as string[]).forEach((item) => existingSet.add(item));
        combined[type] = Array.from(existingSet);
      }
    }
  }

  return combined;
}

// Generate a human-readable report from the PII detection results
// Generate a human-readable report from the PII detection results
function generatePIIReport(detectionResults: Record<string, string[]>) {
  if (Object.keys(detectionResults).length === 0) {
    return "No personally identifiable information (PII) was detected in this document.";
  }

  let report = "## PII Detection Report\n\n";
  report +=
    "The following personally identifiable information (PII) was detected in this document:\n\n";

  // Calculate risk score based on types and quantity of PII detected
  const riskScore = calculateRiskScore(detectionResults);
  const riskLevel = getRiskLevel(riskScore);

  report += `### Risk Assessment\n`;
  report += `**Overall Risk Level: ${riskLevel}**\n`;
  report += `Based on the types and quantity of sensitive information detected.\n\n`;

  for (const [type, instances] of Object.entries(detectionResults)) {
    report += `### ${formatPIIType(type)} Identifiers\n`;
    report += `${instances.length} ${type.toLowerCase()} ${
      instances.length === 1 ? "identifier was" : "identifiers were"
    } detected.\n\n`;

    // For demonstration purposes, show redacted versions
    report += "Examples (redacted):\n";
    const sampleSize = Math.min(instances.length, 3);
    for (let i = 0; i < sampleSize; i++) {
      report += `- ${redactPII(instances[i], type)}\n`;
    }

    if (instances.length > sampleSize) {
      report += `- ... and ${instances.length - sampleSize} more\n`;
    }

    report += "\n";
  }

  // Add custom recommendations based on detected PII types
  report += "## Recommendations\n\n";

  // Standard recommendations
  report +=
    "- Review and redact the identified PII before sharing this document\n";
  report +=
    "- Consider using built-in redaction tools to permanently remove this information\n";
  report +=
    "- Ensure proper document handling and storage practices are followed\n";

  // Add type-specific recommendations
  const typeSpecificRecs =
    generateTypeSpecificRecommendations(detectionResults);
  if (typeSpecificRecs.length > 0) {
    report += "\n### Type-Specific Recommendations\n";
    typeSpecificRecs.forEach((rec) => {
      report += `- ${rec}\n`;
    });
  }

  // Add compliance information if high-risk PII is detected
  if (hasHighRiskPII(detectionResults)) {
    report += "\n### Compliance Considerations\n";
    report +=
      "This document contains sensitive government-issued identifiers that may be subject to:\n";
    report += "- Data protection regulations requiring secure handling\n";
    report += "- Mandatory reporting of breaches involving this information\n";
    report += "- Legal requirements for proper data storage and disposal\n";
  }

  return report;
}

// Helper function to format PII type names
function formatPIIType(type: string): string {
  // Handle special cases
  const typeMap: Record<string, string> = {
    AADHAR: "Aadhaar Card",
    PAN: "PAN Card",
    CREDIT_CARD: "Credit Card",
    PHONE: "Phone Number",
    EMAIL: "Email Address",
    PASSPORT: "Passport Number",
    PERSON: "Person Name",
    DATE_TIME: "Date of Birth/Time",
    BLOOD_GROUP: "Blood Group",
  };

  return typeMap[type] || type;
}

// Helper function to identify high-risk PII types
function hasHighRiskPII(detectionResults: Record<string, string[]>): boolean {
  const highRiskTypes = ["AADHAR", "PAN", "CREDIT_CARD", "PASSPORT"];
  return highRiskTypes.some(
    (type) => detectionResults[type] && detectionResults[type].length > 0
  );
}

// Calculate risk score based on PII types and quantities
function calculateRiskScore(
  detectionResults: Record<string, string[]>
): number {
  const typeWeights: Record<string, number> = {
    AADHAR: 10,
    PAN: 8,
    CREDIT_CARD: 9,
    PASSPORT: 10,
    PHONE: 5,
    EMAIL: 4,
    PERSON: 3,
    DATE_TIME: 2,
    BLOOD_GROUP: 6,
  };

  let score = 0;
  for (const [type, instances] of Object.entries(detectionResults)) {
    const weight = typeWeights[type] || 1;
    score += weight * Math.min(instances.length, 5); // Cap quantity impact
  }

  return score;
}

// Get risk level based on score
function getRiskLevel(score: number): string {
  if (score >= 30) return "High";
  if (score >= 15) return "Medium";
  return "Low";
}

// Generate type-specific recommendations
function generateTypeSpecificRecommendations(
  detectionResults: Record<string, string[]>
): string[] {
  const recommendations: string[] = [];

  if (detectionResults["AADHAR"]) {
    recommendations.push(
      "Aadhaar numbers should be masked except for the last 4 digits when necessary for identification"
    );
  }

  if (detectionResults["PAN"]) {
    recommendations.push(
      "PAN card information should be protected and only collected when legally required"
    );
  }

  if (detectionResults["CREDIT_CARD"]) {
    recommendations.push(
      "Credit card numbers should always be truncated to show only the last 4 digits"
    );
  }

  if (detectionResults["EMAIL"] && detectionResults["PHONE"]) {
    recommendations.push(
      "Multiple contact methods detected - consider keeping only one form of contact information when possible"
    );
  }

  return recommendations;
}

// Helper function to redact PII for reporting (preserve existing implementation)
function redactPII(text: string, type: string) {
  switch (type) {
    case "AADHAR":
      return text.replace(/\d{4}/g, (match, index) =>
        index > 0 ? "XXXX" : match
      );
    case "PAN":
      return text.substring(0, 5) + "XXXX" + text.substring(9);
    case "CREDIT_CARD":
      return text.replace(/\d{4}/g, (match, index) =>
        index === text.length - 4 ? match : "XXXX"
      );
    case "PHONE":
      return text.replace(/\d{6}$/, "XXXXXX");
    case "EMAIL":
      const parts = text.split("@");
      if (parts.length === 2) {
        const firstPart = parts[0];
        const hiddenPart =
          firstPart.charAt(0) + "..." + firstPart.charAt(firstPart.length - 1);
        return `${hiddenPart}@${parts[1]}`;
      }
      return text.replace(/.{3,}@/, "***@");
    default:
      return text.replace(/./g, "*");
  }
}

interface PdfSummaryType {
  userId?: string;
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
}

// This function keeps the same name but stores PII reports instead of summaries
async function savePdfSummary({
  userId,
  fileUrl,
  summary,
  title,
  fileName,
}: PdfSummaryType) {
  try {
    if (!userId) throw new Error("User ID is required.");

    const sql = await getDbConnected();
    if (!sql) throw new Error("Database connection failed.");
    console.log("Saving PII detection report for User ID:", userId);

    const result = await sql`
      INSERT INTO pdf_summaries (
        user_id, original_file_url, summary_text, title, file_name
      ) VALUES (
        ${userId}, ${fileUrl}, ${summary}, ${title}, ${fileName}
      ) RETURNING id;
    `;

    return result?.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("Error saving PII detection report:", error);
    throw error;
  }
}

// This function keeps the same name but handles PII reports
export async function storePdfSummaryAction({
  fileUrl,
  summary,
  title,
  fileName,
}: Omit<PdfSummaryType, "userId">) {
  try {
    const authData = await auth();
    if (!authData?.userId) {
      throw new Error("User not authenticated");
    }
    const { userId } = authData;
    console.log("Authenticated User ID:", userId);

    if (!userId) {
      throw new Error("User not authenticated");
    }

    const savedReport = await savePdfSummary({
      userId,
      fileUrl,
      summary,
      title,
      fileName,
    });
    if (!savedReport) {
      throw new Error("Failed to save PII detection report");
    }

    revalidatePath(`/reports/${savedReport.id}`);

    return {
      success: true,
      message: "PII detection report saved successfully",
      data: { id: savedReport.id },
    };
  } catch (error) {
    console.error("Error in storePdfSummaryAction:", error);
    return { success: false, message: "Failed to save PII detection report" };
  }
}

// This function keeps the same name but focuses on text extraction for PII detection
export async function generatePdfText({ fileUrl }: { fileUrl: string }) {
  try {
    if (!fileUrl || typeof fileUrl !== "string") {
      throw new Error("Invalid file URL.");
    }

    const pdfText = await fetchAndExtractPdfText(fileUrl);
    console.log("Extracted document text:", pdfText);

    if (!pdfText) {
      throw new Error("Failed to extract document text");
    }

    // Perform quick PII detection scan on extracted text
    const detectedPII = detectPIIWithRegex(pdfText);
    const hasPII = Object.keys(detectedPII).length > 0;

    return {
      success: true,
      message: "Document text extracted successfully",
      data: {
        pdfText,
        quickScan: {
          hasPII,
          detectedTypes: Object.keys(detectedPII),
          counts: Object.fromEntries(
            Object.entries(detectedPII).map(([type, instances]) => [
              type,
              instances.length,
            ])
          ),
        },
      },
    };
  } catch (error) {
    console.error("Error extracting document text:", error);
    return {
      success: false,
      message: "Error extracting document text",
      data: null,
    };
  }
}
