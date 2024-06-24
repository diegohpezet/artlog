const bcrypt = require('bcrypt');
const User = require('../models/User');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');

const emailRegex = RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/); 
const AuthController = {
  signup: async (req, res) => {
    try {
      const { username, password, email } = req.body;
      // Check if valid email
      if (!emailRegex.test(email)) {
        res.status(500).render('register', { error: "Invalid email" });
      }
      // Check if username or email already exists
      const existsUser = await User.findOne({
        where: {
          [Op.or]: [
            { username },
            { email },
          ],
        },
      });
      if (existsUser) return res.status(400).render('register', { error: "Username or email already taken" });

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Default profile picture
      const profilePicture = `https://api.dicebear.com/8.x/avataaars/svg?seed=${username}&flip=true`

      // Create user
      const newUser = await User.create({ username, password: hashedPassword, email, profilePicture });
      res.status(200).redirect('/login');
    } catch (err) {
      res.status(500).render('register', { error: err.message });
    }
  },

  signin: async (req, res) => {
    const { username, password } = req.body;
    const user = await User.scope('withPassword').findOne({ where: { username } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
      res.cookie('token', token);
      res.status(200).redirect('/');
    } else {
      res.status(400).render('login', { error: "Invalid username or password" });
    }
  },

  signout: (req, res) => {
    res.clearCookie('token');
    res.status(200).redirect('/');
  }
};

module.exports = AuthController;