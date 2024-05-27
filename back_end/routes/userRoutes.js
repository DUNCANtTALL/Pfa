const express = require('express');
const router = express.Router();
const User = require('../models/User');



router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  console.log('Received data:', req.body); // Log received data

  if (!name || !email || !password || !role) {
      return res.status(400).send({ error: 'All fields are required' });
  }

  try {
      const user = new User({ name, email, password, role });
      await user.save();
      res.status(201).send({ message: 'User registered successfully', user });
  } catch (error) {
      console.error('Error in /register route:', error); // Log error for debugging
      res.status(400).send({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(401).send({ error: 'Invalid username or password' });
    }

    res.status(200).send({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Other routes remain unchanged

module.exports = router;
