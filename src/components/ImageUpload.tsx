"use client";
import React, { useState } from "react";

export default function ImageUpload() {
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      console.error("No file selected");
      return;
    }

    try {
      const data = new FormData();
      data.set("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText);
      }

      console.log("File uploaded successfully");
    } catch (err) {
      console.error("File upload failed:", err);
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
        />
        <input type="submit" value="Upload" />
      </form>
    </main>
  );
}
