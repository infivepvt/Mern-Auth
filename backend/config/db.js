const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
  try {
    // Connect to login database
    await mongoose.connect(process.env.LOGIN_URL);
    console.log('Connected to login database');

    // Connect to templates database
    const templatesConnection = mongoose.createConnection(process.env.TEMPLATES_URL);
    templatesConnection.on('connected', () => {
      console.log('Connected to templates database');
    });

    // Connect to admin database
    const adminConnection = mongoose.createConnection(process.env.ADMIN_URL);
    adminConnection.on('connected', () => {
      console.log('Connected to admin database');
    });
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
