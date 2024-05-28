const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
// POST route to create a new booking



router.post('/Add', async (req, res) => {
  const { service,
    category,
    price,
    city,
    date,
    client} = req.body;

 

  try {
    const booking = new Booking({
      service,
      category,
      price,
      city,
      date,
      client,
    });

    await booking.save();
    res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// READ all bookings by userID
router.get('/bookings/user/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const bookings = await Booking.find({ client: userId });
    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found for this user' });
    }
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET all bookings
router.get('/GetAll', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET bookings by city
router.get('/GetByCity/:city', async (req, res) => {
  const { city } = req.params;

  try {
    // Find bookings with the specified city
    const bookings = await Booking.find({ city });

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found for this city' });
    }

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// GET bookings by category
router.get('/GetByCategory/:category', async (req, res) => {
  const { category } = req.params;
  try {
    const bookings = await Booking.find({ category: new RegExp(category, 'i') });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET bookings by city and category
router.get('/GetByCityAndCategory/:city/:category', async (req, res) => {
  const { city, category } = req.params;
  try {
    const bookings = await Booking.find({
      city: new RegExp(city, 'i'),
      category: new RegExp(category, 'i'),
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// routes/bookings.js (Express route file)

// Apply for a booking
router.post('/apply', async (req, res) => {
  const { bookingId, providerId } = req.body;
  try {
    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { status: 'pending', providerId: providerId },
      { new: true }
    );
    res.json(booking);
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
router.delete('/Delete/:id', async (req, res) => {
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
