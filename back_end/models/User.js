const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User Schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    trim: true,
  },
  role: {
    type: String,
    enum: ['client', 'service provider'],
    required: true,
  },
  bookings: [{
    type: Schema.Types.ObjectId,
    ref: 'Booking'
  }],
  averageRating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  }
}, {
  timestamps: true 
});

const User = mongoose.model('User', userSchema);

module.exports = User ;
