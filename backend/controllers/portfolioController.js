// controllers/portfolioController.js
const Portfolio = require('../models/Portfolio');
const cloudinary = require('../config/cloudinaryConfig');
const asyncHandler = require('express-async-handler');

/* ─── Read ──────────────────────────────────────────────────────── */
exports.getAllPortfolio = asyncHandler(async (req, res) => {
  const query = {};
  if (req.query.category) query.category = req.query.category;
  if (req.query.featured === 'true') query.featured = true;

  const portfolio = await Portfolio.find(query)
    .populate('designer', 'name profileImage')
    .sort({ priority: -1, createdAt: -1 });
  res.json({ success: true, count: portfolio.length, portfolio });
});

exports.getPortfolioByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;
  if (!['Digital', 'Hand'].includes(category))
    return res.status(400).json({ message: 'Invalid category' });

  const portfolio = await Portfolio.find({ category })
    .populate('designer', 'name profileImage')
    .sort({ featured: -1, createdAt: -1 });
  res.json({ success: true, category, count: portfolio.length, portfolio });
});

exports.getPortfolioItem = asyncHandler(async (req, res) => {
  const portfolio = await Portfolio.findByIdAndUpdate(
    req.params.id,
    { $inc: { viewCount: 1 } },
    { new: true }
  ).populate('designer', 'name bio profileImage');
  if (!portfolio) return res.status(404).json({ message: 'Portfolio item not found' });
  res.json({ success: true, portfolio });
});

exports.getFeaturedPortfolio = asyncHandler(async (req, res) => {
  const portfolio = await Portfolio.find({ featured: true })
    .populate('designer', 'name profileImage')
    .limit(6);
  res.json({ success: true, count: portfolio.length, portfolio });
});

/* ─── Create ────────────────────────────────────────────────────── */
exports.createPortfolio = asyncHandler(async (req, res) => {
  const { title, description, category, tags, tools, completionDate, featured, priority } = req.body;
  if (!title || !description || !category)
    return res.status(400).json({ message: 'Please provide required fields' });

  // req.files from Cloudinary storage contains { path (url), filename (publicId) }
  const images = req.files
    ? req.files.map(f => ({ url: f.path, publicId: f.filename }))
    : [];

  const portfolio = await Portfolio.create({
    title,
    description,
    category,
    priority: Number(priority) || 0,
    images,
    tags:  tags  ? tags.split(',').map(t => t.trim()).filter(Boolean)  : [],
    tools: tools ? tools.split(',').map(t => t.trim()).filter(Boolean) : [],
    completionDate: completionDate || undefined,
    featured: featured === 'true' || featured === true,
    designer: req.user.id,
  });

  res.status(201).json({ success: true, portfolio });
});

/* ─── Update ────────────────────────────────────────────────────── */
exports.updatePortfolio = asyncHandler(async (req, res) => {
  let portfolio = await Portfolio.findById(req.params.id);
  if (!portfolio) return res.status(404).json({ message: 'Portfolio item not found' });
  if (portfolio.designer.toString() !== req.user.id)
    return res.status(403).json({ message: 'Not authorized' });

  const { title, description, category, tags, tools, completionDate, featured, priority, removeImages } = req.body;

  // Handle image removals (array of publicIds to delete)
  if (removeImages) {
    const toRemove = JSON.parse(removeImages);
    for (const pid of toRemove) {
      await cloudinary.uploader.destroy(pid).catch(() => {});
    }
    portfolio.images = portfolio.images.filter(img => !toRemove.includes(img.publicId));
  }

  // Append newly uploaded images
  if (req.files?.length) {
    const newImgs = req.files.map(f => ({ url: f.path, publicId: f.filename }));
    portfolio.images = [...portfolio.images, ...newImgs];
  }

  portfolio.title         = title         ?? portfolio.title;
  portfolio.description   = description   ?? portfolio.description;
  portfolio.category      = category      ?? portfolio.category;
  portfolio.tags          = tags  ? tags.split(',').map(t => t.trim())  : portfolio.tags;
  portfolio.tools         = tools ? tools.split(',').map(t => t.trim()) : portfolio.tools;
  portfolio.completionDate = completionDate ?? portfolio.completionDate;
  portfolio.featured       = featured !== undefined ? (featured === 'true' || featured === true) : portfolio.featured;

  portfolio.priority       = priority !== undefined ? Number(priority) : portfolio.priority;
  await portfolio.save();
  res.json({ success: true, portfolio });
});

/* ─── Delete ────────────────────────────────────────────────────── */
exports.deletePortfolio = asyncHandler(async (req, res) => {
  const portfolio = await Portfolio.findById(req.params.id);
  if (!portfolio) return res.status(404).json({ message: 'Portfolio item not found' });
  if (portfolio.designer.toString() !== req.user.id)
    return res.status(403).json({ message: 'Not authorized' });

  // Remove all images from Cloudinary
  for (const img of portfolio.images) {
    await cloudinary.uploader.destroy(img.publicId).catch(() => {});
  }

  await Portfolio.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: 'Deleted successfully' });
});

/* ─── Like ──────────────────────────────────────────────────────── */
exports.likePortfolio = asyncHandler(async (req, res) => {
  const portfolio = await Portfolio.findByIdAndUpdate(
    req.params.id,
    { $inc: { likes: 1 } },
    { new: true }
  );
  res.json({ success: true, portfolio });
});