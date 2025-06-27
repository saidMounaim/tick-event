"use server";

import { imagekit } from "@/lib/imagekit";

export async function uploadToImageKit(uploadFile: File) {
  const formData = new FormData();
  formData.append("file", uploadFile);

  const file = formData.get("file") as File;

  if (!file) {
    throw new Error("No file uploaded");
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const base64 = buffer.toString("base64");

  const uploaded = await imagekit.upload({
    file: base64,
    fileName: file.name,
  });

  return uploaded.url;
}
