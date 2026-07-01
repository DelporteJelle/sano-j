import { render, screen } from '@testing-library/react'
import CategoryStep from '@/components/booking/CategoryStep'

describe('CategoryStep', () => {
  it('renders a card for every treatment category', () => {
    render(<CategoryStep />)
    expect(screen.getByText('Ontspanningsmassage')).toBeInTheDocument()
    expect(screen.getByText('Sportmassage')).toBeInTheDocument()
    expect(screen.getByText('Cupping')).toBeInTheDocument()
    expect(screen.getByText('Medical Taping')).toBeInTheDocument()
  })

  it('links each card to /afspraak with the category type in the query string', () => {
    render(<CategoryStep />)
    expect(screen.getByRole('link', { name: /sportmassage/i })).toHaveAttribute(
      'href',
      '/afspraak?type=sportmassage'
    )
    expect(screen.getByRole('link', { name: /medical taping/i })).toHaveAttribute(
      'href',
      '/afspraak?type=medical-taping'
    )
  })
})
