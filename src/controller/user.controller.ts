import { STATUSCODES, MESSAGES } from "@constants";
import {
  getUser,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} from "@services";
import { userDetailsValidator, validateUserSchema } from "@validators";
import { NextFunction, Request, Response } from "express";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { query: queryParams } = req;
    const users = await getUser(queryParams);
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserDataById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id = "" } = req.params;
    await validateUserSchema.validate({ id }, { abortEarly: false });
    const user = await getUserById(id);
    if (user) {
      res.json(user);
    } else {
      res.status(STATUSCODES.NOT_FOUND).json({
        status: true,
        message: MESSAGES.USERNOTFOUND,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const addUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userDetails = req.body;
    await userDetailsValidator.validate(userDetails);
    const newUser = await createUser(userDetails);
    const { data = null } = newUser;
    res
      .status(STATUSCODES.SUCCESS_STATUS)
      .json({ status: true, data, message: MESSAGES.USER_CREATED_SUCCESFULLY });
  } catch (error) {
    next(error);
  }
};

export const updateUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const userData = req.body;
    await validateUserSchema.validate(
      { id, ...userData },
      { abortEarly: false }
    );
    const updatedUser = await updateUser(id, userData);
    const { data = null } = updatedUser;
    res
      .status(STATUSCODES.SUCCESS_STATUS)
      .json({ status: true, data, message: MESSAGES.USER_UPDATED_SUCCESFULLY });
  } catch (error) {
    next(error);
  }
};

export const deleteUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await validateUserSchema.validate({ id }, { abortEarly: false });
    const deletedUser = await deleteUser(id);
    const { data = null } = deletedUser;
    res.status(STATUSCODES.SUCCESS_STATUS).json({
      status: true,
      data,
      message: MESSAGES.USER_DELETED,
    });
  } catch (error) {
    next(error);
  }
};
