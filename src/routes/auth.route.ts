import express from "express";
import {
  userForgotPassword,
  userChangePassword,
  userLogin,
  userLogout,
  linkVerification,
  verifyUserOtp,
  regenerateLoginOtp,
  getUserRoles,
  setUserRole,
} from "@controller";
import { jwtmiddleware } from "@middleware";

const authRouter = express.Router();

authRouter.get("/link-verification/:token", linkVerification); // Link verification
authRouter.post("/login", userLogin); // User login
authRouter.post("/logout", jwtmiddleware, userLogout); // User logout
authRouter.post("/forgot-password", userForgotPassword); // Forgot password
authRouter.post("/change-password", jwtmiddleware, userChangePassword); // Change password
authRouter.post("/verify-otp", verifyUserOtp); // Verify otp
authRouter.post("/regenerate-otp", regenerateLoginOtp); // Reenerate otp
authRouter.get("/user-roles", jwtmiddleware, getUserRoles); // Get user roles
authRouter.post("/user-roles/:roleId", jwtmiddleware, setUserRole); // Set user roles
export { authRouter };
