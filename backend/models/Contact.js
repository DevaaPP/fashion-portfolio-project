const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: String,
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['Inquiry', 'Commission', 'Collaboration', 'Other'],
      default: 'Inquiry',
    },
    commissionDetails: {
      budget: String,
      deadline: Date,
      description: String,
    },
    attachments: [String], // URLs for reference images
    status: {
      type: String,
      enum: ['Unread', 'Read', 'Responded', 'Archived'],
      default: 'Unread',
    },
    designer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    readAt: Date,
    respondedAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Contact', contactSchema);
