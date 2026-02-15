// import { send } from "process";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddlewares.js";
import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import e from "express";
import { sendVerificationCode } from "../utils/sendVerificationCode.js";
import { sendToken } from "../utils/sendToken.js";
import { generateForgetPasswordEmailTemplate } from "../utils/emailTemplates.js";
import { sendEmail } from "../utils/sendEmail.js";

// export const register = catchAsyncErrors(async (req, res, next) => {
//   try {
//     const { name, email, password } = req.body;
//     if (!name || !email || !password) {
//       return next(new ErrorHandler("Please enter all fields.", 400));
//     }
//     const isRegistered = await User.findOne({ email, accountVerified: true });
//     if (isRegistered) {
//       return next(new ErrorHandler("User already exists.", 400));
//     }
//     const registrationAttemptsByUser = await User.findOne({
//       email,
//       accountVerified: false,
//     });
//     if (registrationAttemptsByUser.length >= 5) {
//       return next(
//         new ErrorHandler(
//           "You have exceeded the number of registration attempts. Please contact support.",
//           400
//         )
//       );
//     }
//     if (password.length < 8 || password.length > 16) {
//       return next(
//         new ErrorHandler("Password must be between 8 and 16 characters.", 400)
//       );
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//     });
//     const verificationCode = await user.generateVerificationCode();
//     await user.save();
//     sendVerificationCode(verificationCode, email, res);
//   } catch (error) {
//     next(error);
//   }
// });

export const register = catchAsyncErrors(async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return next(new ErrorHandler("Please enter all fields.", 400));
    }

    const isRegistered = await User.findOne({ email, accountVerified: true });
    if (isRegistered) {
      return next(new ErrorHandler("User already exists.", 400));
    }

    // ✅ Use find() instead of findOne()
    const registrationAttemptsByUser = await User.find({
      email,
      accountVerified: false,
    });

    if (registrationAttemptsByUser.length >= 5) {
      return next(
        new ErrorHandler(
          "You have exceeded the number of registration attempts. Please contact support.",
          400
        )
      );
    }

    if (password.length < 8 || password.length > 16) {
      return next(
        new ErrorHandler("Password must be between 8 and 16 characters.", 400)
      );
    }

    // If there is no verified Admin yet, make this first registered user an Admin
    const adminExists = await User.exists({
      role: "Admin",
      accountVerified: true,
    });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: adminExists ? "User" : "Admin",
    });

    const verificationCode = await user.generateVerificationCode();
    await user.save();
    sendVerificationCode(verificationCode, email, res);
  } catch (error) {
    next(error);
  }
});

//* Verify OTP**//
export const verifyOTP = catchAsyncErrors(async (req, res, next) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return next(new ErrorHandler("Email or otp is missing.", 400));
  }
  try {
    // Clean and convert OTP to number (remove spaces, trim)
    const cleanOtp = String(otp).trim().replace(/\s/g, "");
    const otpNumber = Number(cleanOtp);
    
    if (isNaN(otpNumber)) {
      return next(new ErrorHandler("Invalid OTP format.", 400));
    }

    const userAllEntries = await User.find({
      email,
      accountVerified: false,
    }).sort({ createdAt: -1 });

    if (!userAllEntries || userAllEntries.length === 0) {
      return next(new ErrorHandler("User not found.", 404));
    }

    let user;

    if (userAllEntries.length > 1) {
      user = userAllEntries[0];
      await User.deleteMany({
        _id: { $ne: user._id },
        email,
        accountVerified: false,
      });
    } else {
      user = userAllEntries[0];
    }

    // Debug logging
    console.log("🔍 OTP Verification Debug:");
    console.log("  Email:", email);
    console.log("  Received OTP:", otp, "-> Cleaned:", cleanOtp, "-> Number:", otpNumber);
    console.log("  Stored OTP:", user.verificationCode, "Type:", typeof user.verificationCode);
    console.log("  OTP Match:", user.verificationCode === otpNumber);

    // Compare as numbers
    if (user.verificationCode !== otpNumber) {
      console.log("❌ OTP mismatch!");
      return next(new ErrorHandler("Invalid OTP.", 400));
    }

    const currentTime = Date.now();

    const verificationCodeExpire = new Date(
      user.verificationCodeExpire
    ).getTime();

    if (currentTime > verificationCodeExpire) {
      return next(new ErrorHandler("OTP has expired.", 400));
    }
    
    user.accountVerified = true;
    user.verificationCode = null;
    user.verificationCodeExpire = null;
    await user.save({ validateModifiedOnly: true });

    console.log("✅ OTP verified successfully for:", email);
    sendToken(user, 200, "Account verified .", res);
  } catch (error) {
    console.error("❌ OTP Verification Error:", error);
    return next(new ErrorHandler(error.message || "Internal Server Error.", 500));
  }
});

//* Login User **//
export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, expectedRole } = req.body;
  
  console.log("🔐 Login Attempt:", { email, hasPassword: !!password, expectedRole });
  
  if (!email || !password) {
    return next(new ErrorHandler("Please enter all fields.", 400));
  }
  
  const user = await User.findOne({ email, accountVerified: true }).select(
    "+password"
  );
  
  if (!user) {
    console.log("❌ Login failed: User not found or not verified");
    return next(new ErrorHandler("Invalid email or password.", 401));
  }
  
  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) {
    console.log("❌ Login failed: Password mismatch");
    return next(new ErrorHandler("Invalid email or password.", 401));
  }
  
  if (expectedRole === "Admin" && user.role !== "Admin") {
    console.log("❌ Login failed: Not authorized as admin");
    return next(new ErrorHandler("You are not authorized as an admin.", 403));
  }
  
  console.log("✅ Login successful for:", email);
  sendToken(user, 200, "Login successful.", res);
});

// logout user
export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "Logged out successfully.",
    });
});

// get user
export const getUser = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

// forget password
export const forgetPassword = catchAsyncErrors(async (req, res, next) => {
  if (!req.body.email) {
    return next(new ErrorHandler("Email is required.", 400));
  }

  const user = await User.findOne({
    email: req.body.email,
    accountVerified: true,
  });
  if (!user) {
    return next(new ErrorHandler("Invailid Email.", 404));
  }
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

  const message = generateForgetPasswordEmailTemplate(resetPasswordUrl);

  try {
    await sendEmail({
      email: user.email,
      subject: "Library Management System - Password Recovery",
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully.`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

//* Reset Password */
export const resetPassword = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.params;
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new ErrorHandler(
        "Reset password token is invalid or has been expired.",
        400
      )
    );
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password & confirm does not match.", 400));
  }
  if (
    req.body.password < 8 ||
    req.body.password > 16 ||
    req.body.confirmPassword < 8 ||
    req.body.confirmPassword > 16
  ) {
    return next(
      new ErrorHandler("Password must be between 8 to 16 characters.", 400)
    );
  }
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  sendToken(user, 200, "Password reset successful.", res);
});

// update password
export const updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("+password");
  const { currentPassword, newPassword, confirmNewPassword } = req.body;
  if (!currentPassword || !newPassword || !confirmNewPassword) {
    return next(new ErrorHandler("Please enter all fields.", 400));
  }
  const isPasswordMatched = await bcrypt.compare(
    currentPassword,
    user.password
  );
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Current password is incorrect.", 400));
  }
  if (
    newPassword.length < 8 ||
    newPassword.length > 16 ||
    confirmNewPassword.length < 8 ||
    confirmNewPassword.length > 16
  ) {
    return next(
      new ErrorHandler("Password must be between 8 to 16 characters.", 400)
    );
  }
  if (newPassword !== confirmNewPassword) {
    return next(
      new ErrorHandler("New password and confirm password does not match.", 400)
    );
  }
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await user.save();
  res.status(200).json({
    success: true,
    message: "Password updated successfully.",
  });
});
