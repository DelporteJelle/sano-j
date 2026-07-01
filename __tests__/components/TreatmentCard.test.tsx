import { render, screen } from '@testing-library/react'
import TreatmentCard from '@/components/ui/TreatmentCard'

describe('TreatmentCard', () => {
  const props = {
    naam: 'Sportmassage',
    startprijs: '€50',
    afbeelding: '/images/behandelingen/sport.jpg',
    afbeeldingAlt: 'Sportmassage',
    href: '/behandelingen#sportmassage',
  }

  it('renders the treatment name', () => {
    render(<TreatmentCard {...props} />)
    expect(screen.getByText('Sportmassage')).toBeInTheDocument()
  })

  it('renders the price', () => {
    render(<TreatmentCard {...props} />)
    expect(screen.getByText(/€50/)).toBeInTheDocument()
  })

  it('wraps in a link to the detail page', () => {
    render(<TreatmentCard {...props} />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/behandelingen#sportmassage')
  })
})
