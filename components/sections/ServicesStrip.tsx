import { OPENING_HOURS, CONTACT_INFO } from '@/lib/content'

const SERVICES = ['Ontspanningsmassage', 'Sportmassage', 'Cupping', 'Medical Taping']

export default function ServicesStrip() {
  return (
    <div className="bg-yellow px-8 md:px-12 py-4 flex flex-wrap items-center gap-6">
      {SERVICES.map((service, i) => (
        <span key={service} className="flex items-center gap-3 text-[13px] font-semibold text-brand-black">
          {i > 0 && <span className="w-1.5 h-1.5 rounded-full bg-brand-black/25" />}
          ✓ {service}
        </span>
      ))}
      <span className="ml-auto text-[13px] text-brand-black/55 hidden lg:block">
        📍 {CONTACT_INFO.address} &nbsp;·&nbsp; {OPENING_HOURS.weekdays}
      </span>
    </div>
  )
}
