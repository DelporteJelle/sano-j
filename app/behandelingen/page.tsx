import type { Metadata } from 'next'
import Image from 'next/image'
import { BEHANDELINGEN } from '@/lib/content'
import Button from '@/components/ui/Button'
import SectionHeader from '@/components/ui/SectionHeader'

export const metadata: Metadata = {
  title: 'Behandelingen',
  description:
    'Ontdek alle massagebehandelingen bij Sano-J: ontspanningsmassage, sportmassage, cupping en medical taping in Merelbeke bij Gent.',
}

export default function BehandelingenPage() {
  return (
    <>
      {/* Sub-hero */}
      <div className="relative h-[40vh] min-h-[280px] flex items-end overflow-hidden">
        <Image
          src="/images/behandelingen/ontspanning.jpg"
          alt="Behandelingen Sano-J"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
        <div className="relative z-10 px-8 md:px-12 pb-12">
          <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-yellow mb-3">
            Wat wij aanbieden
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-white">Onze behandelingen</h1>
        </div>
      </div>

      {/* Treatment sections */}
      {BEHANDELINGEN.map((b, i) => (
        <section
          key={b.slug}
          id={b.slug}
          className={`px-8 md:px-12 py-20 ${i % 2 === 0 ? 'bg-white' : 'bg-cream'}`}
        >
          <div className={`grid md:grid-cols-2 gap-14 items-center max-w-6xl mx-auto ${i % 2 !== 0 ? 'md:[&>*:first-child]:order-2' : ''}`}>
            {/* Photo */}
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-md">
              <Image
                src={b.afbeelding}
                alt={b.afbeeldingAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Text */}
            <div>
              <SectionHeader tag="Behandeling" title={b.naam} subtitle={b.tagline} className="mb-5" />
              <p className="text-[15px] text-brand-gray leading-relaxed mb-6">{b.beschrijving}</p>
              <h3 className="font-serif text-lg text-brand-black mb-3">Indicaties</h3>
              <ul className="flex flex-col gap-1.5 mb-8">
                {b.indicaties.map((ind) => (
                  <li key={ind} className="text-[13px] text-brand-gray flex items-center gap-2">
                    <span className="text-yellow font-bold">✓</span> {ind}
                  </li>
                ))}
              </ul>
              <Button variant="primary" href="/afspraak">
                Maak een afspraak →
              </Button>
            </div>
          </div>
        </section>
      ))}
    </>
  )
}
