import { MESSAGES } from "@constants";
import { jwtTokenVerifier } from "@libs";
import { Users } from "@models";
import { UnauthorizedError } from "@utils";
import { Request, Response, NextFunction } from "express";

export async function jwtmiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    let jwtToken = req.headers.authorization;

    if (!jwtToken?.includes("Bearer")) {
      throw new UnauthorizedError(null, MESSAGES.NO_TOKEN_PROVIDED);
    }

    const tokenArray = jwtToken.split(" ");
    jwtToken = tokenArray[1];

    const decoded = await jwtTokenVerifier(jwtToken);
    const isLastJwtTokenExists = await Users.findOne({
      where: { lastJwtToken: jwtToken },
    });
    if (!isLastJwtTokenExists) {
      throw new UnauthorizedError(null, MESSAGES.TOKENERROR);
    }

    if (decoded?.payload?.user) {
      req.jwtTokenData = decoded?.payload?.user ?? {};
    } else {
      throw new UnauthorizedError(null, MESSAGES.TOKENERROR);
    }
    next();
  } catch (error) {
    next(error);
  }
}
