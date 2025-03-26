import { NextResponse } from 'next/server'
import { mockUsers, addUser } from '@/utils/usersStore'

export async function POST(request: Request) {
  try {
    const { nome, email, senha } = await request.json()

    if (!nome || !email || !senha) {
      return NextResponse.json({ message: 'Dados incompletos' }, { status: 400 })
    }

    const jaExiste = mockUsers.some(user => user.email === email)

    if (jaExiste) {
      return NextResponse.json({ message: 'Email já cadastrado' }, { status: 400 })
    }

    addUser({ nome, email, senha, perfil: 'user' })

    return NextResponse.json({ message: 'Usuário cadastrado com sucesso' })
  } catch (error) {
    console.error('Erro no cadastro:', error)
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 })
  }
}
