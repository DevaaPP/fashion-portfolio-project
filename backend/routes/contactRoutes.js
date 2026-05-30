const express = require('express');
const router = express.Router();
const {
  submitContact,
  getAllContacts,
  getContact,
  updateContactStatus,
  replyToContact,
  deleteContact,
} = require('../controllers/contactController');
const { auth } = require('../middleware/auth');

// Public route
router.post('/submit', submitContact);

// Protected routes (Designer only)
router.get('/', auth, getAllContacts);
router.get('/:id', auth, getContact);
router.put('/:id/status', auth, updateContactStatus);
router.post('/:id/reply', auth, replyToContact);
router.delete('/:id', auth, deleteContact);

module.exports = router;
