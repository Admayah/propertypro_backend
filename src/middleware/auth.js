import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  // eslint-disable-next-line dot-notation
  const token = req.headers['authorization'];
  if (!token) {
    res.status(401).send('Access Denied');
  }
  try {
    const checkToken = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = checkToken;
    next();
  } catch (err) {
    res.status(401).send('Invalid Token');
  }
};
