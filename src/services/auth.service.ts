import { STATUSCODES, MESSAGES, ROLE } from "@constants";
import { IloginDataDto } from "@dtos";
import {
  Tokens,
  Payload as PayloadType,
  EmailAttributes,
  User,
} from "@interfaces";
import {
  createTokens,
  emailJWTToken,
  jwtTokenVerifier,
  decodeToken,
  comparePassword,
  emailSender,
  hashPassword,
} from "@libs";
import { Roles, SecurityTokens, UserRoles, Users } from "@models";
import {
  BadRequestError,
  CustomError,
  ForbiddenError,
  generateOtp,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
} from "@utils";
import { literal } from "sequelize";

export const login = async (loginData: IloginDataDto) => {
  const user = await Users.findOne({
    where: {
      ...(loginData?.email ? { email: loginData.email } : {}),
      ...(loginData?.phoneNumber ? { phoneNumber: loginData.phoneNumber } : {}),
      isDeleted: false,
    },
  });
  if (!user) {
    throw new CustomError(
      STATUSCODES.ERROR_STATUS,
      false,
      MESSAGES.INVALID_CREDENTIALS
    );
  }
  const userPassword = user.password;
  if (!userPassword) {
    throw new CustomError(
      STATUSCODES.ERROR_STATUS,
      false,
      MESSAGES.NULL_PASSWORD
    );
  }

  const ispasswordMatch = await comparePassword(
    loginData.password,
    userPassword
  );

  if (!ispasswordMatch) {
    throw new CustomError(
      STATUSCODES.ERROR_STATUS,
      false,
      MESSAGES.INVALID_CREDENTIALS
    );
  }

  const userData = {
    userId: user?.id ?? "",
    email: user?.email ?? "",
    phoneNumber: user?.phoneNumber ?? "",
    name: user?.name ?? "",
  };

  const otp = generateOtp(4, false); //todo as per your wish first args for length and second for if you want to use alphabet or not
  const securitytokenData = {
    ...userData,
    otp,
    verified: false,
  };
  const securityToken = new SecurityTokens(securitytokenData);
  const savedSecurityToken = await securityToken.save();

  if (!savedSecurityToken) throw new InternalServerError();

  const emailAttributes: EmailAttributes = {
    to: [user?.email ?? ""],
    from: process.env.EMAIL || "harshitg274@gmail.com",
    text: `${otp}`,
    subject: "Otp",
  };
  emailSender(emailAttributes);

  return {
    data: { userData },
  };
};

export const forgotPassword = async (email: string) => {
  const user = await Users.findOne({
    where: { email, isDeleted: false },
  });
  if (!user) {
    throw new CustomError(
      STATUSCODES.ERROR_STATUS,
      false,
      MESSAGES.INVALID_EMAIL
    );
  }

  const emailTokenData = {
    id: user?.id ?? "",
    email,
  };

  const resetPasswordToken = await emailJWTToken(emailTokenData);

  const otp = generateOtp(4, false);
  const securityToken = new SecurityTokens({
    jwtToken: resetPasswordToken,
    userId: user.id,
    verified: false,
    email,
    otp,
  });
  const savedSecurityToken = await securityToken.save();
  const securityTokenId = savedSecurityToken.id;
  const resetPasswordLink = `${process.env.URLS_HOST}${process.env.PORT}${process.env.URLS_LINKVERIFICATION}/${securityTokenId}`;

  // forgetPasswordContent(
  //   user,
  //   resetPasswordLink,
  //   securityToken.expiresAt,
  //   ""
  // )

  // Set content accordingly
  emailSender({
    to: [user?.email ?? ""],
    from: process.env.EMAIL ?? "harshitg274@gmail.com",
    text: `${resetPasswordLink}`,
    subject: "Reset Password",
  });

  return {
    data: resetPasswordLink,
  };
};

export const verifyJWTToken = async (token: string) => {
  if (!token) {
    throw new CustomError(STATUSCODES.ERROR_STATUS, false, MESSAGES.TOKENERROR);
  }
  const tokenData = await SecurityTokens.findOne({
    where: { id: token, verified: false },
  });

  if (!tokenData) {
    throw new CustomError(
      STATUSCODES.ERROR_STATUS,
      false,
      MESSAGES.TOKEN_NOT_FOUND
    );
  }

  const decodedToken = await jwtTokenVerifier(tokenData.jwtToken ?? "");
  if (!decodedToken.success) {
    return decodedToken;
  }
  const decodedUser = decodedToken.payload.user as PayloadType;
  const user = await Users.findOne({ where: { id: decodedUser.id } });
  if (!user) {
    throw new CustomError(
      STATUSCODES.ERROR_STATUS,
      false,
      MESSAGES.USERNOTFOUND
    );
  }

  if (tokenData?.id === token) {
    if (tokenData?.verified) {
      return {
        data: null,
      };
    }

    if (tokenData?.expiresAt < new Date()) {
      throw new CustomError(
        STATUSCODES.ERROR_STATUS,
        false,
        MESSAGES.CODE_EXPIRED
      );
    }

    tokenData.verified = true;
    await tokenData.save();

    return { success: true, user, tokenData };
  }
  throw new CustomError(STATUSCODES.ERROR_STATUS, false, MESSAGES.USERNOTFOUND);
};

export const changePassword = async (
  id: string,
  password: string,
  jwtTokenData: any
) => {
  const { roleId } = jwtTokenData;
  if (!roleId) {
    throw new BadRequestError();
  }
  const role = await Roles.findByPk(id);

  if (!role) {
    throw new ForbiddenError(null, MESSAGES.ROLE_NOT_RECOGNIZED);
  }

  const isAdmin = role.name === ROLE.ADMIN;

  const user = await Users.findOne({ where: { id, isDeleted: false } });
  if (!user) {
    throw new CustomError(
      STATUSCODES.ERROR_STATUS,
      false,
      MESSAGES.USERNOTFOUND
    );
  }

  if (isAdmin) {
    const hash = await hashPassword(password);
    user.password = hash;
    await user.save();

    return {
      data: {
        id: user.id,
        email: user.email,
      },
    };
  }

  const compareNewPassword = await comparePassword(password, user.password);
  if (compareNewPassword) {
    throw new CustomError(
      STATUSCODES.ERROR_STATUS,
      false,
      MESSAGES.NEWPASSWORDSAMEASOLD
    );
  }

  const hash = await hashPassword(password);
  user.password = hash;
  await user.save();
  return {
    data: {
      id: user.id,
      email: user.email,
    },
  };
};

export const refreshToken = async (token: any) => {
  const decodedTokenData = await decodeToken(token);
  if (decodedTokenData.status !== 401) {
    const tokens = await createTokens(decodedTokenData);
    return {
      data: tokens,
    };
  } else {
    return decodedTokenData;
  }
};

export const verifyOTP = async (otpDetails: any) => {
  const user = await Users.findOne({
    where: {
      ...(otpDetails?.email ? { email: otpDetails.email } : {}),
      ...(otpDetails?.phoneNumber
        ? { phoneNumber: otpDetails.phoneNumber }
        : {}),
      isDeleted: false,
    },
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: UserRoles,
        as: "userRoles",
        include: [
          {
            model: Roles,
            as: "role",
            attributes: ["name"],
          },
        ],
      },
    ],
  });
  if (!user) {
    throw new CustomError(
      STATUSCODES.ERROR_STATUS,
      false,
      MESSAGES.INVALID_CREDENTIALS
    );
  }

  if (!otpDetails?.otp && (!otpDetails?.email || !otpDetails?.phoneNumber)) {
    throw new BadRequestError();
  }
  const otpFilter = {
    otp: otpDetails.otp,
    ...(otpDetails?.phoneNumber
      ? { phoneNumber: otpDetails?.phoneNumber }
      : {}),
    ...(otpDetails?.email ? { email: otpDetails?.email } : {}),
  };
  const otpVerification = await SecurityTokens.findOne({ where: otpFilter });

  if (!otpVerification || otpVerification.expiresAt < new Date()) {
    throw new CustomError(
      STATUSCODES.ERROR_STATUS,
      false,
      !otpVerification ? MESSAGES.OTP_NOT_VALID : MESSAGES.CODE_EXPIRED
    );
  }

  await SecurityTokens.destroy({ where: otpFilter });

  const tokenData = {
    userId: user?.id ?? "",
    email: user?.email ?? "",
    phoneNumber: user?.phoneNumber ?? "",
    name: user?.name ?? "",
  };

  const tokens: Tokens = await createTokens({ ...tokenData, id: user.id });
  user.update({ lastJwtToken: tokens.accessToken });

  return {
    data: { success: true, authToken: tokens, userData: tokenData },
  };
};
export const logout = async (id: string) => {
  if (!id) {
    throw new UnauthorizedError(null, MESSAGES.TOKENERROR);
  }
  const alreadyLoggedOutUser = await Users.findOne({
    where: { id, lastJwtToken: "" },
  });
  if (alreadyLoggedOutUser) {
    return {
      data: null,
    };
  }
  const lastSeen = new Date();
  const user = await Users.update(
    { lastSeen, lastJwtToken: "" },
    { where: { id } }
  );
  if (!user) {
    throw new InternalServerError();
  }
  return {
    data: null,
  };
};

export const regenerateOtp = async (userData: any) => {
  const { id, email, phoneNumber } = userData;

  const otpFilter = {
    ...(phoneNumber ? { phoneNumber } : {}),
    ...(email ? { email } : {}),
  };

  await SecurityTokens.destroy({
    where: { ...otpFilter, ...(id ? { userId: id } : {}) },
  });

  const otp = generateOtp();

  const user = await Users.findOne({
    where: { ...otpFilter, ...(id ? { id } : {}) },
  });

  if (!user) throw new NotFoundError(null, MESSAGES.USERNOTFOUND);

  const newSecurityToken = new SecurityTokens({
    userId: user.id,
    verified: false,
    email,
    otp,
  });

  const savedNewSecurityToken = await newSecurityToken.save();
  if (!savedNewSecurityToken) throw new InternalServerError();

  const emailAttributes: EmailAttributes = {
    to: [user?.email ?? ""],
    text: `${otp}`,
    subject: "Otp",
  };
  emailSender(emailAttributes);

  return { data: true };
};

export const getAssignedUserRoles = async (jwtTokenData: any) => {
  const { userId } = jwtTokenData;
  if (!userId) {
    throw new UnauthorizedError(null, MESSAGES.TOKENERROR);
  }

  const userRoles = await UserRoles.findAll({
    where: {
      userId,
    },
    include: [
      {
        model: Roles,
        as: "role",
        attributes: [],
      },
    ],
    order: [["createdAt", "DESC"]],
    attributes: ["roleId", [literal('"role"."name"'), "name"]],
    raw: true,
  });

  if (!userRoles.length) {
    throw new NotFoundError();
  }

  return {
    data: { userRoles },
  };
};

export const assignUserRole = async (roleId: string, jwtTokenData: User) => {
  const { id, email = "", phoneNumber = "", name = "" } = jwtTokenData;
  const user = await Users.findOne({
    where: {
      id,
      isDeleted: false,
    },
    order: [["createdAt", "DESC"]],
    include: [
      {
        where: { roleId },
        model: UserRoles,
        as: "userRoles",
        include: [
          {
            model: Roles,
            as: "role",
            attributes: ["name"],
          },
        ],
      },
    ],
  });
  if (!user) {
    throw new CustomError(
      STATUSCODES.ERROR_STATUS,
      false,
      MESSAGES.INVALID_CREDENTIALS
    );
  }
  const roles = user.userRoles?.map((userRole) => userRole.role?.name) || [];
  const userInformation = {
    id: id ?? "",
    email,
    phoneNumber,
    name,
    userId: id ?? "",
  };
  const tokenInformation = {
    ...userInformation,
    roleId,
    isSuperAdmin: roles.includes(ROLE.SUPER_ADMIN),
    isAdmin: roles.includes(ROLE.ADMIN),
    isUser: roles.includes(ROLE.USER),
    isCustomRole: roles.includes(ROLE.CUSTOM_ROLE),
  };
  const updatedToken = await createTokens(tokenInformation);
  user.update({ lastJwtToken: updatedToken.accessToken });

  return {
    data: {
      success: true,
      authToken: updatedToken,
      userData: userInformation,
    },
  };
};
