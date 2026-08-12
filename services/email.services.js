import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_TO,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendEmail = async ({subject, html }) => {
    await transporter.sendMail({
        from: process.env.EMAIL_TO,
        to:process.env.EMAIL_TO,
        subject,
        html,
    });
};