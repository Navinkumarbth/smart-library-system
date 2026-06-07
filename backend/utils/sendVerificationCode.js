import { generateVerificatonOtpEmailTemplate } from "./emailTemplates.js";
import { sendEmail } from "./sendEmail.js";

export async function sendVerificationCode(verificationCode, email, res) {
  try {
    const message = generateVerificatonOtpEmailTemplate(verificationCode);
    // Await sendEmail so failures are propagated and we only send success when email actually sent
    await sendEmail({
      email,
      subject:
        "Verification Code (Storehouse of Books Library Management System)",
      message,
    });
    res.status(200).json({
      success: true,
      message: `Verification code sent successfully.`,
    });
  } catch (error) {
    console.error("❌ sendVerificationCode error:", error);
    return res.status(500).json({
      success: false,
      message: "Verification code failed to send.",
    });
  }
}
