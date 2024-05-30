const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Rating Schema
const ratingSchema = new Schema({
  ratedUser: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
 
  rating: {
    type: Number,
    min: 0,
    max: 5,
    required: true,
  },
 
}, {
  timestamps: true
});

const Rating = mongoose.model('Rating', ratingSchema);
module.exports = Rating;

