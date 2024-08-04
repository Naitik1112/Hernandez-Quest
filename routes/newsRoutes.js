const News = require('./../models/newsModel');
const newsController = require('./../controllers/newsConroller');
const authController = require('./../controllers/authController');
const viewController = require('./../controllers/viewController');
const express = require('express');

const router = express.Router();

router.use(authController.protect);

router.get('/getallnews', newsController.getNews);
router.get('/:id', newsController.getOneNews);
router.put('/:id/like', newsController.likeNews);

router.get('/getallnews/publishnews', viewController.getpublishnews);

module.exports = router;
