import { NextRequest, NextResponse } from 'next/server'

const rotasProtegidas = ['/dashboard', '/usuarios']

export function middleware(request: NextRequest) {
  const user = request.cookies.get('user') || request.headers.get('user') || null

  if (rotasProtegidas.some(path => request.nextUrl.pathname.startsWith(path))) {
    if (!request.cookies.get('user')) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/usuarios/:path*'],
}
