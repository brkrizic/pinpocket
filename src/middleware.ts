import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getTokenFromHeader, verifyToken } from "./utils/tokenHelper";
import { status } from "./types/types";

export function middleware(request: NextRequest) {
    console.log('Middleware running for:', request.nextUrl.pathname);

    const authResult = authMiddleware(request);
    if (authResult) return authResult;

    return NextResponse.next();
}

function authMiddleware(request: NextRequest){
    const token = getTokenFromHeader(request);
    //TODO: Should verfiy token
    const path = request.nextUrl.pathname;

    if(!token){
      return NextResponse.json({message: "Token is missing"}, {status: status.clientError.unauthorized})
    }

    if (path.startsWith('/api/bookmarks') && !token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: status.clientError.unauthorized });
    }
    if (path.startsWith('/api/categories') && !token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: status.clientError.unauthorized });
    }

    return null;
}

export const config = {
  matcher: ['/api/bookmarks/:path*', '/api/categories/:path*'],  // Middleware applies only to these routes
};