import type { Metadata } from 'next'
import Button from '@/components/ui/Button'
import SectionHeader from '@/components/ui/SectionHeader'
import { CONTACT_INFO } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Cadeaubon',
  description: 'Geef een massage cadeau! Bestel een cadeaubon bij Sano-J Massage & Welzijn in Merelbeke.',
}

export default function CadeaubonPage() {
  return (
    <section className="min-h-screen bg-cream flex items-center justify-center px-8 md:px-12 py-32">
      <div className="max-w-xl text-center">
        <span className="text-5xl mb-6 block">🎁</span>
        <SectionHeader
          tag="Het perfecte cadeau"
          title="Cadeaubon"
          subtitle="Geef iemand het cadeau van ontspanning en welzijn — een massage bij Sano-J."
          className="mb-8"
        />
        <p className="text-[15px] text-brand-gray leading-relaxed mb-10">
          Een cadeaubon is een unieke kortingscode die de ontvanger kan gebruiken bij het
          boeken van een massage. Neem contact op met Jonas om er één te bestellen. Prijs
          en geldigheid worden samen bepaald.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary" href={`mailto:${CONTACT_INFO.email}?subject=Cadeaubon%20bestellen`}>
            Bestel via e-mail
          </Button>
          <Button variant="secondary" href={CONTACT_INFO.phoneHref}>
            Bel {CONTACT_INFO.phone}
          </Button>
        </div>
      </div>
    </section>
  )
}
