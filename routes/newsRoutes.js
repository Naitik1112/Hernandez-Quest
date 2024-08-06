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
router.patch('/:id/editnews', newsController.editnews);

router.post('/:newsId/comments', newsController.postcomments);
router.get('/:newsId/getallcomments', newsController.getallcomments);

module.exports = router;
