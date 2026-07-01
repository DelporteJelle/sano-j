import { Suspense } from 'react'
import BookingFlow from '@/components/booking/BookingFlow'

export default function AfspraakPage() {
  return (
    <div className="bg-cream min-h-screen">
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

      <div className="px-4 py-12">
        <Suspense fallback={null}>
          <BookingFlow />
        </Suspense>
      </div>
    </div>
  )
}
