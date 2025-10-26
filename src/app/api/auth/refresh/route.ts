import { redis } from "@/lib/redisClient";
import { encrypt } from "@/lib/token";
import { status } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { v4 as uuid } from "uuid";

export async function POST() {
    const cookiesStore = await cookies();
    const refreshToken = cookiesStore.get("refreshToken")?.value;
    if (!refreshToken) return NextResponse.json({ message: "No refresh token" }, { status: status.clientError.unauthorized })

    const userId = await redis.get(`refreshToken:${refreshToken}`);
    if (!userId) return NextResponse.json({ message: "Invalid refresh token" }, { status: status.clientError.unauthorized })

    // Rotate refresh token
    const newRefreshToken = uuid();
    await redis.del(`refreshToken:${refreshToken}`);
    await redis.set(`refreshToken:${newRefreshToken}`, userId, "EX", 7 * 24 * 60 * 60);

    const accessToken = await encrypt({ userId, expiresAt: Date.now() + 15 * 60 * 1000 });

    cookiesStore.set({
      name: "accessToken",
      value: accessToken,
      httpOnly: true,
      secure: true,
      path: "/",
      expires: new Date(Date.now() + 15 * 60 * 1000),
    });

    cookiesStore.set({
      name: "refreshToken",
      value: newRefreshToken,
      httpOnly: true,
      secure: true,
      path: "/",
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return NextResponse.json({ accessToken }, { status: status.successful.created });
}
