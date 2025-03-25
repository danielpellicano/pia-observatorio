// middleware.ts
import { withAuth } from 'next-auth/middleware'

export default withAuth({
  pages: {
    signIn: '/auth/login',
  },
})

export const config = {
  matcher: [
    /*
      Proteger tudo, exceto:
      - /auth/login
      - /_next/ (arquivos estáticos)
      - /api/auth (rotas do NextAuth)
    */
    '/((?!auth/login|_next/static|_next/image|favicon.ico|api/auth).*)',
  ],
}
