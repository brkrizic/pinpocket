import { status, TOKEN_NAME } from "@/types/types";
import { NextResponse } from "next/server";
import { serialize } from "cookie";
import { deleteSession } from "@/lib/session";


export async function DELETE(){
    const res = NextResponse.json({ success: true, message: "Logged out" }, { status: status.successful.ok});
    await deleteSession();
    return res;
}