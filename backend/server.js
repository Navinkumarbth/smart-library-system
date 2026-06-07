import { app } from "./app.js";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import https from "https";
import { connectDB } from "./database/db.js";

dotenv.config({ path: "./config/.env" });

cloudinary.config({
  cloud_name: process.env.CLOUDNARY_CLIENT_NAME,
  api_key: process.env.CLOUDNARY_CLIENT_API,
  api_secret: process.env.CLOUDNARY_CLIENT_SECRET,
});

const getPublicIp = () =>
  new Promise((resolve, reject) => {
    try {
      https
        .get("https://api.ipify.org", (res) => {
          let data = "";
          res.on("data", (chunk) => (data += chunk));
          res.on("end", () => resolve(data));
        })
        .on("error", (e) => reject(e));
    } catch (e) {
      reject(e);
    }
  });

(async () => {
  try {
    const mongoUri = process.env.MONGO_DB_URI;
    if (!mongoUri) {
      console.warn(
        "WARNING: MONGO_DB_URI is not defined. Will attempt local MongoDB fallback.",
      );
    }

    const publicIp = await getPublicIp().catch(() => null);
    if (publicIp) {
      console.log(
        `Detected public IP: ${publicIp} — add this to MongoDB Atlas Network Access (IP whitelist).`,
      );
    } else {
      console.log(
        "Could not detect public IP automatically. If using Atlas, ensure your deployment IP is whitelisted.",
      );
    }

    await connectDB();
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
      console.log(`Server is running on PORT ${port}`);
    });
  } catch (err) {
    console.error("Failed to start server because DB connection failed.", err?.message || err);
    console.error(
      "Hint: If you see an Atlas connection error, add your public IP to Network Access in MongoDB Atlas (https://www.mongodb.com/docs/atlas/security-whitelist/).",
    );
    process.exit(1);
  }
})();
