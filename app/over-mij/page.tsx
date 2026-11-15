import type { Metadata } from 'next'
import Image from 'next/image'
import Button from '@/components/ui/Button'
import SectionHeader from '@/components/ui/SectionHeader'
import { CONTACT_INFO, getPersonalMilestones } from '@/lib/content'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Over mij',
  description:
    'Leer Jonas Quintyn kennen: verpleegkundige met ervaring en passie voor massage, sport en welzijn. Praktijk in Merelbeke bij Gent.',
}

export default function OverMijPage() {
  const { age, nursingYears, practiceYears } = getPersonalMilestones()
  return (
    <>
      {/* Hero */}
      <div className="relative h-[55vh] min-h-[400px] flex items-end overflow-hidden">
        <Image
          src="/images/over-mij/jonas-2.jpg"
          alt="Jonas Quintyn Sano-J"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
        <div className="relative z-10 px-8 md:px-12 pb-12">
          <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-yellow mb-3">Over mij</p>
          <h1 className="font-serif text-4xl md:text-5xl text-white">Jonas Quintyn</h1>
        </div>
      </div>

      {/* Bio */}
      <section className="bg-white px-8 md:px-12 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
          <div>
            <SectionHeader tag="Wie ben ik?" title="Massage met een hart voor zorg" className="mb-6" />
            <div className="text-[15px] text-brand-gray leading-relaxed space-y-5">
              <p>
                Ik ben Jonas Quintyn, {age} jaar, woonachtig in Balegem. Ik ben al {nursingYears} jaar
                verpleegkundige en heb al {practiceYears} jaar mijn eigen massagepraktijk in Merelbeke.
              </p>
              <p>
                Sport is altijd een belangrijk deel van mijn leven geweest — van voetbal over wielrennen
                tot kunstwielrijden. Mijn hart ligt in de zorg en in het zorg dragen van mensen,
                zowel fysiek als mentaal, om jullie te helpen de beste versie van jezelf te zijn.
              </p>
              <p>
                In tijden van zelfzorg is het des te belangrijker om op regelmatige basis uw
                ontspannings- en herstelmomentjes in te plannen. Ik kijk ernaar uit u te
                verwelkomen in mijn praktijk in Merelbeke.
              </p>
            </div>

            <blockquote className="font-serif text-xl italic text-brand-black border-l-[3px] border-yellow pl-5 my-8 leading-snug">
              &ldquo;Mijn doel is jullie te helpen de beste versie van jezelf te kunnen zijn.&rdquo;
            </blockquote>

            <Button variant="primary" href="/afspraak">Maak uw afspraak →</Button>
          </div>

          <div className="flex flex-col gap-8">
            <div className="relative aspect-portrait rounded-xl overflow-hidden shadow-md">
              <Image
                src="/images/over-mij/jonas-1.jpg"
                alt="Jonas Quintyn aan het werk"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Praktijkinfo */}
            <div className="bg-cream rounded-xl p-7">
              <h3 className="font-serif text-xl text-brand-black mb-5">Praktijkinfo</h3>
              <ul className="flex flex-col gap-3 text-[14px] text-brand-gray">
                <li>📍 {CONTACT_INFO.address}</li>
                <li>📞 <a href={CONTACT_INFO.phoneHref} className="hover:text-brand-black">{CONTACT_INFO.phone}</a></li>
                <li>📧 <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-brand-black">{CONTACT_INFO.email}</a></li>
                <li>✅ Ruime parking beschikbaar</li>
                <li>✅ Wachtzaal aanwezig</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
