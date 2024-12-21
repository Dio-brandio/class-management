import { MESSAGES, STATUSCODES } from "@constants";
import { Users } from "@models";
import {
  ConflictingRequestError,
  CustomError,
  getListQuery,
  InternalServerError,
} from "@utils";
import { Op } from "sequelize";
import { emailSender } from "@libs";
import { EmailAttributes } from "@interfaces";

export const getUser = async (queryParams: any) => {
  const searchFields = {
    name: "string",
    email: "string",
    phoneNumber: "string",
    lastSeen: "date",
    createdAt: "date",
    updatedAt: "date",
  };
  const filterFields = {
    name: {
      type: "string",
    },
    email: {
      type: "string",
    },
    phoneNumber: {
      type: "string",
    },
    lastSeen: {
      type: "date",
    },
    createdAt: {
      type: "date",
    },
    updatedAt: {
      type: "date",
    },
  };

  const {
    searchMapping,
    filterMapping,
    pageNum: offset,
    limit = 10,
    order,
  } = getListQuery(queryParams, searchFields, filterFields, {});

  const result = await Users.findAndCountAll({
    where: {
      ...(filterMapping ? { ...filterMapping } : {}),
      ...(searchMapping ? { ...searchMapping } : {}),
    },
    order,
    limit,
    offset,
  });

  const totalFilteredPage =
    result.rows.length > 0 && result.count
      ? Math.ceil(result.count / limit)
      : 0;

  const metaData = {
    currentPage: queryParams?.pageNum ?? 1,
    totalFilteredCount: result.count ? result.count : 0,
    totalFilteredPage,
  };

  return {
    data: { rows: result.rows, metaData },
  };
};

export const getUserById = async (id: string) => {
  const user = await Users.findByPk(id);

  return {
    data: user,
  };
};

export const createUser = async (userData: any) => {
  const duplicateUser = await getDuplicateUser(userData);
  if (duplicateUser) {
    throw new CustomError(
      STATUSCODES.ERROR_STATUS,
      false,
      MESSAGES.USER_ALREADY_EXISTS
    );
  }
  const newUser = new Users(userData);
  const savedUser = await newUser.save();
  if (!savedUser) {
    throw new InternalServerError();
  }
  if (userData?.email) {
    const emailAttributes: EmailAttributes = {
      to: [userData?.email ?? ""],
      from: process.env.EMAIL || "harshitg274@gmail.com",
      text: `Welcome to the app`,
      subject: "Welcome to the app",
    };
    emailSender(emailAttributes);
  }

  //todo Need to make the functionality for phoneNumber
  return {
    data: savedUser,
  };
};

export const updateUser = async (id: string, userData: any) => {
  const duplicateUser = await getDuplicateUser(userData);

  if (duplicateUser) {
    throw new ConflictingRequestError(
      null,
      MESSAGES.MODULE_ALREADY_EXISTS("User")
    );
  }

  const updatedUserData = await Users.update(
    {
      ...(userData?.email ? { email: userData?.email } : {}),
      ...(userData?.phoneNumber ? { phoneNumber: userData?.phoneNumber } : {}),
      ...(userData?.name ? { name: userData?.name } : {}),
    },
    { where: { id } }
  );

  return {
    data: updatedUserData,
  };
};

export const deleteUser = async (id: string) => {
  return {
    status: true,
    statusCode: 200,
    data: null,
    message: `User with ID: ${id} deleted successfully`,
  };
};

export const getDuplicateUser = async (userData: any) => {
  if (userData?.email || userData?.phoneNumber) {
    const duplicateUser = await Users.findOne({
      where: {
        ...(userData?.email ? { email: { [Op.iLike]: userData.email } } : {}),
        ...(userData?.phoneNumber
          ? { phoneNumber: { [Op.eq]: userData.phoneNumber } }
          : {}),
        isDeleted: false,
      },
    });
    return duplicateUser;
  }
};
