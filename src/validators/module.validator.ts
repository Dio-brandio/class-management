import * as yup from "yup";

export const moduleIdValidator = yup.object({
  id: yup.string().required(),
});

export const addModuleValidator = yup.object({
  index: yup.number().required(),
  name: yup.string().required(),
  parentModuleId: yup.string().nullable(),
});

export const updateModuleValidator = yup.object({
  id: yup.string().required(),
  name: yup.string(),
  parentModuleId: yup.string(),
});
