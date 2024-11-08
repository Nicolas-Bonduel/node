import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import User from "../Repositories/user.repository.js";

export const register = async (req, res) => {
  try {
      const data = { ...req.body };

      const [res_] = await User.add(data);
      const user = await User.find(res_.insertId);

      return res.status(201).json({
          status: 'OK',
          message: "new user created !" ,
          review: user
      });
  }
  catch (error) {
      return res.status(400).json({
          status: 'KO',
          err: error.message
      });
  }
};

export const login = async (req, res) => {
  try {
      const {username, password} = req.body;

      const user = await User.findOneByUsername(username);
      if (! user)
          throw new Error('Wrong credentials ! (email)');

      if (! await bcrypt.compare(password, user.password))
          throw new Error('Wrong credentials ! (password)');

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
          expiresIn: '12h',
      });
      return res.status(200).json({
          status: 'OK',
          message: "Logged in !",
          token: token
      });
  }
  catch (error) {
      return res.status(400).json({
          status: 'KO',
          err: error.message
      });
  }
};

export const overview = async (req, res) => {
  const user = await User.find(req.userId);

  return res.status(200).json({
      status: 'OK',
      user_detail: user,
  });
}

export default {
    register: register,
    login: login,
}