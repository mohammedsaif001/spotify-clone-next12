// Middleware is like a gatekeeper which checks the requests coming from the user and does some operations
// This middleware checks tokens and stuff if it's available it will allow to bypass to our site
// Else it will redirect to login page

import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";


export async function middleware(req) {
    // Token will exist if user is logged in
    const token = await getToken({ req, secret: process.env.JWT_SECRET })

    const { pathname } = req.nextUrl
    // console.log(pathname, "Pathname")
    // Allow the requests if the following is true....
    // 1) Its  arequest for next-auth session and provider fetching
    // 2) If the Token exists
    if (pathname.includes('/api/auth') || token) {
        return NextResponse.next()
    }

    // Redirect them to login page if they dont have token & requesting a protected route
    if (!token && pathname !== `/login` && !pathname.includes(".")) {
        const url = req.nextUrl.clone()
        url.pathname = '/login'
        return NextResponse.rewrite(url)
    }

    return NextResponse.next()


}