import express from "express";
import * as isntitueController from '../controller/institution.controller'
const institutionRouter = express.Router();


institutionRouter.post("/", isntitueController.createInstiution)
institutionRouter.get("/", isntitueController.getInstitutions)


export { institutionRouter }