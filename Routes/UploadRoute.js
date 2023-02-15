import express from "express";
import multer from "multer";
const router = express.Router();

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/images");
//   },
//   filename: function (req, file, cb) {
//     cb(null, req.file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

const upload = multer({ dest: 'public/images' })

router.post('/',
  upload.single("image"), (req, res) => {
    console.log(req.file , req.body);
    try {
      res.status(200).json("File uploaded successfully");
    } catch (error) {
      console.log(error);
    }
  }
);

export default router;
