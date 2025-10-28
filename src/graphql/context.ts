import connect from '@/lib/db'; // your mongoose connection
import { redis } from '@/lib/redisClient';
import { getUserId } from '@/utils/token';

export async function createContext() {
  await connect();

  const { userId, error } = await getUserId();

  return {
    db: {},           // optional extra services
    redis: redis,
    userId: userId || null,
    error: userId ? null : error || "User not authenticated",
  };
}
