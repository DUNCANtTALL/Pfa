const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Booking Schema
const bookingSchema = new Schema({
    service: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    serviceProvider: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    city: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'pending',
    }
  }, {
  
  });
  

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = {Booking};