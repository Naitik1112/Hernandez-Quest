const mongoose = require('mongoose');
const slugify = require('slugify');

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

const careerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A Schema must have a title'],
  },
  description: {
    type: String,
    required: [true, 'A job must have a description'],
  },
  role: {
    type: String,
    required: [true, 'A job must have a role'],
  },
  department: {
    type: String,
    required: [true, 'A job must have a department'],
  },
  requirements: {
    education: {
      type: String,
      required: [true, 'A job must have education requirement'],
    },
    experience: {
      type: String,
      default: 'No experience needed',
    },
    skills: {
      type: [],
      required: [true, 'A job must have some skill set'],
    },
    otherreq: {
      type: [],
    },
  },
  salary: {
    base: {
      type: Number,
      required: [true, 'A job must have salary'],
    },
    benefits: {
      type: [],
    },
  },
  employement_type: {
    type: String,
    default: 'Full Time',
  },
  application_process: {
    steps: [],
  },
  posted_date: {
    type: String,
    default: () => formatDate(new Date()),
  },
  truncatedDescription: {
    type: String,
  },
  slug: String,
});

careerSchema.index({ slug: 1 });

careerSchema.pre('save', function (next) {
  const slug = slugify(this.title, { lower: true });
  const idsuffix = this._id.toString().slice(-6);
  this.slug = `${slug}-${idsuffix}`;
  next();
});

careerSchema.pre('save', function (next) {
  const career = this;
  const words = career.description.split(' ');
  if (words.length <= 20) {
    career.truncatedDescription = career.description;
  } else {
    career.truncatedDescription = words.slice(0, 20).join(' ') + '...';
  }
  next();
});

const Career = mongoose.model('Career', careerSchema);

module.exports = Career;
