const mongoose = require('mongoose');

// Function to format date as 'dd/mm/yyyy'
function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

// Function to format time as 'HH:mm' (24-hour format)
function formatTime(date) {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  console.log(`${hours}:${minutes}`);
  return `${hours}:${minutes}`;
}

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  text: {
    type: String,
    required: [true, 'A comment must have text'],
  },
  date: {
    type: String,
    default: () => formatDate(new Date()),
  },
  time: {
    type: String,
    default: () => formatTime(new Date()),
  },
});

// Middleware to trim text and validate
commentSchema.pre('save', function (next) {
  this.text = this.text.trim();

  if (this.text.length === 0) {
    return next(new Error('Comment text cannot be empty'));
  }

  next();
});

const newsSchema = new mongoose.Schema({
  headline: {
    type: String,
    required: [true, 'A news must have a headline'],
    trim: true,
  },
  photo: {
    type: String,
    required: [true, 'A news must have a photo'],
  },
  description: {
    type: String,
    required: [true, 'A news must have description'],
  },
  keywords: {
    type: [],
  },
  date: {
    type: String,
    default: () => formatDate(new Date()),
  },
  time: {
    type: String,
    default: () => formatTime(new Date()),
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  views: {
    type: Number,
    default: 0,
  },
  truncatedDescription: {
    type: String,
  },
  truncatedHeadline: {
    type: String,
  },
  comments: [commentSchema],
});

// this middleware is for showing only first 20 words in dashboard and in news card back section
newsSchema.pre('save', function (next) {
  const news = this;
  // Split the description into words
  const words = news.description.split(' ');
  // Check if the length is less than or equal to 20
  if (words.length <= 20) {
    news.truncatedDescription = news.description;
  } else {
    // Take the first 20 words and join them with a space
    news.truncatedDescription = words.slice(0, 20).join(' ') + '...';
  }
  next();
});

newsSchema.pre('save', function (next) {
  const news = this;
  const words = news.headline.split(' ');
  if (words.length <= 20) {
    news.truncatedHeadline = news.headline;
  } else {
    news.truncatedHeadline = words.slice(0, 20).join(' ') + '...';
  }
  next();
});

const News = mongoose.model('News', newsSchema);
const Comment = mongoose.model('Comment', commentSchema);

module.exports = { News, Comment };
