const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  console.log('JWT token:', token)
  if (token) {
    try {
      const decoded = jwt.verify(token, 'secret');
      req.user = decoded;
      res.locals.isLoggedIn = true; // Set a local variable for use in views
    } catch (error) {
      console.log('Token is not valid');
      res.locals.isLoggedIn = false;
    }
  } else {
    res.locals.isLoggedIn = false;
  }
  next();
};

module.exports = authenticateToken;