import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import { status } from '@/types/types';

export async function GET() {
  try {
    await connect();

    return NextResponse.json({
      success: true,
    });
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
