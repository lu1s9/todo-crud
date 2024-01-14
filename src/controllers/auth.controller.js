import bcrypt from 'bcryptjs';
import createAccessToken from '../libs/jwt.js';
import AppError from '../libs/AppError.js';
import {
  getUserByEmail,
  getUserById,
  createUser,
} from '../services/userService.js';

export const signup = async (req, res) => {
  const { email, username, password } = req.body;

  const userFound = await getUserByEmail(email);
  if (userFound) throw new AppError(`Email ${email} already in use!`, 409);

  const passwordHash = await bcrypt.hash(password, 10);
  const userSaved = await createUser(username, email, passwordHash);
  const token = await createAccessToken({ id: userSaved._id });

  res.cookie('token', token);
  res.status(201);
  return res.json({
    message: 'User account created succesfully',
    data: {
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
    },
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const userFound = await getUserByEmail(email);

  if (!userFound) throw new AppError('Invalid email or password', 401);

  const isMatch = await bcrypt.compare(password, userFound.password);
  if (!isMatch) throw new AppError('Invalid email or password', 401);

  const token = await createAccessToken({ id: userFound._id });

  res.cookie('token', token);
  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  });
};

export const logout = (req, res) => {
  res.cookie('token', '', { expires: new Date(0) });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const userFound = await getUserById(req.user.id);

  if (!userFound) throw new AppError(`User not found`, 400);

  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  });
};
