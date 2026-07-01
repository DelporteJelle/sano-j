import type { Metadata } from 'next'
import Image from 'next/image'
import { TARIEVEN } from '@/lib/content'
import Button from '@/components/ui/Button'
import SectionHeader from '@/components/ui/SectionHeader'

export const metadata: Metadata = {
  title: 'Tarieven',
  description:
    'Bekijk alle prijzen voor massagebehandelingen bij Sano-J in Merelbeke: ontspanningsmassage, sportmassage, cupping en medical taping.',
}

export default function TarievenPage() {
  return (
    <>
      {/* Sub-hero */}
      <div className="relative h-[40vh] min-h-[280px] flex items-end overflow-hidden">
        <Image
          src="/images/tarieven/tarieven-1.jpg"
          alt="Tarieven Sano-J"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
        <div className="relative z-10 px-8 md:px-12 pb-12">
          <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-yellow mb-3">
            Transparante prijzen
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-white">Tarieven</h1>
        </div>
      </div>

      {/* Pricing tables */}
      <section className="bg-cream px-8 md:px-12 py-20">
        <SectionHeader
          tag="Overzicht"
          title="Prijslijst"
          subtitle="Alle prijzen zijn inclusief btw. Betaling ter plaatse na de behandeling."
          className="mb-14"
        />
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl">
          {TARIEVEN.map((groep) => (
            <div key={groep.naam} className="bg-white rounded-xl overflow-hidden shadow-sm">
              <div className="bg-brand-black px-6 py-4">
                <h2 className="font-serif text-xl text-white">{groep.naam}</h2>
              </div>
              <table className="w-full">
                <tbody>
                  {groep.rijen.map((rij, i) => (
                    <tr
                      key={`${rij.behandeling}-${rij.duur}`}
                      className={i % 2 === 0 ? 'bg-white' : 'bg-cream'}
                    >
                      <td className="px-6 py-3 text-[14px] text-brand-black">{rij.behandeling}</td>
                      <td className="px-4 py-3 text-[13px] text-brand-gray text-center">{rij.duur}</td>
                      <td className="px-6 py-3 text-[14px] font-bold text-brand-black text-right">{rij.prijs}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Button variant="primary" href="/afspraak" className="text-base px-10 py-4">
            Maak uw afspraak →
          </Button>
        </div>
      </section>
    </>
  )
}
