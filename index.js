const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config');
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error);
  });

// Middleware
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/', async (req, res) => {
    console.log("Application is running.");
    res.status(200).json({ message: 'Application is running.' });
})


// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
