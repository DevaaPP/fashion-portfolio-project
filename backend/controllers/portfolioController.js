const Portfolio = require('../models/Portfolio');
const asyncHandler = require('express-async-handler');

// Get all portfolio items
exports.getAllPortfolio = asyncHandler(async (req, res) => {
  const { category, featured } = req.query;
  let query = {};

  if (category) {
    query.category = category;
  }
  if (featured === 'true') {
    query.featured = true;
  }

  const portfolio = await Portfolio.find(query)
    .populate('designer', 'name profileImage')
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: portfolio.length,
    portfolio,
  });
});

// Get portfolio by category (Digital or Hand)
exports.getPortfolioByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;

  if (!['Digital', 'Hand'].includes(category)) {
    return res.status(400).json({ message: 'Invalid category' });
  }

  const portfolio = await Portfolio.find({ category })
    .populate('designer', 'name profileImage')
    .sort({ featured: -1, createdAt: -1 });

  res.status(200).json({
    success: true,
    category,
    count: portfolio.length,
    portfolio,
  });
});

// Get single portfolio item
exports.getPortfolioItem = asyncHandler(async (req, res) => {
  const portfolio = await Portfolio.findByIdAndUpdate(
    req.params.id,
    { $inc: { viewCount: 1 } },
    { new: true }
  ).populate('designer', 'name bio profileImage');

  if (!portfolio) {
    return res.status(404).json({ message: 'Portfolio item not found' });
  }

  res.status(200).json({
    success: true,
    portfolio,
  });
});

// Create portfolio item (Designer only)
exports.createPortfolio = asyncHandler(async (req, res) => {
  const { title, description, category, tags, tools, completionDate, featured } = req.body;

  if (!title || !description || !category) {
    return res.status(400).json({ message: 'Please provide required fields' });
  }

  const images = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

  const portfolio = await Portfolio.create({
    title,
    description,
    category,
    images,
    tags: tags ? tags.split(',') : [],
    tools: tools ? tools.split(',') : [],
    completionDate,
    featured,
    designer: req.user.id,
  });

  res.status(201).json({
    success: true,
    portfolio,
  });
});

// Update portfolio item
exports.updatePortfolio = asyncHandler(async (req, res) => {
  let portfolio = await Portfolio.findById(req.params.id);

  if (!portfolio) {
    return res.status(404).json({ message: 'Portfolio item not found' });
  }

  // Check authorization
  if (portfolio.designer.toString() !== req.user.id) {
    return res.status(403).json({ message: 'Not authorized to update this item' });
  }

  const { title, description, category, tags, tools, completionDate, featured } = req.body;

  portfolio = await Portfolio.findByIdAndUpdate(
    req.params.id,
    {
      title,
      description,
      category,
      tags: tags ? tags.split(',') : portfolio.tags,
      tools: tools ? tools.split(',') : portfolio.tools,
      completionDate,
      featured,
    },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    portfolio,
  });
});

// Delete portfolio item
exports.deletePortfolio = asyncHandler(async (req, res) => {
  const portfolio = await Portfolio.findById(req.params.id);

  if (!portfolio) {
    return res.status(404).json({ message: 'Portfolio item not found' });
  }

  // Check authorization
  if (portfolio.designer.toString() !== req.user.id) {
    return res.status(403).json({ message: 'Not authorized to delete this item' });
  }

  await Portfolio.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: 'Portfolio item deleted successfully',
  });
});

// Like portfolio item
exports.likePortfolio = asyncHandler(async (req, res) => {
  const portfolio = await Portfolio.findByIdAndUpdate(
    req.params.id,
    { $inc: { likes: 1 } },
    { new: true }
  );

  res.status(200).json({
    success: true,
    portfolio,
  });
});

// Get featured portfolio
exports.getFeaturedPortfolio = asyncHandler(async (req, res) => {
  const portfolio = await Portfolio.find({ featured: true })
    .populate('designer', 'name profileImage')
    .limit(6);

  res.status(200).json({
    success: true,
    count: portfolio.length,
    portfolio,
  });
});
