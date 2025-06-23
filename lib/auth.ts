import jwt, { Secret, SignOptions } from "jsonwebtoken";

const JWT_SECRET: Secret =
  process.env.JWT_SECRET ||
  (() => {
    throw new Error("JWT_SECRET not set");
  })();

export function signToken(
  payload: string | Buffer | object,
  expiresIn: SignOptions["expiresIn"] = "7d"
): string {
  const options: SignOptions = { expiresIn };
  return jwt.sign(payload, JWT_SECRET, options);
}

export function verifyToken<T = any>(token: string): T {
  return jwt.verify(token, JWT_SECRET) as T;
}
