// import mongoose from "mongoose";

// export const connectDB = async () => {
//   const primaryUri = process.env.MONGO_DB_URI;
//   const fallbackUri = "mongodb://127.0.0.1:27017";

//   // Try primary (Atlas or provided) URI first, otherwise try local fallback
//   const connectOptions = {
//     dbName: "library_management_system",
//     serverSelectionTimeoutMS: 5000,
//   };

//   const tryConnect = async (uri) => {
//     await mongoose.connect(uri, connectOptions);
//   };

//   try {
//     const uri = primaryUri || fallbackUri;
//     await tryConnect(uri);
//     console.log("Connected to MongoDB:", uri);
//   } catch (err) {
//     console.error(
//       "Error connecting to MongoDB with primary URI:",
//       err.message || err,
//     );
//     if (primaryUri) {
//       console.log(
//         "Attempting to connect to local MongoDB fallback at",
//         fallbackUri,
//       );
//       try {
//         await tryConnect(fallbackUri);
//         console.log("Connected to local MongoDB fallback:", fallbackUri);
//       } catch (err2) {
//         console.error("Local fallback failed:", err2);
//         throw err2;
//       }
//     } else {
//       // No primary URI provided and initial attempt failed
//       throw err;
//     }
//   }
// };

import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    // MongoDB Atlas URI from Render Environment Variables
    const mongoURI = process.env.MONGO_DB_URI;

    // Check if URI exists
    if (!mongoURI) {
      throw new Error("MONGO_DB_URI is missing in environment variables");
    }

    // Connect to MongoDB Atlas
    await mongoose.connect(mongoURI, {
      dbName: "library_management_system",
      serverSelectionTimeoutMS: 5000,
    });

    console.log("✅ Connected to MongoDB Atlas Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);

    // Stop server if DB connection fails
    process.exit(1);
  }
};
