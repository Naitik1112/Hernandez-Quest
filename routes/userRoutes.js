const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.use(authController.protect);

router.get('/me', userController.getMe, userController.getOne);
router.patch(
  '/updateMe',
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe
);

router.use(authController.restrictTo('Admin'));

router.delete('/deleteuser/:id', userController.deleteUser);
router.delete('/deleteadmin/:id', userController.deleteAdmin);
router.get('/getalluser', userController.getUser);
router.post('/createadmin', userController.createUser);

module.exports = router;
