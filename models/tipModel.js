const mongoose = require('mongoose');
const { trim } = require('validator');

// Function to format date as 'dd/mm/yyyy'
function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

// Function to format time as 'HH:mm' (24-hour format)
function formatTime(date) {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

const tipSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A trip must have a heading'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'A trip must have a description'],
    trim: true,
  },
  time: {
    type: String,
    default: () => formatTime(new Date()),
  },
  date: {
    type: String,
    default: () => formatDate(new Date()),
  },
});

const Tip = mongoose.model('Tip', tipSchema);

module.exports = Tip;
