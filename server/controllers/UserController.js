import { validationResult } from "express-validator";
import userModel from "../models/userModel.js";
import { createUser } from "../services/UserService.js";

export const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  const { fullName, email, password } = req.body;
  const hashPassword = await userModel.hashPassword(password);
  try {
    const user = await createUser({
      firstName: fullName.firstName,
      lastName: fullName.lastName,
      username: email.split("@")[0],
      email,
      password: hashPassword,
    });

    const token = user.generateAuthToken();
    return res.status(201).json({ token, user });
  } catch (error) {
    return res
      .status(400)
      .json({ error: error.message || "Something went wrong" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    const isVrified = await user.comparePassword(password);
    if (!isVrified) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    const token = user.generateAuthToken();
    return res.status(200).json({ user, token });
  } catch (error) {
    return res
      .status(400)
      .json({ error: error.message || "Something went wrong" });
  }
};
