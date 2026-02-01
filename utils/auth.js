const jwt = require('jsonwebtoken');
 
const secret = process.env.JWT_SECRET;
const expiration = '2h';
 
module.exports = {
  authMiddleware: function (req, res, next) {
    let token = (req.body && req.body.token) || (req.query && req.query.token) || req.headers.authorization;
 
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }
 
    if (!token) {
      return res.status(401).json({ message: 'You are not have authorized access to view/update/delete this content. You must be logged in.' });
    }
 
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
      return res.status(401).json({ message: 'Invalid token.' });
    }
 
    next();
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    if(!payload){
      return res.status(401).json({ message: 'Error creating token. Missing data for creation.' });
    }

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};