import Jwt from "jsonwebtoken";
import User from "../models/user";

const authorization = (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startWith("bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) return res.status(401).json({ message: "unauthorized" });

    const decoded = Jwt.verify(token, process.env.JWT_SECRET);

    const user = User.findById(decoded.userId);
    req.user = user;
    next();
  } catch (error) {}
};
