const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  getAllPortfolio,
  getPortfolioByCategory,
  getPortfolioItem,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
  likePortfolio,
  getFeaturedPortfolio,
} = require('../controllers/portfolioController');
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
router.get('/', getAllPortfolio);
router.get('/featured', getFeaturedPortfolio);
router.get('/category/:category', getPortfolioByCategory);
router.get('/:id', getPortfolioItem);
router.post('/:id/like', likePortfolio);

// Protected routes (Designer only)
router.post('/', auth, upload.array('images', 10), createPortfolio);
router.put('/:id', auth, updatePortfolio);
router.delete('/:id', auth, deletePortfolio);

module.exports = router;
