import type { Metadata } from 'next'
import { REVIEWS } from '@/lib/content'
import SectionHeader from '@/components/ui/SectionHeader'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Reviews',
  description: 'Lees wat klanten zeggen over Sano-J Massage & Welzijn in Merelbeke.',
}

export default function ReviewsPage() {
  return (
    <section className="bg-cream min-h-screen px-8 md:px-12 py-32">
      <SectionHeader
        tag="Wat klanten zeggen"
        title="Reviews"
        subtitle="Ervaringen van mensen die Jonas al bezochten. Tevreden? Laat ook een review achter!"
        className="mb-12"
      />

      <div className="grid md:grid-cols-3 gap-5 max-w-6xl mb-14">
        {REVIEWS.map((review) => (
          <div key={review.naam} className="bg-white rounded-[10px] p-7 shadow-sm">
            <div className="text-yellow text-base mb-4">{'★'.repeat(review.sterren)}</div>
            <p className="text-[14px] text-brand-gray leading-relaxed italic mb-5">
              &ldquo;{review.tekst}&rdquo;
            </p>
            <p className="text-[13px] font-bold text-brand-black">— {review.naam}</p>
          </div>
        ))}
      </div>

      <div className="text-center">
        <p className="text-[15px] text-brand-gray mb-6">Tevreden over uw behandeling? We stellen een Google Review erg op prijs!</p>
        {/* Replace the href below with the actual Google Maps review link for Jonas' Google Business Profile */}
        <Button variant="secondary" href="https://search.google.com/local/writereview?placeid=PLACE_ID_HERE" className="mr-4">
          Schrijf een review →
        </Button>
        <Button variant="primary" href="/afspraak">
          Maak uw afspraak
        </Button>
      </div>
    </section>
  )
}
