const express = require('express');
const router = express.Router();
const { Rating } = require('../models/rating');


router.get('/', async (req, res) => {
  try {
    const ratings = await Rating.find();
    res.json(ratings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all ratings for a specific user
router.get('/ratedUser/:userId', async (req, res) => {
  try {
    const ratings = await Rating.find({ ratedUser: req.params.userId });
    res.json(ratings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all ratings given by a specific user
router.get('/ratedBy/:userId', async (req, res) => {
  try {
    const ratings = await Rating.find({ ratedBy: req.params.userId });
    res.json(ratings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific rating by ID
router.get('/:id', getRating, (req, res) => {
  res.json(res.rating);
});

// Create a new rating
router.post('/', async (req, res) => {
  const rating = new Rating({
    ratedUser: req.body.ratedUser,
    ratedBy: req.body.ratedBy,
    rating: req.body.rating,
    review: req.body.review
  });

  try {
    const newRating = await rating.save();
    res.status(201).json(newRating);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a rating
router.patch('/:id', getRating, async (req, res) => {
  if (req.body.rating != null) {
    res.rating.rating = req.body.rating;
  }
  if (req.body.review != null) {
    res.rating.review = req.body.review;
  }
  try {
    const updatedRating = await res.rating.save();
    res.json(updatedRating);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a rating
router.delete('/:id', getRating, async (req, res) => {
  try {
    await res.rating.remove();
    res.json({ message: 'Rating deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getRating(req, res, next) {
  let rating;
  try {
    rating = await Rating.findById(req.params.id);
    if (rating == null) {
      return res.status(404).json({ message: 'Cannot find rating' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.rating = rating;
  next();
}

module.exports = router;
