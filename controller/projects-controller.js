import ProjectSchema from "../models/Projects.js";
import { successResponse, errorResponse } from "../utils/response.js";  




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



export const deleteTestimonial = async (req, res) => {
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