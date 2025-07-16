import express from "express";
import multer from "multer";
import {
  uploadImageHandler,
  replaceImageHandler,
  deleteImageHandler,
} from "../controllers/upload.controler.mjs";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", upload.single("image"), uploadImageHandler);
router.post("/replace/:name", upload.single("image"), replaceImageHandler);
router.delete("/delete/:name", deleteImageHandler);

export default router;
