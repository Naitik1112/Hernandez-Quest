const mongoose = require('mongoose');

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function formatTime(date) {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

const appSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have its name'],
  },
  email: {
    type: String,
    required: [true, 'A user must have email'],
  },
  job_slug: {
    type: String,
    required: [true, 'A user must have a job_id'],
  },
  education: {
    type: String,
    required: [true, 'A user must provide education details'],
  },
  experience: {
    type: Number,
    required: [true, 'You have to enter your experience in years.'],
  },
  date: {
    type: String,
    default: () => formatDate(new Date()),
  },
  time: {
    type: String,
    default: () => formatTime(new Date()),
  },
  status: {
    type: String,
    enum: ['In Progress', 'Accepted', 'Rejected'],
    default: 'In Progress',
  },
  user_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
});

const Applications = mongoose.model('Applications', appSchema);

module.exports = Applications;
