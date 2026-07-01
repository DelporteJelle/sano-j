import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import BookingCalendar from '@/components/booking/BookingCalendar'

vi.mock('@calcom/embed-react', () => ({
  __esModule: true,
  default: ({ calLink }: { calLink: string }) => <div data-testid="cal-embed" data-cal-link={calLink} />,
  getCalApi: vi.fn().mockResolvedValue(vi.fn()),
}))

describe('BookingCalendar', () => {
  it('embeds the calendar scoped to the given calSlug', () => {
    render(<BookingCalendar calSlug="sport-rug-nek-40" backHref="/afspraak?type=sportmassage" />)
    expect(screen.getByTestId('cal-embed')).toHaveAttribute(
      'data-cal-link',
      'jelle-d-odewhk/sport-rug-nek-40'
    )
  })

  it('links back to the given backHref', () => {
    render(<BookingCalendar calSlug="sport-rug-nek-40" backHref="/afspraak?type=sportmassage" />)
    expect(screen.getByRole('link', { name: /andere sessie kiezen/i })).toHaveAttribute(
      'href',
      '/afspraak?type=sportmassage'
    )
  })
})
