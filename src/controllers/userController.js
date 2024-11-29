// src/controllers/userController.js
import { getAllUsers, createUser, getUser, getSession } from "../models/User";

export const fetchAllUsers = async () => {
  return await getAllUsers();
};

export const addUser = async (user) => {
  return await createUser(user);
};

export const fetchUser = async () => {
  try {
    const { data: { session }, error } = await getSession();

    if (error) {
      console.error("Error fetching session:", error);
      return null;
    }

    const userEmail = session?.user?.email;
    if (!userEmail) {
      console.warn("No email found in session.");
      return null;
    }

    const user = await getUser(userEmail);

    if (!user) {
        console.warn("No user found with the provided email.");
    }

    return user;
  } catch (error) {
    console.error("Error in fetchUser:", error);
    return null;
  }
}
