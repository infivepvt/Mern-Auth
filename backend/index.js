const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const templateRoutes = require('./routes/templateRoutes');
const loginRoutes = require('./routes/loginRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Set up CORS based on environment
const allowedOrigins = ['https://tapilinq.com'];  // Your frontend URL for production
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests from your frontend only
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

// Use CORS middleware with dynamic origin for production
app.use(cors(corsOptions));

// Increase payload limit to handle large image uploads
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: true }));

// Connect to MongoDB
connectDB().then(() => {
  // Register routes after database connection
  app.use('/api/templates', templateRoutes);
  app.use('/api/login', loginRoutes);
  app.use('/api/admin', adminRoutes);
  
  // Start the server only if database connections are successful
  app.listen(5000, () => {
    console.log('Server is running on port 5000');
  });
}).catch((error) => {
  console.error('Error while connecting to databases:', error);
});
