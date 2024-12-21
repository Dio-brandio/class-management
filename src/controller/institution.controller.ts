import { MESSAGES, STATUSCODES } from "@constants";
import { Request, Response, NextFunction } from "express";
import * as institueservice from '../services/isntitue.service'
async function createInstiution(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { name } = req.body
        const newInstitiue = await institueservice.createInstitue({ name })

        res
            .status(STATUSCODES.SUCCESS_STATUS)
            .json({ status: true, data: newInstitiue, message: MESSAGES.SUCCESS_MESSAGE });
    } catch (error) {
        next(error);
    }
};

async function getInstitutions(
    req: Request,
    res: Response,
    next: NextFunction) {
    try {
        const isntitues = await institueservice.getInstitues()

        res
            .status(STATUSCODES.SUCCESS_STATUS)
            .json({ status: true, data: isntitues, message: MESSAGES.SUCCESS_MESSAGE });
    } catch (error) {
        next(error);
    }
}


export { createInstiution, getInstitutions }