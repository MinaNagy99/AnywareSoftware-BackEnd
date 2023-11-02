import multer from "multer";
import { AppError } from "../../utilits/AppError.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/profileImg");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + "-" + file.originalname);
    }
  });
  function fileFilter(req, file, cb) {
    if (file.mimetype.startsWith("image")) {

      cb(null, true);
    } else {
      cb(new AppError("images only", 400), false);
    }
  }
  
  const upload = multer({ storage, fileFilter });

  export default upload