// src/app/api/cadastro/route.ts
import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const filePath = path.resolve(process.cwd(), 'src/mock/users.json')

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { nome, email, senha } = body

    if (!nome || !email || !senha) {
      return NextResponse.json({ message: 'Dados incompletos' }, { status: 400 })
    }

    // Lê os usuários do JSON
    const fileData = await fs.readFile(filePath, 'utf-8')
    const usuarios = JSON.parse(fileData)

    const jaExiste = usuarios.some((user: any) => user.email === email)

    if (jaExiste) {
      return NextResponse.json({ message: 'Email já cadastrado' }, { status: 400 })
    }

    const novoId = usuarios[usuarios.length - 1]?.id + 1 || 1

    const novoUsuario = {
      id: novoId,
      nome,
      email,
      senha,
      perfil: "user",
    }

    usuarios.push(novoUsuario)

    await fs.writeFile(filePath, JSON.stringify(usuarios, null, 2))

    return NextResponse.json({ message: 'Usuário cadastrado com sucesso' })
  } catch (error) {
    console.error('Erro no cadastro:', error)
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 })
  }
}
