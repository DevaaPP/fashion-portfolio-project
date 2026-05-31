// routes/portfolioRoutes.js
const express = require('express');
const router  = express.Router();
const { auth }  = require('../middleware/auth');
const { uploadPortfolioImages } = require('../middleware/uploadMiddleware');
const {
  getAllPortfolio, getPortfolioByCategory, getPortfolioItem,
  createPortfolio, updatePortfolio, deletePortfolio,
  likePortfolio, getFeaturedPortfolio,
} = require('../controllers/portfolioController');

// Public
router.get('/',                 getAllPortfolio);
router.get('/featured',         getFeaturedPortfolio);
router.get('/category/:category', getPortfolioByCategory);
router.get('/:id',              getPortfolioItem);
router.post('/:id/like',        likePortfolio);

// Protected (designer/admin)
router.post('/',    auth, uploadPortfolioImages, createPortfolio);
router.put('/:id',  auth, uploadPortfolioImages, updatePortfolio);
router.delete('/:id', auth, deletePortfolio);

module.exports = router;