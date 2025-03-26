// src/app/api/auth/[...nextauth]/route.ts

import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import LinkedInProvider from 'next-auth/providers/linkedin'
import CredentialsProvider from 'next-auth/providers/credentials'

import fs from 'fs/promises'
import path from 'path'

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credenciais',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Senha', type: 'password' },
      },
      async authorize(credentials) {
        const filePath = path.resolve(process.cwd(), 'src/mock/users.json')

        try {
          const fileData = await fs.readFile(filePath, 'utf-8')
          const users = JSON.parse(fileData)

          const user = users.find(
            (u: any) =>
              u.email === credentials?.email && u.senha === credentials?.password
          )

          if (user) {
            return {
              id: user.id,
              name: user.nome,
              email: user.email,
            }
          }

          return null
        } catch (error) {
          console.error('Erro ao ler users.json:', error)
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.name = user.name
        token.email = user.email
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.name = token.name as string
        session.user.email = token.email as string
      }
      return session
    },
  },
})

export { handler as GET, handler as POST }
