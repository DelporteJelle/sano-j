import Image from 'next/image'
import Button from '@/components/ui/Button'

export default function Hero() {
  return (
    <section className="relative h-[92vh] min-h-[560px] flex items-end overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/homepage/hero-1.jpg"
        alt="Sano-J Massage & Welzijn Merelbeke"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

      {/* Content */}
      <div className="relative z-10 px-8 md:px-12 pb-16 max-w-2xl">
        <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-yellow mb-4">
          Massage &amp; Welzijn · Merelbeke
        </p>
        <h1 className="font-serif text-5xl md:text-6xl text-white leading-[1.05] mb-5">
          Meer rust.<br />Minder spanning.
        </h1>
        <p className="text-base text-white/70 leading-relaxed mb-8 max-w-md">
          Professionele massages op maat voor ontspanning, herstel en welzijn —
          door Jonas Quintyn.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary" href="/afspraak">
            Maak uw afspraak →
          </Button>
          <Button variant="ghost" href="/behandelingen">
            Bekijk behandelingen
          </Button>
        </div>
      </div>
    </section>
  )
}
