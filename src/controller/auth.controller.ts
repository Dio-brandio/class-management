import { STATUSCODES, MESSAGES } from "@constants";
import { User } from "@interfaces";
import {
  login,
  logout,
  forgotPassword,
  changePassword,
  verifyJWTToken,
  verifyOTP,
  regenerateOtp,
  getAssignedUserRoles,
  assignUserRole,
} from "@services";
import { userIdValidator } from "@validators";
import { NextFunction, Request, Response } from "express";

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const loginResult = await login({ email, password });
    const { data = null } = loginResult;

    res
      .status(STATUSCODES.SUCCESS_STATUS)
      .json({ status: true, data, message: MESSAGES.LOGIN_SUCCESS_MESSAGE });
  } catch (error) {
    next(error);
  }
};

export const userLogout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id = "" } = req.jwtTokenData ?? {};
    await userIdValidator.validate({ id });
    const logoutResult = await logout(id);
    const { data = null } = logoutResult;

    res
      .status(STATUSCODES.SUCCESS_STATUS)
      .json({ status: true, data, message: MESSAGES.LOGOUT_SUCCESS_MESSAGE });
  } catch (error) {
    next(error);
  }
};

export const userForgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const forgotPasswordResult = await forgotPassword(email);
    const { data = null } = forgotPasswordResult;

    res.status(STATUSCODES.SUCCESS_STATUS).json({
      status: true,
      data,
      message: MESSAGES.FORGOT_PASSWORD_EMAIL_SENT,
    });
  } catch (error) {
    next(error);
  }
};

export const userChangePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, newPassword } = req.body;
    const jwtTokenData = req.jwtTokenData ?? {};
    const changePasswordResult = await changePassword(
      id,
      newPassword,
      jwtTokenData
    );
    const { data = null } = changePasswordResult;

    res
      .status(STATUSCODES.SUCCESS_STATUS)
      .json({ status: true, data, message: MESSAGES.PASSWORD_CHANGED_SUCCESS });
  } catch (error) {
    next(error);
  }
};

export const linkVerification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await verifyJWTToken(req.params.token);
    if (data?.success) {
      const successURL = `${process.env.URLS_SMS_BASE_URL}${process.env.URLS_RESETLINK}?token=${req.params.token}`;
      res.redirect(successURL);
    } else {
      res.redirect(`${process.env.URLS_SMS_BASE_URL}/auth/login?token=false`);
    }
  } catch (error) {
    const errorURL = `${process.env.URLS_SMS_BASE_URL}/auth/login?token=false`;
    res.redirect(errorURL);
  }
};

export const verifyUserOtp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const otpDetails = req.body;
    const otpVerificationResult = await verifyOTP(otpDetails);
    const { data = null } = otpVerificationResult;

    res
      .status(STATUSCODES.SUCCESS_STATUS)
      .json({ status: true, data, message: MESSAGES.OTP_VERIFIED });
  } catch (error) {
    next(error);
  }
};

export const regenerateLoginOtp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, email, phoneNumber } = req.body;
    const { data = null } = await regenerateOtp({
      id,
      email,
      phoneNumber,
    });
    res
      .status(STATUSCODES.SUCCESS_STATUS)
      .json({ status: true, data, message: MESSAGES.OTP_GENERATED });
  } catch (error) {
    next(error);
  }
};

export const getUserRoles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const jwtTokenData = req.jwtTokenData ?? {};
    const assignedUserRoles = await getAssignedUserRoles(jwtTokenData);
    const { data = null } = assignedUserRoles;

    res
      .status(STATUSCODES.SUCCESS_STATUS)
      .json({ status: true, data, message: MESSAGES.SUCCESS_MESSAGE });
  } catch (error) {
    next(error);
  }
};

export const setUserRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const jwtTokenData: User = (req.jwtTokenData as User) ?? {};
    const { roleId = "" } = req.params;
    const assignedUserRoles = await assignUserRole(roleId, jwtTokenData);
    const { data = null } = assignedUserRoles;

    res
      .status(STATUSCODES.SUCCESS_STATUS)
      .json({ status: true, data, message: MESSAGES.SUCCESS_MESSAGE });
  } catch (error) {
    next(error);
  }
};
