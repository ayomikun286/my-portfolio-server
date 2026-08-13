import {Resend} from "resend";


const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail({ subject, html }){
      try{

        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: process.env.EMAIL_TO,
            subject,
            html

        });
        console.log("Email sent via Resend")

      }catch(err){
        console.error("Resend email error", err);

      }
}

console.log("RESEND_API_KEY:", process.env.RESEND_API_KEY);

export default sendEmail;