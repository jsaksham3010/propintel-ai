"use client";

import { useState } from "react";
import { Upload, ImagePlus } from "lucide-react";
import { uploadPropertyImages } from "@/services/propertyDetailService";

interface UploadImagesProps {
  propertyId: string;
  onUploadSuccess: () => void;
}

export default function UploadImages({
  propertyId,
  onUploadSuccess,
}: UploadImagesProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) return;

    setFiles(Array.from(e.target.files));
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      alert("Please select images first.");
      return;
    }

    try {
      setLoading(true);

      await uploadPropertyImages(propertyId, files);

      alert("Images uploaded successfully!");

      setFiles([]);

      onUploadSuccess();
    } catch (error) {
      console.error(error);
      alert("Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 bg-white rounded-3xl border shadow-sm p-8">

      <h2 className="text-2xl font-bold mb-6">
        Upload Property Images
      </h2>

      <label className="border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition">

        <ImagePlus
          size={40}
          className="text-blue-600"
        />

        <p className="mt-4 font-medium">
          Click to choose images
        </p>

        <p className="text-sm text-gray-500 mt-1">
          JPG, PNG (Max 10MB each)
        </p>

        <input
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>

      {files.length > 0 && (
        <div className="mt-5">

          <p className="text-sm text-gray-600 mb-4">
            {files.length} image(s) selected
          </p>

          <button
            onClick={handleUpload}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition disabled:opacity-50"
          >
            <Upload size={18} />

            {loading ? "Uploading..." : "Upload Images"}
          </button>

        </div>
      )}
    </div>
  );
}