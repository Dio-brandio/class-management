import { MESSAGES } from "@constants";
import { RolePermissions } from "@models";
import { ForbiddenError, UnauthorizedError } from "@utils";
import { NextFunction, Request, Response } from "express";

export const checkPermission = (moduleIndex: number, action: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const jwtTokenData: any = req.jwtTokenData ?? {};
      const { userId = "", roleId = "" } = jwtTokenData;
      if (!userId || !roleId) {
        throw new UnauthorizedError(null, MESSAGES.TOKENERROR);
      }

      const rolePermissions = await RolePermissions.findOne({
        where: {
          userId,
          roleId,
          moduleIndex,
        },
        attributes: ["permissions"],
      });

      if (!rolePermissions) {
        throw new ForbiddenError(null, MESSAGES.ACCESS_DENIED);
      }

      let hasPermission = false;
      if (rolePermissions?.permissions[action]) {
        hasPermission = true;
      }

      if (hasPermission) {
        next();
      } else {
        throw new ForbiddenError(null, MESSAGES.ACCESS_DENIED);
      }
    } catch (error) {
      console.error("Error checking permissions:", error);
      next(error);
    }
  };
};
