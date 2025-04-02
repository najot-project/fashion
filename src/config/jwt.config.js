import { config } from "dotenv";

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
