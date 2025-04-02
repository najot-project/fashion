import { config } from "dotenv";

<<<<<<< HEAD
config();

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET_KEY;
export const ACCESS_TOKEN_EXPIRE_TIME = process.env.ACCESS_TOKEN_EXPIRE_TIME;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET_KEY;
export const REFRESH_TOKEN_EXPIRE_TIME = process.env.REFRESH_TOKEN_EXPIRE_TIME;
=======
// Load environment variables from .env file
config();

// Export constants for token secret and expiration
export const TOKEN_SECRET = process.env.TOKEN_SECRET;
export const TOKEN_EXPIRE_TIME = process.env.TOKEN_EXPIRE_TIME;

// Function to generate a JWT token
export const generateToken = (userId, phoneNumber) => {
  return jwt.sign(
    { userId, phoneNumber },
    TOKEN_SECRET,  // Using the TOKEN_SECRET from the environment variables
    { expiresIn: TOKEN_EXPIRE_TIME }  // Expiration time from the environment variables
  );
};
>>>>>>> 855b2020abc59a1dfc9d6bb5e004979f82f341aa
