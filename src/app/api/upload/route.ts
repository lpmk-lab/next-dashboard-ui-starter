import { writeFile } from "fs/promises";
import { mkdir } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const file: File | null = data.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No file provided" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = new Uint8Array(bytes); // Convert ArrayBuffer to Uint8Array

    // Define the path to the upload directory
    const uploadDir = join(process.cwd(), "public", "upload");

    // Ensure the upload directory exists
    await mkdir(uploadDir, { recursive: true });

    // Path to save the file
    const filePath = join(uploadDir, file.name);

    // Save the file
    await writeFile(filePath, buffer);
    console.log("File saved to", filePath);

    return NextResponse.json({
      success: true,
      filePath: `/upload/${file.name}`,
    });
  } catch (error) {
    console.error("File upload error:", error);
    return NextResponse.json(
      { success: false, message: "File upload failed" },
      { status: 500 }
    );
  }
}
