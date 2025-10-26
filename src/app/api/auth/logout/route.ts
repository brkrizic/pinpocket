import { cookies } from "next/headers";
import { redis } from "@/lib/redisClient";
import { NextResponse } from "next/server";
import { status } from "@/types/types";


export async function DELETE(){
    const cookiesStore = await cookies();

    // Get the refresh token from cookie
    const refreshToken = cookiesStore.get("refreshToken")?.value;
    if (refreshToken) {
        // Delete it from Redis
        await redis.del(`refreshToken:${refreshToken}`);
    }

    // Clear cookies
    cookiesStore.delete("accessToken");
    cookiesStore.delete("refreshToken");

    // Return success response
    return NextResponse.json({ message: "Logged out successfully" }, { status: status.successful.accepted });
}