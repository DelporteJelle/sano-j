import Image from 'next/image'
import Button from '@/components/ui/Button'
import SectionHeader from '@/components/ui/SectionHeader'

export default function AboutTeaser() {
  return (
    <section className="bg-white px-8 md:px-12 py-20">
      <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
        {/* Photo */}
        <div className="relative aspect-portrait rounded-xl overflow-hidden">
          <Image
            src="/images/over-mij/jonas-1.jpg"
            alt="Jonas Quintyn — Sano-J Massage & Welzijn"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Text */}
        <div>
          <SectionHeader tag="Over mij" title="Jonas Quintyn" className="mb-5" />
          <p className="text-[15px] text-brand-gray leading-relaxed mb-1">
            Ik ben 17 jaar verpleegkundige en al 2 jaar heb ik mijn eigen massagepraktijk
            in Merelbeke. Mijn hart ligt in de zorg en in het zorg dragen van mensen —
            zowel fysiek als mentaal.
          </p>
          <blockquote className="font-serif text-xl italic text-brand-black border-l-[3px] border-yellow pl-5 my-7 leading-snug">
            &ldquo;In tijden van zelfzorg is het des te belangrijker om op regelmatige
            basis uw ontspannings- en herstelmomentjes in te plannen.&rdquo;
          </blockquote>
          <ul className="flex flex-col gap-2 mb-8">
            {[
              '17 jaar verpleegkundige ervaring',
              'Gespecialiseerd in sport & ontspanning',
              'Ruime parking & wachtzaal beschikbaar',
            ].map((item) => (
              <li key={item} className="text-[13px] text-brand-gray flex items-center gap-2">
                <span className="text-yellow font-bold">✓</span> {item}
              </li>
            ))}
          </ul>
          <Button variant="secondary" href="/over-mij">
            Lees meer over mij
          </Button>
        </div>
      </div>
    </section>
  )
}
