var multer = require('multer');
var path = require('path');

const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
      cb(new Error('File type is not supported'));
      return;
    }
    cb(null, true);
  },
});

module.exports = upload;