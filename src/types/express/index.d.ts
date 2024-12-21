import { User } from "@interfaces";

export {};

declare module "express-serve-static-core" {
  interface Request {
    jwtTokenData?: User;
  }
}
