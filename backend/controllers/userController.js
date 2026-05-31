// controllers/userController.js
const User = require('../models/User');
const { generateToken } = require('../middleware/auth');
const cloudinary = require('../config/cloudinaryConfig');
const asyncHandler = require('express-async-handler');

/* ─── Auth ─────────────────────────────────────────────────────── */
exports.signup = asyncHandler(async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: 'Please provide all required fields' });
  if (password !== confirmPassword)
    return res.status(400).json({ message: 'Passwords do not match' });

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: 'User already exists' });

  // First user becomes admin automatically
  const count = await User.countDocuments();
  const user = await User.create({ name, email, password, isAdmin: count === 0 });
  const token = generateToken(user._id);
  res.status(201).json({ success: true, token, user: { id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin } });
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: 'Please provide email and password' });

  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password)))
    return res.status(401).json({ message: 'Invalid email or password' });

  const token = generateToken(user._id);
  res.status(200).json({ success: true, token, user: { id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin } });
});

/* ─── Profile ───────────────────────────────────────────────────── */
exports.getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json({ success: true, user });
});

exports.getUserProfile = asyncHandler(async (req, res) => {
  // Accept both mongo ID and the string "designer" (returns first admin)
  let user;
  if (req.params.id === 'designer') {
    user = await User.findOne({ isAdmin: true }).select('-password');
  } else {
    user = await User.findById(req.params.id).select('-password');
  }
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ success: true, user });
});

exports.updateProfile = asyncHandler(async (req, res) => {
  const { name, bio, about, skills, socialLinks } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { name, bio, about, skills: skills ? JSON.parse(skills) : undefined, socialLinks: socialLinks ? JSON.parse(socialLinks) : undefined },
    { new: true, runValidators: true }
  ).select('-password');
  res.json({ success: true, user });
});

/* ─── Profile Image (Cloudinary) ───────────────────────────────── */
exports.uploadProfileImage = asyncHandler(async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

  const existing = await User.findById(req.user.id);
  // Delete old image from Cloudinary if it exists
  if (existing?.profileImage?.publicId) {
    await cloudinary.uploader.destroy(existing.profileImage.publicId).catch(() => {});
  }

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { profileImage: { url: req.file.path, publicId: req.file.filename } },
    { new: true }
  ).select('-password');

  res.json({ success: true, user });
});

/* ─── Resume PDF (Cloudinary raw) ──────────────────────────────── */
exports.uploadResume = asyncHandler(async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

  const existing = await User.findById(req.user.id);
  // Delete old PDF from Cloudinary
  if (existing?.resume?.publicId) {
    await cloudinary.uploader.destroy(existing.resume.publicId, { resource_type: 'raw' }).catch(() => {});
  }

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { resume: { url: req.file.path, publicId: req.file.filename } },
    { new: true }
  ).select('-password');

  res.json({ success: true, user });
});

/* ─── Delete Resume ─────────────────────────────────────────────── */
exports.deleteResume = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (user?.resume?.publicId) {
    await cloudinary.uploader.destroy(user.resume.publicId, { resource_type: 'raw' }).catch(() => {});
  }
  await User.findByIdAndUpdate(req.user.id, { resume: { url: '', publicId: '' } });
  res.json({ success: true, message: 'Resume deleted' });
});