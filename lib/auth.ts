import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error("JWT_SECRET not set");

export function signToken(payload: string | Buffer | object, expiresIn = "7d") {
  // JWT_SECRET! is safe here because of the runtime check above
  return jwt.sign(payload, JWT_SECRET!, { expiresIn });
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET!);
}
