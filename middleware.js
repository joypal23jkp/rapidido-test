// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextResponse } from 'next/server'

export function middleware(request) {
    return NextResponse.next();
}

export const config = {
    matcher:['/:path*'],
}
