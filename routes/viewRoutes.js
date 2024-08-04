const express = require('express');
const viewsController = require('../controllers/viewController');
const authController = require('../controllers/authController');
const tipController = require('./../controllers/tipController');

const router = express.Router();

router.get('/api/getdashboard', viewsController.getdashinfo);

router.use(authController.isLoggedIn);

router.get('/', viewsController.getdashinfo);
router.get('/login', viewsController.getLoginForm);
router.get('/signup', viewsController.createAccount);

router.get('/api/wanted/getallwanted', viewsController.getAllCriminal);
router.get('/wanted/:slug', viewsController.getCriminal);

router.get(
  '/api/tip/submit-tip',
  authController.protect,
  viewsController.submittip
);

router.get('/api/users/me', authController.protect, viewsController.getme);
router.get(
  '/api/users/addadmin',
  authController.protect,
  authController.restrictTo('Admin'),
  viewsController.newadmin
);

router.get(
  '/api/users/getuserallapplications/:id',
  viewsController.getalljobapplications
);

router.get(
  '/api/users/getacceptedapplications',
  viewsController.getacceptedpug
);

router.get(
  '/api/users/getrejectedapplications',
  viewsController.getrejectedpug
);

module.exports = router;
