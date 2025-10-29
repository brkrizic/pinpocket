import connect from "@/lib/db";
import Bookmark from "@/models/Task";
import { status } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest){
    try {
        await connect();
        
        const { searchParams } = new URL(request.url);
        const bookmarkId = searchParams.get('id');

        if(!bookmarkId){
            return NextResponse.json({message: "Bookmark ID is missing"}, {status: status.clientError.notFound});
        }

        const foundBookmark = await Bookmark.findById(bookmarkId);

        if(!foundBookmark){
            return NextResponse.json({message: "Bookmark not found"}, {status: status.clientError.notFound})
        }

        return NextResponse.json({ success: true, data: foundBookmark});

    } catch (err: unknown) {
    let message = "Unknown error";

    if (err instanceof Error) {
      message = err.message;
    }

    return NextResponse.json(
      { error: message },
      { status: status.serverError.internalServerError }
    );
  }

}