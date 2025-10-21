import { status, TOKEN_NAME } from "@/types/types";
import { NextResponse } from "next/server";
import { serialize } from "cookie";
import { deleteSession } from "@/lib/session-jwt";
import { checkSessionId, deleteRedisSession } from "@/lib/session-redis";


export async function DELETE(){
    const userId = await checkSessionId();

    if (!userId) {
        return NextResponse.json(
        { success: false, message: "User already logged out" },
        { status: status.successful.ok }
        );
    }

    const res = NextResponse.json({ success: true, message: "Logged out" }, { status: status.successful.ok});
    await deleteSession();
    await deleteRedisSession();
    
    return res;
}