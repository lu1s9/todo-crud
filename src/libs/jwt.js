import jwt from 'jsonwebtoken';

const createAccessToken = (payload) =>
  new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.TOKEN_SECRET,
      { expiresIn: '1d' },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });

export default createAccessToken;
