import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Maak uw afspraak',
  description:
    'Boek online uw massage bij Sano-J in Merelbeke. Kies uw behandeling en tijdslot via ons boekingssysteem.',
}

export default function AfspraakLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
