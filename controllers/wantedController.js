const { query } = require('express');
const AppError = require('../utils/appError');
const Criminal = require('./../models/wantedModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');
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

  req.file.filename = `criminal-${req.user.id}-${Date.now()}.jpeg`;
  console.log(req.file.filename);

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/images/criminals/${req.file.filename}`);

  next();
});

exports.getAll = catchAsync(async (req, res, next) => {
  // To allow for nested GET reviews on tour (hack)
  // let filter = {};
  // if (req.params.tourId) filter = { tour: req.params.tourId };

  // const features = Model.find(filter);
  // const doc = await features.query.explain();

  // in this query you only get criminal name, total number of crimes, and criminal photo
  let doc = Criminal.find();

  if (req.query.name) {
    const regax = new RegExp(req.query.name, 'i');
    doc = Criminal.find({ name: { $regex: regax } });
  }

  if (req.query.sort) {
    doc = doc.sort(req.query.sort);
  }

  const tour = await doc;

  res.status(200).json({
    status: 'success',
    tour,
  });
});

exports.getOne = factory.getCriminal;

exports.createNew = catchAsync(async (req, res, next) => {
  req.body.photo = req.file.filename;

  const newCriminalData = await Criminal.create(req.body);

  if (!newCriminalData) {
    return new AppError('Please fill correct information', 404);
  }

  res.status(202).json({
    status: 'success',
    data: {
      newCriminalData,
    },
  });
});

exports.deleteOne = catchAsync(async (req, res, next) => {
  let doc = await Criminal.findByIdAndDelete(req.params.id);

  if (!doc) {
    return next(new AppError('No document found with your parameters!', 404));
  }

  res.status(204).json({
    status: 'success',
  });
});

exports.getpublishform = catchAsync(async (req, res, next) => {
  res.status(200).render('publish_criminal');
});
