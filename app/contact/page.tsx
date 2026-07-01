import type { Metadata } from 'next'
import SectionHeader from '@/components/ui/SectionHeader'
import ContactForm from '@/components/forms/ContactForm'
import { CONTACT_INFO, OPENING_HOURS } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Neem contact op met Sano-J Massage & Welzijn in Merelbeke. Bel, mail of gebruik het contactformulier.',
}

export default function ContactPage() {
  return (
    <section className="bg-cream min-h-screen px-8 md:px-12 py-32">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
        {/* Form */}
        <div>
          <SectionHeader
            tag="Neem contact op"
            title="Stuur een bericht"
            subtitle="Jonas antwoordt zo snel mogelijk, doorgaans binnen 24 uur."
            className="mb-8"
          />
          <ContactForm />
        </div>

        {/* Info */}
        <div className="flex flex-col gap-8">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h3 className="font-serif text-xl text-brand-black mb-5">Contactgegevens</h3>
            <ul className="flex flex-col gap-3 text-[14px] text-brand-gray">
              <li>📞 <a href={CONTACT_INFO.phoneHref} className="hover:text-brand-black">{CONTACT_INFO.phone}</a></li>
              <li>📧 <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-brand-black">{CONTACT_INFO.email}</a></li>
              <li>📍 {CONTACT_INFO.address}</li>
            </ul>
            <div className="mt-5 pt-5 border-t border-gray-100">
              <p className="text-[13px] text-brand-gray">{OPENING_HOURS.weekdays}</p>
              <p className="text-[13px] text-brand-gray/50">{OPENING_HOURS.weekend}</p>
            </div>
            <div className="mt-5 pt-5 border-t border-gray-100 flex gap-4">
              <a href={CONTACT_INFO.facebook} target="_blank" rel="noopener noreferrer"
                className="text-[13px] text-brand-gray hover:text-brand-black">Facebook</a>
              <a href={CONTACT_INFO.instagram} target="_blank" rel="noopener noreferrer"
                className="text-[13px] text-brand-gray hover:text-brand-black">Instagram</a>
            </div>
          </div>

          {/* Map embed */}
          <div className="rounded-xl overflow-hidden shadow-sm h-64">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2512.5!2d3.75!3d51.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sZwijnaardsesteenweg%2C%20Merelbeke!5e0!3m2!1snl!2sbe!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Locatie Sano-J Massage Merelbeke"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
