// routes/userRoutes.js
const express = require('express');
const router  = express.Router();
const { auth } = require('../middleware/auth');
const { uploadProfileImage, uploadResumePDF } = require('../middleware/uploadMiddleware');
const {
  signup, login, getCurrentUser, getUserProfile,
  updateProfile, uploadProfileImage: uploadImgCtrl,
  uploadResume, deleteResume,
} = require('../controllers/userController');

// Public
router.post('/signup', signup);
router.post('/login',  login);
router.get('/profile/:id', getUserProfile);  // :id can be "designer" for shorthand

// Protected
router.get('/me',           auth, getCurrentUser);
router.put('/update',       auth, updateProfile);
router.post('/upload-image', auth, uploadProfileImage,  uploadImgCtrl);
router.post('/upload-resume', auth, uploadResumePDF,    uploadResume);
router.delete('/resume',    auth, deleteResume);

module.exports = router;