import User from "@/models/User";
import { status } from "@/types/types";
import bcrypt from "bcryptjs";
import connect from '@/lib/db';
import { NextRequest, NextResponse } from "next/server";
import { createCookie, generateToken } from "@/utils/tokenHelper";

export async function POST(request: NextRequest){
    try {
        await connect();

        const { email, password } = await request.json();

        const user = await User.findOne({ email });

        if(!user){
            return NextResponse.json({message: "Invalid credentials"}, {status: status.clientError.notFound})
        }

        const isMatchPassword = await bcrypt.compare(password, user.passwordHash);

        if(!isMatchPassword){
            return NextResponse.json({ message: "Incorrect password"}, {status: status.clientError.notFound})
        }


        const token = generateToken(user.id);
        const res = NextResponse.json({ success: true, message: "Logged in", user}, {status: status.successful.ok});
        res.headers.append('Set-Cookie', createCookie(token))

        return res;

    } catch (error: any) {
        return NextResponse.json({ error: error.message}, { status: status.serverError.internalServerError})
    }
};