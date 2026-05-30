const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  signup,
  login,
  getCurrentUser,
  getUserProfile,
  updateProfile,
  uploadProfileImage,
  uploadResume,
} = require('../controllers/userController');
const { auth } = require('../middleware/auth');

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// Public routes
router.post('/signup', signup);
router.post('/login', login);
router.get('/profile/:id', getUserProfile);

// Protected routes
router.get('/me', auth, getCurrentUser);
router.put('/update', auth, updateProfile);
router.post('/upload-image', auth, upload.single('image'), uploadProfileImage);
router.post('/upload-resume', auth, upload.single('resume'), uploadResume);

module.exports = router;
