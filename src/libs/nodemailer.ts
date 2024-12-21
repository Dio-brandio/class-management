import nodemailer, { Transporter } from "nodemailer";
import { EmailAttributes } from "@interfaces";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

console.log(
  process.env.NODEMAILER_HOST,
  process.env.NODEMAILER_PORT,
  process.env.NODEMAILER_USERNAME,
  process.env.NODEMAILER_PASSWORD
);

const transporter: Transporter = nodemailer.createTransport({
  host: process.env.NODEMAILER_HOST ?? "smtp.ethereal.email",
  port: process.env.NODEMAILER_PORT
    ? parseInt(process.env.NODEMAILER_PORT)
    : 587,
  secure: false, // Use TLS
  auth: {
    user: process.env.NODEMAILER_USERNAME ?? "",
    pass: process.env.NODEMAILER_PASSWORD ?? "",
  },
} as SMTPTransport.Options);

export const emailSender = async (
  emailData: EmailAttributes
): Promise<void> => {
  const email = {
    from: process.env.EMAIL || "harshitg274@gmail.com",
    ...emailData,
    ...(emailData?.emailAttachments && {
      attachments: emailData.emailAttachments,
    }),
  }; // Use spread syntax for object merging

  try {
    const message = await transporter.sendMail(email);
    console.log("Email sent:", message.response); // Log only the response
  } catch (err) {
    console.error("Error sending email:", err);
  }
};

// Verify the transporter (optional, for debugging)
transporter.verify((error: Error | null) => {
  if (error) {
    console.error("SMTP server verification failed:", error.message);
  } else {
    console.log("SMTP server is verified and ready to send emails.");
  }
});
