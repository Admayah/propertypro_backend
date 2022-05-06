import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  // eslint-disable-next-line dot-notation
  const token = req.headers['authorization'];
  if (!token) {
    res.status(401).json({ message: 'Access denied!' });
  }
  try {
    const checkToken = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = checkToken;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid Token' });
  }
};
