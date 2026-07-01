import Image from 'next/image'
import Link from 'next/link'

type TreatmentCardProps = {
  naam: string
  startprijs: string
  afbeelding: string
  afbeeldingAlt: string
  href: string
}

export default function TreatmentCard({ naam, startprijs, afbeelding, afbeeldingAlt, href }: TreatmentCardProps) {
  return (
    <Link
      href={href}
      className="group relative aspect-square block overflow-hidden rounded-[10px] shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-200"
    >
      <Image
        src={afbeelding}
        alt={afbeeldingAlt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 25vw"
      />
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/20 to-transparent" />
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-1">
        <h3 className="font-serif text-xl text-white leading-snug">{naam}</h3>
        <p className="text-xs text-white/55">v.a. {startprijs}</p>
        <span className="mt-2.5 inline-flex items-center gap-1.5 bg-yellow text-brand-black text-[11px] font-bold px-4 py-1.5 rounded-[5px] w-fit">
          Meer info →
        </span>
      </div>
    </Link>
  )
}
