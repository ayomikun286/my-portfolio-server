import express from "express";
import upload from "../middleware/upload.js";
import uploadToCloudinary from "../utils/cloudinaryUpload.js";

const router = express.Router();

router.post("/upload", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "No image uploaded"
            });
        }

        const result = await uploadToCloudinary(
            req.file.buffer,
            "portfolio"
        );

        return res.status(201).json({
            message: "Image uploaded successfully",
            image: result.secure_url
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Image upload failed",
            error: error.message
        });
    }
});

export default router;