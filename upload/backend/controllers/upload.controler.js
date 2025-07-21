import {
  uploadImage,
  replaceImage,
  deleteImage,
} from "../utils/ImageManager.js";

// Upload Handler
export const uploadImageHandler = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "No file provided" });
    }

    const result = uploadImage(file);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Replace Handler
export const replaceImageHandler = async (req, res) => {
  try {
    const file = req.file;
    const name = req.params.name;

    if (!file || !name) {
      return res.status(400).json({ error: "Missing file or image name" });
    }

    const result = replaceImage(name, file);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Handler
export const deleteImageHandler = async (req, res) => {
  try {
    const name = req.params.name;

    if (!name) {
      return res.status(400).json({ error: "Missing image name" });
    }

    const success = deleteImage(name);
    if (success) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: "Image not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
