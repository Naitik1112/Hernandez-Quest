const News = require('./../models/newsModel');
const catchAsync = require('./../utils/catchAsync');
const appError = require('./../utils/appError');
const AppError = require('./../utils/appError');
const factory = require('./../controllers/handlerFactory');

exports.getNews = catchAsync(async (req, res, next) => {
  let doc = News.find();

  if (req.query.sort) {
    doc = doc.sort(req.query.sort);
  }

  const news = await doc;

  res.status(200).render('news', {
    title: 'News and Announcement',
    news,
  });
});

exports.getOneNews = catchAsync(async (req, res, next) => {
  const news = await News.findOne({ _id: req.params.id });

  if (!news) {
    return new AppError('There is no news with that id.');
  }

  news.views += 1;

  await news.save();

  const topNews = await News.aggregate([
    {
      $project: {
        headline: 1,
        description: 1,
        likes: 1,
        likesCount: { $size: '$likes' },
      },
    },
    { $sort: { likesCount: -1 } },
    { $limit: 5 },
  ]);

  res.status(200).render('onenews', {
    title: 'News',
    news,
    topNews,
  });
});

exports.createone = factory.createOne(News);

exports.likeNews = factory.likeNews;

exports.incrementviews = catchAsync(async (req, res, next) => {
  const newsId = req.params.id;

  const news = await News.findById(newsId);
  if (!news) {
    return res.status(404).send({ error: 'News not found' });
  }

  news.views += 1;
  await news.save();

  res.send({ success: true, views: news.views });
});
