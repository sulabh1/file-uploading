const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    console.log(file);
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|doc|docx|pdf)$/)) {
      return cb(new Error("Please upload correct file format"));
    }
    cb(undefined, true);
  },
});

module.exports = { upload };
