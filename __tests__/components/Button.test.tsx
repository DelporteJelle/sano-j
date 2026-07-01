import { render, screen } from '@testing-library/react'
import Button from '@/components/ui/Button'

describe('Button', () => {
  it('renders primary variant with correct classes', () => {
    render(<Button variant="primary">Boek nu</Button>)
    const btn = screen.getByRole('button', { name: 'Boek nu' })
    expect(btn).toHaveClass('bg-yellow')
    expect(btn).toHaveClass('text-brand-black')
  })

  it('renders as anchor when href is provided', () => {
    render(<Button variant="primary" href="/afspraak">Boek nu</Button>)
    const link = screen.getByRole('link', { name: 'Boek nu' })
    expect(link).toHaveAttribute('href', '/afspraak')
  })

  it('renders secondary variant', () => {
    render(<Button variant="secondary">Meer info</Button>)
    const btn = screen.getByRole('button', { name: 'Meer info' })
    expect(btn).toHaveClass('bg-brand-black')
    expect(btn).toHaveClass('text-yellow')
  })
})
