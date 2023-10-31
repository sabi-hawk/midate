import { Router } from "express";
import multer from "multer";
import * as mediaController from "../../controllers/media";
import util from "util";
import path from "path";

const maxSize = 10 * 1024 * 1024;
const uploadFolderPath = path.resolve(__dirname, "../../../../uploads");
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadFolderPath);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

let uploadFile = multer({
    storage: storage,
    limits: { fileSize: maxSize },
}).array("files", 10);

let uploadFileMiddleware = util.promisify(uploadFile);

// const fs = require('fs');

// // Configure multer storage and file name
// const uploadFolderPath = path.resolve(__dirname, "../../../../uploads");
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadFolderPath);
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });

// // Create multer upload instance
// const upload = multer({ storage: storage });

// // Custom file upload middleware
// // @ts-ignore
// const uploadMiddleware = (req, res, next) => {
//   // Use multer upload instance
//   upload.array('files', 5)(req, res, (err) => {
//     if (err) {
//       return res.status(400).json({ error: err.message });
//     }

//     // Retrieve uploaded files
//     const files = req.files;
//     // @ts-ignore
//     const errors = [];

//     // Validate file types and sizes
//     // @ts-ignore
//     files.forEach((file) => {
//       const allowedTypes = ['image/jpeg', 'image/png'];
//       const maxSize = 5 * 1024 * 1024; // 5MB

//       if (!allowedTypes.includes(file.mimetype)) {
//         errors.push(`Invalid file type: ${file.originalname}`);
//       }

//       if (file.size > maxSize) {
//         errors.push(`File too large: ${file.originalname}`);
//       }
//     });

//     // Handle validation errors
//     if (errors.length > 0) {
//       // Remove uploaded files
//       // @ts-ignore
//       files.forEach((file) => {
//         fs.unlinkSync(file.path);
//       });
//       // @ts-ignore
//       return res.status(400).json({ errors });
//     }

//     // Attach files to the request object
//     console.log("HERE File", files)
//     req.files = files;

//     // Proceed to the next middleware or route handler
//     next();
//   });
// };

// // module.exports = uploadMiddleware;
const mediaRouter = Router();

mediaRouter.post("/upload/profile", uploadFileMiddleware, mediaController.uploadProfilePic);

mediaRouter.post("/upload/photos", uploadFileMiddleware, mediaController.upload);

export default mediaRouter;