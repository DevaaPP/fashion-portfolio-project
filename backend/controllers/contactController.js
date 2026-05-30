const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');
const asyncHandler = require('express-async-handler');

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Submit contact form
exports.submitContact = asyncHandler(async (req, res) => {
  const { name, email, phone, subject, message, type, commissionDetails } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  const contact = await Contact.create({
    name,
    email,
    phone,
    subject,
    message,
    type,
    commissionDetails,
  });

  // Send email to designer
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.DESIGNER_EMAIL,
      subject: `New ${type}: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Type:</strong> ${type}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        ${
          type === 'Commission'
            ? `
          <h3>Commission Details:</h3>
          <p><strong>Budget:</strong> ${commissionDetails?.budget || 'Not specified'}</p>
          <p><strong>Deadline:</strong> ${commissionDetails?.deadline || 'Not specified'}</p>
          <p><strong>Description:</strong> ${commissionDetails?.description || 'Not provided'}</p>
        `
            : ''
        }
      `,
    });
  } catch (err) {
    console.error('Email sending failed:', err);
  }

  res.status(201).json({
    success: true,
    message: 'Your message has been sent successfully!',
    contact,
  });
});

// Get all contacts (Designer only)
exports.getAllContacts = asyncHandler(async (req, res) => {
  const { status } = req.query;
  let query = {};

  if (status) {
    query.status = status;
  }

  const contacts = await Contact.find(query).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: contacts.length,
    contacts,
  });
});

// Get single contact
exports.getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findByIdAndUpdate(
    req.params.id,
    { status: 'Read', readAt: new Date() },
    { new: true }
  );

  if (!contact) {
    return res.status(404).json({ message: 'Contact not found' });
  }

  res.status(200).json({
    success: true,
    contact,
  });
});

// Update contact status
exports.updateContactStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  if (!['Unread', 'Read', 'Responded', 'Archived'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  const contact = await Contact.findByIdAndUpdate(
    req.params.id,
    {
      status,
      respondedAt: status === 'Responded' ? new Date() : undefined,
    },
    { new: true }
  );

  res.status(200).json({
    success: true,
    contact,
  });
});

// Reply to contact (Send email)
exports.replyToContact = asyncHandler(async (req, res) => {
  const { reply } = req.body;

  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    return res.status(404).json({ message: 'Contact not found' });
  }

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: contact.email,
      subject: `Re: ${contact.subject}`,
      html: `
        <p>Dear ${contact.name},</p>
        <p>${reply}</p>
        <p>Best regards,<br>${process.env.DESIGNER_NAME}</p>
      `,
    });

    contact.status = 'Responded';
    contact.respondedAt = new Date();
    await contact.save();

    res.status(200).json({
      success: true,
      message: 'Email sent successfully',
    });
  } catch (err) {
    res.status(500).json({ message: 'Error sending email' });
  }
});

// Delete contact
exports.deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findByIdAndDelete(req.params.id);

  if (!contact) {
    return res.status(404).json({ message: 'Contact not found' });
  }

  res.status(200).json({
    success: true,
    message: 'Contact deleted successfully',
  });
});
