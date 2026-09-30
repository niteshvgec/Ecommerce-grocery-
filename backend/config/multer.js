import multer from "multer";
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});
export const upload = multer({ storage: storage });

//     React
//       │
//       │ Product Image
//       ▼
//    Multer
//       │
//       │ receives file
//       ▼
//   Cloudinary
//       │
//       │ returns URL
//       ▼
//    MongoDB
//       │
//       │ stores URL
//       ▼
// Product Document
