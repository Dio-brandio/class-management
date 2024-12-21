import { NextFunction, Request, Response } from "express";
import {
  createRole,
  getRoles,
  getRoleById as fetchRoleById,
  updateRole,
  deleteRole,
} from "@services";
import { STATUSCODES, MESSAGES } from "@constants";
import {
  addRoleValidator,
  roleIdValidator,
  updateRoleValidator,
} from "@validators";

export const getAllRoles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { data: roles } = await getRoles();
    res
      .status(STATUSCODES.SUCCESS_STATUS)
      .json({ status: true, data: roles, message: MESSAGES.SUCCESS_MESSAGE });
  } catch (error) {
    next(error);
  }
};

export const getRoleById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await roleIdValidator.validate({ id }, { abortEarly: false });
    const { data: role } = await fetchRoleById(id);
    res
      .status(STATUSCODES.SUCCESS_STATUS)
      .json({ status: true, data: role, message: MESSAGES.SUCCESS_MESSAGE });
  } catch (error) {
    next(error);
  }
};

export const addRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const roleData = req.body;
    await addRoleValidator.validate(roleData, { abortEarly: false });
    const newRole = await createRole(roleData);
    res.status(STATUSCODES.SUCCESS_STATUS).json({
      status: true,
      data: newRole,
      message: MESSAGES.MODULE_CREATED_SUCCESSFULLY("Role"),
    });
  } catch (error) {
    next(error);
  }
};

export const updateRoleById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const roleData = req.body;
    await updateRoleValidator.validate(
      { id, ...roleData },
      { abortEarly: false }
    );
    const updatedRole = await updateRole(id, roleData);
    res.status(STATUSCODES.SUCCESS_STATUS).json({
      status: true,
      data: updatedRole,
      message: MESSAGES.MODULE_UPDATED_SUCCESSFULLY("Role"),
    });
  } catch (error) {
    next(error);
  }
};

export const deleteRoleById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await roleIdValidator.validate({ id }, { abortEarly: false });
    const { data = null } = await deleteRole(id);
    res.status(STATUSCODES.SUCCESS_STATUS).json({
      status: true,
      data,
      message: MESSAGES.MODULE_DELETED_SUCCESSFULLY("Role"),
    });
  } catch (error) {
    next(error);
  }
};
