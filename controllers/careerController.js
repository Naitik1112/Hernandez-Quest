const Career = require('./../models/careerModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');
const Application = require('./../models/applicationsModel');
const Applications = require('./../models/applicationsModel');
const sharp = require('sharp');
const multer = require('multer');

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
  if (!req.file) {
    console.log('no file found');
    return next();
  }

  req.file.filename = `jobs-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    // .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/images/jobs/${req.file.filename}`);

  next();
});

exports.createNewJob = catchAsync(async (req, res, next) => {
  if (req.file) {
    req.body.photo = req.file.filename;
  }

  const createNewJob = await Career.create(req.body);

  if (!createNewJob) {
    return new AppError('Please fill correct information', 404);
  }

  res.status(202).json({
    status: 'success',
    data: {
      createNewJob,
    },
  });
});

exports.getalljob = factory.getAll(Career);

exports.getalljobs = catchAsync(async (req, res, next) => {
  // To allow for nested GET reviews on job (hack)
  // let filter = {};
  // if (req.params.jobId) filter = { job: req.params.jobId };

  // const features = Model.find(filter);
  // const doc = await features.query.explain();
  let doc = await Career.find();

  if (req.query.sort) {
    doc = doc.sort(req.query.sort);
    // console.log('goes inside');
  }

  // SEND RESPONSE
  // res.status(200).json({
  //   status: 'success',
  //   doc,
  // });
  res.status(200).render('careers', {
    doc,
  });
});

exports.getjobbyid = catchAsync(async (req, res, next) => {
  let job = await Career.findOne({ slug: req.params.slug });

  if (!job) {
    return next(new AppError('There is no criminal with that name.', 404));
  }

  // res.status(200).render('criminal', {
  //   title: `${job.name} Criminal`,
  //   job,
  // });
  res.status(200).json({
    status: 'success',
    job,
  });
});

exports.createApplication = factory.createOne(Application);

exports.getallapplications = factory.getAll(Application);

exports.getapplicationbyuser = catchAsync(async (req, res, next) => {
  const userr = res.locals.user._id;
  const doc = await Application.find({ user_id: userr });

  const applications = await Application.aggregate([
    {
      $lookup: {
        from: Career.collection.name,
        localField: 'job_slug',
        foreignField: 'slug', // Field in Job collection that matches job_slug
        as: 'job_info',
      },
    },
    {
      $unwind: '$job_info',
    },
    {
      $project: {
        _id: 1,
        userId: 1,
        job_slug: 1,
        job_name: '$job_info.title',
      },
    },
  ]);
  // console.log(doc.length);
  res.status(200).json({
    status: 'success',
    data: {
      length: doc.length,
      doc,
      applications,
    },
  });
});

exports.getaccepted = factory.getaccepted;

exports.accept = catchAsync(async (req, res, next) => {
  const doc = await Applications.findByIdAndUpdate(
    { _id: req.params.id },
    { status: 'Accepted' },
    { new: true }
  );

  res.status(200).json({
    status: 'success',
    doc,
  });
});

exports.reject = catchAsync(async (req, res, next) => {
  const doc = await Applications.findByIdAndUpdate(
    { _id: req.params.id },
    { status: 'Rejected' },
    { new: true }
  );

  res.status(200).json({
    status: 'success',
    doc,
  });
});
