import mongoose from "mongoose";
import dotenv from "dotenv";
import TestimonialSchema from "./models/Testimonial.js";

dotenv.config();

const testApprove = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        const testimonial = await TestimonialSchema.findOne({
            approved: false
        });

        if (!testimonial) {
            console.log("No unapproved testimonial found.");
            return;
        }

        testimonial.approved = true;

        await testimonial.save();

        console.log("Testimonial approved successfully:");
        console.log(testimonial);

    } catch (error) {
        console.error("Error:", error.message);

    } finally {
        await mongoose.disconnect();
        console.log("MongoDB disconnected");
    }
};

testApprove();