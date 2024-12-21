import express from "express";
import {
  getAllRoles,
  getRoleById,
  addRole,
  updateRoleById,
  deleteRoleById,
} from "@controller";
import { checkPermission } from "@middleware";
import { PERMISSIONS } from "@constants";
import { MODULEINDEXES } from "src/constants/moduleIndexes.constants";

const rolesRouter = express.Router();

rolesRouter.get(
  "",
  checkPermission(MODULEINDEXES.ROLE, PERMISSIONS.READ),
  getAllRoles
); // Get all roles
rolesRouter.get(
  "/:id",
  checkPermission(MODULEINDEXES.ROLE, PERMISSIONS.READ),
  getRoleById
); // Get role by ID
rolesRouter.post(
  "",
  checkPermission(MODULEINDEXES.ROLE, PERMISSIONS.WRITE),
  addRole
); // Create a new role
rolesRouter.put(
  "/:id",
  checkPermission(MODULEINDEXES.ROLE, PERMISSIONS.UPDATE),
  updateRoleById
); // Update role by ID
rolesRouter.delete(
  "/:id",
  checkPermission(MODULEINDEXES.ROLE, PERMISSIONS.DELETE),
  deleteRoleById
); // Delete role by ID

export { rolesRouter };
