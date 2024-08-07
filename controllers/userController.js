const AppError = require('../utils/appError');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');
const multer = require('multer');
const sharp = require('sharp');

const multerStorage = multer.memoryStorage();

const multerfilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Please Upload a image', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerfilter,
});

exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  console.log(req.file);
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  const uploadPath = path.resolve(__dirname, '..', 'public', 'images', 'users');

  // Ensure directory exists
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`${uploadPath}/${req.file.filename}`);

  next();
});

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  // console.log(obj);
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // create error if user POST password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password update. Please use /updatePassword',
        400
      )
    );
  }

  //update user document
  const filterBody = filterObj(req.body, 'name', 'email', 'photo');
  if (req.file) {
    filterBody.photo = req.file.filename;
  }

  const updateUser = await User.findByIdAndUpdate(req.user.id, filterBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updateUser,
    },
  });
});

// exports.deleteMe = catchAsync(async (req, res, next) => {
//   await User.findByIdAndUpdate(req.user.id, { active: false });

//   res.status(200).json({
//     status: 'success',
//     data: null,
//   });
// });
exports.getOne = factory.getOne(User);

exports.getUser = factory.getAll(User);

// exports.getOne = factory.getOne(User);

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.createUser = factory.createOne(User);

exports.deleteUser = factory.deleteOne(User);

exports.deleteAdmin = catchAsync(async (req, res, next) => {
  const adminId = req.params.id;
  const deletedAdmin = await User.findByIdAndDelete(adminId);

  if (!deletedAdmin) {
    return res.status(404).json({ message: 'Admin not found' });
  }

  res.status(200).json({ message: 'Admin deleted successfully', deletedAdmin });
});
