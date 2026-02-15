// import nodeMaller from "nodemailer";

// export const sendEmail = async ({ email, subject, message }) => {
//   const transporter = nodeMaller.createTransport({
//     host: process.env.SMTP_HOST,
//     service: process.env.SMTP_SERVICE,
//     port: process.env.SMTP_PORT,
//     auth: {
//       user: process.env.SMTP_USER,
//       pass: process.env.SMTP_PASSWORD,
//     },
//   });

//   const mailOptions = {
//     from: process.env.SMTP_FROM_MAIL,
//     to: email,
//     subject,
//     html: message,
//   };

//   await transporter.sendMail(mailOptions);
// };

import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config({ path: "./config/.env" }); // make sure .env variables load ho jayein

export const sendEmail = async ({ email, subject, message }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true, // ✅ Gmail ke liye port 465 pe secure true hota hai
    auth: {
      user: process.env.SMTP_MAIL, // ✅ correct variable
      pass: process.env.SMTP_PASSWORD, // ✅ correct variable
    },
  });

  const mailOptions = {
    from: `"NK-TECH-TEAM(LBS)" <${process.env.SMTP_MAIL}>`, // ✅ sender email
    to: email,
    subject,
    html: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully to:", email);
  } catch (error) {
    console.error("❌ Error sending email:", error);
    throw error;
  }
};
