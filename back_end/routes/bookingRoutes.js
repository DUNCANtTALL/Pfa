const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// CREATE a new booking
router.post('/bookings', async (req, res) => {
  const { service, categorie, date, ville } = req.body;

  try {
    const booking = new Booking({
      service,
      categorie,
      date,
      ville,
      userId: req.user._id 
    });

    await booking.save();

    res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ all bookings
router.get('/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ a specific booking by ID
router.get('/bookings/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE a booking by ID
router.put('/bookings/:id', async (req, res) => {
  const { id } = req.params;
  const { service, categorie, date, ville } = req.body;

  try {
    const booking = await Booking.findByIdAndUpdate(id, {
      service,
      categorie,
      date,
      ville
    }, { new: true });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json({ message: 'Booking updated successfully', booking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE a booking by ID
router.delete('/bookings/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await Booking.findByIdAndDelete(id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
