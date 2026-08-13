import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_TO,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendEmail = async ({ subject, html }) => {
    await transporter.sendMail({
        from: process.env.EMAIL_TO,
        to: process.env.EMAIL_TO,
        subject,
        html,
    });
};