import express from "express";
import { body } from "express-validator";
import { registerUser, loginUser } from "../controllers/UserController.js";

const router = express.Router();

router.post(
  "/create",
  [
    body("email").notEmpty().withMessage("Email can not be empty."),
    body("email").isEmail().withMessage("Invalid email"),
    body("fullName.firstName")
      .isLength({ min: 3 })
      .withMessage("First name must be 3 chracter long."),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be 5 chracter long."),
  ],
  registerUser
);

router.post(
  "/login",
  [
    body("email").notEmpty().withMessage("Email can not be empty."),
    body("email").isEmail().withMessage("Invalid email"),
    body("password").notEmpty().withMessage("Password can not be empty."),
  ],
  loginUser
);

export default router;
