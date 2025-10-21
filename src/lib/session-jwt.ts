import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redis } from "./redis";
import { v4 as uuid2 } from "uuid";

const secretKey = process.env.SESSION_SECRET!;
const encodedKey = new TextEncoder().encode(secretKey);

type SessionPayload = {
  userId: string;
  expiresAt: number; // store as number, not Date
};

export async function createSession(userId: string) {
  if(!userId) throw new Error("User ID is missing!");

  const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days
  const session = await encrypt({ userId, expiresAt });

  (await cookies()).set({
    name: "session",
    value: session,
    httpOnly: true,
    secure: true,
    path: "/",
    expires: new Date(expiresAt),
  });
}

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = ""): Promise<SessionPayload | null> {
  if (!session) return null;

  try {
    const { payload } = await jwtVerify(session, encodedKey, { algorithms: ["HS256"] });
    // Make sure TypeScript sees userId as string
    return { userId: payload.userId as string, expiresAt: payload.expiresAt as number };
  } catch (err) {
    console.log("Failed to verify session:", err);
    return null;
  }
}

export async function deleteSession() {
  (await cookies()).delete("session");
}
