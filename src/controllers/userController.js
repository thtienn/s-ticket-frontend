// src/controllers/userController.js
import { getAllUsers, createUser } from "../models/User";

export const fetchAllUsers = async () => {
  return await getAllUsers();
};

export const addUser = async (user) => {
  return await createUser(user);
};
