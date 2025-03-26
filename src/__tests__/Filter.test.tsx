import { render, screen, fireEvent } from '@testing-library/react'
import Filter from '@/components/Filter'
import '@testing-library/jest-dom'

jest.mock('@/hooks/useDadosIBGE', () => ({
  useDadosIBGE: () => ({
    data: { pages: [] },
    fetchNextPage: jest.fn(),
    hasNextPage: false,
    isFetchingNextPage: false,
    isLoading: false,
  })
}))

describe('Filter Component', () => {
  it('deve renderizar os títulos dos filtros', () => {
    render(<Filter />)

    expect(screen.getByText('Variáveis')).toBeInTheDocument()
    expect(screen.getByText('CNAEs')).toBeInTheDocument()
    expect(screen.getByText('Anos')).toBeInTheDocument()
  })

  it('deve mostrar erro se clicar em buscar sem filtros', () => {
    render(<Filter />)

    const botaoBuscar = screen.getByRole('button', { name: /buscar/i })
    fireEvent.click(botaoBuscar)

    expect(screen.getByText(/Selecione pelo menos uma opção em cada filtro/i)).toBeInTheDocument()
  })
})
