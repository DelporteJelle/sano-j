import Link from 'next/link'
import { NAV_LINKS, CONTACT_INFO, OPENING_HOURS } from '@/lib/content'

export default function Footer() {
  return (
    <footer className="bg-brand-black text-white">
      <div className="px-8 md:px-12 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-10 border-b border-white/10 mb-8">
          {/* Brand + contact */}
          <div>
            <p className="font-serif text-[26px] text-yellow mb-3">Sano-J</p>
            <p className="text-sm text-white/40 leading-relaxed mb-6">
              Massage &amp; Welzijn in Merelbeke.<br />
              Door Jonas Quintyn — met een hart voor zorg.
            </p>
            <div className="flex flex-col gap-2 text-sm text-white/45">
              <a href={CONTACT_INFO.phoneHref} className="hover:text-white transition-colors">
                📞 {CONTACT_INFO.phone}
              </a>
              <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-white transition-colors">
                📧 {CONTACT_INFO.email}
              </a>
              <span>📍 {CONTACT_INFO.address}</span>
            </div>
          </div>

          {/* Nav links */}
          <div>
            <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-yellow mb-4">Pagina&apos;s</p>
            <ul className="flex flex-col gap-2">
              {[...NAV_LINKS, { label: 'Cadeaubon', href: '/cadeaubon' as const }].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/45 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Opening hours */}
          <div>
            <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-yellow mb-4">Openingstijden</p>
            <div className="text-sm text-white/45 leading-loose">
              <p>{OPENING_HOURS.weekdays}</p>
              <p className="text-white/25 mt-1">{OPENING_HOURS.weekend}</p>
            </div>
          </div>
        </div>

        <p className="text-xs text-white/20">
          © {new Date().getFullYear()} Sano-J Massage &amp; Welzijn · Jonas Quintyn · Merelbeke
        </p>
      </div>
    </footer>
  )
}
