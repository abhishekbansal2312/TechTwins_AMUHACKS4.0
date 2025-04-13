import { currentUser } from "@clerk/nextjs/server";
import {
  createUploadthing,
  UploadThingError,
  type FileRouter,
} from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  // PDF Uploader
  pdfUploader: f({ pdf: { maxFileSize: "32MB" } })
    .middleware(async ({ req }) => {
      const user = await currentUser();
      if (!user) throw new UploadThingError("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload completed for user ID:", metadata.userId);
      console.log("File info:", file);
      return {
        userId: metadata.userId,
        fileUrl: file.url,
        fileName: file.name,
      };
    }),

  // Document Uploader
  documentUploader: f({
    pdf: { maxFileSize: "32MB" },
    image: { maxFileSize: "8MB" },
    text: { maxFileSize: "8MB" },
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
      maxFileSize: "32MB",
    },
  })
    .middleware(async ({ req }) => {
      const user = await currentUser();
      if (!user) throw new UploadThingError("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Document upload completed for user ID:", metadata.userId);
      console.log("File info:", file);
      return {
        userId: metadata.userId,
        fileUrl: file.url,
        fileName: file.name,
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
