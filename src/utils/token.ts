import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { v4 as uuid } from "uuid";
import { redis } from "../lib/redisClient";

const secretKey = process.env.SESSION_SECRET!;
const encodedKey = new TextEncoder().encode(secretKey);

type SessionPayload = {
  userId: string;
  expiresAt: number; // store as number, not Date
};

export async function createSession(userId: string) {
    if (!userId) throw new Error("User ID is missing!");

    const refreshToken = uuid();
    await redis.set(`refreshToken:${refreshToken}`, userId, "EX", 7 * 24 * 60 * 60);

    const expiresAt = Date.now() + 15 * 60 * 1000; // 15 min for access token
    const session = await encrypt({ userId, expiresAt });

    const cookiesStore = await cookies();
    cookiesStore.set({
        name: "accessToken",
        value: session,
        httpOnly: true,
        secure: true,
        path: "/",
        expires: new Date(expiresAt),
    });

    cookiesStore.set({
        name: "refreshToken",
        value: refreshToken,
        httpOnly: true,
        secure: true,
        path: "/",
        expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 7 days
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
    const cookiesStore = await cookies();
    const refreshToken = cookiesStore.get("refreshToken")?.value;

    cookiesStore.delete("accessToken");
    cookiesStore.delete("refreshToken");

    if (refreshToken) {
        await redis.del(`refreshToken:${refreshToken}`);
    }
}

export async function getUserId() {
  const token = (await cookies()).get("accessToken")?.value;
  if (!token) {
    return { userId: null, error: "Unauthorized" };
  }

  const payload = await decrypt(token);
  if (!payload || payload.expiresAt < Date.now()) {
    return { userId: null, error: "Token expired" };
  }

  return { userId: payload.userId, error: null };
}