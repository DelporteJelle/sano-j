import { render, screen } from '@testing-library/react'
import SessionStep from '@/components/booking/SessionStep'
import type { TarievenGroep } from '@/lib/content'

const groep: TarievenGroep = {
  slug: 'sportmassage',
  naam: 'Sportmassage',
  rijen: [
    { behandeling: 'Rug-nek-benen', duur: "90'", prijs: '€100', calSlug: 'sport-rugnekbenen-90' },
    { behandeling: 'Benen', duur: "30'", prijs: '€40', calSlug: 'sport-benen-30' },
  ],
}

describe('SessionStep', () => {
  it('renders the category name as a heading', () => {
    render(<SessionStep groep={groep} />)
    expect(screen.getByRole('heading', { name: 'Sportmassage' })).toBeInTheDocument()
  })

  it('renders a link per session variant with the correct deep link', () => {
    render(<SessionStep groep={groep} />)
    expect(screen.getByRole('link', { name: /Rug-nek-benen.*90'/ })).toHaveAttribute(
      'href',
      '/afspraak?type=sportmassage&sessie=sport-rugnekbenen-90'
    )
    expect(screen.getByRole('link', { name: /Benen.*30'/ })).toHaveAttribute(
      'href',
      '/afspraak?type=sportmassage&sessie=sport-benen-30'
    )
  })

  it('shows the price for each variant', () => {
    render(<SessionStep groep={groep} />)
    expect(screen.getByText('€100')).toBeInTheDocument()
    expect(screen.getByText('€40')).toBeInTheDocument()
  })

  it('links back to the category picker', () => {
    render(<SessionStep groep={groep} />)
    expect(screen.getByRole('link', { name: /alle behandelingen/i })).toHaveAttribute('href', '/afspraak')
  })
})
