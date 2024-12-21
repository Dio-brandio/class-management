import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from "@utils";
import { MESSAGES, ROLE } from "@constants";
import { RolePermissions, Roles, UserRoles, Users } from "@models";
import { PermissionUpdateInput } from "@dtos";

export const addUpdatePermissions = async (
  requestingUserId: string,
  permissionDetails: PermissionUpdateInput
) => {
  const { userId, roleId, moduleIndex, permissions } = permissionDetails;
  // Check if the requesting user is an admin or super admin
  const requestingUser: any = await Users.findOne({
    where: { id: requestingUserId },
  });

  if (!requestingUser) {
    throw new NotFoundError(null, MESSAGES.USERNOTFOUND);
  }

  if (!roleId) {
    throw new BadRequestError();
  }
  const role = await Roles.findByPk(roleId);

  if (!role) {
    throw new ForbiddenError(null, MESSAGES.ROLE_NOT_RECOGNIZED);
  }

  const isAdminOrSuperAdmin =
    role.name === ROLE.ADMIN || role.name === ROLE.SUPER_ADMIN;

  if (!isAdminOrSuperAdmin) {
    throw new UnauthorizedError();
  }

  // Check if the UserRoles already exists

  const [userRole, created] = await UserRoles.findOrCreate({
    where: { userId, roleId },
    defaults: { userId, roleId },
  });

  // Check if the permission already exists
  const existingPermission = await RolePermissions.findOne({
    where: { userId, roleId, moduleIndex },
  });

  if (existingPermission) {
    // Update the existing permission
    existingPermission.permissions = {
      ...existingPermission.permissions,
      ...permissions,
    };
    await existingPermission.save(); // Save the updated permissions
    return { data: existingPermission };
  } else {
    // Create new permissions if not found
    const newPermission = new RolePermissions({
      userId,
      roleId,
      moduleIndex,
      permissions,
    });
    const savedPermission = await newPermission.save();
    return { data: savedPermission };
  }
};
