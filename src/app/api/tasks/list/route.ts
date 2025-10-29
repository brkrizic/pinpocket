import connect from "@/lib/db";
import { getUserId } from "@/utils/token";
import Bookmark from "@/models/Task";
import { status } from "@/types/types";
import { NextResponse } from "next/server";
import { Error } from "mongoose";

export async function GET(){
    try {
        await connect();

        const { userId, error } = await getUserId();

        if (error || !userId) {
            return NextResponse.json({ message: error }, { status: status.clientError.unauthorized });
        }

        const bookmarks = await Bookmark.find({ userId: userId });

        if(!bookmarks){
            return NextResponse.json({message: "Bookmarks not found"}, {status: status.clientError.notFound});
        }

        return NextResponse.json({ success: true, data: bookmarks}, { status: status.successful.ok})

    } catch (err: unknown) {
        let message = "Unknown error";

        if (err instanceof Error) {
        message = err.message;
        }
        return NextResponse.json({error: message}, {status: status.serverError.internalServerError})
    }
}