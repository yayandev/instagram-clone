import path from "path";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import os from "os";
import { v2 as cloudinary } from "cloudinary";
import { config } from "./config";

cloudinary.config(config);

async function savePhotosToLocal(formData: any) {
  const files = formData.getAll("files");

  const multipleBuffersPromise = files.map((file: any) =>
    file.arrayBuffer().then((data: any) => {
      const buffer = Buffer.from(data);
      const name = uuidv4();
      const ext = file.type.split("/")[1];

      const tmpdir = os.tmpdir();
      const uploadDir = path.join(tmpdir, `/${name}.${ext}`);
      fs.writeFile(uploadDir, buffer);
      return { filepath: uploadDir, filename: file.name };
    })
  );

  return await Promise.all(multipleBuffersPromise);
}

async function uploadPhotosToCloudinary(newFiles: any) {
  const multiplePhotosPromise = newFiles.map((file: any) =>
    cloudinary.uploader.upload(file.filepath, { folder: "posts" })
  );

  return await Promise.all(multiplePhotosPromise);
}

export async function uploadPhoto(formData: any) {
  try {
    const newFiles = await savePhotosToLocal(formData);
    // upload to the cloud
    const photos = await uploadPhotosToCloudinary(newFiles);

    newFiles.map((file) => fs.unlink(file.filepath));

    return { photos };
  } catch (error: any) {
    return { error: error.message };
  }
}
