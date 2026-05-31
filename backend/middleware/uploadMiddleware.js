// middleware/uploadMiddleware.js
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinaryConfig');

/* ─────────────────── Portfolio / Profile Images ─────────────────── */
const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: 'fashion-portfolio/images',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
    transformation: [{ quality: 'auto', fetch_format: 'auto' }],
    resource_type: 'image',
  }),
});

/* ─────────────────── Resume PDF  ─────────────────── */
const pdfStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: 'fashion-portfolio/resume',
    resource_type: 'raw',   // PDFs must be 'raw' in Cloudinary
    format: 'pdf',
    allowed_formats: ['pdf'],
  }),
});

const fileFilter = (accepted) => (req, file, cb) => {
  if (accepted.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Only ${accepted.join(', ')} files are allowed`), false);
  }
};

const imageMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
const pdfMimes  = ['application/pdf'];

// Single profile image
exports.uploadProfileImage = multer({
  storage: imageStorage,
  fileFilter: fileFilter(imageMimes),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
}).single('image');

// Up to 10 portfolio images
exports.uploadPortfolioImages = multer({
  storage: imageStorage,
  fileFilter: fileFilter(imageMimes),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB each
}).array('images', 10);

// Single resume PDF
exports.uploadResumePDF = multer({
  storage: pdfStorage,
  fileFilter: fileFilter(pdfMimes),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
}).single('resume');