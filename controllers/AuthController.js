const bcrypt = require('bcrypt');
const User = require('../models/User');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');

const AuthController = {
  signup: async (req, res) => {
    try {
      const { username, password, email } = req.body;
      // Check if username or email already exists
      const existsUser = await User.findOne({
        where: {
          [Op.or]: [
            { username },
            { email },
          ],
        },
      });
      if (existsUser) return res.status(400).json({ error: "Username or email already taken" });

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create user
      const newUser = await User.create({ username, password: hashedPassword, email });
      res.json(newUser);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  signin: async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
      res.cookie('token', token, { httpOnly: true });
      res.status(200).json({ message: "Successful login!", token });
    } else {
      res.status(400).json({ error: "Invalid email or password" });
    }
  }
};

module.exports = AuthController;