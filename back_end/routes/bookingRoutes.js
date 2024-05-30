const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const User = require('../models/User');
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
router.post('/apply', async (req, res) => {
  try {
    const { bookingId, providerId } = req.body;

    // Find the provider and booking
    const provider = await User.findById(providerId);
    const booking = await Booking.findById(bookingId);

    if (!provider || !booking) {
      return res.status(404).json({ message: 'Provider or Booking not found' });
    }

    // Add the booking to the provider's bookings array if not already present
    if (!provider.bookings.includes(bookingId)) {
      provider.bookings.push(bookingId);
      await provider.save();
    }

    // Optionally populate the bookings for detailed response
    const updatedProvider = await User.findById(providerId).populate('bookings');

    res.status(200).json(updatedProvider);
  } catch (error) {
    console.error('Error applying for booking:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/applied/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate('bookings');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user.bookings);
  } catch (error) {
    console.error('Error retrieving bookings:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.get('/user/:userId/providers', async (req, res) => {
  try {
    const userId = req.params.userId; // Get the user ID from the route parameter
    const providersSet = new Set(); // Use a set to avoid duplicate providers

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find bookings owned by the user
    const userBookings = await Booking.find({ client: userId });

    for (const booking of userBookings) {
      // Find providers who have this booking in their array
      const providers = await User.find({ role: 'provider', bookings: booking._id });
      providers.forEach(provider => providersSet.add(provider._id.toString()));
    }

    // Convert the set of provider IDs to an array and fetch provider details
    const uniqueProviderIds = Array.from(providersSet);
    const uniqueProviders = await User.find({ _id: { $in: uniqueProviderIds } });

    res.json(uniqueProviders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
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

router.get('/GetProviderByID/:providerId', async (req, res) => {
  try {
    const providerId = req.params.providerId; // Get the provider ID from the route parameter

    // Find the provider by ID
    const provider = await User.findById(providerId);

    if (!provider) {
      return res.status(404).json({ message: 'Provider not found' });
    }

    // Retrieve bookings associated with the provider's booking IDs
    const bookings = await Booking.find({ _id: { $in: provider.bookings } });

    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }

});

//Accepter Provider
router.post('/assignProvider', async (req, res) => {
  const { providerId, bookingId } = req.body;

  try {
      // Find the booking by ID
      const booking = await Booking.findById(bookingId);

      if (!booking) {
          return res.status(404).json({ message: 'Booking not found' });
      }

      // Assign the provider and update status
      booking.serviceProvider = providerId;
      booking.status = "confirmed";

      // Save the updated booking
      await booking.save();

      res.status(200).json({ message: 'Provider assigned and status updated', booking });
  } catch (error) {
      console.error('Error assigning provider:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

 

module.exports = router;
