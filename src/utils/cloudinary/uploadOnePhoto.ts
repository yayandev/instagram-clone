import path from "path";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import os from "os";
import { v2 as cloudinary } from "cloudinary";
import { config } from "./config";

cloudinary.config(config);

async function savePhotoToLocal(file: any) {
  const data = await file.arrayBuffer();
  const buffer = Buffer.from(data);
  const name = uuidv4();
  const ext = file.type.split("/")[1];

  const tmpdir = os.tmpdir();
  const uploadDir = path.join(tmpdir, `/${name}.${ext}`);
  await fs.writeFile(uploadDir, buffer);

  return { filepath: uploadDir, filename: file.name };
}

async function uploadPhotoToCloudinary(file: any) {
  return cloudinary.uploader.upload(file.filepath, { folder: "posts" });
}

export async function uploadOnePhoto(formData: any) {
  try {
    const file = formData.get("file"); // Assuming the input field name is "file"

    if (!file) {
      throw new Error("No file uploaded.");
    }

    const newFile = await savePhotoToLocal(file);
    // Upload to the cloud
    const photo = await uploadPhotoToCloudinary(newFile);

    // Delete the temporary file
    await fs.unlink(newFile.filepath);

    return { photo };
  } catch (error: any) {
    return { error: error.message };
  }
}
