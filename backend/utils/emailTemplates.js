export function generateVerificatonOtpEmailTemplate(otpCode) {
  return `<div style="font-family: Arial, sans-serif; max-width: 600px; margin:0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #000; color: #fff;">
  <h2 style="color: #fff; text-align: center;">Verify Your Email Address</h2>
  <p style="font-size: 16px; color: #ccc;">Dear User</p>
  <p style="font-size: 16px; color: #ccc;">To complete your registration or login, please use thye following verification code</p>

  <div style="text-align: center; margin: 20px 0;">
  <span style="display: inline-block; font-size:24px; font-weight:bold; color: #000; padding: 10px 20px; border: 1px solid #fff; border-radius: 5px; background-color: #fff;">
   ${otpCode}
     </span>
  </div>

  <p style="font-size: 16px; color: #ccc;">This code is valid for 15 minutes. Please do not share this code with anyone.</p>
  <p style="font-size: 16px; color: #ccc;">If you did not request this email, please ignore it.</p>

  <footer style="margin-top: 20px; text-align: center; font-size: 14px; color: #666;">
     <p>Thank you, <br>NK-TECH-TEAM</br></p>
     <p style="font-size: 12px; color: #444;">This is an automated message. Please do not reply to this email.</p>
  </footer>
  </div>
  `;
}

export function generateForgetPasswordEmailTemplate(resetPasswordUrl) {
  return `

  <div style="font-family: Arial, sans-serif; max-width: 600px; margin:0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #000; color: #fff;">
    <h2 style="color: #fff; text-align: center;">Reset Your Password</h2>

    <p style="font-size: 16px; color: #ccc;">Dear User,</p>
    <p style="font-size: 16px; color: #ccc;">
      We received a request to reset your password. To proceed, please click the button below to securely reset your password.
    </p>

    <div style="text-align: center; margin: 25px 0;">
      <a href="${resetPasswordUrl}" target="_blank" 
         style="display: inline-block; padding: 12px 24px; background-color: #fff; color: #000; font-weight: bold; text-decoration: none; border-radius: 5px;">
        Reset Password
      </a>
    </div>

    <p style="font-size: 16px; color: #ccc;">
      This link will be valid for 15 minutes. If you didn’t request a password reset, please ignore this email — your account is safe.
    </p>

    <footer style="margin-top: 20px; text-align: center; font-size: 14px; color: #666;">
      <p>Thank you, <br>NK-TECH-TEAM</br></p>
      <p style="font-size: 12px; color: #444;">
        This is an automated message. Please do not reply to this email.
      </p>
    </footer>
  </div>

  `;
}
