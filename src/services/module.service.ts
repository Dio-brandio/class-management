import { Modules } from "@models"; // Adjust based on your actual model import
import {
  ConflictingRequestError,
  CustomError,
  InternalServerError,
  NotFoundError,
} from "@utils";
import { STATUSCODES, MESSAGES } from "@constants";
import { IModuleDetailsDto } from "@dtos";

export const getModules = async () => {
  const modules = await Modules.findAll({
    where: { parentModuleId: null },
    include: [{ model: Modules, as: "subModules" }],
  });
  if (!modules.length)
    throw new NotFoundError(null, MESSAGES.MODULE_NOT_FOUND("Module"));
  return {
    data: modules,
  };
};

export const getModuleById = async (id: string) => {
  const module = await Modules.findByPk(id);
  if (!module) {
    throw new NotFoundError(null, MESSAGES.MODULE_NOT_FOUND("Module"));
  }
  return { data: module };
};

export const createModule = async (moduleData: any) => {
  const lowerCaseModuleName = moduleData.name?.toLowerCase();

  const existingModule = await Modules.findOne({
    where: { name: lowerCaseModuleName },
  });

  if (existingModule) {
    throw new ConflictingRequestError(
      null,
      MESSAGES.MODULE_ALREADY_EXISTS("Module")
    );
  }
  moduleData.name = lowerCaseModuleName;
  const newModule = new Modules(moduleData);
  const savedModule = await newModule.save();
  if (!savedModule) {
    throw new InternalServerError();
  }
  return { data: savedModule };
};

export const updateModule = async (
  id: string,
  moduleData: IModuleDetailsDto
) => {
  const lowerCaseRoleName = moduleData?.name?.toLowerCase() || "";
  const module = await Modules.findByPk(id);
  if (!module)
    throw new NotFoundError(null, MESSAGES.MODULE_NOT_FOUND("Module"));

  const isModuleExists = await Modules.findOne({
    where: { name: lowerCaseRoleName },
  });

  if (isModuleExists)
    throw new ConflictingRequestError(
      null,
      MESSAGES.MODULE_ALREADY_EXISTS("Module")
    );
  if (!moduleData || !Object.keys(moduleData).length) {
    throw new CustomError(
      STATUSCODES.BADREQUEST_STATUS,
      false,
      "No data provided for update"
    );
  }

  await module.update({
    ...(moduleData?.index ? { index: moduleData.index } : {}),
    ...(moduleData?.name ? { name: moduleData.name.toLowerCase() } : {}),
    ...(moduleData?.parentModuleId
      ? { parentModuleId: moduleData.parentModuleId }
      : {}),
  });
  return module;
};

export const deleteModule = async (id: string) => {
  const { data: module } = await getModuleById(id);
  await module.destroy();
  return { data: null };
};
