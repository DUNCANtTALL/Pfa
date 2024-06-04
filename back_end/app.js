const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const ratingRoutes = require('./routes/ratingRoutes');
const notificationRoutes = require('./routes/notificationRoutes'); 
const User = require('./models/User');


app.use(cors());
app.use(express.json());

const mongoUrl = "mongodb+srv://mohammed:adminfarhan@cluster0.2bxgvbw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(mongoUrl).then(() => {
  console.log("Connected to database");
}).catch((error) => {
  console.log("Database connection error:", error);
});

app.use('/api/users', userRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/notifications', notificationRoutes); 





app.get('/', (req, res) => {
  res.send('Hello, world!');
});

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
