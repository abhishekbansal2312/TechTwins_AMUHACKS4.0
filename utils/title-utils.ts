// @/utils/title-utils.ts

/**
 * Extracts a title from a PII detection report
 * @param piiReport The PII detection report text
 * @returns A suitable title for the PII report
 */
export function extractTitleFromPIIReport(piiReport: string): string | null {
  if (!piiReport) return null;

  // Try to find a section header that indicates PII detection
  const headerMatch = piiReport.match(/^## (.*PII.*Report.*)/m);
  if (headerMatch && headerMatch[1]) {
    return headerMatch[1].trim();
  }

  // Look for specific PII types mentioned in the report
  const piiTypes = [
    "Aadhar",
    "PAN",
    "Credit Card",
    "Phone",
    "Email",
    "Passport",
    "Voter ID",
    "License",
    "Bank Account",
  ];

  const detectedTypes = piiTypes.filter((type) =>
    piiReport.toLowerCase().includes(type.toLowerCase())
  );

  if (detectedTypes.length > 0) {
    if (detectedTypes.length === 1) {
      return `${detectedTypes[0]} Detection Report`;
    } else if (detectedTypes.length <= 3) {
      return `${detectedTypes.join(", ")} Detection Report`;
    } else {
      return `Multiple PII Types (${detectedTypes.length}) Detected`;
    }
  }

  // If no specific PII is mentioned but PII is mentioned
  if (
    piiReport.toLowerCase().includes("pii") ||
    piiReport.toLowerCase().includes("personally identifiable information")
  ) {
    if (
      piiReport.toLowerCase().includes("no personally identifiable information")
    ) {
      return "Secure Document - No PII Detected";
    }
    return "PII Detection Report";
  }

  // Default title if nothing specific can be extracted
  return "Document Security Scan Results";
}

/**
 * Original function kept for backward compatibility
 */
export function extractTitleFromSummary(summary: string): string | null {
  // For backward compatibility, redirect to the PII report extraction
  return extractTitleFromPIIReport(summary);
}
