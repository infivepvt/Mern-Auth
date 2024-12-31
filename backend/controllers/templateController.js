const Template = require('../models/Template');

// Get Template by UserId
exports.getTemplateByUserId = async (req, res) => {
  try {
    const template = await Template.findOne({ userId: req.params.userId });
    if (template) {
      res.json(template);
    } else {
      res.status(404).send('Template not found');
    }
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Save or Update Template by UserId
exports.saveOrUpdateTemplateByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const templateData = req.body;

    let template = await Template.findOne({ userId });
    if (template) {
      // Update existing template
      await Template.updateOne({ userId }, templateData);
      res.send('Template updated successfully');
    } else {
      // Create new template
      template = new Template(templateData);
      await template.save();
      res.send('Template saved successfully');
    }
  } catch (error) {
    res.status(500).send('Server error');
  }
};
