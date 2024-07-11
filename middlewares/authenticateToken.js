const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, 'secret');
      req.user = decoded;
      res.locals.isLoggedIn = true; // Set a local variable for use in views
      res.locals.currentUser = decoded;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        res.locals.isLoggedIn = false;
        res.locals.currentUser = false;
        console.log('Token is expired');

        // Clear the expired cookie
        res.clearCookie('token');
      }
    }
  } else {
    res.locals.isLoggedIn = false;
    res.locals.currentUser = false;
    console.log('Error verifying token:');
  }
  next();
};

module.exports = authenticateToken;