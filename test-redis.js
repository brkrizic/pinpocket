const Redis = require("ioredis");

const redis = new Redis({
  host: "192.168.1.254",
  port: 6379,
  // password: "YourStrongPassword", // if needed
});

async function test() {
  try {
    const pong = await redis.ping();
    console.log("✅ Redis connected successfully:", pong);
  } catch (err) {
    console.error("❌ Redis connection failed:", err);
  } finally {
    redis.disconnect();
  }
}

test();
