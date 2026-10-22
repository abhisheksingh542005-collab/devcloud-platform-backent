import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { sendTokens } from '../utils/generateTokens.js';

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const apiKey = 'dc_' + crypto.randomBytes(24).toString('hex');

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      apiKey,
    });

    if (user) {
      const accessToken = sendTokens(user, res);
      res.status(201).json({
        success: true,
        _id: user._id,
        name: user.name,
        email: user.email,
        apiKey: user.apiKey,
        accessToken,
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = sendTokens(user, res);
      res.json({
        success: true,
        _id: user._id,
        name: user.name,
        email: user.email,
        apiKey: user.apiKey,
        accessToken,
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  } catch (error) {
    next(error);
  }
};