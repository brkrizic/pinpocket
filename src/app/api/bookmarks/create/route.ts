import { Bookmark, status, TOKEN_NAME } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";
import BookmarkModel from "@/models/Bookmark";
import connect from "@/lib/db";
import { getTokenFromHeader, getUserId } from "@/utils/tokenHelper";

export async function POST(request: NextRequest) {
  try {
    await connect();

    const bookmark: Bookmark = await request.json();
    const userId = await getUserId(request);

    if(!userId){
        return NextResponse.json(
          { message: "Unauthorized: Invalid token" },
          { status: status.clientError.unauthorized }
        );
    }


    if (!bookmark || !bookmark.title || !bookmark.url) {
      return NextResponse.json(
        { message: "Bookmark data incomplete." },
        { status: status.clientError.badRequest }
      );
    }

    const savedBookmark = await BookmarkModel.create({
      ...bookmark,
      userId,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: "Bookmark created.", data: savedBookmark },
      { status: status.successful.created }
    );

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: status.serverError.internalServerError }
    );
  }
}
