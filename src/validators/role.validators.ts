import * as yup from "yup";

export const roleIdValidator = yup.object({
  id: yup.string().required(),
});

export const addRoleValidator = yup.object({
  name: yup.string().required(),
});

export const updateRoleValidator = yup.object({
  id: yup.string().required(),
  name: yup.string().required(),
});
