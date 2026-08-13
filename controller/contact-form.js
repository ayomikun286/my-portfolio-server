import { validateEmail } from "../utils/validator.js"
import { sendEmail } from "../services/email.services.js";
import { successResponse, errorResponse } from "../utils/response.js";

export const contactForm = async (req, res) => {
    const { name, email, message } = req.body;
    try {

        if (!name || !email || !message) {
            return errorResponse(res, 400, "Fill out the field")
        }

        const lowerEmail = email.trim().toLowerCase();
        if (!validateEmail(lowerEmail)) {
            return errorResponse(res, 401, "Input a valid email address")
        }

        const subject = `Message from ${name}`;
        const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #222;">
        <h2 style="margin-bottom: 20px;">New Contact Form Message</h2>

        <p>
            You have received a new message through your portfolio website.
        </p>

        <div style="margin: 20px 0; padding: 15px; background: #f5f5f5; border-left: 4px solid #00bfff;">
            <p style="margin: 0 0 10px;">
                <strong>Message</strong>
            </p>

            <p style="margin: 0;">
                ${message}
            </p>
        </div>

        <div style="margin-top: 20px;">
            <p style="margin: 5px 0;">
                <strong>From:</strong> ${name}
            </p>

            <p style="margin: 5px 0;">
                <strong>Email:</strong> ${lowerEmail}
            </p>
        </div>

        <hr style="margin: 25px 0; border: none; border-top: 1px solid #ddd;" />

        <p style="font-size: 12px; color: #777;">
            This message was sent through the contact form on your portfolio website.
        </p>
    </div>
`

        await sendEmail({ subject, html })
        return successResponse(res, "Message sent successfully")
    } catch (err) {
        console.log(err)
        return errorResponse(res, 500, err.message)
    }
}
