'use client'

import { useSearchParams } from 'next/navigation'
import { TARIEVEN } from '@/lib/content'
import CategoryStep from './CategoryStep'
import SessionStep from './SessionStep'
import BookingCalendar from './BookingCalendar'

export default function BookingFlow() {
  const searchParams = useSearchParams()
  const type = searchParams.get('type')
  const sessie = searchParams.get('sessie')

  const groep = TARIEVEN.find((g) => g.slug === type)

  if (!groep) {
    return <CategoryStep />
  }

  const rij = groep.rijen.find((r) => r.calSlug === sessie)

  if (!rij) {
    return <SessionStep groep={groep} />
  }

  return <BookingCalendar calSlug={rij.calSlug} backHref={`/afspraak?type=${groep.slug}`} />
}
