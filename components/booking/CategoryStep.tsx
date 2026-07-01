import { BEHANDELINGEN } from '@/lib/content'
import TreatmentCard from '@/components/ui/TreatmentCard'

export default function CategoryStep() {
  return (
    <div>
      <p className="text-center text-[15px] text-brand-gray mb-8">
        Kies eerst uw behandeling.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {BEHANDELINGEN.map((b) => (
          <TreatmentCard
            key={b.slug}
            naam={b.naam}
            startprijs={b.startprijs}
            afbeelding={b.afbeelding}
            afbeeldingAlt={b.afbeeldingAlt}
            href={`/afspraak?type=${b.slug}`}
          />
        ))}
      </div>
    </div>
  )
}
