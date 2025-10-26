import { Bookmark, status, TOKEN_NAME } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";
import BookmarkModel from "@/models/Task";
import connect from "@/lib/db";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session-jwt";

export async function POST(request: NextRequest) {
  try {
    await connect();

    const sessionToken = (await cookies()).get("session")?.value;
    const session = await decrypt(sessionToken);

    if (!session) {
      return new Response(JSON.stringify({ message: "Unauthorized", session }), { status: status.clientError.unauthorized });
    }

    const bookmark: Bookmark = await request.json();


    if (!bookmark || !bookmark.title || !bookmark.url) {
      return NextResponse.json(
        { message: "Bookmark data incomplete." },
        { status: status.clientError.badRequest }
      );
    }

    const userId = session.userId;

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
