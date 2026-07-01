import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import BookingFlow from '@/components/booking/BookingFlow'

const searchParamsMock = vi.hoisted(() => ({ value: new URLSearchParams() }))

vi.mock('next/navigation', () => ({
  useSearchParams: () => searchParamsMock.value,
}))

vi.mock('@calcom/embed-react', () => ({
  __esModule: true,
  default: ({ calLink }: { calLink: string }) => <div data-testid="cal-embed" data-cal-link={calLink} />,
  getCalApi: vi.fn().mockResolvedValue(vi.fn()),
}))

describe('BookingFlow', () => {
  it('shows the category picker when there is no type param', () => {
    searchParamsMock.value = new URLSearchParams()
    render(<BookingFlow />)
    expect(screen.getByText('Ontspanningsmassage')).toBeInTheDocument()
  })

  it('shows the category picker when type is unrecognized', () => {
    searchParamsMock.value = new URLSearchParams('type=onbekend')
    render(<BookingFlow />)
    expect(screen.getByText('Ontspanningsmassage')).toBeInTheDocument()
  })

  it('shows the session list for a valid type with no sessie', () => {
    searchParamsMock.value = new URLSearchParams('type=sportmassage')
    render(<BookingFlow />)
    expect(screen.getByRole('heading', { name: 'Sportmassage' })).toBeInTheDocument()
  })

  it('falls back to the session list when sessie is unrecognized', () => {
    searchParamsMock.value = new URLSearchParams('type=sportmassage&sessie=onbekend')
    render(<BookingFlow />)
    expect(screen.getByRole('heading', { name: 'Sportmassage' })).toBeInTheDocument()
  })

  it('shows the scoped calendar for a valid type and sessie', () => {
    searchParamsMock.value = new URLSearchParams('type=sportmassage&sessie=sport-rug-nek-40')
    render(<BookingFlow />)
    expect(screen.getByTestId('cal-embed')).toHaveAttribute(
      'data-cal-link',
      'jelle-d-odewhk/sport-rug-nek-40'
    )
  })
})
