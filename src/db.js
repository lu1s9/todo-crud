import mongoose from 'mongoose';
import logger from './middlewares/logger.middleware.js';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    logger.info('DB is Connected');
  } catch (error) {
    logger.error(error);
  }
};

export default connectDB;
