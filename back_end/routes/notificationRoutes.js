const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

// Define routes here
router.get('/', async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/recipient/:recipientId', async (req, res) => {
  try {
    const notifications = await Notification.find({ recipient: req.params.recipientId });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', getNotification, (req, res) => {
  res.json(res.notification);
});

// router.post('/Add', async (req, res) => {
//   const notification = new Notification({
//     recipient: req.body.recipient,
//     type: req.body.type,
//     content: req.body.content,
//     read: req.body.read || false,
//   });

//   try {
//     const newNotification = await notification.save();
//     res.status(201).json(newNotification);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });
router.post('/Add', async (req, res) => {
  try {
    // Extract data from request body
    const { recipient, type , content ,read} = req.body;

    // Create a new Rating document
    const newNoti = new Notification({
      recipient,
      type,
      content,
      read
    });

    
    const savedNoti = await newNoti.save();

    // Send response indicating success
    res.status(201).json(savedNoti);
  } catch (error) {
    // Handle errors
    console.error('Error submitting Notification:', error);
    res.status(500).json({ error: 'An error occurred while submitting the Notif.' });
  }
});

router.patch('/:id', getNotification, async (req, res) => {
  if (req.body.read != null) {
    res.notification.read = req.body.read;
  }
  try {
    const updatedNotification = await res.notification.save();
    res.json(updatedNotification);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', getNotification, async (req, res) => {
  try {
    await res.notification.remove();
    res.json({ message: 'Notification deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getNotification(req, res, next) {
  let notification;
  try {
    notification = await Notification.findById(req.params.id);
    if (notification == null) {
      return res.status(404).json({ message: 'Cannot find notification' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.notification = notification;
  next();
}

module.exports = router;