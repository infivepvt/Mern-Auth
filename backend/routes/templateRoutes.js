// Routes for templates
const express = require('express');
const router = express.Router();
const { getTemplateByUserId, saveOrUpdateTemplateByUserId } = require('../controllers/templateController');

router.get('/:userId', getTemplateByUserId);
router.post('/:userId', saveOrUpdateTemplateByUserId);

module.exports = router;