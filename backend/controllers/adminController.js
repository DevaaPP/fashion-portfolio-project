// controllers/adminController.js
const User      = require('../models/User');
const Portfolio = require('../models/Portfolio');
const Contact   = require('../models/Contact');
const asyncHandler = require('express-async-handler');

/* ─── Dashboard stats ───────────────────────────────────────────── */
exports.getDashboardStats = asyncHandler(async (req, res) => {
  const [totalPortfolio, digitalCount, handCount, totalContacts, unreadContacts, totalViews] =
    await Promise.all([
      Portfolio.countDocuments(),
      Portfolio.countDocuments({ category: 'Digital' }),
      Portfolio.countDocuments({ category: 'Hand' }),
      Contact.countDocuments(),
      Contact.countDocuments({ status: 'Unread' }),
      Portfolio.aggregate([{ $group: { _id: null, total: { $sum: '$viewCount' } } }]),
    ]);

  const recentContacts = await Contact.find()
    .sort({ createdAt: -1 })
    .limit(5);

  res.json({
    success: true,
    stats: {
      totalPortfolio,
      digitalCount,
      handCount,
      totalContacts,
      unreadContacts,
      totalViews: totalViews[0]?.total || 0,
    },
    recentContacts,
  });
});

/* ─── All contacts (admin inbox) ───────────────────────────────── */
exports.getAllContacts = asyncHandler(async (req, res) => {
  const { status } = req.query;
  const query = status ? { status } : {};
  const contacts = await Contact.find(query).sort({ createdAt: -1 });
  res.json({ success: true, count: contacts.length, contacts });
});

exports.getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findByIdAndUpdate(
    req.params.id,
    { status: 'Read', readAt: new Date() },
    { new: true }
  );
  if (!contact) return res.status(404).json({ message: 'Not found' });
  res.json({ success: true, contact });
});

exports.updateContactStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const contact = await Contact.findByIdAndUpdate(
    req.params.id,
    { status, ...(status === 'Responded' ? { respondedAt: new Date() } : {}) },
    { new: true }
  );
  res.json({ success: true, contact });
});

exports.deleteContact = asyncHandler(async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: 'Deleted' });
});