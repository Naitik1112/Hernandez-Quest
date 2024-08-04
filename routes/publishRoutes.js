const newsController = require('./../controllers/newsConroller');
const authController = require('./../controllers/authController');
const tipController = require('./../controllers/tipController');
const wantedController = require('./../controllers/wantedController');
const careerController = require('./../controllers/careerController');
const factory = require('./../controllers/handlerFactory');
const express = require('express');

const router = express.Router();

router.use(authController.protect);

router.post('/submit-tip', tipController.savetip);

router.use(authController.restrictTo('Admin'));

router.post(
  '/createnewnews',
  factory.uploadUserPhoto,
  factory.resizeUserPhoto,
  newsController.createone
);

router.post('/createnewjob', careerController.createNewJob);

router.post(
  '/createnewwanted',
  wantedController.uploadUserPhoto,
  wantedController.resizeUserPhoto,
  wantedController.createNew
);

module.exports = router;
