import { NextResponse, NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import connect from '@/lib/db';
import User from '@/models/User';
import { status } from '@/types/types';

export async function POST(request: NextRequest) {
  try {
    await connect();

    const {username, email, password} = await request.json();

    const passwordHash = await bcrypt.hash(password, 10);

    const existingEmail = await User.findOne({ email });
    const existingUsername = await User.findOne({ username });

    if(existingEmail){
      return NextResponse.json({ message: "User with email already exists"}, { status: status.clientError.conflict });
    }
    if(existingUsername){
      return NextResponse.json({ message: "User with username already exits"}, {status: status.clientError.conflict});
    }

    const user = await User.create({
      username: username,
      email: email,
      passwordHash,
    });

    return NextResponse.json({ 
        success: true,  
        user 
    }, { status: status.successful.created });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: status.serverError.internalServerError });
  }
}
