const jwt = require('jsonwebtoken')

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const decoded = jwt.verify(token, 'secret');
    req.userId = decoded;
    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid token", token });
  }
}

module.exports = authenticateToken;