import Script from 'next/script'
import Hero from '@/components/sections/Hero'
import ServicesStrip from '@/components/sections/ServicesStrip'
import TreatmentsGrid from '@/components/sections/TreatmentsGrid'
import AboutTeaser from '@/components/sections/AboutTeaser'
import BookingCTA from '@/components/sections/BookingCTA'
import ReviewsGrid from '@/components/sections/ReviewsGrid'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Sano-J Massage & Welzijn | Merelbeke',
  description:
    'Professionele massage in Merelbeke bij Gent. Ontspanningsmassage, sportmassage, cupping en medical taping door Jonas Quintyn.',
  openGraph: {
    title: 'Sano-J Massage & Welzijn',
    description: 'Professionele massage in Merelbeke bij Gent.',
    locale: 'nl_BE',
    type: 'website',
  },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesStrip />
      <TreatmentsGrid />
      <AboutTeaser />
      <BookingCTA />
      <ReviewsGrid />
      <Script id="schema-local-business" type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': ['LocalBusiness', 'HealthAndBeautyBusiness'],
          name: 'Sano-J Massage & Welzijn',
          description: 'Professionele massages in Merelbeke: ontspanningsmassage, sportmassage, cupping en medical taping.',
          url: 'https://www.sano-j.be',
          telephone: '+32499366833',
          email: 'jonasquintyn@gmail.com',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Zwijnaardsesteenweg 56A',
            addressLocality: 'Merelbeke',
            addressRegion: 'Oost-Vlaanderen',
            postalCode: '9820',
            addressCountry: 'BE',
          },
          priceRange: '€15 – €100',
        })}
      </Script>
    </>
  )
}
