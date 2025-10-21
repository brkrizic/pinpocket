import Redis from "ioredis";

let redis: Redis;

if (!redis) {
  redis = new Redis(process.env.REDIS_URL || "redis://192.168.1.254:6379");
}

export { redis };
    