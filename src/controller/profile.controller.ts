import { STATUSCODES, MESSAGES } from "@constants";
import { getUserProfile, updateUserProfile } from "@services";
import { UnauthorizedError } from "@utils";
import { NextFunction, Request, Response } from "express";

export const getUserProfileById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id = "" } = req.params;
    const currentUserId = req?.jwtTokenData?.id ?? "";
    if (currentUserId !== id) {
      throw new UnauthorizedError(null, MESSAGES.UNAUTHORIZED);
    }
    const { data = null } = await getUserProfile(id);
    res
      .status(STATUSCODES.SUCCESS_STATUS)
      .json({ status: true, data, message: MESSAGES.SUCCESS_MESSAGE });
  } catch (error) {
    next(error);
  }
};

export const updateUserProfileById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData = req.body;
    const id = req.params.id ?? "";
    const currentUserId = req?.jwtTokenData?.id ?? "";
    if (currentUserId !== id) {
      throw new UnauthorizedError(null, MESSAGES.UNAUTHORIZED);
    }
    const updatedUser = await updateUserProfile(id, userData);
    const { data = null } = updatedUser;
    res
      .status(STATUSCODES.SUCCESS_STATUS)
      .json({ status: true, data, message: MESSAGES.USER_UPDATED_SUCCESFULLY });
  } catch (error) {
    next(error);
  }
};
