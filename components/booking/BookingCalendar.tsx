'use client'

import Cal, { getCalApi } from '@calcom/embed-react'
import Link from 'next/link'
import { useEffect } from 'react'

type BookingCalendarProps = {
  calSlug: string
  backHref: string
}

export default function BookingCalendar({ calSlug, backHref }: BookingCalendarProps) {
  useEffect(() => {
    getCalApi({ namespace: 'sano-j' }).then((cal) => {
      cal('ui', {
        theme: 'light',
        styles: {
          branding: { brandColor: '#d1ca22' },
        },
        hideEventTypeDetails: false,
      })
    })
  }, [])

  return (
    <div>
      <Link
        href={backHref}
        className="text-[13px] text-brand-gray hover:text-brand-black mb-6 inline-block"
      >
        ← Andere sessie kiezen
      </Link>
      <Cal
        namespace="sano-j"
        calLink={`jonas-quintyn-jsxyqi/${calSlug}`}
        style={{ width: '100%', height: '100%', overflow: 'scroll' }}
        config={{ layout: 'month_view' }}
      />
    </div>
  )
}
