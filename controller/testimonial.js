import TestimonialSchema from "../models/Testimonial.js";
import { successResponse, errorResponse } from "../utils/response.js";
import { sendEmail } from "../services/email.services.js";

export const createTestimonial = async (req, res) => {
    const { name, email, message, role, company, rating } = req.body;

    if (!name || !email || !message) {
        return errorResponse(res, 400, "Fill out the field")
    }

    try {

        const testimonial = new TestimonialSchema({
            name,
            email,
            message,
            role,
            company,
            rating
        })
        await testimonial.save();
        const subject = `Message from ${name}`;

        const html = `
    <div style="
        font-family: Arial, Helvetica, sans-serif;
        max-width: 600px;
        margin: 0 auto;
        padding: 30px;
        background: #f5f7fa;
        color: #222;
    ">

        <div style="
            background: #0b0f19;
            padding: 20px;
            border-radius: 10px 10px 0 0;
            color: #00bfff;
        ">
            <h2 style="margin: 0;">
                New Testimonial
            </h2>
        </div>

        <div style="
            background: #ffffff;
            padding: 30px;
            border-radius: 0 0 10px 10px;
        ">

            <p style="font-size: 15px; line-height: 1.6;">
                You have received a new testimonial through your portfolio website.
            </p>

            <div style="
                margin: 25px 0;
                padding: 20px;
                background: #f5f7fa;
                border-left: 4px solid #00bfff;
                border-radius: 5px;
            ">
                <p style="
                    margin: 0 0 10px;
                    font-size: 14px;
                    font-weight: bold;
                    color: #555;
                ">
                    MESSAGE
                </p>

                <p style="
                    margin: 0;
                    font-size: 15px;
                    line-height: 1.7;
                    color: #222;
                ">
                    ${message}
                </p>
            </div>

            <div style="margin-top: 25px;">
                <p style="margin: 8px 0;">
                    <strong>From:</strong> ${name}
                </p>
            </div>

            <hr style="
                margin: 30px 0;
                border: none;
                border-top: 1px solid #eee;
            ">

            <p style="
                margin: 0;
                font-size: 12px;
                color: #888;
            ">
                This notification was sent from your portfolio website.
            </p>

        </div>
    </div>
`;

        await sendEmail({subject, html});
        return successResponse(res, "Testimonial created successfully");

    } catch (err) {
        console.log(err)
        return errorResponse(res, 500, err.message)
    }

}


export const getApprovedTestimonials = async (req, res) => {
    try {
        const testimonials = await TestimonialSchema.find({ approved: true }).sort({ createdAt: -1 });
        return successResponse(res, "Approved testimonials retrieved successfully", testimonials);
    } catch (err) {
        console.log(err);
        return errorResponse(res, 500, err.message);
    }
};

export const approveTestimonial = async (req, res) => {
    const { id } = req.params;

    try {
        const approvedTestimonial = await TestimonialSchema.findByIdAndUpdate(id, { approved: true }, { new: true });
        if (!approvedTestimonial) {
            return errorResponse(res, 404, "Testimonial not found");
        }
        return successResponse(res, "Testimonial approved successfully", approvedTestimonial);
    } catch (err) {
        console.log(err);
        return errorResponse(res, 500, err.message);
    }
};


export const deleteTestimonial = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTestimonial = await TestimonialSchema.findByIdAndDelete(id);
        if (!deletedTestimonial) {
            return errorResponse(res, 404, "Testimonial not found");
        }
        return successResponse(res, "Testimonial deleted successfully");
    } catch (err) {
        console.log(err);
        return errorResponse(res, 500, err.message);
    }
};

export const getTestimonials = async (req, res) => {
    try {
        const testimonials = await TestimonialSchema.find().sort({ createdAt: -1 });
        return successResponse(res, "Testimonials retrieved successfully", testimonials);
    } catch (err) {
        console.log(err);
        return errorResponse(res, 500, err.message);
    }
};