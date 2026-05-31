// routes/adminRoutes.js
const express = require('express');
const router  = express.Router();
const { adminAuth } = require('../middleware/auth');
const {
  getDashboardStats, getAllContacts,
  getContact, updateContactStatus, deleteContact,
} = require('../controllers/adminController');

router.use(adminAuth); // all admin routes require admin token

router.get('/stats',              getDashboardStats);
router.get('/contacts',           getAllContacts);
router.get('/contacts/:id',       getContact);
router.put('/contacts/:id/status', updateContactStatus);
router.delete('/contacts/:id',    deleteContact);

module.exports = router;