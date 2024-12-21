import { EncryptJWT, jwtDecrypt } from "jose";
import { User, Tokens } from "@interfaces";
import { InternalServerError, UnauthorizedError } from "@utils";
import { MESSAGES } from "@constants";
const encHeader = { alg: "dir", enc: "A256GCM" };

export const createTokens = async (user: User): Promise<Tokens> => {
  const code: string = process.env.JWT_SECRET ?? "";
  const expiryTime: string = process.env.JWT_ACCESSTOKENTIME ?? "1d";
  const refreshTime: string = process.env.JWT_REFRESHTOKENTIME ?? "1y";
  const secret = new TextEncoder().encode(code);

  const token = new EncryptJWT({ user })
    .setProtectedHeader(encHeader)
    .setIssuedAt()
    .setIssuer(user.id);

  const accessToken: string = await token
    .setExpirationTime(expiryTime)
    .encrypt(secret);
  const refreshToken: string = await token
    .setExpirationTime(refreshTime)
    .encrypt(secret);

  return { accessToken, refreshToken };
};

export const jwtTokenVerifier = async (token: string): Promise<any> => {
  try {
    const code: string = process.env.JWT_SECRET ?? "";
    const secret = new TextEncoder().encode(code);
    const { payload } = await jwtDecrypt(token, secret, {
      contentEncryptionAlgorithms: ["A256GCM"],
      keyManagementAlgorithms: ["dir"],
    });
    return {
      payload,
      success: true,
    };
  } catch (error) {
    if (error?.name?.includes("JWTExpired")) {
      throw new UnauthorizedError(null, MESSAGES.TOKEN_EXPIRED);
    }
    throw new InternalServerError();
  }
};

export const decodeToken = async (token: any) => {
  let jwtToken = token;
  // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
  if (!jwtToken?.includes("Bearer")) {
    return {
      status: 401,
      message: "No token provided.",
    };
  }

  try {
    const tokenArray = jwtToken.split(" ");
    jwtToken = tokenArray[1];
    const decoded = await jwtTokenVerifier(jwtToken);
    if (decoded?.payload?.user) {
      return decoded?.payload?.user;
    } else {
      return decoded;
    }
  } catch (error) {
    throw new UnauthorizedError();
  }
};

export const emailJWTToken = async (user: User) => {
  const code: string = process.env.JWT_SECRET ?? "";
  const expiryTime: string = process.env.JWT_RESETPASSWORDLINKEXP ?? "10m";
  const secret = new TextEncoder().encode(code);

  const token = await new EncryptJWT({ user })
    .setProtectedHeader(encHeader)
    .setIssuedAt()
    .setIssuer(user.id)
    .setExpirationTime(expiryTime)
    .encrypt(secret);

  return token;
};
