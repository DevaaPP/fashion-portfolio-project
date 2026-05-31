// models/Portfolio.js
const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  url:      { type: String, required: true },
  publicId: { type: String, required: true }, // needed for Cloudinary deletion
}, { _id: false });

const portfolioSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['Digital', 'Hand'],
      required: true,
    },
    images: [imageSchema],          // { url, publicId }
    tags:   [String],
    tools:  [String],
    completionDate: Date,
    featured: {
      type: Boolean,
      default: false,
    },
    designer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    viewCount: { type: Number, default: 0 },
    likes:     { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Portfolio', portfolioSchema);