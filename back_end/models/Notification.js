const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Notification Schema
const notificationSchema = new Schema({
    recipient: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
  }, {
  });
  

  const Notification = mongoose.model('Notification', notificationSchema);
  
  module.exports =  Notification;
  