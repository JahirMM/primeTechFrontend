import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function middleware(request: Request) {
  const requestCookies = await cookies();
  const jwt = requestCookies.get(process.env.NEXT_COOKIE_NAME || "");

  if (!jwt) {
    return NextResponse.redirect(new URL("/", request.url));
  } else {
    try {
      const secretKey = new Uint8Array(
        Buffer.from(process.env.NEXT_SECRET_TOKEN_KEY || "", "base64")
      );
      await jwtVerify(jwt.value, secretKey);

      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}

export const config = {
  matcher: "/profile/:path*",
};
