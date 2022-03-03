import { NextResponse, NextRequest } from 'next/server'

export async function middleware(req, ev) {
    const { pathname } = req.nextUrl
    if (pathname == '/u') {
        console.log(new URL('/dashboard', req.url));
        return NextResponse.rewrite(new URL('/u/dashboard', req.url).href)
    }
    return NextResponse.next()
}
