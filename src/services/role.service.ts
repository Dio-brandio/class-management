import { Roles } from "@models";
import {
  ConflictingRequestError,
  CustomError,
  InternalServerError,
  NotFoundError,
} from "@utils";
import { STATUSCODES, MESSAGES } from "@constants";

export const getRoles = async () => {
  const roles = await Roles.findAll();
  if (!roles.length)
    throw new NotFoundError(null, MESSAGES.MODULE_NOT_FOUND("Roles"));
  return {
    data: roles,
  };
};

export const getRoleById = async (id: string) => {
  const role = await Roles.findByPk(id);
  if (!role) {
    throw new CustomError(
      STATUSCODES.NOT_FOUND,
      false,
      MESSAGES.MODULE_NOT_FOUND("Role")
    );
  }
  return { data: role };
};

export const createRole = async (roleData: any) => {
  const lowerCaseRoleName = roleData.name.toLowerCase();

  const existingRole = await Roles.findOne({
    where: { name: lowerCaseRoleName },
  });

  if (existingRole) {
    throw new ConflictingRequestError(
      null,
      MESSAGES.MODULE_ALREADY_EXISTS("Role")
    );
  }

  const newRole = new Roles({
    name: lowerCaseRoleName,
  });
  const savedRole = await newRole.save();
  if (!savedRole) {
    throw new InternalServerError();
  }

  return { data: savedRole };
};

export const updateRole = async (id: string, roleData: any) => {
  const lowerCaseRoleName = roleData.name.toLowerCase();
  const isRoleExists = await Roles.findOne({
    where: { name: lowerCaseRoleName },
  });

  if (isRoleExists)
    throw new ConflictingRequestError(
      null,
      MESSAGES.MODULE_ALREADY_EXISTS("Role")
    );

  const role = await Roles.findByPk(id);
  if (!role) throw new NotFoundError(null, MESSAGES.MODULE_NOT_FOUND("Role"));

  if (!roleData || !Object.keys(roleData).length) {
    throw new CustomError(
      STATUSCODES.BADREQUEST_STATUS,
      false,
      "No data provided for update"
    );
  }

  await role.update({
    ...(roleData?.name ? { name: lowerCaseRoleName } : {}),
  });
  return role;
};

export const deleteRole = async (id: string) => {
  const { data } = await getRoleById(id);
  await data.destroy();

  return {
    data: null,
  };
};
