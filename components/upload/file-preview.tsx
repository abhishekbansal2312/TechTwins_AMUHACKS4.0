import { File, FileText, Image as ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface FilePreviewProps {
  file: File;
  onRemove?: () => void;
}

export default function FilePreview({ file, onRemove }: FilePreviewProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Generate image preview for image files
  useState(() => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  });

  const isImage = file.type.startsWith("image/");
  const isPdf = file.type === "application/pdf";

  return (
    <div className="relative p-4 border rounded-md bg-white/5 dark:bg-gray-800/50">
      <div className="flex items-center gap-3">
        {isImage && imagePreview ? (
          <div className="relative w-12 h-12 overflow-hidden rounded-md">
            <Image
              src={imagePreview}
              alt="File preview"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        ) : isPdf ? (
          <FileText className="w-12 h-12 text-blue-500" />
        ) : (
          <File className="w-12 h-12 text-gray-500" />
        )}

        <div className="flex-1">
          <p className="text-sm font-medium truncate">{file.name}</p>
          <p className="text-xs text-gray-500">
            {(file.size / 1024 / 1024).toFixed(2)} MB •{" "}
            {isImage ? "Image" : isPdf ? "PDF" : "Document"}
          </p>
        </div>

        {onRemove && (
          <button
            onClick={onRemove}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            type="button"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
