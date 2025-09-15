import mongoose from "mongoose";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();

  session.startTransaction();
  try {
    const { name, email, password } = req.body;

    if (!email || !password || !name) return;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error("user already exist");
      error.statusCode = 409;
      throw error;
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create(
      [{ name, email, password: hashPassword }],
      [session]
    );
    const secret = process.env.JWT_SECRET;
    const expire = process.env.JWT_EXPIRES_IN;

    const token = jwt.sign({ userId: newUser[0]._id }, secret, {
      expiresIn: expire,
    });

    await session.commitTransaction();
    session.endSession();
    res.status(201).json({
      success: true,
      message: "user created",
      data: {
        token,
        user: newUser[0],
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return;

    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error("user does not exist");
      error.statusCode = 401;
      throw error;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      const error = new Error("incorrect user and password");
      error.statusCode = 401;
      throw error;
    }
    const secret = process.env.JWT_SECRET;
    const expire = process.env.JWT_EXPIRES_IN;

    const token = jwt.sign({ userId: user._id }, secret, {
      expiresIn: expire,
    });

    res.status(201).json({
      success: true,
      message: "user logged in ",
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};
