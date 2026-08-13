import ProjectSchema from "../models/Projects.js";
import { successResponse, errorResponse } from "../utils/response.js";  
import uploadToCloudinary from "../utils/cloudinaryUpload.js";






export const createProject = async (req, res) => {
    try {
        const {
            featured,
            title,
            role,
            overview,
            problem,
            solution,
            stack,
            features,
            challenges,
            learned,
            github,
            live,
            completed,
        } = req.body;

        // Check thumbnail
        if (!req.files?.thumbnail?.[0]) {
            return errorResponse(res, 400, "Thumbnail is required");
        }

        // Upload thumbnail
        const thumbnailResult = await uploadToCloudinary(
            req.files.thumbnail[0].buffer,
            "portfolio/projects"
        );

        // Upload gallery images
        let imageUrls = [];

        if (req.files?.images) {
            const uploadedImages = await Promise.all(
                req.files.images.map((file) =>
                    uploadToCloudinary(
                        file.buffer,
                        "portfolio/projects"
                    )
                )
            );

            imageUrls = uploadedImages.map(
                (image) => image.secure_url
            );
        }

        const project = await ProjectSchema.create({
            featured: featured === "true",
            title,
            role,
            overview,
            problem,
            solution,

            stack: stack ? JSON.parse(stack) : [],
            features: features ? JSON.parse(features) : [],
            challenges: challenges ? JSON.parse(challenges) : [],
            learned: learned ? JSON.parse(learned) : [],

            thumbnail: thumbnailResult.secure_url,
            images: imageUrls,

            github,
            live,
            completed,
        });

        return successResponse(
            res,
            "Project created successfully",
            project
        );

    } catch (err) {
        console.log(err);
        return errorResponse(res, 500, err.message);
    }
};



export const getAllProjects = async (req, res) => {
    // console.log("Fetching all projects...");
    try {
        const projects = await ProjectSchema.find().sort({ createdAt: -1 });
        return successResponse(res, "Projects retrieved successfully", projects);
    } catch (err) {
        console.log(err);
        return errorResponse(res, 500, err.message);
    }
};



export const deleteProject  = async (req, res) => {
    const { id } = req.params;

    try {
        const projects = await ProjectSchema.findByIdAndDelete(id);
        if (!projects) {
            return errorResponse(res, 404, "Project not found");
        }
        return successResponse(res, "Project deleted successfully");
    } catch (err) {
        console.log(err);
        return errorResponse(res, 500, err.message);
    }
};