import { render, screen } from '@testing-library/react'
import Header from '@/components/Header'
import { useSession } from 'next-auth/react'

jest.mock('next-auth/react')

describe('Header', () => {
  const mockUseSession = useSession as jest.Mock

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('não renderiza nada se o usuário não estiver logado', () => {
    mockUseSession.mockReturnValue({ data: null, status: 'unauthenticated' })

    const { container } = render(<Header />)
    expect(container.firstChild).toBeNull()
  })

  it('renderiza o nome, email e botão de logout quando logado', () => {
    mockUseSession.mockReturnValue({
      data: {
        user: {
          name: 'Daniel Pellicano',
          email: 'admin@teste.com'
        }
      },
      status: 'authenticated'
    })

    render(<Header />)

    expect(screen.getByText('Daniel Pellicano')).toBeInTheDocument()
    expect(screen.getByText('admin@teste.com')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sair/i })).toBeInTheDocument()
  })
})
