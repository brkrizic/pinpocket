import { TOKEN_NAME } from "@/types/types";
import { serialize } from "cookie";
import { NextRequest } from "next/server";
var jwt = require('jsonwebtoken');


export function createCookie(token: string) {
  return serialize(TOKEN_NAME, token, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
}

export function generateToken(userId: string){
    const payload = { userId };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d'});
    return token;
}

export function getTokenFromHeader(request: NextRequest){
    const userToken = request.cookies.get(TOKEN_NAME)?.value;
    return userToken;
}

export async function verifyToken(token: string){
    try {
        const decodedUser = await jwt.verify(token, process.env.JWT_SECRET);
        return decodedUser;
    } catch (error) {
        console.log(error);
        return null;  // Invalid or expired token
    }
}

export async function getUserId(request: NextRequest): Promise<string | null> {
  const token = getTokenFromHeader(request);
  if (!token) {
    return null;
  }

  const decoded = await verifyToken(token).catch(() => null);
  if (!decoded || typeof decoded !== 'object' || !('userId' in decoded)) {
    return null;
  }

  return decoded.userId as string;
}
