import Image from 'next/image'
import { connection } from 'next/server'
import { CONTACT_INFO } from '@/lib/content'

const maskStyle = {
  WebkitMaskImage: 'url(/images/logo.svg)',
  maskImage: 'url(/images/logo.svg)',
  WebkitMaskRepeat: 'no-repeat',
  maskRepeat: 'no-repeat',
  WebkitMaskSize: 'contain',
  maskSize: 'contain',
  WebkitMaskPosition: 'center',
  maskPosition: 'center',
} as const

const SOCIAL_LINKS = [
  {
    label: 'Instagram',
    href: CONTACT_INFO.instagram,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17" cy="7" r=".6" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: CONTACT_INFO.facebook,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="9.3" />
        <path d="M14 9.2h-1.3c-.7 0-1.2.6-1.2 1.3v1.6h2.4l-.3 2.4h-2.1V21" />
      </svg>
    ),
  },
] as const

export default async function Footer() {
  await connection()
  const currentYear = new Intl.DateTimeFormat('en', {
    timeZone: 'Europe/Brussels',
    year: 'numeric',
  }).format(new Date())

  return (
    <footer className="bg-brand-black text-white">
      <div className="px-8 md:px-12 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-10 border-b border-white/10 mb-6">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span aria-hidden="true" className="h-7 w-7 flex-shrink-0 bg-yellow" style={maskStyle} />
              <p className="font-serif text-[26px] text-yellow">Sano-J</p>
            </div>
            <p className="text-sm text-white/40 leading-relaxed">
              Massage &amp; Welzijn in Merelbeke.<br />
              Door Jonas Quintyn — met een hart voor zorg.
            </p>
            <p className="text-xs text-white/40 mt-2">Ondernemingsnr.: 0744.530.032</p>
          </div>

          {/* Credentials */}
          <div>
            <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-yellow mb-4">Keurmerk &amp; foto&apos;s</p>
            <div className="inline-flex bg-white rounded-lg p-3 mb-4">
              <Image
                src="/images/belgische-massage-federatie-logo.jpg"
                alt="Belgische Massage Federatie"
                width={140}
                height={55}
              />
            </div>
            <p className="text-xs text-white/40">Foto&apos;s: Skaeg (Jens Baert)</p>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-yellow mb-4">Contact</p>
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
        </div>

        <div className="flex items-center justify-between flex-wrap gap-4">
          <p className="text-xs text-white/20">
            {`© ${currentYear} Sano-J Massage & Welzijn · Jonas Quintyn · Merelbeke`}
          </p>
          <div className="flex gap-2.5">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-white/55 transition-colors hover:border-yellow hover:text-yellow [&_svg]:h-4 [&_svg]:w-4"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
