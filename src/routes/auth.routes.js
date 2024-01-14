import { Router } from 'express';
import {
  signup,
  login,
  logout,
  profile,
} from '../controllers/auth.controller.js';
import authRequired from '../middlewares/validateToken.js';
import validateSchema from '../middlewares/validator.middleware.js';
import { loginSchema, signupSchema } from '../schemas/auth.schema.js';
import tryCatch from '../libs/tryCatch.js';

const router = Router();

router.post('/signup', validateSchema(signupSchema), tryCatch(signup));
router.post('/login', validateSchema(loginSchema), tryCatch(login));
router.post('/logout', logout);
router.get('/profile', authRequired, profile);

export default router;
