const express = require('express');
const router = express.Router();
const  Rating  = require('../models/rating');


router.post('/Add', async (req, res) => {
  try {
    // Extract data from request body
    const { ratedUser, rating } = req.body;

    // Create a new Rating document
    const newRating = new Rating({
      ratedUser,
      rating
    });

    // Save the new rating to the database
    const savedRating = await newRating.save();

    // Send response indicating success
    res.status(201).json(savedRating);
  } catch (error) {
    // Handle errors
    console.error('Error submitting rating:', error);
    res.status(500).json({ error: 'An error occurred while submitting the rating.' });
  }
});

// Route to get all ratings of a provider and calculate the average rating
router.get('/Avg/:providerId', async (req, res) => {
  try {
    const { providerId } = req.params;

    // Find all ratings associated with the provider
    const ratings = await Rating.find({ ratedUser: providerId });

    if (ratings.length === 0) {
      return res.status(404).json({ error: 'No ratings found for the provider.' });
    }

    // Calculate the average rating
    const totalRating = ratings.reduce((sum, rating) => sum + rating.rating, 0);
    const averageRating = totalRating / ratings.length;

    res.status(200).json({averageRating });
  } catch (error) {
    console.error('Error retrieving ratings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




module.exports = router;
