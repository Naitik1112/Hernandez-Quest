const AppError = require('../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const Tip = require('./../models/tipModel');
const factory = require('./../controllers/handlerFactory');

exports.savetip = factory.createOne(Tip);

exports.viewalltip = factory.getAll(Tip);
