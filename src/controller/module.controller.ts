import { NextFunction, Request, Response } from "express";
import {
  createModule,
  getModules,
  getModuleById as fetchModuleById,
  updateModule,
  deleteModule,
} from "@services";
import { STATUSCODES, MESSAGES } from "@constants";
import {
  addModuleValidator,
  moduleIdValidator,
  updateModuleValidator,
} from "@validators";

export const getAllModules = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const modules = await getModules();
    res.json(modules);
  } catch (error) {
    next(error);
  }
};

export const getModuleById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await moduleIdValidator.validate({ id }, { abortEarly: false });
    const module = await fetchModuleById(id);
    if (module) {
      res.json(module);
    } else {
      res.status(STATUSCODES.NOT_FOUND).send("Module not found");
    }
  } catch (error) {
    next(error);
  }
};

export const addModule = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const moduleData = req.body;
    await addModuleValidator.validate(moduleData, { abortEarly: false });

    const newModule = await createModule(moduleData);
    res.status(STATUSCODES.SUCCESS_STATUS).json({
      status: true,
      data: newModule,
      message: MESSAGES.MODULE_CREATED_SUCCESSFULLY("Module"),
    });
  } catch (error) {
    next(error);
  }
};

export const updateModuleById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const moduleData = req.body;
    await updateModuleValidator.validate(
      { id, ...moduleData },
      { abortEarly: false }
    );

    const updatedModule = await updateModule(id, moduleData);
    res.status(STATUSCODES.SUCCESS_STATUS).json({
      status: true,
      data: updatedModule,
      message: MESSAGES.MODULE_UPDATED_SUCCESSFULLY("Module"),
    });
  } catch (error) {
    next(error);
  }
};

export const deleteModuleById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await moduleIdValidator.validate({ id }, { abortEarly: false });
    const { data = null } = await deleteModule(id);
    res.status(STATUSCODES.SUCCESS_STATUS).json({
      status: true,
      data,
      message: MESSAGES.MODULE_DELETED_SUCCESSFULLY("Module"),
    });
  } catch (error) {
    next(error);
  }
};
