"use server";

import { revalidatePath } from "next/cache";

/**
 * Uploads a file to the server
 * @param formData The form data containing the file to upload
 * @returns Object containing the file URL if successful
 */
export async function uploadFile(formData: FormData) {
  try {
    const file = formData.get("file") as File;

    if (!file) {
      throw new Error("No file provided");
    }

    const response = await fetch("https://api.suitsbooks.nl/files/upload", {
      method: "POST",
      body: formData,
      // Ensure we're not using the cache for this request
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.status}`);
    }

    const data = await response.json();

    // Revalidate the path to ensure fresh data
    revalidatePath("/");

    return {
      success: true,
      file_url: data.file_url,
    };
  } catch (error) {
    console.error("Error uploading file:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
