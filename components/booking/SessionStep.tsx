import Link from 'next/link'
import type { TarievenGroep } from '@/lib/content'

type SessionStepProps = {
  groep: TarievenGroep
}

export default function SessionStep({ groep }: SessionStepProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <Link
        href="/afspraak"
        className="text-[13px] text-brand-gray hover:text-brand-black mb-6 inline-block"
      >
        ← Alle behandelingen
      </Link>
      <h2 className="font-serif text-2xl text-brand-black mb-6">{groep.naam}</h2>
      <div className="flex flex-col gap-3">
        {groep.rijen.map((rij) => (
          <Link
            key={rij.calSlug}
            href={`/afspraak?type=${groep.slug}&sessie=${rij.calSlug}`}
            className="flex items-center justify-between px-5 py-4 bg-white rounded-[8px] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            <span className="text-[15px] text-brand-black font-medium">
              {rij.behandeling} · {rij.duur}
            </span>
            <span className="text-[15px] font-bold text-brand-black">{rij.prijs}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
