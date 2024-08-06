const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const criminal = require('./../models/wantedModel');
const News = require('./../models/newsModel');
const Career = require('./../models/careerModel');

dotenv.config({ path: './config.env' });

const db = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(db)
  .then((con) => {
    console.log('Database connection sucessfull!');
  })
  .catch((err) => {
    console.log('Error generated!!!', err);
  });

const career = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/dummy_data/lspd_jobs.json`, 'utf-8')
);

// const news = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/dummy_data/news_list.json`, 'utf-8')
// );

// const criminals = JSON.parse(
//   fs.readFileSync(
//     `${__dirname}/../dev-data/dummy_data/wanted_list.json`,
//     'utf-8'
//   )
// );
// const user = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
// const reviews = JSON.parse(
//   fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8')
// );

const importData = async () => {
  try {
    await Career.create(career);
    // await News.create(news);
    // await User.create(user, { validateBeforeSave: false });
    // await Review.create(reviews);
    // await criminal.create(criminals);
    console.log('Data Successfully Loaded...');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Career.deleteMany();
    // await criminal.deleteMany();
    console.log('Data Successfully Deleted...');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
