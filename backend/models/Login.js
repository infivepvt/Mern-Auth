// models/Login.js
const mongoose = require('mongoose');

const LoginSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }, // Primary key
  name: { type: String, required: true },
  password: { type: String, required: true },
  birthday: { type: String, required: true }, // Changed to String for simplicity
});

module.exports = mongoose.model('Login', LoginSchema);
