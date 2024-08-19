import { asyncHandler } from "../utils/asyncHandler.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import { apiResponse } from "../utils/apiResponse.js";
import { apiError } from "../utils/apiError.js";

const __dirname = path.resolve();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const upload = multer({ storage });

export const imageUpload = asyncHandler((req, res) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const filePath = path.join(__dirname, "uploads", req.file.filename);

  cloudinary.uploader
    .upload(filePath, { folder: "uploads" })
    .then((result) => {
      fs.unlinkSync(filePath);

      res.json(new apiResponse(200, { image_url: result.secure_url }));
    })
    .catch((error) => {
      next(new apiError(400, "Error uploading file to Cloudinary.", error));
    });
});
