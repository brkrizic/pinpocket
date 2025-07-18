import connect from "@/lib/db";
import Bookmark from "@/models/Bookmark";
import { status } from "@/types/types";
import { getUserId } from "@/utils/tokenHelper";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){
    try {
        await connect();

        const userId = await getUserId(request);
        const bookmarks = await Bookmark.find({ userId: userId});

        if(!bookmarks){
            return NextResponse.json({message: "Bookmarks not found"}, {status: status.clientError.notFound});
        }

        return NextResponse.json({ success: true, data: bookmarks}, { status: status.successful.ok})

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: status.serverError.internalServerError})
    }
}