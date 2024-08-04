const News = require('../models/newsModel');
const Criminal = require('../models/wantedModel');
const AppError = require('../utils/appError');
const catchAsync = require('./../utils/catchAsync');
// const APIFeatures = require('./../utils/apiFeatures');
const multer = require('multer');
const sharp = require('sharp');
const Application = require('./../models/applicationsModel');
const Career = require('./../models/careerModel');
const User = require('../models/userModel');

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

  req.file.filename = `news-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/images/news/${req.file.filename}`);

  next();
});

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    let doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with your parameters!', 404));
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError('No document found with this ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        doc,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    if (req.file) {
      req.body.photo = req.file.filename;
    }
    const doc = await Model.create(req.body);

    if (!doc) {
      return next(new AppError('No document found with this ID', 404));
    }

    res.status(201).json({
      status: 'success',
      data: {
        tour: doc,
      },
    });
  });

exports.getCriminal = catchAsync(async (req, res, next) => {
  // 1) Get the data, for the requested tour (including reviews and guides)
  let tour = await Criminal.findOne({ slug: req.params.slug });

  if (!tour) {
    // return next(new AppError('There is no criminal with that name.', 404));
    return next();
  }

  // 2) Build template
  // 3) Render template using data from 1)
  res.status(200).render('criminal', {
    title: `${tour.name} Criminal`,
    tour,
  });
});

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    // To allow for nested GET reviews on tour (hack)
    // let filter = {};
    // if (req.params.tourId) filter = { tour: req.params.tourId };

    // const features = Model.find(filter);
    // const doc = await features.query.explain();
    let doc = await Model.find();

    if (req.query.sort) {
      doc = doc.sort(req.query.sort);
      // console.log('goes inside');
    }

    const applications = await Application.aggregate([
      {
        $match: {
          status: 'In Progress',
        },
      },
      {
        $group: {
          _id: '$user_id',
          applicationCount: { $sum: 1 },
        },
      },
    ]);

    const userIds = applications.map((app) => app._id);

    // Step 2: Fetch user data using the extracted user IDs
    const users = await User.find({ _id: { $in: userIds } }).select(
      'name email'
    );

    // Combine the application count data with user data
    const result = applications.map((app) => {
      const user = users.find((u) => u._id.equals(app._id));
      return {
        user_id: app._id,
        applicationCount: app.applicationCount,
        userName: user ? user.name : null,
        userEmail: user ? user.email : null,
      };
    });

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      data: {
        doc,
        length: result.length,
        result,
      },
    });
  });

exports.getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    const doc = await query;

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        doc,
      },
    });
  });

exports.likeNews = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const newsId = req.params.id;
  console.log(newsId);

  const news = await News.findById(newsId);

  if (!news) {
    return res.status(404).json({ message: 'News article not found' });
  }

  // Check if the user has already liked the article
  const hasLiked = news.likes.includes(userId);

  if (hasLiked) {
    // If the user has already liked the article, remove the like
    news.likes.pull(userId);
  } else {
    // If the user has not liked the article, add the like
    news.likes.push(userId);
  }

  // Save the changes
  await news.save();

  res.status(200).json({
    message: hasLiked ? 'Like removed' : 'Like added',
    likesCount: news.likes.length,
  });
});

exports.getaccepted = catchAsync(async (req, res, next) => {
  const doc = await Application.find({ status: 'Accepted' });
  const app = await Application.aggregate([
    {
      $match: { status: 'Accepted' },
    },
    {
      $lookup: {
        from: Career.collection.name,
        localField: 'job_slug',
        foreignField: 'slug', // Field in Career collection that matches job_slug
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
        job_name: '$job_info.title', // Assuming 'title' is the field in Career for job title
      },
    },
  ]);
  res.status(200).json({
    status: 'accepted',
    data: {
      doc,
      app,
    },
  });
});

exports.getrejected = catchAsync(async (req, res, next) => {
  const doc = await Application.find({ status: 'Rejected' });

  res.status(200).json({
    status: 'accepted',
    data: {
      doc,
    },
  });
});
