// Import the 'bcrypt' library for password hashing and comparison.
import bcrypt from "bcrypt";

// The number of salt rounds for password hashing.
// If 'process.env.SALT_WORK_FACTOR' is defined in the environment, use its value; otherwise, use a default of 10.
const SALT_WORK_FACTOR = process.env.SALT_WORK_FACTOR
  ? parseInt(process.env.SALT_WORK_FACTOR, 10)
  : 10;

// Function to hash a password using bcrypt.
export const hashPassword = async (password: string): Promise<string> => {
  return await new Promise((resolve, reject) => {
    // Generate a salt with the specified number of rounds.
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
      if (err) reject(err);

      // Hash the password using the generated salt.
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) reject(err);

        // Resolve with the hashed password.
        resolve(hash);
      });
    });
  });
};

// Function to compare a user-provided password with a stored hash.
export const comparePassword = async (
  userpassword: string,
  hash: string
): Promise<boolean> => {
  return await new Promise((resolve, reject) => {
    // Compare the user-provided password with the stored hash.
    bcrypt.compare(userpassword, hash, (err, isMatch) => {
      if (err) reject(err);

      // Resolve with a boolean indicating whether the passwords match.
      resolve(isMatch);
    });
  });
};
