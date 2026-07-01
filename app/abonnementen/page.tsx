import type { Metadata } from 'next'
import { ABONNEMENTEN } from '@/lib/content'
import Button from '@/components/ui/Button'
import SectionHeader from '@/components/ui/SectionHeader'

export const metadata: Metadata = {
  title: 'Abonnementen',
  description:
    'Massageabonnementen bij Sano-J in Merelbeke: reeksen van 6 behandelingen ontspanningsmassage of sportmassage aan een voordeliger tarief.',
}

export default function AbonnementenPage() {
  return (
    <section className="bg-cream min-h-screen px-8 md:px-12 py-32">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          tag="Voordelig & regelmatig"
          title="Abonnementen"
          subtitle="Boek een reeks van 6 behandelingen ineens en geniet van een voordeliger tarief per sessie. Ideaal als u regelmatig langskomt."
          center
          className="mb-14"
        />
        <div className="grid md:grid-cols-2 gap-8">
          {ABONNEMENTEN.map((groep) => (
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
      </div>
    </section>
  )
}
