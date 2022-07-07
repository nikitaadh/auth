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
      res.json({
        status: 'ok',
        data: savedUser,
        message: 'Registration Successful',
      });
    }
    if (isEmail) {
      res.json({
        status: 'fail',
        data: null,
        message: 'Email already registered',
      });
    } else if (isUsername) {
      res.json({
        status: 'fail',
        data: null,
        message: 'Username already taken',
      });
    } else if (isPhone) {
      res.json({
        status: 'fail',
        data: null,
        message: 'Phone Number already taken',
      });
    }
  } catch (error) {
    res.json({ status: 'fail', data: null, message: error });
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.json({ status: 'fail', data: null, message: 'User not found' });
    } else {
      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) {
        res.json({
          status: 'fail',
          data: null,
          message: 'Password is incorrect',
        });
      } else {
        res.json({ status: 'ok', data: user, message: 'Login Successful' });
      }
    }
  } catch (error) {
    res.status(400).json({ status: 'fail', data: null, message: error });
  }
});

module.exports = router;
