import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request: NextRequest) {
  try {
    // Get the image path from the URL query parameter
    const searchParams = request.nextUrl.searchParams;
    const imagePath = searchParams.get("path");

    if (!imagePath) {
      return new NextResponse("Image path is required", { status: 400 });
    }

    // Validate the path to prevent directory traversal attacks
    const normalizedPath = path
      .normalize(imagePath)
      .replace(/^(\.\.(\/|\\|$))+/, "");
    const fullPath = path.join(process.cwd(), "public", normalizedPath);

    // Check if the file exists
    if (!fs.existsSync(fullPath)) {
      return new NextResponse("Image not found", { status: 404 });
    }

    // Read the file
    const imageBuffer = fs.readFileSync(fullPath);

    // Determine content type based on file extension
    const ext = path.extname(fullPath).toLowerCase();
    let contentType = "application/octet-stream";

    if (ext === ".jpg" || ext === ".jpeg") contentType = "image/jpeg";
    else if (ext === ".png") contentType = "image/png";
    else if (ext === ".gif") contentType = "image/gif";
    else if (ext === ".svg") contentType = "image/svg+xml";
    else if (ext === ".webp") contentType = "image/webp";

    // Return the image with appropriate headers
    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (error) {
    console.error("Error serving image:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
