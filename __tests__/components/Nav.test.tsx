import { render, screen } from '@testing-library/react'
import Nav from '@/components/layout/Nav'

describe('Nav', () => {
  it('renders the Sano-J logo', () => {
    render(<Nav />)
    expect(screen.getByText('Sano-J')).toBeInTheDocument()
  })

  it('renders all nav links', () => {
    render(<Nav />)
    expect(screen.getByRole('link', { name: 'Behandelingen' })).toHaveAttribute('href', '/behandelingen')
    expect(screen.getByRole('link', { name: 'Tarieven' })).toHaveAttribute('href', '/tarieven')
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/contact')
  })

  it('renders the CTA button linking to /afspraak', () => {
    render(<Nav />)
    expect(screen.getByRole('link', { name: /afspraak/i })).toHaveAttribute('href', '/afspraak')
  })
})
