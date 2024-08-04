const express = require('express');
const tipController = require('./../controllers/tipController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.get(
  '/getalltip',
  authController.protect,
  authController.restrictTo('Admin'),
  tipController.viewalltip
);

module.exports = router;
