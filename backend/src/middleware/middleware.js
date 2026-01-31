import jwt from "jsonwebtoken";
import User from "../models/auth_model.js";

export const protect = async (req, res, next) => {
  const header = req.headers.authorization;

  
  if (!header) {
    return res.status(401).json({ message: "No token" });
  }

  try {

    const token = header.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    req.user = user;

    next();

  } catch (err) {
    res.status(401).json({ message: "Token not valid" });
  }
};
