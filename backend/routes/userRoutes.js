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
const User = require('../models/User');

// Public
router.post('/signup', signup);
router.post('/login',  login);
router.get('/profile/designer', async (req, res) => {
  try {
    const user = await User.findOne().select('-password');

    res.json({
      success: true,
      user
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});
// Protected
router.get('/me',           auth, getCurrentUser);
router.put('/update',       auth, updateProfile);
router.post('/upload-image', auth, uploadProfileImage,  uploadImgCtrl);
router.post('/upload-resume', auth, uploadResumePDF,    uploadResume);
router.delete('/resume',    auth, deleteResume);

router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'User routes working'
  });
});

module.exports = router;