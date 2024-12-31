// loginController.js
const Login = require('../models/Login');

// Signup - Save user to login database
exports.signup = async (req, res) => {
  try {
    const { email, name, password, birthday } = req.body;

    // Check if the email already exists
    let user = await Login.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Create new user
    user = new Login({ email, name, password, birthday });
    await user.save();
    return res.status(201).json({ success: true, message: 'Signup successful', user });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
};


// Updated Signin - Authenticate user
exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists and password is correct
    const user = await Login.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Send the response with user data, except the password
    const { _id, name, email: userEmail, birthday } = user;
    res.status(200).json({
      message: `Welcome ${user.name}`,
      user: { _id, name, email: userEmail, birthday },
      isValid: true
    });
  } catch (error) {
    console.error('Error occurred during signin:', error);
    res.status(500).send('Server error');
  }
};

// Get user by email
exports.getUserByEmail = async (req, res) => {
    try {
      const { email } = req.params;
      const user = await Login.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).send('Server error');
    }
  };
