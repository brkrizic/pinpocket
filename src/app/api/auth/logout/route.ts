import { status, TOKEN_NAME } from "@/types/types";
import { NextResponse } from "next/server";
import { serialize } from "cookie";


export async function DELETE(){
    const res = NextResponse.json({ success: true, message: "Logged out" }, { status: status.successful.ok});
    res.headers.append(
        'Set-Cookie',
        serialize(TOKEN_NAME, '', {
        path: '/',
        maxAge: 0,
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        })
    );

    return res;
}