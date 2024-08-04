const multer = require('multer');
const path = require('path');

// Define storage for the images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/criminals/'); // Uploads directory you want to save files to
  },
  filename: (req, file, cb) => {
    cb(null, `criminal-${req.user.id}-${Date.now()}.jpeg`);
  },
});

// Check file type
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only images are allowed'));
  }
};

// Initialize upload variable with the above configurations
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = upload;
