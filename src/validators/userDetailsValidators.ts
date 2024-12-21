import * as Yup from "yup";

export const userDetailsValidator = Yup.object({
  email: Yup.string().email("Invalid email format").nullable(),
  phoneNumber: Yup.string().nullable(),
  name: Yup.string().required(),
}).test(
  "email-or-phone",
  "Either email or phone number is required, but not both",
  function (value: any) {
    const { email, phoneNumber } = value;
    if ((!email && !phoneNumber) || (email && phoneNumber)) {
      return false;
    }
    return true;
  }
);

export const validateUserSchema = Yup.object({
  id: Yup.string().uuid("ID must be a valid UUID").required(),
  name: Yup.string().required("Name is required").optional(),
  email: Yup.string().email("Must be a valid email format").optional(),
  phoneNumber: Yup.string().optional(),
});

export const userIdValidator = Yup.object({
  id: Yup.string().uuid("ID must be a valid UUID").required(),
});
