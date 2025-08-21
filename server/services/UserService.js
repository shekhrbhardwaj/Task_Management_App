import userModel from "../models/userModel.js";

export const createUser = async ({
  email,
  firstName,
  lastName,
  username,
  password,
}) => {
  if (!email || !firstName || !password) {
    throw new Error("All fields are required.");
  }

  const user = await userModel.create({
    fullname: {
      firstName,
      lastName,
    },
    username,
    email,
    password,
  });

  return user;
};


