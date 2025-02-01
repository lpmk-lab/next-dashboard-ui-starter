import React, { useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";

interface ImageUploaderProps {
  onImageUpload: (imageUrl: string) => void;
  defaultImage?: string | null;
  error?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageUpload,
  defaultImage,
  error,
}) => {
  const [previewImage, setPreviewImage] = useState<string | null>(
    defaultImage || null
  );

  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const result = await response.json();
      const imageUrl = result.filePath;

      // Set the image URL in the parent component
      onImageUpload(imageUrl);
      setPreviewImage(imageUrl);
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Image upload error:", error);
      toast.error("Failed to upload image");
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center items-center">
      <label
        className={`relative text-xs text-gray-500 flex flex-col items-center gap-2 cursor-pointer ${
          previewImage ? "text-transparent" : ""
        }`}
        htmlFor="img"
      >
        {!previewImage && (
          <span className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 transition">
            Upload a photo
          </span>
        )}
        <Image
          src={previewImage || "/upload.png"}
          alt="Uploaded Preview"
          width={100}
          height={100}
          className={`rounded-md object-cover border-2 ${
            previewImage ? "border-blue-400" : "border-gray-300"
          }`}
        />
        {previewImage && (
          <span
            className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              setPreviewImage(null); // Remove preview image
              onImageUpload(""); // Reset uploaded image URL in parent
            }}
          >
            ✕
          </span>
        )}
      </label>
      <input
        type="file"
        id="img"
        className="hidden"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleImageUpload(file);
        }}
      />
      {error && <p className="text-xs text-red-400 mt-2">{error}</p>}
    </div>
  );
};

export default ImageUploader;
