// In your API route handler - /app/api/agent-ai/convert-file/route.ts
import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  console.log("File conversion request received");

  try {
    // Parse the request body
    const formData = await req.formData();
    const documentFile = formData.get("document") as File;
    const targetFormat = formData.get("format") as string;

    console.log(
      `Processing file: ${documentFile?.name}, target format: ${targetFormat}`
    );

    if (!documentFile || !targetFormat) {
      console.log("Missing required fields");
      return NextResponse.json(
        {
          status: 400,
          message: "Document and target format are required",
          convertedFileUrl: null,
        },
        { status: 400 }
      );
    }

    // Get file extension
    const fileExtension = documentFile.name.split(".").pop()?.toLowerCase();

    // Create a unique filename for the upload
    const safeFileName = documentFile.name.replace(/[^a-zA-Z0-9.]/g, "_");
    const uniqueFileName = `${uuidv4()}-${safeFileName}`;

    // Define file paths
    const publicDir = join(process.cwd(), "public");
    const uploadDir = join(publicDir, "temp-uploads");
    const filePath = join(uploadDir, uniqueFileName);

    // Save the file to the public directory
    try {
      // Create buffer from file
      const bytes = await documentFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Write file
      await writeFile(filePath, buffer);
      console.log(`File saved to: ${filePath}`);

      // Get the public URL for the file
      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001"; // Set this in your .env
      const fileUrl = `${baseUrl}/temp-uploads/${uniqueFileName}`;

      console.log(`File URL for API: ${fileUrl}`);

      // Check if API key is available
      const apiKey = process.env.AGENT_AI_API_KEY;
      if (!apiKey) {
        console.error("Missing Agent AI API key");
        return NextResponse.json(
          {
            status: 500,
            convertedFileUrl: null,
            message: "Server configuration error: Missing API key",
          },
          { status: 500 }
        );
      }

      console.log("Calling Agent AI API...");

      // Call the Agent AI API
      const response = await fetch(
        "https://api-lr.agent.ai/v1/action/convert_file",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            input_file:
              "https://firebasestorage.googleapis.com/v0/b/e-commerce-8b8a2.appspot.com/o/1703954632288WhatsApp%20Image%202022-10-09%20at%206.44.30%20PM.jpeg?alt=media&token=ccde7941-6c3d-4a53-bf6d-d60486caa199",
            convert_to_extension: targetFormat,
          }),
        }
      );

      console.log(`API response status: ${response.status}`);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`API error: ${errorText}`);
        return NextResponse.json(
          {
            status: response.status,
            convertedFileUrl: null,
            message: `API error: ${response.statusText}`,
          },
          { status: 500 }
        );
      }

      const apiResponse = await response.json();
      console.log("API response:", JSON.stringify(apiResponse));

      if (
        apiResponse.status === 200 &&
        apiResponse.response &&
        apiResponse.response.length > 0
      ) {
        // Get the converted file URLs from the API response
        const convertedFiles = apiResponse.response.map((item: any) => ({
          url: item.url,
          contents: item.contents,
        }));

        return NextResponse.json({
          status: 200,
          convertedFileUrls: convertedFiles.map((item: any) => item.url),
          convertedFileUrl: convertedFiles[0].url, // For backward compatibility
          convertedFileContents: convertedFiles.map(
            (item: any) => item.contents
          ),
          message: "File converted successfully",
          originalFormat: fileExtension,
          targetFormat: targetFormat,
          pageCount: convertedFiles.length,
        });
      } else {
        // Handle API error
        console.error("API error response:", apiResponse);
        return NextResponse.json(
          {
            status: apiResponse.status || 500,
            convertedFileUrl: null,
            message:
              apiResponse.error ||
              "Failed to convert the file through the conversion service",
          },
          { status: 500 }
        );
      }
    } catch (fsError) {
      console.error("Error saving file:", fsError);
      return NextResponse.json(
        {
          status: 500,
          convertedFileUrl: null,
          message: "Failed to save file temporarily. Please try again.",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error converting file:", error);
    return NextResponse.json(
      {
        status: 500,
        convertedFileUrl: null,
        message: "Failed to process file conversion. Please try again.",
      },
      { status: 500 }
    );
  }
}
