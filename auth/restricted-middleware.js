const jwt = require('jsonwebtoken');
const secrets = require('../config/secret.js');

module.exports = (req, res, next) => {
  
  const token = req.headers.authorization;

  if (token) {
    // check validity of token
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        // foul play
        res.status(401).json({ message: 'Invalid Credentials' });
      } else {
        // token is good
        req.user = { 
          username: decodedToken.username, 
          role: decodedToken.role,
        }
        next();
      }
    })
  } else {
    res.status(400).json({ message: 'No token provided' });
  }
};

