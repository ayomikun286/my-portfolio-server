import mongoose from "mongoose";

const TestimonialSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },

        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },

        message: {
            type: String,
            required: true,
            trim: true,
            maxlength: 1000,
        },

        role: {
            type: String,
            trim: true,
            maxlength: 100,
        },

        company: {
            type: String,
            trim: true,
            maxlength: 100,
        },

        rating: {
            type: Number,
            min: 1,
            max: 5,
            default: 5,
        },

        approved: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Testimonial", TestimonialSchema);