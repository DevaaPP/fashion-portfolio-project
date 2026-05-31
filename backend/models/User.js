// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name:  { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    bio:   { type: String, default: '' },
    about: { type: String, default: '' },
    profileImage: {
      url:      { type: String, default: '' },
      publicId: { type: String, default: '' },
    },
    socialLinks: {
      instagram: String,
      linkedin:  String,
      twitter:   String,
      behance:   String,
    },
    skills: [
      {
        skill: String,
        proficiency: {
          type: String,
          enum: ['Beginner', 'Intermediate', 'Expert'],
        },
      },
    ],
    resume: {
      url:      { type: String, default: '' },
      publicId: { type: String, default: '' },
    },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (entered) {
  return bcrypt.compare(entered, this.password);
};

module.exports = mongoose.model('User', userSchema);