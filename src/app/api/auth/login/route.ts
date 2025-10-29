import User from "@/models/User";
import { status } from "@/types/types";
import bcrypt from "bcryptjs";
import connect from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { createSession } from "@/utils/token";

export async function POST(request: NextRequest) {
  try {
    await connect();

    const { email, password } = await request.json();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: status.clientError.notFound });
    }

    const isMatchPassword = await bcrypt.compare(password, user.passwordHash);

    if (!isMatchPassword) {
      return NextResponse.json({ message: "Incorrect password" }, { status: status.clientError.notFound });
    }

    await createSession(user.id);

    return NextResponse.json({ success: true, message: "Logged in", user }, { status: status.successful.ok });

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
