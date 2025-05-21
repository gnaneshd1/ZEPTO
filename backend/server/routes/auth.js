const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const User = require('../models/User');  // Ensure path is correct
const Product = require('../models/Product');

const router = express.Router();

// Registration Route
router.post('/Register', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;

    if (!email.endsWith('@gmail.com')) {
      return res.status(400).json({ message: 'Email must end with @gmail.com' });
    }

    if (!/^\d{10}$/.test(phone)) {
      return res.status(400).json({ message: 'Phone number must be exactly 10 digits' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      contactNumber: phone,
      password, // Hashing should be handled in the model
    });

    await newUser.save();
    res.status(201).json({ message: 'Registered Successfully' });
  } catch (err) {
    console.error('Registration Error:', err);
    res.status(500).json({ message: 'Error in Registration', error: err.message });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    // Return user data with required fields
    res.status(200).json({
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        // Include other necessary fields
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



router.get('/user', async (req, res) => {
  try {
    const users = await User.find({}, '-password -resetToken -resetTokenExpiry');
    res.status(200).json({ success: true, users });
  } catch (err) {
    console.error('Fetch Users Error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Forgot Password with OTP Route
router.post('/ForgotPassword', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Email not found' });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.resetToken = otp; // Consider renaming to "otp" in the model
    user.resetTokenExpiry = Date.now() + 10 * 60 * 1000; // Valid for 10 minutes
    await user.save();

    console.log(`Generated OTP for ${email}: ${otp}`);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: user.email,
      subject: 'Your OTP for Password Reset',
      text: `Your OTP for password reset is: ${otp}\n\nThis OTP is valid for 10 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'OTP sent to your email' });
  } catch (err) {
    console.error('Forgot Password OTP Error:', err);
    res.status(500).json({ message: 'Error sending OTP', error: err.message });
  }
});

// Get Products
router.get('/zepto-login', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
});

module.exports = router;
