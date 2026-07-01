import { REVIEWS } from '@/lib/content'
import SectionHeader from '@/components/ui/SectionHeader'

export default function ReviewsGrid() {
  const preview = REVIEWS.slice(0, 3)

  return (
    <section className="bg-cream px-8 md:px-12 py-20">
      <SectionHeader
        tag="Wat klanten zeggen"
        title="Reviews"
        subtitle="Ervaringen van mensen die Jonas al bezochten."
        className="mb-10"
      />
      <div className="grid sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
        {preview.map((review) => (
          <div key={review.naam} className="bg-white rounded-[10px] p-7 shadow-sm">
            <div className="text-yellow text-base mb-4">{'★'.repeat(review.sterren)}</div>
            <p className="text-[14px] text-brand-gray leading-relaxed italic mb-5">
              &ldquo;{review.tekst}&rdquo;
            </p>
            <p className="text-[13px] font-bold text-brand-black">— {review.naam}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
