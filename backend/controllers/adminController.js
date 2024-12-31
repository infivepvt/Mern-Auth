// adminController.js
const Admin = require('../models/Admin');
const Template = require('../models/Template');
const fs = require('fs');
const path = require('path');

// Save or Update Admin Details
exports.saveAdminDetails = async (req, res) => {
  try {
    const { email, paymentStatus, url } = req.body;
    const paymentZip = req.file;

    let adminData = {
      email,
      paymentStatus,
      url,
    };


    // Check if the admin entry already exists
    let admin = await Admin.findOne({ email });
    if (admin) {
      // Update existing admin details
      await Admin.updateOne({ email }, adminData);
      res.send('Admin details updated successfully');
    } else {
      // Create new admin entry
      admin = new Admin(adminData);
      await admin.save();
      res.send('Admin details saved successfully');
    }
  } catch (error) {
    console.error('Error saving admin details:', error);
    res.status(500).send('Server error');
  }
};
// adminController.js
// URLChecker - Check if email exists in admins table and match template userID
exports.urlChecker = async (req, res) => {
  try {
    const { email } = req.body;

    // Find the admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found. Please insert a correct email.' });
    }

    // Extract URL from the admin
    const url = admin.url;

    // Find the template by userId (using the URL as userId)
    const template = await Template.findOne({ userId: url });
    if (template) {
      return res.status(200).json({ userId: template.userId });
    } else {
      return res.status(404).json({ message: 'Template not found for the given userId.' });
    }
  } catch (error) {
    console.error('Error occurred during URL check:', error);
    res.status(500).send('Server error');
  }
};

