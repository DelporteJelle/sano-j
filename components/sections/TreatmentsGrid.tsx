import { BEHANDELINGEN } from '@/lib/content'
import SectionHeader from '@/components/ui/SectionHeader'
import TreatmentCard from '@/components/ui/TreatmentCard'

const START_PRIJZEN: Record<string, string> = {
  ontspanningsmassage: '€50',
  sportmassage: '€50',
  cupping: '€25',
  'medical-taping': '€15',
}

export default function TreatmentsGrid() {
  return (
    <section className="bg-cream px-8 md:px-12 py-20">
      <SectionHeader
        tag="Wat wij aanbieden"
        title="Onze behandelingen"
        className="mb-9"
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {BEHANDELINGEN.map((b) => (
          <TreatmentCard
            key={b.slug}
            naam={b.naam}
            startprijs={START_PRIJZEN[b.slug]}
            afbeelding={b.afbeelding}
            afbeeldingAlt={b.afbeeldingAlt}
            href={`/behandelingen#${b.slug}`}
          />
        ))}
      </div>
    </section>
  )
}
