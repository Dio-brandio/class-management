import { STATUSCODES, MESSAGES } from "@constants";
import { PermissionUpdateInput } from "@dtos";
import { addUpdatePermissions } from "@services";
import { NextFunction, Request, Response } from "express";

export const upsertModulePermissions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Add validator here
    const { id: requestingUserId }: any = req.jwtTokenData ?? {};
    const permissionDetails: PermissionUpdateInput = req.body;
    const loginResult = await addUpdatePermissions(
      requestingUserId,
      permissionDetails
    );
    const { data = null } = loginResult;

    res
      .status(STATUSCODES.SUCCESS_STATUS)
      .json({ status: true, data, message: MESSAGES.LOGIN_SUCCESS_MESSAGE });
  } catch (error) {
    next(error);
  }
};
