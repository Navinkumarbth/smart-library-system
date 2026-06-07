import { v2 as cloudinary } from "cloudinary";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddlewares.js";
import { Book } from "../models/bookModel.js";

export const addBook = catchAsyncErrors(async (req, res, next) => {
  const { title, author, description, price, quantity } = req.body;
  if (!title || !author || !description || !price || !quantity) {
    return next(new ErrorHandler("Please provide all required fields", 400));
  }

  let cover;
  if (req.files?.cover) {
    const coverUpload = await cloudinary.uploader.upload(
      req.files.cover.tempFilePath,
      {
        folder: "library_management_books",
      },
    );
    cover = {
      public_id: coverUpload.public_id,
      url: coverUpload.secure_url,
    };
  }

  const book = await Book.create({
    title,
    author,
    description,
    price,
    quantity,
    cover,
  });
  res.status(201).json({
    success: true,
    message: "Book added successfully",
    book,
  });
});

export const getAllBooks = catchAsyncErrors(async (req, res, next) => {
  const books = await Book.find();
  res.status(200).json({
    success: true,
    books,
  });
});

export const getSingleBook = catchAsyncErrors(async (req, res, next) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    return next(new ErrorHandler("Book not found", 404));
  }
  res.status(200).json({ success: true, book });
});

export const updateBook = catchAsyncErrors(async (req, res, next) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    return next(new ErrorHandler("Book not found", 404));
  }

  const { title, author, description, price, quantity } = req.body;

  if (title !== undefined) book.title = title;
  if (author !== undefined) book.author = author;
  if (description !== undefined) book.description = description;
  if (price !== undefined) book.price = price;
  if (quantity !== undefined) book.quantity = quantity;

  if (req.files?.cover) {
    if (book.cover?.public_id) {
      await cloudinary.uploader.destroy(book.cover.public_id);
    }
    const coverUpload = await cloudinary.uploader.upload(
      req.files.cover.tempFilePath,
      {
        folder: "library_management_books",
      },
    );
    book.cover = {
      public_id: coverUpload.public_id,
      url: coverUpload.secure_url,
    };
  }

  book.availability = Number(book.quantity) > 0;
  await book.save();

  res
    .status(200)
    .json({ success: true, message: "Book updated successfully", book });
});

export const deleteBook = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const book = await Book.findById(id);
  if (!book) {
    return next(new ErrorHandler("Book not found", 404));
  }
  if (book.cover?.public_id) {
    await cloudinary.uploader.destroy(book.cover.public_id);
  }
  await book.deleteOne();
  res.status(200).json({
    success: true,
    message: "Book deleted successfully",
  });
});
