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
    const token = jwt.sign(
      { userId: newUser[0]._id },
      process.env.JWT_SECRET,
      process.env.JWT_EXPIRES_IN
    );

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};
