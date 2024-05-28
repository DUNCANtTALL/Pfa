const mongoose = require('mongoose');
const User = require('../modecd .ls/User'); // Ensure the path to your User model is correct

const mongoUrl = "mongodb+srv://mohammed:adminfarhan@cluster0.2bxgvbw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to database");

        const testUser = new User({
            name: "Test User",
            email: "testuser@example.com",
            password: "password123", // Note: In a real application, make sure to hash passwords before saving them
            role: "client", // or "provider"
            photo: "", // Optional field
            bookings: [], // Optional field, leave as an empty array
            averageRating: 0 // Default value
        });

        return testUser.save();
    })
    .then(() => {
        console.log("Test user added successfully");
        mongoose.connection.close();
    })
    .catch(error => {
        console.error("Error adding test user:", error);
        mongoose.connection.close();
    });
