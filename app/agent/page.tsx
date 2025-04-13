"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

type FileConversionResult = {
  status: number;
  convertedFileUrl: string | null;
  convertedFileUrls?: string[];
  convertedFileContents?: (string | null)[];
  message: string;
  originalFormat?: string;
  targetFormat?: string;
  pageCount?: number;
};

export default function FileConverterPage() {
  const [file, setFile] = useState<File | null>(null);
  const [targetFormat, setTargetFormat] = useState<string>("txt");
  const [isConverting, setIsConverting] = useState(false);
  const [conversionResult, setConversionResult] =
    useState<FileConversionResult | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setConversionResult(null);
      setCurrentPage(0);
    }
  };

  const handleDownload = (url: string) => {
    // For relative URLs, make sure to prepend the base URL
    const fullUrl = url.startsWith("http")
      ? url
      : `${window.location.origin}${url}`;
    window.open(fullUrl, "_blank");
  };

  const convertFile = async () => {
    if (!file) {
      toast.error("Please select a document to convert");
      return;
    }

    setIsConverting(true);
    setConversionResult(null);

    try {
      // Create FormData to send the file
      const formData = new FormData();
      formData.append("document", file);
      formData.append("format", targetFormat);

      // Make API call to your backend
      const response = await fetch("/api/agent-ai/convert-file", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      // Check if the response includes all required fields
      if (!data || typeof data.status !== "number") {
        throw new Error("Invalid response from server");
      }

      setConversionResult(data);
      setCurrentPage(0);

      if (data.status === 200) {
        toast.success("Document converted successfully!");
      } else {
        toast.error(data.message || "Conversion failed");
      }
    } catch (error) {
      console.error("Error converting document:", error);
      toast.error("Failed to connect to conversion service. Please try again.");
      setConversionResult({
        status: 500,
        convertedFileUrl: null,
        message: "Failed to connect to conversion service. Please try again.",
      });
    } finally {
      setIsConverting(false);
    }
  };

  // For displaying file formats in a readable way
  const formatExtension = (ext: string) => {
    const formats: Record<string, string> = {
      txt: "Text (TXT)",
      pdf: "PDF Document",
      docx: "Word Document (DOCX)",
      png: "Image (PNG)",
      jpg: "Image (JPG)",
    };
    return formats[ext] || ext.toUpperCase();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">File Format Converter</h1>
      <p className="text-gray-600 mb-8">
        Convert your documents between different formats quickly and easily
      </p>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left section - Document Upload */}
        <div className="w-full md:w-1/3">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Upload Document</h2>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Select Document
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition cursor-pointer">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  id="document-upload"
                  accept=".pdf,.docx,.doc,.txt,.png,.jpg,.jpeg"
                />
                <label htmlFor="document-upload" className="cursor-pointer">
                  <div className="flex flex-col items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-gray-400 mb-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <p className="text-sm text-gray-600">
                      {file ? file.name : "Click to upload or drag and drop"}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PDF, DOCX, DOC, TXT, PNG, JPG up to 10MB
                    </p>
                  </div>
                </label>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Target Format
              </label>
              <select
                value={targetFormat}
                onChange={(e) => setTargetFormat(e.target.value)}
                className="w-full p-2 border rounded"
                disabled={!file || isConverting}
              >
                <option value="txt">Text (TXT)</option>
                <option value="pdf">PDF Document</option>
                <option value="docx">Word Document (DOCX)</option>
                <option value="png">Image (PNG)</option>
                <option value="jpg">Image (JPG)</option>
              </select>
            </div>

            <Button
              onClick={convertFile}
              disabled={!file || isConverting}
              className="w-full"
            >
              {isConverting ? "Converting..." : "Convert Document"}
            </Button>
          </Card>
        </div>

        {/* Right section - Conversion Results */}
        <div className="w-full md:w-2/3">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Conversion Results</h2>

            <div className="space-y-4">
              {isConverting && (
                <div className="border rounded-lg p-4 bg-gray-50">
                  <p className="text-gray-500 mb-2 text-sm">
                    Converting your document...
                  </p>
                  <div className="flex items-center justify-center my-4">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
                  </div>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              )}

              {!isConverting && conversionResult && (
                <div
                  className={`border rounded-lg p-4 ${
                    conversionResult.status === 200
                      ? "bg-green-50"
                      : "bg-red-50"
                  }`}
                >
                  <div className="flex justify-between mb-2">
                    <h4 className="font-medium">
                      {conversionResult.status === 200
                        ? "Conversion Complete"
                        : "Conversion Failed"}
                    </h4>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        conversionResult.status === 200
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {conversionResult.status === 200
                        ? "Success"
                        : `Error ${conversionResult.status}`}
                    </span>
                  </div>

                  <p className="text-gray-700 mb-3">
                    {conversionResult.message}
                  </p>

                  {conversionResult.originalFormat &&
                    conversionResult.targetFormat && (
                      <div className="text-sm text-gray-600 mb-3">
                        Converting from{" "}
                        {formatExtension(conversionResult.originalFormat)} to{" "}
                        {formatExtension(conversionResult.targetFormat)}
                      </div>
                    )}

                  {/* Display content based on file type */}
                  {conversionResult.status === 200 && (
                    <>
                      {/* For multi-page conversions like PDF to PNG */}
                      {conversionResult.convertedFileUrls &&
                        conversionResult.convertedFileUrls.length > 1 && (
                          <div className="mt-4">
                            <div className="bg-gray-100 p-3 rounded mb-3">
                              <div className="flex justify-between items-center mb-2">
                                <p className="text-sm font-medium">
                                  Page {currentPage + 1} of{" "}
                                  {conversionResult.convertedFileUrls.length}
                                </p>
                                <div className="flex space-x-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={currentPage === 0}
                                    onClick={() =>
                                      setCurrentPage((prev) =>
                                        Math.max(0, prev - 1)
                                      )
                                    }
                                  >
                                    Previous
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={
                                      currentPage ===
                                      conversionResult.convertedFileUrls
                                        .length -
                                        1
                                    }
                                    onClick={() =>
                                      setCurrentPage((prev) =>
                                        Math.min(
                                          conversionResult.convertedFileUrls!
                                            .length - 1,
                                          prev + 1
                                        )
                                      )
                                    }
                                  >
                                    Next
                                  </Button>
                                </div>
                              </div>

                              {/* Preview converted content */}
                              {(targetFormat === "png" ||
                                targetFormat === "jpg") && (
                                <div className="flex justify-center p-2 bg-white rounded border">
                                  <img
                                    src={
                                      conversionResult.convertedFileUrls[
                                        currentPage
                                      ]
                                    }
                                    alt={`Page ${currentPage + 1}`}
                                    className="max-w-full max-h-96 object-contain"
                                  />
                                </div>
                              )}

                              {/* Text content */}
                              {targetFormat === "txt" &&
                                conversionResult.convertedFileContents && (
                                  <div className="p-3 bg-white rounded border overflow-auto max-h-96">
                                    <pre className="whitespace-pre-wrap text-sm">
                                      {
                                        conversionResult.convertedFileContents[
                                          currentPage
                                        ]
                                      }
                                    </pre>
                                  </div>
                                )}
                            </div>

                            {/* Download buttons */}
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                className="flex-1"
                                onClick={() =>
                                  handleDownload(
                                    conversionResult.convertedFileUrls![
                                      currentPage
                                    ]
                                  )
                                }
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 mr-2"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                  />
                                </svg>
                                Download Current Page
                              </Button>
                              {conversionResult.convertedFileUrls.length >
                                1 && (
                                <Button
                                  variant="default"
                                  className="flex-1"
                                  onClick={() => {
                                    // Open all pages in new tabs
                                    conversionResult.convertedFileUrls!.forEach(
                                      (url) => {
                                        window.open(url, "_blank");
                                      }
                                    );
                                  }}
                                >
                                  Download All Pages
                                </Button>
                              )}
                            </div>
                          </div>
                        )}

                      {/* For single file conversions */}
                      {(!conversionResult.convertedFileUrls ||
                        conversionResult.convertedFileUrls.length === 1) &&
                        conversionResult.convertedFileUrl && (
                          <div className="mt-4">
                            {/* Preview for image formats */}
                            {(targetFormat === "png" ||
                              targetFormat === "jpg") && (
                              <div className="flex justify-center p-2 bg-white rounded border mb-4">
                                <img
                                  src={conversionResult.convertedFileUrl}
                                  alt="Converted file"
                                  className="max-w-full max-h-96 object-contain"
                                />
                              </div>
                            )}

                            {/* Preview for text format */}
                            {targetFormat === "txt" &&
                              conversionResult.convertedFileContents && (
                                <div className="p-3 bg-white rounded border overflow-auto max-h-96 mb-4">
                                  <pre className="whitespace-pre-wrap text-sm">
                                    {conversionResult.convertedFileContents[0]}
                                  </pre>
                                </div>
                              )}

                            <Button
                              variant="outline"
                              className="w-full"
                              onClick={() =>
                                handleDownload(
                                  conversionResult.convertedFileUrl as string
                                )
                              }
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                />
                              </svg>
                              Download Converted File
                            </Button>
                          </div>
                        )}
                    </>
                  )}
                </div>
              )}

              {!isConverting && !conversionResult && (
                <div className="text-center py-8">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-gray-300 mx-auto mb-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                    />
                  </svg>
                  <p className="text-gray-500">
                    Upload a document, select your target format, and click
                    "Convert" to transform your document.
                  </p>
                  <div className="mt-4">
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>
                        <strong>Supported conversions:</strong>
                      </p>
                      <ul className="list-disc list-inside">
                        <li>PDF to TXT, DOCX, PNG, JPG</li>
                        <li>DOCX to PDF, TXT, PNG, JPG</li>
                        <li>TXT to PDF, DOCX</li>
                        <li>Images to PDF, TXT (OCR)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
