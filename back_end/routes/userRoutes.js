const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Verifier = require('email-verifier');

async function verifyEmail(email) {
  return new Promise((resolve, reject) => {
    Verifier.verify(email, (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(data.smtpCheck === 'true');
    });
  });
}

router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const emailExists = await verifyEmail(email);
    if (!emailExists) {
      return res.status(400).send({ error: 'Email does not exist' });
    }

    const user = new User({ name, email, password, role });
    await user.save();
    
    res.status(201).send({ message: 'User registered successfully', user });
  } catch (error) {
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
