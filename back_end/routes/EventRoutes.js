const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

router.post('/Add', async (req, res) => {
    const { date, time, description, user } = req.body; // Include user information
    const newEvent = new Event({ user, date, time, description});
    try {
        await newEvent.save();
        res.status(201).json({ message: 'Event created' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating event', error });
    }
});

router.get('/GetAll/:userId', async (req, res) => {
    try {
        const { userId } = req.params; // Update parameter name to lowercase
        // Find all events associated with the user
        const events = await Event.find({ user: userId }); // Use lowercase field name
        if (events.length === 0) {
            return res.status(404).json({ error: 'No event found for the user.' });
        }
        res.status(200).json(events);
    } catch (error) {
        console.error('Error retrieving events:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/delete/:date', async (req, res) => {
    const { date } = req.params;
    try {
        await Event.deleteOne({ date });
        res.status(200).json({ message: 'Event deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting event', error });
    }
});

module.exports = router;
