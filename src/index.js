import app from './app.js';
import connectDB from './db.js';
import logger from './middlewares/logger.middleware.js';

connectDB();
const port = process.env.PORT;
app.listen(port, () => {
  logger.info(`Server listening on port ${port}`);
});
