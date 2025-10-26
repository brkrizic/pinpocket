import { redis } from "./redisClient";
import { cookies } from "next/headers";
import { v4 as uuid } from "uuid";

export async function createRedisSession(userId: string) {
  const sessionId = uuid();
  await redis.set(`session:${sessionId}`, userId, "EX", 7 * 24 * 60 * 60);

  (await cookies()).set({
    name: "sessionId",
    value: sessionId,
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });

  return sessionId;
}

export async function getRedisSessionUser(sessionId?: string) {
  if (!sessionId) return null;
  return await redis.get(`session:${sessionId}`);
}

export async function checkSessionId(){
    //get sessionId from cookie
    const sessionId = (await cookies()).get("sessionId")?.value;

    console.log("sessionId: ", sessionId);
  
    //get userId from redis
    const userId = sessionId ? await redis.get(`session:${sessionId}`) : null;

    return userId;
}

export async function deleteRedisSession() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionId")?.value;

  if (sessionId) {
    // Delete session from Redis
    await redis.del(`session:${sessionId}`);
  }

  // Delete cookie
  cookieStore.delete("sessionId");
}