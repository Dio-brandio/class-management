import express from "express";
import {
  getAllUsers,
  getUserDataById,
  addUser,
  updateUserById,
  deleteUserById,
} from "@controller";
import { checkPermission } from "@middleware";
import { PERMISSIONS, MODULEINDEXES } from "@constants";

const userRouter = express.Router();

userRouter.get(
  "",
  checkPermission(MODULEINDEXES.USERS, PERMISSIONS.READ),
  getAllUsers
); // Get all users
userRouter.get(
  "/:id",
  checkPermission(MODULEINDEXES.USERS, PERMISSIONS.READ),
  getUserDataById
); // Get user by ID
userRouter.post("", addUser); // Create a new user
userRouter.put(
  "/:id",
  checkPermission(MODULEINDEXES.USERS, PERMISSIONS.UPDATE),
  updateUserById
); // Update user by ID
userRouter.delete(
  "/:id",
  checkPermission(MODULEINDEXES.USERS, PERMISSIONS.DELETE),
  deleteUserById
); // Delete user by ID

export { userRouter };
