import express from "express";
import {
  getAllModules,
  getModuleById,
  addModule,
  updateModuleById,
  deleteModuleById,
} from "@controller";
import { checkPermission } from "@middleware";
import { MODULEINDEXES, PERMISSIONS } from "@constants";

const moduleRouter = express.Router();

moduleRouter.get(
  "/:id",
  checkPermission(MODULEINDEXES.MODULE, PERMISSIONS.READ),
  getModuleById
); // Get module by ID

moduleRouter.get(
  "",
  checkPermission(MODULEINDEXES.MODULE, PERMISSIONS.READ),
  getAllModules
); // Get all modules
moduleRouter.post(
  "",
  checkPermission(MODULEINDEXES.MODULE, PERMISSIONS.WRITE),
  addModule
); // Create a new module
moduleRouter.put(
  "/:id",
  checkPermission(MODULEINDEXES.MODULE, PERMISSIONS.UPDATE),
  updateModuleById
); // Update module by ID
moduleRouter.delete(
  "/:id",
  checkPermission(MODULEINDEXES.MODULE, PERMISSIONS.DELETE),
  deleteModuleById
); // Delete module by ID

export { moduleRouter };
