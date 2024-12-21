export const generateOtp = function (
  length: number = 4,
  alphaNumeric: boolean = false
) {
  if (alphaNumeric) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let otp = "";
    for (let i = 0; i < length; i++) {
      otp += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return otp;
  }
  const otp = Array.from({ length }, () => Math.floor(Math.random() * 10)).join(
    ""
  );
  return otp;
};
