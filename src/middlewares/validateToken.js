import jwt from 'jsonwebtoken';
import logger from './logger.middleware.js';
import AppError from '../libs/AppError.js';

const authRequired = (req, res, next) => {
  const { token } = req.cookies;
  logger.info(`Token: ${token}`);

  if (!token) throw new AppError('Unauthorized: Missing token', 401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) {
      logger.info(`Token Error: ${err}`);
      throw new AppError('Forbidden: Invalid token', 403);
    }
    logger.info(user);
    req.user = user;
    return next();
  });
  return null;
};

export default authRequired;
