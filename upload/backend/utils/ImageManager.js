import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Folder path (relative to project root)
const folderPath = path.join(__dirname, "../files/products");

// Ensure folder exists
if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath, { recursive: true });
}
export const fetchImage = (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(folderPath, filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "Image not found" });
  }

  res.sendFile(filePath);
};

// ✅ Upload a new image
export function uploadImage(file) {
  const ext = path.extname(file.originalname);
  const uniqueName = file.originalname;
  const targetPath = path.join(folderPath, uniqueName);

  fs.writeFileSync(targetPath, file.buffer);
  return {
    filename: uniqueName,
    url: `/products/${uniqueName}`,
  };
}

// ✅ Replace an existing image by name
export function replaceImage(existingName, file) {
  const existingPath = path.join(folderPath, existingName);

  if (!existingName.includes("placeholder")) {
    if (fs.existsSync(existingPath)) {
      fs.unlinkSync(existingPath);
    }
  }

  const ext = path.extname(file.originalname);
  const newName = file.originalname;
  const newPath = path.join(folderPath, newName);

  fs.writeFileSync(newPath, file.buffer);
  return {
    filename: newName,
    url: `/products/${newName}`,
  };
}

// ✅ Delete image by name
export function deleteImage(imageName) {
  const targetPath = path.join(folderPath, imageName);
  if (fs.existsSync(targetPath)) {
    if (!imageName.includes("placeholder")) {
      fs.unlinkSync(targetPath);
    }

    return true;
  } else {
    return false;
  }
}
