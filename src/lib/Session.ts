import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { parseDuration } from "./DateTimeHelper";

const secretKey = process.env.SECRET_KEY;
const encodedKey = new TextEncoder().encode(secretKey);

type SessionPayload = {
  userId: string;
  role: string;
  expiresAt: Date;
};
export async function createSession(userId: string, role: string) {
  const expiresIn = process.env.EXPIRES_IN; // Should be "1d"
  const expiresAt = new Date(Date.now() + parseDuration(expiresIn));
  const session = await encrypt({ userId, role: role, expiresAt });
  cookies().set("session", session, {
    httpOnly: true,
    expires: expiresAt,
    secure: true,
  });
}
export async function encrypt(payload: SessionPayload): Promise<string> {
  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(process.env.EXPIRES_IN)
    .sign(encodedKey);

  return jwt;
}

export async function decrypt(token: string): Promise<SessionPayload> {
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as SessionPayload;
  } catch (e) {
    throw new Error("Invalid token");
  }
}
