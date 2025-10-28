import connect from "@/lib/db";
import User from "@/models/User";
import { status } from "@/types/types";
import { getUserId } from "@/utils/token";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest){
    try {
        await connect();
        const { userId, error } = await getUserId();

        if(!userId){
            return NextResponse.json({ message: error }, { status: status.clientError.unauthorized });
        }

        const user = await User.findById(userId).select('id username email');

        return NextResponse.json({ user });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: status.serverError.internalServerError });
    }
}