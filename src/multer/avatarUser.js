const multer = require("multer");
const storage = multer.diskStorage({
  destination: "./public/avatar",
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + file.originalname);
  },
});
const upload = multer({ storage, dest: "./public/avatar" });

module.exports = upload;
