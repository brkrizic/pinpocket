import connect from "@/lib/db";
import Bookmark from "@/models/Bookmark";
import { status } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";


export async function DELETE(request: NextRequest){
    try {
        await connect();

        const { searchParams } = new URL(request.url);
        const bookmarkId = searchParams.get('id');

        if(!bookmarkId){
            return NextResponse.json({ message: 'Bookmark ID is required'}, { status: status.clientError.badRequest})
        }

        const deleted = await Bookmark.findByIdAndDelete(bookmarkId);

        if (!deleted) {
            return NextResponse.json({ error: 'Bookmark not found' }, { status: status.clientError.notFound });
        }

        return NextResponse.json({ success: true, message: 'Bookmark deleted' }, { status: status.successful.ok });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: status.serverError.internalServerError });
    }
}