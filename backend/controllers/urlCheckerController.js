// controllers/urlCheckerController.js
const Admin = require('../models/Admin');
const Template = require('../models/Template');

// URLChecker - Check if email exists in admins and corresponding URL in templates
exports.urlChecker = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if email exists in admins table
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Email not found in admins table' });
    }

    const { url } = admin;

    // Check if URL matches any userId in templates table
    const template = await Template.findOne({ userId: url });
    if (template) {
      return res.status(200).json({ success: true, template });
    } else {
      return res.status(404).json({ success: false, message: 'URL does not match any userId in templates table' });
    }
  } catch (error) {
    console.error('Error occurred during URL checking:', error);
    res.status(500).send('Server error');
  }
};
