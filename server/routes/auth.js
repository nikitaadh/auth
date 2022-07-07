const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/user.js');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const isEmail = await User.findOne({ email: req.body.email });
    const isUsername = await User.findOne({ username: req.body.username });
    const isPhone = await User.findOne({ phone: req.body.phone });
    if (!isEmail && !isUsername && !isPhone) {
      const newUser = new User({
        ...req.body,
        password: hashPassword,
      });
      const savedUser = await newUser.save();
      res
        .status(201)
        .json({ data: savedUser, message: 'Registration Successful' });
    }
    if (isEmail) {
      res.status(409).json({ data: null, message: 'Email already registered' });
    } else if (isUsername) {
      res.status(409).json({ data: null, message: 'Username already taken' });
    } else if (isPhone) {
      res
        .status(409)
        .json({ data: null, message: 'Phone Number already taken' });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(401).json({ data: null, message: 'User not found' });
    } else {
      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) {
        res.status(403).json({ data: null, message: 'Password is incorrect' });
      } else {
        res.status(200).json({ data: user, message: 'Login Successful' });
      }
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

module.exports = router;
