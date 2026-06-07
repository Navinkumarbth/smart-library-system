export const sendToken = (user, statusCode, message, res) => {
  const token = user.generateToken();
  const isProduction = process.env.NODE_ENV === "production";
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    sameSite: isProduction ? "none" : "lax", // lax for localhost, none for production
    secure: isProduction, // Only secure in production (HTTPS)
  };
  
  console.log("🍪 Setting cookie with options:", {
    httpOnly: options.httpOnly,
    sameSite: options.sameSite,
    secure: options.secure,
    expires: options.expires,
  });
  
  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({
      success: true,
      user,
      message,
      token,
    });
};
