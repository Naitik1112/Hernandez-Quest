const authController = require('./../controllers/authController');
const express = require('express');
const wantedController = require('./../controllers/wantedController');
const userController = require('./../controllers/userController');

const router = express.Router();

router.get('/wantedlist', wantedController.getAll);

router.get('/:slug', wantedController.getOne);

router.get('/publishcriminal', wantedController.getpublishform);

router.post(
  '/delete/:id',
  authController.protect,
  authController.restrictTo('Admin'),
  wantedController.deleteOne
);

module.exports = router;
