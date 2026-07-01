import Button from '@/components/ui/Button'
import { CONTACT_INFO } from '@/lib/content'

export default function BookingCTA() {
  return (
    <section className="bg-brand-black px-8 md:px-12 py-24 text-center">
      <span className="block text-[11px] font-semibold tracking-[0.14em] uppercase text-yellow mb-3">
        Klaar om te boeken?
      </span>
      <h2 className="font-serif text-4xl md:text-5xl text-white mb-5 leading-tight">
        Uw moment van welzijn<br />begint hier.
      </h2>
      <p className="text-[15px] text-white/50 max-w-md mx-auto mb-10 leading-relaxed">
        Kies uw behandeling, selecteer een beschikbaar tijdslot en bevestig uw
        afspraak — direct online.
      </p>
      <Button variant="primary" href="/afspraak" className="text-base px-10 py-4">
        Maak uw afspraak →
      </Button>
      <p className="mt-7 text-[13px] text-white/30">
        {CONTACT_INFO.address}
      </p>
    </section>
  )
}
