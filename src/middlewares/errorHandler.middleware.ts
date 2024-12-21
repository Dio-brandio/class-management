import { MESSAGES, STATUSCODES } from "@constants";
import { Request, Response, NextFunction } from "express";

function globalErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const {
    statusCode = STATUSCODES.INTERNAL_SERVER,
    status = false,
    message = MESSAGES.SERVER_ERROR_MESSAGE,
    data = null,
  } = err;
  // console.error("Error:", err); // Log the error for debugging
  res.status(statusCode).json({ status, data, message }); // Send the error response
}

export { globalErrorHandler };
