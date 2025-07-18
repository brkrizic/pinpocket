import connect from "@/lib/db";
import Bookmark from "@/models/Bookmark";
import { Bookmark as BookmarkType, status } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";


export async function PUT(request: NextRequest){
    try {
        await connect();

        const { searchParams } = new URL(request.url);
        const bookmarkId = searchParams.get('id');

        const bookmark: BookmarkType = await request.json();

        const foundBookmark = await Bookmark.findById(bookmarkId);

        if(!bookmarkId){
            return NextResponse.json({message: "Bookmark ID is missing"}, {status: status.clientError.badRequest})
        }
        if(!foundBookmark){
            return NextResponse.json({message: "Bookmark not found"}, {status: status.clientError.notFound})
        }

        const updatedBookmark = await Bookmark.findByIdAndUpdate(bookmarkId, bookmark, { new: true });

        return NextResponse.json({ success: true, data: updatedBookmark }, {status: status.successful.created})

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: status.serverError.internalServerError});
    }
}