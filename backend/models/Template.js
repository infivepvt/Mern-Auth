// Template model
const mongoose = require('mongoose');

const TemplateSchema = new mongoose.Schema({
  userId: String,
  selectedTemplate: Object,
  contactDetails: Object,
  selectedSocialMedia: Object,
  whatsAppDetails: Object,
  socialMediaUrl: String,
  socialLinks: Array,
});

module.exports = mongoose.model('Template', TemplateSchema);