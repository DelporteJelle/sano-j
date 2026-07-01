import type { Metadata } from 'next'
import Button from '@/components/ui/Button'
import SectionHeader from '@/components/ui/SectionHeader'
import { CONTACT_INFO } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Abonnementen',
  description: 'Massageabonnementen bij Sano-J Merelbeke — binnenkort beschikbaar.',
}

export default function AbonnementenPage() {
  return (
    <section className="min-h-screen bg-cream flex items-center justify-center px-8 md:px-12 py-32">
      <div className="max-w-xl text-center">
        <span className="text-5xl mb-6 block">📋</span>
        <SectionHeader
          tag="Binnenkort beschikbaar"
          title="Abonnementen"
          subtitle="Wij werken aan aantrekkelijke abonnementsformules voor regelmatige klanten."
          className="mb-8"
        />
        <p className="text-[15px] text-brand-gray leading-relaxed mb-10">
          Heeft u interesse in een abonnement voor meerdere sessies? Neem contact op
          met Jonas voor meer informatie over de mogelijkheden.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary" href={`mailto:${CONTACT_INFO.email}?subject=Abonnement%20informatie`}>
            Vraag informatie op
          </Button>
          <Button variant="secondary" href="/contact">
            Contacteer ons
          </Button>
        </div>
      </div>
    </section>
  )
}
