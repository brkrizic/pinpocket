import connect from "@/lib/db";
import User from "@/models/User";
import { status } from "@/types/types";
import { getUserId } from "@/utils/token";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  try {
    await connect();



    const userId = await getUserId();

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
