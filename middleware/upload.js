import express from "express"
import multer from "multer";


// Set up Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads') // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) // Use the original file name
  }
});

// Initialize Multer with storage configuration
const upload = multer({ storage: storage });

export default upload;