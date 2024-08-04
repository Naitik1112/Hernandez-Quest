const Criminal = require('./../models/wantedModel');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Tip = require('./../models/tipModel');
const News = require('./../models/newsModel');
const Career = require('./../models/careerModel');
const application = require('./../models/applicationsModel');

// exports.getOverview = catchAsync(async (req, res, next) => {
//   // 1) Get tour data from
//   res.status(200).render('overview', {
//     title: 'All Criminals',
//   });
// });

exports.getCriminal = catchAsync(async (req, res, next) => {
  // 1) Get the data, for the requested tour (including reviews and guides)
  const tour = await Criminal.findOne({
    slug: req.params.slug,
  });
  if (!tour) {
    return next(new AppError('There is no tour with that name.', 404));
  }
  res.status(200).render('criminal', {
    title: `${tour.name} Criminal`,
    tour,
  });
});

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your account',
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account',
  });
};

exports.createAccount = (req, res) => {
  res.status(200).render('signup', {
    title: 'Create Your New Account',
  });
};

exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).render('account', {
    title: 'Your account',
    user: updatedUser,
  });
});

exports.submittip = catchAsync(async (req, res, next) => {
  res.status(200).render('tip', {
    title: 'Submit Tip',
  });
});

exports.getme = catchAsync(async (req, res, next) => {
  const userr = res.locals.user._id;
  const doc = await application.find({ user_id: userr });
  console.log(doc);

  res.status(200).render('profile', {
    title: 'Profile',
    userr,
    doc,
  });
});

exports.getAllCriminal = catchAsync(async (req, res, next) => {
  let doc = Criminal.find();

  if (req.query.name) {
    const regax = new RegExp(req.query.name, 'i');
    doc = Criminal.find({ name: { $regex: regax } });
  }

  if (req.query.sort) {
    doc = doc.sort(req.query.sort);
  }

  const tour = await doc;

  res.status(200).render('allcriminals', {
    title: 'All Criminals',
    tour,
  });
});

exports.getdashinfo = catchAsync(async (req, res, next) => {
  // in to getdashinfor method i want top two criminals, top 2 latest news from database and display it on dashboard and
  // get top 2 criminals list by total no of crimes
  const top2criminals = await Criminal.aggregate([
    {
      $sort: {
        noOfCrimes: -1,
      },
    },
    {
      $limit: 2,
    },
  ]);
  const top3newss = await News.aggregate([
    {
      $project: {
        date: 1,
        truncatedHeadline: 1,
        time: 1,
        // Convert string to date for sorting
        publishedDate: {
          $dateFromString: {
            dateString: '$date',
            format: '%d-%m-%Y', // Adjust format as per your date string format
          },
        },
      },
    },
    { $sort: { publishedDate: -1, time: -1 } },
    { $limit: 3 },
    {
      $project: {
        // Remove the temporary field from the final output
        publishedDate: 0,
      },
    },
  ]);

  res.status(200).render('overview', {
    title: 'LSPD',
    top2criminals,
    top3newss,
  });

  // res.status(200).json({
  //   status: 'success',
  //   top2criminals,
  //   top3newss,
  // });
  // when admin update anything it will also update
});

exports.getcareerinfo = catchAsync(async (req, res, next) => {
  let job = await Career.findOne({ slug: req.params.slug });

  if (!job) {
    return next(new AppError('There is no document with that name.', 404));
  }

  res.status(200).render('careers_info', {
    job,
  });
});

exports.getform = catchAsync(async (req, res, next) => {
  res.status(200).render('apply_job');
});

exports.getpublishcareer = catchAsync(async (req, res, next) => {
  res.status(200).render('publish_career');
});

exports.getpublishnews = catchAsync(async (req, res, next) => {
  res.status(200).render('publishNews');
});

exports.newadmin = catchAsync(async (req, res, next) => {
  res.status(200).render('addAdmin');
});

exports.getalljobapplications = catchAsync(async (req, res, next) => {
  const doc = await application.find({
    user_id: req.params.id,
    status: 'In Progress',
  });

  const jobSlugs = doc.map((app) => app.job_slug);

  const results = await application.aggregate([
    { $match: { job_slug: { $in: jobSlugs }, status: 'In Progress' } },
    {
      $lookup: {
        from: Career.collection.name, // The name of the Career collection
        localField: 'job_slug', // The field in the Application collection
        foreignField: 'slug', // The field in the Career collection
        as: 'careerDetails', // The name of the output array field
      },
    },
    {
      $unwind: '$careerDetails', // Unwind the array to get individual objects
    },
    {
      $project: {
        job_slug: 1, // Include the job_slug field
        title: '$careerDetails.title', // Include the title field from the Career collection
      },
    },
  ]);

  const slugTitleMap = results.reduce((acc, item) => {
    acc[item.job_slug] = item.title;
    return acc;
  }, {});

  // Step 4: Attach titles to the original applications
  const app = doc.map((app) => ({
    ...app.toObject(),
    title: slugTitleMap[app.job_slug],
  }));

  res.status(200).render('viewApplications', {
    doc,
    app,
  });
  // res.status(200).json({
  //   doc,
  //   app,
  // });
});

exports.getacceptedpug = catchAsync(async (req, res, next) => {
  const app = await application.aggregate([
    {
      $match: { status: 'Accepted' },
    },
    {
      $lookup: {
        from: Career.collection.name,
        localField: 'job_slug',
        foreignField: 'slug',
        as: 'job_info',
      },
    },
    {
      $unwind: '$job_info',
    },
    {
      $project: {
        name: 1,
        email: 1,
        education: 1,
        experience: 1,
        _id: 1,
        userId: 1,
        job_slug: 1,
        status: 1,
        date: 1,
        job_name: '$job_info.title',
      },
    },
  ]);
  res.status(200).render('getAccepted', {
    data: {
      app,
    },
  });
  // res.status(200).json({
  //   data: {
  //     app,
  //   },
  // });
});

exports.getrejectedpug = catchAsync(async (req, res, next) => {
  const app = await application.aggregate([
    {
      $match: { status: 'Rejected' },
    },
    {
      $lookup: {
        from: Career.collection.name,
        localField: 'job_slug',
        foreignField: 'slug',
        as: 'job_info',
      },
    },
    {
      $unwind: '$job_info',
    },
    {
      $project: {
        name: 1,
        email: 1,
        education: 1,
        experience: 1,
        _id: 1,
        userId: 1,
        job_slug: 1,
        status: 1,
        date: 1,
        job_name: '$job_info.title',
      },
    },
  ]);
  res.status(200).render('getRejected', {
    data: {
      app,
    },
  });
});
