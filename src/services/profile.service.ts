import { MESSAGES } from "@constants";
import { Users } from "@models";
import { updateUser } from "@services";
import { NotFoundError } from "@utils";

export const getUserProfile = async (id: string) => {
  const user = await Users.findByPk(id);

  if (!user) {
    throw new NotFoundError(null, MESSAGES.USERNOTFOUND);
  }
  return {
    data: user,
  };
};

export const updateUserProfile = async (id: string, userData: any) => {
  return updateUser(id, userData);
};
