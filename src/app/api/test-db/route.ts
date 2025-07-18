import { NextResponse } from 'next/server';
import connect from '@/lib/db';

export async function GET() {
  try {
    const db = await connect();

    return NextResponse.json({
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
