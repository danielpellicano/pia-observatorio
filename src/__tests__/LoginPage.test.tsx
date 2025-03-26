import { render, screen, fireEvent } from '@testing-library/react'
import LoginPage from '@/app/(auth)/auth/login/page'
import '@testing-library/jest-dom'

// mocks obrigatórios
jest.mock('next-auth/react', () => ({
  useSession: () => ({ data: null, status: 'unauthenticated' }),
  signIn: jest.fn(),
}))
jest.mock('next/navigation', () => ({
  useRouter: () => ({ replace: jest.fn(), push: jest.fn() }),
}))
jest.mock('next/image', () => ({ src, alt }: any) => <img src={src} alt={alt} />)

describe('LoginPage', () => {
  it('renderiza formulário de login por padrão', () => {
    render(<LoginPage />)

    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Senha')).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: /entrar/i })[0]).toBeInTheDocument()
  })

  it('alterna para o modo de cadastro ao clicar no botão "Cadastro"', () => {
    render(<LoginPage />)

    fireEvent.click(screen.getByRole('button', { name: /cadastro/i }))

    expect(screen.getByPlaceholderText('Nome')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Confirmar Senha')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /cadastrar/i })).toBeInTheDocument()
  })

  it('mostra erro se as senhas forem diferentes no cadastro', () => {
    render(<LoginPage />)

    fireEvent.click(screen.getByRole('button', { name: /cadastro/i }))

    fireEvent.change(screen.getByPlaceholderText('Nome'), { target: { value: 'João' } })
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'joao@email.com' } })
    fireEvent.change(screen.getByPlaceholderText('Senha'), { target: { value: '123' } })
    fireEvent.change(screen.getByPlaceholderText('Confirmar Senha'), { target: { value: '456' } })

    fireEvent.click(screen.getByRole('button', { name: /cadastrar/i }))

    expect(screen.getByText(/As senhas não coincidem/i)).toBeInTheDocument()
  })
})
