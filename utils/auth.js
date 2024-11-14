// utils/auth.js (or auth.ts for TypeScript)

import jwt from "jsonwebtoken";
const jwtSecret = process.env.JWT_SECRET;

export default function verifyToken(token) {
  if (!token) {
    return null; // Token is missing
  }
  const decoded = jwt.verify(token, jwtSecret); // Verifies and decodes the token
  return decoded; // Return the decoded token if validss
}
