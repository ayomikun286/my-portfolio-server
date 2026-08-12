import User from "../models/User.js";
import { successResponse, errorResponse } from "../utils/response.js";
import { validateEmail } from "../utils/validator.js"
import { sendEmail } from "../services/email.services.js"


export const Login = (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return errorResponse(res, 400, "Fill out the field")
        }
        const lowerEmail = email.trim().toLowerCase();
        if (!validateEmail(lowerEmail)) {
            return errorResponse(res, 401, "Input a valid email address")
        }
        if (lowerEmail !== process.env.EMAIL && password !== process.env.PASSWORD) {
            return errorResponse(res, 401, "Invalid credentials")
        }
        return successResponse(res, `Welcome back ${process.env.NAME}`)

    } catch (err) {
        return errorResponse(res, 500, err.message)
    }
}




