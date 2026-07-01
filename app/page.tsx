import Hero from '@/components/sections/Hero'
import ServicesStrip from '@/components/sections/ServicesStrip'
import TreatmentsGrid from '@/components/sections/TreatmentsGrid'
import AboutTeaser from '@/components/sections/AboutTeaser'
import BookingCTA from '@/components/sections/BookingCTA'
import ReviewsGrid from '@/components/sections/ReviewsGrid'

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesStrip />
      <TreatmentsGrid />
      <AboutTeaser />
      <BookingCTA />
      <ReviewsGrid />
    </>
  )
}
