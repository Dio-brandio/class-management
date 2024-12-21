import express from "express";
import { upsertModulePermissions } from "@controller";
import { jwtmiddleware } from "@middleware";

const permissionRouter = express.Router();

permissionRouter.put("", jwtmiddleware, upsertModulePermissions); // Upsert permission

export { permissionRouter };
