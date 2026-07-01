// lib/content.ts

export const CONTACT_INFO = {
  phone: '0499/36.68.33',
  phoneHref: 'tel:+32499366833',
  email: 'jonasquintyn@gmail.com',
  address: 'Zwijnaardsesteenweg, Merelbeke',
  facebook: 'https://www.facebook.com/Sano-J',
  instagram: 'https://www.instagram.com/sanojmassage',
} as const

export const OPENING_HOURS = {
  weekdays: 'Maandag – vrijdag: 10u – 20u',
  weekend: 'Zaterdag & zondag: gesloten',
} as const

export const NAV_LINKS = [
  { label: 'Behandelingen', href: '/behandelingen' },
  { label: 'Tarieven', href: '/tarieven' },
  { label: 'Abonnementen', href: '/abonnementen' },
  { label: 'Over mij', href: '/over-mij' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'Contact', href: '/contact' },
] as const

export type Behandeling = {
  slug: string
  naam: string
  tagline: string
  beschrijving: string
  indicaties: string[]
  afbeelding: string
  afbeeldingAlt: string
  startprijs: string
}

export const BEHANDELINGEN: Behandeling[] = [
  {
    slug: 'ontspanningsmassage',
    naam: 'Ontspanningsmassage',
    tagline: 'Laat stress los, herstel je evenwicht.',
    beschrijving:
      'Een ontspanningsmassage is een zachte, vloeiende massage die spanning in spieren en gewrichten verlicht. Ideaal als je nood hebt aan diepe rust en herstel van lichaam én geest.',
    indicaties: ['Stress en burn-out', 'Spierspanning', 'Slaapproblemen', 'Algemeen welzijn'],
    afbeelding: '/images/behandelingen/ontspanning.jpg',
    afbeeldingAlt: 'Ontspanningsmassage bij Sano-J Merelbeke',
    startprijs: '€50',
  },
  {
    slug: 'sportmassage',
    naam: 'Sportmassage',
    tagline: 'Herstel sneller. Presteer beter.',
    beschrijving:
      'Een sportmassage richt zich op spiergroepen die intensief belast worden tijdens sport. Jonas combineert zijn verpleegkundige achtergrond met kennis van het bewegingsapparaat voor een gerichte, effectieve behandeling.',
    indicaties: ['Spierherstel na inspanning', 'Blessurepreventie', 'Prestatieoptimalisatie', 'Spierkrampen'],
    afbeelding: '/images/behandelingen/sport.jpg',
    afbeeldingAlt: 'Sportmassage bij Sano-J Merelbeke',
    startprijs: '€40',
  },
  {
    slug: 'cupping',
    naam: 'Cupping',
    tagline: 'Diepe ontspanning via vacuümtherapie.',
    beschrijving:
      'Cupping is een vacuümtherapie waarbij cups op de huid worden geplaatst om de doorbloeding te stimuleren en diepe spierspanning te verlichten. Kan gecombineerd worden met massage of als zelfstandige behandeling.',
    indicaties: ['Chronische rugpijn', 'Diepe spierspanning', 'Slechte doorbloeding', 'Littekenweefsel'],
    afbeelding: '/images/behandelingen/cupping.jpg',
    afbeeldingAlt: 'Cupping therapie bij Sano-J Merelbeke',
    startprijs: '€25',
  },
  {
    slug: 'medical-taping',
    naam: 'Medical Taping',
    tagline: 'Ondersteuning die beweegt met jou.',
    beschrijving:
      'Medical taping ondersteunt spieren en gewrichten zonder de beweging te beperken. De elastische tape stimuleert de huid en bevordert de doorbloeding. Ideaal als aanvulling op massage of als herstelondersteuning.',
    indicaties: ['Sportblessures', 'Gewrichtspijn', 'Zwelling', 'Postoperatief herstel'],
    afbeelding: '/images/behandelingen/taping.jpg',
    afbeeldingAlt: 'Medical taping bij Sano-J Merelbeke',
    startprijs: '€15',
  },
]

export type TarievenRij = {
  behandeling: string
  duur: string
  prijs: string
  calSlug: string
}

export type TarievenGroep = {
  slug: string
  naam: string
  rijen: TarievenRij[]
}

export const TARIEVEN: TarievenGroep[] = [
  {
    slug: 'ontspanningsmassage',
    naam: 'Ontspanningsmassage',
    rijen: [
      { behandeling: 'Volledig lichaam', duur: "90'", prijs: '€100', calSlug: 'ontspanning-volledig-90' },
      { behandeling: 'Volledig lichaam', duur: "60'", prijs: '€70', calSlug: 'ontspanning-volledig-60' },
      { behandeling: 'Rug-nek-benen', duur: "60'", prijs: '€70', calSlug: 'ontspanning-rugnekbenen-60' },
      { behandeling: 'Rug-nek', duur: "50'", prijs: '€60', calSlug: 'ontspanning-rugnek-50' },
      { behandeling: 'Rug-nek', duur: "40'", prijs: '€50', calSlug: 'ontspanning-rugnek-40' },
      { behandeling: 'Benen', duur: "40'", prijs: '€50', calSlug: 'ontspanning-benen-40' },
    ],
  },
  {
    slug: 'sportmassage',
    naam: 'Sportmassage',
    rijen: [
      { behandeling: 'Rug-nek-benen', duur: "90'", prijs: '€100', calSlug: 'sport-rugnekbenen-90' },
      { behandeling: 'Rug-nek-benen', duur: "60'", prijs: '€70', calSlug: 'sport-rugnekbenen-60' },
      { behandeling: 'Rug-nek', duur: "40'", prijs: '€50', calSlug: 'sport-rugnek-40' },
      { behandeling: 'Benen', duur: "40'", prijs: '€50', calSlug: 'sport-benen-40' },
      { behandeling: 'Rug-nek', duur: "30'", prijs: '€40', calSlug: 'sport-rugnek-30' },
      { behandeling: 'Benen', duur: "30'", prijs: '€40', calSlug: 'sport-benen-30' },
    ],
  },
  {
    slug: 'cupping',
    naam: 'Hijama Cupping',
    rijen: [
      { behandeling: 'Hijama Cupping massage', duur: "30'", prijs: '€40', calSlug: 'cupping-massage-30' },
      { behandeling: 'Hijama Cupping', duur: "20'", prijs: '€25', calSlug: 'cupping-20' },
    ],
  },
  {
    slug: 'medical-taping',
    naam: 'Medical Taping',
    rijen: [
      { behandeling: 'Plaats waar nodig', duur: "15'", prijs: '€15', calSlug: 'taping-15' },
    ],
  },
]

export type Review = {
  naam: string
  sterren: number
  tekst: string
}

export const REVIEWS: Review[] = [
  {
    naam: 'Els Dewancker',
    sterren: 5,
    tekst: 'Professionele op maat aanpak, kan Jonas alleen maar warm aanbevelen!',
  },
  {
    naam: 'Matthias B.',
    sterren: 5,
    tekst: 'Van cupping tot massage, elke behandeling dat ik hier laat doen is altijd dik in orde. Ik heb er nooit iets op aan te merken.',
  },
]

export type AbonnementRij = { behandeling: string; duur: string; prijs: string }
export type AbonnementGroep = { naam: string; rijen: AbonnementRij[] }

export const ABONNEMENTEN: AbonnementGroep[] = [
  {
    naam: 'Ontspanningsmassage',
    rijen: [
      { behandeling: 'Volledig lichaam', duur: "6x 90'", prijs: '€570' },
      { behandeling: 'Volledig lichaam', duur: "6x 60'", prijs: '€390' },
      { behandeling: 'Rug-nek-benen', duur: "6x 60'", prijs: '€390' },
      { behandeling: 'Rug-nek', duur: "6x 50'", prijs: '€330' },
      { behandeling: 'Rug-nek', duur: "6x 40'", prijs: '€270' },
      { behandeling: 'Benen', duur: "6x 40'", prijs: '€270' },
    ],
  },
  {
    naam: 'Sportmassage',
    rijen: [
      { behandeling: 'Rug-nek-benen', duur: "6x 90'", prijs: '€570' },
      { behandeling: 'Rug-nek-benen', duur: "6x 60'", prijs: '€390' },
      { behandeling: 'Rug-nek', duur: "6x 40'", prijs: '€270' },
      { behandeling: 'Benen', duur: "6x 40'", prijs: '€270' },
      { behandeling: 'Rug-nek', duur: "6x 30'", prijs: '€210' },
      { behandeling: 'Benen', duur: "6x 30'", prijs: '€210' },
    ],
  },
]
