import mongoose from "mongoose";

const borrowRequestSchema = new mongoose.Schema(
  {
    user: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      name: { type: String, required: true },
      email: { type: String, required: true },
    },
    book: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
      title: { type: String },
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Declined"],
      default: "Pending",
    },
    adminNote: String,
    handledBy: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      name: String,
    },
  },
  { timestamps: true },
);

export const BorrowRequest = mongoose.model(
  "BorrowRequest",
  borrowRequestSchema,
);

export default BorrowRequest;
