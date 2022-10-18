const path = require("path");
const multer = require("multer");

// let storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     let ext = path.extname(file.originalname);
//     cb(null, Date.now() + ext);
//   },
// });

// let upload = multer({
//   storage: storage,
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype == "image/png" || file.mimetype == "image/jpg") {
//       cb(null, true);
//     } else {
//       console.log("Only .png and .jpg  format allowed!");
//       cb(null, false);
//     }
//   },
//   limits: {
//     fileSize: 1024 * 1024 * 2,
//   },
// });

// module.exports = upload;


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({ storage: storage })
module.exports = upload;
