import connect from "@/lib/db";
import User from "@/models/User";
import { status } from "@/types/types";
import { getTokenFromHeader, verifyToken } from "@/utils/tokenHelper";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  try {
    await connect();

    const token = getTokenFromHeader(request);
    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized: Token missing" },
        { status: status.clientError.unauthorized }
      );
    }

    const decoded = await verifyToken(token).catch(() => null);
    if (!decoded || !("userId" in decoded)) {
      return NextResponse.json(
        { message: "Unauthorized: Invalid token" },
        { status: status.clientError.unauthorized }
      );
    }

    const userId = (decoded as { userId: string }).userId;

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: status.clientError.notFound }
      );
    }

    return NextResponse.json(
      { success: true, message: "User deleted" },
      { status: status.successful.accepted }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: status.serverError.internalServerError }
    );
  }
}
