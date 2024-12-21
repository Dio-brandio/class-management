import express from "express";
import { getUserProfileById, updateUserProfileById } from "@controller";

const profileRouter = express.Router();

profileRouter.get("/:id", getUserProfileById); // Get user by ID
profileRouter.put("/:id", updateUserProfileById); // Update user by ID

export { profileRouter };
