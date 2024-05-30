// models/Event.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    user: { // Update field name to lowercase
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },    
    date: { type: String, required: true },
    time: { type: String, required: true },
    description: { type: String, required: true }
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
