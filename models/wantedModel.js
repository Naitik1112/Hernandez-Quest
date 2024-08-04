const mongoose = require('mongoose');
const slugify = require('slugify');
const { trim } = require('validator');

const wantedSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A criminal must have a name'],
    trim: true,
  },
  slug: String,
  noOfCrimes: {
    type: Number,
    required: [true, 'A wanted must have no of crimes record'],
  },
  photo: {
    type: String,
    required: [true, 'A criminal must have a image'],
  },
  pricepool: {
    type: Number,
  },
  gender: {
    type: String,
    required: [true, 'A criminal must have gender info'],
    lowercase: true,
    enum: ['male', 'female'],
  },
  height: {
    type: Number,
  },
  description: {
    type: String,
    default: 'No description is available for this criminal.',
  },
});

wantedSchema.index({ slug: 1 });

wantedSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Criminal = mongoose.model('Criminal', wantedSchema);

module.exports = Criminal;
