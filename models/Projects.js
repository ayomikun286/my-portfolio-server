import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
    {
        featured: {
            type: Boolean,
            default: false,
        },

        title: {
            type: String,
            required: true,
            trim: true,
        },

        role: {
            type: String,
            required: true,
            trim: true,
        },

        overview: {
            type: String,
            required: true,
            trim: true,
        },

        problem: {
            type: String,
            trim: true,
        },

        solution: {
            type: String,
            trim: true,
        },

        stack: {
            type: [String],
            default: [],
        },

        features: {
            type: [String],
            default: [],
        },

        challenges: {
            type: [String],
            default: [],
        },

        learned: {
            type: [String],
            default: [],
        },

        thumbnail: {
            type: String,
            required: true,
        },

        images: {
            type: [String],
            default: [],
        },

        github: {
            type: String,
            trim: true,
        },

        live: {
            type: String,
            trim: true,
        },

        completed: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Project", ProjectSchema);