import mongoose from 'mongoose';
import logger from './middlewares/logger.middleware.js';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    logger.info('DB is Connected');
  } catch (error) {
    logger.error(error);
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
  } catch (error) {
    logger.info('DB is closed');
    logger.error(error);
  }
};
