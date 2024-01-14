import User from '../models/user.model.js';

export const getUserByEmail = async (email) => {
  const userFound = await User.findOne({ email });
  return userFound;
};

export const getUserById = async (id) => {
  const userFound = await User.findById(id);
  return userFound;
};

export const createUser = async (username, email, password) => {
  const newUser = new User({
    username,
    email,
    password,
  });
  const userSaved = await newUser.save();
  return userSaved;
};
