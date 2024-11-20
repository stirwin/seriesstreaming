import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt"

declare module "next/server" {
    interface NextRequest {
        auth?: any;
    }
}

const authRoutes = ["/login"];
const protectedRoutes = ["/",];

export async function middleware(req: NextRequest) {

    const { nextUrl } = req;
    const LoggedIn = await getToken({ req, secret: process.env.AUTH_SECRET });

    // Redirigir a la página de inicio si el usuario está logeado y trata de acceder a una ruta de autenticación
    if (LoggedIn && authRoutes.includes(nextUrl.pathname)) {
        return NextResponse.redirect(new URL("/", nextUrl));
    }

    // Redirigir a la página de inicio de sesión si el usuario no está logeado y trata de acceder a una ruta protegida
    if (!LoggedIn && protectedRoutes.includes(nextUrl.pathname)) {
        return NextResponse.redirect(new URL("/login", nextUrl));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};