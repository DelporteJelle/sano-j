'use client'

import Cal, { getCalApi } from '@calcom/embed-react'
import { useEffect } from 'react'

// Note: metadata export doesn't work in 'use client' — move to a layout or use generateMetadata in a wrapper
// For now, set the title via a server wrapper (see layout.tsx)

export default function AfspraakPage() {
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
    <div className="bg-cream min-h-screen">
      {/* Minimal header */}
      <div className="bg-brand-black px-8 md:px-12 pt-32 pb-14 text-center">
        <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-yellow mb-3">
          Online reserveren
        </p>
        <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">Maak uw afspraak</h1>
        <p className="text-[15px] text-white/55 max-w-md mx-auto">
          Kies uw behandeling en selecteer een beschikbaar tijdslot. U ontvangt een
          bevestiging per e-mail.
        </p>
      </div>

      {/* Cal.com embed */}
      <div className="px-4 py-12">
        <Cal
          namespace="sano-j"
          calLink="jonas-quintyn/sano-j"
          style={{ width: '100%', height: '100%', overflow: 'scroll' }}
          config={{ layout: 'month_view' }}
        />
      </div>
    </div>
  )
}
